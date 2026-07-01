"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MessageCircle, CheckCircle2, Star, Users, Award,
  Activity, Stethoscope, AlignCenter, Home, ArrowRight,
} from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackWhatsAppClick } from "@/lib/analytics"

const TRUST_ITEMS = ["Máx. 3 alunos por horário", "14 anos de experiência", "Atendimento individual"]

const SERVICES = [
  { icon: Activity, label: "Pilates Terapêutico", href: "/pilates-terapeutico-manaus" },
  { icon: Stethoscope, label: "Fisioterapia", href: "/fisioterapia-manaus" },
  { icon: AlignCenter, label: "RPG", href: "/rpg-manaus" },
  { icon: Home, label: "Home Care", href: "/homecare-fisioterapia-manaus" },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }

function FloatingCard({ className, icon: Icon, value, label, delay }: { className: string; icon: typeof Star; value: string; label: string; delay: number }) {
  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_40px_-10px_rgba(104,29,49,0.35)] ring-1 ring-black/5 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-wine"><Icon className="h-4 w-4" /></span>
      <div className="leading-tight"><p className="font-serif text-lg text-wine">{value}</p><p className="text-[11px] text-muted">{label}</p></div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-white pt-28 lg:pt-32">
      {/* Brilhos suaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute -top-24 -right-16 h-96 w-96 rounded-full" style={{ background: "#C89E51", filter: "blur(120px)", opacity: 0.18 }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-40 -left-24 h-80 w-80 rounded-full" style={{ background: "#681D31", filter: "blur(130px)", opacity: 0.08 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full bg-wine/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-wine ring-1 ring-wine/10">
              Pilates e Fisioterapia · Manaus
            </motion.span>

            <motion.h1 variants={item} className="mt-6 font-serif text-4xl font-bold leading-[1.12] text-wine sm:text-5xl">
              <span className="block lg:whitespace-nowrap">Chega de viver com dor.</span>
              <span className="mt-1 block text-gold lg:whitespace-nowrap">Movimente-se sem medo.</span>
            </motion.h1>

            <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dark/70 lg:mx-0">
              Pilates terapêutico e fisioterapia com atendimento individualizado no Parque Dez.
              A Dra. Rúbia Torres cuida de você com um protocolo feito exclusivamente para o seu corpo.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hero")}
                className="flex items-center justify-center gap-2 rounded-full bg-wine px-7 py-4 text-base font-semibold text-cream shadow-lg shadow-wine/20 transition-all hover:-translate-y-0.5 hover:bg-wine-light">
                <MessageCircle className="h-5 w-5" /> Quero minha avaliação
              </a>
              <Link href="/servicos" className="flex items-center justify-center gap-2 rounded-full border border-wine/25 px-7 py-4 text-base font-semibold text-wine transition-all hover:bg-wine/5">
                Conhecer os serviços
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
              {TRUST_ITEMS.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm font-medium text-dark/60"><CheckCircle2 className="h-4 w-4 text-gold" /> {t}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Foto + cards */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="absolute -inset-6 rounded-[3rem] bg-gold/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5">
              <Image src="/images/dra-rubia.jpg" alt="Dra. Rúbia Torres — Fisioterapeuta no Studio Rubi, Manaus" width={520} height={640} className="h-[36rem] w-full object-cover object-top" priority />
            </div>
            <FloatingCard className="-left-8 top-20" icon={Award} value="14 anos" label="de experiência" delay={0.6} />
            <FloatingCard className="-right-6 top-1/2" icon={Users} value="Máx. 3" label="alunos por horário" delay={0.9} />
            <FloatingCard className="-left-4 bottom-12" icon={Star} value="+1.600" label="atendimentos" delay={1.2} />
          </motion.div>
        </div>

        {/* Faixa de serviços (preenche a base) */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mt-14 grid grid-cols-2 gap-4 pb-16 md:grid-cols-4">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-wine/5 text-wine transition-colors group-hover:bg-wine group-hover:text-cream"><s.icon className="h-5 w-5" /></span>
              <span className="text-sm font-semibold text-dark">{s.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-wine" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
