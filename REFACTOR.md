# Refactorisations prioritaires (audit technique)

## [CRITIQUE] Cohérence des contenus « cours / quiz »

- **Documenté** dans `docs/CONTENT_SOURCES.md` + commentaires en tête de `quiz-questions.ts` et `get-dashboard-data.ts`.
- **Long terme** : unifier (CMS/Supabase comme source + génération de types) si vous industrialisez le contenu.

## [IMPORTANT] Composants volumineux (lisibilité et tests)

| Fichier (ordre de priorité) | Observation |
|-----------------------------|-------------|
| `src/components/quiz/quiz-page-client.tsx` | Très long ; mélange setup quiz, freemium, gamification, UI — candidat pour sous-composants + hooks dédiés. |
| `src/components/onboarding/OnboardingFlow.tsx` | Logique d’étapes + UI + shell ; extraire étapes et actions. |
| `src/components/infractions/InfractionsPageClient.tsx` | Table, filtres, modes, motion — découper par domaine (liste, détail, flash mode). |

## [IMPORTANT] Navigation centralisée

- **Fait** : `SITE_HEADER_COURS_LINKS`, `SITE_HEADER_EPREUVES_LINKS`, `SITE_HEADER_ENTRAINER_LINKS` dans `navigation.ts`, consommés par `SiteHeaderClient.tsx`.

## [AMÉLIORATION] Affichage des statistiques homepage (SEO / aperçu sans JS)

- **Fait** : `AnimatedStat` affiche désormais la valeur finale sans animation compteur (HTML toujours correct).

## [AMÉLIORATION] Librairies d’icônes

- Coexistence de `lucide-react` (très utilisé) et `react-icons` (quelques composants UI : `toast`, `sheet`, etc.). Pas bloquant ; fusion éventuelle pour réduire le bundle.

## [AMÉLIORATION] Error boundaries

- `src/app/error.tsx` exporte un composant nommé `GlobalError` : fonctionnel pour la route, mais pas de `global-error.tsx` à la racine — comportement par défaut Next pour erreurs racine ; à documenter ou compléter si besoin de skin global pour erreurs de layout.
