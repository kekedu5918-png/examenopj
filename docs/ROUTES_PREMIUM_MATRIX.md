# Matrice routes × accès Premium / freemium

Généré pour l’audit sécurité produit. Les pages **sans** `getContentAccess` / `hasPremiumAccess` / `ContentPremiumOverlay` peuvent être publiques par design (marketing, légal) ou à revoir.

## Mécanismes

| Helper | Rôle |
|--------|------|
| `getContentAccess()` | Plafonds quiz/flashcards (freemium), tier `full` / `freemium` |
| `hasPremiumAccess()` | Booléen abonnement ou période d’essai inscription |
| `ContentPremiumOverlay` | Flou + CTA sur contenu réservé Premium |

## Pages avec contrôle serveur (grep `src/app`)

| Route | Mécanisme | Notes |
|-------|-----------|-------|
| `/cours/enquetes/[id]` | `getContentAccess` + overlay si enquête premium | OK |
| `/fondamentaux/[id]` | `getContentAccess` + overlay selon fiche | OK |
| `/epreuves/epreuve-1` | `getContentAccess` + overlay | OK |
| `/epreuves/epreuve-2` | `getContentAccess` + overlay | OK |
| `/epreuves/epreuve-3` | `getContentAccess` + overlay | OK |
| `/quiz` | `getContentAccess` | Plafond journalier freemium côté client attendu |
| `/flashcards` | `getContentAccess` | Idem |
| `/fondamentaux` (hub) | `getContentAccess` | Tier pour affichage |
| `/entrainement/quiz` | `getContentAccess` | |
| `/entrainement/flashcards` | `getContentAccess` | |
| `/entrainement/redaction-pv` | `hasPremiumAccess` | Paywall complet si non premium |
| `/entrainement/rapport-synthese` | `hasPremiumAccess` | Idem |
| `/cours/modeles-pv/[slug]` | `hasPremiumAccess` + flags fiche | OK |
| `/sujets-blancs/[id]` | `hasPremiumAccess` | OK |
| `/login`, `/inscription` | `hasPremiumAccess` | Redirections si déjà premium |
| `/post-login` | `hasPremiumAccess` | Routing onboarding |

## Routes publiques (pas de garde dans `page.tsx`)

Marketing, programme, cours hub, infractions, pricing, légal, etc. — **normal** sauf si une ressource payante y est exposée en clair.

## API routes

Vérifier manuellement : `src/app/api/**/*.ts` — les routes IA / correction doivent refuser ou limiter les utilisateurs non premium côté serveur (Zod + session).

## Tests E2E

- **Playwright** : `npm run build && npm run test:e2e` (voir `e2e/smoke.spec.ts` — pages publiques : `/`, `/pricing`, `/quiz`, `/parcours-opj`).
- **À étendre** : profils freemium (post-essai) et premium avec `storageState` ou comptes de test — `/cours/enquetes/[id]`, `/entrainement/redaction-pv`, etc.

## Tests unitaires / intégration

- Voir `src/features/access/__tests__/` pour `getContentAccess` — à enrichir si la logique métier évolue.
