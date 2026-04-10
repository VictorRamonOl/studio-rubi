"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle } from "lucide-react"
import { FAQ_ITEMS } from "@/data/faq"
import { WHATSAPP_URL } from "@/lib/constants"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Perguntas que{" "}
            <span className="text-wine">costumamos receber</span>
          </h2>
          <p className="text-muted max-w-md mx-auto text-base leading-relaxed">
            Se a sua dúvida não estiver aqui, fale diretamente conosco pelo WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/30 transition-colors duration-200"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left bg-cream hover:bg-cream transition-colors"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-dark text-sm pr-4 leading-relaxed">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-wine flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 bg-white border-t border-gold/10">
                  <p className="text-muted text-sm leading-relaxed pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted text-sm mb-4">Ainda tem dúvidas? Fale com a gente agora.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-wine text-wine px-6 py-3 rounded-full font-medium text-sm hover:bg-wine hover:text-cream transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
