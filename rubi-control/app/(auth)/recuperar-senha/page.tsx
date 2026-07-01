"use client";

import Link from "next/link";
import { useActionState } from "react";
import { recuperarSenhaAction } from "../actions";

export default function RecuperarSenhaPage() {
  const [state, action, pending] = useActionState(recuperarSenhaAction, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-serif text-2xl text-wine">Recuperar senha</h1>
        <form action={action} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <input
            name="email"
            type="email"
            required
            placeholder="Seu e-mail"
            className="w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine"
          />
          {state?.message && (
            <p className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}>
              {state.message}
            </p>
          )}
          <button
            disabled={pending}
            className="w-full rounded-lg bg-wine py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60"
          >
            {pending ? "Enviando..." : "Enviar instruções"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/login" className="text-wine hover:underline">Voltar ao login</Link>
        </p>
      </div>
    </main>
  );
}
