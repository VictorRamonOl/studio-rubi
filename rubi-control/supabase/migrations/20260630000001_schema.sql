-- ============================================================================
-- Studio Rubi · 0001 · Schema
-- Banco PRÓPRIO do app (separado do site Rubi e do painel Maués).
-- Aplicar no Supabase: SQL Editor (colar na ordem) OU `supabase db push`.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- ENUMs
-- ----------------------------------------------------------------------------
do $$ begin create type user_role      as enum ('admin','professional','client'); exception when duplicate_object then null; end $$;
do $$ begin create type client_status  as enum ('ativo','inativo','sumido','arquivado'); exception when duplicate_object then null; end $$;
do $$ begin create type package_status as enum ('ativo','vencido','encerrado','cancelado'); exception when duplicate_object then null; end $$;
do $$ begin create type session_status as enum ('agendada','confirmada','realizada','falta','remarcada','cancelada'); exception when duplicate_object then null; end $$;
do $$ begin create type payment_status as enum ('pago','pendente','parcial','atrasado','estornado'); exception when duplicate_object then null; end $$;
do $$ begin create type payment_method as enum ('pix','dinheiro','cartao','transferencia','link'); exception when duplicate_object then null; end $$;
do $$ begin create type request_kind   as enum ('remarcacao','cancelamento'); exception when duplicate_object then null; end $$;
do $$ begin create type request_status as enum ('pendente','aprovada','recusada'); exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- updated_at automático (boa prática que faltava no Maués)
-- ----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

-- ----------------------------------------------------------------------------
-- profiles (1:1 auth.users) — fonte da verdade do PAPEL
-- ----------------------------------------------------------------------------
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  role       user_role not null default 'client',
  full_name  text,
  phone      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_profiles_touch on profiles;
