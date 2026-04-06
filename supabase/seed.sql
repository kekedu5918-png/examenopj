-- ExamenOPJ seed data
-- 3 modules, 9 chapitres, 30 questions, 60 flashcards

delete from public.user_progress;
delete from public.questions;
delete from public.flashcards;
delete from public.chapitres;
delete from public.modules;

insert into public.modules (slug, titre, description, ordre, icone, couleur)
values
  ('procedure-penale', 'Procedure penale', 'Fondamentaux de la procedure penale', 1, 'scale', '#3b82f6'),
  ('droit-penal-general', 'Droit penal general', 'Principes generaux du droit penal', 2, 'gavel', '#ef4444'),
  ('infractions-personnes', 'Infractions personnes', 'Infractions contre les personnes', 3, 'shield', '#10b981');

with module_list as (
  select id, slug, titre
  from public.modules
  where slug in ('procedure-penale', 'droit-penal-general', 'infractions-personnes')
)
insert into public.chapitres (module_id, titre, contenu, articles, pieges_examen, ordre, difficulte)
select
  m.id,
  'Chapitre ' || g || ' - ' || m.titre,
  jsonb_build_object(
    'objectif', 'Maitriser les notions du chapitre ' || g,
    'resume', 'Contenu de test genere automatiquement'
  ),
  array['Art. ' || (100 + g), 'Art. ' || (200 + g)],
  array['Piege recurrent ' || g, 'Confusion classique ' || g],
  g,
  (array['facile', 'moyen', 'difficile'])[((g - 1) % 3) + 1]
from module_list m
cross join generate_series(1, 3) as g;

with module_list as (
  select id, slug, titre
  from public.modules
  where slug in ('procedure-penale', 'droit-penal-general', 'infractions-personnes')
)
insert into public.questions (
  module_id,
  chapitre_id,
  question,
  options,
  reponse_correcte,
  explication,
  article_ref,
  difficulte,
  source_fascicule
)
select
  m.id,
  c.id,
  'Q' || g || ' - ' || m.titre || ' : question de test',
  jsonb_build_array(
    'Option A - ' || m.slug || '-' || g,
    'Option B - ' || m.slug || '-' || g,
    'Option C - ' || m.slug || '-' || g,
    'Option D - ' || m.slug || '-' || g
  ),
  (g - 1) % 4,
  'Explication de test pour la question ' || g || ' du module ' || m.titre,
  'CPP-' || (300 + g),
  (array['facile', 'moyen', 'difficile'])[((g - 1) % 3) + 1],
  'Fascicule ' || m.titre
from module_list m
cross join generate_series(1, 10) as g
join lateral (
  select id
  from public.chapitres c
  where c.module_id = m.id
  order by c.ordre
  limit 1
  offset ((g - 1) % 3)
) c on true;

with module_list as (
  select id, slug, titre
  from public.modules
  where slug in ('procedure-penale', 'droit-penal-general', 'infractions-personnes')
)
insert into public.flashcards (module_id, recto, verso, article_ref, difficulte)
select
  m.id,
  'Flashcard ' || g || ' - ' || m.titre || ' (recto)',
  'Flashcard ' || g || ' - ' || m.titre || ' (verso, rappel de notion)',
  'ART-' || (400 + g),
  (array['facile', 'moyen', 'difficile'])[((g - 1) % 3) + 1]
from module_list m
cross join generate_series(1, 20) as g;
