"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ClientSchema, toNull, type ClientFormState } from "@/features/clients/schema";

function parse(formData: FormData) {
  return ClientSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    birth_date: formData.get("birth_date") ?? "",
    status: formData.get("status") ?? "ativo",
    internal_notes: formData.get("internal_notes") ?? "",
  });
}

export async function createClientAction(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { internal_notes, ...clientCols } = toNull(parsed.data) as Record<string, unknown>;
  const supabase = await createClient();

  const { data: created, error } = await supabase
    .from("clients")
    .insert(clientCols)
    .select("id")
    .single();

  if (error || !created) {
    return { message: "Não foi possível salvar o cliente. Tente novamente." };
  }

  if (internal_notes) {
    await supabase.from("client_private").insert({
      client_id: created.id,
      internal_notes,
    });
  }

  revalidatePath("/admin/clientes");
  redirect(`/admin/clientes/${created.id}`);
}

export async function updateClientAction(
  id: string,
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { internal_notes, ...clientCols } = toNull(parsed.data) as Record<string, unknown>;
  const supabase = await createClient();

  const { error } = await supabase.from("clients").update(clientCols).eq("id", id);
  if (error) {
    return { message: "Não foi possível atualizar o cliente." };
  }

  // upsert das observações internas (tabela admin-only)
  await supabase
    .from("client_private")
    .upsert({ client_id: id, internal_notes: internal_notes ?? null }, { onConflict: "client_id" });

  revalidatePath("/admin/clientes");
  revalidatePath(`/admin/clientes/${id}`);
  redirect(`/admin/clientes/${id}`);
}
