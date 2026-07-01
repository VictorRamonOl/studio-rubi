-- ============================================================================
-- Studio Rubi · 0005 · Agenda v2 (recorrência, capacidade, profissional,
-- cortesia, home care). Aplicar no SQL Editor depois das anteriores.
-- ============================================================================

-- ---------- package_types: modalidade + capacidade ----------
alter table package_types add column if not exists modality text not null default 'individual';
alter table package_types add column if not exists capacity int not null default 1;

create unique index if not exists uq_package_types_name on package_types (lower(name));

-- catálogo padrão (idempotente)
insert into package_types (name, modality, capacity, default_sessions, default_validity_days, active)
values
  ('Pilates em grupo',  'pilates_grupo', 3, 8,  30, true),
  ('Pilates individual','individual',    1, 8,  30, true),
  ('Fisioterapia',      'fisio',         1, 10, 30, true),
  ('Home care',         'homecare',      1, 8,  30, true)
on conflict (lower(name)) do nothing;

-- ---------- packages: profissional, recorrência, cortesia ----------
alter table packages add column if not exists professional_id uuid references professionals(id) on delete set null;
alter table packages add column if not exists modality text not null default 'individual';
alter table packages add column if not exists capacity int not null default 1;
alter table packages add column if not exists weekdays text[];            -- ex: {SEG,QUA}
alter table packages add column if not exists session_time text;          -- 'HH:MM'
alter table packages add column if not exists duration_min int not null default 50;
alter table packages add column if not exists courtesy_total int not null default 1;
alter table packages add column if not exists courtesy_used int not null default 0;

-- ---------- sessions: home care ----------
alter table sessions add column if not exists is_homecare boolean not null default false;
alter table sessions add column if not exists location text;
create index if not exists idx_sessions_prof_slot on sessions(professional_id, scheduled_at);

-- ---------- profissionais (seed: Rubia + fisio) só se a tabela estiver vazia ----------
insert into professionals (full_name, specialty)
select x.n, x.s
from (values ('Rubia', 'pilates'), ('Fisioterapeuta', 'fisioterapia')) as x(n, s)
where not exists (select 1 from professionals);
