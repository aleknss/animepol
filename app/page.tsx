import type { Metadata } from "next";
import { db } from '@/lib/db';
import { generos } from '@/db/schema';
import { asc } from 'drizzle-orm';
import CatalogoAnimes from '@/components/CatalogoAnimes';

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora cientos de animes con puntuación de libertad económica y personal. Filtra por género, año y posición en el diagrama de Nolan para encontrar tu anime ideal.",
};

export default async function Page() {
  const [data, allGeneros] = await Promise.all([
    db.query.animes.findMany({
      columns: {
        analisisPolitico: false,
      },
      with: {
        animesGeneros: {
          with: { genero: true },
        },
      },
    }),
    db.select().from(generos).orderBy(asc(generos.nombre)),
  ]);

  return <CatalogoAnimes initialData={data} allGeneros={allGeneros} />;
}