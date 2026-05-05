ALTER TABLE "sugerencias" DROP CONSTRAINT "sugerencias_creado_por_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sugerencias" ALTER COLUMN "creado_por" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sugerencias" ADD CONSTRAINT "sugerencias_creado_por_user_id_fk" FOREIGN KEY ("creado_por") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;