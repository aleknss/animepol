import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { animes, animesGeneros } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const { titulo, slug, nombresAlternativos, sinopsis, analisisPolitico, añoLanzamiento, imagenUrl, libertadEconomica, libertadPersonal, generoIds } = body

  if (!titulo || !slug || libertadEconomica == null || libertadPersonal == null) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
  }

  await db
    .update(animes)
    .set({
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
    .where(eq(animes.id, parseInt(id)))

  if (generoIds !== undefined) {
    await db.delete(animesGeneros).where(eq(animesGeneros.animeId, parseInt(id)))
    if (generoIds.length > 0) {
      await db.insert(animesGeneros).values(
        generoIds.map((gid: number) => ({
          animeId: parseInt(id),
          generoId: gid,
        }))
      )
    }
  }

  revalidatePath("/")
  return NextResponse.json({ success: true })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { id } = await params
  await db.delete(animes).where(eq(animes.id, parseInt(id)))

  revalidatePath("/")
  return NextResponse.json({ success: true })
}
