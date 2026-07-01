"use client";

import { useActionState } from "react";
import { createClientAccessAction, type AccessState } from "./access-actions";
import { waLink, wppTemplates } from "@/lib/whatsapp";

export function ClientAccess({
  clientId,
  hasAccess,
  clientName,
  email,
  phone,
}: {
  clientId: string;
  hasAccess: boolean;
  clientName: string;
  email: string | null;
  phone: string | null;
}) {
  const action = createClientAccessAction.bind(null, clientId);
  const [state, formAction, pending] = useActionState<AccessState, FormData>(action, undefined);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  // acabou de criar: mostra a senha + botão de enviar pelo WhatsApp
  if (state?.ok && state.password && state.email) {
    const msg = wppTemplates.acesso(clientName, appUrl, state.email, state.password);
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-green-200">
        <p className="font-medium text-green-700">✅ Acesso criado!</p>
        <div className="mt-2 rounded-lg bg-cream p-3 text-sm">
          <p><span className="text-muted">E-mail:</span> {state.email}</p>
          <p><span className="text-muted">Senha:</span> <strong className="font-mono">{state.password}</strong></p>
        </div>
        <p className="mt-2 text-xs text-muted">Anote ou envie agora — a senha não aparece de novo.</p>
        <a
          href={waLink(phone, msg) ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:brightness-95"
        >
          📲 Enviar acesso pelo WhatsApp
        </a>
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <p className="text-sm text-green-700">✅ Este paciente já tem acesso ao app.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="mb-1 font-medium text-dark">Acesso do paciente</p>
      <p className="mb-3 text-sm text-muted">
        Cria o login pra o paciente acompanhar pacote, sessões e pedir remarcação pelo celular.
      </p>
      {state?.message && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}
      <button
        disabled={pending || !email}
        className="rounded-lg bg-wine px-4 py-2 text-sm font-medium text-cream hover:bg-wine-light disabled:opacity-60"
      >
        {pending ? "Criando..." : "Criar acesso do paciente"}
      </button>
      {!email && <p className="mt-2 text-xs text-amber-700">Cadastre o e-mail do cliente acima primeiro.</p>}
    </form>
  );
}
