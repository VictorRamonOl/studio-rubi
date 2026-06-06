import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Crumb = { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="text-xs text-cream/60 flex items-center gap-1.5 flex-wrap"
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {c.href && !isLast ? (
              <Link
                href={c.href}
                className="hover:text-gold transition-colors"
              >
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gold/80" : ""}>{c.label}</span>
            )}
            {!isLast && (
              <ChevronRight className="w-3 h-3 text-cream/30" aria-hidden="true" />
            )}
          </span>
        )
      })}
    </nav>
  )
}
