import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Studio Rubi Pilates e Fisioterapia em Manaus — Parque Dez"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
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
          background:
            "linear-gradient(135deg, #4A1222 0%, #681D31 55%, #742239 100%)",
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
            background:
              "radial-gradient(circle at top right, rgba(200,158,81,0.25), transparent 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#C89E51",
              textTransform: "uppercase",
            }}
          >
            Pilates &amp; Fisioterapia · Manaus
          </div>
          <div style={{ height: 1, width: 80, background: "#C89E51", opacity: 0.6 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Chega de viver com dor.
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#C89E51",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Seu corpo pode se mover de novo.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(247,244,238,0.75)",
              marginTop: 6,
              maxWidth: 820,
            }}
          >
            Studio Rubi — atendimento individualizado com a Dra. Rúbia Torres.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(200,158,81,0.35)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: "#C89E51", letterSpacing: 3 }}>
              STUDIO RUBI
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(247,244,238,0.55)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              rubistudiopilates.com.br
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
            Parque Dez · Manaus / AM
            <br />
            (92) 99285-5658
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
