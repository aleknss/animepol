import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/lib/auth"

const BUCKET = "images"

function getExt(file: File): string {
  const name = file.name.split(".").pop()?.toLowerCase()
  if (name === "png") return "png"
  return "jpg"
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const thumb = formData.get("thumb") as File | null
  const slug = formData.get("slug") as string | null

  if (!file || !slug) {
    return NextResponse.json({ error: "Faltan archivo o slug" }, { status: 400 })
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 })
  }

  const ext = getExt(file)
  const fullName = `${slug}.${ext}`
  const thumbName = `${slug}-thumb.${ext}`

  const storage = getSupabaseAdmin().storage.from(BUCKET)

  const { error: fullError } = await storage.upload(fullName, file, {
    contentType: `image/${ext === "png" ? "png" : "jpeg"}`,
    upsert: true,
  })
  if (fullError) {
    return NextResponse.json({ error: fullError.message }, { status: 500 })
  }

  if (thumb) {
    await storage.upload(thumbName, thumb, {
      contentType: thumb.type,
      upsert: true,
    })
  }

  const { data: fullUrl } = storage.getPublicUrl(fullName)
  const { data: thumbUrl } = storage.getPublicUrl(thumbName)

  return NextResponse.json({
    url: fullUrl.publicUrl,
    thumbUrl: thumbUrl.publicUrl,
  })
}
