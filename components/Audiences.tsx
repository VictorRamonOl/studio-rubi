import Image from "next/image"
import { MessageCircle, Check } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const AUDIENCES = [
  {
    tag: "Mulheres",
    bgImage: "/images/session-mulher.png",
    bgGradient: "linear-gradient(to top, rgba(74,18,34,0.95) 0%, rgba(104,29,49,0.75) 50%, rgba(104,29,49,0.5) 100%)",
    headline: "Dor, postura e saúde feminina",
    description:
      "Para a mulher que convive com dor lombar, tensão cervical, encurtamentos ou simplesmente quer se sentir mais forte, funcional e bem no seu corpo.",
    items: [
      "Dor lombar, ciática e cervical",
      "Postura, encurtamentos e desvios",
      "Fortalecimento do core e assoalho pélvico",
      "Mobilidade e bem-estar feminino",
      "Mais energia e qualidade de vida",
    ],
    cta: "Quero cuidar da minha saúde",
  },
  {
    tag: "Gestantes",
    bgImage: "/images/session-gestante.png",
    bgGradient: "linear-gradient(to top, rgba(74,18,34,0.95) 0%, rgba(104,29,49,0.75) 50%, rgba(104,29,49,0.5) 100%)",
    headline: "Pilates seguro em cada trimestre",
    description:
      "Protocolo especializado para cada fase da gestação. Alívio de dores, preparo para o parto e cuidado com o corpo com a segurança de uma fisioterapeuta.",
    items: [
      "Alívio de dores gestacionais",
      "Fortalecimento e mobilidade segura",
      "Preparo físico para o parto",
      "Acompanhamento trimestral personalizado",
      "Retorno ao corpo no pós-parto",
    ],
    cta: "Quero pilates na gestação",
  },
  {
    tag: "Idosos",
    bgImage: "/images/session-old.png",
    bgGradient: "linear-gradient(to top, rgba(74,18,34,0.95) 0%, rgba(104,29,49,0.75) 50%, rgba(104,29,49,0.5) 100%)",
    headline: "Mobilidade, equilíbrio e autonomia",
    description:
      "Programa gentil e eficaz para a terceira idade, focado em manter a independência, prevenir quedas e preservar a qualidade de vida com segurança.",
    items: [
      "Prevenção de quedas",
      "Equilíbrio e coordenação motora",
      "Força funcional para o dia a dia",
      "Flexibilidade e mobilidade articular",
      "Mais autonomia e disposição",
    ],
    cta: "Quero mais mobilidade",
  },
  {
    tag: "Crianças",
    bgImage: "/images/session-child.png",
    bgGradient: "linear-gradient(to top, rgba(74,18,34,0.95) 0%, rgba(104,29,49,0.75) 50%, rgba(104,29,49,0.5) 100%)",
    headline: "Desenvolvimento motor e postura",
    description:
      "Atendimento fisioterapêutico especializado para crianças com alterações posturais, atrasos no desenvolvimento motor ou necessidade de reabilitação.",
    items: [
      "Desenvolvimento motor",
      "Correção postural na infância",
      "Reabilitação funcional infantil",
      "Coordenação e equilíbrio",
      "Acompanhamento especializado",
    ],
    cta: "Quero saber mais",
  },
]

export default function Audiences() {
  return (
    <section id="para-quem" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Atendimento especializado
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Cuidamos de você em{" "}
            <span className="text-wine">cada fase da vida</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Não existe atendimento genérico aqui. Cada público tem necessidades específicas — e
            temos o protocolo certo para cada uma delas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUDIENCES.map((a) => (
            <div
              key={a.tag}
              className="group bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/25 hover:shadow-xl transition-all duration-300"
            >
              {/* Card header — foto ou gradiente */}
              <div className="relative h-40 overflow-hidden">
                {a.bgImage && (
                  <Image
                    src={a.bgImage}
                    alt={`Atendimento ${a.tag} — Rubi Studio`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Gradient overlay (sempre presente) */}
                <div
                  className="absolute inset-0"
                  style={{ background: a.bgGradient }}
                />
                {/* Tag + Headline sobre o overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block text-xs bg-gold/25 text-gold px-3 py-1 rounded-full font-medium mb-2 uppercase tracking-wide w-fit">
                    {a.tag}
                  </span>
                  <h3 className="font-serif text-lg text-cream leading-snug">{a.headline}</h3>
                </div>
              </div>

              {/* Card body */}
              <div className="px-7 py-6">
                <p className="text-muted text-sm leading-relaxed mb-5">{a.description}</p>
                <ul className="space-y-2 mb-6">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark/70">
                      <Check className="w-4 h-4 text-wine flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wine text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-wine-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {a.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
