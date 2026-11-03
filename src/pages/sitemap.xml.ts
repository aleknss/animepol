import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://www.animepol.xyz')
  const animes = await getCollection('animes')

  const entries = [
    {
      url: new URL('/', base).toString(),
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      url: new URL('/diagrama-nolan/', base).toString(),
      changefreq: 'monthly',
      priority: '0.6',
    },
    ...animes.map((anime) => ({
      url: new URL(`/anime/${anime.data.slug}/`, base).toString(),
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
