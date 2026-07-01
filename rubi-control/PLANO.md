# Studio Rubi — Plano de Arquitetura e Produto

> Documento-base do app de gestão (`rubi-control`). Cobre os 18 entregáveis.
> Atualizado: 2026-06-30.

---

## 0. Decisão central: NÃO usar React+Vite — reusar o stack do Painel Maués

Você pediu React + Vite. Mas olhando o que **já existe** nas suas pastas, a
recomendação muda — e economiza semanas:

| Ativo já pronto | Onde | O que dá pra reusar |
|---|---|---|
| Site público | `studio-rubi` (Next.js 14) | Marca, cores, fontes, deploy Vercel, blog |
| **Painel Maués** | `portal-prefeitura-maues` (Next.js 16 + Supabase) | **Auth SSR, MFA, recuperar/redefinir senha, audit logs, DAL, RLS, multi-tenant** |

O painel Maués já é **exatamente** o tipo de app que você quer construir
(login seguro + área privada + papéis + Supabase + RLS). Clonar esses padrões
em Next.js é muito mais rápido do que reimplementar autenticação do zero em
Vite.

**Por que Next.js e não Vite:**

- **Mesmo framework do site público** → reuso de marca/componentes, mesmo
  deploy (Vercel), um só ecossistema pra manter.
- **SSR + cookies httpOnly** → sessão segura no servidor; RLS aplicado em Server
  Components. Vite (SPA puro) guarda token no browser e não tem proteção
  server-side nativa.
- **Backend embutido** (Route Handlers + Server Actions, rodando em Node na
  Vercel Fluid Compute) → **não precisa de Node/Express separado**. Webhook de
  pagamento, envio de WhatsApp, cron — tudo cabe aqui.
- **noindex, PWA, middleware de rota** → primeira-classe no Next.

> Se você ainda preferir Vite, dá pra fazer — mas você perde o reuso do auth do
> Maués e ganha trabalho de backend. Minha recomendação forte é Next.js.
> **A fundação neste repositório já está montada em Next.js 15.**

---

## 1. Arquitetura recomendada

```
┌─────────────────────────────┐     ┌──────────────────────────────┐
│  SITE PÚBLICO (vitrine)      │     │  APP PRIVADO (rubi-control)  │
│  rubistudiopilates.com.br    │     │  app.rubistudiopilates...    │
│  Next.js 14 · projeto        │     │  Next.js 15 · este repo      │
│  studio-rubi (NÃO mexer)     │     │  Admin + Portal do paciente  │
│  SEO, blog, WhatsApp, contato│     │  noindex, login obrigatório  │
└──────────────┬──────────────┘     └───────────────┬──────────────┘
               │ link "Área do paciente"            │
               └───────────────►────────────────────┘
                                                     │
                               ┌─────────────────────▼─────────────────────┐
                               │  SUPABASE                                  │
                               │  Auth · Postgres · RLS · Storage           │
                               │  Edge Functions / pg_cron (jobs, webhooks) │
                               └────────────────────────────────────────────┘
```

### Opção A vs Opção B

- **Opção A — Supabase ao máximo (RECOMENDADA p/ MVP e escala):**
  React/Next + Supabase Auth + Postgres + RLS. Lógica de servidor em **Next.js
  Route Handlers / Server Actions**; jobs e webhooks em **Edge Functions +
  pg_cron**. Menos peças, menos custo, deploy único.
- **Opção B — Node/Express separado:** só se você precisar de algo que o
  Supabase não cobre bem (processamento pesado, fila dedicada, integração
  legada). **Não é o caso no MVP.**

**Veredito:** comece na Opção A. Com Next.js, a pergunta "Edge Function vs
Node" quase some: 90% vira Server Action/Route Handler; Edge Function fica só
pro que precisa rodar **fora** do request do usuário (cron de lembrete, webhook
de gateway, baixa automática).

---

## 2. Mapa de módulos

- **auth** — login, logout, recuperação de senha, papéis (admin/client/professional).
- **clients** — cadastro, status, histórico; dados sensíveis isolados.
- **packages** — planos, saldo de sessões (total − usadas), vencimento.
- **sessions** — agenda, presença/falta/remarcação, baixa de saldo automática.
- **payments** — financeiro manual, status, receita do mês.
- **content** — dicas/blog no portal (link ao site público ou posts internos).
- **notifications** — fila/histórico de WhatsApp (fases futuras).
- **dashboard** — métricas e alertas (admin) / resumo (cliente).
- **settings** — nome, chave Pix, WhatsApp, marca.
- **audit** — logs de quem fez o quê.

---

## 3–5. Banco, SQL e RLS

Implementados em arquivos reais:

