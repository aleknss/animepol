# Astro static project

- Output is static. No SSR adapter, no Workers, no API routes unless explicitly requested.
- Content lives in `src/content/animes` and `src/content/generos`.
- `src/content.config.ts` and `.pages.yml` must stay in sync.
- Anime images live in `public/images/animes`. Prefer `.webp` ~700px wide, quality 82.
- Use `@lucide/astro` for icons.
- Redirects for renamed slugs live in `public/_redirects` (Cloudflare Pages format).
- Verify changes with `pnpm check` and `pnpm build`.

## Pendiente

- [ ] Retirar el módulo de partidos tras el 13/12/2026 (`PARTIDOS_CORTE` en `src/lib/utils.ts`).
