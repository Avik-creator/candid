import type { MetadataRoute } from "next"
import { APP_URL } from "@/lib/config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = APP_URL

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sign-in", "/sign-up", "/u/"],
        disallow: ["/dashboard", "/onboarding", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
