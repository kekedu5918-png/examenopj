-- Phase 2F.2 — URL module « cadres d'enquête » : alignement sur fiche `enquete-preliminaire`

update public.learning_nodes
set href = '/fondamentaux/enquete-preliminaire'
where href = '/fondamentaux/cadres-enquete';

update learning_path.lessons
set href = '/fondamentaux/enquete-preliminaire'
where href = '/fondamentaux/cadres-enquete';