- **Schema:** [`sql/001_schema.sql`](./sql/001_schema.sql)
- **RLS:** [`sql/002_rls.sql`](./sql/002_rls.sql)

### Tabelas (resumo)

| Tabela | Objetivo | Pontos-chave |
|---|---|---|
| `profiles` | 1:1 com `auth.users`; guarda o **papel** | role: admin/professional/client |
| `professionals` | Profissionais (a esposa = admin+professional) | uso futuro: mais profs |
| `clients` | Pacientes (sem dados sensíveis) | `profile_id` nullable (cadastro sem login) |
| `client_private` | CPF, obs. internas, **dados de saúde** | **admin-only** (LGPD) |
| `package_types` | Catálogo de planos | valores padrão |
| `packages` | Pacote do cliente | `remaining_sessions` = coluna gerada |
| `sessions` | Agendamento + execução | trigger desconta saldo ao marcar "realizada" |
| `session_private` | Evolução clínica | **admin-only** (sensível) |
| `payments` | Financeiro manual | paciente só lê o próprio |
| `notifications` | Histórico WhatsApp | fases futuras |
| `content_posts` | Dicas no portal | `external_url` linka blog público |
| `audit_logs` | Auditoria | gravado via service_role |
| `settings` | Config do estúdio | linha única |

**Decisões importantes:**

- **Saldo de sessões** é coluna gerada (`total − used`), nunca calculada no
  front → impossível dessincronizar.
- **Baixa automática:** trigger `consume_session_on_done` desconta 1 do pacote
  ao marcar sessão como `realizada` (e estorna se reverter). Falta **não**
  desconta por padrão (configurável na sessão).
- **Dados sensíveis em tabelas separadas** (`client_private`, `session_private`)
  porque RLS protege linhas, não colunas. Assim o paciente lê a própria linha
  de `clients`/`sessions` **sem** risco de ver CPF/obs. clínica.

### Regras RLS (resumo)

- `admin` → tudo (`is_admin()`).
- `client` → só os próprios dados, **só leitura** (`my_client_id()`).
- `payments` → paciente lê o próprio, nunca escreve.
- `client_private` / `session_private` → admin-only.
- `audit_logs` → admin lê; escrita só via service_role.

---

## 6. Estrutura de pastas (já criada)

```
app/
  (auth)/            login, recuperar-senha, redefinir-senha + actions.ts
  admin/             layout + dashboard + (clientes, pacotes, agenda,
                     financeiro, conteudos, configuracoes — a fazer)
  cliente/           layout + dashboard + (pacote, sessoes, pagamentos,
                     conteudos, perfil — a fazer)
  layout.tsx · globals.css · manifest.ts · page.tsx (roteia por papel)
components/          UI compartilhada (DashboardCard, tabelas, badges...)
features/            lógica por domínio (clients, packages, sessions, payments)
lib/
  supabase/          client · server · service · middleware
  auth/              dal.ts (verifySession, requireAdmin, requireClient)
  utils/             formatadores, helpers
middleware.ts        sessão + proteção de rota + noindex
sql/                 001_schema · 002_rls
public/icons/        ícones do PWA
```

Função de cada pasta: `components` = UI burra reutilizável; `features` = regra
de negócio por domínio (queries + componentes do domínio); `lib` = integrações
e infra; `app` = rotas/telas (App Router).

---

## 7. Rotas

**Decisão: subdomínio `app.rubistudiopilates.com.br`** (não `/app`). Rotas:

```
/login  /recuperar-senha  /redefinir-senha
/admin/dashboard  /admin/clientes  /admin/clientes/novo  /admin/clientes/:id
/admin/pacotes  /admin/agenda  /admin/financeiro  /admin/conteudos  /admin/configuracoes
/cliente/dashboard  /cliente/pacote  /cliente/sessoes  /cliente/pagamentos
/cliente/conteudos  /cliente/perfil
```

**Subdomínio vs `/app`:**

| | `app.` (subdomínio) ✅ | `/app` (subpasta) |
|---|---|---|
| Separação | Total (projeto/deploy/repo) | Compartilha repo do site |
| Cookies/sessão | Isolados | Misturam com o site |
| noindex | Subdomínio inteiro | Precisa excluir rota a rota |
| SEO do site | Zero risco | Risco de poluir/canibalizar |
| Custo | 1 projeto Vercel a mais (grátis) | — |

Subdomínio é o caminho limpo e o que combina com manter o site intocado.

---

## 8. Componentes principais

`ProtectedRoute` (no Next vira `requireAdmin`/`requireClient` no server — já
feito em `lib/auth/dal.ts`), `AdminLayout`, `ClientLayout` (feitos),
`DashboardCard`, `ClientTable`, `ClientForm`, `PackageCard`, `SessionList`,
`SessionStatusBadge`, `PaymentStatusBadge`, `AppointmentCalendar`,
`MobileBottomNav` (esboçado nos layouts), `InstallPWAButton`, `WhatsAppButton`.

