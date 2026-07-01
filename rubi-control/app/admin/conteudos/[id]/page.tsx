import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "../content-form";
import { updateContentAction } from "../actions";

export default async function EditarConteudoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("content_posts")
    .select("id, title, excerpt, body, cover_url, audience, published")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  const action = updateContentAction.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link href="/admin/conteudos" className="text-sm text-muted hover:underline">← Conteúdos</Link>
      <h1 className="font-serif text-2xl text-wine">Editar conteúdo</h1>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <ContentForm action={action} submitLabel="Salvar alterações" initial={post} />
      </div>
    </div>
  );
}
