import type { BlogCategory } from "@/data/blog"

export type Palette = {
  from: string
  via: string
  to: string
  angle: number
  accent: string
  accentSoft: string
  text: string
  textSoft: string
}

/**
 * Mesma lógica de cores do BlogCover.tsx — paleta oficial do site.
 */
export const CATEGORY_PALETTE: Record<BlogCategory, Palette> = {
  "Dor e Lesões": {
    from: "#4A1222",
    via: "#681D31",
    to: "#742239",
    angle: 135,
    accent: "#C89E51",
    accentSoft: "rgba(200,158,81,0.35)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.75)",
  },
  "Gestantes e Puerpério": {
    from: "#742239",
    via: "#681D31",
    to: "#BB8950",
    angle: 145,
    accent: "#EFE1A2",
    accentSoft: "rgba(239,225,162,0.35)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.75)",
  },
  "Métodos e Tratamentos": {
    from: "#2B2224",
    via: "#4A1222",
    to: "#681D31",
    angle: 135,
    accent: "#DBB06B",
    accentSoft: "rgba(219,176,107,0.35)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.75)",
  },
  "Idosos e Reabilitação": {
    from: "#2B2224",
    via: "#4A1222",
    to: "#742239",
    angle: 145,
    accent: "#BB8950",
    accentSoft: "rgba(187,137,80,0.35)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.75)",
  },
  "Esportes e Performance": {
    from: "#4A1222",
    via: "#742239",
    to: "#BB8950",
    angle: 135,
    accent: "#FBE688",
    accentSoft: "rgba(251,230,136,0.35)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.78)",
  },
  "Lifestyle e Prevenção": {
    from: "#681D31",
    via: "#BB8950",
    to: "#DBB06B",
    angle: 125,
    accent: "#F7F4EE",
    accentSoft: "rgba(247,244,238,0.4)",
    text: "#F7F4EE",
    textSoft: "rgba(247,244,238,0.85)",
  },
}

export const SLIDE_SIZE = { width: 1080, height: 1350 }
