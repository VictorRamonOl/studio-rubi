import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/data/blog"

export const runtime = "edge"
export const alt = "Studio Rubi — Blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Mesma paleta oficial do site (tailwind.config.ts)
const CATEGORY_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  "Dor e Lesões": { from: "#4A1222", to: "#742239", accent: "#C89E51" },
  "Gestantes e Puerpério": { from: "#742239", to: "#BB8950", accent: "#EFE1A2" },
  "Métodos e Tratamentos": { from: "#2B2224", to: "#681D31", accent: "#DBB06B" },
  "Idosos e Reabilitação": { from: "#2B2224", to: "#742239", accent: "#BB8950" },
  "Esportes e Performance": { from: "#4A1222", to: "#BB8950", accent: "#FBE688" },
  "Lifestyle e Prevenção": { from: "#681D31", to: "#DBB06B", accent: "#F7F4EE" },
}

export default async function OG({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post?.title ?? "Studio Rubi — Blog"
  const category = post?.category ?? "Saúde"
  const palette =
    CATEGORY_COLORS[category] ?? { from: "#4A1222", to: "#742239", accent: "#C89E51" }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
          color: "#F7F4EE",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background: `radial-gradient(circle at top right, ${palette.accent}40, transparent 70%)`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 20,
              padding: "10px 22px",
              borderRadius: 999,
              background: `${palette.accent}26`,
              color: palette.accent,
              textTransform: "uppercase",
              letterSpacing: 4,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${palette.accent}55`,
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: palette.accent, letterSpacing: 3 }}>
              STUDIO RUBI
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(247,244,238,0.55)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Blog · Pilates &amp; Fisioterapia · Manaus
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(247,244,238,0.55)",
              fontFamily: "system-ui, sans-serif",
              textAlign: "right",
            }}
          >
            Por Dra. Rúbia Torres
            <br />
            rubistudiopilates.com.br
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