create trigger trg_profiles_touch before update on profiles for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- professionals
-- ----------------------------------------------------------------------------
create table if not exists professionals (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  full_name  text not null,
  specialty  text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- clients (sem dados sensíveis)
-- ----------------------------------------------------------------------------
create table if not exists clients (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid unique references profiles(id) on delete set null,
  full_name  text not null,
  phone      text,
  email      text,
  birth_date date,
  status     client_status not null default 'ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_clients_status on clients(status);
create index if not exists idx_clients_profile on clients(profile_id);
drop trigger if exists trg_clients_touch on clients;
create trigger trg_clients_touch before update on clients for each row execute function public.touch_updated_at();

-- dados que o PACIENTE NUNCA vê (admin-only). Sensível = LGPD art. 11.
create table if not exists client_private (
  client_id      uuid primary key references clients(id) on delete cascade,
  cpf            text,          -- evitar no MVP; só se houver NF
  internal_notes text,
  health_notes   text,          -- dado de saúde (sensível)
  updated_at     timestamptz not null default now()
);
drop trigger if exists trg_client_private_touch on client_private;
create trigger trg_client_private_touch before update on client_private for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- evolução / prontuário (concorrentes: "prontuário customizável")
-- Sensível: admin/professional only. NUNCA do paciente.
-- ----------------------------------------------------------------------------
create table if not exists evolution_records (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references clients(id) on delete cascade,
  professional_id uuid references professionals(id) on delete set null,
  session_id      uuid,          -- liga à sessão se houver (FK adiada abaixo)
  record_date     date not null default current_date,
  content         text,          -- evolução clínica (sensível)
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists idx_evolution_client on evolution_records(client_id);
drop trigger if exists trg_evolution_touch on evolution_records;
create trigger trg_evolution_touch before update on evolution_records for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- package_types + packages
-- ----------------------------------------------------------------------------
create table if not exists package_types (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  default_sessions      int,
  default_price         numeric(10,2),
  default_validity_days int,
  active                boolean not null default true,
  created_at            timestamptz not null default now()
);

create table if not exists packages (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid not null references clients(id) on delete cascade,
  package_type_id    uuid references package_types(id) on delete set null,
  total_sessions     int not null check (total_sessions >= 0),
  used_sessions      int not null default 0 check (used_sessions >= 0),
  remaining_sessions int generated always as (total_sessions - used_sessions) stored,
  price              numeric(10,2),
  start_date         date not null default current_date,
  due_date           date,
  status             package_status not null default 'ativo',
  auto_renew         boolean not null default false,  -- recorrência (concorrentes)
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index if not exists idx_packages_client on packages(client_id);
create index if not exists idx_packages_status on packages(status);
drop trigger if exists trg_packages_touch on packages;
create trigger trg_packages_touch before update on packages for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- sessions (agenda + execução)
-- ----------------------------------------------------------------------------
create table if not exists sessions (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references clients(id) on delete cascade,
  package_id       uuid references packages(id) on delete set null,
  professional_id  uuid references professionals(id) on delete set null,
  scheduled_at     timestamptz not null,
  duration_min     int not null default 50,
  status           session_status not null default 'agendada',
  consumed_session boolean not null default false,
  checked_in_at    timestamptz,                     -- check-in (concorrentes)
  notes            text,                            -- visível ao paciente
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_sessions_client on sessions(client_id);
create index if not exists idx_sessions_day on sessions(scheduled_at);
create index if not exists idx_sessions_status on sessions(status);
drop trigger if exists trg_sessions_touch on sessions;
create trigger trg_sessions_touch before update on sessions for each row execute function public.touch_updated_at();

-- FK adiada de evolution_records -> sessions
do $$ begin
  alter table evolution_records
    add constraint fk_evolution_session foreign key (session_id)
    references sessions(id) on delete set null;
exception when duplicate_object then null; end $$;

-- evolução clínica detalhada da sessão (admin-only) — separada de `notes`
create table if not exists session_private (
  session_id     uuid primary key references sessions(id) on delete cascade,
  clinical_notes text,
  updated_at     timestamptz not null default now()
);
drop trigger if exists trg_session_private_touch on session_private;
create trigger trg_session_private_touch before update on session_private for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- reschedule_requests — paciente PEDE, admin aprova (self-service controlado)
-- ----------------------------------------------------------------------------
create table if not exists reschedule_requests (
  id            uuid primary key default gen_random_uuid(),
  session_id    uuid not null references sessions(id) on delete cascade,
  client_id     uuid not null references clients(id) on delete cascade,
  kind          request_kind not null default 'remarcacao',
  requested_for timestamptz,                 -- novo horário pedido (se remarcação)
  reason        text,
  status        request_status not null default 'pendente',
  resolved_by   uuid references profiles(id) on delete set null,
  resolved_at   timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists idx_reschedule_client on reschedule_requests(client_id);
create index if not exists idx_reschedule_status on reschedule_requests(status);

-- ----------------------------------------------------------------------------
-- payments — NUNCA guardar dados de cartão. Só metadados + IDs do gateway.
-- (PCI: a tokenização fica no gateway; aqui só referência.)
-- ----------------------------------------------------------------------------
create table if not exists payments (
  id                uuid primary key default gen_random_uuid(),
  client_id         uuid not null references clients(id) on delete cascade,
  package_id        uuid references packages(id) on delete set null,
  amount_due        numeric(10,2) not null default 0,
  amount_paid       numeric(10,2) not null default 0,
  method            payment_method,
  status            payment_status not null default 'pendente',
  due_date          date,
  paid_at           timestamptz,
  gateway           text,                    -- 'asaas' | 'mercadopago' | null(manual)
  gateway_charge_id text,                    -- id da cobrança no gateway (NÃO é cartão)
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_payments_client on payments(client_id);
create index if not exists idx_payments_status on payments(status);
drop trigger if exists trg_payments_touch on payments;
create trigger trg_payments_touch before update on payments for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- notifications (histórico WhatsApp)
-- ----------------------------------------------------------------------------
create table if not exists notifications (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid references clients(id) on delete cascade,
  type       text,
  channel    text not null default 'whatsapp',
  template   text,
  payload    jsonb,
  status     text not null default 'pendente',
  sent_at    timestamptz,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- content_posts — integração com o blog do site (espelho/links) + posts internos
-- ----------------------------------------------------------------------------
create table if not exists content_posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique,
  excerpt      text,
  body         text,
  cover_url    text,
  source       text not null default 'internal', -- 'site' (espelho do blog) | 'internal'
  audience     text not null default 'client',    -- 'client' | 'public'
  external_url text,                               -- link pro post no site público
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
drop trigger if exists trg_content_touch on content_posts;
create trigger trg_content_touch before update on content_posts for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- settings (linha única) — políticas configuráveis
-- ----------------------------------------------------------------------------
create table if not exists settings (
  id                       int primary key default 1 check (id = 1),
  studio_name              text not null default 'Studio Rubi',
  pix_key                  text,
  whatsapp_number          text,
  falta_consome_sessao     boolean not null default false, -- política de no-show
  janela_remarcacao_horas  int not null default 24,        -- antecedência mínima
  lembrete_horas_antes     int not null default 24,
  brand                    jsonb,
  updated_at               timestamptz not null default now()
);
insert into settings (id) values (1) on conflict (id) do nothing;
drop trigger if exists trg_settings_touch on settings;
create trigger trg_settings_touch before update on settings for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- Helpers de papel (security definer) — usados pelo RLS
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role in ('admin','professional'));
$$;

create or replace function public.my_client_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from clients where profile_id = auth.uid();
$$;

-- ----------------------------------------------------------------------------
-- Trigger: novo usuário Auth -> cria profile (role client)
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', null), 'client')
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Trigger: marcar 'realizada' desconta 1 do pacote (idempotente + estorno)
-- ----------------------------------------------------------------------------
create or replace function public.consume_session_on_done()
returns trigger language plpgsql security definer set search_path = public as $$
declare consome_falta boolean;
begin
  select falta_consome_sessao into consome_falta from settings where id = 1;

  -- realizada (ou falta que consome) -> desconta uma vez
  if (new.status = 'realizada' or (new.status = 'falta' and consome_falta))
     and new.consumed_session = false and new.package_id is not null then
    update packages set used_sessions = used_sessions + 1 where id = new.package_id;
    new.consumed_session := true;
  end if;

  -- reverteu -> estorna
  if old.consumed_session = true and new.consumed_session = true
     and new.status not in ('realizada','falta') and new.package_id is not null then
    update packages set used_sessions = greatest(used_sessions - 1, 0) where id = new.package_id;
    new.consumed_session := false;
  end if;

  return new;
end $$;
drop trigger if exists trg_consume_session on sessions;
create trigger trg_consume_session before update on sessions
  for each row execute function public.consume_session_on_done();
