import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://animepol.xyz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const animes = await db.query.animes.findMany({
    columns: { slug: true, creadoEn: true },
  });

  const animeEntries: MetadataRoute.Sitemap = animes.map((anime) => ({
    url: `${baseUrl}/anime/${anime.slug}`,
    lastModified: anime.creadoEn ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/diagrama-nolan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sugerir`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...animeEntries,
  ];
}
