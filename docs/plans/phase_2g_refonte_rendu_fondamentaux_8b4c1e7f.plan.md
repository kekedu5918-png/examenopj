# Phase 2G — Refonte qualité de rendu des fondamentaux

**Fichier** : `docs/plans/phase_2g_refonte_rendu_fondamentaux_8b4c1e7f.plan.md`  
**Statut** : brouillon soumis à validation utilisateur — **aucune implémentation tant que le plan n’est pas approuvé**  
**Remplace** : l’enrichissement « contenu seul » de **2F.1.b** (annulé côté qualité de rendu) et la logique d’amélioration **2F.3** jugée insuffisante sur le plan pédagogique.  
**Conservé** : **2F.2** (deep-links, redirections 301, migration Supabase) — considéré comme correct.

---

## 1. Diagnostic du rendu actuel

### 1.1 Exemple citable : `police-judiciaire-statut` (`/fondamentaux/police-judiciaire-statut`)

- **Images PDF** : le corps commence par `![]( /fondamentaux/police-judiciaire-statut-tableau-p15.jpg )` et `p16` — affichage d’illustrations issues du scan, en contradiction avec l’exigence produit (révision, pas copie de manuel).
- **Tableau perdu** : le paragraphe unique sous `## 4.1` enchaîne « Échelle Services concernés Précisions NATIONALE (art. R. 15-18 CPP) DNPJ… » sur une seule « ligne logique » — structure tabulaire illisible (décision attendue côté pipeline : GFM propre **ou** suppression, jamais paragraphe-bouillie).
- **Surcharge** : enchaînement `## 4.2` + pseudo-tableau + blocs `>` (CLÉ, ATTENTION, JURISPRUDENCE) + enchaînement d’une autre « partie » en fin de fiche : hiérarchie visuelle insuffisante pour un candidat en révision ciblée.
- **Métadonnées** : certains champs de frontmatter contiennent un **mur de texte** dans `description` (OCR/concat) — mauvais pour SEO et pour la lisibilité.

**Référence fichier** (extrait) : `content/cours/police-judiciaire-statut.md` (§ 4.1 / 4.2).

### 1.2 Composant de rendu

- `MarkdownArticle` aujourd’hui : `ReactMarkdown` + `remarkGfm` avec un wrapper `prose prose-invert … prose-a:text-violet-300` — **aucune personnalisation par nœud** (table, `blockquote`, `code`), donc **pas de design tokens `ij.*`**, conflit avec la charte OPJ.
- Fichier : `src/components/content/MarkdownArticle.tsx` (lignes 11–20 au moment de l’audit).

### 1.3 Inventaire : fiches contenant `![](…/fondamentaux/…\.jpg\)`

- **Décompte au grep** (non interactif) : **37** fichiers `content/cours/*.md` contiennent au moins une image sous `/fondamentaux/…`.
- **Stockage** : **53** fichiers `*.jpg` dans `public/fondamentaux/` — à recouper en **2G.4** (référencés vs orphelins).
- Exemples de fiches concernées (liste non exhaustive) : `police-judiciaire-statut`, `enquete-flagrance`, `nullites-procedure`, `parquet-instruction`, `causes-irresponsabilite-attenuation`, `actualisation-lois-2025`, `viol-agressions-sexuelles`, `classification-tripartite-application-loi`, `entrainement-session-2026`, etc.  
- Les **~9** autres fiches du corpus (~46) peuvent n’avoir **aucune** image mais souffrir du même problème de **texte tabulaire aplati** — le script **2G.0** devra le mesurer fiche par fiche.

**Arbitrage à valider (utilisateur)** : certaines fiches possèdent déjà un champ `articlesCites` (liste longue) dans le frontmatter — voir section 4 pour la cohabitation avec `articlesCles` (5 articles « phares »).

---

## 2. Pipeline OCR / extraction — refonte

### 2.1 Limites de l’approche actuelle (document d’audit)

- Le rapport `docs/audits/2f1a-rapport-qualite-ocr.md` indique l’usage de **pdf-parse** v2 et une découpe par marqueur `CHAPITRE n` ; pour les tableaux, mention d’un secours `getTable()` ou **capture d’écran** — d’où la prolifération de **JPEG** et de texte **non structuré**.

