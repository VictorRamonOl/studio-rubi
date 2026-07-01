import Link from "next/link";
import { ContentForm } from "../content-form";
import { createContentAction } from "../actions";

export default function NovoConteudoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link href="/admin/conteudos" className="text-sm text-muted hover:underline">← Conteúdos</Link>
      <h1 className="font-serif text-2xl text-wine">Escrever conteúdo</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <ContentForm action={createContentAction} submitLabel="Salvar" />
      </div>
    </div>
  );
}
