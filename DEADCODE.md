# Fichiers morts — suivi

Les entrées suivantes ont été **traitées** (suppression ou branchement) lors du passage « actions prioritaires » :

- `src/app/navigation.ts` — **branché** : exports `SITE_HEADER_*_LINKS` importés par `SiteHeaderClient.tsx`.
- `src/app/(auth)/auth-ui.tsx` — **supprimé** (aucun import de `AuthUI`).
- `src/components/layout/ExamenOpjLogo.tsx` — **supprimé** (non utilisé ; `BrandWordmark` à la place).
- `src/libs/resend/resend-client.ts` + dépendance `resend` — **supprimés** (aucun appel à `getResendClient`).

Pour un nouveau scan heuristique, préférer `npm run lint` / outils dédiés plutôt qu’une recherche naïve par préfixe `@/` (faux positifs sur imports relatifs).

## En attente de suppression

- `src/components/learning-path/LearningPathExperience.tsx` — **obsolète** : remplacé par `src/components/learning/LearningPath.tsx` branché depuis `src/app/parcours-opj/page.tsx` (données Supabase). Supprimer le fichier quand tu feras le ménage (vérifier qu’aucun import ne subsiste).
- `src/components/quiz/quiz-result.tsx` — **remplacé** par `SessionComplete` pour l’écran de fin de session (`quiz-page-client.tsx`). Supprimer le fichier quand plus aucun import ne subsiste.
- **`completeLesson`** — **à brancher** sur le quiz global lorsque `QuizQuestion` exposera un `lessonId` (Phase 3).

## À traiter en Phase 3 (non bloquant)

- `src/components/providers/ThemeProvider.tsx` — `next/script` avec stratégie `beforeInteractive` en dehors de `pages/_document.js` : avertissement ESLint `@next/next/no-before-interactive-script-outside-document`. À corriger en Phase 3 (non bloquant pour le build).
