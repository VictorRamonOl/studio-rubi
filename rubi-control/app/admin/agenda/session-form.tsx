"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createSessionAction } from "./actions";
import type { SessionFormState } from "@/features/sessions/schema";

type Opt = { id: string; full_name: string };

const field =
  "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function SessionForm({
  clients,
  professionals,
  defaultDate,
}: {
  clients: Opt[];
  professionals: Opt[];
  defaultDate?: string;
}) {
  const [state, formAction, pending] = useActionState<SessionFormState, FormData>(
    createSessionAction,
    undefined,
  );
  const err = state?.fieldErrors;
  const defaultDateTime = defaultDate ? `${defaultDate}T08:00` : "";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="client_id">Cliente *</label>
        <select id="client_id" name="client_id" required className={field} defaultValue="">
          <option value="">Selecione...</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.full_name}</option>
          ))}
        </select>
        {err?.client_id && <p className="mt-1 text-xs text-red-600">{err.client_id[0]}</p>}
        <p className="mt-1 text-xs text-muted">O pacote ativo do cliente é vinculado automaticamente.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="scheduled_at">Data e horário *</label>
          <input id="scheduled_at" name="scheduled_at" type="datetime-local" defaultValue={defaultDateTime} required className={field} />
          {err?.scheduled_at && <p className="mt-1 text-xs text-red-600">{err.scheduled_at[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="duration_min">Duração (min)</label>
          <input id="duration_min" name="duration_min" type="number" min={10} max={240} defaultValue={50} className={field} />
        </div>
      </div>

      {professionals.length > 0 && (
        <div>
          <label className="block text-sm font-medium" htmlFor="professional_id">Profissional</label>
          <select id="professional_id" name="professional_id" className={field} defaultValue="">
            <option value="">—</option>
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>{p.full_name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium" htmlFor="notes">Observação <span className="text-muted">(o paciente vê)</span></label>
        <textarea id="notes" name="notes" rows={2} className={field} />
      </div>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-wine px-4 py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60">
          {pending ? "Agendando..." : "Agendar sessão"}
        </button>
        <Link href="/admin/agenda" className="text-sm text-muted hover:underline">Cancelar</Link>
      </div>
    </form>
  );
}
