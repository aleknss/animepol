"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SugerirPage() {
  const [form, setForm] = useState({ titulo: "", cuerpo: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    const res = await fetch("/api/sugerencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: form.titulo, cuerpo: form.cuerpo }),
    })

    if (res.ok) {
      setSuccess(true)
    } else {
      const err = await res.json()
      setError(err.error || "Error al enviar la sugerencia")
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">¡Gracias!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tu sugerencia ha sido enviada y será revisada por el equipo.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setSuccess(false); setForm({ titulo: "", cuerpo: "" }) }}>
            Enviar otra sugerencia
          </Button>
          <Link href="/">
            <Button variant="ghost">Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors">
          ← Volver al catálogo
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Sugiere un anime
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            ¿Crees que falta algún anime en el catálogo? Envíanos tu sugerencia.
            Nuestro equipo la revisará y, si encaja con la temática del sitio, la añadiremos
            con su correspondiente análisis político.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">{error}</p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              ¿Qué anime sugieres?
            </label>
            <Input
              required
              value={form.titulo}
              onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
              placeholder="Ej: Shingeki no Kyojin"
              className="text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              ¿Por qué debería estar?
            </label>
            <textarea
              rows={6}
              className="w-full rounded-xl border border-input bg-background px-4 py-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-y"
              value={form.cuerpo}
              onChange={(e) => setForm((p) => ({ ...p, cuerpo: e.target.value }))}
              placeholder="Cuéntanos por qué este anime merece un espacio en Animepol. Puedes hablar de su trama, su mensaje político, incluir enlaces... lo que consideres relevante."
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={submitting} size="lg" className="px-8">
              {submitting ? "Enviando..." : "Enviar sugerencia"}
            </Button>
          </div>
        </form>

        <p className="mt-16 text-xs text-muted-foreground/60 leading-relaxed">
          Las sugerencias son revisadas por el equipo de Animepol. No todas las propuestas
          son aceptadas: valoramos que el anime tenga un trasfondo político o social que
          permita un análisis interesante. No te preocupes si no ves tu sugerencia publicada
          de inmediato.
        </p>
      </div>
    </div>
  )
}
