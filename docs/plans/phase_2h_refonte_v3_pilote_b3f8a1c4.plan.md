# Phase 2H — Refonte rendu fondamentaux V3 (composants premium + 3 pilotes contenu)

> **Remplace et supersed** : [`phase_2h_refonte_v3_pilote_7c4a9e2b.plan.md`](./phase_2h_refonte_v3_pilote_7c4a9e2b.plan.md) — le plan `7c4a9e2b` reste dans l’historique Git mais **ne doit plus** guider l’exécution (erreurs §6 corrigées ici).  
> **Statut** : plan révisé pour revue utilisateur — aucune implémentation avant validation explicite.  
> **Parent** : Phase 2G (constat d’échec du pipeline OCR sur le rendu).  
> **Source de contenu** : `content/_sources/synthese-46-chapitres/*.md` (46 chapitres).  
> **Phase 2H** : **composants V3 + intégration contenu sur 3 pilotes** — **aucun renommage de slug** ; la **migration Option C** (301, `next.config`, Supabase, deep-links) est **reportée intégralement en Phase 2I**.  
> **Rappels** : [`plans-versioning.mdc`](../../.cursor/rules/plans-versioning.mdc) ; `LIGHT_MODE_ENABLED = false` dans [`ThemeProvider.tsx`](../../src/components/providers/ThemeProvider.tsx).

---

## §1 — Diagnostic et contexte

La **Phase 2G** a montré que le **pipeline OCR** (extraction automatique à partir de supports scannés ou bruités) ne produisait pas un rendu lisible ni pédagogique : texte fragmenté, titres incohérents, mélange de sections, perte de la grille éditoriale attendue pour l’examen OPJ.

Face à ce plafond de qualité, **l’utilisateur a rédigé un corpus complet de 46 chapitres** au format structuré (stats, schéma mémo, blocs, plan, articles clés), stocké sous `content/_sources/synthese-46-chapitres/`. Ce corpus est la **référence normative** pour le fond : aucune invention de contenu en Phase 2H.

**État actuel côté site** : 46 fichiers `content/cours/*.md` portent encore un contenu issu ou dérivé de l’OCR, jugé inacceptable pour la refonte visuelle. **Le champ `chapitre: N` du frontmatter ne doit pas être utilisé comme clé de jointure** avec le corpus : il reflète un ordonnancement historique fragile ; plusieurs **titres de fichier / slugs** sont **trompeurs** par rapport au corps réel (voir §6).

**Corpus chapitres 35–40** : le fichier `content/_sources/synthese-46-chapitres/chapitres-31-40.md` est **complet** (vérifié : chaque chapitre 35–40 contient stats, schéma mémo, définition, piège, point clé, mémo, plan détaillé, articles clés). L’alerte « tronqué » du plan `7c4a9e2b` est **levée**.

**Objectif Phase 2H** : introduire le **système de rendu V3** (composants premium + frontmatter figé), puis **intégrer le contenu validé** pour **trois pilotes** — chapitres **1** (flagrance), **19** (causes d’irresponsabilité et d’atténuation), **31** (viol et agressions sexuelles) — **sans modifier leurs URLs** (`enquete-flagrance`, `causes-irresponsabilite-attenuation`, `viol-agressions-sexuelles`). Toute la **cartographie slug Option C** pour les 46 fiches est **documentée en §6 pour la Phase 2I** uniquement.

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
    - Record<string, string>

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
| `--ij-memo` | Carte « Mémo » synthèse (or renforcé) | `232 217 178` — **à valider contraste** | Si trop proche, dériver de `--ij-accent` avec opacité |
| `--ij-aurora-1` / `--ij-aurora-2` | Stops dégradés animés | Dérivés de `ij-bg` + `ij-primary` teintés | Keyframes dédiés dans `tailwind.config` ou CSS layer |

**Interdiction** : pas de `slate-*`, `examen-*`, `ds-*`, `bg-white`, `text-white` dans le code des nouveaux composants (grep CI).

---

