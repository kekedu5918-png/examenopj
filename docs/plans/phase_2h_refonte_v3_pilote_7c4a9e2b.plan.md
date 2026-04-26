# Phase 2H — Refonte rendu fondamentaux V3 (composants premium + migration slugs Option C + 3 pilotes)

> **Statut** : plan figé pour revue utilisateur — aucune implémentation avant validation explicite.  
> **Parent** : Phase 2G (constat d’échec du pipeline OCR sur le rendu).  
> **Source de contenu** : `content/_sources/synthese-46-chapitres/*.md` (corpus rédigé « premium structuré », 46 chapitres).  
> **Rappels** : [`plans-versioning.mdc`](../../.cursor/rules/plans-versioning.mdc) ; `LIGHT_MODE_ENABLED = false` dans [`ThemeProvider.tsx`](../../src/components/providers/ThemeProvider.tsx).

---

## §1 — Diagnostic et contexte

La **Phase 2G** a montré que le **pipeline OCR** (extraction automatique à partir de supports scannés ou bruités) ne produisait pas un rendu lisible ni pédagogique : texte fragmenté, titres incohérents, mélange de sections, perte de la grille éditoriale attendue pour l’examen OPJ.

Face à ce plafond de qualité, **l’utilisateur a rédigé un corpus complet de 46 chapitres** au format structuré (stats, schéma mémo, blocs, plan, articles clés), stocké sous `content/_sources/synthese-46-chapitres/`. Ce corpus est la **référence normative** pour le fond : aucune invention de contenu en Phase 2H.

**État actuel côté site** : 46 fichiers `content/cours/*.md` portent encore un contenu issu ou dérivé de l’OCR, jugé inacceptable pour la refonte visuelle. Les champs `chapitre: N` dans le frontmatter **alignent l’index 1–46** avec la numérotation du corpus, mais les **titres** et **slugs** peuvent diverger du libellé rédigé (ex. fiche `information-judiciaire` pour le chapitre 3 alors que le corpus intitule ce chapitre « Les acteurs judiciaires »).

**Objectif Phase 2H** : introduire le **système de rendu V3** (composants premium + frontmatter figé), puis **intégrer le contenu validé** pour **trois pilotes** — chapitre 1 (flagrance), 19 (causes d’irresponsabilité), 31 (viol et agressions sexuelles) — en respectant la cible visuelle et le corpus à la lettre. Le reste des slugs / fiches migre en **Phase 2I** sauf ce qui est explicitement livré en 2H.6 pour les pilotes.

**Alerte corpus** : le fichier `content/_sources/synthese-46-chapitres/chapitres-31-40.md` est **tronqué** après le chapitre 34 (fin abrupte sur « CHA »). Les titres et slugs **chapitres 35 à 40** doivent être **reconstitués dans le source** avant de figer définitivement la colonne « nouveau slug » pour ces lignes (le plan liste néanmoins les **fichiers cours actuels** `chapitre: 35–40` pour traçabilité).

---

## §2 — Référence visuelle V3 (cible)

La fiche V3 est une **page magazine** sombre (tokens `ij.*`, pas de couleurs arbitraires hors charte), avec **glassmorphism**, **dégradés or / cyan**, **animations** `cubic-bezier`, **hover lift** sur les cartes, **apparitions séquentielles** (stagger) sur les sections principales, et **respect strict** de `prefers-reduced-motion`.

