import Image from "next/image"
import { Award, Clock, Star } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"

const CREDENTIALS = [
  { Icon: Award, value: "2012", label: "Formação" },
  { Icon: Clock, value: "2014", label: "Pilates" },
  { Icon: Star, value: "+1.600", label: "Atendimentos" },
]

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Photo */}
          <div className="relative flex justify-center">
            <div className="relative w-72 md:w-80">
              {/* Decorative offset border */}
              <div
                className="absolute inset-0 rounded-2xl translate-x-4 translate-y-4 border-2 border-gold/30"
                aria-hidden="true"
              />
              {/* Wine fill decoration */}
              <div
                className="absolute inset-0 rounded-2xl -translate-x-2 -translate-y-2 opacity-10"
                style={{ background: "#681D31" }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                {/*
                  IMAGEM: salve a foto da Dra. Rúbia em:
                  public/images/dra-rubia.jpg
                */}
                <Image
                  src="/images/dra-rubia.jpg"
                  alt="Dra. Rúbia Torres — Fisioterapeuta e fundadora do Rubi Studio Pilates e Fisioterapia em Manaus"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
              {/* Badge */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3 shadow-xl"
                style={{ background: "linear-gradient(135deg, #681D31, #742239)" }}
              >
                <div className="text-xs text-gold/70 uppercase tracking-wide">Fundadora</div>
                <div className="font-serif text-sm text-cream font-medium">Dra. Rúbia Torres</div>
                <div className="text-xs text-cream/50 mt-0.5">CREFITO 199729-F</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Nossa equipe
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-5">
              Dra. Rúbia Torres —{" "}
              <span className="text-wine">mais de 12 anos</span>{" "}
              cuidando de corpos e histórias
            </h2>
            <p className="text-muted text-base leading-relaxed mb-4">
              Fisioterapeuta formada em 2012 e especialista em Pilates desde 2014, a Dra. Rúbia
              Torres fundou o Rubi Studio com um propósito claro: um atendimento que vai além do
              exercício. Cada sessão é uma conversa real entre profissional e paciente — com escuta,
              técnica e cuidado genuíno.
            </p>
            <p className="text-muted text-base leading-relaxed mb-4">
              Casada, mãe de duas princesas e manauara de coração, ela traz para o estúdio não só
              a técnica, mas a empatia de quem entende o que é viver com dor — e o que é recuperar
              a leveza de se mover.
            </p>
            <p className="text-muted text-base leading-relaxed mb-7">
              O Rubi Studio cresce junto com seus pacientes. Nossa equipe de fisioterapeutas está
              em expansão para oferecer ainda mais disponibilidade e cuidado — sempre com o mesmo
              padrão de excelência que nos define.
            </p>

            {/* Credentials bar */}
            <div className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-gold/15">
              {CREDENTIALS.map(({ Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(104,29,49,0.08)" }}
                  >
                    <Icon className="w-5 h-5 text-wine" />
                  </div>
                  <div className="font-serif text-lg text-dark font-bold">{value}</div>
                  <div className="text-muted text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-gold pl-4 mb-7 italic text-muted text-sm leading-relaxed">
              &ldquo;Movimento cura. E cada pessoa que chega aqui merece ser ouvida antes de
              qualquer exercício.&rdquo;
              <footer className="not-italic text-dark/60 text-xs mt-1">— Dra. Rúbia Torres</footer>
            </blockquote>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wine text-cream px-7 py-3.5 rounded-full font-medium hover:bg-wine-light transition-colors"
            >
              Agendar com a Dra. Rúbia
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
