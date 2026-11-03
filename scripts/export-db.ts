import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son obligatorias')
}

const root = process.cwd()
const animesDir = path.join(root, 'src', 'content', 'animes')
const generosDir = path.join(root, 'src', 'content', 'generos')
const imagesDir = path.join(root, 'public', 'images', 'animes')

const headers = {
  apikey: serviceRoleKey,
  Authorization: `Bearer ${serviceRoleKey}`,
  Accept: 'application/json',
}

type AnimeRow = {
  id: number
  titulo: string
  slug: string
  nombres_alternativos: string[] | null
  sinopsis: string | null
  analisis_politico: string | null
  'año_lanzamiento': number | null
  imagen_url: string | null
  libertad_economica: number
  libertad_personal: number
}

type GeneroRow = {
  id: number
  nombre: string
}

type AnimeGeneroRow = {
  anime_id: number
  genero_id: number
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toFrontmatter(data: Record<string, unknown>): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`)
        continue
      }

      lines.push(`${key}:`)
      for (const item of value) {
        lines.push(`  - ${JSON.stringify(String(item))}`)
      }
      continue
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      lines.push(`${key}: ${value}`)
      continue
    }

    lines.push(`${key}: ${JSON.stringify(String(value))}`)
  }

  return lines.join('\n')
}

function imageExtension(contentType: string, url: string): string {
  if (contentType.includes('png')) return 'png'
  if (contentType.includes('webp')) return 'webp'
  if (contentType.includes('avif')) return 'avif'
  if (contentType.includes('gif')) return 'gif'
  if (contentType.includes('svg')) return 'svg'
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg'

  const extension = path.extname(new URL(url).pathname).replace('.', '').toLowerCase()
  return extension || 'jpg'
}

async function fetchAll<T>(table: string, order: string): Promise<T[]> {
  const pageSize = 1000
  const rows: T[] = []
  let offset = 0

  while (true) {
    const url = new URL(`/rest/v1/${table}`, supabaseUrl)
    url.searchParams.set('select', '*')
    url.searchParams.set('order', order)
    url.searchParams.set('limit', String(pageSize))
    url.searchParams.set('offset', String(offset))

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`${table}: ${response.status} ${await response.text()}`)
    }

    const page = (await response.json()) as T[]
    rows.push(...page)

    if (page.length < pageSize) break
    offset += pageSize
  }

  return rows
}

async function downloadImage(url: string, slug: string): Promise<string | null> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const extension = imageExtension(response.headers.get('content-type') ?? '', url)
    const filename = `${slug}.${extension}`
    const buffer = Buffer.from(await response.arrayBuffer())

    await writeFile(path.join(imagesDir, filename), buffer)

    return `/images/animes/${filename}`
  } catch (error) {
    console.warn(`imagen fallida ${slug}: ${(error as Error).message}`)
    return null
  }
}

async function main() {
  await Promise.all([
    mkdir(animesDir, { recursive: true }),
    mkdir(generosDir, { recursive: true }),
    mkdir(imagesDir, { recursive: true }),
  ])

  const [animes, generos, animeGeneros] = await Promise.all([
    fetchAll<AnimeRow>('animes', 'id.asc'),
    fetchAll<GeneroRow>('generos', 'id.asc'),
    fetchAll<AnimeGeneroRow>('animes_generos', 'anime_id.asc,genero_id.asc'),
  ])

  const generoById = new Map(generos.map((genero) => [genero.id, genero.nombre]))
  const generosByAnime = new Map<number, string[]>()

  for (const relation of animeGeneros) {
    const nombre = generoById.get(relation.genero_id)
    if (!nombre) continue

    const list = generosByAnime.get(relation.anime_id) ?? []
    list.push(nombre)
    generosByAnime.set(relation.anime_id, list)
  }

  const seenSlugs = new Set<string>()
  let downloadedImages = 0
  let failedImages = 0

  for (const anime of animes) {
    if (!/^[a-z0-9-]+$/.test(anime.slug)) {
      throw new Error(`Slug inválido: ${anime.slug}`)
    }

    if (seenSlugs.has(anime.slug)) {
      throw new Error(`Slug duplicado: ${anime.slug}`)
    }

    seenSlugs.add(anime.slug)

    const imagen = anime.imagen_url
      ? await downloadImage(anime.imagen_url, anime.slug)
      : null

    if (imagen) {
      downloadedImages++
    } else if (anime.imagen_url) {
      failedImages++
    }

    const animeGenerosList = (generosByAnime.get(anime.id) ?? [])
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'es'))

    const frontmatter = toFrontmatter({
      titulo: anime.titulo,
      slug: anime.slug,
      nombresAlternativos: anime.nombres_alternativos ?? [],
      sinopsis: anime.sinopsis,
      analisisPolitico: anime.analisis_politico,
      anoLanzamiento: anime['año_lanzamiento'],
      imagen,
      libertadEconomica: anime.libertad_economica,
      libertadPersonal: anime.libertad_personal,
      generos: animeGenerosList,
    })

    await writeFile(
      path.join(animesDir, `${anime.slug}.md`),
      `---\n${frontmatter}\n---\n`,
      'utf8',
    )
  }

  for (const genero of generos) {
    const slug = slugify(genero.nombre)

    await writeFile(
      path.join(generosDir, `${slug}.json`),
      `${JSON.stringify({ nombre: genero.nombre, slug }, null, 2)}\n`,
      'utf8',
    )
  }

  const usedGeneros = new Set([...generosByAnime.values()].flat())
  const missingImages = animes.filter((anime) => anime.imagen_url === null).length

  console.log(`Animes exportados: ${animes.length}`)
  console.log(`Géneros exportados: ${generos.length}`)
  console.log(`Géneros usados: ${usedGeneros.size}`)
  console.log(`Imágenes descargadas: ${downloadedImages}`)
  console.log(`Imágenes fallidas: ${failedImages}`)
  console.log(`Animes sin imagen: ${missingImages}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
