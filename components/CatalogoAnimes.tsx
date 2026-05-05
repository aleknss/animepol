'use client'; 

import { useState, useMemo } from 'react';
import { FilterIcon, XIcon } from 'lucide-react';
import SearchBar from './search/SearchBar';
import AnimeList from './anime/AnimeList';
import ThemeToggle from './theme/ThemeToggle';
import { AnimeConGeneros } from '@/lib/types';
import Link from 'next/link';
import { DiagramaNolanIcon } from './nolan/DiagramaNolanIcon';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Creditos from './Creditos';
import { useSession } from '@/lib/auth-client';

interface Props {
  initialData: AnimeConGeneros[]; 
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

export default function CatalogoAnimes({ initialData }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [generosFiltro, setGenerosFiltro] = useState<number[]>([])
  const [ideologiasFiltro, setIdeologiasFiltro] = useState<Ideologia[]>([])
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const { data: session } = useSession()

  const generos = useMemo(() => {
    const map = new Map<number, string>()
    for (const anime of initialData) {
      for (const ag of anime.animesGeneros || []) {
        if (!map.has(ag.generoId)) map.set(ag.generoId, ag.genero.nombre)
      }
    }
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [initialData])

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

    if (busqueda.trim()) {
      const term = busqueda.toLowerCase().trim()
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

    return result
  }, [busqueda, initialData, generosFiltro, ideologiasFiltro])

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
              <Button variant="outline" size="xs">Dashboard</Button>
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
              {generos.map(([id, nombre]) => (
                <Badge
                  key={id}
                  variant={generosFiltro.includes(id) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleGenero(id)}
                >
                  {nombre}
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

      <div className="mt-10">
        <AnimeList animes={animesFiltrados} />
      </div>
    
    </div>
  );
}
