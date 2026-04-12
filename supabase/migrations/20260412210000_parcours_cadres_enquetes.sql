-- Progression du parcours « Cadres d'enquêtes » (sauvegarde par compte).
create table if not exists public.parcours_cadres_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  step_slug text not null,
  lesson_completed boolean not null default false,
  quiz_best_score int,
  quiz_passed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, step_slug)
);

create index if not exists idx_parcours_cadres_progress_user on public.parcours_cadres_progress (user_id);

alter table public.parcours_cadres_progress enable row level security;

create policy "parcours_cadres_select_own"
  on public.parcours_cadres_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "parcours_cadres_insert_own"
  on public.parcours_cadres_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "parcours_cadres_update_own"
  on public.parcours_cadres_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.parcours_cadres_progress to authenticated;
