import { createClient } from "@/lib/supabase/server";

export default async function ConteudosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_posts")
    .select("id, title, excerpt, external_url, cover_url")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(50);

  const posts = data ?? [];

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-wine">Dicas & conteúdos</h1>
      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((p) => {
            const inner = (
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <p className="font-medium text-dark">{p.title}</p>
                {p.excerpt && <p className="mt-1 text-sm text-muted">{p.excerpt}</p>}
                {p.external_url && <p className="mt-1 text-xs text-wine">Ler mais →</p>}
              </div>
            );
            return p.external_url ? (
              <a key={p.id} href={p.external_url} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              <div key={p.id}>{inner}</div>
            );
          })}
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-muted shadow-sm ring-1 ring-black/5">
          Em breve, dicas e conteúdos aqui. 💖
        </p>
      )}
    </div>
  );
}
