"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

type Item = { title: string; slug: string; excerpt: string }

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

export default function BlogSearch({ posts }: { posts: Item[] }) {
  const [q, setQ] = useState("")
  const results = useMemo(() => {
    const term = norm(q.trim())
    if (term.length < 2) return []
    return posts
      .filter((p) => norm(p.title).includes(term) || norm(p.excerpt).includes(term))
      .slice(0, 8)
  }, [q, posts])

  return (
    <div className="rounded-2xl border border-gold/20 bg-white p-4 shadow-sm">
      <label htmlFor="blog-search" className="mb-2 block text-sm font-semibold text-wine">
        Buscar no blog
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          id="blog-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex: dor lombar, gestante, joelho..."
          className="w-full rounded-lg border border-black/10 bg-cream py-2.5 pl-9 pr-3 text-sm outline-none focus:border-wine focus:ring-1 focus:ring-wine"
        />
      </div>

      {q.trim().length >= 2 && (
        <div className="mt-3">
          {results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="block rounded-lg px-2 py-1.5 text-sm text-dark/80 transition-colors hover:bg-cream hover:text-wine">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-2 py-1.5 text-sm text-muted">Nada encontrado para “{q}”.</p>
          )}
        </div>
      )}
    </div>
  )
}
