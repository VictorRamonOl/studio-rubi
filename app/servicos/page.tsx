import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  Baby,
  Stethoscope,
  AlignCenter,
  RefreshCw,
  Home,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import { SERVICE_PAGES } from "@/data/service-pages"
import { SITE_URL, buildMetadata, breadcrumbSchema } from "@/lib/seo"
import { WHATSAPP_URL } from "@/lib/constants"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata: Metadata = buildMetadata({
  title:
    "Serviços de Pilates e Fisioterapia em Manaus | Studio Rubi — Parque Dez",
  description:
    "Conheça todos os serviços do Studio Rubi: Pilates Terapêutico, Fisioterapia, RPG, Pilates para Gestantes, Reabilitação Funcional e HomeCare em Manaus.",
  path: "/servicos",
  keywords: [
    "serviços fisioterapia manaus",
    "serviços pilates manaus",
    "pilates parque dez manaus",
    "fisioterapia parque dez",
    "studio pilates manaus",
  ],
})

const ICON_MAP: Record<string, typeof Activity> = {
  "pilates-terapeutico-manaus": Activity,
  "fisioterapia-manaus": Stethoscope,
  "pilates-gestantes-manaus": Baby,
  "rpg-manaus": AlignCenter,
  "homecare-fisioterapia-manaus": Home,
  "reabilitacao-funcional-manaus": RefreshCw,
}

function itemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serviços do Studio Rubi Pilates e Fisioterapia",
    itemListElement: SERVICE_PAGES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${s.slug}`,
      name: s.title,
    })),
  }
}

export default function ServicosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", url: SITE_URL },
              { name: "Serviços", url: `${SITE_URL}/servicos` },
            ])
          ),
        }}
      />
      <main>
        <Navbar />

        {/* HERO */}
        <section
          className="pt-32 pb-16 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
              style={{ background: "#C89E51", filter: "blur(80px)" }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: "Início", href: "/" },
                  { label: "Serviços" },
                ]}
              />
            </div>

            <p className="text-gold/70 text-xs tracking-[0.4em] uppercase font-medium mb-4">
              Atendimento individualizado em Manaus
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mb-5 max-w-3xl">
              Serviços de Pilates e Fisioterapia
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl leading-relaxed">
              Seis especialidades pra cuidar do seu corpo em cada fase e
              objetivo. Todos com avaliação clínica de fisioterapeuta, máximo
              3 pessoas por horário e protocolo desenhado pra você.
            </p>
          </div>
        </section>

        {/* GRID DE SERVIÇOS */}
        <section className="py-16 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_PAGES.map((service) => {
                const Icon = ICON_MAP[service.slug] ?? Activity
                return (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="group relative bg-white rounded-2xl p-7 border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(104,29,49,0.08)" }}
                    >
                      <Icon className="w-6 h-6 text-wine" />
                    </div>
                    <h2 className="font-serif text-lg text-dark mb-2 group-hover:text-wine transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-5 flex-grow">
                      {service.heroSubheadline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-wine text-sm font-medium mt-auto">
                      Saber mais
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          className="py-20"
          style={{
            background:
              "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-5">
              Não sabe por qual serviço{" "}
              <span className="text-gold">começar</span>?
            </h2>
            <p className="text-cream/70 text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Comece pela avaliação. A Dra. Rúbia escuta sua história, examina
              seu corpo e indica o melhor caminho — sem compromisso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full font-semibold hover:bg-gold-mid transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar avaliação no WhatsApp
            </a>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  )
}
