"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { SugerenciaConRelaciones } from "@/lib/types"

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

export function SugerenciaSection() {
  const [tickets, setTickets] = useState<SugerenciaConRelaciones[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Estado | "todas">("todas")
  const [statusMsg, setStatusMsg] = useState("")

  const [form, setForm] = useState({ titulo: "", cuerpo: "" })
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

  useEffect(() => {
    fetchTickets()
  }, [filter, fetchTickets])

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

    const res = await fetch("/api/sugerencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setForm({ titulo: "", cuerpo: "" })
      setStatusMsg("Sugerencia creada")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchTickets()
    } else {
      const err = await res.json()
      setFormError(err.error || "Error al crear")
    }
    setFormSubmitting(false)
  }

  return (
    <div>
      {statusMsg && (
        <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {statusMsg}
        </p>
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
        <div className="flex flex-col gap-3 mb-8">
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
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-3 whitespace-pre-wrap">
                        {ticket.sinopsis}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      por {ticket.creadoPorUser?.name || ticket.creadoPorUser?.email}
                    </p>
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

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Enviar sugerencia</h2>
      </div>

      <Separator className="mb-4" />

      <form onSubmit={handleCreateSugerencia} className="space-y-4 max-w-2xl">
        {formError && (
          <p className="text-sm text-destructive">{formError}</p>
        )}

        <div>
          <label className="text-sm font-medium">Título *</label>
          <Input
            required
            value={form.titulo}
            onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
            placeholder="¿Qué anime sugieres?"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Cuerpo</label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={form.cuerpo}
            onChange={(e) => setForm((p) => ({ ...p, cuerpo: e.target.value }))}
            placeholder="Describe por qué debería añadirse este anime."
          />
        </div>

        <Button type="submit" disabled={formSubmitting}>
          {formSubmitting ? "Enviando..." : "Enviar sugerencia"}
        </Button>
      </form>
    </div>
  )
}
