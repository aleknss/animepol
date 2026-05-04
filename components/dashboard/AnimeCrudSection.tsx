"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog, DialogTrigger, DialogPortal, DialogBackdrop,
  DialogPopup, DialogClose, DialogTitle,
} from "@/components/ui/dialog"
import type { AnimeConGeneros, Genero } from "@/lib/types"

type AnimeFormData = {
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

const emptyForm: AnimeFormData = {
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

      const allGenres = new Map<string, Genero>()
      for (const anime of data) {
        for (const ag of anime.animesGeneros || []) {
          if (ag.genero && !allGenres.has(ag.genero.nombre)) {
            allGenres.set(ag.genero.nombre, ag.genero)
          }
        }
      }
      setGeneros(Array.from(allGenres.values()))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAnimes()
  }, [fetchAnimes])

  function toggleGenero(formSetter: (fn: (prev: AnimeFormData) => AnimeFormData) => void, id: number) {
    formSetter((prev) => ({
      ...prev,
      generoIds: prev.generoIds.includes(id)
        ? prev.generoIds.filter((g) => g !== id)
        : [...prev.generoIds, id],
    }))
  }

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
          a.nombresAlternativos?.some((n) => n.toLowerCase().includes(q))
        )
      })
    : animes

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-6" />
      </div>
    )
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
        <div className="flex flex-col gap-3 mb-8">
          {filteredAnimes.map((anime) => (
            <Card key={anime.id}>
              <CardContent className="py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{anime.titulo}</h3>
                    {anime.sinopsis && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {anime.sinopsis}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Eco: {anime.libertadEconomica}</span>
                      <span>Per: {anime.libertadPersonal}</span>
                      {anime.añoLanzamiento && <span>{anime.añoLanzamiento}</span>}
                      <span className="text-muted-foreground/60">{anime.slug}</span>
                    </div>
                    {anime.animesGeneros?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {anime.animesGeneros.map((ag) => (
                          <Badge key={ag.generoId} variant="secondary" className="text-[0.65rem]">
                            {ag.genero.nombre}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="xs" variant="outline" onClick={() => openEditDialog(anime)}>
                      Editar
                    </Button>
                    <Button size="xs" variant="destructive" onClick={() => handleDelete(anime.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="p-6">
            <DialogTitle className="mb-4">Crear Anime</DialogTitle>
            <form onSubmit={handleCreate} className="space-y-4 max-h-[70vh] overflow-y-auto -mx-2 px-2">
              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Título *</label>
                  <Input
                    required
                    value={createForm.titulo}
                    onChange={(e) => setCreateForm((p) => ({ ...p, titulo: e.target.value }))}
                    placeholder="Nombre del anime"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={createForm.slug}
                    onChange={(e) => setCreateForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="Auto-generado del título"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Nombres alternativos</label>
                <Input
                  value={createForm.nombresAlternativos}
                  onChange={(e) => setCreateForm((p) => ({ ...p, nombresAlternativos: e.target.value }))}
                  placeholder="Separados por coma"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Sinopsis</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={createForm.sinopsis}
                  onChange={(e) => setCreateForm((p) => ({ ...p, sinopsis: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Análisis político</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={createForm.analisisPolitico}
                  onChange={(e) => setCreateForm((p) => ({ ...p, analisisPolitico: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Año de lanzamiento</label>
                  <Input
                    type="number"
                    value={createForm.añoLanzamiento}
                    onChange={(e) => setCreateForm((p) => ({ ...p, añoLanzamiento: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL de imagen</label>
                  <Input
                    value={createForm.imagenUrl}
                    onChange={(e) => setCreateForm((p) => ({ ...p, imagenUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Libertad económica (1-5) *</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        size="xs"
                        variant={parseInt(createForm.libertadEconomica) === val ? "default" : "outline"}
                        onClick={() => setCreateForm((p) => ({ ...p, libertadEconomica: val.toString() }))}
                      >
                        {val}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Libertad personal (1-5) *</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        size="xs"
                        variant={parseInt(createForm.libertadPersonal) === val ? "default" : "outline"}
                        onClick={() => setCreateForm((p) => ({ ...p, libertadPersonal: val.toString() }))}
                      >
                        {val}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {generos.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Géneros</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generos.map((g) => (
                      <Badge
                        key={g.id}
                        variant={createForm.generoIds.includes(g.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleGenero(setCreateForm, g.id)}
                      >
                        {g.nombre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={formSubmitting}>
                  {formSubmitting ? "Creando..." : "Crear anime"}
                </Button>
                <DialogClose className="h-8 gap-1.5 px-2.5 rounded-lg border border-transparent bg-clip-padding text-sm font-medium hover:bg-muted hover:text-foreground">
                  Cancelar
                </DialogClose>
              </div>
            </form>
          </DialogPopup>
        </DialogPortal>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="p-6">
            <DialogTitle className="mb-4">Editar Anime</DialogTitle>
            <form onSubmit={handleEdit} className="space-y-4 max-h-[70vh] overflow-y-auto -mx-2 px-2">
              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Título *</label>
                  <Input
                    required
                    value={editForm.titulo}
                    onChange={(e) => setEditForm((p) => ({ ...p, titulo: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={editForm.slug}
                    onChange={(e) => setEditForm((p) => ({ ...p, slug: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Nombres alternativos</label>
                <Input
                  value={editForm.nombresAlternativos}
                  onChange={(e) => setEditForm((p) => ({ ...p, nombresAlternativos: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Sinopsis</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={editForm.sinopsis}
                  onChange={(e) => setEditForm((p) => ({ ...p, sinopsis: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Análisis político</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={editForm.analisisPolitico}
                  onChange={(e) => setEditForm((p) => ({ ...p, analisisPolitico: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Año</label>
                  <Input
                    type="number"
                    value={editForm.añoLanzamiento}
                    onChange={(e) => setEditForm((p) => ({ ...p, añoLanzamiento: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL de imagen</label>
                  <Input
                    value={editForm.imagenUrl}
                    onChange={(e) => setEditForm((p) => ({ ...p, imagenUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Libertad económica *</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        size="xs"
                        variant={parseInt(editForm.libertadEconomica) === val ? "default" : "outline"}
                        onClick={() => setEditForm((p) => ({ ...p, libertadEconomica: val.toString() }))}
                      >
                        {val}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Libertad personal *</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        size="xs"
                        variant={parseInt(editForm.libertadPersonal) === val ? "default" : "outline"}
                        onClick={() => setEditForm((p) => ({ ...p, libertadPersonal: val.toString() }))}
                      >
                        {val}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {generos.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Géneros</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generos.map((g) => (
                      <Badge
                        key={g.id}
                        variant={editForm.generoIds.includes(g.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleGenero(setEditForm, g.id)}
                      >
                        {g.nombre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={formSubmitting}>
                  {formSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
                <DialogClose className="h-8 gap-1.5 px-2.5 rounded-lg border border-transparent bg-clip-padding text-sm font-medium hover:bg-muted hover:text-foreground">
                  Cancelar
                </DialogClose>
              </div>
            </form>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  )
}
