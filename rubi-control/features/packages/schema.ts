import { z } from "zod";

export const PACKAGE_STATUS = ["ativo", "vencido", "encerrado", "cancelado"] as const;
export type PackageStatus = (typeof PACKAGE_STATUS)[number];

export const WEEKDAYS = [
  { code: "SEG", label: "Seg" },
  { code: "TER", label: "Ter" },
  { code: "QUA", label: "Qua" },
  { code: "QUI", label: "Qui" },
  { code: "SEX", label: "Sex" },
  { code: "SAB", label: "Sáb" },
  { code: "DOM", label: "Dom" },
] as const;

const WEEKDAY_CODES = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;

export const PackageSchema = z.object({
  client_id: z.string().uuid("Selecione um cliente"),
  package_type_id: z.string().uuid().optional().or(z.literal("")),
  professional_id: z.string().uuid("Selecione a profissional"),
  total_sessions: z.coerce.number().int().min(1, "Mínimo 1 sessão"),
  price: z.coerce.number().min(0).optional(),
  start_date: z.string().min(1, "Informe a data de início"),
  due_date: z.string().optional().or(z.literal("")),
  weekdays: z.array(z.enum(WEEKDAY_CODES)).default([]),
  session_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Horário no formato HH:MM")
    .optional()
    .or(z.literal("")),
  duration_min: z.coerce.number().int().min(10).max(240).default(50),
  courtesy_total: z.coerce.number().int().min(0).max(2).default(1),
  status: z.enum(PACKAGE_STATUS).default("ativo"),
  auto_renew: z.coerce.boolean().optional(),
});

export type PackageInput = z.infer<typeof PackageSchema>;

export type PackageFormState =
  | { fieldErrors?: Partial<Record<keyof PackageInput, string[]>>; message?: string }
  | undefined;
