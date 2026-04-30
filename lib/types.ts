import { InferSelectModel } from 'drizzle-orm';
import { animes, generos, animesGeneros } from '@/db/schema'; 

export type Anime = InferSelectModel<typeof animes>;
export type Genero = InferSelectModel<typeof generos>;

export type AnimeConGeneros = Anime & {
  animesGeneros: (InferSelectModel<typeof animesGeneros> & {
    genero: Genero;
  })[];
};
