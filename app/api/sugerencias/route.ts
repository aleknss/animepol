import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sugerencias, sugerenciasGeneros, generos } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq, asc } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get("estado")

  const where = estado ? eq(sugerencias.estado, estado as "pendiente" | "completado" | "descartado") : undefined

  const data = await db.query.sugerencias.findMany({
    where,
    with: {
      creadoPorUser: true,
      sugerenciasGeneros: {
        with: { genero: true },
      },
    },
    orderBy: asc(sugerencias.creadoEn),
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

  const [sugerencia] = await db
    .insert(sugerencias)
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
      creadoPor: session.user.id,
    })
    .returning()

  if (generoIds && generoIds.length > 0) {
    await db.insert(sugerenciasGeneros).values(
      generoIds.map((gid: number) => ({
        sugerenciaId: sugerencia.id,
        generoId: gid,
      }))
    )
  }

  return NextResponse.json(sugerencia, { status: 201 })
}
