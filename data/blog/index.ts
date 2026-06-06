import { DOR_E_LESOES_POSTS } from "./posts/dor-e-lesoes"
import { GESTANTES_PUERPERIO_POSTS } from "./posts/gestantes-puerperio"
import { METODOS_TRATAMENTOS_POSTS } from "./posts/metodos-e-tratamentos"
import { IDOSOS_REABILITACAO_POSTS } from "./posts/idosos-reabilitacao"
import { ESPORTES_PERFORMANCE_POSTS } from "./posts/esportes-performance"
import { LIFESTYLE_PREVENCAO_POSTS } from "./posts/lifestyle-prevencao"
import type { BlogPost, BlogCategory } from "./types"

export type { BlogPost, BlogCategory, ContentBlock } from "./types"

export const ALL_BLOG_POSTS: BlogPost[] = [
  ...DOR_E_LESOES_POSTS,
  ...GESTANTES_PUERPERIO_POSTS,
  ...METODOS_TRATAMENTOS_POSTS,
  ...IDOSOS_REABILITACAO_POSTS,
  ...ESPORTES_PERFORMANCE_POSTS,
  ...LIFESTYLE_PREVENCAO_POSTS,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Dor e Lesões",
  "Gestantes e Puerpério",
  "Métodos e Tratamentos",
  "Idosos e Reabilitação",
  "Esportes e Performance",
  "Lifestyle e Prevenção",
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return ALL_BLOG_POSTS.filter((p) => p.category === category)
}

export function getRelatedPosts(
  slug: string,
  limit = 3
): BlogPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []
  if (post.relatedSlugs?.length) {
    const related = post.relatedSlugs
      .map((s) => getPostBySlug(s))
      .filter(Boolean) as BlogPost[]
    if (related.length >= limit) return related.slice(0, limit)
  }
  return ALL_BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, limit)
}

export function getAllPostSlugs(): string[] {
  return ALL_BLOG_POSTS.map((p) => p.slug)
}
