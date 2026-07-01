import type { ContentBlock } from "@/data/blog"

// slug de heading (usado no id do <h2>/<h3> e nos links do índice)
export function headingId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
}

export type Heading = { id: string; text: string; level: 2 | 3 }

// extrai os títulos (h2/h3) de um post para montar o índice
export function extractHeadings(blocks: ContentBlock[]): Heading[] {
  const out: Heading[] = []
  const seen = new Set<string>()
  for (const b of blocks) {
    if (b.type === "h2" || b.type === "h3") {
      let id = headingId(b.text)
      let n = 2
      while (seen.has(id)) id = `${headingId(b.text)}-${n++}`
      seen.add(id)
      out.push({ id, text: b.text, level: b.type === "h2" ? 2 : 3 })
    }
  }
  return out
}
