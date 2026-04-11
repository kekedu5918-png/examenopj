# Performance et CWV — procédure

## Mesures continues

- **Vercel Speed Insights** : activé dans `src/app/layout.tsx` — consulter le tableau de bord Vercel pour LCP, INP, CLS en production.

## CSP (observation)

- **`Content-Security-Policy-Report-Only`** : défini dans `next.config.js` — ne bloque pas encore les ressources ; sert à repérer les domaines à ajuster avant un passage en `Content-Security-Policy` stricte.

## Lighthouse local

1. `npm run dev` ou `npm run build && npm run start`
2. `npm run perf:lighthouse` (génère `lighthouse-report.html` à la racine)

## Lighthouse CI (GitHub)

Workflow **Lighthouse (manuel)** : Actions → *Lighthouse (manuel)* → *Run workflow*. Les artefacts JSON sont téléchargeables (scores par URL).

## Bundle

- `npm run analyze` — analyse du bundle Next.js (`ANALYZE=true`).

## Critère « run CWV pré-prod archivé »

Conserver une copie des JSON Lighthouse (workflow manuel) ou du rapport HTML local avant une mise en production majeure.
