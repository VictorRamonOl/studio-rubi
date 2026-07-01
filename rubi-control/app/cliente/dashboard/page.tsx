import { createClient } from "@/lib/supabase/server";

export default async function ClienteDashboard() {
  const supabase = await createClient();

  // RLS garante que só vem o pacote ativo DO PRÓPRIO paciente.
  const { data: pacote } = await supabase
    .from("packages")
    .select("total_sessions, used_sessions, remaining_sessions, due_date, status")
    .eq("status", "ativo")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: proxima } = await supabase
    .from("sessions")
    .select("scheduled_at, status")
    .eq("status", "agendada")
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-wine">Olá!</h1>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <p className="text-xs uppercase tracking-wide text-muted">Seu pacote</p>
        {pacote ? (
          <>
            <p className="mt-1 font-serif text-3xl text-wine">
              {pacote.remaining_sessions}
              <span className="text-base text-muted"> / {pacote.total_sessions} sessões</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {pacote.due_date ? `Válido até ${new Date(pacote.due_date).toLocaleDateString("pt-BR")}` : "Sem vencimento"}
            </p>
          </>
        ) : (
          <p className="mt-1 text-sm text-muted">Nenhum pacote ativo no momento.</p>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <p className="text-xs uppercase tracking-wide text-muted">Próxima sessão</p>
        <p className="mt-1 text-lg text-dark">
          {proxima
            ? new Date(proxima.scheduled_at).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "Nada agendado"}
        </p>
      </section>
    </div>
  );
}