| Zone | Description |
|------|-------------|
| **Hero magazine** | Fond **aurora** animée (dégradés diffus), **glow orb** discret, **grille** ou bruit très léger, **fil d’Ariane** vers `/fondamentaux` et contexte, **badges** « Chapitre N » + badge **2025** si `loi2025`, **titre** en **dégradé** (or / ivoire), **sous-titre** (`description`), **méta hero** (partie, durée indicative optionnelle), **4 stats** en cartes **glass** (valeur + label). |
| **Tabs sticky** | Barre fixe sous hero : **Cours** \| **Comparer** \| **Pièges** \| **Quiz** \| **Mémo** — navigation par ancres ou panneaux ; état actif visible au clavier. |
| **Callout 30 secondes** | Encart pleine largeur ou contenu : **fond dégradé cyan** (`ij-info`), texte court mémorisable (dérivé du corpus ou synthèse sans ajout factuel non sourcé). |
| **Schéma mémo** | Bloc central selon variante **frontmatter** : cartes **acronyme**, **comparatif 2 colonnes**, **tableau**, **arbre** — typographie et bordures cohérentes avec les tokens. |
| **Articles clés** | Liste en **pastilles** `font-mono` / `ij-mono`, liens vers ancres ou Légifrance si URL déjà présente dans les données (pas d’URL inventée). |
| **Grille 4 blocs synthèse** | Quatre cartes : **Définition** (vert / `ij-success`), **Piège** (orange / `ij-warning`), **Point clé** (rouge / `ij-danger`), **Mémo** (or / `ij-accent`). |
| **Timeline** | Chronologie **verticale**, connecteur, **dots** ; optionnelle si absente du corpus (`timeline` omise). |
| **Plan détaillé** | Sections du plan en **accordéons** (un item par entrée `plan[]` ou par heading corps), **ouverture animée** (réduite si reduced-motion). |
| **Footer** | **Barre de progression** de lecture (optionnelle), **2 cartes CTA** (ex. quiz module, retour hub) — styles glass + hover lift. |

---

## §3 — Schéma frontmatter YAML cible (figé)

Le fichier `content/cours/<slug>.md` combinera ce frontmatter et un **corps markdown** réservé aux sections détaillées du plan (rendu dans les accordéons).

```yaml
title: string                    # requis — aligné titre corpus
chapitre: number                 # requis, 1–46
partie: number                   # requis, 1–6 (grandes parties pédagogiques)
description: string              # requis, ≤ 200 caractères (sous-titre hero)
tags: string[]                   # requis (peut être [])
loi2025: boolean                 # requis
derniereMiseAJour: string        # requis, ISO 8601 date (YYYY-MM-DD)

articlesCles: string[]           # requis, exactement 5 entrées normalisées (ex. « Art. 53 CPP — … »)

stats:                           # requis, exactement 4 entrées
  - { num: string, label: string }

schemaMemo:                      # requis
  type: "acronyme" | "comparatif" | "tableau" | "arbre"
  titre: string
  acronyme?: string              # si type === "acronyme"
  cards?:                       # si type === "acronyme"
    - { lettre: string, mot: string, desc: string }
  rows?:                        # si type === "tableau" ou "comparatif"
    # objet flexible contrôlé par Zod / TS : clés string → string (ex. colonnes dynamiques)
    - Record<string, string>
  # pour type "arbre" : représentation lignes ou nœuds — même tableau `rows` hiérarchisé
  # ou champ dédié `nodes` à définir en 2H.2 si le squelette impose une structure plus riche

blocs:                           # requis
  definition: string
  piege: string
  pointCle: string
  memo: string

timeline?:                       # optionnel
  - { temps: string, event: string, detail: string }

plan:                            # requis, ≥ 1 entrée
  - { num: string, titre: string, duree: string }
```

**Corps markdown** : uniquement le texte des sections « Plan détaillé » (ex. `## Section 1 — …` avec contenu sous chaque heading). Les éléments structurés (stats, mémo, blocs, timeline, articles) **ne sont pas** redoublés dans le corps.

**Validation** : schéma Zod (ou équivalent) partagé entre loader MD et tests ; erreurs de build explicites si contrat rompu.

---

## §4 — Composants React à créer (liste exhaustive)

Dossier cible : `src/components/fondamentaux/fiche/`.

