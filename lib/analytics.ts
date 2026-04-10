declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type WhatsAppSource =
  | "hero"
  | "navbar"
  | "services"
  | "audiences"
  | "homecare"
  | "packages"
  | "faq"
  | "final_cta"
  | "floating_button"
  | "contact_form_success"

/** Dispara evento de clique no WhatsApp para GA4 e Meta Pixel */
export function trackWhatsAppClick(source: WhatsAppSource) {
  if (typeof window === "undefined") return

  if (window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: source,
    })
  }

  if (window.fbq) {
    window.fbq("track", "Contact", { source })
  }
}

/** Dispara evento de envio do formulário de contato */
export function trackLeadFormSubmit() {
  if (typeof window === "undefined") return

  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "lead",
      event_label: "contact_form",
    })
  }

  if (window.fbq) {
    window.fbq("track", "Lead")
  }
}
