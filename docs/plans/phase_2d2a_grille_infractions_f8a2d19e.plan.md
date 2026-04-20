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

### 2.2 Recherche — debounce (**tranché, spec technique**)

**Décision unique** : **`useDebouncedValue(query, 150)`** — hook custom dans **`src/hooks/use-debounced-value.ts`** (nom export exact **`useDebouncedValue`**), réutilisable hors infractions.

**Interdit dans cette vague** : **`useDeferredValue`** (React) pour piloter le filtrage sur cette spec.

**Raisons (durcissement)** :

1. **150 ms** est une **spec figée** du plan parent Phase 2D — à respecter telle quelle, pas une approximation du moteur React.
2. Comportement **prédictible** (délai fixe) vs `useDeferredValue`, dépendant de la charge scheduler.
3. **Testabilité e2e** : fenêtre temporelle stable pour d’éventuels tests de timing / non-régression sur le filtrage.
4. **Une seule source de vérité** : la valeur affichée dans l’input peut rester instantanée ; la valeur **utilisée pour le filtre** est la valeur debouncée (documenter dans le commit si besoin).

### 2.3 Point bloquant — tags « crime / délit / contravention » vs **priorité examen** (§2 plan parent)

**Livrable factuel pour arbitrage Cas A / B** (ne pas trancher dans ce plan — décision produit / utilisateur) : voir **type exporté** et **exemple** ci-dessous. Tant que le Cas n’est pas choisi, **aucune implémentation** des tags pénaux au-delà de ce qui est déjà en données.

### 2.4 Structure des données catalogue — **réponse factuelle (Cas A / B)**

Source : [`getInfractionsCatalog()`](../../src/data/recapitulatif-data.ts) construit des objets **`InfractionCatalogItem`** à partir des `RecapRow` des sections.

**Types exportés** (fidèles à [`recapitulatif-data.ts`](../../src/data/recapitulatif-data.ts) au moment de la révision) :

```ts
/** Alignée sur PRIORITE_EXAMEN_BADGE — priorité pédagogique examen, pas nature pénale. */
export type RecapPriorite = 'core' | 'freq' | 'secours';

export type RecapFasciculeId = 'F01' | 'F02' | 'F03' | 'F04' | 'F05' | 'F06' | 'F07';

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
  /** Renseigné côté UI via correspondance flashcards (OUI / NON) */
  tentative?: string;
  complicite?: string;
  /** Matériel / moral issus de l’audit fascicule lorsque la ligne est validée. */
  elementsSource?: 'site' | 'fascicule_audit';
};
```

**Constat factuel** : il **n’existe pas** de champ explicite `nature` / `typePenal` / `classification` avec valeurs **`'crime' | 'délit' | 'contravention'`**. Les dimensions disponibles côté données pour distinguer les entrées sont notamment :

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

### 2.5 Fichier dédié `infractions-motion.ts` (**tranché — jamais d’inline**)

- **Règle** : **tous** les objets `variants` Framer pour la vague **2D.2.a** résident dans **`src/components/infractions/infractions-motion.ts`**, sur le même modèle que [`home-landing-motion.ts`](../../src/components/home/home-landing-motion.ts) (Phase 2B.2.2). **Aucun** `variants={…}` inline ni objet motion ad hoc dans **`InfractionsPageClient.tsx`** (hors props `initial`/`animate`/`exit` qui **référencent** des noms définis dans le fichier dédié).
- **Exports obligatoires** :
  - **`gridContainerVariants`** — variantes de base (stagger container si utilisé) ;
  - **`cardVariants`** — variantes de base des items ;
  - **`getGridContainerVariants(shouldReduceMotion: boolean)`** ;
  - **`getCardVariants(shouldReduceMotion: boolean)`** — si **`shouldReduceMotion === true`** : **stagger 0**, **durées de transition 0** (instantané, pas de motion superflue), aligné §4 et Phase 2B.

### 2.6 Tags / code couleur — **décision : Cas B** (données sans nature pénale typée)

- **Retenu** : pas de tags « crime / délit / contravention » — **uniquement** le code couleur **priorité examen** via **`PRIORITE_EXAMEN_BADGE`** (tokens **`ij.*`** dans [`recapitulatif-data.ts`](../../src/data/recapitulatif-data.ts)).
- **Familles** thématiques : inchangées ; pas d’équivalence automatique crime/délit/contravention sans champ données dédié (§2.4).

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

## 4. Tests e2e + pattern `data-reduced-motion` (**tranché — obligatoire**)

Aligné **Phase 2B** (même esprit que les sections accueil / `data-reduced-motion` sur composants animés).

### 4.1 Booléen `shouldReduceMotion`

- **Source** : préférence **`prefers-reduced-motion: reduce`** (ex. hook projet basé sur `matchMedia` + `useSyncExternalStore`, ou équivalent **fiable** avec les media queries du navigateur / Playwright). L’important pour le plan est le **booléen unique** **`shouldReduceMotion`** passé aux getters motion et aux attributs `data-*`.

### 4.2 Attributs `data-*` (synchronisation grille + cartes)

- **Conteneur liste / grille** (`data-testid="infractions-grid"`) :  
  **`data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}`** — **même valeur** que pour chaque carte.
- **Chaque carte** (`motion.div` item, `data-testid="infraction-card"`) :  
  **`data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}`**.

Les **variants** Framer appliqués à ces nœuds sont ceux retournés par **`getGridContainerVariants(shouldReduceMotion)`** et **`getCardVariants(shouldReduceMotion)`** (§2.5) : en mode reduce, **stagger 0**, **durées 0**.

### 4.3 Fichier `e2e/infractions.spec.ts` (obligatoire pour 2D.2.a)

- **Axe** : pas de violation `serious` / `critical` sur `/infractions` (vue liste).
- **Clavier / repères** : au minimum champ recherche focusable ; ordre logique documenté dans le spec.
- **`data-testid`** : `infractions-grid`, `infraction-card`, et champ recherche (`data-testid` dédié si présent).
- **Reduced motion (obligatoire)** — assertion **exacte** à couvrir :
  1. `await page.emulateMedia({ reducedMotion: 'reduce' });`
  2. Navigation vers **`/infractions`** (avec `?vue=liste` si nécessaire pour la vue liste).
  3. **`await expect(page.getByTestId('infraction-card').first()).toHaveAttribute('data-reduced-motion', 'true');`**
  4. (Recommandé : **`await expect(page.getByTestId('infractions-grid')).toHaveAttribute('data-reduced-motion', 'true');`**)

**Note implémentation** : si le contenu liste est dans un **accordéon** fermé par défaut et que les cartes ne sont pas dans le DOM tant qu’un groupe n’est pas ouvert, le test doit **ouvrir un groupe** (ex. clic sur le premier trigger) **avant** l’assert sur `infraction-card`.

**Note périmètre** : le plan parent mentionne aussi **`fondamentaux.spec.ts`** — hors fichier unique **2D.2.a** ; traiter en vague hub / plan parent.

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
| Statut | **Cas B appliqué** — implémentation grille / debounce / motion / e2e alignée plan (2026-04-20) |
| Dernière mise à jour | 2026-04-20 |
