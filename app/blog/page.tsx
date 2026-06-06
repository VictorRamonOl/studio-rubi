import type { Metadata } from "next"
import Link from "next/link"
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog"
import { buildMetadata, SITE_URL, breadcrumbSchema } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import BlogCard from "@/components/blog/BlogCard"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata: Metadata = buildMetadata({
  title:
    "Blog Studio Rubi — Pilates, Fisioterapia, Postura e Saúde em Manaus",
  description:
    "Artigos escritos por fisioterapeuta com 12 anos de experiência. Dor lombar, gestação, reabilitação, idosos, postura — conteúdo prático para tomar boas decisões pelo seu corpo.",
  path: "/blog",
  keywords: [
    "blog fisioterapia manaus",
    "blog pilates manaus",
    "dor lombar",
    "fisioterapia em casa",
    "pilates para gestantes",
    "reabilitação",
  ],
})

export default function BlogIndex() {
  const featured = ALL_BLOG_POSTS[0]
  const recent = ALL_BLOG_POSTS.slice(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
            ])
          ),
        }}
      />
      <main>
        <Navbar />

        <section
          className="pt-32 pb-16 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: "Início", href: "/" },
                  { label: "Blog" },
                ]}
              />
            </div>

            <p className="text-gold/70 text-xs tracking-[0.4em] uppercase font-medium mb-4">
              Conteúdo da Dra. Rúbia Torres
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mb-5 max-w-3xl">
              Blog do Studio Rubi
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
              Artigos práticos sobre dor, movimento, gestação, reabilitação e
              prevenção — escritos por quem cuida de gente todos os dias.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={`#cat-${encodeURIComponent(cat)}`}
                  className="text-xs text-cream/70 px-3 py-1.5 rounded-full border border-gold/30 hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-2xl text-dark mb-6">
              Mais recente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <BlogCard post={featured} featured />
              {recent.slice(0, 2).map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>

            {BLOG_CATEGORIES.map((category) => {
              const postsInCat = ALL_BLOG_POSTS.filter(
                (p) => p.category === category
              )
              if (!postsInCat.length) return null
              return (
                <div
                  key={category}
                  id={`cat-${encodeURIComponent(category)}`}
                  className="mb-14 scroll-mt-24"
                >
                  <div className="flex items-end justify-between mb-6 border-b border-gold/15 pb-3">
                    <h2 className="font-serif text-2xl text-dark">
                      {category}
                    </h2>
                    <span className="text-xs text-muted">
                      {postsInCat.length} artigo
                      {postsInCat.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsInCat.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  )
}
