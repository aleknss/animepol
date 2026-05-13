<p align="center">
  <img src="public/kanji.svg" alt="Animepol" width="100" />
</p>

<h1 align="center">Animepol</h1>

<p align="center">
  Catálogo de anime clasificado según el <a href="https://es.wikipedia.org/wiki/Diagrama_de_Nolan">diagrama de Nolan</a>.
  Cada serie y película recibe una puntuación de libertad económica (1–5) y libertad personal (1–5).
</p>

<p align="center">
  <a href="https://animepol.xyz">animepol.xyz</a>
</p>

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Base de datos | PostgreSQL (Supabase) |
| ORM | Drizzle ORM |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| Auth | better-auth |
| Hosting | Vercel + [@vercel/analytics](https://vercel.com/analytics) |

## Setup local

```bash
git clone https://github.com/4lekius/animepol.git
cd animepol
npm install
```

Variables requeridas:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Conexión a PostgreSQL |
| `BETTER_AUTH_SECRET` | Secreto para better-auth |
| `BETTER_AUTH_URL` | URL base (local: `http://localhost:3000`) |
| `SUPABASE_URL` | URL del proyecto de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase |

2. Sincroniza el esquema de base de datos:

```bash
npx drizzle-kit push
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
animepol/
├── app/              # App Router (layout, páginas, API routes)
│   ├── anime/[slug]/ # Página de detalle de anime
│   ├── diagrama-nolan/ # Explicación del diagrama de Nolan
│   ├── sugerir/      # Formulario para sugerir animes
│   ├── login/        # Login admin
│   └── dashboard/    # Panel de administración
├── components/       # Componentes React
├── db/               # Esquema Drizzle + configuración DB
├── lib/              # Utilidades compartidas
└── hooks/            # Hooks personalizados
```

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Ejecutar ESLint |

## Contribuir

- **Sugerir anime**: Usa el formulario en [/sugerir](https://animepol.xyz/sugerir)
- **Pull requests**: Bienvenidas. Si es un cambio grande, abre un issue primero para discutirlo.

## Licencia

MIT © Alek Suso