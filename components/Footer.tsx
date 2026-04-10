import { MapPin, Phone, Clock, Instagram, Heart, Mail, Facebook } from "lucide-react"
import Image from "next/image"
import { CONTACT, HOURS, WHATSAPP_URL } from "@/lib/constants"

const SERVICE_LINKS = [
  "Pilates Terapêutico",
  "Pilates para Gestantes",
  "Fisioterapia",
  "RPG",
  "Reabilitação Funcional",
  "HomeCare",
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2B2224" }} className="text-cream/60">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              {/*
                IMAGEM: logo horizontal (fundo transparente, versão clara/dourada) em:
                public/images/logo-footer.png
              */}
              <Image
                src="/images/logo2.png"
                alt="Rubi Studio Pilates e Fisioterapia"
                width={160}
                height={44}
                className="object-contain h-10 w-auto mb-2"
              />
            </div>
            <p className="text-sm leading-relaxed text-cream/40 mb-5">
              Movimento cura. Cuidamos do seu corpo com técnica, atenção e propósito desde 2024
              em Manaus.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Instagram className="w-4 h-4 text-gold/70" />
              </a>
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Facebook className="w-4 h-4 text-gold/70" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="E-mail"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Mail className="w-4 h-4 text-gold/70" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-cream text-base mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#servicos" className="hover:text-gold transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-cream text-base mb-4">Horários</h4>
            <div className="space-y-3">
              {HOURS.map((h) => (
                <div key={h.days} className="flex items-start gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <span>
                    {h.days}:{" "}
                    <span className="text-cream/80">{h.time}</span>
                  </span>
                </div>
              ))}
              <p className="text-xs text-cream/25 pl-5">Somente com agendamento</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-cream text-base mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>{CONTACT.address}, {CONTACT.neighborhood}, {CONTACT.city}</span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Instagram className="w-4 h-4 text-gold flex-shrink-0" />
                {CONTACT.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cream/25">
          <p>© {new Date().getFullYear()} Rubi Studio Pilates e Fisioterapia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-wine mx-0.5" /> em Manaus, AM
          </p>
        </div>
      </div>
    </footer>
  )
}
