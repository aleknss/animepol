'use client'; 

import { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { FilterIcon, XIcon } from 'lucide-react';
import SearchBar from './search/SearchBar';
import AnimeList from './anime/AnimeList';
import ThemeToggle from './theme/ThemeToggle';
import { AnimeCatalogo, Genero } from '@/lib/types';
import Link from 'next/link';
import { DiagramaNolanIcon } from './nolan/DiagramaNolanIcon';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Creditos from './Creditos';
import { useSession } from '@/lib/auth-client';

interface Props {
  initialData: AnimeCatalogo[];
  allGeneros: Genero[];
}

type Ideologia = "Libertario" | "Autoritario" | "Conservador" | "Progresista"

const IDEO_COLORS: Record<Ideologia, { bg: string; text: string }> = {
  Libertario: { bg: "bg-green-500/15", text: "text-green-600 dark:text-green-400" },
  Autoritario: { bg: "bg-yellow-500/15", text: "text-yellow-600 dark:text-yellow-400" },
  Conservador:  { bg: "bg-blue-500/15", text: "text-blue-600 dark:text-blue-400" },
  Progresista:  { bg: "bg-red-500/15", text: "text-red-600 dark:text-red-400" },
}

function getIdeologia(eco: number, per: number): Ideologia {
  if (eco >= 3 && per >= 3) return "Libertario"
  if (eco < 3 && per < 3) return "Autoritario"
  if (eco >= 3 && per < 3) return "Conservador"
  if (eco < 3 && per >= 3) return "Progresista"
  return "Progresista"
}

const SHUFFLE_KEY = "animepol-shuffle-v1"
const SHUFFLE_TTL = 30 * 60 * 1000

function shuffleIds(ids: number[]): number[] {
  const copy = [...ids]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function arraysMatch(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  const sa = [...a].sort((x, y) => x - y)
  const sb = [...b].sort((x, y) => x - y)
  return sa.every((v, i) => v === sb[i])
}

function loadShuffle() {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SHUFFLE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.ids) || typeof parsed.expiry !== "number") return null
    if (parsed.expiry < Date.now()) return null
    return parsed.ids as number[]
  } catch {
    return null
  }
}

function saveShuffle(ids: number[]) {
  localStorage.setItem(SHUFFLE_KEY, JSON.stringify({ ids, expiry: Date.now() + SHUFFLE_TTL }))
}

