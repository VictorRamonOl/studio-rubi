import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SessionStatusBadge } from "@/components/status-badge";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { waLink, wppTemplates } from "@/lib/whatsapp";
import type { SessionStatus } from "@/features/sessions/schema";
import { setSessionStatusAction, markCourtesyAction } from "./actions";

type Row = {
  id: string;
  scheduled_at: string;
  status: SessionStatus;
  notes: string | null;
  is_homecare: boolean;
  professional_id: string | null;
  clients: { full_name: string; phone: string | null } | null;
  professionals: { full_name: string } | null;
};

function QuickBtn({
  id, date, status, label, cls, justificada,
}: { id: string; date: string; status: string; label: string; cls: string; justificada?: boolean }) {
  return (
    <form action={setSessionStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="justificada" value={justificada ? "1" : "0"} />
      <button className={`rounded-md px-2 py-1 text-xs font-medium ${cls}`}>{label}</button>
    </form>
  );
}

function CourtesyBtn({ id, date }: { id: string; date: string }) {
  return (
    <form action={markCourtesyAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="date" value={date} />
      <button className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-200">↻ Cortesia</button>
    </form>
  );
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; prof?: string }>;
}) {
  const { date, prof } = await searchParams;
  const day = date ?? new Date().toISOString().slice(0, 10);
  const start = new Date(`${day}T00:00:00-04:00`);
  const end = new Date(`${day}T23:59:59-04:00`);

  const supabase = await createClient();
  const { data: profsList } = await supabase
    .from("professionals")
    .select("id, full_name")
    .eq("active", true)
    .order("full_name");

  let query = supabase
    .from("sessions")
    .select("id, scheduled_at, status, notes, is_homecare, professional_id, clients(full_name, phone), professionals(full_name)")
    .gte("scheduled_at", start.toISOString())
    .lte("scheduled_at", end.toISOString())
    .order("scheduled_at", { ascending: true });
  if (prof) query = query.eq("professional_id", prof);

  const { data } = await query;
  const sessoes = (data ?? []) as unknown as Row[];

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-wine">Agenda</h1>
        <Link href={`/admin/agenda/nova?date=${day}`} className="rounded-lg bg-wine px-3 py-2 text-sm font-medium text-cream hover:bg-wine-light">
          + Agendar
        </Link>
      </div>

      <form className="flex flex-wrap items-center gap-2" action="/admin/agenda" method="get">
        <input name="date" type="date" defaultValue={day} className="rounded-lg border border-black/10 px-3 py-2" />
        <select name="prof" defaultValue={prof ?? ""} className="rounded-lg border border-black/10 px-3 py-2">
          <option value="">Todas as profissionais</option>
          {(profsList ?? []).map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
        </select>
        <button className="rounded-lg bg-dark px-3 py-2 text-sm text-cream">Ver</button>
      </form>

      <div className="space-y-2">
        {sessoes.length > 0 ? (
          sessoes.map((s) => {
            const nome = s.clients?.full_name ?? "—";
            const hora = new Date(s.scheduled_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit", minute: "2-digit", timeZone: "America/Manaus",
            });
            return (
              <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-dark">
                      <strong className="text-wine">{hora}</strong> · {nome}
                      {s.is_homecare && <span className="ml-2 rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700">🏠 Domicílio</span>}
                    </p>
                    <p className="text-xs text-muted">
                      {s.professionals?.full_name ?? "—"}{s.notes ? ` · ${s.notes}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <WhatsAppLink href={waLink(s.clients?.phone, wppTemplates.confirmacao(nome, hora))} label="Confirmar" />
                    <SessionStatusBadge status={s.status} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <QuickBtn id={s.id} date={day} status="realizada" label="✓ Presença" cls="bg-green-100 text-green-800 hover:bg-green-200" />
                  <QuickBtn id={s.id} date={day} status="falta" label="✗ Falta (cobra)" cls="bg-red-100 text-red-800 hover:bg-red-200" />
                  <QuickBtn id={s.id} date={day} status="falta" justificada label="Falta justificada" cls="bg-orange-50 text-orange-700 hover:bg-orange-100" />
                  <CourtesyBtn id={s.id} date={day} />
                  <QuickBtn id={s.id} date={day} status="agendada" label="Reabrir" cls="bg-gray-100 text-gray-700 hover:bg-gray-200" />
                </div>
              </div>
            );
          })
        ) : (
          <p className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-muted shadow-sm ring-1 ring-black/5">
            Nenhuma sessão neste dia.
          </p>
        )}
      </div>
    </div>
  );
}
