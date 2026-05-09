import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sugerencias } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"

export async function PATCH(
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
  const { estado } = body

  if (!["pendiente", "completado", "descartado"].includes(estado)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
  }

  const [updated] = await db
    .update(sugerencias)
    .set({ estado })
    .where(eq(sugerencias.id, parseInt(id)))
    .returning()

  if (!updated) {
    return NextResponse.json({ error: "Sugerencia no encontrada" }, { status: 404 })
  }

  return NextResponse.json(updated)
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

  const [deleted] = await db
    .delete(sugerencias)
    .where(eq(sugerencias.id, parseInt(id)))
    .returning()

  if (!deleted) {
    return NextResponse.json({ error: "Sugerencia no encontrada" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
