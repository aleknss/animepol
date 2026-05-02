CREATE TYPE "public"."estado_sugerencia" AS ENUM('pendiente', 'completado', 'descartado');--> statement-breakpoint
CREATE TABLE "sugerencias" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"nombres_alternativos" text[] DEFAULT '{}',
	"sinopsis" text,
	"analisis_politico" text,
	"año_lanzamiento" integer,
	"imagen_url" text,
	"libertad_economica" integer NOT NULL,
	"libertad_personal" integer NOT NULL,
	"estado" "estado_sugerencia" DEFAULT 'pendiente' NOT NULL,
	"creado_por" text NOT NULL,
	"creado_en" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sug_chk_libertad_econ" CHECK ("sugerencias"."libertad_economica" BETWEEN 1 AND 5),
	CONSTRAINT "sug_chk_libertad_pers" CHECK ("sugerencias"."libertad_personal" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "sugerencias_generos" (
	"sugerencia_id" integer NOT NULL,
	"genero_id" integer NOT NULL,
	CONSTRAINT "sugerencias_generos_sugerencia_id_genero_id_pk" PRIMARY KEY("sugerencia_id","genero_id")
);
--> statement-breakpoint
ALTER TABLE "sugerencias" ADD CONSTRAINT "sugerencias_creado_por_user_id_fk" FOREIGN KEY ("creado_por") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sugerencias_generos" ADD CONSTRAINT "sugerencias_generos_sugerencia_id_sugerencias_id_fk" FOREIGN KEY ("sugerencia_id") REFERENCES "public"."sugerencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sugerencias_generos" ADD CONSTRAINT "sugerencias_generos_genero_id_generos_id_fk" FOREIGN KEY ("genero_id") REFERENCES "public"."generos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sugerencias_slug_idx" ON "sugerencias" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "sugerencias_estado_idx" ON "sugerencias" USING btree ("estado");--> statement-breakpoint
CREATE INDEX "sugerencias_generos_genero_id_idx" ON "sugerencias_generos" USING btree ("genero_id");