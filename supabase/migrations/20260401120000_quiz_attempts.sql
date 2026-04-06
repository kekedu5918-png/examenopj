-- Historique des sessions de quiz (questions locales TS + compte connecté)

create table if not exists public.quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('global', 'fascicule', 'domain')),
  fascicule_num integer,
  domain_key text,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  percent numeric(5, 2) not null check (percent >= 0 and percent <= 100),
  created_at timestamp with time zone default now()
);

create index if not exists idx_quiz_attempts_user_id on public.quiz_attempts (user_id);
create index if not exists idx_quiz_attempts_created_at on public.quiz_attempts (created_at desc);

alter table public.quiz_attempts enable row level security;

create policy "Users can read own quiz attempts"
on public.quiz_attempts
for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own quiz attempts"
on public.quiz_attempts
for insert
with check (auth.uid() = user_id or public.is_admin());
