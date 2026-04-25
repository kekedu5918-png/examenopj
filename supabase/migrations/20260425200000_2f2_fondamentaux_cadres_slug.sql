-- Phase 2F.2 — Mise à jour des href fondamentaux post-2F.1.b
-- Aligne learning_path.lessons sur les nouveaux slugs des 46 chapitres
-- Note : public.learning_nodes n'existe pas, seule learning_path.lessons est concernée

UPDATE learning_path.lessons
SET href = '/fondamentaux/enquete-flagrance'
WHERE slug = 'fla-1' 
  AND href = '/fondamentaux/cadres-enquete';

UPDATE learning_path.lessons
SET href = '/fondamentaux/police-judiciaire-statut'
WHERE slug = 'act-1' 
  AND href = '/fondamentaux/opj-apj-apja';

UPDATE learning_path.lessons
SET href = '/fondamentaux/nullites-procedure'
WHERE slug = 'nul-1' 
  AND href = '/fondamentaux/nullites';

UPDATE learning_path.lessons
SET href = '/fondamentaux/auditions'
WHERE slug = 'aud-1' 
  AND href = '/fondamentaux/audition';
