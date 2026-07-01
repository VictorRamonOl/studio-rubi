import { z } from "zod";

export const AUDIENCE = ["public", "client"] as const;
export type Audience = (typeof AUDIENCE)[number];

export const AUDIENCE_LABEL: Record<Audience, string> = {
  public: "Blog do site (público)",
  client: "Portal do paciente",
};

export const ContentSchema = z.object({
  title: z.string().trim().min(3, "Informe um título"),
  excerpt: z.string().trim().max(300).optional().or(z.literal("")),
  body: z.string().trim().max(20000).optional().or(z.literal("")),
  cover_url: z.string().trim().url("URL inválida").optional().or(z.literal("")),
  audience: z.enum(AUDIENCE).default("public"),
  published: z.coerce.boolean().optional(),
});

export type ContentInput = z.infer<typeof ContentSchema>;

export type ContentFormState =
  | { fieldErrors?: Partial<Record<keyof ContentInput, string[]>>; message?: string }
  | undefined;

// título -> slug (sem acento, minúsculo, hífens)
export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
