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

### 2.2 Recherche — debounce (**figé**)

- **Décision** : hook **`useDebouncedValue(query, 150)`** (nom exact **`useDebouncedValue`**) dans **`src/hooks/use-debounced-value.ts`**, réutilisable ailleurs.
- **Pas** de `useDeferredValue` pour cette vague : le **150 ms** est une spec du plan parent ; comportement **prédictible** et **testable en e2e** avec fenêtre temporelle stable.

### 2.3 Structure des données catalogue — **réponse factuelle (Cas A / B)**

Source : [`getInfractionsCatalog()`](../../src/data/recapitulatif-data.ts) construit des objets **`InfractionCatalogItem`** à partir des `RecapRow` des sections.

**Type exporté** (extrait fidèle au fichier) :

```ts
export type InfractionCatalogItem = {
  id: string;
  fascicule: RecapFasciculeId;
  fasciculePart?: string;
  groupTitle: string;
  infraction: string;
  legal: string;
  materiel: string;
  moral: string;
  priorite?: RecapPriorite;
  noteExamen?: string;
  flashcardsCat?: 'atteintes-aux-personnes' | 'atteintes-aux-biens';
  tentative?: string;
  complicite?: string;
  elementsSource?: 'site' | 'fascicule_audit';
};
```

**Constat** : il **n’existe pas** de champ typé `nature` / `typePenal` / `classification` avec valeurs `'crime' | 'délit' | 'contravention'`. Les dimensions disponibles pour le code couleur côté données sont notamment :

- **`fascicule`** + **`fasciculePart`** / **`groupTitle`** (périmètre éditorial / fascicule) ;
- **`priorite`** (`RecapPriorite` = `'core' | 'freq' | 'secours'`) — alignée sur **`PRIORITE_EXAMEN_BADGE`** (priorité examen, pas la nature pénale) ;
- filtres **famille** côté UI : mapping **`fascicule` → famille** thématique dans [`infractions-family-filter.ts`](../../src/data/infractions-family-filter.ts) (`personnes`, `biens`, etc.).

**Exemple d’entrée complète** (première ligne catalogue générée depuis `recapSectionF01P1`, équivalent à ce que retourne `getInfractionsCatalog()[0]` pour cette ligne) :

```json
{
  "id": "f01-p1-r0",
  "fascicule": "F01",
  "fasciculePart": "Partie 1",
  "groupTitle": "F01 — Atteintes aux personnes (partie 1)",
  "infraction": "**Le meurtre**",
  "legal": "Art. 221-1 C.P.",
  "materiel": "**UN ACTE POSITIF DE VIOLENCE** / **SUR LA PERSONNE D'AUTRUI** / **UN LIEN DE CAUSALITÉ ENTRE L'ACTE ET LE DÉCÈS DE LA VICTIME**",
  "moral": "**UNE INTENTION HOMICIDE**",
  "priorite": "core",
  "noteExamen": "Socle programme — citez la définition au mot près.",
  "flashcardsCat": "atteintes-aux-personnes"
}
```

**Branchement Cas A / B** (ne pas implémenter avant arbitrage produit) :

| Cas | Condition | Implémentation indicative |
|-----|-----------|---------------------------|
| **A** | Si l’on **ajoute** un champ nature en données (hors scope immédiat sauf décision) | Tags crime/délit/contravention avec **`border-ij-danger` / `border-ij-primary` / `border-ij-border`** (ou équivalent charte) **en plus** de **`PRIORITE_EXAMEN_BADGE`**. |
| **B** | Tant qu’**aucun** champ nature n’existe (état actuel) | Renoncer aux tags « crime/délit/contravention » au sens plan parent ; conserver le **code couleur priorité examen** ; migration **`PRIORITE_EXAMEN_BADGE` → tokens `ij.*`** si nécessaire. Noter que le prompt Phase 2D était **imprécis** sur la distinction priorité examen vs classification pénale. |

### 2.4 Fichier dédié `infractions-motion.ts` (**figé**)

- **Règle** : tous les variants Framer pour cette vague vivent dans **`src/components/infractions/infractions-motion.ts`** (même esprit que [`home-landing-motion.ts`](../../src/components/home/home-landing-motion.ts) — Phase 2B.2.2). **Aucun** objet `variants` inline dans **`InfractionsPageClient.tsx`**.
- **Exports attendus** :
  - `gridContainerVariants` — variantes statiques de base si utiles ;
  - `cardVariants` — idem ;
  - **`getGridContainerVariants(shouldReduceMotion: boolean)`** ;
  - **`getCardVariants(shouldReduceMotion: boolean)`** — en `prefers-reduced-motion` : stagger **0**, durées **0** (instantané / pas de motion superflue), cohérent §4.

### 2.5 Tags / code couleur (après arbitrage §2.3)

- Tant que **Cas B** : priorité **`PRIORITE_EXAMEN_BADGE`** + migration **`ij.*`** si validé.
- **Familles** thématiques : inchangées fonctionnellement ; pas d’équivalence automatique crime/délit/contravention sans donnée nouvelle.

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

## 4. Tests e2e + pattern `data-reduced-motion` (**obligatoire**)

Aligné **Phase 2B** (cohérence accessibilité / tests).

### 4.1 Attributs `data-*` sur la grille et les cartes

- **Conteneur grille** : `data-testid="infractions-grid"` et **`data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}`** (même valeur booléenne que les cartes, synchronisée avec `useReducedMotion()` ou équivalent Framer).
- **Chaque carte** (`motion.div` item) : `data-testid="infraction-card"` et **`data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}`**.

Les **variants** utilisés par ces nœuds sont ceux retournés par **`getGridContainerVariants` / `getCardVariants`** (§2.4), paramétrés par **`shouldReduceMotion`** (stagger 0, transition durée 0 en mode reduce).

### 4.2 Fichier `e2e/infractions.spec.ts`

- **Axe** : pas de violation `serious`/`critical` sur `/infractions` (liste).
- **Clavier** : Tab vers recherche, filtres, cartes (ordre logique).
- **`data-testid`** : au minimum `infractions-grid`, `infraction-card`, champ recherche (ex. `data-testid` dédié si ajouté sur l’input).
- **Reduced motion (obligatoire)** :
  - `await page.emulateMedia({ reducedMotion: 'reduce' });`
  - `await page.goto('/infractions');`
  - `await expect(page.getByTestId('infraction-card').first()).toHaveAttribute('data-reduced-motion', 'true');`
  - (Variante : vérifier aussi `infractions-grid` à `'true'`.)

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
| Statut | Plan — durcissements §2.2–§2.4 + §4 (2026-04-20), arbitrage tags §2.3 en attente |
| Dernière mise à jour | 2026-04-20 |
