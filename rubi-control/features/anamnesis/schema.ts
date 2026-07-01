import { z } from "zod";

// Todos os campos opcionais — a ficha vai sendo preenchida aos poucos.
export const AnamnesisSchema = z.object({
  main_complaint: z.string().trim().max(2000).optional().or(z.literal("")),
  objectives: z.string().trim().max(2000).optional().or(z.literal("")),
  medical_history: z.string().trim().max(2000).optional().or(z.literal("")),
  surgeries: z.string().trim().max(2000).optional().or(z.literal("")),
  medications: z.string().trim().max(2000).optional().or(z.literal("")),
  injuries: z.string().trim().max(2000).optional().or(z.literal("")),
  physical_activity: z.string().trim().max(2000).optional().or(z.literal("")),
  contraindications: z.string().trim().max(2000).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type AnamnesisInput = z.infer<typeof AnamnesisSchema>;

export type AnamnesisFormState =
  | { ok?: boolean; message?: string }
  | undefined;

export const ANAMNESIS_FIELDS: { name: keyof AnamnesisInput; label: string; placeholder?: string }[] = [
  { name: "main_complaint", label: "Queixa principal / motivo", placeholder: "Dor lombar, pós-cirúrgico, condicionamento..." },
  { name: "objectives", label: "Objetivos", placeholder: "O que o paciente quer alcançar" },
  { name: "injuries", label: "Lesões / dores" },
  { name: "medical_history", label: "Histórico médico / doenças" },
  { name: "surgeries", label: "Cirurgias" },
  { name: "medications", label: "Medicamentos em uso" },
  { name: "physical_activity", label: "Atividade física atual" },
  { name: "contraindications", label: "Restrições / contraindicações" },
  { name: "notes", label: "Observações gerais" },
];
