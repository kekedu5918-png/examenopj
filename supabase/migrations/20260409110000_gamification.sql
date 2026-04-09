-- Streaks quotidiens côté serveur
create table if not exists public.user_streaks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,

  current_streak integer default 0,
  longest_streak integer default 0,

  last_session_date date,
  streak_start_date date,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),

  constraint user_streaks_user_id_key unique (user_id)
);

create index if not exists idx_user_streaks_user_id on public.user_streaks(user_id);

-- Badges utilisateur (earned + in-progress)
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,

  earned boolean default false,
  earned_at timestamp with time zone,

  current_progress integer default 0,
  target_progress integer default 0,

  created_at timestamp with time zone default now(),

  constraint user_badges_user_badge_key unique (user_id, badge_id)
);

create index if not exists idx_user_badges_user_id on public.user_badges(user_id);
create index if not exists idx_user_badges_earned on public.user_badges(user_id, earned);

-- RLS streaks
alter table public.user_streaks enable row level security;

create policy "Users can read own streak"
  on public.user_streaks for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own streak"
  on public.user_streaks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own streak"
  on public.user_streaks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admin manage streaks"
  on public.user_streaks for all
  using (public.is_admin())
  with check (public.is_admin());

-- RLS badges
alter table public.user_badges enable row level security;

create policy "Users can read own badges"
  on public.user_badges for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own badges"
  on public.user_badges for insert
  with check (auth.uid() = user_id);

create policy "Users can update own badges"
  on public.user_badges for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admin manage badges"
  on public.user_badges for all
  using (public.is_admin())
  with check (public.is_admin());
