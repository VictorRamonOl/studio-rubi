import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, whatsapp, mainPain, painLocation, duration, goal, bestTime } = body

    if (!name || !whatsapp || !mainPain) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    // TODO: Integrar com serviço de e-mail (Resend, Nodemailer, etc.)
    //
    // Exemplo com Resend (npm install resend):
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'site@rubistudiopilates.com.br',
    //   to: 'TODO_EMAIL_DA_CLINICA@gmail.com',
    //   subject: `Novo lead: ${name}`,
    //   text: `
    //     Nome: ${name}
    //     WhatsApp: ${whatsapp}
    //     Dor principal: ${mainPain}
    //     Localização da dor: ${painLocation}
    //     Duração: ${duration}
    //     Objetivo: ${goal}
    //     Melhor horário: ${bestTime}
    //   `,
    // })

    console.log("Novo lead recebido:", {
      name,
      whatsapp,
      mainPain,
      painLocation,
      duration,
      goal,
      bestTime,
      receivedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("Erro ao processar formulário:", err)
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 })
  }
}
