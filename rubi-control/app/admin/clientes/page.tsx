import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ClientStatusBadge } from "@/components/status-badge";
import { CLIENT_STATUS, type ClientStatus } from "@/features/clients/schema";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("clients")
    .select("id, full_name, phone, status, created_at")
    .order("full_name", { ascending: true })
    .limit(200);

  if (q) query = query.ilike("full_name", `%${q}%`);
  if (status && CLIENT_STATUS.includes(status as ClientStatus)) {
    query = query.eq("status", status);
  }

  const { data: clientes } = await query;

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-wine">Clientes</h1>
        <Link href="/admin/clientes/novo" className="rounded-lg bg-wine px-3 py-2 text-sm font-medium text-cream hover:bg-wine-light">
          + Novo
        </Link>
      </div>

      <form className="flex flex-wrap gap-2" action="/admin/clientes" method="get">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por nome..."
          className="flex-1 rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine"
        />
        <select name="status" defaultValue={status ?? ""} className="rounded-lg border border-black/10 px-3 py-2">
          <option value="">Todos status</option>
          {CLIENT_STATUS.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button className="rounded-lg bg-dark px-3 py-2 text-sm text-cream">Filtrar</button>
      </form>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {clientes && clientes.length > 0 ? (
          <ul className="divide-y divide-black/5">
            {clientes.map((c) => (
              <li key={c.id}>
                <Link href={`/admin/clientes/${c.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-cream">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-dark">{c.full_name}</p>
                    {c.phone && <p className="truncate text-sm text-muted">{c.phone}</p>}
                  </div>
                  <ClientStatusBadge status={c.status as ClientStatus} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted">
            Nenhum cliente encontrado. Clique em <strong>+ Novo</strong> para cadastrar.
          </p>
        )}
      </div>
    </div>
  );
}
