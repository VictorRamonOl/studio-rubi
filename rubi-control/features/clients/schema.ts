import { z } from "zod";

export const CLIENT_STATUS = ["ativo", "inativo", "sumido", "arquivado"] as const;
export type ClientStatus = (typeof CLIENT_STATUS)[number];

// Campos públicos do cliente (tabela clients) + privados (client_private).
export const ClientSchema = z.object({
  full_name: z.string().trim().min(2, "Informe o nome completo"),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").optional().or(z.literal("")),
  birth_date: z.string().optional().or(z.literal("")), // yyyy-mm-dd
  status: z.enum(CLIENT_STATUS).default("ativo"),
  internal_notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type ClientInput = z.infer<typeof ClientSchema>;

export type ClientFormState =
  | {
      fieldErrors?: Partial<Record<keyof ClientInput, string[]>>;
      message?: string;
    }
  | undefined;

// Normaliza "" -> null para o banco.
export function toNull<T extends Record<string, unknown>>(obj: T) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[k] = v === "" ? null : v;
  return out;
}
