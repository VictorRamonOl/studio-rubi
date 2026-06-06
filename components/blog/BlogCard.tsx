import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/data/blog"
import BlogCover from "./BlogCover"

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-")
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ]
  return `${d} ${months[parseInt(m) - 1]} ${y}`
}

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost
  featured?: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div
        className={`relative w-full ${
          featured ? "h-72" : "h-52"
        } overflow-hidden`}
      >
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
          <BlogCover
            title={post.title}
            category={post.category}
            slug={post.slug}
            variant="card"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-gold/40">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime} min
          </span>
        </div>
        <h3
          className={`font-serif text-dark mb-2 leading-snug group-hover:text-wine transition-colors ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-wine text-sm font-medium">
          Ler artigo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
