-- Learning Path OPJ (schéma learning_path) — idempotent, safe re-run.
-- Évite public.modules / public.user_progress (cours & QCM existants).

create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

create schema if not exists learning_path;

grant usage on schema learning_path to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists learning_path.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  color text not null,
  icon text not null,
  order_index int not null,
  total_lessons int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists learning_path.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references learning_path.modules (id) on delete cascade,
  slug text not null,
  client_key text unique,
  title text not null,
  type text not null
    check (type in ('discover', 'practice', 'consolidate', 'case', 'exam')),
  order_index int not null,
  xp_reward int not null default 10,
  min_score_unlock int not null default 80,
  estimated_minutes int not null default 5,
  href text,
  created_at timestamptz not null default now(),
  unique (module_id, slug)
);

create index if not exists idx_learning_path_lessons_module on learning_path.lessons (module_id, order_index);
create index if not exists idx_learning_path_lessons_client_key on learning_path.lessons (client_key)
  where client_key is not null;

create table if not exists learning_path.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references learning_path.lessons (id) on delete cascade,
  score int not null default 0 check (score between 0 and 100),
  attempts int not null default 0,
  completed_at timestamptz,
  needs_review_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists idx_lp_user_progress_user on learning_path.user_progress (user_id);
create index if not exists idx_lp_user_progress_lesson on learning_path.user_progress (lesson_id);
create index if not exists idx_lp_user_progress_review on learning_path.user_progress (user_id, needs_review_at)
  where needs_review_at is not null;

create table if not exists learning_path.user_streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_activity_date date,
  streak_freeze_available int not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists learning_path.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount int not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_lp_xp_events_user on learning_path.xp_events (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table learning_path.modules enable row level security;
alter table learning_path.lessons enable row level security;
alter table learning_path.user_progress enable row level security;
alter table learning_path.user_streaks enable row level security;
alter table learning_path.xp_events enable row level security;

-- Catalogue modules / leçons : lecture connectée
drop policy if exists "lp_modules_select_auth" on learning_path.modules;
create policy "lp_modules_select_auth"
  on learning_path.modules for select
  to authenticated
  using (true);

drop policy if exists "lp_lessons_select_auth" on learning_path.lessons;
create policy "lp_lessons_select_auth"
  on learning_path.lessons for select
  to authenticated
  using (true);

-- user_progress — SELECT / INSERT / UPDATE / DELETE
drop policy if exists "lp_user_progress_select_own" on learning_path.user_progress;
create policy "lp_user_progress_select_own"
  on learning_path.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "lp_user_progress_insert_own" on learning_path.user_progress;
create policy "lp_user_progress_insert_own"
  on learning_path.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "lp_user_progress_update_own" on learning_path.user_progress;
create policy "lp_user_progress_update_own"
  on learning_path.user_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "lp_user_progress_delete_own" on learning_path.user_progress;
create policy "lp_user_progress_delete_own"
  on learning_path.user_progress for delete
  to authenticated
  using (auth.uid() = user_id);

-- user_streaks — SELECT / INSERT / UPDATE / DELETE
drop policy if exists "lp_user_streaks_select_own" on learning_path.user_streaks;
create policy "lp_user_streaks_select_own"
  on learning_path.user_streaks for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "lp_user_streaks_insert_own" on learning_path.user_streaks;
create policy "lp_user_streaks_insert_own"
  on learning_path.user_streaks for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "lp_user_streaks_update_own" on learning_path.user_streaks;
create policy "lp_user_streaks_update_own"
  on learning_path.user_streaks for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "lp_user_streaks_delete_own" on learning_path.user_streaks;
create policy "lp_user_streaks_delete_own"
  on learning_path.user_streaks for delete
  to authenticated
  using (auth.uid() = user_id);

-- xp_events — SELECT / INSERT / UPDATE / DELETE
drop policy if exists "lp_xp_events_select_own" on learning_path.xp_events;
create policy "lp_xp_events_select_own"
  on learning_path.xp_events for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "lp_xp_events_insert_own" on learning_path.xp_events;
create policy "lp_xp_events_insert_own"
  on learning_path.xp_events for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "lp_xp_events_update_own" on learning_path.xp_events;
create policy "lp_xp_events_update_own"
  on learning_path.xp_events for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "lp_xp_events_delete_own" on learning_path.xp_events;
create policy "lp_xp_events_delete_own"
  on learning_path.xp_events for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

grant select on learning_path.modules to authenticated;
grant select on learning_path.lessons to authenticated;
grant select, insert, update, delete on learning_path.user_progress to authenticated;
grant select, insert, update, delete on learning_path.user_streaks to authenticated;
grant select, insert, update, delete on learning_path.xp_events to authenticated;

grant all on all tables in schema learning_path to service_role;

-- ---------------------------------------------------------------------------
-- Seed modules (7)
-- ---------------------------------------------------------------------------

insert into learning_path.modules (slug, title, description, color, icon, order_index)
values
  ('gav', 'Garde à Vue', 'Placement, droits, durée et régimes spéciaux', '#3b82f6', '🔵', 1),
  ('audition', 'Audition & Interrogatoire', 'Audition libre, PV, témoin assisté', '#8b5cf6', '🟣', 2),
  ('perquisitions', 'Perquisitions & Saisies', 'Cadre légal, nuit, informatique', '#ef4444', '🔴', 3),
  ('acteurs', 'Acteurs Judiciaires', 'OPJ, APJ, Parquet, JLD, JI', '#f59e0b', '🟡', 4),
  ('infractions', 'Infractions & Qualifications', 'Crime, délit, complicité, récidive', '#f97316', '🟠', 5),
  ('procedure', 'Flagrance & Préliminaire', 'Critères, durée, pouvoirs OPJ', '#22c55e', '🟢', 6),
  ('nullites', 'Nullités & Voies de Recours', 'Forme, fond, mémoire, cassation', '#94a3b8', '⚪', 7)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Seed lessons (35) — IDs stables (uuid v5)
-- ---------------------------------------------------------------------------

insert into learning_path.lessons (
  id, module_id, slug, client_key, title, type, order_index,
  xp_reward, min_score_unlock, estimated_minutes, href
)
select
  uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'lp-lesson:' || v.client_key),
  m.id,
  v.slug,
  v.client_key,
  v.title,
  v.lesson_type,
  v.order_index,
  v.xp_reward,
  v.min_score_unlock,
  v.estimated_minutes,
  v.href