## §6 — Migration slugs Option C (réserve Phase 2I uniquement)

> **Portée** : cette section **ne s’exécute pas en Phase 2H**. Elle documente la cible pour **Phase 2I** après validation humaine du tableau.  
> **Pilotes 1 / 19 / 31** : **aucun renommage** — conserver `enquete-flagrance`, `causes-irresponsabilite-attenuation`, `viol-agressions-sexuelles` (URLs stables, SEO, bookmarks).

### §6.0 — Méthode de correspondance (titre ↔ titre)

1. Pour chaque fichier `content/cours/<slug>.md` : lire `title` (frontmatter) et le **premier titre `##` (H2)** du corps (repère sur le fond réel malgré titres frontmatter parfois faux).  
2. Pour chaque chapitre du corpus : extraire `CHAPITRE N — TITRE`.  
3. **Apparier** chaque chapitre corpus au **fichier cours** dont le contenu (H2 + premiers paragraphes) **recoupe** le thème du chapitre rédigé — **sans** présumer que `chapitre: N` du YAML = `N` corpus.  
4. **Contrôle croisé** : 46 fichiers ↔ 46 chapitres ; une ligne par couple.

### §6.1 — Règle de normalisation des slugs (Phase 2I)

**Règle apostrophes (français)** : pour former le segment d’URL, `l'`, `d'`, `n'` (minuscules) suivis de la voyelle initiale du mot sont **supprimés comme duo lettre + apostrophe** ; on conserve la suite du mot.

Exemples :

| Fragment source | Segment slug |
|-----------------|--------------|
| L'échelle | echelle |
| d'identité | identite |
| d'irresponsabilité | irresponsabilite |
| d'atténuation | attenuation |
| l'État | etat |
| l'oral | oral |

**Règles complémentaires** : minuscules ; accents supprimés (NFD + retrait des marques diacritiques) ; espaces et virgules → tiret `-` ; parenthèses : retirer ou remplacer par un segment court (`reforme-2025` si conservé) ; `LES` / `LA` / `LE` en tête de titre : **omis** dans le slug sauf cas ambigu (préférer sens) ; tirets multiples → un seul tiret.

Une fonction unique (`slugifyCorpusTitle` ou équivalent) sera codée en **2I** ; le tableau ci-dessous donne la **cible normalisée** déjà appliquée à la main selon cette règle.

### §6.2 — Écarts et alertes éditoriales

- **Titres frontmatter trompeurs** : nombreuses fiches ont un `title` OCR qui ne reflète pas le corps (ex. « Atteintes aux biens » pour du 226-xx vie privée). Le mapping repose sur le **fond**, pas sur le title seul.  
- **Noms de fichier trompeurs** : `perquisition.md` contient l’**audition libre** ; `auditions.md` contient **perquisitions / saisies** ; `controle-identite.md` = **réquisitions** (H2) ; `requisition-commission-rogatoire.md` = **contrôles d’identité** ; `stupefiants-usage.md` = **extorsion / escroquerie / abus de confiance** ; `armes-materiel-guerre.md` = **atteintes aux mineurs et à la famille** (art. 227-xx) ; `traites-dignite-personne.md` = **CJPM** ; `infractions-numeriques.md` = **atteintes nation / État / justice** (gros chapitre 42 corpus) ; `sanction-penale.md` = **casier judiciaire** (H2 bulletins).  
- **Chapitre corpus sans fichier** : aucun (bijection complète après appariement).  
- **Fichier cours sans chapitre corpus** : aucun.

### §6.3 — Tableau de mapping révisé (46 lignes)

Colonne **Action (Phase 2I)** : `Renommer` si slug cible ≠ slug actuel ; `Conserver` si déjà aligné ou **pilote** (URLs figées).

