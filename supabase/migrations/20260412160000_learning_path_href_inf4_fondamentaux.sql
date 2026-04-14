-- Remplace le lien obsolète /cours/modules par le hub Fondamentaux (cas pratique module Infractions).

update learning_path.lessons
set href = '/fondamentaux'
where client_key = 'inf-4'
  and href = '/cours/modules';

update public.learning_nodes
set href = '/fondamentaux'
where client_key = 'inf-4'
  and href = '/cours/modules';