### 2.2 Objectif technique 2G

- **Zéro image** en sortie fiche (pas de `![](public/fondamentaux/...)`).
- **Tableaux** : cible **markdown GFM** (`| a | b |` + ligne séparatrice) ; en-têtes de colonnes dès qu’identifiables.
- **Listes** : toute énumération a), b), c) ou listes de conditions **→** listes Markdown (puces ou numérotées), pas d’énumérations en ligne interminable.
- **Hiérarchie** : `##` = sections numérotées du chapitre (4.1, 4.2, …) ; `###` = sous-sections.
- **Articles de loi** : post-traitement par **regex** sur le texte produit, pour enrober en **backticks** inline les motifs du type : `art. 123 CPP`, `art. 123-45 CP`, `L. 123-45`, `R. 12-34 CPP`, variantes alinéa, etc. (liste exacte de motifs : à figer en spec dans **2G.1** et tests unitaires sur chaînes réelles).

### 2.3 Choix d’outils (réaliste, à valider en 2G.1 sur pilotes)

| Option | Rôle | Limite franche |
|--------|------|-----------------|
| **pdf-parse (actuel) + heuristiques** | Texte + tentatives de reconstruction | Tableaux : souvent coller des colonnes en une ligne — **insuffisant seul** pour 2G. |
| **pdfjs-dist (Mozilla)** | Texte + **positions (x, y, page)** pour regroupement en lignes/colonnes | Nécessite algorithme de **clustering** (alignement vertical des `y`, tri `x`) — coût dev non trivial, mais courant en « layout reconstruction ». |
| **Outils Python (Camelot, tabula, pdfplumber)** | Excellents tableaux sur PDF vectoriels | Intégration = sous-processus ou script hors Next ; CI à définir — **à discuter** si l’équipe accepte un pipeline bilingue. |
| **Reconstruction manuelle assistée** | Fiches sensibles (notes du formateur) | Candidat de secours quand l’OCR ne peut **rien** propre (tableau 7 colonnes, scan pourri) : **omettre** le tableau plutôt qu’en livrer un faux positif. |

**Position du plan (honnête)** : un tableau **complexe, mal scanné, ou en image bitmap dans le PDF** ne sera **pas** magiquement « réparé » à 100 % — le livrable acceptable est : **(a)** GFM propre, **(b)** absence volontaire, **(c)** jamais paragraphe-bouillie.

**Décision requise (utilisateur)** : priorité outillage **100 % Node/TS** vs **script Python** pour la phase de génération des `.md` (hors runtime Next).

### 2.4 Pilotes 2G.1 (proposition)

- **Pilote A — beaucoup de tableaux** : ex. `police-judiciaire-statut` ou `nullites-procedure` (2 images aujourd’hui, structure dense).
- **Pilote B — beaucoup d’articles** : ex. chapitre procédure avec citations CPP denses.
- **Pilote C — listes complexes** : conditions, GAV, ou mesures coercitives.

Ces trois fiches servent de **filet de régression** (e2e snapshot post-2G.1, voir section 6).

### 2.5 Callout « En 30 secondes » (obligatoire)

- Règle cible : **première** section de contenu structurant après le bloc « Articles clés » = **blockquote** GFM `>` unique contenant le résumé.
- Génération : **synthèse** à partir des 2–3 premières phrases utiles du chapitre (pas copier-coller 3 pages) — en pipeline, soit résumé extractif contraint (longueur max), soit éditorialisation assistée. **Seuil de qualité** : si le résumé est vide ou redondant, **bloquer** la fiche (CI / checklist 2G.1).

### 2.6 Paragraphes courts (exigence éditoriale)

- Règle cible : **max 4–5 phrases** par paragraphe, **aucun** bloc &gt; 6 **lignes** visuelles (à contrôler par lint markdown ou review script sur nombre de sauts de ligne / caractères).  
- Les exceptions (citations de jurisprudence) : **dans** un `blockquote` dédié ou `>` séparé, pas dans un `<p>` de 20 lignes.

---

## 3. Spécification rendu `MarkdownArticle` (CSS cible, tokens `ij.*`)

