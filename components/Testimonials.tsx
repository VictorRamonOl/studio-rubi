import { Star } from "lucide-react"
import { TESTIMONIALS } from "@/data/testimonials"

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Histórias reais
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            O que dizem nossos <span className="text-wine">pacientes</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Cada depoimento é uma história de cuidado, evolução e confiança. O melhor resultado é
            ver você se movendo melhor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-cream rounded-2xl p-6 border border-gold/10 hover:border-gold/25 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold" fill="#C89E51" />
                ))}
              </div>

              <p className="text-dark/65 text-sm leading-relaxed mb-5 italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-gold/15 pt-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-cream text-sm font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #681D31, #742239)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-dark text-sm">{t.name}</div>
                  <div className="text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
