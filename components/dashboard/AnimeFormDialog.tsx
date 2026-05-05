"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogPortal, DialogBackdrop,
  DialogPopup, DialogClose, DialogTitle,
} from "@/components/ui/dialog"
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

  function toggleGenero(id: number) {
    setForm((prev) => ({
      ...prev,
      generoIds: prev.generoIds.includes(id)
        ? prev.generoIds.filter((g) => g !== id)
        : [...prev.generoIds, id],
    }))
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">{isCreate ? "Año de lanzamiento" : "Año"}</label>
                <Input
                  type="number"
                  value={form.añoLanzamiento}
                  onChange={(e) => setForm((p) => ({ ...p, añoLanzamiento: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL de imagen</label>
                <Input
                  value={form.imagenUrl}
                  onChange={(e) => setForm((p) => ({ ...p, imagenUrl: e.target.value }))}
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
