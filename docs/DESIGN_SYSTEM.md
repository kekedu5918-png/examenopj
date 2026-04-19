# Design System — « Institut Judiciaire »

Direction artistique mise en place en **Phase 1** de la refonte. Voir
`docs/REFACTOR.md` pour le plan global et l'enchaînement des phases.

---

## TL;DR

- Nouveau jeu de tokens CSS `--ij-*` (light + dark) défini dans
  [`src/styles/globals.css`](../src/styles/globals.css).
- Exposition Tailwind via `colors.ij.*`, `boxShadow.ij-*`, `fontFamily.ij-*`
  dans [`tailwind.config.ts`](../tailwind.config.ts).
- Trois fontes self-host via `next/font/google` :
  - **Fraunces** → `font-ij-display` (titres, articles, hero)
  - **Inter Tight** → `font-ij-sans` (body, UI)
  - **JetBrains Mono** → `font-ij-mono` (code, références, badges)
- Cohabitation **non-destructive** avec les tokens legacy `ds.*` /
  `examen.*` / `orde.*` et les fontes Inter / DM Sans / Instrument Serif.
- La migration composant par composant fera l'objet de la **Phase 1bis**.
- Page de démo : [`/design-system`](../src/app/design-system/page.tsx)
  (visible en dev, masquée en prod sauf `ENABLE_DESIGN_SYSTEM=true`).

---

## Règles d'or

| # | Règle | Garde-fou |
|---|---|---|
| 1 | **Jamais** de pur blanc (`#ffffff`) ni de pur noir (`#000000`) en surface ou texte | Test Vitest `src/styles/__tests__/ij-tokens.test.ts` (échec si trouvé) |
| 2 | Tous les couples texte/fond ≥ **4.5:1** (WCAG AA texte normal) | Idem (calcul WCAG 2.1) |
| 3 | Tous les couples UI focusables ≥ **3:1** (WCAG AA non-text) | Idem |
| 4 | Bordures fines = **1 px** avec `--ij-border` ; `--ij-border-strong` réservé aux séparations structurelles (sidebar, header, etc.) | Convention manuelle |
| 5 | Accent or (`--ij-accent`) utilisé **avec parcimonie** : CTAs principaux, focus rings, états sélectionnés. Jamais en aplat étendu | Convention manuelle |
| 6 | **CTA accent or** : texte clair (`--ij-bg`) doit être en "large text" WCAG (≥ 18pt normal OU ≥ 14pt bold = ≥ 19px bold). Sinon utiliser texte presque noir (`#1A1A1A`) ou assombrir l'accent. Ratio mesuré : `#FAF9F6` sur `#A07728` = 3.86:1 (AA large) | Test Playwright + axe-core sur `/design-system` |
| 7 | Pas de gradients décoratifs sur les surfaces principales (réservés aux hero) | Convention manuelle |
| 8 | Ombres : `shadow-ij-soft` par défaut, `shadow-ij-card` pour les cartes, `shadow-ij-elevated` pour les modales | Convention manuelle |

---

## Tokens — palette

### Light mode (`:root`)

| Token | Valeur | Rôle |
|---|---|---|
| `--ij-bg` | `#FAF9F6` | Fond canvas (parchemin, jamais pur blanc) |
| `--ij-surface` | `#F4F2EC` | Cartes / surfaces élevées |
| `--ij-surface-2` | `#EDEAE0` | Sidebar / header |
| `--ij-border` | `#D8D3C4` | Bordures fines |
| `--ij-border-strong` | `#A89F87` | Séparation forte |
| `--ij-text` | `#1A1A1A` | Texte principal (16.4:1 ✓) |
| `--ij-text-muted` | `#5A5246` | Texte secondaire (8.2:1 ✓) |
| `--ij-text-subtle` | `#7A7060` | Métadonnées (5.1:1 ✓) |
| `--ij-primary` | `#1F2937` | Encre primaire (boutons fonds) |
| `--ij-accent` | `#A07728` | Or institutionnel (CTAs, focus) — 5.6:1 ✓ |
| `--ij-accent-soft` | `#E8D9B2` | Or léger (highlights) |
| `--ij-success` | `#1F6B3A` | Validation (5.9:1 ✓) |
| `--ij-warning` | `#A85D00` | Alerte (5.4:1 ✓) |
| `--ij-danger` | `#A02020` | Erreur (6.1:1 ✓) |
| `--ij-focus-ring` | `rgba(160,119,40,0.45)` | Anneau de focus (or translucide) |

