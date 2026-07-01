import { createClient } from "@/lib/supabase/server";
import { ConfigForm } from "./config-form";
import { addProfessionalAction, updateProfessionalAction } from "./actions";

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: profs }] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("professionals").select("id, full_name, specialty, active").order("full_name"),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-serif text-2xl text-wine">Configurações</h1>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-4 font-medium text-dark">Estúdio</h2>
        <ConfigForm settings={settings ?? {}} />
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-4 font-medium text-dark">Profissionais</h2>

        <ul className="mb-4 space-y-2">
          {(profs ?? []).map((p) => (
            <li key={p.id}>
              <form action={updateProfessionalAction} className="flex flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={p.id} />
                <input name="full_name" defaultValue={p.full_name} className="flex-1 rounded-lg border border-black/10 px-3 py-1.5 text-sm" />
                <label className="flex items-center gap-1 text-xs text-muted">
                  <input type="checkbox" name="active" defaultChecked={p.active} className="h-4 w-4" /> ativa
                </label>
                <button className="rounded-md bg-cream px-3 py-1.5 text-xs font-medium text-wine hover:bg-gold-light">Salvar</button>
              </form>
            </li>
          ))}
        </ul>

        <form action={addProfessionalAction} className="flex flex-wrap items-center gap-2 border-t border-black/5 pt-4">
          <input name="full_name" placeholder="Nome da nova profissional" required className="flex-1 rounded-lg border border-black/10 px-3 py-1.5 text-sm" />
          <input name="specialty" placeholder="Especialidade" className="w-40 rounded-lg border border-black/10 px-3 py-1.5 text-sm" />
          <button className="rounded-md bg-wine px-3 py-1.5 text-xs font-medium text-cream hover:bg-wine-light">+ Adicionar</button>
        </form>
      </section>
    </div>
  );
}
