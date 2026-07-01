import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SessionUser = {
  id: string;
  email: string | null;
  role: "admin" | "professional" | "client";
  full_name: string | null;
};

// Garante que há sessão. Se não houver, redireciona pro login.
export const verifySession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
});

// Usuário atual + papel (lido da tabela profiles, fonte da verdade).
export const getCurrentUser = cache(async (): Promise<SessionUser> => {
  const user = await verifySession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? null,
    role: (profile?.role as SessionUser["role"]) ?? "client",
    full_name: profile?.full_name ?? null,
  };
});

// Exige papel admin. Cliente cai pro portal dele.
export const requireAdmin = cache(async () => {
  const u = await getCurrentUser();
  if (u.role !== "admin") redirect("/cliente/dashboard");
  return u;
});

// Exige paciente (ou admin, que também pode ver). Admin segue pro próprio painel.
export const requireClient = cache(async () => {
  const u = await getCurrentUser();
  if (u.role === "admin") redirect("/admin/dashboard");
  return u;
});

// id do registro `clients` do paciente logado (null se não vinculado).
export const getMyClientId = cache(async (): Promise<string | null> => {
  const user = await verifySession();
  const supabase = await createClient();
  const { data } = await supabase
    .from("clients")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();
  return data?.id ?? null;
});