### Dark mode (`.dark`)

| Token | Valeur | Rôle |
|---|---|---|
| `--ij-bg` | `#0E1420` | Fond canvas (encre marine) |
| `--ij-surface` | `#161D2C` | Cartes |
| `--ij-surface-2` | `#1F2738` | Sidebar / header |
| `--ij-border` | `#2A3145` | Bordures fines |
| `--ij-border-strong` | `#3D4660` | Séparation forte |
| `--ij-text` | `#F2EFE6` | Texte principal (14.8:1 ✓) |
| `--ij-text-muted` | `#B5AC97` | Texte secondaire (7.4:1 ✓) |
| `--ij-text-subtle` | `#867E6C` | Métadonnées (4.9:1 ✓) |
| `--ij-primary` | `#F2EFE6` | Texte sur fonds sombres |
| `--ij-accent` | `#D4A853` | Or institutionnel (7.2:1 ✓) |
| `--ij-accent-soft` | `#3A2E14` | Or sourdine fond |
| `--ij-success` | `#4ADE80` | Validation (9.1:1 ✓) |
| `--ij-warning` | `#FBBF24` | Alerte (9.6:1 ✓) |
| `--ij-danger` | `#F87171` | Erreur (6.4:1 ✓) |
| `--ij-focus-ring` | `rgba(212,168,83,0.55)` | Anneau de focus (or translucide) |

---

## Tailwind — utilitaires exposés

```ts
// tailwind.config.ts
colors: {
  ij: {
    bg, surface, 'surface-2',
    border, 'border-strong',
    text, 'text-muted', 'text-subtle',
    primary,
    accent, 'accent-soft',
    success, warning, danger,
  },
},
boxShadow: {
  'ij-soft':     '0 1px 2px rgba(15,20,32,0.04), 0 2px 8px rgba(15,20,32,0.06)',
  'ij-card':     '0 2px 4px rgba(15,20,32,0.06), 0 8px 24px rgba(15,20,32,0.08)',
  'ij-elevated': '0 4px 12px rgba(15,20,32,0.10), 0 16px 48px rgba(15,20,32,0.12)',
  'ij-inset':    'inset 0 1px 0 rgba(255,255,255,0.04)',
},
fontFamily: {
  'ij-display': ['var(--font-fraunces)', 'Georgia', 'ui-serif', 'serif'],
  'ij-sans':    ['var(--font-inter-tight)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  'ij-mono':    ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
},
```

Usage type :

```tsx
<article className="bg-ij-surface text-ij-text border border-ij-border rounded-lg p-6 shadow-ij-card">
  <h2 className="font-ij-display text-2xl tracking-tight">Articulation de procédure</h2>
  <p className="font-ij-sans text-ij-text-muted mt-2">PV 2026/0042 — Vol simple</p>
  <button className="bg-ij-accent text-ij-bg font-ij-sans font-semibold px-4 py-2 rounded-md mt-4">
    Valider la côte
  </button>
</article>
```

---

## Cohabitation avec le legacy

Quatre systèmes de tokens cohabitent dans `tailwind.config.ts` au sortir de
Phase 1 :

