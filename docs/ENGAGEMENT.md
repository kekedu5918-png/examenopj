# Engagement et rappels — ExamenOPJ

## Objectifs pédagogiques par étape

- Les étapes du parcours affichent **type**, **durée estimée** et **XP** depuis `learning_path.lessons` (voir [`/dashboard/parcours`](/dashboard/parcours)).
- Pour enrichir avec un objectif rédigé par leçon : ajouter une colonne `description` ou `learning_objectives` (JSON) sur `learning_path.lessons` + migration + affichage dans [`LearningPathTrack`](../src/components/learning-path/LearningPathTrack.tsx).

## Emails et notifications

- **Rappels** (streak, révisions SM-2, `getTodayReviews`) : prévoir un fournisseur transactionnel (ex. Resend) + **double opt-in** et lien de désabonnement (RGPD).
- **Données utiles** : `flashcard_reviews.next_review_at`, `learning_path.user_progress.needs_review_at`.
- **Variables d’environnement** à définir avant implémentation : `RESEND_API_KEY`, expéditeur vérifié, URL de base du site.
- **Persistance** : table `public.user_engagement_preferences` (migration `20260412160000_user_engagement_preferences.sql`), API [`/api/user-preferences`](../src/app/api/user-preferences/route.ts).
- **Envoi** : [`runEmailRemindersCron`](../src/features/engagement/run-email-reminders-cron.ts) + route [`/api/cron/email-reminders`](../src/app/api/cron/email-reminders/route.ts) (Bearer `CRON_SECRET`). Si `RESEND_API_KEY` est défini, envoi réel via Resend (max 40 destinataires / passage) ; sinon mode dry-run avec décompte des opt-in. `RESEND_FROM_EMAIL` : expéditeur vérifié chez Resend.

## Gamification

- Ligues / classements : désactivables par défaut ; ne pas diluer le ton professionnel du contenu OPJ.