| Composant | Responsabilités | Props (indicatif) | a11y / tests |
|-----------|-----------------|-------------------|--------------|
| **`FichePremium`** | Orchestrateur : parse frontmatter typé, layout global, sections dans l’ordre V3, `children` ou slot pour corps MD rendu. | `data: FicheFrontmatterV3`, `children: ReactNode`, `slug: string` | `main`, `aria-labelledby` hero titre ; `data-testid="fiche-premium"` |
| **`FicheHero`** | Aurora, grille, breadcrumb, badges, titre dégradé, sous-titre, méta. | `title`, `description`, `chapitre`, `partie`, `loi2025`, `breadcrumbItems` | Titres hiérarchie ; `data-testid="fiche-hero"` |
| **`FicheStatsGlass`** | 4 cartes stats. | `stats: { num, label }[]` | Liste sémantique ou `region` « Statistiques clés » ; `data-testid="fiche-stats"` |
| **`FicheArticlesCles`** | Pastilles mono. | `articles: string[]` | Navigation clavier si cliquables ; `data-testid="fiche-articles-cles"` |
| **`FicheCallout30s`** | Encart cyan. | `text: string` | `role="note"` ou aside ; `data-testid="fiche-callout-30s"` |
| **`FicheSchemaMemo`** | Dispatch vers sous-variantes. | `schema: SchemaMemo` | `data-testid="fiche-schema-memo"` |
| ↳ **`FicheSchemaAcronyme`** | Cartes lettre / mot / desc. | `…` | |
| ↳ **`FicheSchemaComparatif`** | Deux colonnes + en-têtes. | `rows` | Table ou grid avec `scope` si tableau HTML |
| ↳ **`FicheSchemaTableau`** | Tableau générique. | `rows` | |
| ↳ **`FicheSchemaArbre`** | Arbre visuel (lignes / indentation). | `rows` ou `nodes` | |
| **`FicheBlocsSynthese`** | Grille 2×2 ou 1×4 responsive. | `blocs: { definition, piege, pointCle, memo }` | Couleurs sémantiques tokens uniquement |
| **`FicheTimeline`** | Ligne verticale + événements. | `items: { temps, event, detail }[]` | |
| **`FicheTabs`** | Tabs sticky Cours / Comparer / Pièges / Quiz / Mémo. | `slug`, liens quiz/module, `sectionIds` | Rôles ARIA tabs ou navigation par liens internes testés |
| **`FicheAccordion`** | Wrapper Radix/shadcn accordion + animation. | `items: { id, title, content }[]` | Clavier ; `data-testid` par item |
| **`FicheFooterCTA`** | Progress + 2 CTA. | `progress?: number`, `ctas: { href, label }[]` | |
| **`fiche-motion.ts`** | Variants Framer Motion réutilisables (`fadeUp`, `staggerContainer`, `hoverLift`), **aucun** objet motion inline dans les TSX. | Export de constantes + helpers `resolveReducedMotion` | Composants animés : `data-reduced-motion="true"` quand l’animation est neutralisée + `useReducedMotion` |

**Reduced motion** : toutes les animations conditionnées par `useReducedMotion()` ou équivalent ; classes CSS globales déjà présentes dans `globals.css` pour le fallback.

---

## §5 — Tokens `ij.*` à étendre (audit + liste)

**Déjà présents** (`globals.css` + `tailwind.config.ts`) : `--ij-bg`, `--ij-surface`, `--ij-surface-2`, `--ij-border`, `--ij-border-strong`, `--ij-text`, `--ij-text-muted`, `--ij-text-subtle`, `--ij-primary`, `--ij-accent`, `--ij-accent-soft`, **`--ij-success`**, **`--ij-warning`**, **`--ij-danger`**, `--ij-focus-ring` ; ombres `ij-soft`, `ij-card`, `ij-elevated`, `ij-inset`.

**À ajouter pour V3** (noms proposés — valeurs à caler sur la charte Phase 1 / 2E, **mode dark** prioritaire puisque `LIGHT_MODE_ENABLED = false`) :

