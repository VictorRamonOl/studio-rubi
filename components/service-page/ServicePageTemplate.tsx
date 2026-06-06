"use client"

import Link from "next/link"
import {
  MessageCircle,
  CheckCircle2,
  Users,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import type { ServicePage } from "@/data/service-pages"
import { SERVICE_PAGES } from "@/data/service-pages"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Breadcrumbs from "@/components/Breadcrumbs"
import PageViewTracker from "@/components/PageViewTracker"

export default function ServicePageTemplate({
  service,
}: {
  service: ServicePage
}) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const related = SERVICE_PAGES.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  )

  return (
    <main>
      <PageViewTracker kind="service" slug={service.slug} />
      <Navbar />

      {/* HERO */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
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
                { label: service.title },
              ]}
            />
          </div>

          <p className="inline-flex items-center gap-2 text-gold/70 text-xs tracking-[0.4em] uppercase mb-6 font-medium">
            <span className="w-8 h-px bg-gold/50" aria-hidden="true" />
            {service.heroEyebrow}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-cream leading-tight mb-5 max-w-3xl">
            {service.heroHeadline}
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl leading-relaxed mb-8">
            {service.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("services")}
              className="inline-flex items-center justify-center gap-3 bg-gold text-dark px-7 py-4 rounded-full font-semibold hover:bg-gold-mid transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar avaliação pelo WhatsApp
            </a>
            <Link
              href="/#contato"
              className="inline-flex items-center justify-center gap-2 border border-gold/40 text-cream px-7 py-4 rounded-full font-medium hover:border-gold hover:bg-white/5 transition-all"
            >
              Deixar meu contato
            </Link>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Para quem é
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
              {service.title} é indicado quando
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {service.forWho.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-cream rounded-2xl p-5 border border-gold/10"
              >
                <CheckCircle2 className="w-5 h-5 text-wine flex-shrink-0 mt-0.5" />
                <span className="text-sm text-dark leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Por que aqui é diferente
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
              O que você ganha no <span className="text-wine">Studio Rubi</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-7 border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="font-serif text-gold text-2xl mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-lg text-dark mb-2">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Como funciona
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
              Seu caminho de tratamento, passo a passo
            </h2>
          </div>

          <div className="space-y-6">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="flex gap-6 bg-cream rounded-2xl p-6 border border-gold/10"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-serif text-xl text-gold"
                    style={{ backgroundColor: "rgba(104,29,49,0.08)" }}
                  >
                    {p.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-dark mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY MINI */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="rounded-3xl overflow-hidden shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)",
            }}
          >
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-5">
                <Users className="w-5 h-5 text-gold" />
                <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                  Quem te atende
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-cream mb-4">
                Dra. Rúbia Torres — fisioterapeuta com 12 anos de experiência
              </h3>
              <p className="text-cream/70 leading-relaxed text-base mb-6 max-w-2xl">
                Formada em 2012, com prática clínica diária em Manaus e
                atualização constante em Pilates Terapêutico, RPG e Reabilitação.
                Mais de 1.600 atendimentos realizados.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("services")}
                className="inline-flex items-center gap-2 bg-gold text-dark px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold-mid transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com a Dra. Rúbia
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Dúvidas frequentes
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
              Perguntas que recebemos sobre{" "}
              <span className="text-wine">{service.title}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((f, i) => (
              <div
                key={i}
                className="border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/30 transition-colors"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-cream"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  aria-expanded={openFAQ === i}
                >
                  <span className="font-medium text-dark text-sm pr-4 leading-relaxed">
                    {f.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-wine flex-shrink-0 transition-transform ${
                      openFAQ === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === i && (
                  <div className="px-5 pb-5 bg-white border-t border-gold/10">
                    <p className="text-muted text-sm leading-relaxed pt-4">
                      {f.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
                Veja também
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-dark">
                Outros serviços que podem te interessar
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <h3 className="font-serif text-lg text-dark mb-2 group-hover:text-wine transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {r.heroSubheadline}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-wine text-sm font-medium">
                    Saber mais{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-5">
            Vamos começar pela <span className="text-gold">avaliação</span>?
          </h2>
          <p className="text-cream/70 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Na primeira sessão a Dra. Rúbia escuta a sua história, examina o seu
            corpo e define o melhor caminho de tratamento. Sem compromisso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_cta")}
            className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full font-semibold hover:bg-gold-mid transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Quero agendar minha avaliação
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
