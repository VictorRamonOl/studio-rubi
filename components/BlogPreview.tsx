import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ALL_BLOG_POSTS } from "@/data/blog"
import BlogCard from "@/components/blog/BlogCard"

export default function BlogPreview() {
  const posts = ALL_BLOG_POSTS.slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Do nosso blog
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark">
              Conteúdo prático pra você{" "}
              <span className="text-wine">cuidar do seu corpo</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-wine text-sm font-medium hover:gap-3 transition-all"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
