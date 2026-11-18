# Arquitectura de Animepol

Catálogo estático de anime clasificado en el diagrama de Nolan, con un módulo temporal de
asignación a partidos políticos con motivo de las elecciones generales del 29N de 2026.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 7, salida 100 % estática |
| Contenido | Astro Content Collections (Markdown + JSON) |
| Estilos | Tailwind CSS v4 vía `@tailwindcss/vite` |
| Iconos | `@lucide/astro` + SVG propios |
| Hosting | Cloudflare Workers, static assets (`wrangler.jsonc`) |
| CI | Cloudflare Workers Builds sobre `main` |

Sin SSR, sin adapter, sin API routes, sin base de datos en producción.

## Estructura

```
src/
  components/
    anime/AnimeCard.astro       tarjeta con póster, pegatina de partido y estrellas
    anime/AnimeList.astro       grid de tarjetas
    search/SearchBar.astro      buscador con atajos Ctrl+K
    Catalogo.astro              home: hero, filtros, búsqueda, grid, scroll
    NolanChart.astro            rombo de Nolan para un anime
    NolanScatter.astro          rombo con la media de cada partido
    Evento29N.astro             cabecera 29N usada en /estadisticas
    DiscordIcon.astro           marca de Discord en currentColor
    Creditos.astro, ThemeToggle.astro, Spoiler.astro
  content/
    animes/<slug>.md            una ficha por anime
    generos/<slug>.json         géneros canónicos
    partidos/<slug>.json        partidos del evento 29N
  layouts/Layout.astro          head, SEO, tema, script de AdSense (placeholder)
  lib/
    utils.ts                    ideologías, colores, DISCORD_INVITE, PARTIDOS_CORTE
    spoilers.ts                 parseo de (Spoiler)[...]
  pages/
    index.astro                 home
    anime/[slug].astro          ficha de anime
    diagrama-nolan.astro        explicación del diagrama
    partidos.astro              evento: scatter, CTA del quiz, selector y slider
    partidos/[slug].astro       ficha de partido con sus animes
    partidos/quiz.astro         quiz de diez preguntas
    estadisticas.astro          destacados, medias y géneros
    404.astro                   página de error
    robots.txt.ts, sitemap.xml.ts
  styles/globals.css            tokens de color, Tailwind, animaciones
public/
  29n/*.svg                     logos de partidos
  images/animes/*.webp          pósters ~700×1050, calidad 82
  _headers, _redirects, favicon, og-image, kanji
docs/propuesta-partidos-29n.md  reparto y justificaciones del evento
wrangler.jsonc                  assets estáticos de Workers
```

## Modelo de contenido

`animes`

```yaml
titulo, slug, nombresAlternativos, sinopsis, analisisPolitico,
anoLanzamiento, imagen, libertadEconomica (1-5), libertadPersonal (1-5),
generos[], partido?, justificacionPartido?
```

`generos`: `nombre`, `slug`.

`partidos`: `nombre`, `siglas`, `color` (`#RRGGBB`), `ideologia`, `descripcion`, `promesa`,
`contradiccion`, `frase`, `logo`, `orden`.

Regla: `src/content.config.ts` y `.pages.yml` se mantienen en sync. El tono de `analisisPolitico`
es humor seco en segunda persona, con un bloque `(Spoiler)[...]` al final.

## Flujo de datos

- Todo el contenido se resuelve en build con `getCollection`.
- Los cálculos del evento (medias de Nolan por partido, teaser, listas de `/estadisticas`) se hacen
  en el frontmatter de cada página, nunca en cliente.
- La interactividad vive en islas de `<script>` sin framework: filtros del catálogo, slider de
  partidos, quiz, y el botón de volver arriba.
- `PARTIDOS_CORTE` (`2026-12-13`) decide en build si el módulo de partidos se renderiza. El corte
  es por fecha de build, no por reloj del visitante.

## Rutas y estado actual

