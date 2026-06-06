import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Authority from "@/components/Authority"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"
import Audiences from "@/components/Audiences"
import Homecare from "@/components/Homecare"
import Packages from "@/components/Packages"
import BlogPreview from "@/components/BlogPreview"
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
      <Hero />
      <Authority />
      <About />
      <Testimonials />
      <Services />
      <Audiences />
      <Homecare />
      <Packages />
      <BlogPreview />
      <FAQ />
      <ContactForm />
      <Location />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
