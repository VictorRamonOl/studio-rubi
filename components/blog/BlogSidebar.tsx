import Link from "next/link"
import { Tag, Clock, MessageCircle } from "lucide-react"
import BlogSearch from "./BlogSearch"
import { WHATSAPP_URL } from "@/lib/constants"

type Item = { title: string; slug: string; excerpt: string }
type Link2 = { title: string; slug: string }
type Topic = { label: string; slug: string }

export default function BlogSidebar({
  posts, recents, topics,
}: {
  posts: Item[]
  recents: Link2[]
  topics: Topic[]
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
      <BlogSearch posts={posts} />

      <div className="rounded-2xl border border-gold/20 bg-white p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-wine">
          <Tag className="h-4 w-4" /> Temas
        </p>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Link key={t.slug} href={`/blog/${t.slug}`} className="rounded-full border border-wine/15 bg-cream px-3 py-1.5 text-xs font-medium text-wine transition-colors hover:bg-wine hover:text-cream">
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gold/20 bg-white p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-wine">
          <Clock className="h-4 w-4" /> Mais recentes
        </p>
        <ul className="space-y-2">
          {recents.map((r) => (
            <li key={r.slug}>
              <Link href={`/blog/${r.slug}`} className="block text-sm leading-snug text-dark/80 transition-colors hover:text-wine">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl p-5 text-cream shadow-sm" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)" }}>
        <p className="font-serif text-lg">Ficou com alguma dúvida?</p>
        <p className="mt-1 text-sm text-cream/70">Agende uma avaliação e cuide do seu corpo com quem entende.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-dark hover:bg-gold-mid">
          <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
        </a>
      </div>
    </aside>
  )
}
