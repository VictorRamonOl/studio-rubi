import { MessageCircle, Check, Home } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const PACKAGES = [
  {
    name: "Avaliação Inicial",
    tag: "Comece aqui",
    icon: null,
    desc: "Consulta completa para mapear sua saúde, histórico de dores e objetivos. A base do seu protocolo personalizado.",
    features: [
      "Anamnese detalhada",
      "Avaliação postural completa",
      "Protocolo exclusivo para você",
      "Orientações para o dia a dia",
    ],
    highlight: false,
    cta: "Quero minha avaliação",
  },
  {
    name: "Plano Mensal 2×",
    tag: "Mais popular",
    icon: null,
    desc: "2 sessões por semana para evolução consistente e progressiva. Ideal para quem quer resultado real no cotidiano.",
    features: [
      "2 sessões semanais",
      "Evolução registrada e monitorada",
      "Máximo 3 pessoas por horário",
      "Protocolo atualizado mensalmente",
    ],
    highlight: true,
    cta: "Quero este plano",
  },
  {
    name: "Plano Mensal 3×",
    tag: "Intensivo",
    icon: null,
    desc: "3 sessões por semana para quem busca evolução mais rápida: reabilitação, pós-operatório ou início de tratamento.",
    features: [
      "3 sessões semanais",
      "Fisioterapia inclusa se necessário",
      "Protocolo dedicado e individualizado",
      "Acompanhamento próximo e contínuo",
    ],
    highlight: false,
    cta: "Quero este plano",
  },
  {
    name: "HomeCare",
    tag: "Atendimento domiciliar",
    icon: Home,
    desc: "A Dra. Rúbia vai até você. Pilates e fisioterapia no conforto da sua casa, com a mesma qualidade e técnica do estúdio.",
    features: [
      "Atendimento na sua residência",
      "Ideal para dificuldade de locomoção",
      "Pós-operatório e reabilitação em casa",
      "Horários flexíveis e personalizados",
    ],
    highlight: false,
    cta: "Solicitar HomeCare",
  },
]

export default function Packages() {
  return (
    <section id="planos" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Nossos planos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Investir na sua saúde é{" "}
            <span className="text-wine">a melhor decisão</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Temos planos para cada necessidade e objetivo. Os valores são apresentados após a
            avaliação inicial — garantindo o melhor custo-benefício para você.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {PACKAGES.map((pkg) => {
            const IconComp = pkg.icon
            return (
              <div
                key={pkg.name}
                className={`rounded-2xl border flex flex-col transition-all duration-300 ${
                  pkg.highlight
                    ? "border-gold/40 shadow-xl"
                    : "border-gold/15 shadow-sm hover:shadow-md hover:border-gold/25"
                }`}
                style={
                  pkg.highlight
                    ? { background: "linear-gradient(160deg, #5A1829 0%, #681D31 50%, #742239 100%)" }
                    : { backgroundColor: "#F7F4EE" }
                }
              >
                {/* Header */}
                <div className="p-7 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide ${
                        pkg.highlight ? "bg-gold/20 text-gold" : "text-wine"
                      }`}
                      style={!pkg.highlight ? { backgroundColor: "rgba(104,29,49,0.08)" } : {}}
                    >
                      {pkg.tag}
                    </span>
                    {IconComp && (
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={
                          pkg.highlight
                            ? { backgroundColor: "rgba(200,158,81,0.2)" }
                            : { backgroundColor: "rgba(104,29,49,0.1)" }
                        }
                      >
                        <IconComp
                          className={`w-4 h-4 ${pkg.highlight ? "text-gold" : "text-wine"}`}
                        />
                      </div>
                    )}
                  </div>
                  <h3
                    className={`font-serif text-xl mb-2 ${
                      pkg.highlight ? "text-cream" : "text-dark"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      pkg.highlight ? "text-cream/65" : "text-muted"
                    }`}
                  >
                    {pkg.desc}
                  </p>
                </div>

                {/* Features */}
                <div className="px-7 pb-5 flex-1">
                  <ul className="space-y-2.5">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-center gap-2.5 text-sm ${
                          pkg.highlight ? "text-cream/80" : "text-dark/70"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 flex-shrink-0 ${
                            pkg.highlight ? "text-gold" : "text-wine"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7">
                  <div
                    className={`text-center py-2 rounded-xl text-xs font-medium mb-4 ${
                      pkg.highlight ? "text-gold" : "text-wine"
                    }`}
                    style={
                      pkg.highlight
                        ? { backgroundColor: "rgba(255,255,255,0.08)" }
                        : { backgroundColor: "rgba(104,29,49,0.07)" }
                    }
                  >
                    Valores sob consulta — personalizados para você
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all ${
                      pkg.highlight
                        ? "bg-gold text-dark hover:bg-gold-mid"
                        : "border border-wine text-wine hover:bg-wine hover:text-cream"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {pkg.cta}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-muted/60 text-xs">
          ✦ Valores apresentados após avaliação inicial, de acordo com seu protocolo e frequência semanal.
        </p>
      </div>
    </section>
  )
}
