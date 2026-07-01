-- ============================================================================
-- Studio Rubi · 0004 · Anamnese (ficha de saúde) + regra de falta
-- Aplicar no SQL Editor depois das migrations anteriores.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- anamnesis — ficha de entrada do paciente (1 por cliente). DADO SENSÍVEL.
-- Evolução contínua fica em evolution_records (já existe).
-- ----------------------------------------------------------------------------
create table if not exists anamnesis (
  client_id         uuid primary key references clients(id) on delete cascade,
  main_complaint    text,   -- queixa principal / motivo
  objectives        text,   -- objetivos do paciente
  medical_history   text,   -- doenças / condições
  surgeries         text,   -- cirurgias
  medications       text,   -- medicamentos em uso
  injuries          text,   -- lesões / dores
  physical_activity text,   -- atividade física atual
  contraindications text,   -- restrições / contraindicações
  notes             text,   -- observações gerais
  updated_by        uuid references profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table anamnesis enable row level security;
alter table anamnesis force row level security;

-- staff-only (admin + professional). Paciente NUNCA acessa.
drop policy if exists anamnesis_staff_all on anamnesis;
create policy anamnesis_staff_all on anamnesis
  for all using (public.is_staff()) with check (public.is_staff());

drop trigger if exists trg_anamnesis_touch on anamnesis;
create trigger trg_anamnesis_touch before update on anamnesis
  for each row execute function public.touch_updated_at();

-- auditoria também na anamnese
drop trigger if exists trg_audit_anamnesis on anamnesis;
create trigger trg_audit_anamnesis after insert or update or delete on anamnesis
  for each row execute function public.audit_trigger();

-- ----------------------------------------------------------------------------
-- Regra da falta: "falta sem justificativa = sessão dada" (cobra do pacote).
-- Falta justificada NÃO cobra.
-- ----------------------------------------------------------------------------
alter table sessions
  add column if not exists falta_justificada boolean not null default false;

create or replace function public.consume_session_on_done()
returns trigger language plpgsql security definer set search_path = public as $$
declare deve_cobrar boolean;
begin
  -- cobra quando: realizada  OU  falta SEM justificativa
  deve_cobrar := (new.status = 'realizada')
              or (new.status = 'falta' and coalesce(new.falta_justificada, false) = false);

  -- aplica a baixa (uma única vez)
  if deve_cobrar and new.consumed_session = false and new.package_id is not null then
    update packages set used_sessions = used_sessions + 1 where id = new.package_id;
    new.consumed_session := true;
  end if;

  -- estorna se deixou de cobrar (reabriu, cancelou, ou justificou a falta)
  if (not deve_cobrar) and new.consumed_session = true and new.package_id is not null then
    update packages set used_sessions = greatest(used_sessions - 1, 0) where id = new.package_id;
    new.consumed_session := false;
  end if;

  return new;
end $$;

-- trigger já existe apontando pra essa função (migration 0001); nada a recriar.
