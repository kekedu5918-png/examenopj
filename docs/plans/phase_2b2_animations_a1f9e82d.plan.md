# Phase 2B.2 — Home (`/`) : animations (plan figé)

> **Statut** : plan **pré-implémentation** — aucun code sans **feu vert explicite** après relecture.  
> **Prérequis** : Phase **2B.1** close ; référence Lighthouse **`docs/baselines/phase-2b/lighthouse-after-2b1.json`**.  
> **Contexte** : `LIGHT_MODE_ENABLED = false` — mesures et recettes **dark** uniquement.

---

## 1. Arborescence des animations — spécification fermée

Liste **fermée** : **6** animations, **aucun** ajout ni substitution en cours de route (aligné sur le plan Phase 2B §2).

| Animation | Fichier(s) cible(s) | Lignes approx. (2026-04-19, `main` post-2B.1) | Technique | Variant motion spécifié | Fallback `prefers-reduced-motion` | Budget LCP attendu |
|-----------|---------------------|-----------------------------------------------|-----------|-------------------------|-----------------------------------|--------------------|
| **1 — Pastille pulsante** (badge **J-X** / session) | [`src/components/home/sections/hero-section.tsx`](../../src/components/home/sections/hero-section.tsx) | **~97–115** (bloc `motion.div` badge + point `animate-ping`) | **CSS pur** — `@keyframes` dédiés (pulse / scale léger sur le point ou un halo) + classes utilitaires ; **pas** de boucle `animate` Framer sur le nœud LCP. Le conteneur peut rester `motion.div` pour l’entrée existante, sans `repeat` sur la pastille. **Attribut `data-reduced-motion`** sur le nœud pastille (§5). | **N/A** (pas de variant Framer pour la boucle pulse) | Désactiver l’animation de la pastille : point **statique** (opacité pleine, pas de ping ni keyframes). Conserver le texte du badge lisible. | **~30 ms** mobile / **~25 ms** desktop (ordre de grandeur : une couche paint/CSS, hors chemin critique texte) |
| **2 — Compteur au scroll** (compteurs de la section Chiffres clés — **4** instances d’`AnimatedStat`) | [`src/components/home/sections/home-stats-section.tsx`](../../src/components/home/sections/home-stats-section.tsx), [`src/components/home/AnimatedStat.tsx`](../../src/components/home/AnimatedStat.tsx) ; éventuellement petit hook `useIntersectionCounter.ts` **à côté** (nouveau fichier **local** `src/components/home/` ou `src/hooks/`) | **stats ~11–101**, **AnimatedStat ~1–48** | **IntersectionObserver natif** + mise à jour du nombre (ex. `requestAnimationFrame` sur **~450 ms** max, easing documenté au §6) — **confirmé** (pas de lib, pas de Framer pour le comptage). | **N/A** | Afficher **immédiatement** la valeur finale ; **aucune** interpolation ; conserver `tabular-nums` + `min-w-[…ch]` (plan 2B §2.1 CLS). | **0 ms** LCP direct (below-the-fold) ; risque **TBT** si travail lourd au scroll — garder le callback **léger** |
| **3 — Stagger diagnostic** (cartes « Par où commencer ») | [`src/components/home/sections/home-refonte-sections.tsx`](../../src/components/home/sections/home-refonte-sections.tsx) — `StartHereSection` | **~39–146** (grille `cards.map`) | **framer-motion** — **un seul** `motion.div` parent sur la **grille** porte `staggerChildren` + `whileInView` / `viewport` ; chaque carte est un `motion.div` **sans** `whileInView` ni `initial`/`transition` propres — uniquement `variants={diagnosticCardVariants}` (§2.1 migration). | `diagnosticGridVariants`, `diagnosticCardVariants` (§2) | Pas de stagger : cartes **visibles** tout de suite (`visible` instantané ou `transition: { duration: 0 }`) | **0 ms** LCP (below-the-fold) |
| **4 — Hover subtil** (réponses **A / B / C / D** quiz hero) | [`src/components/home/sections/hero-section.tsx`](../../src/components/home/sections/hero-section.tsx) | **~365–398** (`motion.li` options) | **CSS pur** — `transition-*` + classes `group-hover:` / `hover:` (translation **≤ 2px**, shadow/border) ; **éviter** `layout` Framer sur les items au hover si cela provoque du reflow. | **N/A** | États hover **identiques** au repos pour les réponses (pas de translation ni animation) ; feedback correct/incorrect **inchangé** (déjà géré) | **0 ms** LCP (interaction uniquement ; quiz dans colonne droite) |
| **5 — Reveal progressif** (sections **sous le hero**) | [`src/components/home/home-page-client.tsx`](../../src/components/home/home-page-client.tsx) **uniquement** | **home-page-client ~33–47** (enfants après `<HeroSection />`) | **framer-motion** — [`home-page-client.tsx`](../../src/components/home/home-page-client.tsx) est déjà **`'use client'`** : **pas** de fichier `HomeBelowHeroMotion.tsx`. Ajouter un **`motion.div` parent** directement dans ce fichier, enveloppant **tous** les nœuds situés **après** `<HeroSection />`, avec **`staggerChildren: 0.08`**. | `homeBelowHeroContainerVariants`, `homeBelowHeroItemVariants` (§2) | Pas de stagger : tous les enfants **opacity: 1, y: 0** sans délai (`staggerChildren` ignoré ou `transition: { duration: 0 }`) | **0 ms** LCP direct (premier écran = hero) ; **TBT** : éviter `useEffect` lourd au montage du conteneur |
| **6 — Flèche animée** (CTA principal hero « Commencer gratuitement ») | [`src/components/home/sections/hero-section.tsx`](../../src/components/home/sections/hero-section.tsx) | **~186–207** (`MotionLink` + `ArrowRight`) | **CSS pur** — `@keyframes` court (ex. **translateX** 0 → 3px → 0) en **`animation`** déclenchée sous `.group-hover` (pas d’infini agressif sur LCP : **1 cycle** par survol ou **infini très léger** seulement si mesure OK post-2B.2.3). **`data-reduced-motion`** sur le conteneur de la flèche ou le `MotionLink` (§5). | **N/A** | Flèche **sans** keyframe ; conserver `translate-x-0.5` statique au survol **ou** aucun mouvement | **~20 ms** mobile / **~15 ms** desktop (décoration ; éviter `will-change` permanent sur le hero) |

