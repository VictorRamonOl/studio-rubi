import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Authority from "@/components/Authority"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"
import Audiences from "@/components/Audiences"
import Homecare from "@/components/Homecare"
import Packages from "@/components/Packages"
import FAQ from "@/components/FAQ"
import ContactForm from "@/components/ContactForm"
import Location from "@/components/Location"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* 1. Atenção — proposta de valor acima da dobra */}
      <Hero />
      {/* 2. Interesse — por que escolher o Studio Rubi */}
      <Authority />
      {/* 3. Credibilidade — quem é a Dra. Rúbia */}
      <About />
      {/* 4. Prova social — depoimentos reais (antes dos serviços para converter mais rápido) */}
      <Testimonials />
      {/* 5. Desejo — o que fazemos e como ajudamos */}
      <Services />
      {/* 6. Segmentação — para quem é cada serviço */}
      <Audiences />
      {/* 7. Diferencial exclusivo — HomeCare */}
      <Homecare />
      {/* 8. Planos — preços e próximos passos */}
      <Packages />
      {/* 9. Objeções — perguntas frequentes */}
      <FAQ />
      {/* 10. Ação — formulário de contato simplificado */}
      <ContactForm />
      {/* 11. Localização — onde estamos */}
      <Location />
      {/* 12. Urgência final — CTA de fechamento */}
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
