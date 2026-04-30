import { db } from '@/lib/db';
import { animes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCuadrante } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import NolanChart from '@/components/NolanChart';

export default async function AnimePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anime = await db.query.animes.findFirst({
    where: eq(animes.slug, slug),
    with: {
      animesGeneros: {
        with: { genero: true },
      },
    },
  });

  if (!anime) notFound();

  const cuadrante = getCuadrante(anime.libertadEconomica, anime.libertadPersonal);

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-block transition-colors font-bold uppercase text-xs tracking-widest"
        >
          ← Catálogo
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-80 shrink-0">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg bg-muted border border-border">
              {anime.imagenUrl ? (
                <Image
                  src={anime.imagenUrl}
                  alt={anime.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sin póster
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border">
              <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-4">
                Alineamiento Nolan
              </p>
              <NolanChart
                eco={anime.libertadEconomica}
                pers={anime.libertadPersonal}
              />
              <div className="flex justify-center gap-6 mt-4 text-xs font-bold">
                <span className="text-foreground">Econ: {anime.libertadEconomica}/5</span>
                <span className="text-foreground">Pers: {anime.libertadPersonal}/5</span>
              </div>
            </div>
          </div>

          <div className="grow">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {anime.animesGeneros?.map((ag) => (
                <span
                  key={ag.generoId}
                  className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border"
                >
                  {ag.genero.nombre}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-black text-foreground mb-6 tracking-tighter">
              {anime.titulo}
            </h1>

            <Separator className="mb-8" />
            <div className="space-y-10">
              <section>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {anime.sinopsis}
                </p>
              </section>

                <h2 className="text-xl font-black text-foreground mb-4">
                  Análisis
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                  &ldquo;{anime.analisisPolitico}&rdquo;
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
