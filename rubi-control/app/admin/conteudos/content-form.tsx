"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AUDIENCE, AUDIENCE_LABEL, type ContentFormState } from "@/features/content/schema";

type Initial = {
  title?: string; excerpt?: string | null; body?: string | null;
  cover_url?: string | null; audience?: string | null; published?: boolean | null;
};
const field = "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-wine focus:ring-1 focus:ring-wine";

export function ContentForm({
  action,
  initial,
  submitLabel,
}: {
  action: (s: ContentFormState, f: FormData) => Promise<ContentFormState>;
  initial?: Initial;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(action, undefined);
  const err = state?.fieldErrors;

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="title">Título *</label>
        <input id="title" name="title" defaultValue={initial?.title ?? ""} required className={field} />
        {err?.title && <p className="mt-1 text-xs text-red-600">{err.title[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="audience">Onde publica</label>
        <select id="audience" name="audience" defaultValue={initial?.audience ?? "public"} className={field}>
          {AUDIENCE.map((a) => <option key={a} value={a}>{AUDIENCE_LABEL[a]}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="excerpt">Resumo (aparece na lista)</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={initial?.excerpt ?? ""} className={field} />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="cover_url">Imagem de capa (URL, opcional)</label>
        <input id="cover_url" name="cover_url" defaultValue={initial?.cover_url ?? ""} className={field} placeholder="https://..." />
        {err?.cover_url && <p className="mt-1 text-xs text-red-600">{err.cover_url[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="body">Texto do post</label>
        <textarea id="body" name="body" rows={10} defaultValue={initial?.body ?? ""} className={field} placeholder="Escreva o conteúdo aqui..." />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={initial?.published ?? false} className="h-4 w-4" />
        Publicar agora
      </label>

      {state?.message && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-wine px-4 py-2.5 font-medium text-cream hover:bg-wine-light disabled:opacity-60">
          {pending ? "Salvando..." : submitLabel}
        </button>
        <Link href="/admin/conteudos" className="text-sm text-muted hover:underline">Cancelar</Link>
      </div>
    </form>
  );
}
