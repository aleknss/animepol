import type { MetadataRoute } from "next";

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://animepol.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/login/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
