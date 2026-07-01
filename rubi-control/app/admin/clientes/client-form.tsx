"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CLIENT_STATUS, type ClientFormState } from "@/features/clients/schema";

type Initial = {
  full_name?: string | null;
  phone?: string | null;
  email?: string | null;
  birth_date?: string | null;
  status?: string | null;
  internal_notes?: string | null;
};

const field =
  "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function ClientForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: ClientFormState, formData: FormData) => Promise<ClientFormState>;
  initial?: Initial;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ClientFormState, FormData>(
    action,
    undefined,
  );
  const err = state?.fieldErrors;

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="full_name">Nome completo *</label>
        <input id="full_name" name="full_name" defaultValue={initial?.full_name ?? ""} required className={field} />
        {err?.full_name && <p className="mt-1 text-xs text-red-600">{err.full_name[0]}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="phone">Telefone / WhatsApp</label>
          <input id="phone" name="phone" defaultValue={initial?.phone ?? ""} className={field} placeholder="(92) 90000-0000" />
          {err?.phone && <p className="mt-1 text-xs text-red-600">{err.phone[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" defaultValue={initial?.email ?? ""} className={field} />
          {err?.email && <p className="mt-1 text-xs text-red-600">{err.email[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="birth_date">Nascimento</label>
          <input id="birth_date" name="birth_date" type="date" defaultValue={initial?.birth_date ?? ""} className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={initial?.status ?? "ativo"} className={field}>
            {CLIENT_STATUS.map((s) => (
              <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="internal_notes">
          Observações internas <span className="text-muted">(o paciente não vê)</span>
        </label>
        <textarea id="internal_notes" name="internal_notes" rows={3} defaultValue={initial?.internal_notes ?? ""} className={field} />
      </div>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-wine px-4 py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60">
          {pending ? "Salvando..." : submitLabel}
        </button>
        <Link href="/admin/clientes" className="text-sm text-muted hover:underline">Cancelar</Link>
      </div>
    </form>
  );
}
