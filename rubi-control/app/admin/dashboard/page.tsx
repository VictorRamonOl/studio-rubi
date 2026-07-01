import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { waLink, wppTemplates, brl } from "@/lib/whatsapp";
import { resolveRescheduleAction } from "./reschedule-actions";

type Cli = { full_name: string; phone: string | null } | null;

function Card({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 hover:ring-wine/30">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-serif text-3xl text-wine">{value}</p>
    </Link>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center justify-between gap-3 px-4 py-3">{children}</li>;
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const now = new Date();
  const startDay = new Date(now); startDay.setHours(0, 0, 0, 0);
  const endDay = new Date(now); endDay.setHours(23, 59, 59, 999);
  const in7 = new Date(now); in7.setDate(in7.getDate() + 7);
  const in7Str = in7.toISOString().slice(0, 10);

  const [
    { data: settings },
    { count: clientesAtivos },
    sessoesHoje,
    pacotesAlerta,
    pagamentosPend,
    remarcacoes,
    aniversariantesQ,
    ativosQ,
    recentesQ,
  ] = await Promise.all([
    supabase.from("settings").select("pix_key").eq("id", 1).maybeSingle(),
    supabase.from("clients").select("id", { count: "exact", head: true }).eq("status", "ativo"),
    supabase
      .from("sessions")
      .select("id, scheduled_at, status, clients(full_name, phone)")
      .gte("scheduled_at", startDay.toISOString())
      .lte("scheduled_at", endDay.toISOString())
      .in("status", ["agendada", "confirmada"])
      .order("scheduled_at", { ascending: true }),
    supabase
      .from("packages")
      .select("id, remaining_sessions, due_date, clients(full_name, phone)")
      .eq("status", "ativo")
      .or(`remaining_sessions.lte.2,due_date.lte.${in7Str}`)
      .limit(50),
    supabase
      .from("payments")
      .select("id, amount_due, clients(full_name, phone)")
      .in("status", ["pendente", "atrasado", "parcial"])
      .limit(50),
    supabase
      .from("reschedule_requests")
      .select("id, requested_for, reason, clients(full_name), sessions(scheduled_at)")
      .eq("status", "pendente")
      .order("created_at", { ascending: true })
      .limit(30),
    supabase.from("clients").select("id, full_name, phone, birth_date").not("birth_date", "is", null).limit(500),
    supabase.from("clients").select("id, full_name, phone, created_at").eq("status", "ativo").limit(500),
    supabase.from("sessions").select("client_id").gte("scheduled_at", new Date(now.getTime() - 21 * 86400000).toISOString()).limit(2000),
  ]);

  const pix = settings?.pix_key ?? null;
  const hoje = (sessoesHoje.data ?? []) as unknown as { id: string; scheduled_at: string; clients: Cli }[];
  const alerta = (pacotesAlerta.data ?? []) as unknown as { id: string; remaining_sessions: number; due_date: string | null; clients: Cli }[];
  const pend = (pagamentosPend.data ?? []) as unknown as { id: string; amount_due: number; clients: Cli }[];
  const remarc = (remarcacoes.data ?? []) as unknown as {
    id: string; requested_for: string | null; reason: string | null;
    clients: { full_name: string } | null; sessions: { scheduled_at: string } | null;
  }[];

  const fmtDt = (dt: string | null) =>
    dt ? new Date(dt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "America/Manaus" }) : "—";

  // aniversariantes do mês
  const mesAtual = now.getMonth() + 1;
  const aniversariantes = ((aniversariantesQ.data ?? []) as { id: string; full_name: string; phone: string | null; birth_date: string }[])
    .filter((c) => Number(c.birth_date.slice(5, 7)) === mesAtual)
    .sort((a, b) => a.birth_date.slice(8, 10).localeCompare(b.birth_date.slice(8, 10)));

  // clientes sumidos: ativos, cadastrados há +21 dias, sem sessão nos últimos 21 dias
  const recentesSet = new Set(((recentesQ.data ?? []) as { client_id: string }[]).map((s) => s.client_id));
  const corte21 = new Date(now.getTime() - 21 * 86400000);
  const sumidos = ((ativosQ.data ?? []) as { id: string; full_name: string; phone: string | null; created_at: string }[])
    .filter((c) => !recentesSet.has(c.id) && new Date(c.created_at) < corte21);

  return (
    <div className="space-y-6 pb-20">
      <h1 className="font-serif text-2xl text-wine">Painel de hoje</h1>

      {remarc.length > 0 && (
        <section>
          <h2 className="mb-2 font-medium text-dark">Pedidos de remarcação ({remarc.length})</h2>
          <div className="space-y-2">
            {remarc.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-amber-200">
                <p className="text-sm text-dark">
                  <strong>{r.clients?.full_name ?? "—"}</strong> pediu pra remarcar
                </p>
                <p className="text-xs text-muted">
                  De: {fmtDt(r.sessions?.scheduled_at ?? null)} → Para: {fmtDt(r.requested_for)}
                  {r.reason && ` · "${r.reason}"`}
                </p>
                <div className="mt-2 flex gap-2">
                  <form action={resolveRescheduleAction}>
                    <input type="hidden" name="request_id" value={r.id} />
                    <input type="hidden" name="decision" value="aprovar" />
                    <button className="rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-200">✓ Aprovar</button>
                  </form>
                  <form action={resolveRescheduleAction}>
                    <input type="hidden" name="request_id" value={r.id} />
                    <input type="hidden" name="decision" value="recusar" />
                    <button className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200">Recusar</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-3 gap-3">
        <Card label="Sessões hoje" value={String(hoje.length)} href="/admin/agenda" />
        <Card label="Pra renovar" value={String(alerta.length)} href="/admin/pacotes" />
        <Card label="A cobrar" value={String(pend.length)} href="/admin/financeiro" />
      </div>

      {/* SESSÕES DE HOJE */}
      <section>
        <h2 className="mb-2 font-medium text-dark">Sessões de hoje</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {hoje.length > 0 ? (
            <ul className="divide-y divide-black/5">
              {hoje.map((s) => {
                const nome = s.clients?.full_name ?? "—";
                const hora = new Date(s.scheduled_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                return (
                  <Row key={s.id}>
                    <span className="truncate text-sm"><strong className="text-wine">{hora}</strong> · {nome}</span>
                    <WhatsAppLink href={waLink(s.clients?.phone, wppTemplates.confirmacao(nome, hora))} label="Confirmar" />
                  </Row>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted">Nenhuma sessão hoje.</p>
          )}
        </div>
      </section>

      {/* PACOTES A VENCER / SALDO BAIXO */}
      <section>
        <h2 className="mb-2 font-medium text-dark">Pacotes pra renovar (vencendo ou com saldo baixo)</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {alerta.length > 0 ? (
            <ul className="divide-y divide-black/5">
              {alerta.map((p) => {
                const nome = p.clients?.full_name ?? "—";
                const vence = p.due_date ? new Date(p.due_date).toLocaleDateString("pt-BR") : null;
                return (
                  <Row key={p.id}>
                    <span className="truncate text-sm">
                      {nome} · <strong className={p.remaining_sessions <= 2 ? "text-red-600" : "text-wine"}>{p.remaining_sessions} sessões</strong>
                      {vence && <span className="text-muted"> · vence {vence}</span>}
                    </span>
                    <WhatsAppLink href={waLink(p.clients?.phone, wppTemplates.renovacao(nome, p.remaining_sessions, vence))} label="Renovar" />
                  </Row>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted">Nenhum pacote vencendo. 🎉</p>
          )}
        </div>
      </section>

      {/* PAGAMENTOS PENDENTES */}
      <section>
        <h2 className="mb-2 font-medium text-dark">A cobrar</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {pend.length > 0 ? (
            <ul className="divide-y divide-black/5">
              {pend.map((p) => {
                const nome = p.clients?.full_name ?? "—";
                const valor = brl(p.amount_due);
                return (
                  <Row key={p.id}>
                    <span className="truncate text-sm">{nome}{valor && <span className="text-muted"> · {valor}</span>}</span>
                    <WhatsAppLink href={waLink(p.clients?.phone, wppTemplates.cobranca(nome, valor, pix))} label="Cobrar" />
                  </Row>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted">Sem pendências. 🎉</p>
          )}
        </div>
      </section>

      {/* ANIVERSARIANTES DO MÊS */}
      {aniversariantes.length > 0 && (
        <section>
          <h2 className="mb-2 font-medium text-dark">🎂 Aniversariantes do mês</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <ul className="divide-y divide-black/5">
              {aniversariantes.map((c) => (
                <Row key={c.id}>
                  <span className="truncate text-sm">
                    <strong>{c.birth_date.slice(8, 10)}/{c.birth_date.slice(5, 7)}</strong> · {c.full_name}
                  </span>
                  <WhatsAppLink href={waLink(c.phone, wppTemplates.aniversario(c.full_name))} label="Parabenizar" />
                </Row>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CLIENTES SUMIDOS */}
      {sumidos.length > 0 && (
        <section>
          <h2 className="mb-2 font-medium text-dark">😴 Clientes sumidos (21+ dias sem vir)</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <ul className="divide-y divide-black/5">
              {sumidos.map((c) => (
                <Row key={c.id}>
                  <span className="truncate text-sm">{c.full_name}</span>
                  <WhatsAppLink href={waLink(c.phone, wppTemplates.reativacao(c.full_name))} label="Chamar de volta" />
                </Row>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
