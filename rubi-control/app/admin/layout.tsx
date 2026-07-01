import { requireAdmin } from "@/lib/auth/dal";
import { AdminNav } from "@/components/admin-nav";
import { signOutAction } from "../(auth)/actions";
import { LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col bg-wine text-cream md:flex">
        <div className="px-6 py-5">
          <p className="font-serif text-xl leading-tight">Studio Rubi</p>
          <p className="text-xs text-cream/60">Gestão</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <AdminNav variant="sidebar" />
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="mb-2 truncate text-xs text-cream/70">{user.full_name ?? user.email}</p>
          <form action={signOutAction}>
            <button className="flex w-full items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20">
              <LogOut size={16} /> Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Header (mobile) */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-wine px-4 py-3 text-cream md:hidden">
        <span className="font-serif text-lg">Studio Rubi</span>
        <form action={signOutAction}>
          <button className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1 text-sm">
            <LogOut size={15} /> Sair
          </button>
        </form>
      </header>

      {/* Conteúdo */}
      <div className="md:pl-60">
        <main className="mx-auto max-w-5xl p-4 pb-24 md:p-8 md:pb-10">{children}</main>
      </div>

      {/* Bottom nav (mobile) */}
      <AdminNav variant="bottom" />
    </div>
  );
}
