"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export type AccessState =
  | { ok?: boolean; email?: string; password?: string; message?: string }
  | undefined;

// Gera uma senha temporária amigável (letras + números, sem caracteres ambíguos).
function tempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

// Cria o login do paciente (Supabase Auth) e vincula ao cadastro (clients).
export async function createClientAccessAction(
  clientId: string,
  _prev: AccessState,
  _formData: FormData,
): Promise<AccessState> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clients")
    .select("id, full_name, email, profile_id")
    .eq("id", clientId)
    .maybeSingle();

  if (!cliente) return { message: "Cliente não encontrado." };
  if (cliente.profile_id) return { message: "Este cliente já tem acesso criado." };
  if (!cliente.email) return { message: "Cadastre o e-mail do cliente antes de criar o acesso." };

  const password = tempPassword();

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return { message: "Falta configurar a chave secreta do Supabase (ver instruções)." };
  }

  // cria o usuário já confirmado (pode logar na hora)
  const { data: created, error } = await admin.auth.admin.createUser({
    email: cliente.email,
    password,
    email_confirm: true,
    user_metadata: { full_name: cliente.full_name },
  });

  if (error || !created?.user) {
    const msg = error?.message ?? "";
    if (msg.toLowerCase().includes("already")) {
      return { message: "Já existe um login com esse e-mail. Vincule manualmente ou use outro e-mail." };
    }
    return { message: "Não foi possível criar o acesso. Tente novamente." };
  }

  // vincula o login ao cadastro do cliente (o trigger já criou o profile como 'client')
  const { error: linkErr } = await admin
    .from("clients")
    .update({ profile_id: created.user.id })
    .eq("id", clientId);

  if (linkErr) {
    return { message: "Login criado, mas falhou ao vincular. Fale com o suporte." };
  }

  revalidatePath(`/admin/clientes/${clientId}`);
  return { ok: true, email: cliente.email, password };
}
