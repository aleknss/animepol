import type { Metadata } from "next";
import { db } from '@/lib/db';
import { generos } from '@/db/schema';
import { asc } from 'drizzle-orm';
import CatalogoAnimes from '@/components/CatalogoAnimes';

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora nuestro catálogo completo de anime con puntuaciones de libertad económica y personal. Filtra por género, año y puntuación en el diagrama de Nolan.",
  openGraph: {
    title: "Animepol — Catálogo de anime con análisis político",
    description:
      "Explora nuestro catálogo completo de anime con puntuaciones de libertad económica y personal.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Animepol" }],
  },
  twitter: {
    title: "Animepol — Catálogo de anime con análisis político",
    description:
      "Explora nuestro catálogo completo de anime con puntuaciones de libertad económica y personal.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Animepol" }],
  },
};

export default async function Page() {
  const [data, allGeneros] = await Promise.all([
    db.query.animes.findMany({
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