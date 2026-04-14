# Dette technique et opérations — ExamenOPJ

## Core Web Vitals (production)

- Mesurer sur `https://www.examenopj.fr` via [PageSpeed Insights](https://pagespeed.web.dev/) ou le dashboard Vercel (Speed Insights déjà intégré dans [`layout.tsx`](../src/app/layout.tsx)).
- Cibles courantes : LCP &lt; 2,5 s, CLS &lt; 0,1, INP &lt; 200 ms.

### Baseline PSI (à compléter après mesure)

| URL | LCP (mobile) | INP | CLS | Date |
|-----|----------------|-----|-----|------|
| `/` | _à mesurer_ | _à mesurer_ | _à mesurer_ | |
| `/fondamentaux` | _à mesurer_ | _à mesurer_ | _à mesurer_ | |
| `/entrainement/quiz` | _à mesurer_ | _à mesurer_ | _à mesurer_ | |

### Correctif LCP documenté (home)

- Les sections **témoignages**, **tarifs** et **programme complet** sous le pli sont chargées en **code-splitting** (`next/dynamic`) depuis [`home-page-client.tsx`](../src/components/home/home-page-client.tsx) pour réduire le JS initial sur `/` et laisser le thread principal traiter plus tôt le hero (texte / carte quiz).
- Si le LCP reste dominé par une police ou un visuel futur, ajouter `next/image` avec `priority` et dimensions explicites sur le premier visuel au-dessus de la ligne de flottaison.

## Accessibilité — checklist contrastes (thème clair)

À valider manuellement après finition des tokens `ds` sur les écrans à fort trafic :

1. Accueil `/` — hero et CTA.
2. `/fondamentaux` — liste ou fiche type.
3. `/entrainement/quiz` — sélection de mode et zone de question.
4. `/login` et `/inscription` — cartes formulaire.
5. `/infractions` — filtres et accordéon liste.

Automatisation : [`e2e/a11y-light-theme.spec.ts`](../e2e/a11y-light-theme.spec.ts) (axe, thème clair forcé, filtres serious/critical alignés sur `smoke.spec.ts`).

## Dépendances npm

- Lancer `npm audit` régulièrement. Les correctifs **breaking** (ex. passage à Next 16) doivent être planifiés avec tests E2E (`npm run test:e2e`).
- Ne pas utiliser `npm audit fix --force` en production sans revue.
- **High restantes (2026-04)** : `next`, `eslint-config-next` / `glob` (transitif), `supabase` CLI → `tar` — correctifs proposés par npm en **semver major** ; traiter lors d’une montée Next / Supabase CLI planifiée, pas en hotfix aveugle.

## Content-Security-Policy

- Aujourd’hui : `Content-Security-Policy-Report-Only` dans [`next.config.js`](../next.config.js). Une politique **enforce** identique peut être activée en prod avec la variable d’environnement `CSP_ENFORCE=1` (à valider après analyse des rapports navigateur).

### Déploiement enforce (préprod puis prod)

1. Sur l’environnement de **préproduction**, définir `CSP_ENFORCE=1` et déployer.
2. Ouvrir les pages critiques (accueil, quiz, compte, paiement Stripe) et vérifier la **console** : aucune violation bloquante ; ajuster la CSP ou les scripts si nécessaire.
3. Répliquer en **production** une fois les rapports verts (ou violations acceptées documentées ici).

## Types Supabase — schéma `learning_path`

- Référence actuelle : type exporté `LearningPathDatabase` dans [`src/lib/learningPath.ts`](../src/lib/learningPath.ts) et réexport [`src/libs/supabase/learning-path-schema.ts`](../src/libs/supabase/learning-path-schema.ts). Pour alignement automatique avec la BDD :

```bash
npx supabase gen types typescript --project-id <id> --schema public,learning_path > src/libs/supabase/learning-path-types.ts
```

(Adapter la commande selon votre projet Supabase CLI.)

## Dead code

- Voir [`DEADCODE.md`](../DEADCODE.md) : ne pas supprimer en masse les fichiers signalés par `knip` sans vérification `rg`/imports dynamiques.
