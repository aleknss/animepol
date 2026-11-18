# Astro static project

- Output is static. No SSR adapter, no Workers runtime, no API routes unless explicitly requested.
- Hosting is Cloudflare Workers static assets via `wrangler.jsonc`; never add the Astro adapter.
- Content lives in `src/content/animes`, `src/content/generos` and `src/content/partidos`.
- `src/content.config.ts` and `.pages.yml` must stay in sync.
- Anime images live in `public/images/animes`. Prefer `.webp` ~700px wide, quality 82.
- Party logos live in `public/29n` and are referenced from the `partidos` collection.
- Use `@lucide/astro` for icons; brand marks are custom SVG components.
- Redirects for renamed slugs live in `public/_redirects` (Cloudflare format).
- The 29N module is date-gated by `PARTIDOS_CORTE` in `src/lib/utils.ts`.
- Avoid card containers where the design calls for flat blocks (hero, quiz, party slides).
- Verify changes with `pnpm check` and `pnpm build`.

## Documentation

`ARCHITECTURE.md` is the source of truth for structure, content model, routes, event lifecycle and
backlog. After finishing any meaningful change, review it and update the affected sections before
closing the task.

## Pendiente

- [ ] Retirar el módulo de partidos tras el 13/12/2026 (`PARTIDOS_CORTE` en `src/lib/utils.ts`).
- [ ] Decidir si `/partidos` y `/estadisticas` se archivan o se retiran con el evento.
- [ ] Reequilibrar el reparto 8/7/7/7/7/7 si se quiere exacto.
- [ ] Eliminar o completar el script de AdSense de `src/layouts/Layout.astro` (sigue con un `pId` de ejemplo).