| Token | Rôle | Triplet RGB proposé (dark `.dark`) | Notes Tailwind |
|-------|------|-------------------------------------|----------------|
| `--ij-info` | Callout 30 s, accents cyan | `6 182 212` (cyan-500 proche) | `bg-ij-info/10`, `text-ij-info`, `border-ij-info/30` |
| `--ij-glass-bg` | Surface glass hero / cartes | `255 255 255` avec usage **faible opacité** via `/5` à `/15` | Jamais pur blanc plein : toujours avec alpha |
| `--ij-glass-border` | Bordure glass | `255 255 255` | `border-ij-glass-border/10` |
| `--ij-glow-accent` | Aurora / halos or | `212 168 83` (aligné `--ij-accent`) | Utilisé en `box-shadow` / `radial-gradient` via utilities |
| `--ij-glow-cyan` | Halo secondaire hero | `6 182 212` | Paire avec `--ij-info` |
| `--ij-memo` | Carte « Mémo » synthèse (or renforcé) | `232 217 178` (proche `--ij-accent-soft` clair) — **à valider contraste** | Si trop proche, dériver plutôt de `--ij-accent` avec opacité |
| `--ij-aurora-1` / `--ij-aurora-2` | Stops dégradés animés | Dérivés de `ij-bg` + `ij-primary` teintés | Keyframes dédiés dans `tailwind.config` ou CSS layer |

**Interdiction** : pas de `slate-*`, `examen-*`, `ds-*`, `bg-white`, `text-white` dans le code des nouveaux composants (grep CI).

---

## §6 — Migration slugs Option C (plan complet)

### (a) Tableau de mapping — 46 chapitres

**Légende actions (colonne 4)** — pour exécution **Phase 2I** sauf lignes pilotes traitées en **2H.6** :

- **Renommer** : le fichier `content/cours/<ancien>.md` devient `<nouveau>.md` + 301 + mises à jour liens + SQL.
- **Identique** : slug déjà conforme ; pas de 301 (vérification quand même).
- **Pilote 2H** : traité en 2H.6–2H.9 si le slug change.

**Normalisation des nouveaux slugs** : minuscules, accents supprimés, espaces → tirets, ponctuation épurée ; parenthèses « réforme 2025 » → segment optionnel `reforme-2025` si besoin de disambiguation.

