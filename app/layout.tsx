import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"

export const metadata: Metadata = {
  title: "Studio Ruby Pilates e Fisioterapia em Manaus | Parque Dez",
  description:
    "Pilates terapêutico e fisioterapia em Manaus no Parque Dez. Atendimento individualizado com a Dra. Rúbia Torres — fisioterapeuta com 12 anos de experiência. Trate dor lombar, faça pilates para gestantes, RPG e reabilitação. Agende: (92) 99285-5658.",
  keywords: [
    "pilates em manaus",
    "fisioterapia em manaus",
    "pilates terapêutico manaus",
    "fisioterapia dor lombar manaus",
    "pilates parque dez",
    "fisioterapia parque dez",
    "pilates gestantes manaus",
    "RPG manaus",
    "reabilitação funcional manaus",
    "studio ruby pilates",
    "fisioterapeuta manaus",
    "pilates terapêutico parque dez",
    "fisioterapia coluna manaus",
  ],
  authors: [{ name: "Studio Ruby Pilates e Fisioterapia" }],
  openGraph: {
    title: "Studio Ruby Pilates e Fisioterapia | Manaus - AM",
    description:
      "Pilates terapêutico e fisioterapia em Manaus com atendimento individualizado. Dra. Rúbia Torres — 12 anos de experiência. Viva sem dor, mova-se com leveza.",
    url: SITE_URL,
    siteName: "Studio Ruby Pilates e Fisioterapia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Studio Ruby Pilates e Fisioterapia em Manaus — Parque Dez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Ruby Pilates e Fisioterapia | Manaus - AM",
    description:
      "Pilates terapêutico e fisioterapia em Manaus com atendimento individualizado. Viva sem dor.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "Studio Ruby Pilates e Fisioterapia",
  description:
    "Studio especializado em pilates terapêutico, fisioterapia, RPG e reabilitação funcional em Manaus. Atendimento individualizado com a Dra. Rúbia Torres.",
  url: SITE_URL,
  telephone: "+55-92-99285-5658",
  email: "rubistudiopilates@gmail.com",
  image: `${SITE_URL}/images/dra-rubia.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Carlos Lecor, nº 1005, Sala 02",
    addressLocality: "Manaus",
    addressRegion: "AM",
    postalCode: "69055-430",
    addressCountry: "BR",
    neighborhood: "Parque Dez de Novembro",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-3.0969",
    longitude: "-60.0169",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rubistudiopilates",
    "https://facebook.com/rubistudiopilates",
  ],
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Dinheiro, Cartão de crédito, Cartão de débito, Pix",
  areaServed: {
    "@type": "City",
    name: "Manaus",
    addressRegion: "AM",
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
  hasMap: "https://maps.google.com/?q=Rubi+Studio+Pilates+e+Fisioterapia+Manaus+AM",
  medicalSpecialty: ["Physiotherapy", "PhysicalTherapy"],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como funciona a consulta de avaliação no Studio Ruby?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A avaliação é uma consulta inicial de 50 minutos onde a Dra. Rúbia faz um mapeamento completo da sua saúde, histórico de dores, postura e objetivos. A partir daí, é montado um protocolo exclusivo para você. Pode ser agendada pelo WhatsApp (92) 99285-5658 ou pelo formulário do site.",
      },
    },
    {
      "@type": "Question",
      name: "Preciso de indicação médica para fazer pilates em Manaus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não é obrigatória, mas é bem-vinda. Por ser fisioterapeuta, a Dra. Rúbia tem formação para avaliar suas condições e adaptar o atendimento com segurança. Caso você tenha laudos médicos ou exames, traga na avaliação.",
      },
    },
    {
      "@type": "Question",
      name: "O atendimento de pilates é individual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, com atenção personalizada. As aulas de Pilates têm no máximo 3 pessoas por horário. As sessões de Fisioterapia e RPG são totalmente individuais.",
      },
    },
    {
      "@type": "Question",
      name: "Pilates realmente ajuda na dor lombar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, e com evidência científica. O Pilates Terapêutico é amplamente reconhecido no tratamento e prevenção de dores lombares, fortalecendo a musculatura estabilizadora da coluna e melhorando a postura de forma duradoura.",
      },
    },
    {
      "@type": "Question",
      name: "Como agendar fisioterapia ou pilates no Parque Dez em Manaus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Você pode agendar pelo WhatsApp (92) 99285-5658 ou pelo formulário de contato no site. Nossa equipe responde em até 24 horas úteis para confirmar horários disponíveis.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo dura cada sessão de pilates ou fisioterapia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As sessões de Pilates têm duração de 50 minutos a 1 hora. As sessões de Fisioterapia têm 1 hora de duração. O tempo é respeitado para que você tenha um atendimento completo e sem pressa.",
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* TODO: Google Analytics — substituir G-XXXXXXXX pelo ID da sua propriedade GA4 */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXX');` }} /> */}

        {/* TODO: Meta Pixel — substituir XXXXXXXXXXXXXXXXXX pelo seu Pixel ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','XXXXXXXXXXXXXXXXXX');fbq('track','PageView');` }} /> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
