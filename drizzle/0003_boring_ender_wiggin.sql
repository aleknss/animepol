-- Add slug column as nullable first
ALTER TABLE "animes" ADD COLUMN "slug" varchar(255);
-- Generate slugs from titles (lowercase, replace non-alphanumeric with hyphens)
UPDATE "animes" SET "slug" = regexp_replace(
  regexp_replace(lower("titulo"), '[^a-z0-9]+', '-', 'g'),
  '(^-+|-+$)', '', 'g'
);
-- Make it NOT NULL and unique
ALTER TABLE "animes" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "animes" ADD CONSTRAINT "animes_slug_unique" UNIQUE("slug");