> Implémentation **réservée** à la vague **2G.3** après validation 2G.1/2.2 sur contenu. Ci-dessous : cible de design **concrète** (classes Tailwind) — à ajuster si le thème `ij` évolue.

**Principe** : conserver `ReactMarkdown` + `remarkGfm` ; remplacer le `prose` générique par des **`components`** personnalisés (API `components` de `react-markdown`) pour chaque balise, **toutes** en `text-ij-text` / `border-ij-border` / etc.

### 3.1 Conteneur article

- `className="font-ij-sans text-ij-text text-base leading-relaxed max-w-none"`

### 3.2 Titres

- `h1` (si présent dans le body — **arbitrage** : voir 3.6) : `text-2xl sm:text-3xl font-ij-display font-semibold text-ij-text mt-0 mb-4`
- `h2` : `mt-10 mb-3 text-xl sm:text-2xl font-ij-display font-semibold text-ij-text border-b border-ij-border pb-2`
- `h3` : `mt-8 mb-2 text-lg font-ij-sans font-semibold text-ij-text`

### 3.3 Paragraphes

- `p` (hors `blockquote`) : `mb-4 text-ij-text/95 last:mb-0`

### 3.4 Listes

- `ul` : `mb-4 list-disc pl-5 marker:text-ij-accent space-y-1.5`
- `ol` : `mb-4 list-decimal pl-5 marker:font-ij-mono marker:text-ij-accent space-y-1.5`
- `li` : `pl-1`

### 3.5 Tableaux (GFM)

- Wrapper : `div` avec `mb-6 overflow-x-auto rounded-xl border border-ij-border`
- `table` : `min-w-full border-collapse text-left text-sm font-ij-sans`
- `thead` : `bg-ij-surface-2/90`
- `th` : `border border-ij-border px-3 py-2 font-semibold text-ij-text`
- `td` : `border border-ij-border px-3 py-2 align-top text-ij-text/95`
- `tr` : alternance optionnelle `even:bg-ij-surface-2/40` (arbitrage visuel 2G.3)

### 3.6 Blockquote (callout, dont « En 30 secondes »)

- `blockquote` : `my-5 border-l-4 border-ij-accent bg-ij-surface-2/80 pl-4 pr-4 py-3 rounded-r-lg text-ij-text/95 [&>p]:mb-0`

### 3.7 Code inline (articles de loi)

- `code` (hors blocs) : `rounded px-1.5 py-0.5 text-sm font-ij-mono bg-ij-surface-2 text-ij-accent`  
  (2px/6px ≈ `py-0.5 px-1.5` en Tailwind.)

### 3.8 Blocs de code (si usage rare)

- `pre` : `mb-4 overflow-x-auto rounded-xl border border-ij-border bg-ij-surface-2/90 p-4`

### 3.9 Liens

- `a` : `text-ij-accent underline-offset-2 hover:underline` (éviter `violet-300` actuel)

### 3.10 Section « Articles clés » générée (hors Markdown brut — **arbitrage**)

- L’exigence produit : **sous le titre de page, avant le callout** : « Articles clés : … ».
- **Deux** implémentations possibles (décision utilisateur) :
  - **(A)** Générer ce bloc en **composant React** sur la page `fondamentaux/[slug]/page.tsx` à partir de `data.articlesCles` (recommandé : pas de duplication avec un `#` dans le body).
  - **(B)** L’inclure **dans** le markdown en première position (pipeline) — attention au double titre.

### 3.11 Doublon H1 (arbitrage bloquant)

- Aujourd’ui le **body** contient souvent `# Titre` alors que le layout **ne réaffiche pas** le `title` frontmatter en pleine page.  
- Pour 2G : soit **titre** uniquement côté page (`<h1>` depuis `data.title`) et body sans `#` ; soit conserver un seul `#` dans le body. **À trancher** avant 2G.2 en masse.

---

## 4. Spécification frontmatter

### 4.1 Champs conservés (2F / existants)

- `title`, `description` (la 2G devra **alléger** `description` : 1–2 phrases max, non concat OCR)
- `tags`
- `partie`, `chapitre`, `loi2025`, `derniereMiseAJour` (ou équivalent) — **inchangés en sémantique** sauf ajustement doc

