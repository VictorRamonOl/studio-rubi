"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import {
  SessionSchema,
  SESSION_STATUS,
  type SessionFormState,
  type SessionStatus,
} from "@/features/sessions/schema";

export async function createSessionAction(
  _prev: SessionFormState,
  formData: FormData,
): Promise<SessionFormState> {
  await requireAdmin();

  const parsed = SessionSchema.safeParse({
    client_id: formData.get("client_id") ?? "",
    package_id: formData.get("package_id") ?? "",
    professional_id: formData.get("professional_id") ?? "",
    scheduled_at: formData.get("scheduled_at") ?? "",
    duration_min: formData.get("duration_min") || 50,
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const d = parsed.data;
  const supabase = await createClient();

  // se não escolheu pacote, pega o pacote ativo do cliente automaticamente
  let packageId = d.package_id || null;
  if (!packageId) {
    const { data: pkg } = await supabase
      .from("packages")
      .select("id")
      .eq("client_id", d.client_id)
      .eq("status", "ativo")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    packageId = pkg?.id ?? null;
  }

  const { error } = await supabase.from("sessions").insert({
    client_id: d.client_id,
    package_id: packageId,
    professional_id: d.professional_id || null,
    scheduled_at: new Date(d.scheduled_at).toISOString(),
    duration_min: d.duration_min,
    notes: d.notes || null,
  });
  if (error) return { message: "Não foi possível agendar a sessão." };

  revalidatePath("/admin/agenda");
  redirect(`/admin/agenda?date=${d.scheduled_at.slice(0, 10)}`);
}

// Botão rápido na agenda: marca status. 'realizada'/'falta' acionam o
// trigger do banco que dá baixa/estorno no saldo do pacote.
export async function setSessionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const date = String(formData.get("date") ?? "");
  const justificada = formData.get("justificada") === "1";

  if (!id || !SESSION_STATUS.includes(status as SessionStatus)) return;

  const supabase = await createClient();
  // falta_justificada só vale pra falta; nos demais status volta pra false
  // (o trigger do banco usa isso pra decidir se cobra ou estorna a sessão).
  await supabase
    .from("sessions")
    .update({ status, falta_justificada: status === "falta" ? justificada : false })
    .eq("id", id);

  revalidatePath("/admin/agenda");
  if (date) revalidatePath(`/admin/agenda?date=${date}`);
}

// Remarcar usando CORTESIA: se o pacote ainda tem cortesia, marca 'remarcada'
// (não desconta sessão) e gasta 1 cortesia. Se acabou a cortesia, vira falta
// que cobra a sessão (regra: remarcação fora da cortesia = sessão dada).
export async function markCourtesyAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const date = String(formData.get("date") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: sessao } = await supabase
    .from("sessions")
    .select("package_id")
    .eq("id", id)
    .maybeSingle();

  let temCortesia = false;
  if (sessao?.package_id) {
    const { data: pkg } = await supabase
      .from("packages")
      .select("courtesy_total, courtesy_used")
      .eq("id", sessao.package_id)
      .maybeSingle();
    if (pkg && pkg.courtesy_used < pkg.courtesy_total) {
      temCortesia = true;
      await supabase
        .from("packages")
        .update({ courtesy_used: pkg.courtesy_used + 1 })
        .eq("id", sessao.package_id);
    }
  }

  await supabase
    .from("sessions")
    .update(
      temCortesia
        ? { status: "remarcada", falta_justificada: false }
        : { status: "falta", falta_justificada: false }, // sem cortesia → cobra
    )
    .eq("id", id);

  revalidatePath("/admin/agenda");
  if (date) revalidatePath(`/admin/agenda?date=${date}`);
}
