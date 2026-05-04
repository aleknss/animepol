import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { animes, animesGeneros } from "@/db/schema"
import { auth } from "@/lib/auth"
import { asc } from "drizzle-orm"

export async function GET() {
  const data = await db.query.animes.findMany({
    with: {
      animesGeneros: {
        with: { genero: true },
      },
    },
    orderBy: asc(animes.titulo),
  })

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()
  const { titulo, slug, nombresAlternativos, sinopsis, analisisPolitico, añoLanzamiento, imagenUrl, libertadEconomica, libertadPersonal, generoIds } = body

  if (!titulo || !slug || libertadEconomica == null || libertadPersonal == null) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
  }

  const [anime] = await db
    .insert(animes)
    .values({
      titulo,
      slug,
      nombresAlternativos: nombresAlternativos || [],
      sinopsis: sinopsis || null,
      analisisPolitico: analisisPolitico || null,
      añoLanzamiento: añoLanzamiento || null,
      imagenUrl: imagenUrl || null,
      libertadEconomica,
      libertadPersonal,
    })
    .returning()

  if (generoIds && generoIds.length > 0) {
    await db.insert(animesGeneros).values(
      generoIds.map((gid: number) => ({
        animeId: anime.id,
        generoId: gid,
      }))
    )
  }

  return NextResponse.json(anime, { status: 201 })
}