import { MetadataRoute } from "next"
import { SERVICE_PAGES } from "@/data/service-pages"
import { ALL_BLOG_POSTS } from "@/data/blog"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/politica-privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
