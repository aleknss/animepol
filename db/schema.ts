import { 
  pgTable, pgEnum, serial, varchar, text, integer, 
  check, primaryKey, timestamp, index, boolean
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
  slugIdx: index('animes_slug_idx').on(table.slug), 
  añoIdx: index('animes_anio_idx').on(table.añoLanzamiento), 
  libertadIdx: index('animes_libertad_idx').on(table.libertadEconomica, table.libertadPersonal),
  
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
  generoIdIdx: index('animes_generos_genero_id_idx').on(t.generoId),
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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const estadoSugerenciaEnum = pgEnum('estado_sugerencia', ['pendiente', 'completado', 'descartado']);

export const sugerencias = pgTable('sugerencias', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  nombresAlternativos: text('nombres_alternativos').array().default([]),
  sinopsis: text('sinopsis'),
  analisisPolitico: text('analisis_politico'),
  añoLanzamiento: integer('año_lanzamiento'),
  imagenUrl: text('imagen_url'),
  libertadEconomica: integer('libertad_economica').notNull(),
  libertadPersonal: integer('libertad_personal').notNull(),
  estado: estadoSugerenciaEnum('estado').notNull().default('pendiente'),
  creadoPor: text('creado_por').notNull().references(() => user.id, { onDelete: 'cascade' }),
  creadoEn: timestamp('creado_en').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('sugerencias_slug_idx').on(table.slug),
  estadoIdx: index('sugerencias_estado_idx').on(table.estado),
  chkEconomica: check('sug_chk_libertad_econ', sql`${table.libertadEconomica} BETWEEN 1 AND 5`),
  chkPersonal: check('sug_chk_libertad_pers', sql`${table.libertadPersonal} BETWEEN 1 AND 5`),
}));

export const sugerenciasGeneros = pgTable('sugerencias_generos', {
  sugerenciaId: integer('sugerencia_id')
    .notNull()
    .references(() => sugerencias.id, { onDelete: 'cascade' }),
  generoId: integer('genero_id')
    .notNull()
    .references(() => generos.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.sugerenciaId, t.generoId] }),
  generoIdIdx: index('sugerencias_generos_genero_id_idx').on(t.generoId),
}));

export const sugerenciasRelations = relations(sugerencias, ({ many, one }) => ({
  sugerenciasGeneros: many(sugerenciasGeneros),
  creadoPorUser: one(user, {
    fields: [sugerencias.creadoPor],
    references: [user.id],
  }),
}));

export const sugerenciasGenerosRelations = relations(sugerenciasGeneros, ({ one }) => ({
  sugerencia: one(sugerencias, {
    fields: [sugerenciasGeneros.sugerenciaId],
    references: [sugerencias.id],
  }),
  genero: one(generos, {
    fields: [sugerenciasGeneros.generoId],
    references: [generos.id],
  }),
}));
