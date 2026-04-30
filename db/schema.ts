import { 
  pgTable, serial, varchar, text, integer, 
  check, primaryKey, timestamp 
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const animes = pgTable('animes', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  nombresAlternativos: text('nombres_alternativos').array().default([]), 

  sinopsis: text('sinopsis'), 
  analisisPolitico: text('analisis_politico'),

  añoLanzamiento: integer('año_lanzamiento'),
  
  imagenUrl: text('imagen_url'), 

  libertadEconomica: integer('libertad_economica').notNull(),
  libertadPersonal: integer('libertad_personal').notNull(),
  
  creadoEn: timestamp('creado_en').defaultNow().notNull(),

}, (table) => ({
  chkEconomica: check('chk_libertad_econ', sql`${table.libertadEconomica} BETWEEN 1 AND 5`),
  chkPersonal: check('chk_libertad_pers', sql`${table.libertadPersonal} BETWEEN 1 AND 5`),
}));

export const generos = pgTable('generos', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull().unique(),
});

export const animesGeneros = pgTable('animes_generos', {
  animeId: integer('anime_id')
    .notNull()
    .references(() => animes.id, { onDelete: 'cascade' }),
  generoId: integer('genero_id')
    .notNull()
    .references(() => generos.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.animeId, t.generoId] }),
}));

export const animesRelations = relations(animes, ({ many }) => ({
  animesGeneros: many(animesGeneros),
}));

export const generosRelations = relations(generos, ({ many }) => ({
  animesGeneros: many(animesGeneros),
}));

export const animesGenerosRelations = relations(animesGeneros, ({ one }) => ({
  anime: one(animes, {
    fields: [animesGeneros.animeId],
    references: [animes.id],
  }),
  genero: one(generos, {
    fields: [animesGeneros.generoId],
    references: [generos.id],
  }),
}));