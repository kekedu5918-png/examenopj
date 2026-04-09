-- SM-2 Spaced Repetition schedule per user per content item
-- content_id = string ID from static data (flashcard IDs like 'fc-f02-vol-legal')
-- content_type = 'flashcard' | 'question' | 'infraction'

create table if not exists public.user_review_schedule (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  content_id text not null,
  content_type text not null default 'flashcard'
    check (content_type in ('flashcard', 'question', 'infraction')),

  -- SM-2 state
  easiness_factor numeric(4, 3) not null default 2.500,
  interval_days integer not null default 0,
  repetitions integer not null default 0,

  -- Tracking
  last_reviewed_at timestamp with time zone,
  next_review_date date,
  quality_last_review smallint check (quality_last_review between 0 and 5),

  -- Stats
  total_attempts integer not null default 0,
  correct_attempts integer not null default 0,
  success_rate numeric(5, 2) not null default 0,

  -- Status: new → learning → reviewing → mastered
  status text not null default 'new'
    check (status in ('new', 'learning', 'reviewing', 'mastered')),

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),

  unique (user_id, content_id, content_type)
);

create index if not exists idx_urs_user_next_review
  on public.user_review_schedule (user_id, next_review_date);

create index if not exists idx_urs_user_status
  on public.user_review_schedule (user_id, status);

alter table public.user_review_schedule enable row level security;

create policy "Users can read own review schedule"
on public.user_review_schedule for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own review schedule"
on public.user_review_schedule for insert
with check (auth.uid() = user_id or public.is_admin());

create policy "Users can update own review schedule"
on public.user_review_schedule for update
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

-- ─────────────────────────────────────────────
-- Per-review audit log
-- ─────────────────────────────────────────────

create table if not exists public.review_history (
  id uuid default gen_random_uuid() primary key,
  schedule_id uuid not null references public.user_review_schedule (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  quality smallint not null check (quality between 0 and 5),
  time_spent_seconds integer,
  correct boolean not null,
  response_text text,
  reviewed_at timestamp with time zone default now()
);

create index if not exists idx_rh_user_reviewed_at
  on public.review_history (user_id, reviewed_at desc);

create index if not exists idx_rh_schedule_id
  on public.review_history (schedule_id);

alter table public.review_history enable row level security;

create policy "Users can read own review history"
on public.review_history for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own review history"
on public.review_history for insert
with check (auth.uid() = user_id or public.is_admin());
