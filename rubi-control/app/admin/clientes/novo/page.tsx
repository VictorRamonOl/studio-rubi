import Link from "next/link";
import { ClientForm } from "../client-form";
import { createClientAction } from "../actions";

export default function NovoClientePage() {
  return (
    <div className="mx-auto max-w-xl space-y-4 pb-20">
      <Link href="/admin/clientes" className="text-sm text-muted hover:underline">← Clientes</Link>
      <h1 className="font-serif text-2xl text-wine">Novo cliente</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <ClientForm action={createClientAction} submitLabel="Cadastrar cliente" />
      </div>
    </div>
  );
}
