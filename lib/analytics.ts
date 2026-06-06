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
  | "blog_post"
  | "service_page"
  | "404_page"

function safeGtag(...args: unknown[]) {
  if (typeof window === "undefined") return
  if (typeof window.gtag === "function") {
    window.gtag(...args)
  }
}

function safeFbq(...args: unknown[]) {
  if (typeof window === "undefined") return
  if (typeof window.fbq === "function") {
    window.fbq(...args)
  }
}

/** Clique no WhatsApp — GA4 + Meta Pixel */
export function trackWhatsAppClick(source: WhatsAppSource) {
  safeGtag("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: source,
  })
  safeFbq("track", "Contact", { source })
}

/** Envio do formulário de contato */
export function trackLeadFormSubmit() {
  safeGtag("event", "generate_lead", {
    event_category: "lead",
    event_label: "contact_form",
  })
  safeFbq("track", "Lead")
}

/** Clique no telefone (toque pra ligar no mobile) */
export function trackPhoneClick(source: string) {
  safeGtag("event", "phone_click", {
    event_category: "engagement",
    event_label: source,
  })
}

/** Clique no Instagram */
export function trackInstagramClick(source: string) {
  safeGtag("event", "instagram_click", {
    event_category: "social",
    event_label: source,
  })
}

/** Visualização de página de serviço */
export function trackServicePageView(slug: string) {
  safeGtag("event", "service_page_view", {
    event_category: "content",
    event_label: slug,
  })
}

/** Visualização de post do blog */
export function trackBlogPostView(slug: string, category: string) {
  safeGtag("event", "blog_post_view", {
    event_category: "content",
    event_label: slug,
    blog_category: category,
  })
}

/** Profundidade de scroll — chamado pelo ScrollTracker */
export function trackScrollDepth(percent: 25 | 50 | 75 | 90) {
  safeGtag("event", "scroll", {
    event_category: "engagement",
    event_label: `${percent}%`,
    percent_scrolled: percent,
  })
}

/** Primeiro toque em campo do formulário */
export function trackFormStart() {
  safeGtag("event", "form_start", {
    event_category: "form",
    event_label: "contact_form",
  })
}
