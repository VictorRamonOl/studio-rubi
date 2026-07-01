import type { Metadata } from "next"
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import DecorDots from "@/components/DecorDots"
import Reveal from "@/components/Reveal"
import ContactForm from "@/components/ContactForm"
import Location from "@/components/Location"

export const metadata: Metadata = buildMetadata({
  title: "Contato e Localização | Studio Rubi — Parque Dez, Manaus",
  description:
    "Fale com o Studio Rubi Pilates e Fisioterapia no Parque Dez, Manaus. Agende sua avaliação pelo WhatsApp, veja endereço, horários e como chegar.",
  path: "/contato",
  keywords: ["contato studio rubi", "pilates parque dez endereço", "fisioterapia manaus contato", "agendar avaliação manaus"],
})

export default function ContatoPage() {
  return (
    <main>
      <Navbar />
      <header className="pt-32 pb-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}>
        <DecorDots />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contato" }]} />
          <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mt-6 mb-4 max-w-3xl">
            Vamos cuidar de você
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
            Agende sua avaliação e dê o primeiro passo para se movimentar sem dor.
          </p>
        </div>
      </header>

      <Reveal><ContactForm /></Reveal>
      <Reveal><Location /></Reveal>

      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Início", url: SITE_URL }, { name: "Contato", url: `${SITE_URL}/contato` }])) }} />
    </main>
  )
}
