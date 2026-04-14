# SCHEMA_REVIEW — Supabase / ExamenOPJ

## Schéma `learning_path` (parcours type Duolingo)

**Migration** : `supabase/migrations/20260412140000_learning_path_schema_learning_path.sql`

| Table | Rôle |
|-------|------|
| `learning_path.modules` | 7 modules (slug, titre, couleur, ordre) |
| `learning_path.lessons` | Leçons avec `client_key`, `href`, `min_score_unlock`, XP |
| `learning_path.user_progress` | Scores, `needs_review_at` (révision espacée côté path) |
| `learning_path.user_streaks` | Streak dédié path (doublon conceptuel avec `public.user_streaks` ?) |
| `learning_path.xp_events` | Journal XP |

### RLS

- Catalogue (`modules`, `lessons`) : **SELECT** pour `authenticated`, `using (true)` — acceptable pour contenu public derrière login.
- Données utilisateur : politiques **own row** sur `user_id` — **bonne base**.

### Recommandations

1. **Types TypeScript** : `src/lib/learningPath.ts` définit un type inline `LearningPathDatabase` car les types générés ne couvrent pas ce schéma — **générer** les types Supabase multi-schéma (`learning_path`) ou package `@supabase/supabase-js` avec schemas, pour éviter dérive.
2. **Streaks doubles** : `learning_path.user_streaks` vs `public.user_streaks` (`20260409110000_gamification.sql`). **Décision produit (implémentée)** : le dashboard lit les deux et affiche `current_streak = max(public.user_streaks.current_streak, learning_path.user_streaks via getUserStreakCurrent)` dans [`src/features/gamification/controllers/get-gamification-data.ts`](src/features/gamification/controllers/get-gamification-data.ts). Les complétions de **quiz** alimentent `public` ; les **leçons du parcours** (`completeLesson`) alimentent `learning_path`. Une migration future peut fusionner en une seule table si besoin.
3. **Index** : `user_progress (user_id, lesson_id)` — vérifier présence d’index unique ou composite pour éviter doublons de progression par leçon (contrainte métier).

## Flashcards — SM-2

**Migration** : `supabase/migrations/20260409210000_flashcard_reviews_sm2.sql`

- Colonnes `ease_factor`, `interval_days`, `next_review_at` sur `flashcard_reviews`.
- Index `idx_flashcard_reviews_next_review` sur `(user_id, next_review_at)` — **pertinent** pour « révisions du jour ».

**Recommandation** : aligner l’UI dashboard (`getTodayReviews` dans `src/lib/learningPath.ts`) avec les emails / rappels si roadmap prévue.

## Quiz

**Migration** : `supabase/migrations/20260401120000_quiz_attempts.sql` (référencé par le code)

- RLS `quiz_attempts` : **SELECT** et **INSERT** réservés à `auth.uid() = user_id` (ou admin) — revue OK.

## Onboarding

**Migration** : `supabase/migrations/20260409100000_onboarding.sql`

- Préférences utilisateur : candidat pour **persister le thème** (`theme: light|dark`) en plus de `localStorage` — voir `REFACTOR.md`.

## Sécurité headers (hors BDD mais lié prod)

**Fichier** : `next.config.js` — `Content-Security-Policy-Report-Only` (phase observation). Planifier passage en **CSP enforce** après collecte des violations.

## Actions SQL suggérées (à valider en staging)

1. `supabase gen types typescript --schema=learning_path` (ou équivalent) → commit des types.
2. Requête de contrôle : `select count(*) from learning_path.user_progress group by user_id, lesson_id having count(*) > 1;` — détecter doublons.
