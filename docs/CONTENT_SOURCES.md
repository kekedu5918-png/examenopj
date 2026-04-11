# Sources de contenu pédagogique

## Quiz et flashcards « produit » (pages publiques)

- **Fichiers TypeScript** sous `src/data/` : agrégation dans `quiz-questions.ts`, thèmes par fascicule, etc.
- Ces jeux sont **versionnés avec le code** et servis aux pages `/quiz`, `/flashcards` sans dépendre des lignes Supabase pour le cœur du QCM.

## Tables Supabase (`modules`, `chapitres`, `questions`, `flashcards`, `user_progress`)

- Utilisées pour l’**espace connecté** : recherche globale (`searchLearningContent`), statistiques de révision (`getRevisionStats`), progression stockée en base, etc. (`src/features/examenopj/controllers/get-dashboard-data.ts`).
- Les politiques RLS sont définies dans les migrations `supabase/migrations/`.

## Règle métier

- Le **quiz joué par les candidats** sur le site suit les **données TS** ci-dessus.
- Les tables `questions` / `flashcards` côté Supabase peuvent servir d’**index**, d’**administration** ou d’**évolution future** ; toute convergence (CMS unique) doit être un chantier explicite pour éviter les écarts avec le QCM affiché.
