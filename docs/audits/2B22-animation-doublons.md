# Diagnostic — Doublons d’animation 2B.2.2 (wrapper `home-page-client` vs sections enfants)

**Contexte :** le `motion.div` parent ajouté dans `home-page-client.tsx` (variants `homeBelowHero*`, `whileInView`, stagger) **enveloppe** chaque bloc. Les composants enfants qui ont déjà une **animation d’entrée** au niveau de la racine (`motion.section` avec `initial` / `whileInView` / `variants` d’entrée) créent une **double couche** avec ce wrapper.

**Périmètre :** les 9 sections dans l’ordre d’apparition sur `/`. Aucune modification de code dans ce livrable.

**Référence a11y (hors correctif animation) :** `HomeFinalPricingSection` — pas de `aria-labelledby` sur la section ; titres sans `id` relié — **à traiter en Phase 3** (comme demandé), pas dans le même correctif que la neutralisation motion.

---

## Tableau diagnostic

| Section | Racine | Animation d’entrée sur la racine ? | Type | Action |
|--------|--------|-------------------------------------|------|--------|
| **HomeJourneyStrip** | `<section>` (HTML) | **Non** — pas de `motion` sur la racine | N/A racine ; **à l’intérieur** : `motion.div` / `motion.li` avec `whileInView` + opacity / y / x et **délais par index** (desktop + mobile) | **Entrée** au niveau **enfants** (échelonnement du parcours). **Doublon** avec le wrapper qui anime déjà tout le strip. **Neutralisation possible :** retirer ou simplifier les `whileInView` internes et ne garder que hover/scale si souhaité ; ou accepter un second effet plus local. |
| **HomeStatsSection** | `<section>` (HTML) | **Non** sur la racine | **Intérieur :** `motion.div` grille (`initial` / `whileInView` grille) + `motion.div` par carte (`whileInView` + `delay: i * 0.07`) | **Entrée** (grille + cartes). Stagger **intrinsèque** au design des stats ; **doublon** avec le wrapper sur le bloc entier. **Neutralisation possible :** passer la grille/cartes en **passif** (div + pas d’entrée) et laisser uniquement le wrapper + `AnimatedStat` ; ou ne neutraliser que la **grille** externe et garder stagger cartes. |
| **StartHereSection** | `<motion.section>` | **Oui** — `initial` / `whileInView` / `viewport` margin `-80px` / transition ~0,55s (opacity, y) | **Entrée** (racine) — **doublon direct** avec wrapper 2B.2.2. **Intérieur :** grille `motion.div` avec `diagnosticGridVariants` / `diagnosticCardVariants` (stagger 2B.2.2) | Racine : **entrée** → **à neutraliser** (supprimer props d’entrée ou passer en `<section>` passive). **Intérieur :** **intrinsèque** (stagger diagnostic) — **conserver**. |
| **HomeEnquetesPillarSection** | `<motion.section>` | **Oui** — même pattern opacity / y, viewport `-80px` | **Entrée** (racine) — doublon. **Intérieur :** (1) `motion.div` autour du `SectionTitle` avec **même** entrée opacity/y — **second doublon** ; (2) grille `motion.div` avec `variants` stagger cartes enquêtes | Racine + bandeau titre : **entrée** → **neutraliser**. Liste cartes : **intrinsèque** (stagger) — **conserver**. |
| **HomeEpreuvesLandingSection** | `<motion.section>` | **Oui** — `initial` / `whileInView` / viewport `-80px` | **Entrée** (racine) — doublon. Cartes : `MotionLink` **whileTap** / **whileHover** (scale) | Racine : **entrée** → **neutraliser**. Interactions : **intrinsèque** — **garder**. |
| **TerrainOriginSection** | `<section>` (HTML) | **Non** — aucun `framer-motion` dans le composant | — | **Aucune action** animation (déjà passive). |
| **HomeTestimonialsSection** | `<motion.section>` | **Oui** — `initial` / `whileInView` / viewport `-60px` | **Entrée** (racine) — doublon. **Intérieur :** `motion.li` avec `whileInView` + `delay: i * 0.08` | Racine : **entrée** → **neutraliser**. Liste : **entrée** échelonnée des cartes — **intrinsèque** ; à trancher si on garde le stagger interne une fois le wrapper seul sur le bloc. |
| **HomeFinalPricingSection** | `<motion.section>` | **Oui** — `initial` / `whileInView` / viewport `-80px` | **Entrée** (racine) — doublon. `MotionLink` **whileTap** | Racine : **entrée** → **neutraliser**. **Phase 3 (a11y) :** ajouter `aria-labelledby` + `id` sur le titre principal — **noté, hors fix animation**. |
| **HomeProgrammeCompletSection** | `<motion.section>` | **Oui** — `initial` / `whileInView` / viewport `-80px` | **Entrée** (racine) — doublon. **Intérieur :** deux `motion.div` colonnes (infractions / fondamentaux) avec **chacun** la même entrée opacity/y — **doublon supplémentaire**. Grille fondamentaux : `motion.div` par carte avec `whileInView` + delay | Racine + les **deux** `motion.div` colonnes d’entrée : **entrée** → **neutraliser** (risque triple effet avec wrapper). Grille 6 cartes : **intrinsèque** (stagger) — **conserver** sauf décision de tout confier au wrapper. |

---

## Synthèse des décisions possibles (rappel)

1. **Neutraliser l’animation d’entrée** au niveau concerné (`motion.section` → retirer `initial` / `whileInView` / `transition` d’entrée, ou remplacer par `<section>`) lorsque c’est un **doublon** avec le wrapper 2B.2.2.
2. **Garder intact** uniquement si l’effet était **volontairement distinct** et jugé indispensable — **documenter** pourquoi la double couche est acceptée (peu de cas ici : les racines reprennent le même pattern fade/y).
3. **Remplacer par une section HTML passive** quand toute l’entrée est portée par le wrapper — **recommandé** pour les `motion.section` « génériques » listés ci-dessus.

---

## Prochaine étape (après relecture produit)

Commit d’amendement ou correctif du type **`fix(home): neutraliser doublons animation 2B.2.2`** — **après** validation section par section des lignes du tableau.
