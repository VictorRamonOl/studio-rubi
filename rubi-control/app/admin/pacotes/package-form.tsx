"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createPackageAction } from "./actions";
import { WEEKDAYS, type PackageFormState } from "@/features/packages/schema";

type Opt = { id: string; full_name: string };
type TypeOpt = { id: string; name: string; default_sessions: number | null; capacity: number; modality: string };

const field =
  "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function PackageForm({
  clients,
  types,
  professionals,
  defaultClientId,
}: {
  clients: Opt[];
  types: TypeOpt[];
  professionals: Opt[];
  defaultClientId?: string;
}) {
  const [state, formAction, pending] = useActionState<PackageFormState, FormData>(
    createPackageAction,
    undefined,
  );
  const err = state?.fieldErrors;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="client_id">Cliente *</label>
        <select id="client_id" name="client_id" defaultValue={defaultClientId ?? ""} required className={field}>
          <option value="">Selecione...</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
        </select>
        {err?.client_id && <p className="mt-1 text-xs text-red-600">{err.client_id[0]}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="package_type_id">Tipo de pacote</label>
          <select id="package_type_id" name="package_type_id" defaultValue="" className={field}>
            <option value="">Avulso (individual)</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name} · até {t.capacity}/horário</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted">Define a capacidade do horário (grupo até 3, resto 1).</p>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="professional_id">Profissional *</label>
          <select id="professional_id" name="professional_id" required className={field} defaultValue="">
            <option value="">Selecione...</option>
            {professionals.map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
          </select>
          {err?.professional_id && <p className="mt-1 text-xs text-red-600">{err.professional_id[0]}</p>}
        </div>
      </div>

      {/* Recorrência */}
      <div className="rounded-xl bg-cream p-3">
        <p className="mb-2 text-sm font-medium text-dark">Agenda recorrente</p>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((w) => (
            <label key={w.code} className="flex cursor-pointer items-center gap-1 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm has-[:checked]:border-wine has-[:checked]:bg-wine has-[:checked]:text-cream">
              <input type="checkbox" name="weekdays" value={w.code} className="sr-only" />
              {w.label}
            </label>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="session_time">Horário</label>
            <input id="session_time" name="session_time" type="time" className={field} />
            {err?.session_time && <p className="mt-1 text-xs text-red-600">{err.session_time[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="duration_min">Duração (min)</label>
            <input id="duration_min" name="duration_min" type="number" min={10} max={240} defaultValue={50} className={field} />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">Escolha os dias + horário → o app cria as sessões sozinho (até acabar as sessões ou vencer).</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="total_sessions">Total de sessões *</label>
          <input id="total_sessions" name="total_sessions" type="number" min={1} defaultValue={8} required className={field} />
          {err?.total_sessions && <p className="mt-1 text-xs text-red-600">{err.total_sessions[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="courtesy_total">Cortesias (remarcação grátis)</label>
          <select id="courtesy_total" name="courtesy_total" defaultValue="1" className={field}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="price">Valor (R$)</label>
          <input id="price" name="price" type="number" step="0.01" min={0} className={field} placeholder="0,00" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="start_date">Início *</label>
          <input id="start_date" name="start_date" type="date" defaultValue={today} required className={field} />
          {err?.start_date && <p className="mt-1 text-xs text-red-600">{err.start_date[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 items-end gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="due_date">Vencimento</label>
          <input id="due_date" name="due_date" type="date" className={field} />
          <p className="mt-1 text-xs text-muted">Vazio = início + 30 dias.</p>
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input name="auto_renew" type="checkbox" className="h-4 w-4" />
          Renovação automática
        </label>
      </div>

      <input type="hidden" name="status" value="ativo" />

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-wine px-4 py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60">
          {pending ? "Criando e gerando agenda..." : "Criar pacote + agenda"}
        </button>
        <Link href="/admin/pacotes" className="text-sm text-muted hover:underline">Cancelar</Link>
      </div>
    </form>
  );
}
