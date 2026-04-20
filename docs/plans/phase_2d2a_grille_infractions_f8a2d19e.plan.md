# Phase 2D.2.a — Grille `/infractions` (`InfractionsPageClient`)

> **Périmètre** : **un seul fichier** — [`src/components/infractions/InfractionsPageClient.tsx`](../../src/components/infractions/InfractionsPageClient.tsx).  
> **Parent** : [`phase_2d_infractions_fondamentaux_d1597d11.plan.md`](phase_2d_infractions_fondamentaux_d1597d11.plan.md) §2, §2.1, §4–§5.  
> **Prérequis** : Phase **2E** clôturée (`bbd76b8` +) ; tokens `ij` avec opacité fonctionnels.  
> **Versionnement** : committer ce fichier dès création ([`.cursor/rules/plans-versioning.mdc`](../../.cursor/rules/plans-versioning.mdc)).

---

## 1. Périmètre exact

| Élément | Détail |
|---------|--------|
| **Fichier** | `InfractionsPageClient.tsx` **uniquement** (pas `InfractionsTable`, pas flash, pas détail — vagues **2D.2.b / 2D.2.c**). |
| **Volume** | **~444 lignes** au dépôt courant ; le plan parent indiquait **479** — écart acceptable si refactor mineur ; vérifier `wc -l` au démarrage du chantier. |
| **Tokens `ij` avec opacité** | **~18–21** occurrences de motifs du type `…-ij-…/…`, `…ij-text/[…]` (grep sur le fichier) — **déjà migrés** en **2D.1** + **2E.1** ; pas de refonte token dans **2D.2.a** sauf cohérence nécessaire aux tags (§2). |
| **Données** | Catalogue `getInfractionsCatalog`, filtres famille (`INFRACTION_FAMILY_OPTIONS`), priorité examen (`PRIORITE_EXAMEN_BADGE` / `RecapPriorite`), recherche, vues liste (cartes) — inchangés fonctionnellement. |

**Hors scope 2D.2.a** : `ViewToggle` → tableau (fichier autre vague), drawer mobile, mode flash.

---

## 2. Spécifications animations

### 2.1 Comportement cible

- **`AnimatePresence`** sur la zone liste / grille filtrée pour les apparitions/disparitions d’items lors des changements de filtre ou de résultats de recherche.
- **`motion.div`** avec stratégie **`layout`** conforme au **benchmark FPS** et aux paliers §3 (pas de `layout` aveugle sur ~160 cartes sans mesure).

### 2.2 Recherche — debounce

- **150 ms** de debounce sur le champ de recherche **ou** `useDeferredValue` sur la chaîne filtrante — **un seul choix** par commit, justifié en message de commit (latence perçue vs simplicité).

### 2.3 Tags / code couleur

Le plan parent §2 mentionne des bordures **`border-ij-danger` / `border-ij-primary` ou `border-ij-accent` / `border-ij-border`** pour distinguer des catégories.

À la réalité du composant :

- Les **familles** d’infractions sont thématiques (`personnes`, `biens`, `circulation`, …) — **pas** crime/délit/contravention au sens CPP strict dans [`infractions-family-filter.ts`](../../src/data/infractions-family-filter.ts).
- Les **badges de priorité examen** (`core` / `freq` / `secours`) utilisent aujourd’hui des classes **rose / amber / slate** dans [`PRIORITE_EXAMEN_BADGE`](../../src/data/recapitulatif-data.ts).

**Décision à figer en 2D.2.a** : soit migrer les badges priorité vers une palette **`ij.*`** alignée charte (ex. danger / warning / `border-ij-border` + texte), soit conserver les couleurs actuelles pour la vague motion uniquement — **documenter le mapping** dans le PR. Aucune régression de lisibilité (contraste WCAG).

### 2.4 Variants Framer Motion

- **Objets TS complets** (`as const`), exportés depuis un module dédié — ex. **`src/components/infractions/infractions-motion.ts`** (nouveau) **ou** extension contrôlée de [`home-landing-motion.ts`](../../src/components/home/home-landing-motion.ts) si partage de conventions.
- **Interdit** dans le JSX : stagger du type `i * 0.08` inline ; reporter les durées/stagger dans les **variants nommés** (comme `diagnosticGridVariants` / `diagnosticCardVariants` en 2B.2.2).

---

## 3. Fallback performance (paliers layout)

Aligné sur le plan parent **§2.1** :

| FPS moyen (timeline pendant l’action §3.1) | Stratégie `layout` |
|-------------------------------------------|-------------------|
| **≥ 50** | `layout` sur toutes les cartes encore rendues dans la liste filtrée. |
| **30–50** | `layout` **uniquement** sur les cartes **visibles** (viewport — `IntersectionObserver` / `rootMargin`). |
| **&lt; 30** | Pas de `layout` Framer : **`AnimatePresence` seul** + transitions CSS légères. |

### 3.1 Benchmark obligatoire (avant de figer le code)

1. **Chrome DevTools** → **Performance** → enregistrement.
2. **Action** : dans le champ recherche, **taper rapidement 5 lettres** (séquence fixée, ex. `volvo`, documentée dans le commit).
3. Lire le **FPS moyen** pendant la fenêtre de l’action (pas le cold load).
4. En cas de doute : **3 mesures**, prendre la **médiane**, puis appliquer le palier.

---

## 4. Tests e2e

- **Nouveau fichier** : `e2e/infractions.spec.ts` (ou nom équivalent dans `e2e/`), dédié au périmètre **liste** `/infractions` :
  - **Axe** : pas de violation `serious`/`critical` sur la page (aligné smoke existant).
  - **Clavier** : navigation Tab vers filtres / cartes / recherche (ordre logique).
- **`data-testid`** sur éléments critiques (champ recherche, premier filtre famille, première carte liste) pour stabilité des sélecteurs.
- **`data-reduced-motion`** ou équivalent sur le conteneur animé si cohérent avec **Phase 2B** (réduire motion = pas d’animation layout coûteuse, à trancher avec implémentation).

**Note** : les tests **2D** parent mentionnaient aussi `fondamentaux.spec.ts` — hors **2D.2.a** (autre vague).

---

## 5. CLS (Cumulative Layout Shift)

- **Réserver** un **`min-height`** (ou skeleton de hauteur stable) au conteneur de la grille / liste pour éviter le saut de page lors du filtrage ou du debounce.
- Les e2e peuvent inclure une assertion **« pas de CLS brutal »** via stabilité de `boundingBox` du conteneur avant/après filtre (Playwright), ou vérification de hauteur minimale — à définir dans l’implémentation (pas de Lighthouse dédié ici).

---

## 6. Lighthouse et mesure globale

- **Pas de passage Lighthouse obligatoire** pour la seule vague **2D.2.a**.
- La mesure **globale** infractions + fondamentaux et comparaison **before/after-2D** reste en **Phase 2D.5** (plan parent §3).

---

## Méta

| Champ | Valeur |
|-------|--------|
| Phase | 2D.2.a — Grille infractions + motion |
| Statut | Plan — en attente validation |
| Dernière mise à jour | 2026-04-20 |