from learning_path.modules m
join (
  values
    ('gav', 'gav-1', 'gav-1', 'Découverte — cadre légal', 'discover', 1, 10, 80, 12, '/fondamentaux/garde-a-vue'),
    ('gav', 'gav-2', 'gav-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('gav', 'gav-3', 'gav-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('gav', 'gav-4', 'gav-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/cours/enquetes'),
    ('gav', 'gav-5', 'gav-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/quiz'),
    ('audition', 'aud-1', 'aud-1', 'Découverte — fiche audition', 'discover', 1, 10, 80, 12, '/fondamentaux/audition'),
    ('audition', 'aud-2', 'aud-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('audition', 'aud-3', 'aud-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('audition', 'aud-4', 'aud-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/cours/enquetes/alpha'),
    ('audition', 'aud-5', 'aud-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/entrainement/articulation'),
    ('perquisitions', 'per-1', 'per-1', 'Découverte — perquisition', 'discover', 1, 10, 80, 12, '/fondamentaux/perquisition'),
    ('perquisitions', 'per-2', 'per-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('perquisitions', 'per-3', 'per-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('perquisitions', 'per-4', 'per-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/cours/enquetes'),
    ('perquisitions', 'per-5', 'per-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/quiz'),
    ('acteurs', 'act-1', 'act-1', 'Découverte — OPJ / APJ / APJA', 'discover', 1, 10, 80, 12, '/fondamentaux/opj-apj-apja'),
    ('acteurs', 'act-2', 'act-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('acteurs', 'act-3', 'act-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('acteurs', 'act-4', 'act-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/epreuves/epreuve-2'),
    ('acteurs', 'act-5', 'act-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/quiz'),
    ('infractions', 'inf-1', 'inf-1', 'Découverte — référentiel', 'discover', 1, 10, 80, 12, '/infractions'),
    ('infractions', 'inf-2', 'inf-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('infractions', 'inf-3', 'inf-3', 'Flashcards', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('infractions', 'inf-4', 'inf-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/fondamentaux'),
    ('infractions', 'inf-5', 'inf-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/quiz'),
    ('procedure', 'fla-1', 'fla-1', 'Découverte — cadres d’enquête', 'discover', 1, 10, 80, 12, '/fondamentaux/cadres-enquete'),
    ('procedure', 'fla-2', 'fla-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('procedure', 'fla-3', 'fla-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('procedure', 'fla-4', 'fla-4', 'Enquêtes Alpha→Charlie', 'case', 4, 15, 80, 25, '/cours/enquetes'),
    ('procedure', 'fla-5', 'fla-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/sujets-blancs'),
    ('nullites', 'nul-1', 'nul-1', 'Découverte — nullités', 'discover', 1, 10, 80, 12, '/fondamentaux/nullites'),
    ('nullites', 'nul-2', 'nul-2', 'QCM guidé', 'practice', 2, 10, 80, 15, '/quiz'),
    ('nullites', 'nul-3', 'nul-3', 'Consolidation', 'consolidate', 3, 10, 80, 10, '/flashcards'),
    ('nullites', 'nul-4', 'nul-4', 'Cas pratique', 'case', 4, 15, 80, 25, '/epreuves/epreuve-3'),
    ('nullites', 'nul-5', 'nul-5', 'Mini-examen', 'exam', 5, 20, 80, 20, '/quiz')
) as v(
  module_slug,
  slug,
  client_key,
  title,
  lesson_type,
  order_index,
  xp_reward,
  min_score_unlock,
  estimated_minutes,
  href
)
  on m.slug = v.module_slug
on conflict (id) do nothing;

-- Compteur par module (tous les modules, y compris 0 leçon)
update learning_path.modules m
set total_lessons = coalesce(
  (select count(*)::int from learning_path.lessons l where l.module_id = m.id),
  0
);
