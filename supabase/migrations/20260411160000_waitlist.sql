-- Liste d'attente centralisée (persistante). Accès via service role uniquement (RLS bloque les rôles client).
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'examen-blanc',
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email)
);

alter table public.waitlist enable row level security;

create policy "Service role only"
  on public.waitlist
  for all
  using (false)
  with check (false);
