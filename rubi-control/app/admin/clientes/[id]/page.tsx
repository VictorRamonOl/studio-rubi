import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientForm } from "../client-form";
import { Prontuario } from "../prontuario";
import { ClientAccess } from "../client-access";
import { DonutChart } from "@/components/charts/donut-chart";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { waLink, wppTemplates } from "@/lib/whatsapp";
import { updateClientAction } from "../actions";

export default async function ClienteDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clients")
    .select("id, full_name, phone, email, birth_date, status, profile_id")
    .eq("id", id)
    .maybeSingle();

  if (!cliente) notFound();

  // tabela admin-only — observações internas
  const { data: priv } = await supabase
    .from("client_private")
    .select("internal_notes")
    .eq("client_id", id)
    .maybeSingle();

  // pacote ativo + saldo (visão rápida)
  const { data: pacote } = await supabase
    .from("packages")
    .select("remaining_sessions, total_sessions, due_date")
    .eq("client_id", id)
    .eq("status", "ativo")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // prontuário: anamnese + evolução (tabelas staff-only)
  const [{ data: anamnesis }, { data: evolutions }, { data: sessoesStat }] = await Promise.all([
    supabase.from("anamnesis").select("*").eq("client_id", id).maybeSingle(),
    supabase
      .from("evolution_records")
      .select("id, record_date, content")
      .eq("client_id", id)
      .order("record_date", { ascending: false })
      .limit(50),
    supabase.from("sessions").select("status").eq("client_id", id).limit(500),
  ]);

  const conta = (st: string) => (sessoesStat ?? []).filter((s) => s.status === st).length;
  const freqData = [
    { name: "Realizadas", value: conta("realizada"), color: "#16a34a" },
    { name: "Faltas", value: conta("falta"), color: "#dc2626" },
    { name: "Remarcadas", value: conta("remarcada"), color: "#f59e0b" },
    { name: "Agendadas", value: conta("agendada") + conta("confirmada"), color: "#681D31" },
  ].filter((d) => d.value > 0);

  const action = updateClientAction.bind(null, id);

  return (
    <div className="mx-auto max-w-xl space-y-4 pb-20">
      <Link href="/admin/clientes" className="text-sm text-muted hover:underline">← Clientes</Link>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-serif text-2xl text-wine">{cliente.full_name}</h1>
        <div className="flex gap-2">
          <WhatsAppLink href={waLink(cliente.phone, "")} label="Conversar" />
          <WhatsAppLink href={waLink(cliente.phone, wppTemplates.agradecimento(cliente.full_name))} label="Incentivar" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <p className="text-xs uppercase tracking-wide text-muted">Pacote ativo</p>
        {pacote ? (
          <p className="mt-1 text-dark">
            <strong className="text-wine">{pacote.remaining_sessions}</strong> / {pacote.total_sessions} sessões
            {pacote.due_date && ` · vence ${new Date(pacote.due_date).toLocaleDateString("pt-BR")}`}
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">Sem pacote ativo.</p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="mb-4 font-medium text-dark">Editar dados</h2>
        <ClientForm
          action={action}
          submitLabel="Salvar alterações"
          initial={{
            full_name: cliente.full_name,
            phone: cliente.phone,
            email: cliente.email,
            birth_date: cliente.birth_date,
            status: cliente.status,
            internal_notes: priv?.internal_notes ?? "",
          }}
        />
      </div>

      {freqData.length > 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-2 font-medium text-dark">Frequência</h2>
          <DonutChart data={freqData} />
        </div>
      )}

      <ClientAccess
        clientId={id}
        hasAccess={!!cliente.profile_id}
        clientName={cliente.full_name}
        email={cliente.email}
        phone={cliente.phone}
      />

      <Prontuario clientId={id} anamnesis={anamnesis ?? null} evolutions={evolutions ?? []} />
    </div>
  );
}
