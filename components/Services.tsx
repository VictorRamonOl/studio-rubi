import type { ElementType } from "react"
import { Activity, Baby, Stethoscope, AlignCenter, RefreshCw, User } from "lucide-react"
import { SERVICES } from "@/data/services"
import { WHATSAPP_URL } from "@/lib/constants"

const ICON_MAP: Record<string, ElementType> = {
  Activity,
  Baby,
  Stethoscope,
  AlignCenter,
  RefreshCw,
  User,
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
            Do Pilates terapêutico à reabilitação funcional — tudo com o rigor de uma fisioterapeuta
            e o cuidado de quem ama o que faz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Activity
            return (
              <div
                key={service.id}
                className="group relative bg-cream rounded-2xl p-7 border border-transparent hover:border-gold/25 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(200,158,81,0.07), transparent 70%)",
                  }}
                />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(104,29,49,0.08)" }}>
                  <Icon className="w-6 h-6 text-wine" />
                </div>
                <h3 className="font-serif text-lg text-dark mb-2">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
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
