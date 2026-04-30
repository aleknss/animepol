DROP INDEX IF EXISTS "idx_cuadrante";--> statement-breakpoint
ALTER TABLE "animes" DROP COLUMN "cuadrante";--> statement-breakpoint
DROP TYPE IF EXISTS "public"."cuadrante";
