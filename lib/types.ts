import { InferSelectModel } from 'drizzle-orm';
import { animes, generos, animesGeneros, sugerencias, sugerenciasGeneros } from '@/db/schema'; 

export type Anime = InferSelectModel<typeof animes>;
export type Genero = InferSelectModel<typeof generos>;
export type Sugerencia = InferSelectModel<typeof sugerencias>;

export type AnimeConGeneros = Anime & {
  animesGeneros: (InferSelectModel<typeof animesGeneros> & {
    genero: Genero;
  })[];
};

export type SugerenciaConRelaciones = Sugerencia & {
  creadoPorUser: { id: string; name: string; email: string };
  sugerenciasGeneros: (InferSelectModel<typeof sugerenciasGeneros> & {
    genero: Genero;
  })[];
};