| Chap. rédigé | Titre rédigé (corpus) | Ancien slug | Titre frontmatter actuel | Premier H2 corps (fichier actuel) | Slug cible normalisé (2I) | Action (2I) |
|:---:|:---|:---|:---|:---|:---|:---|
| 1 | L'ENQUÊTE DE FLAGRANCE | `enquete-flagrance` | L'enquête de flagrance | `## 1.1 Définition et conditions (art. 53 C.P.P.)` | `enquete-flagrance` | **Conserver (pilote V3)** |
| 2 | L'ENQUÊTE PRÉLIMINAIRE | `enquete-preliminaire` | L'enquête préliminaire | `## 2.1 Définition et caractéristiques` | `enquete-preliminaire` | Conserver |
| 3 | LES ACTEURS JUDICIAIRES | `information-judiciaire` | L'information judiciaire | `## 3.1 Hiérarchie d'ensemble` | `acteurs-judiciaires` | Renommer |
| 4 | LES COMPÉTENCES TERRITORIALES | `police-judiciaire-statut` | Acteurs, statut, direction et contrôle de la police judiciaire | `## 4.1 Principe de compétence ordinaire` | `competences-territoriales` | Renommer |
| 5 | LA GARDE À VUE | `garde-a-vue` | La garde à vue | `## 5.1 Définition et nature juridique` | `garde-a-vue` | Conserver |
| 6 | L'AUDITION LIBRE ET STATUTS | `perquisition` | Perquisitions, visites et saisies | `## 6.1 L'audition libre` | `audition-libre-et-statuts` | Renommer |
| 7 | PERQUISITIONS, SAISIES, SCELLÉS | `auditions` | Auditions, mineurs, expertises | `## 7.1 Régime des perquisitions` | `perquisitions-saisies-scelles` | Renommer |
| 8 | LES RÉQUISITIONS JUDICIAIRES | `controle-identite` | Identité, rétention, interpellation | `## 8.1 Principe et typologie` | `requisitions-judiciaires` | Renommer |
| 9 | CONTRÔLES ET VÉRIFICATIONS D'IDENTITÉ | `requisition-commission-rogatoire` | Réquisition, commission rogatoire, actes d'enquête | `## 9.1 Les contrôles d'identité` | `controles-verifications-identite` | Renommer |
| 10 | ACTION PUBLIQUE ET ACTION CIVILE | `action-publique-opportunite` | Action publique, opportunité, politique pénale | `## 10.1 Distinction fondamentale` | `action-publique-et-action-civile` | Renommer |
| 11 | L'INSTRUCTION PRÉPARATOIRE | `parquet-instruction` | Parquet, instruction : cadre général | `## 11.1 Caractère et ouverture` | `instruction-preparatoire` | Renommer |
| 12 | LE JLD ET LES MANDATS DE JUSTICE | `jld-mandats` | JLD, détention provisoire, mandats de justice | `## 12.1 Le Juge des Libertés et de la Détention` | `jld-et-mandats-de-justice` | Renommer |
| 13 | CJ, ARSE, DÉTENTION PROVISOIRE | `mise-en-examen-instruction` | Mise en examen, juge d'instruction | `## 13.1 Le contrôle judiciaire (CJ)` | `cj-arse-detention-provisoire` | Renommer |
| 14 | POURSUITES ET MODES DE SAISINE | `juridictions-jugement` | Renvoi, jugement, juridictions répressives | `## 14.1 Les alternatives aux poursuites (art. 41-1 CPP)` | `poursuites-et-modes-de-saisine` | Renommer |
| 15 | LES JURIDICTIONS RÉPRESSIVES | `assises-appel` | Cour d'assises, appel, procédures spéciales | `## 15.1 Les juridictions du 1er degré` | `juridictions-repressives` | Renommer |
| 16 | LA NULLITÉ DES ACTES DE PROCÉDURE | `nullites-procedure` | La nullité des actes de procédure | `## 16.1 Finalité et distinction` | `nullite-des-actes-de-procedure` | Renommer |
| 17 | CLASSIFICATION ET APPLICATION DE LA LOI | `classification-tripartite-application-loi` | La classification tripartite et application de la loi | `## 17.1 La classification tripartite des infractions` | `classification-et-application-de-la-loi` | Renommer |
| 18 | LA RESPONSABILITÉ PÉNALE | `responsabilite-penale-personnes-physiques` | La responsabilité pénale des personnes physiques | `## 18.1 Principes fondateurs` | `responsabilite-penale` | Renommer |
| 19 | CAUSES D'IRRESPONSABILITÉ ET D'ATTÉNUATION | `causes-irresponsabilite-attenuation` | Les causes d'irresponsabilité et d'atténuation | `## 19.1 Le trouble psychique ou neuropsychique` | `causes-irresponsabilite-attenuation` | **Conserver (pilote V3)** |
| 20 | USAGE DES ARMES PAR LES FORCES DE L'ORDRE | `usage-armes-forces-ordre` | Usage des armes par les forces de l'ordre | `## 20.1 Les trois conditions` | `usage-armes-forces-ordre` | Conserver *(slug déjà aligné sur le titre)* |
| 21 | RESPONSABILITÉ PÉNALE DES PERSONNES MORALES | `complicite-concours` | Complicité, coaction, concours d'infractions | `## 21.1 Les personnes morales concernées` | `responsabilite-penale-des-personnes-morales` | Renommer |
| 22 | COMPLICITÉ ET COACTION | `tentative-recidive-circonstances` | Tentative, récidive, circonstances… | `## 22.1 La coaction` | `complicite-et-coaction` | Renommer |
| 23 | LA TENTATIVE ET LE REPENTIR ACTIF | `personne-morale-mineurs` | Personne morale, mineurs (général DPG) | `## 23.1 Conditions de la tentative` | `tentative-et-repentir-actif` | Renommer |
| 24 | L'ÉCHELLE DES PEINES | `peines-modes-individuation` | Peines : principes, modes… | `## 24.1 Les peines criminelles` | `echelle-des-peines` | Renommer |
| 25 | RÉCIDIVE, CONCOURS, CUMUL | `prescription-extinction` | Prescription, amnistie… | `## 25.1 Les termes de la récidive` | `recidive-concours-cumul` | Renommer |
| 26 | LE CASIER JUDICIAIRE | `sanction-penale` | La sanction pénale | `## 26.1 Les trois bulletins` | `casier-judiciaire` | Renommer |
| 27 | ATTEINTES VOLONTAIRES À LA VIE | `homicides-atteintes-vie` | Homicides, atteintes à la vie | `## 27.1 Le meurtre (art. 221-1 CP)` | `atteintes-volontaires-a-la-vie` | Renommer |
| 28 | ATTEINTES INVOLONTAIRES ET INFRACTIONS ROUTIÈRES | `violences-involontaires-integrite` | Atteintes involontaires, mise en danger | `## 28.1 L'homicide involontaire (art. 221-6)` | `atteintes-involontaires-et-infractions-routieres` | Renommer |
| 29 | VIOLENCES VOLONTAIRES ET LEURS AGGRAVATIONS | `enlevement-sequestration` | Enlèvement, séquestration, prise d'otage | `## 29.1 Tableau synthétique des violences` | `violences-volontaires-et-aggravations` | Renommer |
| 30 | TORTURE, BARBARIE, MENACES | `violences-menaces-harcelement` | Violences, menaces, harcèlement | `## 30.1 Tortures et actes de barbarie` | `torture-barbarie-menaces` | Renommer |
| 31 | VIOL, AGRESSIONS SEXUELLES (RÉFORME 2025) | `viol-agressions-sexuelles` | Violences sexuelles — viol, agressions, réforme 2025 | `## 31.1 Le viol (art. 222-23 C. pén.)` | `viol-agressions-sexuelles` | **Conserver (pilote V3)** — pas de suffixe `reforme-2025` |
| 32 | HARCÈLEMENT, DISCRIMINATION, DIGNITÉ HUMAINE | `mineurs-cjpm` | Mineurs, famille, mœurs, proxénétisme | `## 32.1 Le harcèlement moral (art. 222-33-2)` | `harcelement-discrimination-dignite-humaine` | Renommer |
| 33 | ATTEINTES À LA VIE PRIVÉE ET AUX CORRESPONDANCES | `atteintes-aux-biens` | Atteintes aux biens, recel, destructions | *(corps : art. 226-xx vie privée)* | `atteintes-vie-privee-et-correspondances` | Renommer |
| 34 | LE VOL ET SES CIRCONSTANCES AGGRAVANTES | `vols-escroquerie-extorsion` | Vol, escroquerie, abus de confiance, extorsion | `## 34.1 Définition et éléments constitutifs` | `vol-et-circonstances-aggravantes` | Renommer |
| 35 | EXTORSION, CHANTAGE, ESCROQUERIE, ABUS DE CONFIANCE | `stupefiants-usage` | Stupéfiants : usage, détention… | *(corps : tableaux 312/313/314)* | `extorsion-chantage-escroquerie-abus-de-confiance` | Renommer |
| 36 | RECEL, BLANCHIMENT, DESTRUCTIONS | `stupefiants-trafic` | Stupéfiants : trafic… | `## 36.1 Le recel (art. 321-1 CP)` | `recel-blanchiment-destructions` | Renommer |
| 37 | CIRCULATION ROUTIÈRE (NOUVEAU RÉGIME 2025) | `delits-circulation-routiere` | Infractions à la circulation routière | `## 37.1 Conduite sous l'empire d'un état alcoolique` | `circulation-routiere-nouveau-regime-2025` | Renommer |
| 38 | STUPÉFIANTS | `atteintes-autorite-corruption` | Atteintes à l'autorité… | `## 38.2 Tableau des infractions en stupéfiants` | `stupefiants` | Renommer |
| 39 | ARMES ET MUNITIONS | `atteintes-nation-terrorisme` | Atteintes à la nation, terrorisme… | `## 39.1 La classification légale des armes (art. R. 311-2 CSI)` | `armes-et-munitions` | Renommer |
| 40 | ATTEINTES AUX MINEURS ET À LA FAMILLE | `armes-materiel-guerre` | Armes, matériels de guerre… | `## 40.1 Tableau synthétique complet` *(227-xx famille / mineurs)* | `atteintes-aux-mineurs-et-a-la-famille` | Renommer |
| 41 | LE RÉGIME SPÉCIFIQUE DES MINEURS (CJPM) | `traites-dignite-personne` | Traite, atteintes à la dignité… | `## 41.1 Principes fondateurs` *(CJPM)* | `regime-specifique-des-mineurs-cjpm` | Renommer |
| 42 | INFRACTIONS CONTRE LA NATION, L'ÉTAT, LA PAIX PUBLIQUE | `infractions-numeriques` | Infractions numériques… | `## 42.1 Atteintes aux intérêts fondamentaux de la Nation` | `infractions-nation-etat-paix-publique` | Renommer |
| 43 | FAUX ET ASSOCIATION DE MALFAITEURS | `blanchiment-infractions-economiques` | Blanchiment, économie… | `## 43.1 Les faux` | `faux-et-association-de-malfaiteurs` | Renommer |
| 44 | LES NOUVEAUTÉS LÉGISLATIVES 2025 | `actualisation-lois-2025` | Actualisation des lois 2025 | `## 44.1 Loi n° 2025-622 du 09/07/2025 — Sécurité routière` | `nouveautes-legislatives-2025` | Renommer |
| 45 | MÉTHODOLOGIE DE L'ORAL OPJ | `outils-oral-entrainement` | Outils, méthode et entraînement oral | `## 45.1 L'enjeu de l'oral` | `methodologie-oral-opj` | Renommer |
| 46 | LES 70 POINTS CLÉS À MAÎTRISER | `entrainement-session-2026` | Dernière ligne droite, session 2026 | *(aucun `##` : corps = blocs A.–K. + conclusion après `#`)* | `70-points-cles-a-maitriser` | Renommer |

