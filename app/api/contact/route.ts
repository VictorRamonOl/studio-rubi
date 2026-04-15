import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const PAIN_LABELS: Record<string, string> = {
  "dor-lombar": "Dor lombar / coluna",
  "dor-joelho-quadril": "Dor no joelho ou quadril",
  "dor-pescoco-ombro": "Dor no pescoço ou ombro",
  "pos-cirurgico": "Pós-cirúrgico / reabilitação",
  "pilates-gestante": "Pilates para gestantes",
  "pilates-preventivo": "Pilates preventivo / condicionamento",
  "outro": "Outro",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, whatsapp, mainPain, bestTime } = body

    if (!name || !whatsapp || !mainPain) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    const painLabel = PAIN_LABELS[mainPain] ?? mainPain
    const timeLabel = bestTime === "manha" ? "Manhã (7h–12h)" : bestTime === "tarde" ? "Tarde (12h–18h)" : bestTime === "qualquer" ? "Qualquer horário" : "Não informado"

    // Limpa o número e monta o link direto para o WhatsApp DO LEAD
    const whatsappClean = whatsapp.replace(/\D/g, "")
    const whatsappNumber = whatsappClean.startsWith("55") ? whatsappClean : `55${whatsappClean}`
    const whatsappMessage = encodeURIComponent(
      `Olá ${name}! Vi sua mensagem no site do Studio Rubi. Gostaria de agendar sua avaliação. Qual horário seria melhor para você?`
    )
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    await resend.emails.send({
      from: "Site Studio Rubi <onboarding@resend.dev>",
      to: "rubistudiopilates@gmail.com",
      subject: `Novo lead: ${name} — ${painLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#681D31;margin-top:0;">Novo lead pelo site</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Nome</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">WhatsApp</td><td style="padding:8px 0;font-weight:600;">${whatsapp}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Queixa principal</td><td style="padding:8px 0;font-weight:600;">${painLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Melhor horário</td><td style="padding:8px 0;">${timeLabel}</td></tr>
          </table>
          <a href="${whatsappLink}"
             style="display:inline-block;margin-top:20px;background:#25D366;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">
            💬 Responder para ${name} no WhatsApp
          </a>
          <p style="margin-top:12px;font-size:12px;color:#6b7280;">Clicando no botão acima você abre uma conversa direto com o número <strong>${whatsapp}</strong> com uma mensagem pronta.</p>
          <p style="margin-top:24px;font-size:11px;color:#9ca3af;">Mensagem enviada via rubistudiopilates.com.br</p>
        </div>
      `,
    })

    console.log("Lead enviado por email:", { name, whatsapp, mainPain })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("Erro ao processar formulário:", err)
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 })
  }
}
