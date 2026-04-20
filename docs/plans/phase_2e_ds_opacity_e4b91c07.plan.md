# Phase 2E — Fix design system opacity (tokens `ij.*` + Tailwind v3)

> **Décision** : Option A — correctif racine immédiat. Phase 2D mise en **pause** après 2D.1 ; reprise après validation 2E (voir §7).  
> **Versionnement** : committer ce fichier dès création (`docs(plan): Phase 2E — fix design system opacity (diagnostic 2D.1)`).

---

## §1. Contexte et déclencheur

- **Déclencheur** : échec du smoke test post-2D.1 sur le filtre `#fondamentaux-filter` (fond d’input incohérent / contraste).
- **Cause racine** : dans `tailwind.config.ts`, les couleurs `colors.ij.*` pointent vers `var(--ij-…)` alors que les variables dans `src/styles/globals.css` sont en **hex** (`#rrggbb`). Avec Tailwind v3, les utilitaires avec opacité (`bg-ij-surface-2/80`, `ring-ij-accent/50`, etc.) nécessitent des couleurs au format **compatible alpha** (souvent triplets RGB + `rgb(var(...) / <alpha-value>)`). Les classes `/xx` correspondantes **ne sont pas émises** dans le CSS compilé.
- **Inventaire (périmètre `src/`)** :
  - **236** occurrences cumulées (motifs `bg|text|border|ring|from|to|via` + `ij-*` + `/\d+`).
  - **92** variantes de classes distinctes.
  - **18** fichiers sources touchés.
  - **0** de ces 92 variantes présentes dans les chunks `.next/static/css/*.css` après build (classes utilisées dans le source mais absentes du bundle).
- **Impact accessibilité** : **47** occurrences de `ring-ij-*/…` — les anneaux de focus reposant sur ces classes **ne sont pas générés** ; régression silencieuse depuis l’introduction du design system Phase 1 (focus clavier dégradé là où ces classes sont utilisées).

**Commits de référence** : l’historique jusqu’à `2242080` (et antérieur) reste valide au sens logique ; le smoke test échoue par **régression révélée** (cause racine ci-dessus), pas par erreur fonctionnelle isolée à 2D.1.

---

## §2. Correctif technique

### §2.1 — Format variables CSS (`src/styles/globals.css`)

Remplacer chaque valeur **hex** des tokens couleur `ij` par un **triplet RGB** (nombres séparés par des espaces), pour permettre `rgb(var(--token) / <alpha>)` côté Tailwind.

**14 couleurs** × **2 thèmes** = **28 lignes** de valeurs à modifier (les deux blocs `:root` et `.dark`).

| Token | Light actuel | Light nouveau | Dark actuel | Dark nouveau |
|-------|----------------|---------------|-------------|--------------|
| `--ij-bg` | `#faf9f6` | `250 249 246` | `#0e1420` | `14 20 32` |
| `--ij-surface` | `#f4f2ec` | `244 242 236` | `#161d2c` | `22 29 44` |
| `--ij-surface-2` | `#edeae0` | `237 234 224` | `#1f2738` | `31 39 56` |
| `--ij-border` | `#d8d3c4` | `216 211 196` | `#2a3145` | `42 49 69` |
| `--ij-border-strong` | `#a89f87` | `168 159 135` | `#3d4660` | `61 70 96` |
| `--ij-text` | `#1a1a1a` | `26 26 26` | `#f2efe6` | `242 239 230` |
| `--ij-text-muted` | `#5a5246` | `90 82 70` | `#b5ac97` | `181 172 151` |
| `--ij-text-subtle` | `#7a7060` | `122 112 96` | `#867e6c` | `134 126 108` |
| `--ij-primary` | `#1a2847` | `26 40 71` | `#f2efe6` | `242 239 230` |
| `--ij-accent` | `#8b6b1f` | `139 107 31` | `#d4a853` | `212 168 83` |
| `--ij-accent-soft` | `#e8d9b2` | `232 217 178` | `#3a2e14` | `58 46 20` |
| `--ij-success` | `#1f6b3a` | `31 107 58` | `#4ade80` | `74 222 128` |
| `--ij-warning` | `#a85d00` | `168 93 0` | `#fbbf24` | `251 191 36` |
| `--ij-danger` | `#a02020` | `160 32 32` | `#f87171` | `248 113 113` |

