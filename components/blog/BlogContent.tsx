import { MessageCircle } from "lucide-react"
import type { ContentBlock } from "@/data/blog"
import { WHATSAPP_URL } from "@/lib/constants"
import { headingId } from "@/lib/blog-toc"

export default function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  // ids dos títulos (âncoras do índice) — mesma lógica de extractHeadings
  const ids: Record<number, string> = {}
  const seen = new Set<string>()
  blocks.forEach((b, i) => {
    if (b.type === "h2" || b.type === "h3") {
      let id = headingId(b.text)
      let n = 2
      while (seen.has(id)) id = `${headingId(b.text)}-${n++}`
      seen.add(id)
      ids[i] = id
    }
  })

  return (
    <div className="prose-blog max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={ids[i]}
                className="font-serif text-2xl md:text-3xl text-dark mt-12 mb-4 leading-tight scroll-mt-28"
              >
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3
                key={i}
                id={ids[i]}
                className="font-serif text-xl text-dark mt-8 mb-3 leading-tight scroll-mt-28"
              >
                {block.text}
              </h3>
            )
          case "p":
            return (
              <p
                key={i}
                className="text-dark/85 text-base leading-relaxed mb-5"
              >
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul key={i} className="space-y-2 mb-6 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-dark/85 text-base leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case "ordered":
            return (
              <ol key={i} className="space-y-3 mb-6 pl-1 counter-reset">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-dark/85 text-base leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-wine/10 text-wine text-xs font-semibold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-gold bg-cream p-5 rounded-r-xl my-6 italic text-dark/85"
              >
                {block.text}
                {block.author && (
                  <footer className="mt-2 text-sm not-italic text-muted">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            )
          case "cta":
            return (
              <div
                key={i}
                className="my-10 p-6 rounded-2xl border border-gold/30"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(104,29,49,0.04) 0%, rgba(200,158,81,0.06) 100%)",
                }}
              >
                <p className="text-dark text-base font-medium mb-4">
                  {block.text}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wine text-cream px-5 py-3 rounded-full font-semibold text-sm hover:bg-wine-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar pelo WhatsApp
                </a>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
