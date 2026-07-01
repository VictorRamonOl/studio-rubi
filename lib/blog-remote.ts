import type { BlogPost, ContentBlock } from "@/data/blog"

// Lê posts publicados no app (Supabase) e os converte pro mesmo formato do blog
// em arquivo — assim ganham URL própria, metadata, JSON-LD e sitemap (SEO).
// Falha em silêncio (retorna []) se o Supabase estiver indisponível: o site
// continua funcionando só com os posts em arquivo.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const REVALIDATE = 300 // segundos: posts novos aparecem/indexam em até 5 min

type RemoteRow = {
  slug: string
  title: string
  excerpt: string | null
  body: string | null
  cover_url: string | null
  created_at: string
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// converte texto simples (com ## / ### / - ) em blocos do blog
function toBlocks(body: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  let list: string[] = []
  const flush = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list })
      list = []
    }
  }
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) {
      flush()
      continue
    }
    if (line.startsWith("### ")) {
      flush()
      blocks.push({ type: "h3", text: line.slice(4) })
    } else if (line.startsWith("## ")) {
      flush()
      blocks.push({ type: "h2", text: line.slice(3) })
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      list.push(line.slice(2))
    } else {
      flush()
      blocks.push({ type: "p", text: line })
    }
  }
  flush()
  return blocks
}

function toBlogPost(r: RemoteRow): BlogPost {
  const body = r.body ?? ""
  const excerpt = r.excerpt ?? body.slice(0, 160)
  return {
    slug: r.slug,
    title: r.title,
    excerpt,
    metaTitle: `${r.title} — Studio Rubi`,
    metaDescription: excerpt,
    keywords: [],
    category: "Lifestyle e Prevenção",
    publishedAt: r.created_at.slice(0, 10),
    readingTime: readingTime(body),
    coverImage: r.cover_url ?? "",
    content: toBlocks(body),
  }
}

async function fetchRemote(query: string): Promise<RemoteRow[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/content_posts?${query}`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        next: { revalidate: REVALIDATE },
      }
    )
    if (!res.ok) return []
    return (await res.json()) as RemoteRow[]
  } catch {
    return []
  }
}

const SELECT = "select=slug,title,excerpt,body,cover_url,created_at&audience=eq.public&published=eq.true"

export async function getRemotePosts(): Promise<BlogPost[]> {
  const rows = await fetchRemote(`${SELECT}&order=created_at.desc`)
  return rows.map(toBlogPost)
}

export async function getRemotePostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await fetchRemote(`${SELECT}&slug=eq.${encodeURIComponent(slug)}&limit=1`)
  return rows[0] ? toBlogPost(rows[0]) : null
}