**Référence LCP** (élément typique) : texte **hero** (`h1` / ligne « Réussissez… ») — les animations **1** et **6** sont **above-the-fold** sur le **bloc gauche** ; **4** concerne la colonne **droite** (impact LCP généralement indirect). **2, 3, 5** : below-the-fold → pas d’impact LCP direct, mais **TBT** / **CLS** à surveiller (compteur + stagger).

> **Décompte confirmé au 2B.2.1** (commit `34cb07e`) : **4** instances d’`AnimatedStat` dans `HomeStatsSection`, valeurs **15**, **55+**, **3**, **200+**.

---

## 2. Variants Framer Motion documentés

**Règle** : ces objets sont **normatifs**. Toute modification passe par **une mise à jour de ce plan**, pas par un « tweak » dans le code.

Importer les constantes existantes :

```ts
import { LANDING_EASE } from '@/components/home/motion';
```

### 2.1 Stagger diagnostic (`StartHereSection`)

**Règle anti-collision** : le **stagger** vit **uniquement** sur le **`motion.div` parent de la grille** (`className='grid …'`). **Aucune** carte enfant ne doit porter `whileInView`, `viewport`, ni `initial` / `transition` en props **propres** (ni `delay: i * …`). Chaque carte n’expose **que** `variants={diagnosticCardVariants}` (+ `key`, enfants JSX). Le parent grille porte `variants={diagnosticGridVariants}`, `initial='hidden'`, `whileInView='visible'`, `viewport` (même objet que les sections reveal si cohérent, ou `once: true` + marge dédiée — **une** source de vérité pour le déclenchement du bloc diagnostic).

**Migration explicite — avant → après**

*Avant (à supprimer sur chaque carte du `map`) :*

```tsx
<motion.div
  key={c.href}
  initial={MOTION_INITIAL_FOR_SEO}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.45, ease: LANDING_EASE, delay: i * 0.08 }}
>
```

*Après (carte uniquement) :*

```tsx
<motion.div key={c.href} variants={diagnosticCardVariants}>
```

*Grille (parent) — à ajouter / remplacer autour du `map` :*

```tsx
<motion.div
  className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
  variants={diagnosticGridVariants}
  initial='hidden'
  whileInView='visible'
  viewport={{ once: true, margin: '-40px' }}
>
  {cards.map((c) => (
    <motion.div key={c.href} variants={diagnosticCardVariants}>
      …
    </motion.div>
  ))}
</motion.div>
```

**Conteneur de la grille** — variants parent :

```ts
const diagnosticGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
} as const;
```

**Chaque carte** (enfant) — **uniquement** ce variant, **sans** délai par index :

