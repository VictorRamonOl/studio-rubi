# Studio Rubi — App de Gestão (rubi-control)

Aplicação web/PWA privada do **Studio Rubi Pilates e Fisioterapia**.
Painel da gestora + portal do paciente. Separada do site público (vitrine).

- **Stack:** Next.js 15 (App Router) · React 19 · Tailwind v4 · Supabase (Auth + Postgres + RLS)
- **Domínio alvo:** `app.rubistudiopilates.com.br`
- **Site público (vitrine):** `rubistudiopilates.com.br` (projeto `studio-rubi`, fica separado)

> Arquitetura, modelagem, backlog e decisões: ver **[PLANO.md](./PLANO.md)**.

## Como rodar (primeira vez)

```bash
cd rubi-control
npm install
cp .env.example .env.local   # preencher com as chaves do Supabase
npm run dev                  # http://localhost:3000
```

### Banco de dados (Supabase novo, separado do site e do painel Maués)

No Supabase (SQL Editor), colar **na ordem** o conteúdo de `supabase/migrations/`:

1. `20260630000001_schema.sql` — tabelas, enums, triggers (saldo, no-show)
2. `20260630000002_rls.sql` — RLS (admin/paciente/profissional)
3. `20260630000003_audit.sql` — auditoria append-only de dados sensíveis

Ou via CLI: `npx supabase link` + `npx supabase db push`.

Depois, promover a gestora a admin (trocar o e-mail):

```sql
update profiles set role = 'admin'
where id = (select id from auth.users where email = 'esposa@exemplo.com');
```

## Estrutura

```
app/
  (auth)/        login, recuperar-senha, redefinir-senha
  admin/         painel da gestora (role = admin)
  cliente/       portal do paciente (role = client)
lib/
  supabase/      client / server / service / middleware
  auth/          dal.ts (verifySession, requireAdmin, requireClient)
middleware.ts    renova sessão + protege rotas + noindex
sql/             migrations (schema + RLS)
```

## Segurança

- App **noindex** (header `X-Robots-Tag`, `metadata.robots`, sem sitemap).
- Toda rota privada barrada no `middleware.ts` (sem sessão → `/login`).
- RLS no banco: admin vê tudo; paciente só os próprios dados; financeiro e
  observações internas/clínicas isolados (`client_private`, `session_private`).
