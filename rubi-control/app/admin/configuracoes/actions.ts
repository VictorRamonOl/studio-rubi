"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type SettingsState = { ok?: boolean; message?: string } | undefined;

export async function updateSettingsAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("settings")
    .update({
      studio_name: String(formData.get("studio_name") ?? "Studio Rubi").trim() || "Studio Rubi",
      pix_key: String(formData.get("pix_key") ?? "").trim() || null,
      whatsapp_number: String(formData.get("whatsapp_number") ?? "").trim() || null,
      falta_consome_sessao: formData.get("falta_consome_sessao") === "on",
      janela_remarcacao_horas: Number(formData.get("janela_remarcacao_horas") || 24),
      lembrete_horas_antes: Number(formData.get("lembrete_horas_antes") || 24),
    })
    .eq("id", 1);

  if (error) return { message: "Não foi possível salvar." };
  revalidatePath("/admin/configuracoes");
  return { ok: true, message: "Configurações salvas." };
}

// --------- Profissionais ---------
export async function addProfessionalAction(formData: FormData) {
  await requireAdmin();
  const full_name = String(formData.get("full_name") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim() || null;
  if (!full_name) return;
  const supabase = await createClient();
  await supabase.from("professionals").insert({ full_name, specialty, active: true });
  revalidatePath("/admin/configuracoes");
}

export async function updateProfessionalAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const full_name = String(formData.get("full_name") ?? "").trim();
  const active = formData.get("active") === "on";
  if (!id || !full_name) return;
  const supabase = await createClient();
  await supabase.from("professionals").update({ full_name, active }).eq("id", id);
  revalidatePath("/admin/configuracoes");
}
