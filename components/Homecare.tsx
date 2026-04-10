import { Home, MessageCircle, Check } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const BENEFITS = [
  "Fisioterapia e Pilates no conforto da sua casa",
  "Ideal para dificuldade de locomoção",
  "Pós-operatório e reabilitação em domicílio",
  "Atendimento dedicado a idosos e pacientes acamados",
  "Mesma qualidade e técnica do estúdio",
]

export default function Homecare() {
  return (
    <section id="homecare" className="py-16 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="rounded-3xl overflow-hidden shadow-lg"
          style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left: content — 3 cols */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div
                className="inline-flex items-center gap-2 text-gold text-xs font-medium px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: "rgba(200,158,81,0.15)" }}
              >
                <Home className="w-3.5 h-3.5" />
                Serviço exclusivo
              </div>

              <h2 className="font-serif text-2xl md:text-3xl text-cream mb-3">
                Atendimento <span className="text-gold">HomeCare</span>
              </h2>
              <p className="text-cream/60 text-sm leading-relaxed mb-6">
                A Dra. Rúbia leva o cuidado até você. Para pacientes que têm dificuldade de
                locomoção, estão em pós-operatório ou preferem a comodidade e privacidade do
                lar.
              </p>

              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-cream/80">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-gold-mid transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Homecare pelo WhatsApp
              </a>
            </div>

            {/* Right: visual — 2 cols */}
            <div className="lg:col-span-2 hidden lg:flex flex-col justify-center items-center p-10 border-l border-white/10 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(200,158,81,0.15)" }}
              >
                <Home className="w-10 h-10 text-gold" />
              </div>
              <div className="font-serif text-3xl text-cream mb-1">No seu lar</div>
              <div className="text-cream/40 text-sm mb-6">Cuidado e conforto</div>

              <div className="space-y-2 w-full">
                {["Fisioterapia", "Pilates Terapêutico", "Reabilitação"].map((s) => (
                  <div
                    key={s}
                    className="text-xs text-cream/50 py-2 px-3 rounded-lg text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