**Exemple de forme attendue après modification** :

```css
:root {
  --ij-bg: 250 249 246;
  /* … */
}
.dark {
  --ij-bg: 14 20 32;
  /* … */
}
```

*(Ne pas ajouter de `rgb()` dans la valeur de la variable : uniquement les trois entiers.)*

### §2.2 — Format `tailwind.config.ts` (`theme.extend.colors.ij`)

**14 entrées** à migrer (liste exhaustive — c’est bien le nombre actuel dans le dépôt ; il n’y a pas de 15ᵉ clé `focus-ring` dans `colors.ij`).

Pour chaque entrée, passer de `var(--ij-…)` à la forme compatible opacité Tailwind v3 :

```ts
// AVANT
'surface-2': 'var(--ij-surface-2)',

// APRÈS
'surface-2': 'rgb(var(--ij-surface-2) / <alpha-value>)',
```

| Clé `colors.ij` | Avant | Après |
|-----------------|-------|-------|
| `bg` | `'var(--ij-bg)'` | `'rgb(var(--ij-bg) / <alpha-value>)'` |
| `surface` | `'var(--ij-surface)'` | `'rgb(var(--ij-surface) / <alpha-value>)'` |
| `surface-2` | `'var(--ij-surface-2)'` | `'rgb(var(--ij-surface-2) / <alpha-value>)'` |
| `border` | `'var(--ij-border)'` | `'rgb(var(--ij-border) / <alpha-value>)'` |
| `border-strong` | `'var(--ij-border-strong)'` | `'rgb(var(--ij-border-strong) / <alpha-value>)'` |
| `text` | `'var(--ij-text)'` | `'rgb(var(--ij-text) / <alpha-value>)'` |
| `text-muted` | `'var(--ij-text-muted)'` | `'rgb(var(--ij-text-muted) / <alpha-value>)'` |
| `text-subtle` | `'var(--ij-text-subtle)'` | `'rgb(var(--ij-text-subtle) / <alpha-value>)'` |
| `primary` | `'var(--ij-primary)'` | `'rgb(var(--ij-primary) / <alpha-value>)'` |
| `accent` | `'var(--ij-accent)'` | `'rgb(var(--ij-accent) / <alpha-value>)'` |
| `accent-soft` | `'var(--ij-accent-soft)'` | `'rgb(var(--ij-accent-soft) / <alpha-value>)'` |
| `success` | `'var(--ij-success)'` | `'rgb(var(--ij-success) / <alpha-value>)'` |
| `warning` | `'var(--ij-warning)'` | `'rgb(var(--ij-warning) / <alpha-value>)'` |
| `danger` | `'var(--ij-danger)'` | `'rgb(var(--ij-danger) / <alpha-value>)'` |

Les utilitaires **sans** slash (`bg-ij-accent`, `text-ij-text`, etc.) continuent de fonctionner (alpha implicite 1).

### §2.3 — Cas particulier `--ij-focus-ring` (déjà en `rgba(...)`)

**Décision : option A — le laisser tel quel** (pas de conversion obligatoire dans cette phase).

**Justification** :

- La variable `--ij-focus-ring` est définie dans `globals.css` en **rgba** pour light et dark, mais **n’est pas** exposée dans `theme.extend.colors.ij` du `tailwind.config.ts` actuel.
- Aucune utilisation `var(--ij-focus-ring)` dans les composants TSX/TS repérée hors documentation ; le focus « produit » repose surtout sur `ring-ij-accent/…` et `outline-*` globaux.
- Si besoin futur d’un `ring-ij-focus-ring/xx` : soit ajout d’une clé dédiée avec triplet + `rgb(var(--ij-focus-ring) / <alpha-value>)` après avoir posé `--ij-focus-ring: R G B` (sans rgba), soit usage direct de `rgba` dans une règle CSS custom — **hors périmètre** du correctif minimal 2E.1.

**Option B** (conversion au même pattern RGB + entrée Tailwind) reste possible plus tard pour homogénéité documentaire (`docs/DESIGN_SYSTEM.md`), sans bloquer 2E.

---

## §3. Risques et régressions attendues

