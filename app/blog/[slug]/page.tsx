import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MessageCircle, Clock, Calendar, ArrowRight } from "lucide-react"
import {
  ALL_BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from "@/data/blog"
import { getServiceBySlug } from "@/data/service-pages"
import {
  buildMetadata,
  SITE_URL,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import BlogContent from "@/components/blog/BlogContent"
import BlogCard from "@/components/blog/BlogCard"
import BlogCover from "@/components/blog/BlogCover"
import PageViewTracker from "@/components/PageViewTracker"
import { WHATSAPP_URL } from "@/lib/constants"

export function generateStaticParams() {
  return ALL_BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "Artigo não encontrado" }
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt,
    authors: ["Dra. Rúbia Torres"],
  })
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-")
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ]
  return `${parseInt(d)} de ${months[parseInt(m) - 1]} de ${y}`
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const related = getRelatedPosts(post.slug, 3)
  const ctaService = post.ctaServiceSlug
    ? getServiceBySlug(post.ctaServiceSlug)
    : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.metaDescription,
              url,
              image: `${SITE_URL}${post.coverImage}`,
              datePublished: post.publishedAt,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
              { name: post.title, url },
            ])
          ),
        }}
      />

      <main>
        <PageViewTracker
          kind="blog"
          slug={post.slug}
          category={post.category}
        />
        <Navbar />

        {/* Article header */}
        <article>
          <header
            className="pt-32 pb-12 relative"
            style={{
              background:
                "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)",
            }}
          >
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-6">
                <Breadcrumbs
                  items={[
                    { label: "Início", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: post.category },
                  ]}
                />
              </div>

              <span className="inline-block bg-gold/15 text-gold text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full mb-5">
                {post.category}
              </span>

              <h1 className="font-serif text-3xl md:text-5xl text-cream leading-tight mb-5">
                {post.title}
              </h1>

              <p className="text-cream/70 text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/60 pt-5 border-t border-gold/20">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {post.readingTime} min de leitura
                </span>
                <span>Por Dra. Rúbia Torres — Fisioterapeuta</span>
              </div>
            </div>
          </header>

          {/* Cover */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto px-6 -mt-8 mb-12">
              <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gold/10">
                <BlogCover
                  title={post.title}
                  category={post.category}
                  slug={post.slug}
                  variant="hero"
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white pb-16">
            <div className="max-w-3xl mx-auto px-6">
              <BlogContent blocks={post.content} />
            </div>
          </div>

          {/* Service CTA banner */}
          {ctaService && (
            <section className="bg-cream py-12">
              <div className="max-w-3xl mx-auto px-6">
                <div
                  className="rounded-3xl p-8 lg:p-10 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)",
                  }}
                >
                  <p className="text-gold text-xs uppercase tracking-[0.3em] font-medium mb-3">
                    Quer aplicar isso ao seu corpo?
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream mb-3">
                    Conheça {ctaService.title}
                  </h3>
                  <p className="text-cream/70 leading-relaxed mb-6">
                    {ctaService.heroSubheadline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/${ctaService.slug}`}
                      className="inline-flex items-center justify-center gap-2 bg-gold text-dark px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold-mid transition-colors"
                    >
                      Saber mais sobre {ctaService.serviceType}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-gold/40 text-cream px-6 py-3 rounded-full font-medium text-sm hover:bg-white/5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section className="bg-white py-16 border-t border-gold/10">
              <div className="max-w-5xl mx-auto px-6">
                <h2 className="font-serif text-2xl md:text-3xl text-dark mb-8 text-center">
                  Continue lendo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {related.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  )
}
