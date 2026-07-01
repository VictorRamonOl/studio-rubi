"use client";

import { useActionState } from "react";
import { requestRescheduleAction, type ReqState } from "./actions";

export function RescheduleForm({ sessionId }: { sessionId: string }) {
  const [state, action, pending] = useActionState<ReqState, FormData>(
    requestRescheduleAction,
    undefined,
  );

  if (state?.ok) {
    return <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">{state.message}</p>;
  }

  return (
    <details className="mt-2">
      <summary className="cursor-pointer text-xs text-wine">Pedir remarcação</summary>
      <form action={action} className="mt-2 space-y-2">
        <input type="hidden" name="session_id" value={sessionId} />
        <label className="block text-xs text-muted">Novo horário desejado (opcional)</label>
        <input type="datetime-local" name="requested_for" className="w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
        <textarea name="reason" rows={2} placeholder="Motivo (opcional)" className="w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
        {state?.message && <p className="text-xs text-red-600">{state.message}</p>}
        <button disabled={pending} className="rounded-lg bg-wine px-3 py-1.5 text-xs font-medium text-cream disabled:opacity-60">
          {pending ? "Enviando..." : "Enviar pedido"}
        </button>
      </form>
    </details>
  );
}
