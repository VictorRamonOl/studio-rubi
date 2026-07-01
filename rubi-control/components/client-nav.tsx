"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, CalendarDays, CreditCard, Sparkles, type LucideIcon } from "lucide-react";

const ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/cliente/dashboard", label: "Início", icon: Home },
  { href: "/cliente/pacote", label: "Pacote", icon: Package },
  { href: "/cliente/sessoes", label: "Sessões", icon: CalendarDays },
  { href: "/cliente/pagamentos", label: "Pagamentos", icon: CreditCard },
  { href: "/cliente/conteudos", label: "Dicas", icon: Sparkles },
];

export function ClientNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto grid max-w-md grid-cols-5 border-t border-black/5 bg-white">
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-0.5 py-2 text-[10px] ${
            isActive(href) ? "text-wine" : "text-muted"
          }`}
        >
          <Icon size={20} strokeWidth={1.75} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
