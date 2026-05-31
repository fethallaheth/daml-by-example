import { getAllDocPaths } from "@/lib/content"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://daml-by-example.vercel.app"

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  const paths = getAllDocPaths()
  for (const path of paths) {
    entries.push({
      url: `${baseUrl}/${path.section}/${path.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  return entries
}
