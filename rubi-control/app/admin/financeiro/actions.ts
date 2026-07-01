"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PaymentSchema, type PaymentFormState } from "@/features/payments/schema";

export async function createPaymentAction(
  _prev: PaymentFormState,
  formData: FormData,
): Promise<PaymentFormState> {
  await requireAdmin();

  const parsed = PaymentSchema.safeParse({
    client_id: formData.get("client_id") ?? "",
    package_id: formData.get("package_id") ?? "",
    amount_due: formData.get("amount_due") ?? "",
    amount_paid: formData.get("amount_paid") || 0,
    method: formData.get("method") ?? "",
    status: formData.get("status") ?? "pendente",
    due_date: formData.get("due_date") ?? "",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) return { fieldErrors: z.flattenError(parsed.error).fieldErrors };

  const d = parsed.data;
  const pago = d.status === "pago";
  const amount_paid = pago && d.amount_paid === 0 ? d.amount_due : d.amount_paid;

  const supabase = await createClient();
  const { error } = await supabase.from("payments").insert({
    client_id: d.client_id,
    package_id: d.package_id || null,
    amount_due: d.amount_due,
    amount_paid,
    method: d.method || null,
    status: d.status,
    due_date: d.due_date || null,
    paid_at: pago ? new Date().toISOString() : null,
    notes: d.notes || null,
  });
  if (error) return { message: "Não foi possível registrar o pagamento." };

  revalidatePath("/admin/financeiro");
  revalidatePath("/admin/dashboard");
  redirect("/admin/financeiro");
}

// Botão rápido: dar baixa (marcar como pago).
export async function markPaidAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: p } = await supabase.from("payments").select("amount_due").eq("id", id).maybeSingle();
  await supabase
    .from("payments")
    .update({ status: "pago", amount_paid: p?.amount_due ?? 0, paid_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin/financeiro");
  revalidatePath("/admin/dashboard");
}
