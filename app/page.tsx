import { db } from '@/lib/db';
import { animes } from '@/db/schema';
import CatalogoAnimes from '@/components/CatalogoAnimes';

export default async function Page() {
  const data = await db.query.animes.findMany({
    with: {
      animesGeneros: {
        with: { genero: true },
      },
    },
  });

  return <CatalogoAnimes initialData={data} />;
}