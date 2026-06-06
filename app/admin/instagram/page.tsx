import type { Metadata } from "next"
import Link from "next/link"
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog"
import { extractSlides } from "@/lib/instagram/slides"
import { generateCaption } from "@/lib/instagram/caption"
import CarouselPreview from "@/components/admin/CarouselPreview"

export const metadata: Metadata = {
  title: "Admin · Carrosseis Instagram",
  robots: { index: false, follow: false },
}

export default function AdminInstagramPage() {
  const posts = ALL_BLOG_POSTS.map((post) => {
    const slides = extractSlides(post)
    return {
      post,
      slideCount: slides.length,
      caption: generateCaption(post),
    }
  })

  return (
    <main className="min-h-screen bg-dark text-cream">
      <header className="border-b border-gold/15 bg-wine-dark/50 sticky top-0 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-gold/70 text-[10px] tracking-[0.4em] uppercase">
              Painel interno
            </p>
            <h1 className="font-serif text-2xl">
              Carrosseis Instagram · {posts.length} posts prontos
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-cream/60">
            <span className="px-3 py-1.5 border border-gold/30 rounded-full">
              Formato 1080×1350
            </span>
            <Link
              href="/blog"
              className="px-3 py-1.5 border border-gold/30 rounded-full hover:bg-gold/10 hover:text-gold transition-colors"
            >
              Ver blog público
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-wine-dark/40 border border-gold/15 rounded-2xl p-5">
            <p className="text-gold text-xs uppercase tracking-widest mb-2">
              Como usar
            </p>
            <p className="text-cream/70 text-sm leading-relaxed">
              Cada post do blog gera um carrossel pronto. Veja a preview,
              copie a legenda e baixe os slides — ou publique direto se a
              integração Meta API estiver ativa.
            </p>
          </div>
          <div className="bg-wine-dark/40 border border-gold/15 rounded-2xl p-5">
            <p className="text-gold text-xs uppercase tracking-widest mb-2">
              Publicação automática
            </p>
            <p className="text-cream/70 text-sm leading-relaxed">
              Rode <code className="text-gold">npm run ig:publish [slug]</code> no
              terminal. Precisa de <code className="text-gold">INSTAGRAM_BUSINESS_ID</code> e
              <code className="text-gold"> INSTAGRAM_ACCESS_TOKEN</code> no .env.local.
            </p>
          </div>
          <div className="bg-wine-dark/40 border border-gold/15 rounded-2xl p-5">
            <p className="text-gold text-xs uppercase tracking-widest mb-2">
              Publicação manual
            </p>
            <p className="text-cream/70 text-sm leading-relaxed">
              Em cada post abaixo, clica em "Baixar todos os slides". Salva os
              PNGs no celular, abre Instagram → novo post → carrossel →
              seleciona os arquivos na ordem.
            </p>
          </div>
        </div>

        {BLOG_CATEGORIES.map((category) => {
          const ofCategory = posts.filter((p) => p.post.category === category)
          if (!ofCategory.length) return null
          return (
            <div key={category} className="mb-10">
              <div className="flex items-end justify-between border-b border-gold/15 pb-2 mb-5">
                <h2 className="font-serif text-xl">{category}</h2>
                <span className="text-xs text-cream/40">
                  {ofCategory.length} carrossel
                  {ofCategory.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {ofCategory.map(({ post, slideCount, caption }) => (
                  <CarouselPreview
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    category={post.category}
                    slideCount={slideCount}
                    caption={caption}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
