export type BlogCategory =
  | "Dor e Lesões"
  | "Gestantes e Puerpério"
  | "Métodos e Tratamentos"
  | "Idosos e Reabilitação"
  | "Esportes e Performance"
  | "Lifestyle e Prevenção"

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "cta"; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  category: BlogCategory
  publishedAt: string // ISO yyyy-mm-dd
  readingTime: number // minutos
  coverImage: string // path em /public/images/blog/...
  relatedSlugs?: string[]
  ctaServiceSlug?: string
  content: ContentBlock[]
}