### §6.4 — Livrables techniques Phase 2I (rappel)

- Renommage physique des `.md`, `redirects` dans `next.config`, migration SQL `learning_path.lessons.href`, mise à jour deep-links (`fascicule-cours-map.ts`, `enquetes-data.ts`, `revision-themes.ts`, `cours-revision-fil.ts`, `ParcoursOpjPedagogyBlock.tsx`, `fondamentaux-fiches-*.ts`, `local-search.ts`, etc.) — **après** validation du tableau §6.3.

---

## §7 — Découpage en sous-vagues (Phase 2H uniquement)

Chaque sous-vague = **1 commit atomique**, tests verts, **pause utilisateur** obligatoire avant la suivante. **Il n’y a pas de vague « migration slug »** en 2H.

| ID | Contenu | Message commit suggéré |
|----|---------|------------------------|
| **2H.1** | Tokens `ij.*` étendus + expo Tailwind + tests contraste si existant | `chore: extend ij tokens for V3` |
| **2H.2** | Squelettes `fiche/*`, types TS, Zod frontmatter, tests unitaires mock | `feat: V3 component scaffolding` |
| **2H.3** | Implémentation visuelle complète + snapshots Playwright (démo / Storybook) | `feat: V3 components implementation` |
| **2H.4** | Extraction **chap. 1** : frontmatter + corps — **livrable hors commit** jusqu’à validation utilisateur | — |
| **2H.5** | Idem **chap. 19** et **chap. 31** | — |
| **2H.6** | Intégration contenu V3 **chap. 1** sur `enquete-flagrance` | `feat(fondamentaux): pilot 1 — flagrance V3` |
| **2H.7** | Intégration **chap. 19** sur `causes-irresponsabilite-attenuation` | `feat(fondamentaux): pilot 19 — causes irresponsabilité V3` |
| **2H.8** | Intégration **chap. 31** sur `viol-agressions-sexuelles` | `feat(fondamentaux): pilot 31 — viol et agressions sexuelles V3` |
| **2H.9** | e2e pilotes, axe-core (0 critical/serious), Lighthouse mobile perf baseline | `test(fondamentaux): V3 pilots e2e + a11y + perf baseline` |

