import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SessionForm } from "../session-form";

export default async function NovaSessaoPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const supabase = await createClient();

  const [{ data: clients }, { data: professionals }] = await Promise.all([
    supabase.from("clients").select("id, full_name").eq("status", "ativo").order("full_name").limit(500),
    supabase.from("professionals").select("id, full_name").eq("active", true).order("full_name"),
  ]);

  return (
    <div className="mx-auto max-w-xl space-y-4 pb-20">
      <Link href="/admin/agenda" className="text-sm text-muted hover:underline">← Agenda</Link>
      <h1 className="font-serif text-2xl text-wine">Agendar sessão</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <SessionForm clients={clients ?? []} professionals={professionals ?? []} defaultDate={date} />
      </div>
    </div>
  );
}
