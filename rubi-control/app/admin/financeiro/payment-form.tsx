"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createPaymentAction } from "./actions";
import { PAYMENT_METHOD, PAYMENT_STATUS, STATUS_LABEL, type PaymentFormState } from "@/features/payments/schema";

type Opt = { id: string; full_name: string };
const field = "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";
const METHOD_LABEL: Record<string, string> = { pix: "Pix", dinheiro: "Dinheiro", cartao: "Cartão", transferencia: "Transferência", link: "Link" };

export function PaymentForm({ clients, defaultClientId }: { clients: Opt[]; defaultClientId?: string }) {
  const [state, action, pending] = useActionState<PaymentFormState, FormData>(createPaymentAction, undefined);
  const err = state?.fieldErrors;

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="client_id">Cliente *</label>
        <select id="client_id" name="client_id" defaultValue={defaultClientId ?? ""} required className={field}>
          <option value="">Selecione...</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
        </select>
        {err?.client_id && <p className="mt-1 text-xs text-red-600">{err.client_id[0]}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="amount_due">Valor (R$) *</label>
          <input id="amount_due" name="amount_due" type="number" step="0.01" min={0} required className={field} placeholder="0,00" />
          {err?.amount_due && <p className="mt-1 text-xs text-red-600">{err.amount_due[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="amount_paid">Valor pago (R$)</label>
          <input id="amount_paid" name="amount_paid" type="number" step="0.01" min={0} className={field} placeholder="0,00" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="pendente" className={field}>
            {PAYMENT_STATUS.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="method">Forma</label>
          <select id="method" name="method" defaultValue="" className={field}>
            <option value="">—</option>
            {PAYMENT_METHOD.map((m) => <option key={m} value={m}>{METHOD_LABEL[m]}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="due_date">Vencimento</label>
        <input id="due_date" name="due_date" type="date" className={field} />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="notes">Observação</label>
        <input id="notes" name="notes" className={field} />
      </div>

      {state?.message && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-wine px-4 py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60">
          {pending ? "Salvando..." : "Registrar pagamento"}
        </button>
        <Link href="/admin/financeiro" className="text-sm text-muted hover:underline">Cancelar</Link>
      </div>
    </form>
  );
}
