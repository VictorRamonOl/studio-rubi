import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PackageForm } from "../package-form";

export default async function NovoPacotePage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const { client } = await searchParams;
  const supabase = await createClient();

  const [{ data: clients }, { data: types }, { data: professionals }] = await Promise.all([
    supabase.from("clients").select("id, full_name").order("full_name").limit(500),
    supabase.from("package_types").select("id, name, default_sessions, capacity, modality").eq("active", true),
    supabase.from("professionals").select("id, full_name").eq("active", true).order("full_name"),
  ]);

  return (
    <div className="mx-auto max-w-xl space-y-4 pb-20">
      <Link href="/admin/pacotes" className="text-sm text-muted hover:underline">← Pacotes</Link>
      <h1 className="font-serif text-2xl text-wine">Novo pacote</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <PackageForm
          clients={clients ?? []}
          types={types ?? []}
          professionals={professionals ?? []}
          defaultClientId={client}
        />
      </div>
    </div>
  );
}
