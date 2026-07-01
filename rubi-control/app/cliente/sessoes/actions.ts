"use server";

import { revalidatePath } from "next/cache";
import { requireClient, getMyClientId } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type ReqState = { ok?: boolean; message?: string } | undefined;

// Paciente pede remarcação/cancelamento. Cria um pedido PENDENTE (a Rubia aprova).
export async function requestRescheduleAction(
  _prev: ReqState,
  formData: FormData,
): Promise<ReqState> {
  await requireClient();
  const clientId = await getMyClientId();
  if (!clientId) return { message: "Seu cadastro ainda não está vinculado. Fale com o estúdio." };

  const sessionId = String(formData.get("session_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim() || null;
  const desired = String(formData.get("requested_for") ?? "").trim();
  if (!sessionId) return { message: "Sessão inválida." };

  const requested_for = desired ? new Date(`${desired}:00-04:00`).toISOString() : null;

  const supabase = await createClient();
  const { error } = await supabase.from("reschedule_requests").insert({
    session_id: sessionId,
    client_id: clientId,
    kind: "remarcacao",
    requested_for,
    reason,
    status: "pendente",
  });
  if (error) return { message: "Não foi possível enviar o pedido. Tente novamente." };

  revalidatePath("/cliente/sessoes");
  return { ok: true, message: "Pedido enviado! O estúdio vai confirmar com você. 😊" };
}
