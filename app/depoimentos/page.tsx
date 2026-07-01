import type { Metadata } from "next"
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import DecorDots from "@/components/DecorDots"
import Reveal from "@/components/Reveal"
import Testimonials from "@/components/Testimonials"

export const metadata: Metadata = buildMetadata({
  title: "Depoimentos | Studio Rubi Pilates e Fisioterapia em Manaus",
  description:
    "Veja o que os pacientes do Studio Rubi falam sobre o tratamento com Pilates e Fisioterapia em Manaus. Histórias reais de quem voltou a se movimentar sem dor.",
  path: "/depoimentos",
  keywords: ["depoimentos pilates manaus", "avaliações studio rubi", "pilates manaus opiniões"],
})

export default function DepoimentosPage() {
  return (
    <main>
      <Navbar />
      <header className="pt-32 pb-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}>
        <DecorDots />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Depoimentos" }]} />
          <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mt-6 mb-4 max-w-3xl">
            Histórias de quem voltou a se movimentar
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
            A confiança de quem já passou por aqui é o nosso maior orgulho.
          </p>
        </div>
      </header>

      <Reveal><Testimonials /></Reveal>

      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Início", url: SITE_URL }, { name: "Depoimentos", url: `${SITE_URL}/depoimentos` }])) }} />
    </main>
  )
}
