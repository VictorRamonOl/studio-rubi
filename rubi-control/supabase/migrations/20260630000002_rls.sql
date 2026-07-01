-- ============================================================================
-- Studio Rubi · 0002 · Row Level Security
-- Default-deny: habilitar RLS sem policy já bloqueia tudo. As policies abrem
-- só o necessário. anon/authenticated só enxergam via estas regras.
-- ============================================================================

alter table profiles            enable row level security;
alter table professionals       enable row level security;
alter table clients             enable row level security;
alter table client_private      enable row level security;
alter table evolution_records   enable row level security;
alter table package_types       enable row level security;
alter table packages            enable row level security;
alter table sessions            enable row level security;
alter table session_private     enable row level security;
alter table reschedule_requests enable row level security;
alter table payments            enable row level security;
alter table notifications       enable row level security;
alter table content_posts       enable row level security;
alter table settings            enable row level security;

-- forçar RLS até para o owner das tabelas (defesa extra)
alter table client_private      force row level security;
alter table session_private     force row level security;
alter table evolution_records   force row level security;
alter table payments            force row level security;

-- ---------- profiles ----------
drop policy if exists profiles_self_read on profiles;
create policy profiles_self_read on profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_admin_all on profiles;
create policy profiles_admin_all on profiles for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists profiles_self_update on profiles;
create policy profiles_self_update on profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));
-- ^ paciente pode editar o próprio profile, mas NÃO pode trocar o próprio papel.

-- ---------- professionals ----------
drop policy if exists professionals_admin_all on professionals;
create policy professionals_admin_all on professionals for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists professionals_read on professionals;
create policy professionals_read on professionals for select using (active = true);

-- ---------- clients ----------
drop policy if exists clients_admin_all on clients;
create policy clients_admin_all on clients for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists clients_self_read on clients;
create policy clients_self_read on clients for select using (profile_id = auth.uid());

-- ---------- client_private (ADMIN ONLY) ----------
drop policy if exists client_private_admin_all on client_private;
create policy client_private_admin_all on client_private for all using (public.is_admin()) with check (public.is_admin());

-- ---------- evolution_records (STAFF ONLY: admin + professional) ----------
drop policy if exists evolution_staff_all on evolution_records;
create policy evolution_staff_all on evolution_records for all using (public.is_staff()) with check (public.is_staff());

-- ---------- package_types ----------
drop policy if exists package_types_admin_all on package_types;
create policy package_types_admin_all on package_types for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists package_types_read on package_types;
create policy package_types_read on package_types for select using (active = true);

-- ---------- packages ----------
drop policy if exists packages_admin_all on packages;
create policy packages_admin_all on packages for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists packages_self_read on packages;
create policy packages_self_read on packages for select using (client_id = public.my_client_id());

-- ---------- sessions (paciente só lê o próprio; escreve via reschedule_requests) ----------
drop policy if exists sessions_admin_all on sessions;
create policy sessions_admin_all on sessions for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists sessions_self_read on sessions;
create policy sessions_self_read on sessions for select using (client_id = public.my_client_id());

-- ---------- session_private (ADMIN ONLY) ----------
drop policy if exists session_private_admin_all on session_private;
create policy session_private_admin_all on session_private for all using (public.is_admin()) with check (public.is_admin());

-- ---------- reschedule_requests (paciente CRIA e lê os próprios; admin resolve) ----------
drop policy if exists reschedule_admin_all on reschedule_requests;
create policy reschedule_admin_all on reschedule_requests for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists reschedule_self_read on reschedule_requests;
create policy reschedule_self_read on reschedule_requests for select using (client_id = public.my_client_id());
drop policy if exists reschedule_self_insert on reschedule_requests;
create policy reschedule_self_insert on reschedule_requests for insert
  with check (
    client_id = public.my_client_id()
    and status = 'pendente'                         -- não pode auto-aprovar
    and exists (select 1 from sessions s where s.id = session_id and s.client_id = public.my_client_id())
  );

-- ---------- payments (paciente só LÊ o próprio; nunca escreve) ----------
drop policy if exists payments_admin_all on payments;
create policy payments_admin_all on payments for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists payments_self_read on payments;
create policy payments_self_read on payments for select using (client_id = public.my_client_id());

-- ---------- notifications (admin only) ----------
drop policy if exists notifications_admin_all on notifications;
create policy notifications_admin_all on notifications for all using (public.is_admin()) with check (public.is_admin());

-- ---------- content_posts (paciente lê publicados) ----------
drop policy if exists content_admin_all on content_posts;
create policy content_admin_all on content_posts for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists content_read_published on content_posts;
create policy content_read_published on content_posts for select using (published = true);

-- ---------- settings (admin total; todos leem pix/whatsapp/políticas) ----------
drop policy if exists settings_admin_all on settings;
create policy settings_admin_all on settings for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists settings_read on settings;
create policy settings_read on settings for select using (true);

-- ============================================================================
-- Promover a gestora a admin (rodar UMA vez, trocando o e-mail):
--   update profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'esposa@exemplo.com');
-- ============================================================================
