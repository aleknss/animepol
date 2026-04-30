CREATE TYPE "public"."cuadrante" AS ENUM('Libertario', 'Autoritario', 'Progresista', 'Conservador', 'Centro');--> statement-breakpoint
ALTER TABLE "genres" RENAME TO "generos";--> statement-breakpoint
ALTER TABLE "generos" DROP CONSTRAINT "genres_nombre_unique";--> statement-breakpoint
ALTER TABLE "animes_generos" DROP CONSTRAINT "animes_generos_genero_id_genres_id_fk";
--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "cuadrante" SET DATA TYPE "public"."cuadrante" USING "cuadrante"::"public"."cuadrante";--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "creado_en" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "animes_generos" ADD CONSTRAINT "animes_generos_genero_id_generos_id_fk" FOREIGN KEY ("genero_id") REFERENCES "public"."generos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_cuadrante" ON "animes" USING btree ("cuadrante");--> statement-breakpoint
ALTER TABLE "generos" ADD CONSTRAINT "generos_nombre_unique" UNIQUE("nombre");