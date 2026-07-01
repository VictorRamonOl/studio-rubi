import type { Metadata } from "next"
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import DecorDots from "@/components/DecorDots"
import Reveal from "@/components/Reveal"
import About from "@/components/About"
import Authority from "@/components/Authority"

export const metadata: Metadata = buildMetadata({
  title: "Sobre o Studio Rubi | Pilates e Fisioterapia em Manaus",
  description:
    "Conheça a Dra. Rúbia Torres e o Studio Rubi: 14 anos de experiência clínica em Pilates e Fisioterapia no Parque Dez, Manaus. Atendimento humano e individual.",
  path: "/sobre",
  keywords: ["sobre studio rubi", "fisioterapeuta manaus", "rúbia torres", "pilates parque dez"],
})

export default function SobrePage() {
  return (
    <main>
      <Navbar />
      <header className="pt-32 pb-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}>
        <DecorDots />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />
          <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mt-6 mb-4 max-w-3xl">
            Cuidado de verdade, feito por quem entende de gente
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
            Mais de uma década transformando a saúde e o movimento das pessoas em Manaus.
          </p>
        </div>
      </header>

      <Reveal><Authority /></Reveal>
      <Reveal><About /></Reveal>

      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Início", url: SITE_URL }, { name: "Sobre", url: `${SITE_URL}/sobre` }])) }} />
    </main>
  )
}
