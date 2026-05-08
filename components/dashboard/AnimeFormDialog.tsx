"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogPortal, DialogBackdrop,
  DialogPopup, DialogClose, DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import type { Genero } from "@/lib/types"
import type { AnimeFormData } from "./AnimeCrudSection"

type AnimeFormDialogProps = {
  mode: "create" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  form: AnimeFormData
  setForm: (fn: (prev: AnimeFormData) => AnimeFormData) => void
  onSubmit: (e: React.FormEvent) => void
  submitting: boolean
  error: string
  generos: Genero[]
}

export function AnimeFormDialog({
  mode,
  open,
  onOpenChange,
  form,
  setForm,
  onSubmit,
  submitting,
  error,
  generos,
}: AnimeFormDialogProps) {
  const isCreate = mode === "create"
  const popupClass = isCreate ? "top-1/2 -translate-y-1/2 p-6" : "top-1/2 -translate-y-1/2 p-6 max-w-3xl"
  const title = isCreate ? "Crear Anime" : "Editar Anime"
  const submitLabel = isCreate
    ? submitting ? "Creando..." : "Crear anime"
    : submitting ? "Guardando..." : "Guardar cambios"
  const maxH = isCreate ? "max-h-[70vh]" : "max-h-[85vh]"
  const textareaResize = isCreate ? "" : "resize-y"

  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function toggleGenero(id: number) {
    setForm((prev) => ({
      ...prev,
      generoIds: prev.generoIds.includes(id)
        ? prev.generoIds.filter((g) => g !== id)
        : [...prev.generoIds, id],
    }))
  }

  function slugify(s: string): string {
    return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")
  }

  function compressImage(file: File, maxW: number, quality: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        let { width, height } = img
        if (width > maxW) {
          height = Math.round(height * (maxW / width))
          width = maxW
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, width, height)
        const isPng = file.type === "image/png"
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression failed"))
            const name = file.name.replace(/\.[^.]+$/, isPng ? ".png" : ".jpg")
            resolve(new File([blob], name, { type: isPng ? "image/png" : "image/jpeg" }))
          },
          isPng ? "image/png" : "image/jpeg",
          quality
        )
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = url
    })
  }

  function getUploadSlug(): string {
    const s = form.slug || slugify(form.titulo)
    return s || `${Date.now()}`
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const slug = getUploadSlug()
      const [full, thumb] = await Promise.all([
        compressImage(file, 1200, 0.8),
        compressImage(file, 250, 0.65),
      ])
      const fd = new FormData()
      fd.append("file", full)
      fd.append("thumb", thumb)
      fd.append("slug", slug)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Error al subir")
      }
      const data = await res.json()
      setForm((p) => ({ ...p, imagenUrl: data.url }))
      if (!form.slug && slug) {
        setForm((p) => (p.slug ? p : { ...p, slug }))
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al subir imagen")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className={popupClass}>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          <form onSubmit={onSubmit} className={`space-y-4 ${maxH} overflow-y-auto -mx-2 px-2`}>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Título *</label>
                <Input
                  required
                  value={form.titulo}
                  onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
                  placeholder="Nombre del anime"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="Auto-generado del título"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Nombres alternativos</label>
              <Input
                value={form.nombresAlternativos}
                onChange={(e) => setForm((p) => ({ ...p, nombresAlternativos: e.target.value }))}
                placeholder="Separados por coma"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Sinopsis</label>
              <textarea
                rows={3}
                className={`w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${textareaResize}`}
                value={form.sinopsis}
                onChange={(e) => setForm((p) => ({ ...p, sinopsis: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Análisis político</label>
              <textarea
                rows={6}
                className={`w-full rounded-lg border border-input bg-background px-3 py-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${textareaResize}`}
                value={form.analisisPolitico}
                onChange={(e) => setForm((p) => ({ ...p, analisisPolitico: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">{isCreate ? "Año de lanzamiento" : "Año"}</label>
              <Input
                type="number"
                value={form.añoLanzamiento}
                onChange={(e) => setForm((p) => ({ ...p, añoLanzamiento: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Imagen</label>
              <div className="flex gap-3 items-start">
                {form.imagenUrl && (
                  <Image
                    src={form.imagenUrl}
                    alt="Preview"
                    width={64}
                    height={80}
                    className="object-cover rounded border border-border shrink-0"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? "Subiendo..." : "Subir archivo"}
                    </Button>
                    {form.imagenUrl && (
                      <Button
                        type="button"
                        size="xs"
                        variant="ghost"
                        className="text-muted-foreground"
                        onClick={() => setForm((p) => ({ ...p, imagenUrl: "" }))}
                      >
                        Quitar
                      </Button>
                    )}
                  </div>
                  <Input
                    value={form.imagenUrl}
                    onChange={(e) => setForm((p) => ({ ...p, imagenUrl: e.target.value }))}
                    placeholder="O pega una URL"
                  />
                </div>
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
                      variant={parseInt(form.libertadEconomica) === val ? "default" : "outline"}
                      onClick={() => setForm((p) => ({ ...p, libertadEconomica: val.toString() }))}
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
                      variant={parseInt(form.libertadPersonal) === val ? "default" : "outline"}
                      onClick={() => setForm((p) => ({ ...p, libertadPersonal: val.toString() }))}
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
                      variant={form.generoIds.includes(g.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGenero(g.id)}
                    >
                      {g.nombre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={submitting}>
                {submitLabel}
              </Button>
              <DialogClose className="h-8 gap-1.5 px-2.5 rounded-lg border border-transparent bg-clip-padding text-sm font-medium hover:bg-muted hover:text-foreground">
                Cancelar
              </DialogClose>
            </div>
          </form>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
