-- ─────────────────────────────────────────────
-- User streaks (server-side, survives localStorage clears)
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_streaks (
  id                 uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            uuid         NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak     integer      NOT NULL DEFAULT 0,
  longest_streak     integer      NOT NULL DEFAULT 0,
  last_activity_date date,
  streak_start_date  date,
  total_sessions     integer      NOT NULL DEFAULT 0,
  created_at         timestamptz  DEFAULT now(),
  updated_at         timestamptz  DEFAULT now()
);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_streaks: owner full access"
  ON public.user_streaks
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- User badges (immutable once earned)
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_badges (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id   text        NOT NULL,
  earned_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_badges: owner full access"
  ON public.user_badges
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for fast per-user queries
CREATE INDEX IF NOT EXISTS user_streaks_user_id_idx  ON public.user_streaks (user_id);
CREATE INDEX IF NOT EXISTS user_badges_user_id_idx   ON public.user_badges  (user_id);
