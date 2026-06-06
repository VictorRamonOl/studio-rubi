"use client"

import { useState, useEffect } from "react"
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"
import { SERVICE_PAGES } from "@/data/service-pages"

const NAV_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#para-quem", label: "Para quem" },
  { href: "/blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-wine shadow-lg py-3" : "bg-wine/95 backdrop-blur py-4 lg:bg-transparent lg:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Studio Rubi">
          <Image
            src="/images/logo2.png"
            alt="Studio Rubi Pilates e Fisioterapia"
            width={160}
            height={44}
            className="object-contain h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/servicos"
              className="flex items-center gap-1 text-sm text-cream/80 hover:text-gold transition-colors font-medium tracking-wide"
              aria-expanded={servicesOpen}
            >
              Serviços
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="bg-white rounded-2xl shadow-xl border border-gold/15 p-2">
                  <Link
                    href="/servicos"
                    className="block px-4 py-2.5 text-sm text-wine font-medium hover:bg-cream rounded-xl transition-colors border-b border-gold/10 mb-1"
                  >
                    Ver todos os serviços
                  </Link>
                  {SERVICE_PAGES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}`}
                      className="block px-4 py-2.5 text-sm text-dark hover:bg-cream hover:text-wine rounded-xl transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 hover:text-gold transition-colors font-medium tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

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

        <button
          className="lg:hidden text-cream p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-wine border-t border-gold/20 px-4 py-4 max-h-[80vh] overflow-y-auto">
          <p className="text-gold/60 text-[10px] uppercase tracking-widest mb-2 px-1">
            Serviços
          </p>
          {SERVICE_PAGES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="block py-2.5 text-cream/80 hover:text-gold border-b border-gold/10 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {s.title}
            </Link>
          ))}
          <p className="text-gold/60 text-[10px] uppercase tracking-widest mt-5 mb-2 px-1">
            Navegar
          </p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-cream/80 hover:text-gold border-b border-gold/10 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick("navbar")
              setMenuOpen(false)
            }}
            className="mt-5 flex items-center justify-center gap-2 bg-gold text-dark px-5 py-3 rounded-full text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Agendar pelo WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
