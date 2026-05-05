ALTER TABLE "sugerencias_generos" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "sugerencias_generos" CASCADE;--> statement-breakpoint
ALTER TABLE "sugerencias" DROP CONSTRAINT "sug_chk_libertad_econ";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP CONSTRAINT "sug_chk_libertad_pers";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "nombres_alternativos";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "analisis_politico";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "año_lanzamiento";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "imagen_url";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "libertad_economica";--> statement-breakpoint
ALTER TABLE "sugerencias" DROP COLUMN "libertad_personal";