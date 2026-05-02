'use client'; 

import { useState, useMemo } from 'react';
import SearchBar from './search/SearchBar';
import AnimeList from './anime/AnimeList';
import ThemeToggle from './theme/ThemeToggle';
import { AnimeConGeneros } from '@/lib/types';
import Link from 'next/link';
import { DiagramaNolanIcon } from './nolan/DiagramaNolanIcon';
import { Button } from './ui/button';
import Creditos from './Creditos';

interface Props {
  initialData: AnimeConGeneros[]; 
}

export default function CatalogoAnimes({ initialData }: Props) {
  const [busqueda, setBusqueda] = useState('');

const animesFiltrados = useMemo(() => {
  if (!busqueda.trim()) return initialData;

  const term = busqueda.toLowerCase().trim();

  return initialData.filter((anime) => {
    const coincideTitulo = anime.titulo.toLowerCase().includes(term);

    const coincideAlias = anime.nombresAlternativos?.some((alias) =>
      alias.toLowerCase().includes(term)
    );

    return coincideTitulo || coincideAlias;
  });
}, [busqueda, initialData]);

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className='top-6 max-w-6xl m-auto flex justify-between'>
      <Creditos />
      <ThemeToggle />
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
          <Button className="my-4 py-4 px-4 hover:cursor-pointer" variant="secondary">Envía una sugerencia</Button>
        </div>
      </div>

      <SearchBar busqueda={busqueda} alCambiar={setBusqueda} />

      <div className="mt-10">
        <AnimeList animes={animesFiltrados} />
      </div>
    
    </div>
  );
}
