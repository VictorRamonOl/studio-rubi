import { z } from "zod";

export const SESSION_STATUS = [
  "agendada",
  "confirmada",
  "realizada",
  "falta",
  "remarcada",
  "cancelada",
] as const;
export type SessionStatus = (typeof SESSION_STATUS)[number];

export const SessionSchema = z.object({
  client_id: z.string().uuid("Selecione um cliente"),
  package_id: z.string().uuid().optional().or(z.literal("")),
  professional_id: z.string().uuid().optional().or(z.literal("")),
  scheduled_at: z.string().min(1, "Informe data e horário"), // datetime-local
  duration_min: z.coerce.number().int().min(10).max(240).default(50),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type SessionInput = z.infer<typeof SessionSchema>;

export type SessionFormState =
  | { fieldErrors?: Partial<Record<keyof SessionInput, string[]>>; message?: string }
  | undefined;
