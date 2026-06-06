import type { BlogPost, ContentBlock } from "@/data/blog"

export type Slide =
  | { kind: "cover"; title: string; category: string; readingTime: number }
  | { kind: "topic"; index: number; heading: string; body: string }
  | { kind: "cta"; phone: string; site: string }

const MAX_TOPIC_SLIDES = 6

/**
 * Pega o primeiro parágrafo após um H2 ou H3.
 * Combina H3 + parágrafo em um único bloco quando H2 só tem H3s embaixo.
 */
function findParagraphAfter(blocks: ContentBlock[], from: number): string {
  for (let i = from + 1; i < blocks.length; i++) {
    const b = blocks[i]
    if (b.type === "p") return b.text
    if (b.type === "list") return b.items.slice(0, 3).map((it) => `• ${it}`).join("\n")
    if (b.type === "ordered") {
      return b.items
        .slice(0, 3)
        .map((it, k) => `${k + 1}. ${it}`)
        .join("\n")
    }
    if (b.type === "h2") return ""
  }
  return ""
}

/**
 * Trunca preservando frases inteiras.
 */
function smartTruncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  const cut = text.slice(0, maxLen)
  const lastPeriod = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "))
  if (lastPeriod > maxLen * 0.6) return cut.slice(0, lastPeriod + 1)
  const lastSpace = cut.lastIndexOf(" ")
  return cut.slice(0, lastSpace > 0 ? lastSpace : maxLen) + "…"
}

export function extractSlides(post: BlogPost): Slide[] {
  const slides: Slide[] = []

  slides.push({
    kind: "cover",
    title: post.title,
    category: post.category,
    readingTime: post.readingTime,
  })

  const topics: Array<{ heading: string; body: string }> = []
  for (let i = 0; i < post.content.length && topics.length < MAX_TOPIC_SLIDES; i++) {
    const b = post.content[i]
    if (b.type === "h2") {
      const body = findParagraphAfter(post.content, i)
      if (body) {
        topics.push({
          heading: smartTruncate(b.text, 60),
          body: smartTruncate(body, 280),
        })
      }
    }
  }

  topics.forEach((t, idx) => {
    slides.push({ kind: "topic", index: idx + 1, heading: t.heading, body: t.body })
  })

  slides.push({
    kind: "cta",
    phone: "(92) 99285-5658",
    site: "rubistudiopilates.com.br",
  })

  return slides
}

export function slideCount(post: BlogPost): number {
  return extractSlides(post).length
}
