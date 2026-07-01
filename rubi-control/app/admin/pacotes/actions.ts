"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PackageSchema, type PackageFormState } from "@/features/packages/schema";
import { generateSessionsForPackage } from "@/features/sessions/recurrence";

function addDaysStr(dateStr: string, days: number): string {
  const ms = Date.parse(dateStr + "T00:00:00Z") + days * 86_400_000;
  return new Date(ms).toISOString().slice(0, 10);
}

export async function createPackageAction(
  _prev: PackageFormState,
  formData: FormData,
): Promise<PackageFormState> {
  await requireAdmin();

  const parsed = PackageSchema.safeParse({
    client_id: formData.get("client_id") ?? "",
    package_type_id: formData.get("package_type_id") ?? "",
    professional_id: formData.get("professional_id") ?? "",
    total_sessions: formData.get("total_sessions") ?? "",
    price: formData.get("price") || undefined,
    start_date: formData.get("start_date") ?? "",
    due_date: formData.get("due_date") ?? "",
    weekdays: formData.getAll("weekdays").map(String),
    session_time: formData.get("session_time") ?? "",
    duration_min: formData.get("duration_min") || 50,
    courtesy_total: formData.get("courtesy_total") ?? 1,
    status: formData.get("status") ?? "ativo",
    auto_renew: formData.get("auto_renew") === "on",
  });
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const d = parsed.data;
  const supabase = await createClient();

  // modalidade + capacidade vêm do tipo de pacote (ou padrão individual)
  let modality = "individual";
  let capacity = 1;
  if (d.package_type_id) {
    const { data: tipo } = await supabase
      .from("package_types")
      .select("modality, capacity")
      .eq("id", d.package_type_id)
      .maybeSingle();
    if (tipo) {
      modality = tipo.modality ?? "individual";
      capacity = tipo.capacity ?? 1;
    }
  }

  // vencimento: usa o informado ou início + 30 dias
  const due_date = d.due_date || addDaysStr(d.start_date, 30);

  const { data: created, error } = await supabase
    .from("packages")
    .insert({
      client_id: d.client_id,
      package_type_id: d.package_type_id || null,
      professional_id: d.professional_id,
      total_sessions: d.total_sessions,
      price: d.price ?? null,
      start_date: d.start_date,
      due_date,
      status: d.status,
      auto_renew: d.auto_renew ?? false,
      modality,
      capacity,
      weekdays: d.weekdays.length ? d.weekdays : null,
      session_time: d.session_time || null,
      duration_min: d.duration_min,
      courtesy_total: d.courtesy_total,
    })
    .select("id, client_id, professional_id, total_sessions, start_date, due_date, weekdays, session_time, duration_min, capacity")
    .single();

  if (error || !created) {
    return { message: "Não foi possível criar o pacote." };
  }

  // gera a agenda recorrente automaticamente (respeitando capacidade do horário)
  if (created.weekdays && created.session_time && created.professional_id) {
    await generateSessionsForPackage(supabase, {
      id: created.id,
      client_id: created.client_id,
      professional_id: created.professional_id,
      total_sessions: created.total_sessions,
      start_date: created.start_date,
      due_date: created.due_date,
      weekdays: created.weekdays,
      session_time: created.session_time,
      duration_min: created.duration_min,
      capacity: created.capacity,
      is_homecare: modality === "homecare",
    });
  }

  revalidatePath("/admin/pacotes");
  revalidatePath("/admin/agenda");
  revalidatePath(`/admin/clientes/${created.client_id}`);
  redirect("/admin/pacotes");
}