### 4.2 Nouveau champ : `articlesCles`

- Type : `articlesCles: string[]` — **exactement 5** entrées cibles, normalisées (ex. `art. 18 CPP`, `art. R. 15-18 CPP`).
- Règle de remplissage : **extraction** par regex + **fréquence** sur le texte du chapitre, prise des 5 **plus fréquents** — avec liste noire (articles trop génériques) si besoin. **Revue manuelle** possible sur échantillon pilote.

### 4.3 Cohabitation avec `articlesCites` (existant)

- Plusieurs fiches possèdent déjà `articlesCites` (liste longue, parfois alinéa).  
- **Proposition** : conserver en archive ou fusionner : soit **déprécier** `articlesCites` au profit de `articlesCles` + corps structuré, soit **renommer** proprement avec script one-shot. **Validation utilisateur** requise.

---

## 5. Découpage en vagues

| Vague | Contenu | Sortie |
|--------|---------|--------|
| **2G.0** | Audit rendu actuel : script (Node ou Playwright) générant un **rapport HTML** (liste des 46 fiches, indicateurs : longueur max paragraphe, nb `![](/fondamentaux`, présence `|----|` table GFM, etc.) + captures optionnelles. | `docs/audits/2g0-…` (chemin exact à définir) |
| **2G.1** | Refonte pipeline + **3 pilotes** régénérés + **2G.3** partielle min sur `MarkdownArticle` si besoin pour lire tableaux. | 3 fiches + tests |
| **2G.2** | Régénération des **43** autres chapitres + relecture spot (échantillon). | 46/46 fiches |
| **2G.3** | `MarkdownArticle` final : tableaux, blockquote, `code`, H2/H3, listes, page fiche (Articles clés). | UI stable |
| **2G.4** | Nettoyage `public/fondamentaux/*.jpg` **non référencés** + vérif qu’**aucun** `![](` ne reste vers ce dossier. | Repo propre |

---

## 6. Tests obligatoires (Definition of Done)

- `npm run lint`, `npx tsc --noEmit`, `npx vitest run`, `npm run build` : **verts**.
- **E2E existants** : non régression (y compris 2F.2 301, hub fondamentaux).
- **Nouveau e2e (2G.1+)** : snapshots visuels **des 3 fiches pilotes** après refonte (chemin type `/fondamentaux/...` sur Chromium), + assertion **absence d’**`<img`** dans le corps si la spec « zéro image » est testable en DOM (ou `expect(page.locator('article img')).toHaveCount(0)` sur ces URLs).

---

## 7. Risques

- **OCR** : insuccès partiel sur tableaux — atténuer par **règle de suppression** et relecture ciblée, pas par approximations.
- **MarkdownArticle** : la refonte `ij.*` peut **différer** des pages utilisant aujourd’hui `violet-300` / `prose-invert` — risque de régression **mode light** si `MarkdownArticle` est partagé. Mitigation : limiter le roll-out à `/fondamentaux/[slug]` via prop `variant="fondamentaux"` **ou** vérification `a11y-light-theme` + snapshots.
- **Temps** : 2G.2 = charge éditoriale + CI ; planifier relecture humaine sur échantillon.

---

## 8. Reprise après 2G

- **2F.4** : suppression des **17** anciennes fiches obsolètes (hors sujet 2G si le contenu 2G remplace le corpus cible).
- **2D.2.a** : animations grille infractions (selon roadmap) — indépendant du fondamentaux.

---

## 9. Synthèse des arbitrages à valider côté utilisateur

1. Pipeline **Node uniquement** vs **Python** pour extraction tableaux.
2. Titre de fiche : **un seul** `<h1>` (page) vs **markdown** : strip ou pas.
3. **Articles clés** : rendu en composant page vs premier bloc markdown.
4. `articlesCites` vs `articlesCles` : fusion, dépréciation, ou cohabitation.
5. Tolerance **zéro image** : confirmer qu’**aucun** schéma en image n’est accepté (même pédagogique) — actuellement schémas timeline / viol 2025 en JPG.

**Fin du plan — en attente de validation utilisateur avant toute implémentation.**