| Chap. rédigé | Ancien slug (fichier actuel `chapitre: N`) | Nouveau slug (corpus) | Action (cible) |
|-------------|---------------------------------------------|------------------------|----------------|
| 1 | `enquete-flagrance` | `enquete-flagrance` | Identique — **pilote** V3 |
| 2 | `enquete-preliminaire` | `enquete-preliminaire` | Identique |
| 3 | `information-judiciaire` | `acteurs-judiciaires` | Renommer |
| 4 | `police-judiciaire-statut` | `competences-territoriales` | Renommer |
| 5 | `garde-a-vue` | `garde-a-vue` | Identique |
| 6 | `perquisition` | `audition-libre-et-statuts` | Renommer (contenu à remplacer par corpus chap. 6) |
| 7 | `auditions` | `perquisitions-saisies-scelles` | Renommer |
| 8 | `controle-identite` | `requisitions-judiciaires` | Renommer |
| 9 | `requisition-commission-rogatoire` | `controles-et-verifications-didentite` | Renommer |
| 10 | `action-publique-opportunite` | `action-publique-et-action-civile` | Renommer |
| 11 | `parquet-instruction` | `instruction-preparatoire` | Renommer |
| 12 | `jld-mandats` | `jld-et-mandats-de-justice` | Renommer |
| 13 | `mise-en-examen-instruction` | `cj-arse-detention-provisoire` | Renommer |
| 14 | `juridictions-jugement` | `poursuites-et-modes-de-saisine` | Renommer |
| 15 | `assises-appel` | `juridictions-repressives` | Renommer |
| 16 | `nullites-procedure` | `nullite-des-actes-de-procedure` | Renommer |
| 17 | `classification-tripartite-application-loi` | `classification-et-application-de-la-loi` | Renommer |
| 18 | `responsabilite-penale-personnes-physiques` | `responsabilite-penale` | Renommer |
| 19 | `causes-irresponsabilite-attenuation` | `causes-dirresponsabilite-et-dattenuation` | Renommer si normalisation **sans accents** → `causes-irresponsabilite-et-attenuation` — **pilote** |
| 20 | `usage-armes-forces-ordre` | `usage-des-armes-par-les-forces-de-lordre` | Renommer |
| 21 | `complicite-concours` | `responsabilite-penale-des-personnes-morales` | Renommer (alignement chap. 21 corpus) |
| 22 | `tentative-recidive-circonstances` | `complicite-et-coaction` | Renommer |
| 23 | `personne-morale-mineurs` | `tentative-et-repentir-actif` | Renommer |
| 24 | `peines-modes-individuation` | `lechelle-des-peines` | Renommer |
| 25 | `prescription-extinction` | `recidive-concours-cumul` | Renommer |
| 26 | `sanction-penale` | `casier-judiciaire` | Renommer |
| 27 | `homicides-atteintes-vie` | `atteintes-volontaires-a-la-vie` | Renommer |
| 28 | `violences-involontaires-integrite` | `atteintes-involontaires-et-infractions-routieres` | Renommer |
| 29 | `enlevement-sequestration` | `violences-volontaires-et-aggravations` | Renommer |
| 30 | `violences-menaces-harcelement` | `torture-barbarie-menaces` | Renommer |
| 31 | `viol-agressions-sexuelles` | `viol-agressions-sexuelles-reforme-2025` (ou `viol-agressions-sexuelles` si choix éditorial de kébab court) — **pilote** | Renommer si suffixe retenu |
| 32 | `mineurs-cjpm` | `harcelement-discrimination-dignite-humaine` | Renommer |
| 33 | `atteintes-aux-biens` | `atteintes-a-la-vie-privee-et-aux-correspondances` | Renommer |
| 34 | `vols-escroquerie-extorsion` | `vol-et-circonstances-aggravantes` | Renommer |
| 35 | `stupefiants-usage` | **À figer** (titre corpus manquant dans le MD tronqué) | Reporter si titre absent |
| 36 | `stupefiants-trafic` | **À figer** | Idem |
| 37 | `delits-circulation-routiere` | **À figer** | Idem |
| 38 | `atteintes-autorite-corruption` | **À figer** | Idem |
| 39 | `atteintes-nation-terrorisme` | **À figer** | Idem |
| 40 | `armes-materiel-guerre` | **À figer** | Idem |
| 41 | `traites-dignite-personne` | `regime-specifique-des-mineurs-cjpm` | Renommer (corpus chap. 41) |
| 42 | `infractions-numeriques` | `infractions-contre-la-nation-letat-paix-publique` | Renommer |
| 43 | `blanchiment-infractions-economiques` | `faux-et-association-de-malfaiteurs` | Renommer |
| 44 | `actualisation-lois-2025` | `nouveautes-legislatives-2025` | Renommer |
| 45 | `outils-oral-entrainement` | `methodologie-de-loral-opj` | Renommer |
| 46 | `entrainement-session-2026` | `70-points-cles-a-maitriser` | Renommer |

> **Note méthodo** : les lignes 6–34 et 41–46 reflètent l’**alignement sémantique** corpus ↔ fichier indexé `chapitre: N`. Lors de l’exécution, valider chaque paire sur **titre + premier paragraphe** du corpus avant renommage physique. Les incohérences OCR historiques (ex. contenu « perquisition » dans un fichier indexé audition) sont **corrigées** par le remplacement du corps + frontmatter V3, pas seulement par le rename.

### (b) Action par ancien slug

Pour chaque ancien slug : **301 permanent** vers le nouveau **s’il change** ; sinon aucune redirection. Les slugs **orphelins** (liens externes obsolètes) doivent être couverts par la même matrice — pas de redirection générique vers `/fondamentaux` seul.

### (c) Fichiers à mettre à jour (deep-links)

Liste minimale (compléter par `rg "/fondamentaux/" src` avant chaque commit) :

- `src/lib/content/fascicule-cours-map.ts`
- `src/data/enquetes-data.ts`
- `src/data/revision-themes.ts`
- `src/data/cours-revision-fil.ts`
- `src/components/lessons/ParcoursOpjPedagogyBlock.tsx`
- `src/data/fondamentaux-fiches-part1.ts` (et part2–4 / `fondamentaux-from-chapters.ts` si IDs slugs)
- `src/features/examenopj/controllers/local-search.ts`
- `src/data/fondamentaux-canonical-map.ts`
- `src/data/fondamentaux-fascicule-bridge.ts`
- `src/data/lecons-chapters.ts` (si hrefs vers cours)
- `src/app/navigation.ts`, liens hub `src/app/fondamentaux/page.tsx`
- Tests : `src/data/fondamentaux-deep-links.test.ts`, e2e existants sous `e2e/` ou `tests/`

