"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { hasVacancy } from "@/features/sessions/recurrence";

// Aprovar ou recusar um pedido de remarcação do paciente.
export async function resolveRescheduleAction(formData: FormData) {
  const admin = await requireAdmin();
  const requestId = String(formData.get("request_id") ?? "");
  const decision = String(formData.get("decision") ?? ""); // 'aprovar' | 'recusar'
  if (!requestId) return;

  const supabase = await createClient();
  const { data: req } = await supabase
    .from("reschedule_requests")
    .select("session_id, requested_for, status")
    .eq("id", requestId)
    .maybeSingle();
  if (!req || req.status !== "pendente") return;

  if (decision === "recusar") {
    await supabase
      .from("reschedule_requests")
      .update({ status: "recusada", resolved_by: admin.id, resolved_at: new Date().toISOString() })
      .eq("id", requestId);
    revalidatePath("/admin/dashboard");
    return;
  }

  // aprovar: tenta mover a sessão pro horário pedido se houver vaga
  const { data: sessao } = await supabase
    .from("sessions")
    .select("id, professional_id, package_id")
    .eq("id", req.session_id)
    .maybeSingle();

  let moved = false;
  if (sessao && req.requested_for && sessao.professional_id) {
    let capacity = 1;
    if (sessao.package_id) {
      const { data: pkg } = await supabase.from("packages").select("capacity").eq("id", sessao.package_id).maybeSingle();
      capacity = pkg?.capacity ?? 1;
    }
    const vaga = await hasVacancy(supabase, sessao.professional_id, req.requested_for, capacity);
    if (vaga) {
      await supabase
        .from("sessions")
        .update({ scheduled_at: req.requested_for, status: "agendada" })
        .eq("id", sessao.id);
      moved = true;
    }
  }

  // se não deu pra mover (sem horário pedido ou sem vaga), só libera a sessão
  if (!moved && sessao) {
    await supabase.from("sessions").update({ status: "remarcada" }).eq("id", sessao.id);
  }

  await supabase
    .from("reschedule_requests")
    .update({ status: "aprovada", resolved_by: admin.id, resolved_at: new Date().toISOString() })
    .eq("id", requestId);

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/agenda");
}
