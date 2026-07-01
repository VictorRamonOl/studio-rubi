import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BarChartCard } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { waLink, wppTemplates, brl } from "@/lib/whatsapp";
import { markPaidAction } from "./actions";
import { PAYMENT_STATUS, STATUS_CLS, STATUS_LABEL, type PaymentStatus } from "@/features/payments/schema";

type Pay = {
  id: string;
  amount_due: number;
  amount_paid: number;
  status: PaymentStatus;
  paid_at: string | null;
  due_date: string | null;
  clients: { full_name: string; phone: string | null } | null;
};

const STATUS_COLOR: Record<PaymentStatus, string> = {
  pago: "#16a34a", pendente: "#d97706", parcial: "#f59e0b", atrasado: "#dc2626", estornado: "#9ca3af",
};

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-serif text-2xl ${tone ?? "text-wine"}`}>{value}</p>
    </div>
  );
}

export default async function FinanceiroPage() {
  const supabase = await createClient();
  const since = new Date();
  since.setMonth(since.getMonth() - 5);
  since.setDate(1);

  const { data } = await supabase
    .from("payments")
    .select("id, amount_due, amount_paid, status, paid_at, due_date, clients(full_name, phone)")
    .order("created_at", { ascending: false })
    .limit(300);

  const pagamentos = (data ?? []) as unknown as Pay[];

  // meses (últimos 6)
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("pt-BR", { month: "short" }) };
  });
  const receitaMes: Record<string, number> = {};
  for (const p of pagamentos) {
    if (p.paid_at) {
      const k = p.paid_at.slice(0, 7);
      receitaMes[k] = (receitaMes[k] ?? 0) + Number(p.amount_paid || 0);
    }
  }
  const revenueData = months.map((m) => ({ label: m.label, value: receitaMes[m.key] ?? 0 }));

  const mesAtualKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const receitaAtual = receitaMes[mesAtualKey] ?? 0;
  const aReceber = pagamentos
    .filter((p) => ["pendente", "parcial", "atrasado"].includes(p.status))
    .reduce((s, p) => s + (Number(p.amount_due) - Number(p.amount_paid)), 0);

  const statusData = PAYMENT_STATUS.map((st) => ({
    name: STATUS_LABEL[st],
    value: pagamentos.filter((p) => p.status === st).length,
    color: STATUS_COLOR[st],
  })).filter((s) => s.value > 0);

  const pendentes = pagamentos.filter((p) => ["pendente", "parcial", "atrasado"].includes(p.status));

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-wine">Financeiro</h1>
        <Link href="/admin/financeiro/novo" className="rounded-lg bg-wine px-3 py-2 text-sm font-medium text-cream hover:bg-wine-light">
          + Pagamento
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric label="Receita do mês" value={brl(receitaAtual) ?? "R$ 0,00"} tone="text-green-700" />
        <Metric label="A receber" value={brl(aReceber) ?? "R$ 0,00"} tone="text-red-600" />
        <Metric label="Pendências" value={String(pendentes.length)} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:col-span-2">
          <p className="mb-2 text-sm font-medium text-dark">Receita dos últimos 6 meses</p>
          <BarChartCard data={revenueData} color="#681D31" brl />
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <p className="mb-2 text-sm font-medium text-dark">Status dos pagamentos</p>
          <DonutChart data={statusData} />
        </div>
      </div>

      <section>
        <h2 className="mb-2 font-medium text-dark">A cobrar</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {pendentes.length > 0 ? (
            <ul className="divide-y divide-black/5">
              {pendentes.map((p) => {
                const nome = p.clients?.full_name ?? "—";
                const falta = Number(p.amount_due) - Number(p.amount_paid);
                return (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-dark">{nome}</p>
                      <p className="text-xs text-muted">
                        {brl(falta)}
                        {p.due_date && ` · vence ${new Date(p.due_date).toLocaleDateString("pt-BR")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[p.status]}`}>{STATUS_LABEL[p.status]}</span>
                      <WhatsAppLink href={waLink(p.clients?.phone, wppTemplates.cobranca(nome, brl(falta), null))} label="Cobrar" />
                      <form action={markPaidAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 hover:bg-green-200">✓ Pago</button>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-muted">Nenhuma pendência. 🎉</p>
          )}
        </div>
      </section>
    </div>
  );
}
