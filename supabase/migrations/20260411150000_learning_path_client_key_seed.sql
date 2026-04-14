-- Clés stables côté app (gav-1, …) + graines alignées sur src/data/learning-path-modules.ts
-- IDs de nœuds : uuid v5 (namespace fixe + chaîne) pour idempotence des migrations.

create extension if not exists "uuid-ossp";

alter table public.learning_nodes
  add column if not exists client_key text;

create unique index if not exists learning_nodes_client_key_uidx
  on public.learning_nodes (client_key)
  where client_key is not null;

-- Namespace dédié ExamenOPJ (UUID arbitraire stable)
-- uuid_generate_v5(ns, 'learning-node:' || client_key)

insert into public.learning_modules (id, title, sort_order, color, icon)
values
  ('gav', 'La garde à vue', 1, 'blue', null),
  ('audition', 'L''audition et l''interrogatoire', 2, 'violet', null),
  ('perquisitions', 'Perquisitions et saisies', 3, 'rose', null),
  ('acteurs', 'Acteurs judiciaires', 4, 'amber', null),
  ('infractions', 'Infractions et qualifications', 5, 'emerald', null),
  ('procedure', 'Flagrance et préliminaire', 6, 'cyan', null),
  ('nullites', 'Nullités et recours', 7, 'slate', null)
on conflict (id) do update set
  title = excluded.title,
  sort_order = excluded.sort_order,
  color = excluded.color;

insert into public.learning_nodes (id, module_id, sort_order, kind, title, href, min_score_pct, client_key)
values
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:gav-1'), 'gav', 1, 'discovery', 'Découverte — cadre légal', '/fondamentaux/garde-a-vue', 80, 'gav-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:gav-2'), 'gav', 2, 'training', 'QCM guidé', '/quiz', 80, 'gav-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:gav-3'), 'gav', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'gav-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:gav-4'), 'gav', 4, 'case', 'Cas pratique', '/cours/enquetes', 80, 'gav-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:gav-5'), 'gav', 5, 'exam', 'Mini-examen', '/quiz', 80, 'gav-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:aud-1'), 'audition', 1, 'discovery', 'Découverte', '/fondamentaux', 80, 'aud-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:aud-2'), 'audition', 2, 'training', 'QCM guidé', '/quiz', 80, 'aud-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:aud-3'), 'audition', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'aud-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:aud-4'), 'audition', 4, 'case', 'Cas pratique', '/cours/enquetes/alpha', 80, 'aud-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:aud-5'), 'audition', 5, 'exam', 'Mini-examen', '/entrainement/articulation', 80, 'aud-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:per-1'), 'perquisitions', 1, 'discovery', 'Découverte', '/fondamentaux', 80, 'per-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:per-2'), 'perquisitions', 2, 'training', 'QCM guidé', '/quiz', 80, 'per-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:per-3'), 'perquisitions', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'per-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:per-4'), 'perquisitions', 4, 'case', 'Cas pratique', '/cours/enquetes', 80, 'per-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:per-5'), 'perquisitions', 5, 'exam', 'Mini-examen', '/quiz', 80, 'per-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:act-1'), 'acteurs', 1, 'discovery', 'Découverte', '/programme', 80, 'act-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:act-2'), 'acteurs', 2, 'training', 'QCM guidé', '/quiz', 80, 'act-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:act-3'), 'acteurs', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'act-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:act-4'), 'acteurs', 4, 'case', 'Cas pratique', '/epreuves/epreuve-2', 80, 'act-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:act-5'), 'acteurs', 5, 'exam', 'Mini-examen', '/quiz', 80, 'act-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:inf-1'), 'infractions', 1, 'discovery', 'Découverte — référentiel', '/infractions', 80, 'inf-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:inf-2'), 'infractions', 2, 'training', 'QCM guidé', '/quiz', 80, 'inf-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:inf-3'), 'infractions', 3, 'consolidation', 'Flashcards', '/flashcards', 80, 'inf-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:inf-4'), 'infractions', 4, 'case', 'Cas pratique', '/fondamentaux', 80, 'inf-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:inf-5'), 'infractions', 5, 'exam', 'Mini-examen', '/quiz', 80, 'inf-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:fla-1'), 'procedure', 1, 'discovery', 'Découverte — cadres d’enquête', '/fondamentaux/cadres-enquete', 80, 'fla-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:fla-2'), 'procedure', 2, 'training', 'QCM guidé', '/quiz', 80, 'fla-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:fla-3'), 'procedure', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'fla-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:fla-4'), 'procedure', 4, 'case', 'Enquêtes Alpha vers Charlie', '/cours/enquetes', 80, 'fla-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:fla-5'), 'procedure', 5, 'exam', 'Mini-examen', '/sujets-blancs', 80, 'fla-5'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:nul-1'), 'nullites', 1, 'discovery', 'Découverte', '/fondamentaux', 80, 'nul-1'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:nul-2'), 'nullites', 2, 'training', 'QCM guidé', '/quiz', 80, 'nul-2'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:nul-3'), 'nullites', 3, 'consolidation', 'Consolidation', '/flashcards', 80, 'nul-3'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:nul-4'), 'nullites', 4, 'case', 'Cas pratique', '/epreuves/epreuve-3', 80, 'nul-4'),
  (uuid_generate_v5 ('a0000001-0001-4000-8000-000000000001'::uuid, 'learning-node:nul-5'), 'nullites', 5, 'exam', 'Mini-examen', '/quiz', 80, 'nul-5')
on conflict (id) do update set
  module_id = excluded.module_id,
  sort_order = excluded.sort_order,
  kind = excluded.kind,
  title = excluded.title,
  href = excluded.href,
  min_score_pct = excluded.min_score_pct,
  client_key = excluded.client_key;