```ts
const diagnosticCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: LANDING_EASE },
  },
} as const;
```

### 2.2 Reveal sections sous le hero (`home-page-client`)

**Conteneur** enveloppant **tous** les nœuds après `<HeroSection />` :

```ts
const homeBelowHeroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;
```

**Chaque section enfant** (direct child du conteneur) :

```ts
const homeBelowHeroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: LANDING_EASE },
  },
} as const;
```

**Application** : chaque enfant doit être un **`motion.*`** (ou wrapper `motion.div`) avec `variants={homeBelowHeroItemVariants}`, `initial='hidden'`, `whileInView='visible'`, `viewport={{ once: true, margin: '-40px' }}` — **mêmes** paramètres `viewport` pour toutes les sections sauf ajustement documenté ici (une seule source de vérité).

**Fallback viewport (recette 2B.2.2)** : si le trigger est **trop précoce** (sections déjà en état « visible » animé dès le premier léger scroll, ou apparition avant l’intention produit), remplacer par  
`viewport={{ once: true, margin: '0px 0px -100px 0px' }}`  
et **mentionner l’ajustement** dans le message du commit 2B.2.2 (référence à ce plan). Ne pas multiplier des `margin` différents par section sans mise à jour du plan.

### 2.3 Animations sans variant Framer

- **Pastille (1)** : keyframes CSS uniquement (§1).  
- **Compteur (2)** : logique Observer + RAF (§6.2).  
- **Hover quiz (4)** : Tailwind / CSS.  
- **Flèche CTA (6)** : keyframes CSS uniquement (§1).

---

## 3. Budget LCP par animation — ventilation

**Référence** : `lighthouse-after-2b1.json` — **desktop** LCP **1,402 s**, **mobile** **4,798 s**.  
**Seuil +10 %** vs after-2b1 : **desktop ≤ 1,542 s**, **mobile ≤ 5,278 s**.  
**Marge avant seuil** (alerte plan utilisateur) : **~140 ms** desktop, **~500 ms** mobile.

| Animation | Above-the-fold ? | Impact LCP estimé | Budget alloué (marge interne) |
|-----------|------------------|-------------------|-------------------------------|
| **1** Pastille | **Oui** (badge hero) | **Faible** (CSS, hors texte principal) | **40 ms** mobile / **35 ms** desktop |
| **2** Compteur | Non | **0** | **0** |
| **3** Stagger diagnostic | Non | **0** | **0** |
| **4** Hover quiz | **Oui** (colonne droite ; LCP souvent sur colonne gauche — risque indirect **faible**) | **~0** (interaction) | **0** |
| **5** Reveal sections | Non | **0** | **0** |
| **6** Flèche CTA | **Oui** | **Très faible** (icône décorative) | **30 ms** mobile / **25 ms** desktop |
| **Somme ATF (1+4+6)** | — | **≤ ~70 ms** mobile / **≤ ~60 ms** desktop | **Reste sous** les marges **500 / 140 ms** |

**Règle d’escalade** : si une mesure **2B.2.3** dépasse **+10 %** LCP sur un form factor, **désactiver en priorité** la **pastille animée (1)** (`animation: none` + point statique), puis **simplifier (6)** (flèche : transition Tailwind simple sans keyframes), puis documenter dans le commit / issue.

---

## 4. Ordre d’implémentation recommandé

Commits **atomiques** ; **pause + validation** utilisateur entre chaque sous-vague.

| Sous-vague | Contenu | Risque principal | Message de commit (proposé) |
|------------|---------|------------------|-----------------------------|
| **2B.2.1** | Animation **2** uniquement — `IntersectionObserver` + compteur dans **AnimatedStat** / **HomeStatsSection**, CLS **tabular-nums** + `min-w` | TBT si mal codé | `feat(home): compteur scroll stats (2B.2.1)` |
| **2B.2.2** | Animations **3** et **5** — variants **§2** sur `StartHereSection` + **`motion.div` parent dans `home-page-client.tsx`** (pas de wrapper dédié) | TBT / collision `whileInView` si migration §2.1 incomplète | `feat(home): stagger diagnostic + reveal sections (2B.2.2)` |
| **2B.2.3** | Animations **1, 4, 6** — CSS pastille, CSS hover quiz, CSS flèche CTA | **LCP** | `feat(home): micro-animations hero ATF (2B.2.3)` |

**Après 2B.2.3** : **Lighthouse** mobile + desktop sur `/` (même protocole que baselines), comparaison à **`lighthouse-after-2b1.json`** (règle **LCP ≤ ×1,10**). Si dépassement : **investigation** dans le corps du commit ou commit correctif avant merge.

