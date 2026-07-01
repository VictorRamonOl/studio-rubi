"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ContentSchema, slugify, type ContentFormState } from "@/features/content/schema";

function parse(formData: FormData) {
  return ContentSchema.safeParse({
    title: formData.get("title") ?? "",
    excerpt: formData.get("excerpt") ?? "",
    body: formData.get("body") ?? "",
    cover_url: formData.get("cover_url") ?? "",
    audience: formData.get("audience") ?? "public",
    published: formData.get("published") === "on",
  });
}

async function uniqueSlug(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  base: string,
  ignoreId?: string,
): Promise<string> {
  const slug = base || "post";
  let q = supabase.from("content_posts").select("id").eq("slug", slug).limit(1);
  if (ignoreId) q = q.neq("id", ignoreId);
  const { data } = await q;
  if (!data?.length) return slug;
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(2)), (b) => (b % 36).toString(36)).join("");
  return `${slug}-${suffix}`;
}

export async function createContentAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { fieldErrors: z.flattenError(parsed.error).fieldErrors };

  const d = parsed.data;
  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, slugify(d.title));

  const { error } = await supabase.from("content_posts").insert({
    title: d.title,
    slug,
    excerpt: d.excerpt || null,
    body: d.body || null,
    cover_url: d.cover_url || null,
    audience: d.audience,
    source: "internal",
    published: d.published ?? false,
  });
  if (error) return { message: "Não foi possível salvar." };

  revalidatePath("/admin/conteudos");
  redirect("/admin/conteudos");
}

export async function updateContentAction(
  id: string,
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { fieldErrors: z.flattenError(parsed.error).fieldErrors };

  const d = parsed.data;
  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, slugify(d.title), id);

  const { error } = await supabase
    .from("content_posts")
    .update({
      title: d.title,
      slug,
      excerpt: d.excerpt || null,
      body: d.body || null,
      cover_url: d.cover_url || null,
      audience: d.audience,
      published: d.published ?? false,
    })
    .eq("id", id);
  if (error) return { message: "Não foi possível atualizar." };

  revalidatePath("/admin/conteudos");
  redirect("/admin/conteudos");
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const to = formData.get("to") === "1";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("content_posts").update({ published: to }).eq("id", id);
  revalidatePath("/admin/conteudos");
}

export async function deleteContentAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("content_posts").delete().eq("id", id);
  revalidatePath("/admin/conteudos");
}
