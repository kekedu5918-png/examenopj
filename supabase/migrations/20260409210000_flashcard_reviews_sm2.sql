-- Ajout des colonnes SM-2 sur flashcard_reviews pour la répétition espacée.
-- ease_factor : facteur d'aisance (défaut 2.5, min 1.3)
-- interval_days : intervalle courant en jours (0 = jamais révisé)
-- next_review_at : prochaine révision recommandée

alter table public.flashcard_reviews
  add column if not exists ease_factor numeric(4,2) not null default 2.5,
  add column if not exists interval_days int not null default 0,
  add column if not exists next_review_at timestamptz;

create index if not exists idx_flashcard_reviews_next_review
  on public.flashcard_reviews (user_id, next_review_at);
