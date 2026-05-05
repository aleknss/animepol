import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sugerencias } from "@/db/schema"
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
    },
    orderBy: asc(sugerencias.creadoEn),
  })

  return NextResponse.json(data)
}


export async function POST(req: NextRequest) {
  const body = await req.json()

  const { titulo, cuerpo } = body

  if (!titulo) {
    return NextResponse.json({ error: "El título es requerido" }, { status: 400 })
  }

  const slug = titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  const [sugerencia] = await db
    .insert(sugerencias)
    .values({
      titulo,
      slug,
      sinopsis: cuerpo || null,
      creadoPor: null,
    })
    .returning()

  return NextResponse.json(sugerencia, { status: 201 })
}
