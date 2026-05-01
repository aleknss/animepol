"use client";
import Link from "next/link";
import { AnimeConGeneros } from "@/lib/types";
import Image from "next/image";
import MiniNolanChart from "@/components/nolan/MiniNolanChart";

const renderEstrellas = (puntos: number) =>
  "★".repeat(puntos) + "☆".repeat(5 - puntos);

export default function AnimeCard({ anime, priority }: { anime: AnimeConGeneros; priority?: boolean }) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      key={anime.id}
      className="block group"
    >
      <div
        className="rounded-2xl shadow-sm border border-border overflow-hidden group-hover:shadow-md transition-all flex flex-col h-full group-hover:-translate-y-1"
      >
        <div className="relative w-full aspect-3/4 bg-muted overflow-hidden shrink-0">
          {anime.imagenUrl ? (
                <Image
                  src={anime.imagenUrl}
                  alt={anime.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={priority}
                />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sin póster
            </div>
          )}

          <div className="absolute top-2 right-2">
            <MiniNolanChart eco={anime.libertadEconomica} pers={anime.libertadPersonal} />
          </div>
        </div>

        <div className="p-4 flex flex-col grow">
          <h3 className="text-lg font-bold text-card-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {anime.titulo}
          </h3>

          {anime.sinopsis && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 grow">
              {anime.sinopsis}
            </p>
          )}

          {anime.animesGeneros && anime.animesGeneros.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {anime.animesGeneros.map((ag) => (
                <span
                  key={ag.generoId}
                  className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full border border-border/50"
                >
                  {ag.genero.nombre}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-3 border-t border-border space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-muted-foreground uppercase font-bold">
                Econ
              </span>
              <span className="text-yellow-500">
                {renderEstrellas(anime.libertadEconomica)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-muted-foreground uppercase font-bold">
                Pers
              </span>
              <span className="text-blue-500">
                {renderEstrellas(anime.libertadPersonal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
