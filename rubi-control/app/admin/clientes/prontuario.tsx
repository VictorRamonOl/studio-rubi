"use client";

import { useActionState } from "react";
import { saveAnamnesisAction, addEvolutionAction } from "./prontuario-actions";
import { ANAMNESIS_FIELDS, type AnamnesisFormState, type AnamnesisInput } from "@/features/anamnesis/schema";

type Evolution = { id: string; record_date: string; content: string };

const field =
  "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function Prontuario({
  clientId,
  anamnesis,
  evolutions,
}: {
  clientId: string;
  anamnesis: Partial<AnamnesisInput> | null;
  evolutions: Evolution[];
}) {
  const save = saveAnamnesisAction.bind(null, clientId);
  const [state, action, pending] = useActionState<AnamnesisFormState, FormData>(save, undefined);
  const addEvo = addEvolutionAction.bind(null, clientId);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Anamnese */}
      <details open className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <summary className="cursor-pointer list-none px-5 py-4 font-medium text-dark">
          📋 Anamnese / Ficha de saúde
          <span className="ml-2 text-xs font-normal text-muted">(só a equipe vê)</span>
        </summary>
        <form action={action} className="space-y-3 px-5 pb-5">
          {ANAMNESIS_FIELDS.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-medium">{f.label}</label>
              <textarea
                id={f.name}
                name={f.name}
                rows={2}
                defaultValue={(anamnesis?.[f.name] as string) ?? ""}
                placeholder={f.placeholder}
                className={field}
              />
            </div>
          ))}
          {state?.message && (
            <p className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.message}</p>
          )}
          <button disabled={pending} className="rounded-lg bg-wine px-4 py-2 text-sm font-medium text-cream hover:bg-wine-light disabled:opacity-60">
            {pending ? "Salvando..." : "Salvar anamnese"}
          </button>
        </form>
      </details>

      {/* Evolução */}
      <details open className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <summary className="cursor-pointer list-none px-5 py-4 font-medium text-dark">
          📈 Evolução do paciente
          <span className="ml-2 text-xs font-normal text-muted">({evolutions.length} registro{evolutions.length === 1 ? "" : "s"})</span>
        </summary>

        <div className="px-5 pb-5">
          <form action={addEvo} className="mb-4 space-y-2 rounded-xl bg-cream p-3">
            <div className="flex gap-2">
              <input type="date" name="record_date" defaultValue={today} className="rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
            </div>
            <textarea
              name="content"
              rows={2}
              required
              placeholder="Como foi a sessão / evolução do paciente hoje..."
              className={field}
            />
            <button className="rounded-lg bg-wine px-4 py-2 text-sm font-medium text-cream hover:bg-wine-light">
              + Adicionar evolução
            </button>
          </form>

          {evolutions.length > 0 ? (
            <ul className="space-y-2">
              {evolutions.map((e) => (
                <li key={e.id} className="rounded-xl border border-black/5 p-3">
                  <p className="text-xs font-medium text-wine">
                    {new Date(e.record_date).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-dark">{e.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Nenhuma evolução registrada ainda.</p>
          )}
        </div>
      </details>
    </div>
  );
}
