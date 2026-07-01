# Segurança — Studio Rubi (rubi-control)

Estúdio de saúde + pagamentos = alvo sensível. Camadas aplicadas e pendências.

## 1. Banco (Supabase / Postgres) — a linha de defesa principal

- **RLS default-deny** em todas as tabelas. Paciente só acessa o próprio dado;
  admin tudo; `professional` vê prontuário, não financeiro. (`0002_rls.sql`)
- **`force row level security`** nas tabelas críticas (`payments`,
  `client_private`, `session_private`, `evolution_records`) — vale até para o owner.
- **Dados sensíveis isolados em tabelas próprias** (RLS protege linha, não
  coluna): `client_private` (CPF, obs. internas, saúde), `session_private`
  (evolução clínica), `evolution_records` (prontuário). Paciente nunca toca.
- **Paciente é read-only** em pacotes/sessões/pagamentos. Remarcação só via
  `reschedule_requests` (cria pedido `pendente`, não auto-aprova).
- **Auditoria append-only** (`0003_audit.sql`): todo INSERT/UPDATE/DELETE em
  dados sensíveis/financeiros grava quem/o quê/quando. Ninguém edita ou apaga
  os logs (só trigger `security definer`).
- **Saldo de sessão é coluna gerada** + triggers no banco → paciente não
  consegue forjar saldo/baixa pelo client.

## 2. Pagamentos — NUNCA tocar em dado de cartão

- **Não armazenamos PAN/CVV/validade.** O gateway (Asaas ou Mercado Pago)
  tokeniza; aqui guardamos só `gateway`, `gateway_charge_id`, valor e status.
  Isso mantém o app **fora do escopo pesado de PCI-DSS**.
- Pix: guardar só o txid/charge id, nunca a chave do paciente.
- Confirmação de pagamento entra por **webhook assinado** (validar assinatura
  do gateway) processado no servidor com `service_role`, nunca pelo browser.

## 3. Autenticação

- **Senha + e-mail** via Supabase Auth (cookies httpOnly, SSR — sem token no
  localStorage).
- **MFA/2FA (TOTP) obrigatório para admin** — Supabase Auth suporta; o
  middleware exige sessão `aal2` em `/admin/*`. (Implementar no fluxo de login;
  estrutura herdada do painel Maués.)
- Ativar no painel do Supabase (Auth > Policies):
  - **Leaked password protection** (checa senha vazada via HaveIBeenPwned).
  - **Senha mínima 8+**, exigir confirmação de e-mail.
  - **Rate limit** de login e de reset de senha (limites do Supabase + os
    nossos nas Server Actions).
- "Esqueci a senha" responde **neutro** (não revela se o e-mail existe).
- Paciente **não pode alterar o próprio papel** (policy de update trava `role`).

## 4. App (Next.js)

- **Toda rota privada barrada no `middleware.ts`** (sem sessão → `/login`).
  Checagem de papel no servidor (`requireAdmin`/`requireClient`).
- **Headers** (`next.config.ts`): CSP, HSTS, `X-Frame-Options: DENY`,
  `nosniff`, `Referrer-Policy`, `Permissions-Policy`, sem `X-Powered-By`.
- **noindex** no app inteiro (header + metadata) — não indexa no Google.
- **Validação com Zod** em toda entrada (Server Actions / Route Handlers).
- **`service_role` só no servidor** (`lib/supabase/service.ts`, `server-only`).
  Nunca importar em componente client. No client só a `anon key` (pública por
  design, protegida pelo RLS).
- Server Actions confiam no `auth.uid()` do servidor, nunca em id vindo do form.

## 5. Operacional / LGPD

- **Minimização:** guardar só o necessário. CPF e detalhe clínico só com
  necessidade real + consentimento. Evitar no MVP.
- **Backup:** ativar Point-in-Time Recovery no Supabase (ou export agendado).
- **Consentimento:** checkbox de termo no cadastro do paciente; reaproveitar a
  política de privacidade já existente no site público.
- **Acesso mínimo:** só a gestora é admin. Profissionais futuros entram como
  `professional` (sem financeiro).
- **Segredos:** `.env.local` é gitignored; chaves de produção só na Vercel
  (Environment Variables), nunca no repo.

## Pendências de hardening (pós-MVP)

- [ ] CSP com **nonce** (remover `unsafe-inline` de script).
- [ ] Enforçar MFA aal2 no middleware para `/admin/*`.
- [ ] Validar assinatura do webhook do gateway.
- [ ] Criptografia em repouso de `health_notes` com `pgcrypto` + chave gerida.
- [ ] Logout automático por inatividade no admin.
- [ ] Revisão de segurança (`/security-review`) antes de cada deploy grande.
