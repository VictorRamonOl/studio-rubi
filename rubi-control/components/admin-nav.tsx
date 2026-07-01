"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Package, CalendarDays, Wallet, FileText, Settings,
  type LucideIcon,
} from "lucide-react";

const ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/pacotes", label: "Pacotes", icon: Package },
  { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/admin/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/admin/conteudos", label: "Conteúdos", icon: FileText },
  { href: "/admin/configuracoes", label: "Config", icon: Settings },
];

// itens mostrados na barra inferior do celular (os principais)
const MOBILE = ITEMS.filter((i) =>
  ["Painel", "Clientes", "Pacotes", "Agenda", "Financeiro"].includes(i.label),
);

export function AdminNav({ variant }: { variant: "sidebar" | "bottom" }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  if (variant === "sidebar") {
    return (
      <nav className="flex flex-col gap-1 px-3">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              isActive(href) ? "bg-white/15 font-medium text-cream" : "text-cream/75 hover:bg-white/10 hover:text-cream"
            }`}
          >
            <Icon size={18} strokeWidth={1.75} />
            {label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-black/5 bg-white md:hidden">
      {MOBILE.map(({ href, label, icon: Icon }) => (
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
