import Link from "next/link"
import { MessageCircle, Home, BookOpen, ArrowRight } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Página não encontrada | Studio Rubi",
  description:
    "A página que você procurava não existe — mas a gente pode te ajudar a encontrar o caminho certo.",
  robots: { index: false, follow: false },
}

const QUICK_LINKS = [
  { href: "/pilates-terapeutico-manaus", label: "Pilates Terapêutico" },
  { href: "/fisioterapia-manaus", label: "Fisioterapia" },
  { href: "/pilates-gestantes-manaus", label: "Pilates para Gestantes" },
  { href: "/rpg-manaus", label: "RPG" },
  { href: "/homecare-fisioterapia-manaus", label: "HomeCare" },
  { href: "/reabilitacao-funcional-manaus", label: "Reabilitação Funcional" },
]

export default function NotFound() {
  return (
    <main>
      <Navbar />

      <section
        className="min-h-[80vh] pt-32 pb-20 relative overflow-hidden flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10"
            style={{ background: "#C89E51", filter: "blur(120px)" }}
          />
          <div
            className="absolute bottom-20 left-10 w-72 h-72 rounded-full opacity-5"
            style={{ background: "#C89E51", filter: "blur(100px)" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold/70 text-xs tracking-[0.4em] uppercase font-medium mb-6">
            Erro 404
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-5">
            Esta página não existe
          </h1>
          <p className="text-cream/70 text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Mas você não está perdida — vamos te ajudar a encontrar o que
            precisa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gold text-dark px-7 py-4 rounded-full font-semibold hover:bg-gold-mid transition-all"
            >
              <Home className="w-5 h-5" />
              Voltar para o início
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-gold/40 text-cream px-7 py-4 rounded-full font-medium hover:border-gold hover:bg-white/5 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Ler nosso blog
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-gold/40 text-cream px-7 py-4 rounded-full font-medium hover:border-gold hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>

          <div className="border-t border-gold/20 pt-10">
            <p className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-5">
              Talvez você procurasse
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-cream/70 hover:text-gold text-sm px-4 py-2 rounded-full border border-gold/15 hover:border-gold/40 transition-colors"
                >
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
