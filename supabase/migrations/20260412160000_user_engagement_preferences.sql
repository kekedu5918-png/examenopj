-- Préférences engagement (rappels email opt-in, etc.) — voir docs/ENGAGEMENT.md

create table if not exists public.user_engagement_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email_reminders_opt_in boolean not null default false,
  theme_hint text check (theme_hint in ('light', 'dark', 'system')),
  updated_at timestamp with time zone not null default now()
);

create index if not exists idx_user_engagement_prefs_email_opt_in
  on public.user_engagement_preferences (email_reminders_opt_in)
  where email_reminders_opt_in = true;

alter table public.user_engagement_preferences enable row level security;

create policy "Users read own engagement preferences"
  on public.user_engagement_preferences
  for select
  using (auth.uid() = user_id);

create policy "Users insert own engagement preferences"
  on public.user_engagement_preferences
  for insert
  with check (auth.uid() = user_id);

create policy "Users update own engagement preferences"
  on public.user_engagement_preferences
  for update
  using (auth.uid() = user_id);