---

## 9. Fluxos de tela

**Gestora:** login → dashboard → cadastra cliente → cria pacote → agenda sessões
→ no dia abre "sessões de hoje" → marca presença/falta/remarcação → saldo e
financeiro atualizam → dashboard mostra vencimentos/pendências/alertas.

**Paciente:** recebe acesso → login → vê pacote ativo e saldo → vê próxima
sessão → acessa dicas → vê pagamentos → (futuro) paga / remarca.

---

## 10. Checklist do MVP

**Fase 1 — Fundação (✅ feita neste repo):** projeto Next, Tailwind+marca,
Supabase clients, Auth, middleware de rota, noindex, PWA manifest, schema+RLS,
login + recuperar senha, layouts admin/cliente, dashboards com dados reais.

**Fase 2 — Admin MVP:** CRUD clientes · CRUD pacotes · agenda/sessões ·
presença/falta · baixa de saldo (trigger pronto, falta UI).

**Fase 3 — Financeiro manual:** pagamentos · status · receita do mês ·
pendências · pacotes vencidos.

**Fase 4 — Portal do paciente:** pacote · sessões · pagamentos · conteúdos.

**Fase 5 — WhatsApp semi-automático:** botões com mensagem pronta · templates ·
histórico (`notifications`).

**Fase 6 — Pagamentos online:** link Pix/gateway · webhook · baixa automática.

**Fase 7 — Automação/inteligência:** alertas, relatórios, resumo, previsão.

---

## 11. Backlog (issues para o GitHub)

Cada item vira uma issue. Prefixo = fase.

```
[F1] Setup: criar projeto Supabase, rodar 001_schema + 002_rls
[F1] Seed: criar usuário admin (esposa) e promover a role admin
[F1] Deploy: projeto Vercel + domínio app.rubistudiopilates.com.br
[F1] Auth: tela redefinir-senha (callback do e-mail)  ← falta
[F2] Clientes: listagem + busca + filtro por status
[F2] Clientes: formulário novo/editar (nome, telefone, e-mail, status)
[F2] Clientes: detalhe + observações internas (client_private)
[F2] Pacotes: criar pacote p/ cliente (tipo, sessões, valor, vencimento)
[F2] Pacotes: catálogo de package_types
[F2] Agenda: criar sessão/agendamento
[F2] Agenda: lista "sessões de hoje" + visão semanal
[F2] Sessões: botão marcar presença/falta/remarcar (baixa de saldo)
[F3] Financeiro: registrar pagamento + status
[F3] Financeiro: dashboard receita do mês + pendências
[F3] Alertas: pacotes a vencer / inadimplentes / clientes sumidos
[F4] Portal: pacote, sessões, pagamentos, conteúdos, perfil
[F4] Conteúdos: tabela content_posts + tela admin + exibição no portal
[F5] WhatsApp: botão "abrir conversa" com template + log em notifications
[F6] Pagamentos online: link Pix / gateway (Asaas ou Mercado Pago) + webhook
[F7] Relatórios e resumo semanal automático
[F1] PWA: gerar ícones 192/512/maskable + InstallPWAButton
```

---

## 12. Ordem de desenvolvimento

1. Subir Supabase + rodar SQL + criar admin (1 dia).
2. Deploy Vercel + subdomínio + confirmar login ponta-a-ponta.
3. CRUD clientes → pacotes → sessões/agenda (coração do produto).
4. Presença + baixa de saldo (já tem trigger).
5. Financeiro manual + dashboard.
6. Portal do paciente.
7. WhatsApp semi-automático.
8. Pagamentos online.
9. Automação/relatórios.

---

## 13. Riscos técnicos

- **Confiar no client p/ saldo/financeiro** → mitigado: coluna gerada + RLS +
  triggers no banco.
- **Vazar dado sensível pro paciente** → mitigado: `client_private` /
  `session_private` admin-only.
- **iOS PWA limitado** (sem push nativo confiável, cache restrito) → usar
  WhatsApp como canal de notificação, não push.
- **Token Supabase no browser** → usamos SSR + cookies, não localStorage.
- **Migrations sem versionamento** → manter tudo em `sql/NNN_*.sql` versionado.
- **Backup** → ativar Point-in-Time Recovery no Supabase (plano pago) ou export
  agendado.

---

## 14. LGPD e segurança (estúdio de saúde = dado sensível)

**O que o MVP DEVE guardar:** nome, telefone, e-mail, status, pacotes, sessões
(data/horário/presença), pagamentos.

**O que EVITAR no MVP:**

