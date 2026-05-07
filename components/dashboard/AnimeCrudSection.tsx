"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import AnimeCrudSectionSkeleton from "./AnimeCrudSectionSkeleton"
import { AnimeFormDialog } from "./AnimeFormDialog"
import type { AnimeConGeneros, Genero } from "@/lib/types"

const renderEstrellas = (puntos: number) =>
  "\u2605".repeat(puntos) + "\u2606".repeat(5 - puntos)

function getThumbUrl(url: string): string {
  return url.replace(/(\.\w+)$/, "-thumb$1")
}

export type AnimeFormData = {
  titulo: string
  slug: string
  nombresAlternativos: string
  sinopsis: string
  analisisPolitico: string
  añoLanzamiento: string
  imagenUrl: string
  libertadEconomica: string
  libertadPersonal: string
  generoIds: number[]
}

export const emptyForm: AnimeFormData = {
  titulo: "",
  slug: "",
  nombresAlternativos: "",
  sinopsis: "",
  analisisPolitico: "",
  añoLanzamiento: "",
  imagenUrl: "",
  libertadEconomica: "3",
  libertadPersonal: "3",
  generoIds: [],
}

export function AnimeCrudSection() {
  const [animes, setAnimes] = useState<AnimeConGeneros[]>([])
  const [generos, setGeneros] = useState<Genero[]>([])
  const [loading, setLoading] = useState(true)
  const [statusMsg, setStatusMsg] = useState("")
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingAnime, setEditingAnime] = useState<AnimeConGeneros | null>(null)
  const [editForm, setEditForm] = useState<AnimeFormData>(emptyForm)

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createForm, setCreateForm] = useState<AnimeFormData>(emptyForm)

  const [search, setSearch] = useState("")

  const fetchAnimes = useCallback(async () => {
    const res = await fetch("/api/animes")
    if (res.ok) {
      const data: AnimeConGeneros[] = await res.json()
      setAnimes(data)
    }
    setLoading(false)
  }, [])

  const fetchGeneros = useCallback(async () => {
    const res = await fetch("/api/generos")
    if (res.ok) {
      const data: Genero[] = await res.json()
      setGeneros(data)
    }
  }, [])

  useEffect(() => {
    fetchAnimes()
    fetchGeneros()
  }, [fetchAnimes, fetchGeneros])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setFormError("")
    setFormSubmitting(true)

    const body = {
      titulo: createForm.titulo,
      slug: createForm.slug || createForm.titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      nombresAlternativos: createForm.nombresAlternativos.split(",").map((s) => s.trim()).filter(Boolean),
      sinopsis: createForm.sinopsis || null,
      analisisPolitico: createForm.analisisPolitico || null,
      añoLanzamiento: createForm.añoLanzamiento ? parseInt(createForm.añoLanzamiento) : null,
      imagenUrl: createForm.imagenUrl || null,
      libertadEconomica: parseInt(createForm.libertadEconomica),
      libertadPersonal: parseInt(createForm.libertadPersonal),
      generoIds: createForm.generoIds,
    }

    const res = await fetch("/api/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setCreateForm(emptyForm)
      setCreateDialogOpen(false)
      setStatusMsg("Anime creado")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchAnimes()
    } else {
      const err = await res.json()
      setFormError(err.error || "Error al crear")
    }
    setFormSubmitting(false)
  }

  function openEditDialog(anime: AnimeConGeneros) {
    setEditingAnime(anime)
    const generoIds = anime.animesGeneros?.map((ag) => ag.generoId) || []
    setEditForm({
      titulo: anime.titulo,
      slug: anime.slug,
      nombresAlternativos: anime.nombresAlternativos?.join(", ") || "",
      sinopsis: anime.sinopsis || "",
      analisisPolitico: anime.analisisPolitico || "",
      añoLanzamiento: anime.añoLanzamiento?.toString() || "",
      imagenUrl: anime.imagenUrl || "",
      libertadEconomica: anime.libertadEconomica.toString(),
      libertadPersonal: anime.libertadPersonal.toString(),
      generoIds,
    })
    setEditDialogOpen(true)
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editingAnime) return
    setFormError("")
    setFormSubmitting(true)

    const body = {
      titulo: editForm.titulo,
      slug: editForm.slug || editForm.titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      nombresAlternativos: editForm.nombresAlternativos.split(",").map((s) => s.trim()).filter(Boolean),
      sinopsis: editForm.sinopsis || null,
      analisisPolitico: editForm.analisisPolitico || null,
      añoLanzamiento: editForm.añoLanzamiento ? parseInt(editForm.añoLanzamiento) : null,
      imagenUrl: editForm.imagenUrl || null,
      libertadEconomica: parseInt(editForm.libertadEconomica),
      libertadPersonal: parseInt(editForm.libertadPersonal),
      generoIds: editForm.generoIds,
    }

    const res = await fetch(`/api/animes/${editingAnime.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setEditDialogOpen(false)
      setEditingAnime(null)
      setStatusMsg("Anime actualizado")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchAnimes()
    } else {
      const err = await res.json()
      setFormError(err.error || "Error al actualizar")
    }
    setFormSubmitting(false)
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este anime permanentemente?")) return

    const res = await fetch(`/api/animes/${id}`, { method: "DELETE" })
    if (res.ok) {
      setStatusMsg("Anime eliminado")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchAnimes()
    }
  }

  const filteredAnimes = search.trim()
    ? animes.filter((a) => {
        const q = search.toLowerCase()
        return (
          a.titulo.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.nombresAlternativos?.some((n) => n.toLowerCase().includes(q)) ||
          a.añoLanzamiento?.toString().includes(q)
        )
      })
    : animes

  if (loading) {
    return <AnimeCrudSectionSkeleton />
  }

  return (
    <div>
      {statusMsg && (
        <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {statusMsg}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Animes ({filteredAnimes.length})</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 h-7 text-xs"
          />
          <Button size="sm" onClick={() => { setFormError(""); setCreateForm(emptyForm); setCreateDialogOpen(true) }}>
            Crear
          </Button>
        </div>
      </div>

      <Separator className="mb-4" />

      {filteredAnimes.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No hay animes registrados
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
          {filteredAnimes.map((anime) => (
            <Card key={anime.id} className="group">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="relative w-14 h-20 rounded-md overflow-hidden shrink-0 bg-muted border border-border/50">
                    {anime.imagenUrl ? (
                      <Image
                        src={getThumbUrl(anime.imagenUrl)}
                        alt={anime.titulo}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[0.6rem] text-muted-foreground">
                        Sin póster
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm truncate">{anime.titulo}</h3>
                    {anime.sinopsis && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {anime.sinopsis}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[0.65rem] text-muted-foreground">
                      <span className="text-yellow-500" title={`Libertad económica: ${anime.libertadEconomica}/5`}>
                        Eco {renderEstrellas(anime.libertadEconomica)}
                      </span>
                      <span className="text-blue-500" title={`Libertad personal: ${anime.libertadPersonal}/5`}>
                        Per {renderEstrellas(anime.libertadPersonal)}
                      </span>
                      {anime.añoLanzamiento && <span>{anime.añoLanzamiento}</span>}
                      <span className="text-muted-foreground/50 truncate">{anime.slug}</span>
                    </div>
                    {anime.animesGeneros?.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 mt-1">
                        {anime.animesGeneros.map((ag) => (
                          <Badge key={ag.generoId} variant="secondary" className="text-[0.6rem] h-4">
                            {ag.genero.nombre}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-1 mt-auto pt-1.5">
                      <Button size="xs" variant="outline" onClick={() => openEditDialog(anime)}>
                        Editar
                      </Button>
                      <Button size="xs" variant="destructive" onClick={() => handleDelete(anime.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AnimeFormDialog
        mode="create"
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        form={createForm}
        setForm={setCreateForm}
        onSubmit={handleCreate}
        submitting={formSubmitting}
        error={formError}
        generos={generos}
      />

      <AnimeFormDialog
        mode="edit"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        form={editForm}
        setForm={setEditForm}
        onSubmit={handleEdit}
        submitting={formSubmitting}
        error={formError}
        generos={generos}
      />
    </div>
  )
}