export default function CatalogoAnimes({ initialData, allGeneros }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const busquedaDiferida = useDeferredValue(busqueda)
  const buscando = busqueda !== busquedaDiferida
  const [generosFiltro, setGenerosFiltro] = useState<number[]>([])
  const [ideologiasFiltro, setIdeologiasFiltro] = useState<Ideologia[]>([])
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const { data: session } = useSession()
  const [masterOrder, setMasterOrder] = useState<number[]>(() => initialData.map(a => a.id))

  useEffect(() => {
    const currentIds = initialData.map(a => a.id)
    const stored = loadShuffle()
    if (stored && arraysMatch(stored, currentIds)) {
      setMasterOrder(stored)
      return
    }
    const newOrder = shuffleIds(currentIds)
    saveShuffle(newOrder)
    setMasterOrder(newOrder)
  }, [])

  const toggleGenero = (id: number) => {
    setGenerosFiltro(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const toggleIdeologia = (id: Ideologia) => {
    setIdeologiasFiltro(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const animesFiltrados = useMemo(() => {
    let result = initialData

    if (busquedaDiferida.trim()) {
      const term = busquedaDiferida.toLowerCase().trim()
      result = result.filter((anime) => {
        const coincideTitulo = anime.titulo.toLowerCase().includes(term)
        const coincideAlias = anime.nombresAlternativos?.some((alias) =>
          alias.toLowerCase().includes(term)
        )
        const coincideAño = anime.añoLanzamiento?.toString().includes(term)
        return coincideTitulo || coincideAlias || coincideAño
      })
    }

    if (generosFiltro.length > 0) {
      result = result.filter((anime) =>
        (anime.animesGeneros || []).some((ag) => generosFiltro.includes(ag.generoId))
      )
    }

    if (ideologiasFiltro.length > 0) {
      result = result.filter((anime) =>
        ideologiasFiltro.includes(getIdeologia(anime.libertadEconomica, anime.libertadPersonal))
      )
    }

    const orderMap = new Map(masterOrder.map((id, i) => [id, i]))
    result = [...result].sort((a, b) => {
      return (orderMap.get(a.id) ?? Infinity) - (orderMap.get(b.id) ?? Infinity)
    })

    return result
  }, [busquedaDiferida, initialData, generosFiltro, ideologiasFiltro, masterOrder])

  const limpiarFiltros = () => {
    setGenerosFiltro([])
    setIdeologiasFiltro([])
  }

  const filtrosActivos = generosFiltro.length > 0 || ideologiasFiltro.length > 0

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className='top-6 max-w-6xl m-auto flex justify-between items-center'>
        <Creditos />
        <div className='flex items-center gap-2'>
          {session ? (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
      <div className="text-center mb-10">
        <img
          src="/kanji.svg"
          alt="Animepol"
          className="mx-auto mb-4 h-40 w-auto"
        />
        <h1 className="text-4xl font-extrabold text-primary mb-4 tracking-tighter">
          Animepol
        </h1>
        <p className="text-foreground">
          ¿Cuál es tu alineamiento político según tu anime favorito?
          <span className='text-muted-foreground'> #humor</span>
        </p>
        <div className='flex justify-center gap-4 items-center'>
          <Link
            href="/diagrama-nolan"
            className="my-4 inline-block transition-transform hover:scale-110"
            aria-label="Diagrama de Nolan"
          >
            <DiagramaNolanIcon />
          </Link>
          <Link href="/sugerir">
            <Button className="my-4 py-4 px-4 hover:cursor-pointer" variant="secondary">Envía una sugerencia</Button>
          </Link>
        </div>
      </div>

      <SearchBar busqueda={busqueda} alCambiar={setBusqueda} />

      <div className="max-w-6xl mx-auto mb-6">
        <Button
          variant={mostrarFiltros ? "secondary" : "outline"}
          size="default"
          onClick={() => setMostrarFiltros(prev => !prev)}
        >
          {mostrarFiltros ? <XIcon className="size-4" /> : <FilterIcon className="size-4" />}
          Filtros
          {filtrosActivos ? (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full min-w-5 h-5 inline-flex items-center justify-center text-[11px] px-1 leading-none">
              {generosFiltro.length + ideologiasFiltro.length}
            </span>
          ) : null}
        </Button>
      </div>

      {mostrarFiltros && (
        <div className="max-w-6xl mx-auto mb-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground/70">Géneros</p>
            <div className="flex flex-wrap gap-1.5">
              {allGeneros.map((g) => (
                <Badge
                  key={g.id}
                  variant={generosFiltro.includes(g.id) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleGenero(g.id)}
                >
                  {g.nombre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground/70">Ideología</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(IDEO_COLORS) as Ideologia[]).map((id) => {
                const active = ideologiasFiltro.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleIdeologia(id)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer border ${
                      active
                        ? `${IDEO_COLORS[id].bg} ${IDEO_COLORS[id].text} border-current`
                        : "bg-muted/50 text-muted-foreground hover:bg-muted border-transparent"
                    }`}
                  >
                    {id}
                  </button>
                )
              })}
            </div>
          </div>

          {filtrosActivos && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">
                {animesFiltrados.length} resultado{animesFiltrados.length !== 1 ? 's' : ''}
              </span>
              <Button size="xs" variant="ghost" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      )}

      <div className={`mt-10 transition-opacity duration-150 ${buscando ? 'opacity-50' : ''}`}>
        <AnimeList animes={animesFiltrados} />
      </div>
    
    </div>
  );
}