Tout endroit où `bg-ij-*/XX`, `border-ij-*/XX`, `ring-ij-*/XX`, `from|via|to-ij-*/XX` était utilisé va **commencer à appliquer** la couleur avec la vraie opacité (au lieu d’un rendu proche du défaut navigateur / transparent).

**Fichiers à surveiller en priorité** (volume d’occurrences) :

| Fichier | Occurrences |
|---------|-------------|
| `src/components/home/sections/home-refonte-sections.tsx` | 67 |
| `src/components/infractions/InfractionsTable.tsx` | 30 |
| `src/components/layout/SiteHeaderClient.tsx` | 30 |
| `src/components/home/sections/hero-section.tsx` | 28 |
| `src/components/infractions/InfractionsPageClient.tsx` | 18 |

**Treize autres fichiers** (volume moindre, même risque) :  
`home-journey-strip.tsx` (12), `InfractionsFlashMode.tsx` (12), `Footer.tsx` (10), `home-stats-section.tsx` (7), `home-page-client.tsx` (6), `CoursFichesListClient.tsx` (4), `InfractionDetailContent.tsx` (4), `AnimatedStat.tsx` (2), `BrandWordmark.tsx` (2), `app/fondamentaux/page.tsx` (1), `app/fondamentaux/[slug]/page.tsx` (1), `InfractionAudioCoach.tsx` (1), `InfractionDetailBubble.tsx` (1).

**Types de changement visuel possibles** :

- Fonds (inputs, panneaux) : passage d’un fond incorrect vers la **vraie** teinte semi-transparente.
- **Focus rings** : apparition ou renforcement visibles (comportement attendu, aligné WCAG).
- Bordures et dégradés : densité / lisibilité modifiée là où les classes étaient « fantômes ».

---

## §4. Protocole de QA visuelle

Avant de considérer 2E terminée, recette manuelle **dark mode** sur :

| Route | Focus |
|-------|--------|
| `/` | Home, sections refonte, hero |
| `/infractions` | Table, flash, filtres |
| `/fondamentaux` | Liste + filtre `#fondamentaux-filter` |
| `/entrainement` | Hub + sous-pages principales |
| `/entrainement/articulation` | Parcours articulation |

**Captures pour comparaison côte à côte (obligatoire avant merge final 2E)** :

- **Avant** le commit fonctionnel **2E.1** : captures sur les **5 routes** ci-dessus, **dark mode**, **desktop + mobile** (ex. 1440×900 et 390×844), stockées dans `docs/baselines/phase-2e/screenshots-before/` (arborescence libre : par route et viewport, ex. `home-desktop.png`).
- **Après** build **2E.1** : mêmes angles, mêmes viewports → `docs/baselines/phase-2e/screenshots-after/`.

**Comparaison côte à côte** (revue humaine) pour détecter les régressions non anticipées :

- **Focus rings** : apparition attendue vs trop épais / mal positionnés.
- **Composants** qui comptaient sur une transparence « cassée » pour un effet volontaire (à identifier avant qu’ils ne se comportent différemment).
- **Dégradés et halos** : densité / contraste modifiés.

**Traçabilité Git** : commit séparé `chore(qa): screenshots avant Phase 2E` puis, après le correctif, `chore(qa): screenshots après Phase 2E` (ne pas mélanger avec le commit `fix(ds)`).

Pour chaque route (checklist comportementale) :

- Pas de régression flagrante (bloc illisible, contraste cassé).
- Au **Tab** : anneaux de focus visibles et cohérents avec la charte (or / accent).
- États **hover** / **focus** / cartes inchangés ou améliorés.

---

## §5. Tests automatiques

### Lighthouse et baselines Phase 2D

**Impact Lighthouse attendu : aucun** — changement de **format CSS** pur (variables + génération Tailwind), pas de JS ajouté ; le bundle CSS peut être **marginalement** plus lourd (classes `/xx` désormais émises), négligeable pour les scores.

Les baselines `docs/baselines/phase-2d/lighthouse-before-2d-infractions.json` et `docs/baselines/phase-2d/lighthouse-before-2d-fondamentaux.json` **restent valides** pour la comparaison prévue en **Phase 2D.5**. **Pas de remesure Lighthouse / nouvelle baseline avant 2E.1** spécifiquement pour 2E.

### Tests outillage

