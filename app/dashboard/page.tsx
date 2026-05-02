"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { SugerenciaConRelaciones, Genero } from "@/lib/types"

type Estado = "pendiente" | "completado" | "descartado"

const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: "Pendiente",
  completado: "Completado",
  descartado: "Descartado",
}

const ESTADO_VARIANTS: Record<Estado, "default" | "secondary" | "destructive"> = {
  pendiente: "default",
  completado: "secondary",
  descartado: "destructive",
}

export default function DashboardPage() {
  const { data: session, isPending: sessionLoading } = useSession()
  const router = useRouter()

  const [tickets, setTickets] = useState<SugerenciaConRelaciones[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Estado | "todas">("todas")
  const [statusMsg, setStatusMsg] = useState("")

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [generos, setGeneros] = useState<Genero[]>([])
  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    nombresAlternativos: "",
    sinopsis: "",
    analisisPolitico: "",
    añoLanzamiento: "",
    imagenUrl: "",
    libertadEconomica: "3",
    libertadPersonal: "3",
    generoIds: [] as number[],
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  const fetchTickets = useCallback(async () => {
    const params = filter !== "todas" ? `?estado=${filter}` : ""
    const res = await fetch(`/api/sugerencias${params}`)
    if (res.ok) {
      const data = await res.json()
      setTickets(data)
    }
    setLoading(false)
  }, [filter])

  const fetchGeneros = useCallback(async () => {
    const res = await fetch("/api/animes")
    if (res.ok) {
      const animes = await res.json()
      const allGenres = new Map<string, Genero>()
      for (const anime of animes) {
        for (const ag of anime.animesGeneros || []) {
          if (ag.genero && !allGenres.has(ag.genero.nombre)) {
            allGenres.set(ag.genero.nombre, ag.genero)
          }
        }
      }
      setGeneros(Array.from(allGenres.values()))
    }
  }, [])

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login")
    }
  }, [session, sessionLoading, router])

  useEffect(() => {
    if (session) {
      fetchTickets()
    }
  }, [session, filter, fetchTickets])

  useEffect(() => {
    if (session && showForm) {
      fetchGeneros()
    }
  }, [session, showForm, fetchGeneros])

  async function handleStatusChange(id: number, estado: Estado) {
    const res = await fetch(`/api/sugerencias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    })
    if (res.ok) {
      setStatusMsg(`Ticket marcado como ${ESTADO_LABELS[estado]}`)
      setTimeout(() => setStatusMsg(""), 2000)
      fetchTickets()
    }
  }

  async function handleCreateSugerencia(e: React.FormEvent) {
    e.preventDefault()
    setFormError("")
    setFormSubmitting(true)

    const body = {
      titulo: form.titulo,
      slug: form.slug || form.titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      nombresAlternativos: form.nombresAlternativos
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sinopsis: form.sinopsis || null,
      analisisPolitico: form.analisisPolitico || null,
      añoLanzamiento: form.añoLanzamiento ? parseInt(form.añoLanzamiento) : null,
      imagenUrl: form.imagenUrl || null,
      libertadEconomica: parseInt(form.libertadEconomica),
      libertadPersonal: parseInt(form.libertadPersonal),
      generoIds: form.generoIds,
    }

    const res = await fetch("/api/sugerencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setForm({
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
      })
      setShowForm(false)
      setStatusMsg("Sugerencia creada")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchTickets()
    } else {
      const err = await res.json()
      setFormError(err.error || "Error al crear")
    }
    setFormSubmitting(false)
  }

  function toggleGenero(id: number) {
    setForm((prev) => ({
      ...prev,
      generoIds: prev.generoIds.includes(id)
        ? prev.generoIds.filter((g) => g !== id)
        : [...prev.generoIds, id],
    }))
  }

  if (sessionLoading || !session) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {session.user?.email}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cerrar formulario" : "Nueva sugerencia"}
          </Button>
          <Button variant="ghost" onClick={() => signOut()}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      {statusMsg && (
        <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {statusMsg}
        </p>
      )}

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nueva sugerencia de anime</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSugerencia} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Título *</label>
                  <Input
                    value={form.titulo}
                    onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug *</label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generado si vacío"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nombres alternativos</label>
                  <Input
                    value={form.nombresAlternativos}
                    onChange={(e) =>
                      setForm({ ...form, nombresAlternativos: e.target.value })
                    }
                    placeholder="separados por coma"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Año lanzamiento</label>
                  <Input
                    type="number"
                    value={form.añoLanzamiento}
                    onChange={(e) =>
                      setForm({ ...form, añoLanzamiento: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Imagen URL</label>
                  <Input
                    value={form.imagenUrl}
                    onChange={(e) => setForm({ ...form, imagenUrl: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Libertad Económica (1-5) *</label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={form.libertadEconomica}
                      onChange={(e) =>
                        setForm({ ...form, libertadEconomica: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium">Libertad Personal (1-5) *</label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={form.libertadPersonal}
                      onChange={(e) =>
                        setForm({ ...form, libertadPersonal: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Sinopsis</label>
                <textarea
                  className="w-full min-h-20 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={form.sinopsis}
                  onChange={(e) => setForm({ ...form, sinopsis: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Análisis político</label>
                <textarea
                  className="w-full min-h-20 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={form.analisisPolitico}
                  onChange={(e) =>
                    setForm({ ...form, analisisPolitico: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Géneros</label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {generos.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggleGenero(g.id)}
                      className={`rounded-full px-2.5 py-0.5 text-xs border transition-colors ${
                        form.generoIds.includes(g.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent border-input hover:bg-muted"
                      }`}
                    >
                      {g.nombre}
                    </button>
                  ))}
                </div>
              </div>
              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}
              <div className="flex gap-2">
                <Button type="submit" disabled={formSubmitting}>
                  {formSubmitting && <Spinner className="mr-2" />}
                  Crear sugerencia
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sugerencias ({tickets.length})</h2>
        <div className="flex gap-1">
          {(["todas", "pendiente", "completado", "descartado"] as const).map(
            (f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === "todas" ? "Todas" : ESTADO_LABELS[f]}
              </Button>
            )
          )}
        </div>
      </div>

      <Separator className="mb-4" />

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="size-6" />
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No hay sugerencias {filter !== "todas" ? ESTADO_LABELS[filter].toLowerCase() + "s" : ""}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{ticket.titulo}</h3>
                      <Badge variant={ESTADO_VARIANTS[ticket.estado]}>
                        {ESTADO_LABELS[ticket.estado]}
                      </Badge>
                    </div>
                    {ticket.sinopsis && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {ticket.sinopsis}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Eco: {ticket.libertadEconomica}</span>
                      <span>Per: {ticket.libertadPersonal}</span>
                      {ticket.añoLanzamiento && <span>{ticket.añoLanzamiento}</span>}
                      <span>por {ticket.creadoPorUser?.name || ticket.creadoPorUser?.email}</span>
                    </div>
                    {ticket.sugerenciasGeneros.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ticket.sugerenciasGeneros.map((sg) => (
                          <Badge key={sg.generoId} variant="secondary" className="text-[0.65rem]">
                            {sg.genero.nombre}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {ticket.estado !== "completado" && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleStatusChange(ticket.id, "completado")}
                      >
                        Completar
                      </Button>
                    )}
                    {ticket.estado !== "descartado" && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleStatusChange(ticket.id, "descartado")}
                      >
                        Descartar
                      </Button>
                    )}
                    {ticket.estado !== "pendiente" && (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleStatusChange(ticket.id, "pendiente")}
                      >
                        Reabrir
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
