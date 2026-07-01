import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AUDIENCE_LABEL, type Audience } from "@/features/content/schema";
import { togglePublishAction, deleteContentAction } from "./actions";

type Post = {
  id: string; title: string; audience: Audience; published: boolean; created_at: string;
};

export default async function ConteudosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_posts")
    .select("id, title, audience, published, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const posts = (data ?? []) as Post[];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-wine">Conteúdos</h1>
        <Link href="/admin/conteudos/novo" className="rounded-lg bg-wine px-3 py-2 text-sm font-medium text-cream hover:bg-wine-light">
          + Escrever
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {posts.length > 0 ? (
          <ul className="divide-y divide-black/5">
            {posts.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div className="min-w-0">
                  <Link href={`/admin/conteudos/${p.id}`} className="truncate font-medium text-dark hover:text-wine">{p.title}</Link>
                  <p className="text-xs text-muted">{AUDIENCE_LABEL[p.audience]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {p.published ? "Publicado" : "Rascunho"}
                  </span>
                  <form action={togglePublishAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="to" value={p.published ? "0" : "1"} />
                    <button className="rounded-md bg-cream px-2 py-1 text-xs font-medium text-wine hover:bg-gold-light">
                      {p.published ? "Despublicar" : "Publicar"}
                    </button>
                  </form>
                  <form action={deleteContentAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50">Excluir</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted">Nenhum conteúdo ainda. Clique em <strong>+ Escrever</strong>.</p>
        )}
      </div>
    </div>
  );
}
