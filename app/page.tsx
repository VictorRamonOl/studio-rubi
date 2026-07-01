import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Authority from "@/components/Authority"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"
import Audiences from "@/components/Audiences"
import Packages from "@/components/Packages"
import BlogPreview from "@/components/BlogPreview"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import Reveal from "@/components/Reveal"
import SectionCTA from "@/components/SectionCTA"

// Home = página-resumo (hub). Cada bloco apresenta uma área e leva para a
// página dedicada. O conteúdo completo vive em /sobre, /servicos, /planos,
// /depoimentos e /contato.
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Authority />

      <Reveal><About /></Reveal>
      <SectionCTA href="/sobre">Conheça a nossa história</SectionCTA>

      <Reveal><Services /></Reveal>
      <SectionCTA href="/servicos" tone="white">Ver todos os serviços</SectionCTA>

      <Reveal><Audiences /></Reveal>

      <Reveal><Packages /></Reveal>
      <SectionCTA href="/planos">Ver todos os planos</SectionCTA>

      <Reveal><Testimonials /></Reveal>
      <SectionCTA href="/depoimentos" tone="white">Ver mais depoimentos</SectionCTA>

      <Reveal><BlogPreview /></Reveal>

      <Reveal><FinalCTA /></Reveal>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
