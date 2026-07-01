import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PaymentForm } from "../payment-form";

export default async function NovoPagamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const { client } = await searchParams;
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, full_name").order("full_name").limit(500);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Link href="/admin/financeiro" className="text-sm text-muted hover:underline">← Financeiro</Link>
      <h1 className="font-serif text-2xl text-wine">Registrar pagamento</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <PaymentForm clients={clients ?? []} defaultClientId={client} />
      </div>
    </div>
  );
}