### (d) Migration Supabase

- Nouveau fichier SQL sous `supabase/migrations/`, sur le modèle de [`20260425200000_2f2_fondamentaux_cadres_slug.sql`](../../supabase/migrations/20260425200000_2f2_fondamentaux_cadres_slug.sql).
- **Cible** : table `learning_path.lessons`, colonne `href` (le commentaire de la migration 2F.2 exclut `public.learning_nodes`).
- **Sécurité** : en tête de migration, `DO $$ BEGIN … END $$` ou requêtes conditionnelles : vérifier `to_regclass('public.learning_path')`, existence de la table `learning_path.lessons`, et éventuellement colonnes — **échec contrôlé** ou no-op documenté si schéma différent (éviter l’incident « table inexistante »).
- **2H.6** : n’appliquer les `UPDATE` **que** pour les leçons pointant vers les **3 pilotes** (`/fondamentaux/enquete-flagrance`, `/fondamentaux/causes-irresponsabilite-attenuation`, `/fondamentaux/viol-agressions-sexuelles`) et leurs **nouvelles** cibles si le slug change.

### (e) `next.config.js` (ou `next.config.mjs`)

- Ajouter dans `redirects()` des entrées **308/307** selon convention repo (préférence **permanent: true** pour 301 équivalent Next).
- **Une paire par slug renommé effectivement en 2H.6** (pilotes uniquement en Phase 2H).
- Pas de redirect fourre-tout vers le hub.

---

## §7 — Découpage en sous-vagues

Chaque sous-vague = **1 commit atomique**, tests verts, **pause utilisateur** obligatoire avant la suivante.

| ID | Contenu | Message commit suggéré |
|----|---------|------------------------|
| **2H.1** | Tokens `ij.*` étendus + expo Tailwind + test contraste / snapshot si existant | `chore: extend ij tokens for V3` |
| **2H.2** | Squelettes composants `fiche/*`, types TS, Zod frontmatter, tests unitaires mock | `feat: V3 component scaffolding` |
| **2H.3** | Implémentation visuelle complète + snapshots Playwright (page démo ou Storybook si introduit) | `feat: V3 components implementation` |
| **2H.4** | Extraction **chap. 1** : frontmatter + corps — **livrable dans un message / fichier local, pas de commit** jusqu’à validation utilisateur | — |
| **2H.5** | Idem **chap. 19** et **chap. 31** | — |
| **2H.6** | Migration **slugs + 301 + deep-links + SQL** — **uniquement** ce qui concerne les **3 pilotes** | `feat(fondamentaux): slug migration Option C — 3 pilots` |
| **2H.7** | Intégration contenu V3 chap. 1 sur slug final | `feat(fondamentaux): pilot 1 — flagrance V3` |
| **2H.8** | Intégration chap. 19 | `feat(fondamentaux): pilot 19 — causes irresponsabilité V3` |
| **2H.9** | Intégration chap. 31 | `feat(fondamentaux): pilot 31 — viol et agressions sexuelles V3` |
| **2H.10** | e2e pilotes, axe-core (0 critical/serious), Lighthouse mobile perf > 80 baseline | `test(fondamentaux): V3 pilots e2e + a11y + perf baseline` |

---

## §8 — Transformation contenu (2H.4 / 2H.5)

Pour chaque pilote :

1. Lire le chapitre dans `content/_sources/synthese-46-chapitres/chapitres-XX-YY.md`.
2. Extraire stats, schéma mémo, blocs, timeline, plan, articles clés **sans paraphrase hors corpus**.
3. Produire le YAML §3.
4. Produire le corps : **sections du plan détaillé uniquement**.
5. Livrer dans un message clair + fichier temporaire si utile — **pas de commit** avant validation.
6. Si une donnée manque (ex. pas de timeline) : **signaler** ; options = omettre `timeline` ou demander complément utilisateur.

