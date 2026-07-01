"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { generateSessionsForPackage } from "@/features/sessions/recurrence";

// Renova o pacote: cria um novo ciclo (saldo cheio, cortesias zeradas), gera a
// nova agenda e encerra o pacote antigo.
export async function renovarPacoteAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: old } = await supabase
    .from("packages")
    .select("client_id, package_type_id, professional_id, total_sessions, price, start_date, due_date, modality, capacity, weekdays, session_time, duration_min, courtesy_total")
    .eq("id", id)
    .maybeSingle();
  if (!old) return;

  // mesma duração do pacote anterior (ou 30 dias)
  const DAY = 86_400_000;
  let dur = 30;
  if (old.start_date && old.due_date) {
    const d = Math.round((Date.parse(old.due_date) - Date.parse(old.start_date)) / DAY);
    if (d > 0) dur = d;
  }
  const startStr = new Date(Date.now()).toISOString().slice(0, 10);
  const dueStr = new Date(Date.now() + dur * DAY).toISOString().slice(0, 10);

  const { data: novo, error } = await supabase
    .from("packages")
    .insert({
      client_id: old.client_id,
      package_type_id: old.package_type_id,
      professional_id: old.professional_id,
      total_sessions: old.total_sessions,
      price: old.price,
      start_date: startStr,
      due_date: dueStr,
      status: "ativo",
      modality: old.modality,
      capacity: old.capacity,
      weekdays: old.weekdays,
      session_time: old.session_time,
      duration_min: old.duration_min,
      courtesy_total: old.courtesy_total,
    })
    .select("id, client_id, professional_id, total_sessions, start_date, due_date, weekdays, session_time, duration_min, capacity")
    .single();

  if (error || !novo) return;

  if (novo.weekdays && novo.session_time && novo.professional_id) {
    await generateSessionsForPackage(supabase, {
      id: novo.id,
      client_id: novo.client_id,
      professional_id: novo.professional_id,
      total_sessions: novo.total_sessions,
      start_date: novo.start_date,
      due_date: novo.due_date,
      weekdays: novo.weekdays,
      session_time: novo.session_time,
      duration_min: novo.duration_min,
      capacity: novo.capacity,
      is_homecare: old.modality === "homecare",
    });
  }

  // encerra o antigo
  await supabase.from("packages").update({ status: "encerrado" }).eq("id", id);

  revalidatePath("/admin/pacotes");
  revalidatePath("/admin/agenda");
  revalidatePath(`/admin/clientes/${old.client_id}`);
}
