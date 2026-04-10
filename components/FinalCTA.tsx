"use client"

import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"

export default function FinalCTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 60%, #742239 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: "#C89E51", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8" aria-hidden="true">
          <div className="w-16 h-px bg-gold/40" />
          <div className="w-2 h-2 rounded-full bg-gold mx-3 -mt-px" />
          <div className="w-16 h-px bg-gold/40" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-cream mb-6 leading-tight">
          Seu corpo merece mais do que
          <span className="block text-gold mt-2">suportar a dor.</span>
        </h2>

        <p className="text-cream/65 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Dê o primeiro passo hoje. Uma avaliação com a Dra. Rúbia é tudo que você
          precisa para voltar a se mover com leveza, confiança e bem-estar real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_cta")}
            className="flex items-center justify-center gap-3 bg-gold text-dark px-10 py-4 rounded-full font-semibold text-base hover:bg-gold-mid transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Agendar avaliação pelo WhatsApp
          </a>
          <a
            href="#contato"
            className="flex items-center justify-center gap-2 border border-gold/40 text-cream px-10 py-4 rounded-full font-medium text-base hover:border-gold hover:bg-white/5 transition-all"
          >
            Prefiro deixar meu contato
          </a>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-2 text-cream/30 text-xs">
          <span>✦ Fisioterapeuta especializada</span>
          <span>✦ Atendimento personalizado</span>
          <span>✦ Máximo 3 pessoas por horário</span>
          <span>✦ Parque Dez, Manaus — AM</span>
        </div>
      </div>
    </section>
  )
}
