import { createClient } from "@/lib/supabase/server";

export default async function MeuPacotePage() {
  const supabase = await createClient();
  const { data: pacote } = await supabase
    .from("packages")
    .select("total_sessions, used_sessions, remaining_sessions, due_date, status, courtesy_total, courtesy_used")
    .eq("status", "ativo")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-wine">Meu pacote</h1>
      {pacote ? (
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5">
            <p className="font-serif text-5xl text-wine">{pacote.remaining_sessions}</p>
            <p className="text-sm text-muted">de {pacote.total_sessions} sessões restantes</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase text-muted">Realizadas</p>
              <p className="mt-1 text-xl text-dark">{pacote.used_sessions}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase text-muted">Validade</p>
              <p className="mt-1 text-xl text-dark">
                {pacote.due_date ? new Date(pacote.due_date).toLocaleDateString("pt-BR") : "—"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 text-sm text-muted shadow-sm ring-1 ring-black/5">
            Cortesias (remarcação grátis): {pacote.courtesy_total - pacote.courtesy_used} de {pacote.courtesy_total} disponíveis
          </div>
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-muted shadow-sm ring-1 ring-black/5">
          Nenhum pacote ativo. Fale com o estúdio. 😊
        </p>
      )}
    </div>
  );
}
