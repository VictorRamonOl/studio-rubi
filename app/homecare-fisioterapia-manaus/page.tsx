import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/data/service-pages"
import {
  SITE_URL,
  buildMetadata,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate"

const SLUG = "homecare-fisioterapia-manaus"
const service = getServiceBySlug(SLUG)!

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${SLUG}`,
  keywords: service.keywords,
})

export default function Page() {
  if (!service) notFound()
  const url = `${SITE_URL}/${SLUG}`
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.title,
              description: service.metaDescription,
              url,
              serviceType: service.serviceType,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(service.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", url: SITE_URL },
              { name: service.title, url },
            ])
          ),
        }}
      />
      <ServicePageTemplate service={service} />
    </>
  )
}
