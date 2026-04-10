"use client"

import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"

export default function WhatsAppButton() {
  const handleClick = () => {
    trackWhatsAppClick("floating_button")
    window.open(WHATSAPP_URL, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ backgroundColor: "#25D366" }}
    >
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping"
        style={{ backgroundColor: "#25D366" }}
        aria-hidden="true"
      />
      <MessageCircle className="w-7 h-7 text-white relative z-10" fill="white" aria-hidden="true" />
    </button>
  )
}
