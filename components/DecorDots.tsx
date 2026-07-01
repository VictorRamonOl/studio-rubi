"use client"

import { motion } from "framer-motion"

// Bolinhas douradas flutuando (decoração animada estilo seufisio).
// Fica atrás do conteúdo (z-0, pointer-events-none). Use dentro de um pai relativo.
const DOTS = [
  { left: "8%", top: "22%", size: 10, dur: 7, delay: 0 },
  { left: "18%", top: "68%", size: 6, dur: 9, delay: 1 },
  { left: "82%", top: "18%", size: 14, dur: 8, delay: 0.5 },
  { left: "90%", top: "60%", size: 8, dur: 6, delay: 1.5 },
  { left: "72%", top: "82%", size: 6, dur: 10, delay: 0.8 },
  { left: "40%", top: "12%", size: 8, dur: 7.5, delay: 2 },
  { left: "55%", top: "88%", size: 10, dur: 8.5, delay: 1.2 },
]

export default function DecorDots({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/30"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ y: [0, -18, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
