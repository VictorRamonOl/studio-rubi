import type { Metadata } from "next"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"

export const SITE_NAME = "Studio Rubi Pilates e Fisioterapia"

type BuildMeta = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildMeta): Metadata {
  const url = `${SITE_URL}${path}`
  const explicitImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type,
      ...(explicitImage
        ? { images: [{ url: explicitImage, width: 1200, height: 630, alt: title }] }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(explicitImage ? { images: [explicitImage] } : {}),
    },
    robots: { index: true, follow: true },
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
  serviceType: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    procedureType: opts.serviceType,
    provider: {
      "@type": "MedicalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: "+55-92-99285-5658",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Carlos Lecor, nº 1005, Sala 02",
        addressLocality: "Manaus",
        addressRegion: "AM",
        postalCode: "69055-430",
        addressCountry: "BR",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Manaus",
      addressRegion: "AM",
      addressCountry: "BR",
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleSchema(opts: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: "Dra. Rúbia Torres",
      jobTitle: "Fisioterapeuta",
      worksFor: { "@type": "Organization", name: SITE_NAME },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.jpg`,
      },
    },
    mainEntityOfPage: opts.url,
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  }
}