---

## 5. Tests e2e / visuel

**Principe** : ne **pas** tester les frames intermédiaires (flaky). Tester le **fallback** `prefers-reduced-motion: reduce` : l’utilisateur voit un **état final cohérent** (pas de compteur bloqué à 0, pas de cartes invisibles, CTA utilisable).

### 5.1 Pattern `data-reduced-motion` (obligatoire ATF)

**Objectif** : assertions e2e **stables**, sans couplage aux noms de classes CSS ni à `getComputedStyle` (`animationName`, fragile).

Dans **`hero-section.tsx`**, au minimum pour **(1) pastille** et **(6) flèche CTA** :

```tsx
const shouldReduceMotion = useReducedMotion();

// Ex. pastille — nœud racine du bloc visuel « point » ou du badge entier (trancher un seul nœud testé, documenté au commit)
<div
  className='…'
  data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
>
  …
</div>

// Ex. flèche CTA — wrapper autour de ArrowRight ou MotionLink portant l’anim
<span data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}>
  <ArrowRight … />
</span>
```

**e2e** : après `await page.emulateMedia({ reducedMotion: 'reduce' })` et `page.goto('/')`, vérifier la présence de  
`[data-reduced-motion="true"]`  
sur **au moins** le nœud pastille et le nœud flèche (sélecteurs ciblés, ex. `page.locator('[data-hero-pastille]').getAttribute` si un second attribut `data-hero-pastille` est ajouté **minimal** pour éviter l’ambiguïté — **optionnel** ; sinon `locator('[data-reduced-motion="true"]').first()` **interdit** : il faut **deux** assertions distinctes ou `data-testid` **minimal** `hero-pastille`, `hero-cta-arrow`).

Recommandation **pragmatique** : ajouter **`data-testid="hero-pastille"`** et **`data-testid="hero-cta-arrow"`** sur les nœuds qui portent `data-reduced-motion`, pour des localisateurs Playwright **explicites**.

| Fichier | Rôle |
|---------|------|
| **`e2e/home-reduced-motion.spec.ts`** (nouveau) | `page.emulateMedia({ reducedMotion: 'reduce' })` ; `page.goto('/')` ; **`expect(locator).toHaveAttribute('data-reduced-motion', 'true')`** sur pastille + flèche (via `data-testid`) ; assertions **statiques** complémentaires : les **3** stats (post-2B.2.1) affichent les valeurs finales ; les **3** cartes `StartHere` titres visibles (post-2B.2.2) ; une **option quiz** visible. **Pas** de `getComputedStyle` pour valider reduced-motion. |

**Optionnel** (si flaky sur CI) : scoper le spec à **2B.2.1** uniquement pour le compteur, et étendre après 2B.2.2.

**Manuel obligatoire** (§6) : dans Chrome DevTools, activer **Reduce motion** pour chaque animation avant de valider le commit de sous-vague.

---

## 6. Règles de travail 2B.2

1. **`LIGHT_MODE_ENABLED`** reste **`false`** ; pas de régression thème.  
2. **Lighthouse** obligatoire **après 2B.2.3** (idéalement **avant** le commit final de 2B.2.3 ; sinon commit de mesure + correctif si **LCP** dépasse **+10 %** vs `lighthouse-after-2b1.json`).  
3. **`prefers-reduced-motion`** : recette **manuelle** + e2e **§5** avant merge de chaque sous-vague.  
4. **Qualité** : `lint`, `tsc`, `vitest`, `test:e2e` (**`CI=true`** sur Windows si besoin, cf. `playwright.config`) — **tous verts** avant merge.  
5. **Pas d’animation** hors les **6** lignes du §1 ; pas de nouveau `motion` sans mise à jour de ce plan.  
6. **Compteur (2)** — paramètres numériques figés pour l’implémentation : durée **450 ms**, easing **`easeOut`** (courbe CSS équivalente ou interpolation manuelle), pas de random ; arrêt propre si l’élément quitte le viewport pendant l’anim (option : fin instantanée à la valeur cible).

---

## 7. Références croisées

- Plan Phase 2B parent : [`phase_2b_home_7d3a9c41.plan.md`](phase_2b_home_7d3a9c41.plan.md) (§2 animations, §2.1 CLS compteur, §3.2 règle LCP).  
- Baseline post-2B.1 : [`docs/baselines/phase-2b/lighthouse-after-2b1.json`](../baselines/phase-2b/lighthouse-after-2b1.json).
