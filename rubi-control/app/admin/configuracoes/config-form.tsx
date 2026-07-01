"use client";

import { useActionState } from "react";
import { updateSettingsAction, type SettingsState } from "./actions";

type S = {
  studio_name?: string | null;
  pix_key?: string | null;
  whatsapp_number?: string | null;
  falta_consome_sessao?: boolean | null;
  janela_remarcacao_horas?: number | null;
  lembrete_horas_antes?: number | null;
};

const field = "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function ConfigForm({ settings }: { settings: S }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(updateSettingsAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="studio_name">Nome do estúdio</label>
        <input id="studio_name" name="studio_name" defaultValue={settings.studio_name ?? "Studio Rubi"} className={field} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="pix_key">Chave Pix</label>
          <input id="pix_key" name="pix_key" defaultValue={settings.pix_key ?? ""} className={field} placeholder="CPF, telefone, e-mail ou aleatória" />
          <p className="mt-1 text-xs text-muted">Entra automático na mensagem de cobrança.</p>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="whatsapp_number">WhatsApp do estúdio</label>
          <input id="whatsapp_number" name="whatsapp_number" defaultValue={settings.whatsapp_number ?? ""} className={field} placeholder="(92) 90000-0000" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="janela_remarcacao_horas">Antecedência p/ remarcar (horas)</label>
          <input id="janela_remarcacao_horas" name="janela_remarcacao_horas" type="number" min={0} defaultValue={settings.janela_remarcacao_horas ?? 24} className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="lembrete_horas_antes">Lembrete quantas horas antes</label>
          <input id="lembrete_horas_antes" name="lembrete_horas_antes" type="number" min={0} defaultValue={settings.lembrete_horas_antes ?? 24} className={field} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="falta_consome_sessao" defaultChecked={settings.falta_consome_sessao ?? false} className="h-4 w-4" />
        Falta (mesmo justificada por padrão) desconta sessão
      </label>

      {state?.message && (
        <p className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.message}</p>
      )}
      <button disabled={pending} className="rounded-lg bg-wine px-4 py-2 text-sm font-medium text-cream hover:bg-wine-light disabled:opacity-60">
        {pending ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}
