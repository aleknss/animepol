import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const slug = z.string().regex(/^[a-z0-9-]+$/)

const animes = defineCollection({
  loader: glob({ base: './src/content/animes', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string(),
    slug,
    nombresAlternativos: z.array(z.string()).default([]),
    sinopsis: z.string().optional(),
    analisisPolitico: z.string().optional(),
    anoLanzamiento: z.number().int().min(1900).max(2100).optional(),
    imagen: z.string().optional(),
    libertadEconomica: z.number().int().min(1).max(5),
    libertadPersonal: z.number().int().min(1).max(5),
    generos: z.array(z.string()).default([]),
  }),
})

const generos = defineCollection({
  loader: glob({ base: './src/content/generos', pattern: '*.json' }),
  schema: z.object({
    nombre: z.string(),
    slug,
  }),
})

export const collections = { animes, generos }
