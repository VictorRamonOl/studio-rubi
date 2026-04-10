"use client"

import { useState, useEffect } from "react"
import { Menu, X, MessageCircle } from "lucide-react"
import Image from "next/image"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#planos", label: "Planos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-wine shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <Image
            src="/images/logo2.png"
            alt="Rubi Studio Pilates e Fisioterapia"
            width={160}
            height={44}
            className="object-contain h-9 w-auto"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 hover:text-gold transition-colors font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("navbar")}
          className="hidden md:flex items-center gap-2 bg-gold text-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-mid transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-cream p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-wine border-t border-gold/20 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-cream/80 hover:text-gold border-b border-gold/10 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("navbar")}
            className="mt-4 flex items-center justify-center gap-2 bg-gold text-dark px-5 py-3 rounded-full text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Agendar pelo WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
