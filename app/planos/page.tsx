import type { Metadata } from "next"
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import DecorDots from "@/components/DecorDots"
import Reveal from "@/components/Reveal"
import Packages from "@/components/Packages"
import FAQ from "@/components/FAQ"

export const metadata: Metadata = buildMetadata({
  title: "Planos e Pacotes | Studio Rubi Pilates e Fisioterapia em Manaus",
  description:
    "Conheça os planos e pacotes de Pilates e Fisioterapia do Studio Rubi, no Parque Dez, Manaus. Turmas reduzidas (até 3 por horário) e atendimento individual.",
  path: "/planos",
  keywords: ["planos pilates manaus", "pacotes pilates", "preço pilates manaus", "mensalidade pilates"],
})

export default function PlanosPage() {
  return (
    <main>
      <Navbar />
      <header className="pt-32 pb-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}>
        <DecorDots />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Planos" }]} />
          <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mt-6 mb-4 max-w-3xl">
            Planos que cabem na sua rotina
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
            Atendimento personalizado, turmas reduzidas e um plano feito para o seu objetivo.
          </p>
        </div>
      </header>

      <Reveal><Packages /></Reveal>
      <Reveal><FAQ /></Reveal>

      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Início", url: SITE_URL }, { name: "Planos", url: `${SITE_URL}/planos` }])) }} />
    </main>
  )
}
