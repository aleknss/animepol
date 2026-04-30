import { AnimeConGeneros } from "@/lib/types";
import AnimeCard from "@/components/AnimeCard";

export default function AnimeList({ animes }: { animes: AnimeConGeneros[] }) {
  if (animes.length === 0)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No hay resultados.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {animes.map((anime, i) => (
        <AnimeCard key={anime.id} anime={anime} priority={i < 3} />
      ))}
    </div>
  );
}
