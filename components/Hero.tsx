"use client"

import Image from "next/image"
import { MessageCircle, ArrowDown, CheckCircle2 } from "lucide-react"
import { WHATSAPP_URL, STATS } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"

const TRUST_ITEMS = [
  "Máx. 3 alunos por horário",
  "Parque Dez · Manaus",
  "12 anos de experiência",
  "Fisioterapeuta especializada",
]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
          style={{ background: "#C89E51", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-32 left-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "#C89E51", filter: "blur(100px)" }}
        />
        {/* Studio photo — subtle background right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="/images/session-adult.jpg"
            alt="Sessão de pilates terapêutico no Studio Ruby em Manaus"
            fill
            className="object-cover object-center opacity-10"
            sizes="50vw"
            priority
          />
        </div>
        {/* Gem outline decoration */}
        <svg
          className="absolute top-16 right-16 w-56 h-56 opacity-5"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" stroke="#C89E51" strokeWidth="1" fill="none" />
          <polygon points="50,20 78,36 78,64 50,80 22,64 22,36" stroke="#C89E51" strokeWidth="0.5" fill="none" />
          <line x1="50" y1="5" x2="50" y2="20" stroke="#C89E51" strokeWidth="0.5" />
          <line x1="10" y1="30" x2="22" y2="36" stroke="#C89E51" strokeWidth="0.5" />
          <line x1="90" y1="30" x2="78" y2="36" stroke="#C89E51" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16 text-center">
        {/* Eyebrow — SEO local signal */}
        <p className="inline-flex items-center gap-2 text-gold/70 text-xs tracking-[0.4em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-gold/50" aria-hidden="true" />
          Pilates e Fisioterapia em Manaus · Parque Dez
          <span className="w-8 h-px bg-gold/50" aria-hidden="true" />
        </p>

        {/* H1 — pain-led + SEO */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4 max-w-4xl mx-auto">
          Chega de viver com dor.
          <span className="block text-gold mt-2">Seu corpo pode se mover de novo.</span>
        </h1>

        <div className="flex justify-center my-6" aria-hidden="true">
          <div className="w-14 h-px bg-gold/60" />
          <div className="w-2 h-2 rounded-full bg-gold mx-2 -mt-px" />
          <div className="w-14 h-px bg-gold/60" />
        </div>

        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Pilates terapêutico e fisioterapia em Manaus com atendimento individualizado.
          A Dra. Rúbia Torres cuida de você com técnica, escuta e um protocolo feito
          exclusivamente para o seu corpo.
        </p>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-cream/60 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            className="flex items-center justify-center gap-3 bg-gold text-dark px-8 py-4 rounded-full font-semibold text-base hover:bg-gold-mid transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Quero minha avaliação inicial
          </a>
          <a
            href="#contato"
            className="flex items-center justify-center gap-2 border border-gold/40 text-cream px-8 py-4 rounded-full font-medium text-base hover:border-gold hover:bg-white/5 transition-all"
          >
            Prefiro deixar meu contato
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl text-gold font-bold">{stat.value}</div>
              <div className="text-cream/50 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#autoridade"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gold/30 hover:text-gold/60 transition-colors animate-bounce"
        aria-label="Rolar para a próxima seção"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  )
}
