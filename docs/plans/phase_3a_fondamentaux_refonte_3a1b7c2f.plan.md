---
**STATUT : BROUILLON NON VALIDÉ**

Ce plan a été esquissé en avril 2026 et n'a pas fait l'objet d'une validation explicite par l'utilisateur dans la méthodologie plan → challenge → validation. À retravailler entièrement avant tout lancement Phase 3a, après clôture Phase 2D et 2F.
---

# Phase 3A — Refonte `/fondamentaux` (présentation, archi info, synthèse, gamification)

> **Périmètre** : rubrique **`/fondamentaux`** (hub + fiche détail `[slug]`) en première vague d'une série **Phase 3** (3A fondamentaux → 3B infractions → 3C enquêtes → 3D épreuves).
> **Parent** : aucun (nouvelle phase). Phases précédentes : **2A** (header/footer), **2B** (home), **2C** (chiffres KPI), **2D** (iso-visuel infractions + fondamentaux), **2E** (tokens opacité).
> **HEAD au moment de la rédaction** : `a636569` (phase 2D.2.a en cours, hors scope ici).
> **Versionnement** : committer ce fichier dès création (règle [`.cursor/rules/plans-versioning.mdc`](../../.cursor/rules/plans-versioning.mdc)).
> **Statut** : **EN REVUE — arbitrages §9 figés au 2026-04-21 (cf. §0.4). Implémentation en attente : fin de Phase 2D.2.a d'abord.**
> **Dernière MAJ** : 2026-04-21 — pivot éditorial : Claude prend en charge V6 (synthèse) avec source de vérité SDCP stricte.

---

## 0. Contexte et vision

### 0.1 Constat Kévin (avril 2026)

> « Le contenu est très mal présenté, et pas correctement synthétisé. Il faudrait impérativement mettre en valeur l'onglet fondamentaux, changer l'esthétique de présentation de la page etc. Et faire la même chose pour les autres rubriques, qu'elles soient exceptionnelles et qu'elle donne envie au candidat. Faut que tout soit parfait et qu'on soit la référence numéro 1 pour l'examen d'OPJ. »

### 0.2 Diagnostic /fondamentaux actuel (HEAD `a636569`)

- **Hub** [`src/app/fondamentaux/page.tsx`](../../src/app/fondamentaux/page.tsx) : `SectionTitle` + `GlassCard` "comment lire" + `CoursFichesListClient` (grille 2 colonnes de 17 cartes identiques titre + tags).
- **Carte fiche** [`src/components/cours/CoursFichesListClient.tsx:104-124`](../../src/components/cours/CoursFichesListClient.tsx) : `<Link>` + titre + liste de tags. **Aucune** hiérarchie, durée, difficulté, progression, preview.
- **Fiche détail** [`src/app/fondamentaux/[slug]/page.tsx`](../../src/app/fondamentaux/[slug]/page.tsx) : breadcrumb minimal + `MarkdownArticle` brut. **Aucun** TOC, pas de temps de lecture, pas de "suivante/précédente", pas de checkpoint.
- **Pas de debounce** sur le filtre (dette 2D actée).
- **17 fiches** toutes affichées en vrac (pas de groupement par fascicule F01-F15, pas de tri par priorité examen).

### 0.3 Vision cible Phase 3A

Transformer `/fondamentaux` en **hub pédagogique premium** qui :

1. **Positionne** la rubrique comme le socle (avant infractions/enquêtes/épreuves).
2. **Structure** les 17 fiches par fascicule SDCP (F08–F15) et par priorité examen.
3. **Valorise** chaque fiche (preview, durée, difficulté, progression, repère pédagogique).
4. **Guide** le candidat (parcours recommandé, "par où commencer", prochaine fiche à lire).
5. **Engage** via gamification légère (lu/à lire, pourcentage rubrique, streak rubrique).
6. **Conserve** le DS `ij.*` (pas de rupture visuelle avec le reste du site).

### 0.4 Pivot éditorial 2026-04-21 (décisions Kévin figées)

> « Je veux que ce soit toi qui fasse la synthèse éditoriale de tous les cours, de tous le contenu. C'est toi qui doit le mettre en valeur ; et c'est le numéro 1 de l'appli à faire. » — Kévin, 2026-04-21.

**Conséquence** : V6 n'est plus différable. Elle devient **la colonne vertébrale de Phase 3A** et conditionne la valeur du hub refondu (V3). Quatre arbitrages figés :

| # | Arbitrage | Décision | Impact plan |
|---|-----------|----------|-------------|
| 1 | **Périmètre éditorial** | 17 fondamentaux d'abord (infractions/enquêtes/épreuves → Phases 3B/3C/3D) | V6 recentré sur `content/cours/*.md` |
| 2 | **Règle de source** | **SDCP uniquement + articles CPP/CP cités nommément** | Interdit de rédiger hors PDF SDCP F08→F15 + ME1/ME2 + cahier MAJ juillet→décembre 2025 |
| 3 | **Cadence de validation** | **1 fiche pilote → validation Kévin ligne par ligne → template figé → 16 autres par batch 3-4** | Nouvelle vague **V2b Fiche pilote** insérée avant V3 |
| 4 | **Séquencement** | **Finir Phase 2D.2.a (perf infractions) d'abord**, puis bascule 100% éditorial | Phase 3A ne démarre pas tant que 2D.2.a n'est pas close |

