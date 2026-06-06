"use client"

import { useState } from "react"
import { Download, Copy, Check, ExternalLink } from "lucide-react"

type Props = {
  slug: string
  title: string
  category: string
  slideCount: number
  caption: string
}

export default function CarouselPreview({
  slug,
  title,
  category,
  slideCount,
  caption,
}: Props) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const slideIndexes = Array.from({ length: slideCount }, (_, i) => i)

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      const el = document.createElement("textarea")
      el.value = caption
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  const downloadAll = async () => {
    for (const i of slideIndexes) {
      const a = document.createElement("a")
      a.href = `/api/ig/${slug}/${i}`
      a.download = `${slug}-slide-${String(i + 1).padStart(2, "0")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      await new Promise((r) => setTimeout(r, 400))
    }
  }

  return (
    <div className="bg-wine-dark/40 border border-gold/15 rounded-2xl overflow-hidden">
      <div className="p-5 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-[260px]">
          <p className="text-gold/60 text-[10px] uppercase tracking-widest mb-1">
            {category} · {slideCount} slides
          </p>
          <h3 className="font-serif text-lg leading-tight">{title}</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={copyCaption}
            className="inline-flex items-center gap-2 bg-gold text-dark px-4 py-2 rounded-full text-xs font-semibold hover:bg-gold-mid transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copiado" : "Copiar legenda"}
          </button>
          <button
            onClick={downloadAll}
            className="inline-flex items-center gap-2 border border-gold/40 text-cream px-4 py-2 rounded-full text-xs hover:bg-gold/10 hover:text-gold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar slides
          </button>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {slideIndexes.map((i) => (
            <a
              key={i}
              href={`/api/ig/${slug}/${i}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden border border-gold/20 hover:border-gold/60 transition-colors group relative"
              title={`Slide ${i + 1} — abrir em nova aba`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/ig/${slug}/${i}`}
                alt={`Slide ${i + 1}`}
                width={1080}
                height={1350}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-dark/80 text-cream/90 text-[10px] px-1.5 py-0.5 rounded">
                {i + 1}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-gold" />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-cream/50 hover:text-gold transition-colors"
        >
          {expanded ? "Ocultar legenda" : "Ver legenda completa"} →
        </button>
        {expanded && (
          <pre className="mt-3 p-4 bg-dark/60 rounded-lg text-cream/80 text-xs whitespace-pre-wrap leading-relaxed font-sans border border-gold/10">
            {caption}
          </pre>
        )}
      </div>
    </div>
  )
}
