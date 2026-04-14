# Dette technique et opérations — ExamenOPJ

## Core Web Vitals (production)

- Mesurer sur `https://www.examenopj.fr` via [PageSpeed Insights](https://pagespeed.web.dev/) ou le dashboard Vercel (Speed Insights déjà intégré dans [`layout.tsx`](../src/app/layout.tsx)).
- Cibles courantes : LCP &lt; 2,5 s, CLS &lt; 0,1, INP &lt; 200 ms.

## Dépendances npm

- Lancer `npm audit` régulièrement. Les correctifs **breaking** (ex. passage à Next 16) doivent être planifiés avec tests E2E (`npm run test:e2e`).
- Ne pas utiliser `npm audit fix --force` en production sans revue.

## Content-Security-Policy

- Aujourd’hui : `Content-Security-Policy-Report-Only` dans [`next.config.js`](../next.config.js). Une politique **enforce** identique peut être activée en prod avec la variable d’environnement `CSP_ENFORCE=1` (à valider après analyse des rapports navigateur).

## Types Supabase — schéma `learning_path`

- Référence actuelle : type exporté `LearningPathDatabase` dans [`src/lib/learningPath.ts`](../src/lib/learningPath.ts) et réexport [`src/libs/supabase/learning-path-schema.ts`](../src/libs/supabase/learning-path-schema.ts). Pour alignement automatique avec la BDD :

```bash
npx supabase gen types typescript --project-id <id> --schema public,learning_path > src/libs/supabase/learning-path-types.ts
```

(Adapter la commande selon votre projet Supabase CLI.)

## Dead code

- Voir [`DEADCODE.md`](../DEADCODE.md) : ne pas supprimer en masse les fichiers signalés par `knip` sans vérification `rg`/imports dynamiques.
