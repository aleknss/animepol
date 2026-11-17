# Astro static project

- Output is static. No SSR adapter, no Workers, no API routes unless explicitly requested.
- Content lives in `src/content/animes` and `src/content/generos`.
- `src/content.config.ts` and `.pages.yml` must stay in sync.
- Anime images live in `public/images/animes`. Prefer `.webp` ~700px wide, quality 82.
- Use `@lucide/astro` for icons.
- Redirects for renamed slugs live in `public/_redirects` (Cloudflare Pages format).
- Verify changes with `pnpm check` and `pnpm build`.

## Pendiente

- [ ] Configurar Pages CMS: GitHub App, repo y branch.
- [ ] Configurar Cloudflare Pages: build `pnpm build`, output `dist`.
- [ ] Confirmar el `pId` real de AdSense en `src/layouts/Layout.astro`.
- [ ] Evaluar Cloudflare Web Analytics.
- [ ] Crear servidor Discord y poner la invite real en `src/lib/utils.ts` (`DISCORD_INVITE`).