**Source de vérité disponible** (racine workspace) :
- `_09_f08_les_libertés_publiques.pdf` → F08
- `_10_f09_de_la_loi_pénale_de_la_responsabilité_pénale.pdf` → F09
- `_11_f10_la_sanction.pdf` → F10 Sanction (⚠️ le libellé F10 dans §3.1 est contradictoire — à rectifier en V0)
- `_12_f11_les_cadres_juridiques_et_les_actes_de_la_mission_de_police_judiciaire.pdf` → F11
- `_13_f12_l_instruction_préparatoire_les_mandats_de_justice_le_contrôle_judiciaire_la_détention_provisoire.pdf` → F12
- `_14_f13_les_juridictions_de_jugement_l_exécution_des_décisions_de_justice.pdf` → F13
- `_15_f14_action_publique_...` → F14 (⚠️ aucune fiche n'y fait référence actuellement — à vérifier V0)
- `_16_f15_la_nullité_des_actes_de_procédure.pdf` → F15
- `_17_me1_la_procédure_pénale_policière.pdf` → module examen 1
- `_18_me2_la_garde_à_vue_et_l_audition_libre.pdf` → module examen 2
- `_00_cahier_de_mise_à_jour_de_juillet_2025_à_décembre_2025.pdf` → **prévalant en cas de conflit avec un fascicule ancien**

**⚠️ Incohérence numérotation fascicule à clarifier en V0** : §3.1 du plan associe F10→"PJ statut & cadres" et F11→"Actes & contrôles", mais les PDF SDCP nomment F10 "La sanction" et F11 "Les cadres juridiques et les actes de la mission de police judiciaire". **Les tags actuels des fiches markdown (`F10`, `F11` dans `content/cours/*.md`) suivent probablement une numérotation différente de la nomenclature SDCP officielle**. V0 doit réconcilier cette nomenclature avant toute rédaction V6 — sinon garantie de confusion pour le candidat.

---

## 1. Périmètre exact

### 1.1 In-scope (Phase 3A)

| Domaine | Fichiers |
|---------|----------|
| **Route hub** | `src/app/fondamentaux/page.tsx` |
| **Route détail** | `src/app/fondamentaux/[slug]/page.tsx` |
| **Composants hub** | `src/components/cours/CoursFichesListClient.tsx` (refonte majeure) |
| **Composants détail** | `src/components/content/MarkdownArticle.tsx` (enrichissement, à auditer en V0) |
| **Données** | `src/lib/content/courses.ts` (enrichissement `CourseSummary`) |
| **Contenu markdown** | `content/cours/*.md` (harmonisation frontmatter, nouveaux champs) |
| **Nouvelles primitives** | `src/components/fondamentaux/*` (nouveau dossier — **pas** `src/components/fondamentaux/` historique qui contient du code mort purgé Phase 2D.1) |
| **Hook** | `src/hooks/use-debounced-value.ts` (réutilisation 2D.2.a si déjà créé) |
| **Supabase** | lecture `user_node_progress` pour "lu/à lire" (pas de nouvelle migration 3A) |

### 1.2 Out-of-scope (renvoyé Phase 3B/3C/3D ou dette séparée)

- **`/infractions`** — Phase 3B après 3A.
- **`/enquetes`** — Phase 3C.
- **`/epreuves`** — Phase 3D.
- **Nouvelles migrations Supabase** — si besoin de tracking fiche granulaire, Phase 3.X dédiée (pas 3A).
- **Refonte `MarkdownArticle`** si l'audit V0 conclut qu'elle est majeure (split en Phase 3A.bis).
- **Synthèse éditoriale infractions / enquêtes / épreuves** — hors Phase 3A (renvoyée 3B/3C/3D, décision 2026-04-21).
- **Intégration dynamique IA** (prompts utilisateur) pour générer des résumés — hors scope. La rédaction V6 est faite par Claude en tant qu'auteur éditorial **sous source de vérité SDCP stricte + validation Kévin**, pas via une feature IA en prod.

### 1.3 Non-objectifs

- **Pas** de rupture DS (pas d'inspiration Linear/Stripe hors DS `ij.*`).
- **Pas** de dépendance nouvelle en production (aucun `npm install` de lib lourde — `framer-motion` déjà là).
- **Pas** de suppression de fiches existantes (17 → 17, on enrichit).
- **Pas** de cassure des URLs `/fondamentaux/[slug]` existantes (SEO critique).

---

## 2. Direction artistique (continuité DS "Institut Judiciaire")

### 2.1 Principes visuels

1. **Hiérarchie forte** : hero de rubrique (H1 display + subtitle + KPIs progression) > bannière "où j'en suis" > zones thématiques (par fascicule) > carte fiche riche.
2. **Cartes fiche stratifiées** : titre + résumé (3 lignes max) + row de métadonnées (durée · difficulté · priorité · état) + tag fascicule en corner.
3. **Mouvement maîtrisé** : reveal par `IntersectionObserver` (déjà en place), stagger `framer-motion` (variants dans `fondamentaux-motion.ts` dédié, jamais inline — règle projet).
4. **Couleurs** : uniquement tokens `ij.*` (accent or pour priorité, success pour fiches lues, warning pour à réviser, danger réservé à rien côté fondamentaux).
5. **Typographie** : `font-ij-display` (Fraunces) réservé aux H1/H2 display, `font-ij-sans` (Inter Tight) sur tout le reste, `font-ij-mono` sur les numéros d'articles CPP/CP.

### 2.2 Ce qu'on n'ajoute PAS

- Illustrations humanoïdes/mascottes.
- Dégradés cyan-flashy (banni depuis 2B).
- Glow massif (orbs hero OK sur home, pas sur interior shells — `SHELL_GLOW.coursHub` existe déjà).
- Emojis décoratifs dans l'UI (icônes Lucide uniquement).

---

## 3. Architecture d'information cible

### 3.1 Groupement des fiches

**Axe principal retenu : fascicule SDCP** (cohérent avec tags existants `F08`, `F09`, `F10`, `F11`, `F12`, `F13`, `F15`).

Cartographie actuelle des 17 fiches :

| Fascicule | Fiches |
|-----------|--------|
| **F08 Libertés publiques** | `libertes-publiques` |
| **F09 Loi pénale & responsabilité** | `loi-penale-responsabilite`, `sanction-penale` |
| **F10 PJ statut & cadres** | `police-judiciaire-statut`, `cadres-enquete` |
| **F11 Actes & contrôles** | `controle-identite`, `auditions`, `garde-a-vue` |
| **F12 Perquisitions & instruction** | `perquisition`, `fouille-vehicule`, `saisies-scelles`, `instruction-mandats` |
| **F13 Juridictions & mineurs** | `juridictions-jugement`, `mineurs-cjpm` |
| **F15 Nullités** | `nullites-procedure` |
| **Hors fascicules (épreuve 1)** | `crimes-biens`, `crimes-personnes` |

**Axe secondaire** : badge "prioritaire" (tag existant `prioritaire` sur 4 fiches : `cadres-enquete`, `crimes-biens`, `crimes-personnes`, `nullites-procedure`).

### 3.2 Structure de la page hub cible

```
<HubHero>
  H1 "Fondamentaux" + subtitle + countdown session + badge "17 fiches · 7 fascicules"
  <ProgressStrip>    ← barre "X/17 fiches lues · Y min cumulées · streak fondamentaux"
</HubHero>

<StartHereCallout>    ← bloc "par où commencer ?" pour les 0% → suggère crimes-personnes + cadres-enquete
  (masqué si utilisateur déjà avancé)

<SearchAndFilters>    ← input recherche (debounce 150ms) + chips fascicules cliquables

<FasciculeSections>   ← accordéon ou sections ouvertes par défaut
  pour chaque fascicule Fxx :
    <FasciculeHeader>  ← badge fascicule + titre + "N fiches"
    <FicheCardGrid>    ← 2-3 colonnes de FicheCard
  crimes-biens + crimes-personnes dans section "Épreuves écrites (DPS)"

<FooterHubActions>    ← "Passer aux infractions →" + "Voir le parcours recommandé"
```

### 3.3 Structure de la page détail cible

```
<InteriorPageShell>
  <FicheTopbar>        ← breadcrumb + "Marquer comme lu" + "Imprimer" + progression
  <FicheTitle>         ← H1 + tags + méta (durée, fascicule, priorité)
  <FicheSummary>       ← encadré "en 30s" (extrait frontmatter ou blockquote initiale)
  <FicheStickyToc>     ← TOC latéral desktop (composant StickyToc existe déjà)
  <MarkdownArticle>    ← contenu markdown (inchangé dans sa logique, styling révisé V4.2)
  <FicheNextPrev>      ← "Fiche précédente / suivante" au sein du même fascicule
  <FicheChecklist>     ← CTA "Marquer comme lu" + "Tester cette fiche" (lien /entrainement/quiz?theme=Fxx)
```

---

## 4. Synthèse éditoriale V6 — prise en charge Claude, source SDCP stricte (2026-04-21)

### 4.0 Engagement qualité (bloquant)

Tout ce qui suit s'applique à la rédaction des 17 fiches `content/cours/*.md` :

1. **Aucune ligne** ne doit être rédigée sans référence traçable à un paragraphe de fascicule SDCP (F08→F15), ME1/ME2, ou cahier MAJ juillet→décembre 2025.
2. **Chaque article cité** (CPP, CP, COJ, CSI, CJPM…) doit l'être **avec son numéro exact** et **son libellé confirmé par le PDF source**, jamais de mémoire.
3. **Aucune fiche** ne passe en prod sans **validation explicite de Kévin** (cf. workflow V2b / V6).
4. **En cas de doute** (article ambigu, jurisprudence évolutive, divergence entre un ancien fascicule et le cahier MAJ 2025) → trancher en faveur du **cahier MAJ 2025** et lever le doute auprès de Kévin.
5. **Interdit** d'importer des formulations génériques (type "en général, la GAV dure 24h") sans ancrer l'assertion à un article CPP précis.

### 4.1 Champs frontmatter (V1 technique, V2b+V6 remplissage)

```yaml
---
title: "..."
description: "..."          # complété V6 pour chaque fiche
tags: [...]
fascicule: "F11"            # NUMÉROTATION SDCP OFFICIELLE (réconciliée V0, cf. §0.4 ⚠)
priorite: "core"            # "core" | "freq" | "secours"
dureeLecture: 8             # minutes, entier
difficulte: 2               # 1-3
piegesExamen:               # 3-5 puces courtes, chacune ancrée dans SDCP
  - "Confondre GAV et retenue (F11 §..., CPP art 78-3 vs 62-2)"
reperesOfficiels:           # liens vers fascicule + article CPP
  - label: "Fascicule SDCP F11 §2.1"
    source: "pdf:_12_f11_les_cadres_juridiques"
  - label: "CPP art. 53 (flagrance)"
    source: "legifrance"
sourceVersion: "2025-12"    # version du cahier MAJ SDCP utilisée
redacteur: "claude-sdcp"    # trace d'auteur éditorial
valideParKevin: true        # true uniquement après validation ligne par ligne
---
```

### 4.2 Gabarit éditorial type (figé en V2b sur la fiche pilote)

Structure imposée pour chaque fiche :

1. **Blockquote "En 30 secondes"** — 2-4 phrases, vocable examinateur.
2. **Tableau de synthèse principal** — article CPP/CP | cadre | durée | conditions | piège. Colonnes adaptées au domaine.
3. **Section "Règles-clés"** — 4-8 points numérotés, chaque point cite un article.
4. **Encadré `:::piege` "Pièges examen classiques"** — 3-5 pièges documentés par SDCP.
5. **Encadré `:::checklist` "Contrôle de compréhension"** — 5-8 questions auto-eval.
6. **Encadré `:::references` "Pour aller plus loin"** — renvoi vers fascicule SDCP §, article CPP, jurisprudence SDCP-citée.

Les encadrés `:::piege`, `:::checklist`, `:::references` doivent être supportés par `MarkdownArticle` (remark directive à introduire V2 ou V4 selon audit V0).

### 4.3 Workflow de rédaction (pilote-puis-batch)

**Phase V2b — Fiche pilote (1 fiche)** :
1. Claude choisit la fiche pilote (recommandation : `cadres-enquete`, centrale pédagogiquement, priorité examen).
2. Claude lit intégralement le PDF source principal (F11) + ME1 + cahier MAJ 2025.
3. Claude rédige la fiche en respectant §4.0–4.2, avec **citations exactes** (numéro PDF + § + article).
4. Claude livre à Kévin : (a) la fiche rédigée, (b) une table de correspondance ligne→source, (c) une liste de doutes/zones-grises.
5. Kévin valide **ligne par ligne**, corrige, puis **fige le template** (structure + ton + granularité).
6. Template validé → passage V6.

**Phase V6 — 16 fiches restantes (par batch 3-4)** :
1. Claude applique strictement le template V2b.
2. Chaque batch = 3-4 fiches + table source → revue Kévin par batch.
3. Pas de passage au batch suivant tant que le précédent n'est pas validé.
4. Cadence réaliste : 1 batch / semaine = 4-5 semaines pour les 16 fiches.

### 4.4 Garde-fous anti-hallucination

- **Grep de contrôle** avant livraison batch : pour chaque article CPP/CP cité dans la fiche, vérifier qu'il apparaît dans le PDF source référencé (extraction texte PDF + match).
- **Checksum source** : chaque fiche stocke dans son frontmatter le `sourceVersion` (cahier MAJ utilisée). Si MAJ postérieure, flag automatique "à re-valider".
- **Hallucination budget** : si Kévin détecte ≥ 2 erreurs factuelles sur une fiche en revue, **on arrête le batch en cours** et on re-calibre le template avant de reprendre.

---

## 5. Gamification (briques existantes à consommer)

### 5.1 Tables Supabase réutilisées

- **`learning_modules`** : 1 module `fondamentaux` avec `sort_order` et `color: 'ij-accent'`.
- **`learning_nodes`** : 1 node par fiche (`kind: 'fiche'`, `href: '/fondamentaux/[slug]'`, `title: titre fiche`).
- **`user_node_progress`** : `completed_at` sur node_id = fiche_id pour marquer "lu".

### 5.2 Migration éventuelle (V5 — décision à prendre)

Deux options :

**Option A — Seeding SQL** (simple) : 1 migration `20260422*_learning_nodes_fondamentaux_seed.sql` qui insère 17 `learning_nodes` correspondant aux fiches. Avantage : progression tracée en base, cohérente avec le reste du learning path. Inconvénient : couplage fort au schéma.

**Option B — Progression locale + Supabase opt-in** : `localStorage` pour les non-connectés, mirror Supabase pour les connectés via `user_node_progress` déjà alimenté. Cohérent avec la stratégie streak (côté serveur + override local).

**Recommandation** : **Option B**. Plus proche du pattern actuel (`getUserStreakCurrent` server + localStorage override), compatible avec `ENABLE_DESIGN_SYSTEM` en e2e.

### 5.3 Affichages gamification hub

- **Bandeau `ProgressStrip`** : X/17 fiches lues · Y min cumulées · dernière lue.
- **Badge par carte fiche** : état `non lu` / `en cours` / `lu` (icône `CheckCircle2` Lucide en `text-ij-success`).
- **Anneau de complétion par fascicule** : `ProgressRing` (composant existant) à côté du `FasciculeHeader`.
- **Pas** de système de XP/niveau 3A — réservé Phase 3C ou après.

---

## 6. Découpage en vagues

Chaque vague = commits atomiques + validation Kévin + tests verts avant passage à la suivante. **Pas de merge tant que tests rouges ou grep strict en échec.**

### Vague V0 — Audit préalable (lecture seule, ~60 min, **à lancer après clôture Phase 2D.2.a**)

**Objectif** : cartographier précisément l'existant + **réconcilier la nomenclature fascicules** pour verrouiller les risques avant toute modif.

**Actions** :
1. Lire `src/components/content/MarkdownArticle.tsx` (taille, dépendances, complexité) → décider si refonte en 3A.V4 ou phase 3A.bis isolée. Vérifier si les directives remark `:::piege`, `:::checklist`, `:::references` sont supportées ou à introduire.
2. Lire les 17 fiches markdown et relever les champs frontmatter réellement présents (certaines n'ont pas `description`).
3. **Réconciliation fascicules SDCP (bloquant)** : pour chaque fiche, ouvrir le PDF SDCP candidat et confirmer la correspondance `tag Fxx markdown` ↔ `numéro SDCP officiel`. Livrable : tableau de mapping commité dans ce plan §3.1.
4. Vérifier si `src/hooks/use-debounced-value.ts` existe (créé en 2D.2.a ?) ou à créer.
5. Grep strict `\bds-[a-zA-Z0-9]+\b|\bexamen-[a-zA-Z0-9]+\b|\bslate-[a-zA-Z0-9]+\b` sur fichiers in-scope.
6. Vérifier que `user_node_progress` renvoie bien un résultat exploitable depuis `src/lib/learningPath.ts`.
7. Baseline Lighthouse `/fondamentaux` (protocole 3 passes mobile + 1 desktop) → `docs/baselines/phase-3a/lighthouse-before-3a-fondamentaux.json` avec `meta.commit` verrouillé.
8. **Test d'extraction PDF** : valider qu'on peut extraire le texte d'au moins un fascicule SDCP (ex: F11) pour le grep de contrôle §4.4. Si extraction impossible (PDF image-only), flag bloquant → V0.bis pour OCR.

**Livrable V0** : rapport court (section ajoutée à ce plan en §7) + JSON baseline + tableau mapping fascicules + confirmation extraction PDF OK.

### Vague V1 — Données et frontmatter (1 commit)

**Objectif** : enrichir `CourseSummary` et parser les nouveaux champs frontmatter sans casser l'existant.

**Fichiers** :
- `src/lib/content/courses.ts` — ajouter champs optionnels `fascicule`, `priorite`, `dureeLecture`, `difficulte`, `piegesExamen`, `reperesOfficiels` dans le type `CourseSummary`.
- Backfill automatique à partir des **tags existants** : si tag `F10` → `fascicule: 'F10'`; si tag `prioritaire` → `priorite: 'core'`. Aucune modif markdown en V1.

**Tests V1** :
- Unit `vitest` : nouveau test `courses.test.ts` vérifiant que chaque fiche renvoie les 3 champs obligatoires et que `fascicule` est bien dérivé du tag.
- `tsc --noEmit` vert.

**Grep strict V1** : aucun changement d'utilitaire UI, pas de nouveau token.

### Vague V2 — Primitives visuelles (1 commit)

**Objectif** : créer les composants visuels réutilisables AVANT de refondre le hub.

**Nouveaux fichiers** :
- `src/components/fondamentaux/fondamentaux-motion.ts` — variants framer (`getFondamentauxGridContainerVariants`, `getFondamentauxItemVariants`) — règle projet : variants en fichier dédié.
- `src/components/fondamentaux/FicheCard.tsx` — carte riche (titre, description, row meta durée/difficulté/priorité/état, tag fascicule).
- `src/components/fondamentaux/FasciculeSection.tsx` — en-tête fascicule + grid enfants.
- `src/components/fondamentaux/FondamentauxHubHero.tsx` — hero rubrique.
- `src/components/fondamentaux/FondamentauxProgressStrip.tsx` — bandeau progression.
- `src/components/fondamentaux/StartHereCallout.tsx` — bloc "par où commencer".

**Règles** :
- Tous typés `tsx`, 0 `any`, 0 `unknown` runtime.
- Tous avec `data-testid` pour e2e.
- Variants `prefers-reduced-motion` via `useReducedMotion()` + `data-reduced-motion` (pattern Phase 2B).
- Tokens `ij.*` exclusivement.
- Pas de `'use client'` sur `FasciculeSection` si statique — isoler les "use client" aux composants interactifs (perf).

**Tests V2** :
- Unit RTL : `FicheCard` rend bien titre + description tronquée + état par défaut `non lu`.
- Unit : `getFondamentauxGridContainerVariants(reducedMotion=true)` renvoie `{ transition: { duration: 0 } }` (ou équivalent).
- Storybook : **hors scope** (pas de storybook projet).

**Grep strict V2** : nouveau pattern autorisé `text-ij-*`, `bg-ij-*`, `border-ij-*` uniquement — aucun `slate-*`, `examen-*`, `ds-*`.

### Vague V2b — Fiche pilote éditoriale (**nouveau 2026-04-21**, bloque V3)

**Objectif** : produire la fiche modèle SDCP-compliant qui fige le template éditorial appliqué ensuite aux 16 fiches restantes.

**Séquence** :
1. Claude propose à Kévin la fiche pilote (recommandation : `cadres-enquete`).
2. Lecture intégrale PDF source : `_12_f11_les_cadres_juridiques...pdf` + `_17_me1_la_procédure_pénale_policière.pdf` + cahier MAJ 2025.
3. Rédaction fiche respectant §4.0–4.2 (blockquote 30s + tableau synthèse + règles-clés + encadrés piege/checklist/references).
4. Livraison à Kévin : fiche + **table de correspondance ligne→source PDF + §** + liste des doutes.
5. Revue Kévin ligne par ligne, corrections intégrées.
6. Template figé (structure + ton + granularité) documenté dans `docs/editorial/fiche-template-sdcp.md`.

**Fichiers** :
- `content/cours/cadres-enquete.md` (ou autre fiche pilote selon Kévin) — rédaction complète.
- `docs/editorial/fiche-template-sdcp.md` (nouveau) — template + règles + garde-fous.

**Critères de sortie V2b** :
- [ ] Fiche pilote validée ligne par ligne par Kévin (commit avec mention explicite).
- [ ] `docs/editorial/fiche-template-sdcp.md` existe et est committé.
- [ ] Table source lignes→PDF archivée dans le commit de la fiche.
- [ ] Grep de contrôle §4.4 passe (0 article CPP cité sans source PDF vérifiée).

**V2b BLOQUE V3** : pas de refonte hub tant que le template pilote n'est pas figé — sinon on montre sur le hub une fiche jolie au-dessus d'un pavé non synthétisé.

### Vague V3 — Refonte hub `/fondamentaux` (1 commit)

**Objectif** : remplacer `CoursFichesListClient` par la nouvelle composition.

**Fichiers modifiés** :
- `src/app/fondamentaux/page.tsx` — compose `FondamentauxHubHero` + `FondamentauxProgressStrip` + `SearchAndFilters` + `FasciculeSection[]` + `FooterHubActions`.
- `src/components/cours/CoursFichesListClient.tsx` — **déprécié** (renommé `@deprecated` en tête, pas supprimé V3). Suppression effective Phase 3A.close ou V7.

**Nouveau fichier** :
- `src/components/fondamentaux/FondamentauxHubClient.tsx` — client component orchestrant recherche (debounce 150ms) + filtres + état de progression.

**Tests V3** :
- E2E Playwright `e2e/fondamentaux-hub.spec.ts` : landmarks présents (`data-testid='fondamentaux-hero'`, `fondamentaux-progress-strip`, `fondamentaux-fascicule-section-F10`), navigation clavier, axe-core 0 violation.
- E2E reduced-motion : vérifier absence d'animation si `prefers-reduced-motion`.

**Grep strict V3** : 0 résidu `slate-*` / `examen-*` / `ds-*` / `bg-white` / `text-white` sur les fichiers modifiés.

### Vague V4 — Refonte fiche détail `/fondamentaux/[slug]` (1-2 commits)

**Objectif** : enrichir la page détail sans casser le SEO ni les URLs.

**Fichiers** :
- `src/app/fondamentaux/[slug]/page.tsx` — compose `FicheTopbar` + `FicheTitle` + `FicheSummary` + `FicheStickyToc` + `MarkdownArticle` + `FicheNextPrev` + `FicheChecklist`.
- Nouveaux composants dans `src/components/fondamentaux/fiche/`.

**Point de décision V4.0** : refonte `MarkdownArticle` ou pas ? Décision en V0.

**Tests V4** :
- E2E `e2e/fondamentaux-fiche.spec.ts` : breadcrumb, TOC desktop, "marquer comme lu" déclenche localStorage, next/prev dans le même fascicule.
- SEO : `generateMetadata` toujours renvoie title + description + canonical sur chaque fiche.

### Vague V5 — Gamification état lu / progression (1 commit)

**Objectif** : brancher la progression sur localStorage (connecté : mirror Supabase).

**Fichiers** :
- Nouveau hook `src/hooks/use-fondamentaux-progress.ts` — API `markAsRead(slug)`, `getReadSet()`, `getProgressPct()`.
- Nouveau `src/features/fondamentaux/controllers/get-fondamentaux-progress.ts` — server-side via `user_node_progress` (connectés).
- Mirror localStorage pour non-connectés + override instantané côté connectés.

**Tests V5** :
- Unit : hook en isolation (mock localStorage).
- E2E : clic "marquer comme lu" → l'état persiste au reload + carte passe en état "lu".

### Vague V6 — Synthèse éditoriale 16 fiches restantes (bloquant pour V7, ~5 semaines)

**Objectif** : appliquer le template V2b aux 16 fiches restantes avec rigueur SDCP.

**Cadence** : batch de 3-4 fiches / semaine, validation Kévin entre chaque batch.

**Priorisation des batches** (à affiner en V2b) :
1. **Batch 1 (prioritaires examen)** : `crimes-personnes`, `crimes-biens`, `nullites-procedure` → 3 fiches tagguées `prioritaire`.
2. **Batch 2 (actes d'enquête cœur)** : `garde-a-vue`, `auditions`, `controle-identite`, `perquisition` → 4 fiches F11/F12.
3. **Batch 3 (actes complémentaires)** : `fouille-vehicule`, `saisies-scelles`, `instruction-mandats` → 3 fiches F12.
4. **Batch 4 (socle institutionnel)** : `police-judiciaire-statut`, `libertes-publiques`, `loi-penale-responsabilite`, `sanction-penale` → 4 fiches F08/F09/F10.
5. **Batch 5 (spécialités)** : `juridictions-jugement`, `mineurs-cjpm` → 2 fiches F13.

**Livrable par batch** : commit avec fiches + table source ligne→PDF + mention de revue Kévin + flag `valideParKevin: true` dans frontmatter.

**Critère de sortie V6** : les 17 fiches ont `valideParKevin: true` ET passent le grep de contrôle §4.4.

**Règle d'arrêt** : si Kévin détecte ≥ 2 erreurs factuelles sur une fiche → pause batch → recalibrage template → reprise.

### Vague V7 — Nettoyage et close (1 commit)

**Objectif** : clore la phase proprement.

- Supprimer `CoursFichesListClient` si aucune autre route ne le consomme (grep `CoursFichesListClient` avant).
- Mettre à jour `docs/TECH_DEBT.md` : debounce fait, aria-labelledby hub fait.
- Baseline Lighthouse after `docs/baselines/phase-3a/lighthouse-after-3a-fondamentaux.json`.
- Rapport de clôture dans `docs/plans/phase_3a_fondamentaux_refonte_3a1b7c2f.plan.md` en §8.

---

## 7. Tests, grep strict, baselines

### 7.1 Tests obligatoires avant chaque commit de vague

- `npm run lint` — 0 erreur, 0 warning `eslint-plugin-tailwindcss`.
- `npx tsc --noEmit` — vert.
- `npm test` (vitest) — 100% pass.
- `npm run build` — vert (build frais).
- `CI=true npm run test:e2e` — vert (port 3000 libre, profil Windows).

### 7.2 Grep strict (pattern figé Phase 2)

Commande à exécuter sur les fichiers modifiés de chaque vague :

```bash
rg -n '\bslate-[a-zA-Z0-9]+\b|\bexamen-[a-zA-Z0-9]+\b|\bds-[a-zA-Z0-9]+\b|\bbg-white\b|\btext-white\b|\borde-[a-zA-Z0-9]+\b' \
   src/components/fondamentaux/ src/app/fondamentaux/
```

**Critère de passage** : 0 match.

### 7.3 Baselines Lighthouse

- **Avant V1** : `docs/baselines/phase-3a/lighthouse-before-3a-fondamentaux.json`
- **Après V3** (hub refondu) : `docs/baselines/phase-3a/lighthouse-after-v3-fondamentaux.json`
- **Après V4** (détail refondu) : `docs/baselines/phase-3a/lighthouse-after-v4-fondamentaux-slug.json` (sur une fiche représentative, ex. `cadres-enquete`).

**Protocole** : 3 passes mobile médiane + 1 passe desktop. `meta.commit` verrouillé au HEAD mesuré. `meta.url` cohérent.

**Critère de passage** : **aucune régression > 3 pts de score perf mobile** vs baseline (marge de variance Lighthouse). LCP mobile cible < 3,5s après V3 (actuel home : 4,7s, `/infractions` : 6,14s — `/fondamentaux` pas encore mesuré en baseline → V0 pose la valeur de départ).

### 7.4 Accessibilité

- `@axe-core/playwright` passé sur `/fondamentaux` et `/fondamentaux/cadres-enquete` : **0 violation serious / critical**.
- Navigation clavier complète (tab-order attendu : skip link → header → hero → progress-strip → search → filtres → première carte fascicule → carte fiche → next prev section → footer).
- Contrastes : tous tokens `ij.*` testés WCAG AA 4.5:1 minimum.

---

## 8. Risques identifiés et parades

| Risque | Gravité | Parade |
|---|---|---|
| **Scope creep Cursor** | 🔴 Élevé | Vagues commit par commit + pause utilisateur entre chaque. Aucun `mkdir src/components/fondamentaux/` avant validation. |
| **Régression SEO** (URLs `/fondamentaux/[slug]`) | 🔴 Élevé | Tests e2e vérifient canonical + status 200. Pas de changement de structure URL. |
| **Régression perf mobile** | 🟠 Moyen | Baselines Lighthouse à chaque vague. Dynamic import des sections "below the fold" (pattern home 2B). |
| **Rupture DS visuelle** | 🟠 Moyen | Tokens `ij.*` uniquement. Recette manuelle visuelle dark mode sur `/fondamentaux` + 2 fiches après chaque V. |
| **Hallucination juridique** (Claude rédacteur) | 🔴 **Élevé** | **Source-de-vérité SDCP stricte §4.0 + grep contrôle articles §4.4 + validation Kévin ligne par ligne + règle d'arrêt ≥2 erreurs/batch.** Refus de rédiger hors PDF. |
| **Divergence SDCP ancien / cahier MAJ 2025** | 🟠 Moyen | Cahier MAJ 2025 prévaut toujours. Frontmatter `sourceVersion` tracé. Flag "à re-valider" si MAJ postérieure. |
| **Ownership éditorial flou post-V6** | 🟠 Moyen | `redacteur: "claude-sdcp"` + `valideParKevin: true` dans frontmatter. `/a-propos` à reformuler pour refléter le co-authorship (Kévin valide, Claude synthétise). Tâche hors scope 3A mais à traquer. |
| **Contenu markdown non prêt** (si V2b/V6 traine) | 🟠 Moyen | V3 ne démarre pas sans V2b validé. Si V6 traîne, les fiches non encore traitées gardent leur ancienne rédaction avec badge "rédaction en cours" discret pour transparence. |
| **Progression Supabase incohérente** | 🟠 Moyen | V5 isolée en fin. Fallback localStorage si erreur Supabase. Pas de crash. |
| **Régression `CoursFichesListClient`** consommé ailleurs | 🟡 Bas | V3 garde l'ancien fichier en `@deprecated`. V7 le supprime seulement après grep confirmant 0 import. |
| **Animation doublée** (stagger parent + whileInView enfants) | 🟡 Bas | Règle projet connue — vérifier lors de V2 que seul le parent porte le stagger. |
| **Port 3000 occupé sur Windows** pour e2e | 🟡 Bas | Libérer avant chaque run. Protocole déjà acté. |
| **Disponibilité Kévin pour valider 5+ batches** | 🟠 Moyen | Cadence pilotée par Kévin. Si un batch reste > 7 jours sans revue, Claude s'arrête et priorise V5 (gamification) ou dette technique, pas de nouveau batch en avance. |

---

## 9. Arbitrages — état au 2026-04-21

### 9.1 Tranchés (figés)

| # | Sujet | Décision | Source |
|---|-------|----------|--------|
| 1 | **V6 ownership** | **Claude rédige, Kévin valide ligne par ligne** (pilote) puis par batch | AskUserQuestion 2026-04-21 |
| 2 | **Périmètre V6** | **17 fondamentaux uniquement** — infractions/enquêtes/épreuves → Phases 3B/3C/3D | AskUserQuestion 2026-04-21 |
| 3 | **Règle de source** | **SDCP uniquement + CPP cité nommément** — 0 hors-source | AskUserQuestion 2026-04-21 |
| 4 | **Cadence validation** | **1 fiche pilote V2b → template figé → 16 autres par batch 3-4** | AskUserQuestion 2026-04-21 |
| 5 | **Séquencement global** | **Finir Phase 2D.2.a d'abord**, puis bascule 100% Phase 3A | AskUserQuestion 2026-04-21 |
| 6 | **Gamification V5** | **Option B** (localStorage + Supabase mirror) | Décision antérieure |

### 9.2 Encore à trancher avant démarrage Phase 3A (post 2D.2.a)

1. **Choix de la fiche pilote V2b** : recommandation Claude = `cadres-enquete` (priorité examen, centrale F11). Kévin peut imposer un autre choix (`crimes-personnes` ? `garde-a-vue` ?).
2. **Refonte `MarkdownArticle`** en V4 in-place vs Phase 3A.bis isolée → décision après audit V0 (taille/complexité actuelle). Les directives `:::piege` / `:::checklist` / `:::references` sont un signal fort pour un refactor contrôlé.
3. **Fiches hors-fascicule SDCP** (`crimes-biens`, `crimes-personnes`, tags `DPP`/`DPG`) : section dédiée "Épreuves écrites" sur le hub, ou rattachées à F01 SDCP (`Les crimes et délits contre les personnes`) ? Recommandation Claude : rattacher à F01 et créer une vue transversale "Prioritaires examen" côté hub.
4. **Reformulation `/a-propos`** : la promesse "ce qui est enseigné aujourd'hui" doit être révisée pour refléter le co-authorship SDCP-Claude-validé-Kévin. Ticket à créer hors Phase 3A mais avant publication du hub refondu.

---

## 10. Grep de validation du plan (méta)

À l'issue de la revue Kévin, ce plan doit satisfaire :

- [ ] Arborescence fichiers in-scope / out-of-scope nommée.
- [ ] Grep strict pattern figé.
- [ ] Technique figée par vague (noms d'exports, signatures hook).
- [ ] Découpage en vagues avec commits atomiques.
- [ ] Tests prévus par vague.
- [ ] Risques identifiés avec parades.
- [ ] Points à trancher listés avant feu vert.

---

**Statut : ARBITRAGES §9.1 FIGÉS AU 2026-04-21. Phase 3A en attente de clôture Phase 2D.2.a.**

**Prochaines étapes (dans l'ordre)** :
1. Finir Phase 2D.2.a (perf infractions, LCP mobile 6.14s → <3.5s) — travail en cours, HEAD actuel `a636569`.
2. Clore 2D.2.a (baseline after + validation Kévin + commit).
3. Trancher §9.2 points 1-4 (fiche pilote, `MarkdownArticle`, hors-fascicule, `/a-propos`).
4. Lancer V0 Phase 3A (audit + réconciliation fascicules + extraction PDF + baseline Lighthouse).
5. V1 (frontmatter) → V2 (primitives visuelles) → **V2b (fiche pilote éditoriale)** → V3 (hub) → V4 (détail) → V5 (gamification) → V6 (16 fiches restantes) → V7 (close).
