import { requireClient } from "@/lib/auth/dal";
import { ClientNav } from "@/components/client-nav";
import { signOutAction } from "../(auth)/actions";
import { LogOut } from "lucide-react";

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireClient();

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-wine text-cream">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <span className="font-serif text-lg">Studio Rubi</span>
          <form action={signOutAction}>
            <button className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20">
              <LogOut size={15} /> Sair
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-md p-4 pb-24">{children}</main>

      <ClientNav />
    </div>
  );
}
