<p align="center">
  <img src="public/kanji.svg" alt="Animepol" width="100" />
</p>

<h1 align="center">Animepol</h1>

<p align="center">
  Catálogo de anime clasificado según el <a href="https://es.wikipedia.org/wiki/Diagrama_de_Nolan">diagrama de Nolan</a>.
  Cada serie y película recibe una puntuación de libertad económica (1-5) y libertad personal (1-5).
</p>

<p align="center">
  <a href="https://animepol.xyz">animepol.xyz</a>
</p>

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Astro 7 (static) |
| Contenido | Astro Content Collections |
| CMS | [Pages CMS](https://pagescms.org) |
| Estilos | Tailwind CSS v4 |
| Iconos | `@lucide/astro` |
| Hosting | Cloudflare Pages |

## Setup local

```bash
git clone https://github.com/4lekius/animepol.git
cd animepol
pnpm install
pnpm dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Contenido

- Animes: `src/content/animes/<slug>.md`
- Géneros: `src/content/generos/<slug>.json`
- Imágenes: `public/images/animes/`

La edición se puede hacer por Markdown o desde Pages CMS usando `.pages.yml`.

## Comandos

| Comando | Acción |
|---------|--------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm check` | Type check de Astro |
| `pnpm build` | Build estático en `dist/` |
| `pnpm preview` | Preview local del build |
| `pnpm lint` | Ejecutar ESLint |
| `pnpm export:content` | Exportar contenido desde Supabase |

## Deploy

Cloudflare Pages:

- Build command: `pnpm build`
- Output directory: `dist`
- Variables: ninguna en runtime

## Export inicial

Solo para regenerar contenido desde Supabase:

```bash
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
pnpm export:content
```

No se usa en producción.

## Licencia

MIT © Alek Suso
