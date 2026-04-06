-- Liste d’attente examen blanc. Appliquer sur le projet Supabase (`supabase db push` ou SQL editor).
-- Le client admin (service role) contourne le RLS.
create table if not exists public.examen_blanc_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null
);

create unique index if not exists examen_blanc_waitlist_email_lower_idx on public.examen_blanc_waitlist (lower(email));

alter table public.examen_blanc_waitlist enable row level security;
