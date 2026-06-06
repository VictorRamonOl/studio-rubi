import type { BlogCategory } from "@/data/blog"

/**
 * Paleta oficial do site (de tailwind.config.ts):
 *   wine.dark:    #4A1222
 *   wine:         #681D31
 *   wine.light:   #742239
 *   gold:         #C89E51
 *   gold.light:   #EFE1A2
 *   gold.bright:  #FBE688
 *   gold.warm:    #BB8950
 *   gold.mid:     #DBB06B
 *   cream:        #F7F4EE
 *   dark:         #2B2224
 *
 * Cada categoria recombina essas cores em um gradient + accent.
 * Sem cores inventadas.
 */
const PALETTE: Record<
  BlogCategory,
  { from: string; via: string; to: string; angle: number; accent: string }
> = {
  // Wine puro intenso + accent gold padrão
  "Dor e Lesões": {
    from: "#4A1222",
    via: "#681D31",
    to: "#742239",
    angle: 135,
    accent: "#C89E51",
  },
  // Wine → gold-warm (transição quente) + accent gold-light
  "Gestantes e Puerpério": {
    from: "#742239",
    via: "#681D31",
    to: "#BB8950",
    angle: 145,
    accent: "#EFE1A2",
  },
  // Dark profundo + accent gold-mid
  "Métodos e Tratamentos": {
    from: "#2B2224",
    via: "#4A1222",
    to: "#681D31",
    angle: 135,
    accent: "#DBB06B",
  },
  // Wine mais escuro (dark + wine) + accent gold-warm
  "Idosos e Reabilitação": {
    from: "#2B2224",
    via: "#4A1222",
    to: "#742239",
    angle: 145,
    accent: "#BB8950",
  },
  // Wine → gold quente (energia) + accent gold-bright
  "Esportes e Performance": {
    from: "#4A1222",
    via: "#742239",
    to: "#BB8950",
    angle: 135,
    accent: "#FBE688",
  },
  // Wine → gold completo (luz) + accent cream
  "Lifestyle e Prevenção": {
    from: "#681D31",
    via: "#BB8950",
    to: "#DBB06B",
    angle: 125,
    accent: "#F7F4EE",
  },
}

// Hash determinístico simples baseado no slug → controla variação visual
function slugHash(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

const PATTERNS = [
  // 0 — gem outline grande
  (accent: string) => (
    <g opacity="0.18">
      <polygon
        points="100,10 190,60 190,180 100,230 10,180 10,60"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />
      <polygon
        points="100,40 160,72 160,168 100,200 40,168 40,72"
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
    </g>
  ),
  // 1 — círculos concêntricos
  (accent: string) => (
    <g opacity="0.16">
      <circle cx="100" cy="120" r="100" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="100" cy="120" r="70" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="100" cy="120" r="40" fill="none" stroke={accent} strokeWidth="0.5" />
    </g>
  ),
  // 2 — linhas paralelas em ângulo
  (accent: string) => (
    <g opacity="0.18">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={20 + i * 28}
          y1="20"
          x2={20 + i * 28 + 60}
          y2="220"
          stroke={accent}
          strokeWidth="1"
        />
      ))}
    </g>
  ),
  // 3 — onda
  (accent: string) => (
    <g opacity="0.2">
      <path
        d="M -20 140 Q 50 60, 120 140 T 260 140"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />
      <path
        d="M -20 170 Q 50 90, 120 170 T 260 170"
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
    </g>
  ),
  // 4 — diamantes em grade
  (accent: string) => (
    <g opacity="0.16">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <polygon
            key={`${row}-${col}`}
            points={`${30 + col * 70},${30 + row * 70} ${50 + col * 70},${50 + row * 70} ${30 + col * 70},${70 + row * 70} ${10 + col * 70},${50 + row * 70}`}
            fill="none"
            stroke={accent}
            strokeWidth="1"
          />
        ))
      )}
    </g>
  ),
  // 5 — arcos sobrepostos
  (accent: string) => (
    <g opacity="0.18">
      <path
        d="M 10 200 A 90 90 0 0 1 190 200"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />
      <path
        d="M 30 200 A 70 70 0 0 1 170 200"
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
      <path
        d="M 50 200 A 50 50 0 0 1 150 200"
        fill="none"
        stroke={accent}
        strokeWidth="0.5"
      />
    </g>
  ),
]

type Props = {
  title: string
  category: BlogCategory
  slug: string
  variant?: "card" | "hero"
}

export default function BlogCover({
  title,
  category,
  slug,
  variant = "card",
}: Props) {
  const palette = PALETTE[category]
  const hash = slugHash(slug)
  const patternIndex = hash % PATTERNS.length
  const Pattern = PATTERNS[patternIndex]

  const truncated = title.length > 90 ? title.slice(0, 87) + "…" : title
  const isHero = variant === "hero"

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between"
      style={{
        background: `linear-gradient(${palette.angle}deg, ${palette.from} 0%, ${palette.via} 55%, ${palette.to} 100%)`,
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3"
        style={{
          background: `radial-gradient(circle at top right, ${palette.accent}40, transparent 70%)`,
        }}
      />

      {/* Decorative pattern positioned by hash */}
      <svg
        viewBox="0 0 200 240"
        className="absolute"
        style={{
          right: `${(hash % 15) - 5}%`,
          top: `${(hash % 20) - 10}%`,
          width: isHero ? "55%" : "65%",
          height: isHero ? "75%" : "85%",
          opacity: 0.9,
        }}
        aria-hidden="true"
      >
        {Pattern(palette.accent)}
      </svg>

      {/* Top label */}
      <div
        className={`relative z-10 ${
          isHero ? "px-10 pt-10" : "px-6 pt-5"
        }`}
      >
        <span
          className={`inline-block uppercase font-medium ${
            isHero ? "text-xs tracking-[0.4em]" : "text-[10px] tracking-[0.3em]"
          }`}
          style={{ color: palette.accent }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <div
        className={`relative z-10 ${
          isHero ? "px-10 pb-10" : "px-6 pb-5"
        }`}
      >
        <h3
          className={`font-serif text-cream leading-tight ${
            isHero ? "text-3xl md:text-4xl" : "text-base md:text-lg"
          }`}
          style={{
            color: "#F7F4EE",
            textShadow: "0 1px 12px rgba(0,0,0,0.25)",
          }}
        >
          {truncated}
        </h3>
        <div
          className="mt-3 h-px"
          style={{ background: `${palette.accent}90`, width: isHero ? 80 : 40 }}
        />
        <div
          className={`mt-2 ${
            isHero ? "text-sm tracking-[0.3em]" : "text-[10px] tracking-[0.25em]"
          } font-medium uppercase`}
          style={{ color: palette.accent }}
        >
          Studio Rubi
        </div>
      </div>
    </div>
  )
}
