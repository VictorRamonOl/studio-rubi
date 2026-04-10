import { Check, MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const CONDITIONS = [
  { title: "Dor lombar", desc: "Tratamento ativo e preventivo para dores na coluna lombar." },
  { title: "Dor cervical", desc: "Alívio de tensões no pescoço e região cervical." },
  { title: "Pós-lesão", desc: "Reabilitação segura após lesões musculares e articulares." },
  { title: "Pós-operatório", desc: "Recuperação funcional após cirurgias com acompanhamento especializado." },
  { title: "Gestantes", desc: "Cuidado especializado em cada fase da gravidez." },
  { title: "Idosos", desc: "Mobilidade, equilíbrio e qualidade de vida para a terceira idade." },
  { title: "Fortalecimento", desc: "Fortaleça seu corpo com segurança, método e evolução real." },
  { title: "Qualidade de vida", desc: "Para quem quer se mover melhor e viver com mais disposição." },
]

export default function ForWho() {
  return (
    <section
      id="para-quem"
      className="py-20"
      style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold/70 text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Para quem é
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
            O Rubi Studio é para você que{" "}
            <span className="text-gold">quer se mover</span> sem dor
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto text-base leading-relaxed">
            Não importa o seu ponto de partida. Aqui, o cuidado começa na avaliação e evolui no
            seu ritmo, com respeito e atenção ao seu corpo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONDITIONS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl p-4 border border-gold/15 hover:border-gold/35 hover:bg-white/5 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(200,158,81,0.2)" }}>
                <Check className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <div className="text-cream font-medium text-sm mb-0.5">{item.title}</div>
                <div className="text-cream/50 text-xs leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full font-semibold hover:bg-gold-mid transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar avaliação pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