| Ruta | Contenido |
|---|---|
| `/` | Hero con Nolan + 29N + Discord, buscador, filtros de partido, grid |
| `/anime/<slug>` | Ficha, Nolan, bloque de partido, related del mismo partido |
| `/partidos` | 29N, scatter de medias, CTA del quiz, selector tipo home y slider de un partido |
| `/partidos/<slug>` | Ficha de partido con medias y sus animes |
| `/partidos/quiz` | Portada a pantalla completa, juego a dos columnas, resultado con aciertos y fallos |
| `/estadisticas` | Récords por eje, media por partido, géneros |
| `/diagrama-nolan` | Explicación del modelo |

## Evento 29N

- 44 animes repartidos entre seis partidos (PP, PSOE, VOX, SALF, Podemos, Frente Amplio).
- Reparto actual 8/7/7/8/7/7; no hay equilibrio exacto por los últimos animes añadidos.
- Descripciones de partido en tres capas: `promesa`, `contradiccion` y `frase`.
- Toda la superficie lleva nota de sátira; sin logos oficiales alterados ni afirmaciones de hecho.
- Al pasar la fecha de corte desaparecen del build el bloque de ficha, la pegatina de tarjeta, el
  filtro y la cabecera 29N. `/partidos` y sus hijas siguen existiendo con el aviso "Evento finalizado".

## Estilos y convenciones

- Tokens en `globals.css`: `background`, `foreground`, `primary`, `muted`, `border`, `card`.
- Tema claro/oscuro por clase `dark` en `html`, persistido en `localStorage`.
- Iconos siempre de `@lucide/astro`; la marca de Discord es SVG propio.
- Evitar contenedores tipo card donde el diseño pide bloques planos: hero del catálogo, teaser del
  quiz, scatter de `/partidos`, quiz completo.
- Imágenes: WebP ~700 px de ancho y calidad 82; los logos de partido viven en `public/29n`.
- Animaciones cortas y en CSS; se respeta `prefers-reduced-motion` en scroll y transiciones grandes.

## Build y despliegue

```bash
pnpm dev        # servidor local
pnpm check      # type check de Astro
pnpm build      # astro build → dist/
pnpm verify     # check + build
pnpm lint       # eslint
```

Cloudflare Workers Builds: build `pnpm build`, deploy `npx wrangler deploy`. `wrangler.jsonc`
declara solo `assets.directory = ./dist` y `not_found_handling = "404-page"`; no hay adapter ni
runtime de Worker. `_redirects` y `_headers` se copian desde `public/`.

## Hecho

- Migración completa de Next.js a Astro estático.
- Pósters a WebP y limpieza de imágenes de prueba.
- Página 404 propia, sitemap y robots.
- Enlace a Discord en hero y ficha.
- Módulo 29N completo: datos, bloque, pegatina, filtro, páginas, estadísticas y quiz.
- Quiz con portada, progreso, récord local, compartir, atajos, aciertos y fallos.
- Botón de volver arriba con animación y microanimaciones de búsqueda y filtros.
- Slug antiguo de LOTGH corregido con 301 en `_redirects`.

## Pendiente

- [ ] Retirar el módulo de partidos tras el 13/12/2026 (`PARTIDOS_CORTE`).
- [ ] Decidir si `/partidos` y `/estadisticas` se quedan como archivo o se retiran con el evento.
- [ ] Reequilibrar el reparto 8/7/7/7/7/7 si se quiere exacto.
- [ ] Eliminar el script de AdSense de `Layout.astro`, que sigue con un `pId` de ejemplo.
- [ ] Sustituir los pósters de 425×600 de los tres últimos animes por originales mayores.

## Descartado

- AdSense en producción: no se va a integrar.
- Pages CMS: edición manual de Markdown y JSON.
- Analytics: sin eventos personalizados en Cloudflare Web Analytics.
- Foro propio: la conversación vive en Discord.
