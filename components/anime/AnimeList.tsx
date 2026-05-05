import { AnimeConGeneros } from "@/lib/types";
import AnimeCard from "@/components/anime/AnimeCard";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function AnimeList({ animes }: { animes: AnimeConGeneros[] }) {
  if (animes.length === 0)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No hay resultados.
      </div>
    );

  const shuffled = shuffle(animes);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {shuffled.map((anime, i) => (
        <AnimeCard key={anime.id} anime={anime} priority={i < 3} />
      ))}
    </div>
  );
}
