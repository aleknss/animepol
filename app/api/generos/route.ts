import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { generos } from "@/db/schema"
import { asc } from "drizzle-orm"

export async function GET() {
  const data = await db
    .select()
    .from(generos)
    .orderBy(asc(generos.nombre))

  return NextResponse.json(data)
}
