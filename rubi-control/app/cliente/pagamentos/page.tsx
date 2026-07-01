import { createClient } from "@/lib/supabase/server";
import { brl } from "@/lib/whatsapp";

const STATUS_CLS: Record<string, string> = {
  pago: "bg-green-100 text-green-800",
  pendente: "bg-amber-100 text-amber-800",
  parcial: "bg-amber-100 text-amber-800",
  atrasado: "bg-red-100 text-red-800",
  estornado: "bg-gray-100 text-gray-600",
};

export default async function MeusPagamentosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("id, amount_due, amount_paid, status, due_date, paid_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const pagamentos = data ?? [];

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-wine">Meus pagamentos</h1>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {pagamentos.length > 0 ? (
          <ul className="divide-y divide-black/5">
            {pagamentos.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-dark">{brl(p.amount_due)}</p>
                  <p className="text-xs text-muted">
                    {p.paid_at
                      ? `Pago em ${new Date(p.paid_at).toLocaleDateString("pt-BR")}`
                      : p.due_date
                        ? `Vence ${new Date(p.due_date).toLocaleDateString("pt-BR")}`
                        : ""}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[p.status] ?? "bg-gray-100 text-gray-600"}`}>
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted">Nenhum pagamento registrado.</p>
        )}
      </div>
    </div>
  );
}
