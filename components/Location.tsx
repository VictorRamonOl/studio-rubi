import { MapPin, Clock, Phone, Instagram } from "lucide-react"
import { CONTACT, HOURS, WHATSAPP_URL } from "@/lib/constants"

export default function Location() {
  const mapsUrl =
    "https://maps.google.com/maps?q=Rubi+Studio+Pilates+e+Fisioterapia+Manaus+AM&output=embed"

  return (
    <section id="localizacao" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Onde estamos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Venha nos visitar em <span className="text-wine">Manaus</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Estamos no Parque Dez de Novembro, próximo à loja Phynas e à Rua do Comércio. Com
            estacionamento e fácil acesso pelo Uber ou Waze.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
              <h3 className="font-serif text-lg text-dark mb-4">Endereço</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-wine mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-dark font-medium">{CONTACT.address}</p>
                  <p className="text-muted">{CONTACT.neighborhood}</p>
                  <p className="text-muted">{CONTACT.city} · {CONTACT.cep}</p>
                  <p className="text-muted text-xs mt-1">Próximo à Phynas e Rua do Comércio · Com estacionamento</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
              <h3 className="font-serif text-lg text-dark mb-4">Horários</h3>
              <div className="space-y-3">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <Clock className="w-4 h-4 text-wine flex-shrink-0" />
                      {h.days}
                    </div>
                    <span className="font-medium text-wine">{h.time}</span>
                  </div>
                ))}
                <p className="text-xs text-muted pt-1 border-t border-gold/10">
                  * Atendimentos exclusivamente por agendamento
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
              <h3 className="font-serif text-lg text-dark mb-4">Contato</h3>
              <div className="space-y-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-dark hover:text-wine transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-wine flex-shrink-0" />
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-dark hover:text-wine transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4 text-wine flex-shrink-0" />
                  {CONTACT.instagram}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md border border-gold/10 h-[500px] lg:h-full">
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Rubi Studio Pilates e Fisioterapia em Manaus"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