- **Unit** : impact attendu faible (peu ou pas de tests sur les chaînes de classes).
- **E2E** : le smoke test qui échouait sur `/fondamentaux` (filtre) doit **redevenir vert** une fois le CSS réellement généré.
- **Axe / a11y** : possibilité de **moins** de violations sur le focus visible si les `ring-ij-*` deviennent effectifs ; surveiller aussi les contrastes si des aplats deviennent plus opaques.

### Critère de validation bloquant — classes émises dans le CSS (post-build)

Après `npm run build` **2E.1**, vérifier que les utilitaires `ij` avec opacité sont **réellement présents** dans `.next/static/css/*.css` (sinon le correctif n’a pas pris effet).

Exemple (adapter les motifs si besoin ; échappement `\/` selon le shell) :

```bash
npm run build
# Au moins 5 patterns issus de l’inventaire §1 — cible : 5/5 avec correspondance dans au moins un fichier CSS :
grep -l "bg-ij-surface-2\\\\/80" .next/static/css/*.css
grep -l "ring-ij-accent\\\\/50" .next/static/css/*.css
grep -l "border-ij-border\\\\/70" .next/static/css/*.css
grep -l "from-ij-accent\\\\/20" .next/static/css/*.css
grep -l "text-ij-text-subtle\\\\/90" .next/static/css/*.css
```

**Règle** : **5/5** motifs trouvés (fichier CSS listé). Si **moins de 5** : **ne pas valider** — investigation obligatoire avant commit fonctionnel.

---

## §6. Découpage

| Jalons | Contenu |
|--------|---------|
| **2E.1** | Modification atomique : `globals.css` (triplets RGB) + `tailwind.config.ts` (`rgb(var(...) / <alpha-value>)`). Idéalement **un commit** fonctionnel. |
| **2E.2** | QA visuelle manuelle + captures + petits ajustements de classes si régression majeure localisée. |
| **2E.3** | Smoke + E2E complets au vert ; validation équipe. |

Commits correctifs mineurs autorisés après 2E.1 si la QA 2E.2 l’exige.

---

## §7. Reprise Phase 2D

Après **2E validée** :

1. **2D.1** : revalidation rétroactive (smoke + critères 2D.1 une fois le DS corrigé).
2. Puis **2D.2.a** (grille infractions, animations, etc.) selon le plan 2D parent.

---

## §8. Références

- Diagnostic Phase 2D.1 / inventaire : **236 / 92 / 18**, **0** classe d’opacité `ij` émise dans le CSS agrégé (chunks `.next/static/css/*.css`).
- Fichiers sources : `src/styles/globals.css` (tokens `--ij-*`), `tailwind.config.ts` (`colors.ij`).
- Documentation Tailwind v3 — couleurs et variables CSS : [Customizing colors — Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables) (pattern `rgb(var(--name) / <alpha-value>)`).
- Plan Phase 2D parent : `docs/plans/phase_2d_infractions_fondamentaux_d1597d11.plan.md` (reprise après 2E).

---

## 9. Clôture Phase 2E

- **2E.1** close au commit **`bbd76b8`** (triplets RGB + `tailwind.config.ts` migré).
- Screenshots avant (**`0433089`**) et après (**`77eb901`**) versionnés.
- Grep CSS compilé : **5/5** patterns émis.
- Tests : **104** unit + **31** e2e verts (dont smoke `/fondamentaux` dans le lot).
- Mesures runtime : `#fondamentaux-filter` → `rgba(31, 39, 56, 0.8)` en dark (équivalent marine **80 %**).
- QA visuelle 5 routes × 2 viewports : aucune régression constatée.
- Dette a11y Phase 1 résolue côté utilitaires : **47** occurrences `ring-ij-*` désormais **émises** et effectives dans le bundle.
- Option **`--ij-focus-ring`** : laissé en `rgba` standalone (non exposé dans `colors.ij` Tailwind), cf. §2.3.

**Reprise Phase 2D** : **2D.1** rétroactivement validée ; feu vert **2D.2.a** — plan [`phase_2d2a_grille_infractions_f8a2d19e.plan.md`](phase_2d2a_grille_infractions_f8a2d19e.plan.md).

---

## Méta

| Champ | Valeur |
|-------|--------|
| Phase | 2E — Fix design system opacity |
| Statut | **Clôturée** — §9 (2026-04-20) |
| Dernière mise à jour | 2026-04-20 |
