import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente com SERVICE ROLE — IGNORA RLS. Usar SÓ no servidor, para tarefas de
// sistema: gravar audit_logs, jobs agendados, webhooks de pagamento, etc.
// NUNCA importar em componente client.
export function createServiceClient() {
  // aceita a chave nova (sb_secret_...) ou a antiga (service_role)
  const secret =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "Falta a chave secreta do Supabase (SUPABASE_SECRET_KEY) no .env.local.",
    );
  }
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
