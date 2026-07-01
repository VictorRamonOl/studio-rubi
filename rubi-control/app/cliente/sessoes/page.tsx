import { createClient } from "@/lib/supabase/server";
import { SessionStatusBadge } from "@/components/status-badge";
import type { SessionStatus } from "@/features/sessions/schema";
import { RescheduleForm } from "./reschedule-form";

type Row = { id: string; scheduled_at: string; status: SessionStatus; is_homecare: boolean };

function fmt(dt: string) {
  return new Date(dt).toLocaleString("pt-BR", {
    weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
    timeZone: "America/Manaus",
  });
}

export default async function MinhasSessoesPage() {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();

  const [{ data: futuras }, { data: passadas }, { data: pedidos }] = await Promise.all([
    supabase.from("sessions").select("id, scheduled_at, status, is_homecare")
      .gte("scheduled_at", nowIso).order("scheduled_at", { ascending: true }).limit(30),
    supabase.from("sessions").select("id, scheduled_at, status, is_homecare")
      .lt("scheduled_at", nowIso).order("scheduled_at", { ascending: false }).limit(15),
    supabase.from("reschedule_requests").select("session_id, status").eq("status", "pendente"),
  ]);

  const pend = new Set((pedidos ?? []).map((p) => p.session_id));
  const prox = (futuras ?? []) as Row[];
  const ant = (passadas ?? []) as Row[];

  return (
    <div className="space-y-5">
      <h1 className="font-serif text-2xl text-wine">Minhas sessões</h1>

      <section>
        <h2 className="mb-2 text-sm font-medium text-dark">Próximas</h2>
        <div className="space-y-2">
          {prox.length > 0 ? prox.map((s) => (
            <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-dark">
                  {fmt(s.scheduled_at)}{s.is_homecare && " 🏠"}
                </span>
                <SessionStatusBadge status={s.status} />
              </div>
              {pend.has(s.id) ? (
                <p className="mt-2 text-xs text-amber-700">⏳ Remarcação solicitada — aguardando confirmação.</p>
              ) : (
                <RescheduleForm sessionId={s.id} />
              )}
            </div>
          )) : (
            <p className="rounded-2xl bg-white px-4 py-6 text-center text-sm text-muted shadow-sm ring-1 ring-black/5">
              Nenhuma sessão agendada.
            </p>
          )}
        </div>
      </section>

      {ant.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-medium text-dark">Anteriores</h2>
          <div className="space-y-2">
            {ant.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-black/5">
                <span className="text-muted">{fmt(s.scheduled_at)}</span>
                <SessionStatusBadge status={s.status} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
