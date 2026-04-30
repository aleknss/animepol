CREATE TABLE "animes" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"sinopsis" text,
	"año_lanzamiento" integer,
	"libertad_economica" integer NOT NULL,
	"libertad_personal" integer NOT NULL,
	"cuadrante" varchar(50),
	CONSTRAINT "animes_titulo_unique" UNIQUE("titulo"),
	CONSTRAINT "chk_libertad_econ" CHECK ("animes"."libertad_economica" BETWEEN 1 AND 5),
	CONSTRAINT "chk_libertad_pers" CHECK ("animes"."libertad_personal" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "animes_generos" (
	"anime_id" integer NOT NULL,
	"genero_id" integer NOT NULL,
	CONSTRAINT "animes_generos_anime_id_genero_id_pk" PRIMARY KEY("anime_id","genero_id")
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(50) NOT NULL,
	CONSTRAINT "genres_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
ALTER TABLE "animes_generos" ADD CONSTRAINT "animes_generos_anime_id_animes_id_fk" FOREIGN KEY ("anime_id") REFERENCES "public"."animes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "animes_generos" ADD CONSTRAINT "animes_generos_genero_id_genres_id_fk" FOREIGN KEY ("genero_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;