---

## §8 — Transformation contenu (2H.4 / 2H.5)

Pour chaque pilote :

1. Lire le chapitre dans `content/_sources/synthese-46-chapitres/`.  
2. Extraire stats, schéma mémo, blocs, timeline, plan, articles clés **sans paraphrase hors corpus**.  
3. Produire le YAML §3.  
4. Produire le corps : **sections du plan détaillé uniquement**.  
5. Livrer dans un message clair — **pas de commit** avant validation.  
6. Donnée absente : signaler ; omettre champ optionnel ou demander complément utilisateur.

**Règle absolue** : zéro invention factuelle.

---

## §9 — Tests prévus par vague

| Vague | Tests |
|-------|--------|
| 2H.1 | Build Tailwind, tests tokens / contraste si présents |
| 2H.2 | Vitest : render minimal, props, validation Zod sur fixtures |
| 2H.3 | Vitest + Playwright snapshots visuels ; reduced-motion |
| 2H.6–2H.8 | e2e par pilote : hero V3, tabs, accordéons, articles visibles |
| 2H.9 | axe-core ; Lighthouse mobile performance ≥ 80 (baseline) |

**Toujours** avant commit : lint, `tsc`, vitest, build, e2e ciblés selon vague.

---

## §10 — Risques

| Risque | Atténuation |
|--------|-------------|
| Mauvais appariement titre↔fichier en 2I | Valider §6.3 ligne par ligne avec ce tableau avant toute migration ; option : revue OPJ formateur |
| Hub « bicolore » V3 / V2.6 perçu comme bancal | **Plan B §13** : hiérarchie, badges, communication transparente |
| Régression hub / e2e fondamentaux | Suite e2e existante après chaque vague touchant `/fondamentaux` |
| Animations vs reduced-motion | `useReducedMotion`, `data-reduced-motion` |
| Dépassement calendrier 4–6 semaines | Lancement avec 3 V3 + 43 V2.6 assumés (§13) ; industrialisation post-lancement |

