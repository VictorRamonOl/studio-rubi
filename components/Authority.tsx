import { Shield, Users, Heart, Award } from "lucide-react"

const PILLARS = [
  {
    Icon: Users,
    title: "Atendimento Personalizado",
    text: "Cada sessão é planejada exclusivamente para o seu corpo, seus objetivos e sua evolução. Aqui você não é mais um número.",
  },
  {
    Icon: Heart,
    title: "Foco em Dor e Funcionalidade",
    text: "Nosso propósito vai além do exercício. Trabalhamos com método, técnica e escuta para devolver a você o movimento sem dor.",
  },
  {
    Icon: Shield,
    title: "Ambiente Seguro e Acolhedor",
    text: "Um espaço pensado para que você se sinta bem desde a chegada. Sem pressa, sem julgamentos — só cuidado de verdade.",
  },
  {
    Icon: Award,
    title: "Profissional Especializada",
    text: "Dra. Rúbia Torres, fisioterapeuta formada em 2012 e ministrando Pilates desde 2014 com dedicação e atualização constante.",
  },
]

export default function Authority() {
  return (
    <section id="autoridade" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Por que escolher o Rubi Studio
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Cuidado humano com <span className="text-wine">técnica e propósito</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Acreditamos que movimento cura. E que cada pessoa merece um acompanhamento que respeite
            sua história, seu ritmo e suas necessidades reais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-wine/8 flex items-center justify-center mb-4 group-hover:bg-wine/12 transition-colors" style={{ backgroundColor: "rgba(104,29,49,0.07)" }}>
                <Icon className="w-6 h-6 text-wine" />
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
