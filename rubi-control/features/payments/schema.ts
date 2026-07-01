import { z } from "zod";

export const PAYMENT_STATUS = ["pago", "pendente", "parcial", "atrasado", "estornado"] as const;
export const PAYMENT_METHOD = ["pix", "dinheiro", "cartao", "transferencia", "link"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

export const PaymentSchema = z.object({
  client_id: z.string().uuid("Selecione um cliente"),
  package_id: z.string().uuid().optional().or(z.literal("")),
  amount_due: z.coerce.number().min(0, "Valor inválido"),
  amount_paid: z.coerce.number().min(0).default(0),
  method: z.enum(PAYMENT_METHOD).optional().or(z.literal("")),
  status: z.enum(PAYMENT_STATUS).default("pendente"),
  due_date: z.string().optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;

export type PaymentFormState =
  | { fieldErrors?: Partial<Record<keyof PaymentInput, string[]>>; message?: string }
  | undefined;

export const STATUS_LABEL: Record<PaymentStatus, string> = {
  pago: "Pago", pendente: "Pendente", parcial: "Parcial", atrasado: "Atrasado", estornado: "Estornado",
};
export const STATUS_CLS: Record<PaymentStatus, string> = {
  pago: "bg-green-100 text-green-800",
  pendente: "bg-amber-100 text-amber-800",
  parcial: "bg-amber-100 text-amber-800",
  atrasado: "bg-red-100 text-red-800",
  estornado: "bg-gray-100 text-gray-600",
};