---

## §11 — Règles méthodo (rappel)

- Plan versionné dès création.  
- Pas d’implémentation sans **validation explicite** du plan par l’utilisateur.  
- Pause entre **2H.1 → 2H.9**.  
- Grep interdit dans le code V3 : `\bslate-|\bexamen-|\bds-|\bbg-white\b|\btext-white\b`.  
- Variants motion dans `fiche-motion.ts` uniquement.  
- `data-testid` + `data-reduced-motion` sur blocs animés.  
- Couleurs : tokens `ij.*` uniquement dans les composants V3.  
- `LIGHT_MODE_ENABLED = false` maintenu.

---

## §12 — Calendrier estimé (jours-Cursor)

| Vague | Jours-Cursor |
|-------|----------------|
| 2H.1 | 0,5 |
| 2H.2 | 1 |
| 2H.3 | 2 |
| 2H.4 | 0,5 (+ validation humaine) |
| 2H.5 | 0,5 (+ validation humaine) |
| 2H.6 | 0,75 |
| 2H.7 | 0,75 |
| 2H.8 | 0,75 |
| 2H.9 | 1,5 |
| **Total Phase 2H** | **≈ 8–9 jours-Cursor** |

**Phase 2I** (43 fiches + Option C complète) : **≈ 12–18 jours-Cursor** supplémentaires selon profondeur des deep-links et SQL — **hors** fenêtre stricte 2H. Voir **§13** si le créneau prod 4–6 semaines est tendu.

