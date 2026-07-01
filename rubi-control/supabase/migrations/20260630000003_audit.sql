-- ============================================================================
-- Studio Rubi · 0003 · Auditoria (append-only) sobre dados sensíveis/financeiros
-- Registra QUEM alterou O QUÊ em payments, client_private, session_private,
-- evolution_records, packages, profiles. Tabela é só-append: ninguém edita/apaga.
-- ============================================================================

create table if not exists audit_logs (
  id          bigint generated always as identity primary key,
  actor_id    uuid,
  action      text not null,           -- INSERT | UPDATE | DELETE
  table_name  text not null,
  row_id      text,
  diff        jsonb,                    -- mudanças (sem expor o registro inteiro)
  at          timestamptz not null default now()
);
create index if not exists idx_audit_table_at on audit_logs(table_name, at desc);

alter table audit_logs enable row level security;
alter table audit_logs force row level security;

-- admin só LÊ. Ninguém insere/edita/apaga via API (só o trigger security definer).
drop policy if exists audit_admin_read on audit_logs;
create policy audit_admin_read on audit_logs for select using (public.is_admin());

-- gatilho genérico de auditoria
create or replace function public.audit_trigger()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_row_id text;
  v_diff   jsonb;
begin
  v_row_id := coalesce(
    (case when tg_op = 'DELETE' then (to_jsonb(old)->>'id') else (to_jsonb(new)->>'id') end),
    null
  );

  if tg_op = 'UPDATE' then
    -- só as chaves que mudaram (evita copiar dado sensível inteiro à toa)
    select jsonb_object_agg(key, jsonb_build_object('de', old_v, 'para', new_v))
      into v_diff
    from (
      select key, to_jsonb(old)->key as old_v, to_jsonb(new)->key as new_v
      from jsonb_object_keys(to_jsonb(new)) as t(key)
    ) s
    where old_v is distinct from new_v;
  elsif tg_op = 'INSERT' then
    v_diff := jsonb_build_object('criado', true);
  else
    v_diff := jsonb_build_object('removido', true);
  end if;

  insert into audit_logs (actor_id, action, table_name, row_id, diff)
  values (auth.uid(), tg_op, tg_table_name, v_row_id, v_diff);

  return coalesce(new, old);
end $$;

-- aplica nas tabelas sensíveis/financeiras
do $$
declare t text;
begin
  foreach t in array array[
    'payments','client_private','session_private','evolution_records','packages','profiles'
  ] loop
    execute format('drop trigger if exists trg_audit_%1$s on %1$s;', t);
    execute format(
      'create trigger trg_audit_%1$s after insert or update or delete on %1$s
         for each row execute function public.audit_trigger();', t);
  end loop;
end $$;