**Règle absolue** : zéro invention factuelle.

---

## §9 — Tests prévus par vague

| Vague | Tests |
|-------|--------|
| 2H.1 | Build Tailwind, `ij-tokens` / contraste si présent, pas de régression snapshot tokens |
| 2H.2 | Vitest : render minimal, props, validation Zod sur fixtures |
| 2H.3 | Vitest + Playwright snapshots visuels ; reduced-motion |
| 2H.6 | e2e : 301 pilotes, aucun 404 sur anciennes URLs pilotes |
| 2H.7–9 | e2e par pilote : hero, tabs, accordéons, articles visibles/cliquables |
| 2H.10 | axe-core ; Lighthouse mobile performance ≥ 80 (baseline documentée) |

**Toujours** avant commit : lint, `tsc`, vitest, build, e2e ciblés selon vague.

---

## §10 — Risques

| Risque | Atténuation |
|--------|-------------|
| Migration SQL sur mauvaise table / relation | Vérifications `to_regclass` + alignement sur `learning_path.lessons` uniquement ; script dry-run sur staging |
| Régression hub / e2e fondamentaux | Lancer la suite e2e fondamentaux existante après chaque vague touchant routes |
| Incohérence slugs 43 fiches non migrées vs liens mis à jour trop tôt | En 2H, **ne mettre à jour les deep-links globaux** que pour les URLs **effectivement renommées** (pilotes) ; éviter recherche-remplacement global |
| Animations Framer vs reduced-motion | `useReducedMotion`, `data-reduced-motion`, pas d’animation obligatoire pour comprendre le contenu |
| Erreurs d’extraction frontmatter (Cursor / humain) | Validation utilisateur obligatoire 2H.4 / 2H.5 ; schéma Zod strict |
| Corpus `chapitres-31-40.md` incomplet | Restaurer chapitres 35–40 dans le source avant Phase 2I pour les slugs concernés |

---

## §11 — Règles méthodo (rappel)

- Plan versionné dès création (`docs/plans/*.plan.md` commité).
- Pas d’implémentation sans **validation explicite** du plan par l’utilisateur.
- Pause entre **2H.1 → 2H.10**.
- Grep interdit avant commit : `\bslate-[a-zA-Z0-9]+\b|\bexamen-[a-zA-Z0-9]+\b|\bds-[a-zA-Z0-9]+\b|\bbg-white\b|\btext-white\b` dans le code touché.
- Variants motion dans `fiche-motion.ts` uniquement.
- `data-testid` + `data-reduced-motion` sur blocs animés.
- Couleurs : tokens `ij.*` uniquement dans les composants V3.
- `LIGHT_MODE_ENABLED = false` maintenu.

---

## §12 — Calendrier estimé (jours-Cursor)

Estimation indicative « charge agent + relecture humaine » (les pauses utilisateur peuvent étaler le calendrier civil) :

| Vague | Jours-Cursor |
|-------|----------------|
| 2H.1 | 0,5 |
| 2H.2 | 1 |
| 2H.3 | 2 |
| 2H.4 | 0,5 (+ validation humaine) |
| 2H.5 | 0,5 (+ validation humaine) |
| 2H.6 | 1 |
| 2H.7 | 0,75 |
| 2H.8 | 0,75 |
| 2H.9 | 0,75 |
| 2H.10 | 1,5 |
| **Total** | **≈ 9–11 jours-Cursor** |

**Lancement prod 4–6 semaines** : cohérent si les pauses de validation restent courtes et que la Phase 2I (43 fiches restantes) est planifiée en parallèle ou juste après ; sinon ajouter **10–15 jours-Cursor** pour l’extension complète des slugs + contenus.

---

## Livrable

Ce fichier : `docs/plans/phase_2h_refonte_v3_pilote_7c4a9e2b.plan.md` — **commit dédié** à l’ajout du plan ; aucun autre changement fonctionnel dans le même lot si possible.

**Suite** : après validation utilisateur du plan, enchaîner **2H.1** puis pauses successives.
