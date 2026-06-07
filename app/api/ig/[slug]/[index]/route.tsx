import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/data/blog"
import { extractSlides } from "@/lib/instagram/slides"
import { CATEGORY_PALETTE, SLIDE_SIZE } from "@/lib/instagram/theme"

export const runtime = "edge"

const SIZE = SLIDE_SIZE
const CONTENT_TYPE = "image/png"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string; index: string } }
) {
  const post = getPostBySlug(params.slug)
  if (!post) return new Response("Post not found", { status: 404 })

  const slides = extractSlides(post)
  const i = parseInt(params.index, 10)
  if (Number.isNaN(i) || i < 0 || i >= slides.length) {
    return new Response("Slide index out of range", { status: 400 })
  }

  const slide = slides[i]
  const palette = CATEGORY_PALETTE[post.category]

  const baseStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(${palette.angle}deg, ${palette.from} 0%, ${palette.via} 55%, ${palette.to} 100%)`,
    color: palette.text,
    fontFamily: "serif",
    position: "relative",
    padding: "90px",
  }

  const brandFooter = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTop: `1px solid ${palette.accentSoft}`,
        paddingTop: 28,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "serif",
            fontSize: 32,
            color: palette.accent,
            letterSpacing: 4,
            fontWeight: 700,
          }}
        >
          STUDIO RUBI
        </div>
        <div style={{ fontSize: 22, color: palette.textSoft, marginTop: 4 }}>
          @rubistudiopilates
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          color: palette.textSoft,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>Pilates e Fisioterapia</div>
        <div>Parque Dez · Manaus</div>
      </div>
    </div>
  )

  let content: JSX.Element

  if (slide.kind === "cover") {
    content = (
      <div style={baseStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 24,
              padding: "14px 28px",
              borderRadius: 999,
              background: `${palette.accent}33`,
              color: palette.accent,
              textTransform: "uppercase",
              letterSpacing: 6,
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            {slide.category}
          </div>
          <div
            style={{
              fontSize: 22,
              color: palette.textSoft,
              fontFamily: "sans-serif",
              marginTop: 6,
            }}
          >
            {`${slide.readingTime} min de leitura`}
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 880,
              fontFamily: "serif",
            }}
          >
            {slide.title}
          </div>
          <div style={{ height: 2, width: 120, background: palette.accent }} />
          <div
            style={{
              fontSize: 30,
              color: palette.textSoft,
              fontFamily: "sans-serif",
              maxWidth: 800,
            }}
          >
            Arrasta para ler
          </div>
        </div>

        {brandFooter}
      </div>
    )
  } else if (slide.kind === "topic") {
    content = (
      <div style={baseStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              fontSize: 26,
              padding: "10px 24px",
              borderRadius: 999,
              background: `${palette.accent}33`,
              color: palette.accent,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            {`0${slide.index}`}
          </div>
          <div
            style={{
              fontSize: 22,
              color: palette.textSoft,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            {post.category}
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 880,
              fontFamily: "serif",
            }}
          >
            {slide.heading}
          </div>
          <div style={{ height: 2, width: 100, background: palette.accent }} />
          <div
            style={{
              fontSize: 32,
              color: palette.textSoft,
              fontFamily: "sans-serif",
              lineHeight: 1.45,
              maxWidth: 880,
              whiteSpace: "pre-line",
            }}
          >
            {slide.body}
          </div>
        </div>

        {brandFooter}
      </div>
    )
  } else {
    content = (
      <div style={baseStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 24,
              padding: "12px 26px",
              borderRadius: 999,
              background: `${palette.accent}33`,
              color: palette.accent,
              textTransform: "uppercase",
              letterSpacing: 5,
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            Próximo passo
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 880,
              fontFamily: "serif",
            }}
          >
            Vamos começar pela avaliação?
          </div>
          <div
            style={{
              fontSize: 30,
              color: palette.textSoft,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
              maxWidth: 800,
            }}
          >
            A Dra. Rúbia escuta sua história, examina seu corpo e indica o
            melhor caminho de tratamento. Sem compromisso.
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              fontFamily: "sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 34,
                color: palette.text,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: palette.accent,
                }}
              />
              {`WhatsApp · ${slide.phone}`}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 28,
                color: palette.textSoft,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: palette.accent,
                }}
              />
              {slide.site}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 28,
                color: palette.textSoft,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: palette.accent,
                }}
              />
              Rua Carlos Lecor, 1005 - Parque Dez
            </div>
          </div>
        </div>

        {brandFooter}
      </div>
    )
  }

  return new ImageResponse(content, {
    ...SIZE,
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, immutable",
      "Content-Type": CONTENT_TYPE,
    },
  })
}
