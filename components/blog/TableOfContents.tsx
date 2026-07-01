import { List } from "lucide-react"
import type { Heading } from "@/lib/blog-toc"

// Índice do post ("Neste artigo") — melhora navegação, leitura e acessibilidade.
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null
  return (
    <nav aria-label="Índice do artigo" className="mb-8 rounded-2xl border border-gold/20 bg-cream p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-wine">
        <List className="h-4 w-4" /> Neste artigo
      </p>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a href={`#${h.id}`} className="text-sm text-dark/75 transition-colors hover:text-wine hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