---

## §13 — Plan B et stratégie de lancement progressif

**Contexte** : livrer en production dans **4–6 semaines** avec **3 fiches premium V3** et **43 fiches** encore au **rendu actuel (V2.6)** — jugé perfectible mais **fonctionnel** — sans nier l’écart de qualité.

### Principes

- **Transparence** : ne pas masquer les fiches V2.6 ; expliquer qu’elles sont en file d’attente de rédaction premium alignée corpus.  
- **Hiérarchie** : sur le hub `/fondamentaux`, afficher en premier les **fiches V3** (cartes mises en avant, ancre ou section « Nouveau rendu »).  
- **Badge** : sur chaque carte / lien vers fiche V2.6, badge discret **« Refonte premium en cours »** (token `ij-warning` ou neutre, pas alarmiste).  
- **Copy produit** : message du type *« 3 fiches premium disponibles ; 43 fiches en cours de montée en qualité sur la base du corpus OPJ 2026 »*.  
- **Rythme post-lancement** : objectif indicatif **~5 chapitres V3 par semaine** après stabilisation 2I (ajustable selon ressources).  
- **Métrique de réussite** : taux de consultation des 3 pilotes, temps passé, retours utilisateurs ; **pas** la dissimulation du volume V2.6.

### Composants / pages UI à prévoir (effort indicatif)

| Élément | Rôle | Effort |
|---------|------|--------|
| `FicheLegacyBadge` (ou prop sur card hub) | Badge « Refonte en cours » sur entrées non-V3 | 0,25 j |
| `FondamentauxHubSectionPremium` | Section pliable ou bandeau listant les 3 slugs V3 en premier | 0,5 j |
| Donnée `isPremiumV3: boolean` (ou liste de slugs) | Source unique pour hub + SEO / sitemap optionnel | 0,25 j |
| Page `/fondamentaux/etat-des-fiches` *(optionnelle)* | Tableau public chap. 1–46 × statut (V3 / V2.6 / prévu) | 1–1,5 j |
| Mise à jour `layout` / meta description hub | SEO + message cohérent | 0,25 j |

**Total Plan B minimal** : **~1,5–2,5 jours-Cursor** en plus de 2H.9, **avant** ou **juste après** le lancement des pilotes.

---

## Livrable

Fichier : `docs/plans/phase_2h_refonte_v3_pilote_b3f8a1c4.plan.md` — **commit dédié**. Plan `7c4a9e2b` **supersedé** mais **conservé** dans l’historique.

**Suite** : pause relecture utilisateur ; puis enchaîner **2H.1**.
