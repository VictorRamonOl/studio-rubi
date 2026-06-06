import type { ElementType } from "react"
import Link from "next/link"
import {
  Activity,
  Baby,
  Stethoscope,
  AlignCenter,
  RefreshCw,
  Home,
  ArrowRight,
} from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const SERVICES_WITH_PAGES = [
  {
    slug: "pilates-terapeutico-manaus",
    icon: "Activity",
    title: "Pilates Terapêutico",
    description:
      "Aulas personalizadas focadas no tratamento de dores, correção postural e reabilitação. Cada sessão é planejada para o seu corpo.",
    benefits: ["Redução de dores crônicas", "Melhora postural", "Fortalecimento do core"],
  },
  {
    slug: "pilates-gestantes-manaus",
    icon: "Baby",
    title: "Pilates para Gestantes",
    description:
      "Método especializado para acompanhar cada trimestre gestacional com segurança e objetivos personalizados.",
    benefits: ["Alívio das dores gestacionais", "Preparação para o parto", "Bem-estar materno"],
  },
  {
    slug: "fisioterapia-manaus",
    icon: "Stethoscope",
    title: "Fisioterapia",
    description:
      "Atendimento fisioterapêutico individual para tratamento de patologias, reabilitação pós-cirúrgica e recuperação funcional.",
    benefits: ["Tratamento de lesões", "Reabilitação funcional", "Recuperação acelerada"],
  },
  {
    slug: "rpg-manaus",
    icon: "AlignCenter",
    title: "RPG",
    description:
      "Reeducação Postural Global para tratamento das cadeias musculares, correção de desvios posturais e alívio de dores crônicas.",
    benefits: ["Correção postural global", "Alívio de dores crônicas", "Equilíbrio muscular"],
  },
  {
    slug: "reabilitacao-funcional-manaus",
    icon: "RefreshCw",
    title: "Reabilitação Funcional",
    description:
      "Programa estruturado para restaurar movimento, força e funcionalidade após lesões, cirurgias ou inatividade prolongada.",
    benefits: ["Retorno às atividades", "Fortalecimento progressivo", "Prevenção de recidivas"],
  },
  {
    slug: "homecare-fisioterapia-manaus",
    icon: "Home",
    title: "Fisioterapia Domiciliar",
    description:
      "Atendimento HomeCare no conforto da sua casa para idosos, pós-cirúrgicos e pacientes com dificuldade de locomoção.",
    benefits: ["Sem deslocamento", "Família orientada", "Mesma qualidade do estúdio"],
  },
]

const ICON_MAP: Record<string, ElementType> = {
  Activity,
  Baby,
  Stethoscope,
  AlignCenter,
  RefreshCw,
  Home,
}

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            O que oferecemos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Serviços especializados para{" "}
            <span className="text-wine">cada necessidade</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Do Pilates terapêutico à reabilitação funcional — tudo com o rigor
            de uma fisioterapeuta e o cuidado de quem ama o que faz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_WITH_PAGES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Activity
            return (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group relative bg-cream rounded-2xl p-7 border border-transparent hover:border-gold/25 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(200,158,81,0.07), transparent 70%)",
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(104,29,49,0.08)" }}
                >
                  <Icon className="w-6 h-6 text-wine" />
                </div>
                <h3 className="font-serif text-lg text-dark mb-2 group-hover:text-wine transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {service.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-wine text-sm font-medium mt-auto">
                  Saber mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wine text-cream px-8 py-4 rounded-full font-semibold hover:bg-wine-light transition-colors"
          >
            Agendar avaliação pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
