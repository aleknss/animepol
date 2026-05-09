"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SugerenciaSectionSkeleton from "./SugerenciaSectionSkeleton"
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

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/sugerencias")
    if (res.ok) {
      const data = await res.json()
      setTickets(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const filteredTickets = useMemo(() => {
    if (filter === "todas") return tickets
    return tickets.filter((t) => t.estado === filter)
  }, [tickets, filter])

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

  async function handleDelete(id: number) {
    const res = await fetch(`/api/sugerencias/${id}`, { method: "DELETE" })
    if (res.ok) {
      setStatusMsg("Sugerencia eliminada")
      setTimeout(() => setStatusMsg(""), 2000)
      fetchTickets()
    }
  }

  return (
    <div>
      {statusMsg && (
        <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {statusMsg}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sugerencias ({filteredTickets.length})</h2>
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
        <SugerenciaSectionSkeleton />
      ) : filteredTickets.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No hay sugerencias {filter !== "todas" ? ESTADO_LABELS[filter].toLowerCase() + "s" : ""}
        </p>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="font-semibold truncate">{ticket.titulo}</h1>
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
                      por {ticket.creadoPorUser?.name || ticket.creadoPorUser?.email || "Anónimo"}
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
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Borrar
                    </Button>
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
