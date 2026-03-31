create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Modules de cours
create table if not exists public.modules (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  titre text not null,
  description text,
  ordre integer default 0,
  icone text default 'book',
  couleur text default '#3b82f6',
  created_at timestamp with time zone default now()
);

-- Chapitres d'un module
create table if not exists public.chapitres (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade,
  titre text not null,
  contenu jsonb,
  articles text[],
  pieges_examen text[],
  ordre integer,
  difficulte text check (difficulte in ('facile', 'moyen', 'difficile'))
);

-- Questions QCM
create table if not exists public.questions (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade,
  chapitre_id uuid references public.chapitres(id) on delete cascade,
  question text not null,
  options jsonb not null,
  reponse_correcte integer not null check (reponse_correcte >= 0 and reponse_correcte < 4),
  explication text,
  article_ref text,
  difficulte text check (difficulte in ('facile', 'moyen', 'difficile')),
  source_fascicule text
);

-- Flashcards
create table if not exists public.flashcards (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade,
  recto text not null,
  verso text not null,
  article_ref text,
  difficulte text check (difficulte in ('facile', 'moyen', 'difficile'))
);

-- Progression utilisateur
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  flashcard_id uuid references public.flashcards(id) on delete set null,
  resultat integer check (resultat >= 0 and resultat <= 5),
  sm2_interval integer default 1,
  sm2_efactor decimal default 2.5,
  next_review date,
  created_at timestamp with time zone default now()
);

create index if not exists idx_chapitres_module_id on public.chapitres(module_id);
create index if not exists idx_questions_module_id on public.questions(module_id);
create index if not exists idx_questions_chapitre_id on public.questions(chapitre_id);
create index if not exists idx_flashcards_module_id on public.flashcards(module_id);
create index if not exists idx_user_progress_user_id on public.user_progress(user_id);
create index if not exists idx_user_progress_question_id on public.user_progress(question_id);
create index if not exists idx_user_progress_flashcard_id on public.user_progress(flashcard_id);

alter table public.modules enable row level security;
alter table public.chapitres enable row level security;
alter table public.questions enable row level security;
alter table public.flashcards enable row level security;
alter table public.user_progress enable row level security;

-- Lecture pour utilisateurs authentifies
create policy "Authenticated users can read modules"
on public.modules
for select
using (auth.role() = 'authenticated');

create policy "Authenticated users can read chapitres"
on public.chapitres
for select
using (auth.role() = 'authenticated');

create policy "Authenticated users can read questions"
on public.questions
for select
using (auth.role() = 'authenticated');

create policy "Authenticated users can read flashcards"
on public.flashcards
for select
using (auth.role() = 'authenticated');

-- User progress: chaque utilisateur gere sa progression
create policy "Users can read own progress"
on public.user_progress
for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own progress"
on public.user_progress
for insert
with check (auth.uid() = user_id or public.is_admin());

create policy "Users can update own progress"
on public.user_progress
for update
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

create policy "Users can delete own progress"
on public.user_progress
for delete
using (auth.uid() = user_id or public.is_admin());

-- Admin: acces total sur toutes les tables ExamenOPJ
create policy "Admin manage modules"
on public.modules
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage chapitres"
on public.chapitres
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage questions"
on public.questions
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage flashcards"
on public.flashcards
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage user progress"
on public.user_progress
for all
using (public.is_admin())
with check (public.is_admin());
