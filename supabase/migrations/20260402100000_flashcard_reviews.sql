-- Progression flashcards (IDs texte = cartes locales `flashcards-data`, pas les UUID Supabase)

create table if not exists public.flashcard_reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id text not null,
  scope text not null default 'all',
  bucket text not null check (bucket in ('know', 'review', 'dontKnow')),
  updated_at timestamp with time zone default now(),
  unique (user_id, card_id, scope)
);

create index if not exists idx_flashcard_reviews_user_id on public.flashcard_reviews (user_id);
create index if not exists idx_flashcard_reviews_updated_at on public.flashcard_reviews (updated_at desc);

alter table public.flashcard_reviews enable row level security;

create policy "Users can read own flashcard reviews"
on public.flashcard_reviews
for select
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own flashcard reviews"
on public.flashcard_reviews
for insert
with check (auth.uid() = user_id or public.is_admin());

create policy "Users can update own flashcard reviews"
on public.flashcard_reviews
for update
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

create policy "Users can delete own flashcard reviews"
on public.flashcard_reviews
for delete
using (auth.uid() = user_id or public.is_admin());
