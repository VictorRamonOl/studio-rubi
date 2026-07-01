import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { renovarPacoteAction } from "./renew-actions";

type Row = {
  id: string;
  total_sessions: number;
  remaining_sessions: number;
  due_date: string | null;
  status: string;
  clients: { full_name: string } | null;
};

export default async function PacotesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("id, total_sessions, remaining_sessions, due_date, status, clients(full_name)")
    .order("created_at", { ascending: false })
    .limit(200);

  const pacotes = (data ?? []) as unknown as Row[];

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-wine">Pacotes</h1>
        <Link href="/admin/pacotes/novo" className="rounded-lg bg-wine px-3 py-2 text-sm font-medium text-cream hover:bg-wine-light">
          + Novo
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {pacotes.length > 0 ? (
          <ul className="divide-y divide-black/5">
            {pacotes.map((p) => {
              const baixo = p.remaining_sessions <= 2 && p.status === "ativo";
              return (
                <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-dark">{p.clients?.full_name ?? "—"}</p>
                    <p className="text-sm text-muted">
                      {p.due_date ? `Vence ${new Date(p.due_date).toLocaleDateString("pt-BR")}` : "Sem vencimento"} · {p.status}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className={`font-serif text-lg ${baixo ? "text-red-600" : "text-wine"}`}>
                      {p.remaining_sessions}/{p.total_sessions}
                      {baixo && <span className="ml-1 text-xs">⚠</span>}
                    </span>
                    {(p.status === "ativo" || p.status === "vencido") && (
                      <form action={renovarPacoteAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="rounded-md bg-cream px-2 py-1 text-xs font-medium text-wine hover:bg-gold-light">↻ Renovar</button>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted">Nenhum pacote ainda.</p>
        )}
      </div>
    </div>
  );
}
