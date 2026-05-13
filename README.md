# Animepol

Catálogo de anime clasificado según el [diagrama de Nolan](https://es.wikipedia.org/wiki/Diagrama_de_Nolan). Cada serie y película recibe una puntuación de libertad económica (1–5) y libertad personal (1–5).

**[animepol.xyz](https://animepol.xyz)**

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

1. Copiá `.env.example` a `.env` y completá las variables:

```bash
cp .env.example .env
```

Variables requeridas:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Conexión a PostgreSQL |
| `BETTER_AUTH_SECRET` | Secreto para better-auth |
| `BETTER_AUTH_URL` | URL base (local: `http://localhost:3000`) |
| `SUPABASE_URL` | URL del proyecto de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase |

2. Sincronizá el esquema de base de datos:

```bash
npx drizzle-kit push
```

3. Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

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

- **Sugerir anime**: Usá el formulario en [/sugerir](https://animepol.xyz/sugerir)
- **Reportar bugs**: Abrí un [issue](https://github.com/4lekius/animepol/issues)
- **Pull requests**: Bienvenidas. Si es un cambio grande, abrí un issue primero para discutirlo.

## Licencia

MIT © Alek Suso