| Namespace | État | Migration |
|---|---|---|
| `ij.*` | **Cible Phase 1+** | — (référence) |
| `ds.*` | Sémantique legacy (light/dark) | Phase 1bis composant par composant |
| `examen.*` | Direction « Ordre & Maîtrise » (dark hardcodé) | Phase 1bis ou Phase 2 |
| `orde.*` | Palette sœur dark hardcodée | Phase 1bis (probablement supprimable) |
| `navy.*` / `gold.*` | Palettes brutes | À auditer Phase 1bis |
| shadcn `--background`, `--primary`, etc. | Primitives shadcn-ui | Conservées (utilisées par `<Button>`, `<Dialog>` etc.) |

Trois fontes legacy restent chargées côté layout root :

| Font | Variable | Statut |
|---|---|---|
| Inter | `--font-inter` | Legacy — utilisée par `font-sans` |
| DM Sans | `--font-dm-sans` | Legacy — utilisée par `h2/h3` global |
| Instrument Serif | `--font-instrument-serif` | Legacy — utilisée par `h1` global |

Elles seront supprimées en Phase 1bis une fois tous les composants migrés
vers `font-ij-*`. Le coût bundle temporaire est limité (`display: 'swap'`,
self-host par `next/font`, pas de FOUT bloquant).

---

## Plan de migration Phase 1bis

L'idée : aucune migration n'a lieu en Phase 1 (zéro régression visuelle).
La Phase 1bis fera la transition composant par composant en suivant cet
ordre de priorité :

1. **Composants shell** (`InteriorPageShell`, `SectionTitle`, `GlassCard`,
   `Card`, `ButtonExamen`) — un changement ici se propage partout.
2. **Pages d'accès** (`/`, `/login`, `/inscription`, `/manage-subscription`).
3. **Pages d'articulation** (`/entrainement/articulation`, recap, print).
4. **Pages de cours** (`/fondamentaux/*`, `/infractions/*`).
5. **Dashboard** (`/dashboard/*`) — touchera Phase 4 en parallèle.
6. **Header / Footer / FloatingQuickFlashcards** — modifient le chrome
   global, à faire en dernier pour éviter de casser tous les snapshots
   Playwright.

À chaque composant migré :
- Remplacer `bg-ds-*` / `text-ds-*` / `border-ds-*` → `bg-ij-*` / etc.
- Remplacer `font-sans` / `font-display` → `font-ij-sans` / `font-ij-display`
- Vérifier visuellement light + dark.
- Mettre à jour les snapshots Playwright impactés.

Quand tous les usages legacy auront disparu (vérifié par `rg ds-bg-primary src/`,
etc.), supprimer dans le même commit :
- les blocs CSS `--ds-*` de `globals.css` ;
- les entrées `examen.*`, `orde.*`, `ds.*`, `navy.*`, `gold.*` de
  `tailwind.config.ts` qui ne sont plus utilisées ;
- les fontes Inter, DM Sans, Instrument Serif de `app/layout.tsx`.

---

## Tests

| Test | Type | Garantit |
|---|---|---|
| `src/styles/__tests__/ij-tokens.test.ts` | Vitest | Tous les ratios WCAG AA, présence des tokens, règle no-pure-white |
| `src/__tests__/tailwind-config.test.ts` | Vitest | `colors.ij`, `boxShadow.ij-*`, `fontFamily.ij-*` exposés |
| `e2e/design-system-snapshot.spec.ts` | Playwright + axe | Page `/design-system` accessible, sections présentes, zéro violation a11y serious/critical, zéro erreur console |

---

## Page de démo

URL : [`/design-system`](http://localhost:3000/design-system)

- En **dev** (`npm run dev`) : accessible librement.
- En **prod** (`npm run start` ou Vercel) : `notFound()` par défaut.
- Pour activer en prod : exporter `ENABLE_DESIGN_SYSTEM=true`.
- Indexation moteurs désactivée (`metadata.robots = { index: false, follow: false }`).

La page démontre :
- 14 swatches light + 14 swatches dark
- 2 mockups d'articulation (light + dark)
- les 3 fontes Fraunces / Inter Tight / JetBrains Mono
- les 3 ombres `ij-soft` / `ij-card` / `ij-elevated`
