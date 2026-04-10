"use client"

import { useState } from "react"
import { Send, MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import { trackLeadFormSubmit, trackWhatsAppClick } from "@/lib/analytics"

type FormData = {
  name: string
  whatsapp: string
  mainPain: string
  bestTime: string
}

const INPUT =
  "w-full bg-white border border-gold/20 rounded-xl px-4 py-3 text-dark text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-muted/50"

const PAIN_OPTIONS = [
  { value: "", label: "Selecione sua principal queixa..." },
  { value: "dor-lombar", label: "Dor lombar / coluna" },
  { value: "dor-joelho-quadril", label: "Dor no joelho ou quadril" },
  { value: "dor-pescoco-ombro", label: "Dor no pescoço ou ombro" },
  { value: "pos-cirurgico", label: "Pós-cirúrgico / reabilitação" },
  { value: "pilates-gestante", label: "Pilates para gestantes" },
  { value: "pilates-preventivo", label: "Pilates preventivo / condicionamento" },
  { value: "outro", label: "Outro" },
]

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    whatsapp: "",
    mainPain: "",
    bestTime: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        trackLeadFormSubmit()
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <section id="contato" className="py-20 bg-cream">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(104,29,49,0.1)" }}
          >
            <Send className="w-7 h-7 text-wine" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl text-dark mb-2">Mensagem recebida!</h3>
          <p className="text-muted mb-6 text-sm">
            Nossa equipe entrará em contato em breve. Se preferir falar agora:
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("contact_form_success")}
            className="inline-flex items-center gap-2 bg-wine text-cream px-6 py-3 rounded-full font-medium hover:bg-wine-light transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Falar agora no WhatsApp
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="contato" className="py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Primeiro passo
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            Conte sua queixa e nossa equipe{" "}
            <span className="text-wine">agenda sua avaliação</span>
          </h2>
          <p className="text-muted text-sm">
            Respondemos em até 24h úteis. Sem compromisso — só cuidado.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm border border-gold/10 p-8 space-y-5"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-dark/60 mb-1.5 uppercase tracking-wide"
              >
                Nome completo *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Seu nome"
                className={INPUT}
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-xs font-medium text-dark/60 mb-1.5 uppercase tracking-wide"
              >
                WhatsApp *
              </label>
              <input
                id="whatsapp"
                type="tel"
                name="whatsapp"
                required
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="(92) 99999-9999"
                className={INPUT}
                autoComplete="tel"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mainPain"
              className="block text-xs font-medium text-dark/60 mb-1.5 uppercase tracking-wide"
            >
              Principal queixa *
            </label>
            <select
              id="mainPain"
              name="mainPain"
              required
              value={form.mainPain}
              onChange={handleChange}
              className={INPUT}
            >
              {PAIN_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="bestTime"
              className="block text-xs font-medium text-dark/60 mb-1.5 uppercase tracking-wide"
            >
              Melhor horário para contato
            </label>
            <select
              id="bestTime"
              name="bestTime"
              value={form.bestTime}
              onChange={handleChange}
              className={INPUT}
            >
              <option value="">Selecione...</option>
              <option value="manha">Manhã (7h – 12h)</option>
              <option value="tarde">Tarde (12h – 18h)</option>
              <option value="qualquer">Qualquer horário</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-wine text-cream py-4 rounded-xl font-semibold text-base hover:bg-wine-light transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {status === "sending" ? "Enviando..." : "Quero agendar minha avaliação →"}
          </button>

          <p className="text-center text-xs text-muted/60">
            Seus dados são usados apenas para agendamento. Sem spam.
          </p>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center" role="alert">
              Erro ao enviar. Por favor, tente pelo{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
