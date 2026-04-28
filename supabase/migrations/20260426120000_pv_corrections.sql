-- Historique des corrections PV (limite quotidienne côté API + analytics)
create table if not exists public.pv_corrections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  sujet_id text,
  pv_type text default 'atelier_redaction_pv',
  pv_text text not null,
  result jsonb not null,
  score smallint,
  created_at timestamptz not null default now()
);

create index if not exists pv_corrections_user_created_idx
  on public.pv_corrections (user_id, created_at desc);

alter table public.pv_corrections enable row level security;

drop policy if exists "Users insert own pv_corrections" on public.pv_corrections;
create policy "Users insert own pv_corrections"
  on public.pv_corrections for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users select own pv_corrections" on public.pv_corrections;
create policy "Users select own pv_corrections"
  on public.pv_corrections for select
  to authenticated
  using (auth.uid() = user_id);

grant select, insert on public.pv_corrections to authenticated;
