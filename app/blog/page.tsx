import type { Metadata } from "next"
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog"
import { getRemotePosts } from "@/lib/blog-remote"
import { buildMetadata, SITE_URL, breadcrumbSchema } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import BlogCard from "@/components/blog/BlogCard"
import BlogSidebar from "@/components/blog/BlogSidebar"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata: Metadata = buildMetadata({
  title: "Blog Studio Rubi — Pilates, Fisioterapia, Postura e Saúde em Manaus",
  description:
    "Artigos escritos por fisioterapeuta com 14 anos de experiência. Dor lombar, gestação, reabilitação, idosos, postura — conteúdo prático para tomar boas decisões pelo seu corpo.",
  path: "/blog",
  keywords: ["blog fisioterapia manaus", "blog pilates manaus", "dor lombar", "fisioterapia em casa", "pilates para gestantes", "reabilitação"],
})

export const revalidate = 300

// "Comece por aqui": temas mais buscados (alta intenção). Curadoria manual.
const DESTAQUES = [
  "fisioterapia-para-idoso-quando-e-hora-de-procurar",
  "incontinencia-urinaria-feminina-a-fisioterapia-resolve",
  "pilates-na-gravidez-e-seguro-beneficios-por-trimestre",
  "pilates-para-dor-lombar-por-que-funciona",
  "rpg-para-dor-lombar-como-funciona",
  "dor-nas-costas-quando-procurar-um-fisioterapeuta",
]

// Temas da barra lateral (rótulo -> post representativo)
const TOPICS = [
  { label: "Idoso", slug: "fisioterapia-para-idoso-quando-e-hora-de-procurar" },
  { label: "Saúde da mulher", slug: "fisioterapia-pelvica-o-que-e-e-para-que-serve" },
  { label: "Gestante", slug: "pilates-na-gravidez-e-seguro-beneficios-por-trimestre" },
  { label: "Pilates", slug: "pilates-para-dor-lombar-por-que-funciona" },
  { label: "RPG", slug: "rpg-para-dor-lombar-como-funciona" },
  { label: "Infantil", slug: "fisioterapia-infantil-para-que-serve-e-quando-procurar" },
  { label: "Dor nas costas", slug: "dor-nas-costas-quando-procurar-um-fisioterapeuta" },
]

export default async function BlogIndex() {
  const remotePosts = await getRemotePosts()
  const allPosts = [...remotePosts, ...ALL_BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  )
  const featured = allPosts[0]
  const destaques = DESTAQUES.map((s) => allPosts.find((p) => p.slug === s)).filter(Boolean) as typeof allPosts

  const slugs = new Set(allPosts.map((p) => p.slug))
  const topics = TOPICS.filter((t) => slugs.has(t.slug))
  const searchList = allPosts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt }))
  const recents = allPosts.slice(0, 6).map((p) => ({ title: p.title, slug: p.slug }))

  const grid = "grid grid-cols-1 sm:grid-cols-2 gap-6"

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Início", url: SITE_URL }, { name: "Blog", url: `${SITE_URL}/blog` }])) }} />
      <main>
        <Navbar />

        <section className="relative overflow-hidden pt-32 pb-16" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Blog" }]} />
            <p className="mt-6 mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold/70">Conteúdo do Studio Rubi</p>
            <h1 className="mb-5 max-w-3xl font-serif text-4xl leading-tight text-cream md:text-5xl">Blog do Studio Rubi</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-cream/70">
              Artigos práticos sobre dor, movimento, gestação, reabilitação e prevenção — para você cuidar melhor do seu corpo.
            </p>
          </div>
        </section>

        <section className="bg-cream py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Conteúdo principal */}
              <div>
                <h2 className="mb-6 font-serif text-2xl text-dark">Em destaque</h2>
                <div className="mb-12">
                  <BlogCard post={featured} featured />
                </div>

                {destaques.length > 0 && (
                  <div className="mb-14">
                    <div className="mb-6 border-b border-gold/15 pb-3">
                      <h2 className="font-serif text-2xl text-dark">Comece por aqui</h2>
                      <p className="text-sm text-muted">Os temas mais procurados por quem cuida do corpo</p>
                    </div>
                    <div className={grid}>
                      {destaques.map((p) => <BlogCard key={p.slug} post={p} />)}
                    </div>
                  </div>
                )}

                {remotePosts.length > 0 && (
                  <div className="mb-14">
                    <div className="mb-6 flex items-end justify-between border-b border-gold/15 pb-3">
                      <h2 className="font-serif text-2xl text-dark">Novos artigos</h2>
                      <span className="text-xs text-muted">{remotePosts.length} artigos</span>
                    </div>
                    <div className={grid}>
                      {remotePosts.slice(0, 8).map((p) => <BlogCard key={p.slug} post={p} />)}
                    </div>
                  </div>
                )}

                {BLOG_CATEGORIES.map((category) => {
                  const postsInCat = ALL_BLOG_POSTS.filter((p) => p.category === category)
                  if (!postsInCat.length) return null
                  return (
                    <div key={category} id={`cat-${encodeURIComponent(category)}`} className="mb-14 scroll-mt-28">
                      <div className="mb-6 flex items-end justify-between border-b border-gold/15 pb-3">
                        <h2 className="font-serif text-2xl text-dark">{category}</h2>
                        <span className="text-xs text-muted">{postsInCat.length} artigo{postsInCat.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div className={grid}>
                        {postsInCat.map((post) => <BlogCard key={post.slug} post={post} />)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Barra lateral */}
              <BlogSidebar posts={searchList} recents={recents} topics={topics} />
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  )
}
