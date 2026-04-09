-- Onboarding utilisateur : stocke les réponses + plan généré
create table if not exists public.onboarding_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,

  stage integer default 1 check (stage between 1 and 5),
  completed boolean default false,

  -- Réponses étape 1
  formation_phase text check (formation_phase in ('early', 'mid', 'late')),

  -- Réponses étape 2
  strengths jsonb default '[]'::jsonb,
  weaknesses jsonb default '[]'::jsonb,

  -- Réponses diagnostic (étape 3)
  diagnostic_answers jsonb default '[]'::jsonb,
  diagnostic_level text check (diagnostic_level in ('Novice', 'Débutant', 'Intermédiaire', 'Expert')),
  diagnostic_score integer check (diagnostic_score between 0 and 5),

  -- Plan généré
  generated_plan jsonb,

  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone,

  constraint onboarding_progress_user_id_key unique (user_id)
);

create index if not exists idx_onboarding_progress_user_id on public.onboarding_progress(user_id);
create index if not exists idx_onboarding_progress_completed on public.onboarding_progress(user_id, completed);

alter table public.onboarding_progress enable row level security;

create policy "Users can read own onboarding"
  on public.onboarding_progress for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own onboarding"
  on public.onboarding_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own onboarding"
  on public.onboarding_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admin manage onboarding"
  on public.onboarding_progress for all
  using (public.is_admin())
  with check (public.is_admin());
