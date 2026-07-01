"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { AnamnesisSchema, type AnamnesisFormState } from "@/features/anamnesis/schema";

export async function saveAnamnesisAction(
  clientId: string,
  _prev: AnamnesisFormState,
  formData: FormData,
): Promise<AnamnesisFormState> {
  const admin = await requireAdmin();

  const parsed = AnamnesisSchema.safeParse({
    main_complaint: formData.get("main_complaint") ?? "",
    objectives: formData.get("objectives") ?? "",
    medical_history: formData.get("medical_history") ?? "",
    surgeries: formData.get("surgeries") ?? "",
    medications: formData.get("medications") ?? "",
    injuries: formData.get("injuries") ?? "",
    physical_activity: formData.get("physical_activity") ?? "",
    contraindications: formData.get("contraindications") ?? "",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) return { message: "Verifique os campos." };

  const row = Object.fromEntries(
    Object.entries(parsed.data).map(([k, v]) => [k, v === "" ? null : v]),
  );

  const supabase = await createClient();
  const { error } = await supabase
    .from("anamnesis")
    .upsert({ client_id: clientId, updated_by: admin.id, ...row }, { onConflict: "client_id" });

  if (error) return { message: "Não foi possível salvar a anamnese." };

  revalidatePath(`/admin/clientes/${clientId}`);
  return { ok: true, message: "Anamnese salva." };
}

// Adiciona uma entrada de evolução (data + texto). Append-only no histórico.
export async function addEvolutionAction(clientId: string, formData: FormData) {
  const admin = await requireAdmin();
  const content = String(formData.get("content") ?? "").trim();
  const record_date = String(formData.get("record_date") ?? "") || new Date().toISOString().slice(0, 10);
  if (!content) return;

  const supabase = await createClient();
  await supabase.from("evolution_records").insert({
    client_id: clientId,
    record_date,
    content,
    professional_id: null,
  });
  void admin;
  revalidatePath(`/admin/clientes/${clientId}`);
}