- **CPF** → só se realmente necessário (ex.: nota fiscal). Tem coluna em
  `client_private`, mas deixe vazio até precisar.
- **Dados de saúde** (diagnóstico, lesão, evolução clínica) → são **dado
  sensível** (LGPD art. 11), exigem base legal e cuidado extra. No MVP, guarde
  só o mínimo em `session_private`/`client_private` (admin-only). Evite detalhe
  clínico até ter consentimento e necessidade real.

**Boas práticas aplicadas:** minimização de dados; RLS por papel; separação de
dados sensíveis; audit_logs; resposta neutra no "esqueci a senha"; headers de
segurança; app noindex. **Pendências de processo:** política de privacidade do
app (o site já tem uma — reaproveitar), termo de consentimento no cadastro,
rotina de backup.

---

## 15. Nome do app

**Recomendado: "Studio Rubi"** (`short_name: "Rubi"`).

- Combina com a marca do site, o paciente reconhece na hora.
- "Rubi Gestão"/"Rubi Studio App" soam internos/técnicos — pior pro paciente,
  que também instala o mesmo app.
- Um app só, dois papéis (admin e paciente) — o nome serve aos dois.
  Já configurado em `app/manifest.ts` e `app/layout.tsx`.

---

## 16. Layout visual (inspirado no site atual)

Paleta e fontes **copiadas do site** (`studio-rubi/tailwind.config.ts`) para
`app/globals.css`:

- Vinho `#681D31` (primária), Dourado `#C89E51` (destaque), Creme `#F7F4EE`
  (fundo), Escuro `#2B2224` (texto), Muted `#8B7A74`.
- Serifada **Playfair Display** (títulos) + **Inter** (texto).
- Mobile-first: cartões arredondados, bottom-nav no mobile, header vinho.

---

## 17. Integração com o site público

- Botão discreto **"Área do paciente"** no header/rodapé do site → linka pra
  `https://app.rubistudiopilates.com.br`.
- **Blog:** no MVP, manter os 30 posts no site público e, no portal, exibir
  dicas via `content_posts.external_url` (link) — sem duplicar conteúdo. Posts
  exclusivos pra paciente vêm depois, na mesma tabela (`audience = 'client'`).
- Marca compartilhada (cores/fontes) garante continuidade visual.

---

## 18. Evolução: WhatsApp e pagamentos

**WhatsApp (fases):** 1) botão `wa.me` com mensagem pronta → 2) biblioteca de
templates (lembrete, pacote vencendo, pagamento, renovação, boas-vindas) →
3) API oficial (Cloud API) ou provedor → 4) automação por cron (24h/2h antes,
saldo acabando, pagamento atrasado) → 5) confirmação do paciente.

**Pagamentos (fases):** 1) manual → 2) copiar chave Pix / gerar cobrança →
3) link de pagamento (Asaas ou Mercado Pago — Asaas é forte em Pix/boleto BR) →
4) webhook confirma → 5) baixa automática + recibo. Webhook e cron entram como
**Edge Functions / Route Handlers**, gravando via service_role.

### Mensagens-exemplo (WhatsApp)

- **Lembrete:** "Oi {nome}! Passando pra lembrar da sua sessão amanhã às {hora}
  no Studio Rubi 💪 Até lá!"
- **Pacote vencendo:** "Oi {nome}! Seu pacote está com {saldo} sessões e vence
  em {data}. Quer renovar? 😊"
- **Pagamento pendente:** "Oi {nome}! Consta um pagamento pendente de
  R$ {valor}. Pix: {chave}. Qualquer dúvida, é só chamar!"
- **Renovação:** "Oi {nome}! Que tal renovar seu pacote e manter o ritmo? Tenho
  horários essa semana 🗓️"
- **Boas-vindas:** "Bem-vinda ao Studio Rubi, {nome}! 🌟 Seu acesso ao portal já
  está liberado em app.rubistudiopilates.com.br"

---

## PWA — como funciona aqui

- `app/manifest.ts` → Next gera `/manifest.webmanifest` (nome, ícones, cor,
  standalone).
- `app/layout.tsx` → `themeColor`, `appleWebApp`, viewport mobile.
- **Ícones:** gerar `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` em
  `public/icons/` (a partir do logo Rubi).
- **Service worker / cache offline:** opcional no MVP. Para cache básico, usar
  `@ducanh2912/next-pwa` ou um SW manual depois.
- **Android:** "Adicionar à tela inicial" instala como app.
- **iOS:** instala via Safari → Compartilhar → "Adicionar à Tela de Início".
  **Limitações iOS:** push notifications não confiáveis, cache restrito,
  precisa abrir pelo Safari. Por isso o canal de aviso é **WhatsApp**, não push.
