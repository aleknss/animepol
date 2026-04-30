"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, CornerDownLeft } from "lucide-react"
import { Dialog, DialogPortal, DialogBackdrop, DialogPopup } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import type { AnimeConGeneros } from "@/lib/types"

interface CommandPaletteProps {
  animes: AnimeConGeneros[]
}

export default function CommandPalette({ animes }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const openRef = useRef(open)
  const router = useRouter()

  useEffect(() => {
    openRef.current = open
  })

  const filtered = useMemo(() => {
    if (!query.trim()) return animes.slice(0, 8)
    const term = query.toLowerCase().trim()
    return animes.filter((a) => {
      const matchTitle = a.titulo.toLowerCase().includes(term)
      const matchAlias = a.nombresAlternativos?.some((alias) =>
        alias.toLowerCase().includes(term)
      )
      return matchTitle || matchAlias
    }).slice(0, 8)
  }, [query, animes])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const nextOpen = !openRef.current
        setOpen(nextOpen)
        if (nextOpen) {
          setQuery("")
          setSelectedIndex(0)
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const selectItem = useCallback(
    (item: AnimeConGeneros) => {
      setOpen(false)
      router.push(`/anime/${item.slug}`)
    },
    [router]
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      selectItem(filtered[selectedIndex])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className="max-w-xl p-0 overflow-hidden">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Buscar anime..."
              className="h-12 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
            />
            <Kbd className="ml-2 shrink-0">
              <CornerDownLeft className="size-3" />
            </Kbd>
          </div>

          {filtered.length > 0 ? (
            <ul className="max-h-80 overflow-auto p-2" role="listbox">
              {filtered.map((anime, i) => (
                <li
                  key={anime.id}
                  role="option"
                  aria-selected={i === selectedIndex}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer",
                    i === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => selectItem(anime)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate font-medium">{anime.titulo}</span>
                    {anime.nombresAlternativos && anime.nombresAlternativos.length > 0 && (
                      <span className="truncate text-xs text-muted-foreground">
                        {anime.nombresAlternativos.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Sin resultados
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <Kbd>↑↓</Kbd>
            <span>Navegar</span>
            <Kbd>↵</Kbd>
            <span>Seleccionar</span>
            <Kbd>Esc</Kbd>
            <span>Cerrar</span>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
