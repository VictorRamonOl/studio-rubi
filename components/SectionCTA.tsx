import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Faixa central com botão "ver mais" — leva da home para as páginas dedicadas.
export default function SectionCTA({
  href,
  children,
  tone = "cream",
}: {
  href: string
  children: React.ReactNode
  tone?: "cream" | "white"
}) {
  return (
    <div className={`${tone === "cream" ? "bg-cream" : "bg-white"} pb-4 pt-2 text-center`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-wine/25 px-6 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine hover:text-cream"
      >
        {children}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
