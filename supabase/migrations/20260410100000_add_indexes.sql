-- Index for fast active subscription lookups per user
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status
  ON public.subscriptions (user_id, status);

-- Index for quiz attempts ordered by date (dashboards, streak checks)
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_created
  ON public.quiz_attempts (user_id, created_at DESC);
