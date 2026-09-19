import type { MetadataRoute } from "next"
import { APP_URL } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_URL
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}
