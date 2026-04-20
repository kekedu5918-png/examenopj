# Phase 2E — baselines visuelles

- `screenshots-before/` : captures dark (desktop 1440×900, mobile 390×844) **avant** le fix tokens RGB + Tailwind (`fix(ds)` Phase 2E.1).
- `screenshots-after/` : mêmes routes et viewports **après** le correctif.

Génération : `npm run build && npm run start`, puis  
`node scripts/phase-2e-capture-screenshots.mjs before|after`  
(`PLAYWRIGHT_BASE_URL` si le port diffère de 127.0.0.1:3000).
