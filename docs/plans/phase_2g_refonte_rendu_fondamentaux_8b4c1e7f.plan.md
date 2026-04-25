# Phase 2G — Refonte qualité de rendu des fondamentaux

**Fichier** : `docs/plans/phase_2g_refonte_rendu_fondamentaux_8b4c1e7f.plan.md`  
**Statut** : **validé sur le fond** (déc. 2026) — l’exécution se fait par vagues (2G.0 → 2G.4) après validation de chaque jalon.  
**Remplace** : l’enrichissement « contenu seul » de **2F.1.b** (annulé côté qualité de rendu) et la logique d’amélioration **2F.3** jugée insuffisante sur le plan pédagogique.  
**Conservé** : **2F.2** (deep-links, redirections 301, migration Supabase) — considéré comme correct.

---

## 0. Décisions d’arbitrage (actées)

1. **Stack extraction** : **Node uniquement** — `pdfjs-dist` pour le texte et les positions ; **reconstruction de tableaux par clustering** des coordonnées x/y. **Pas de Python.** Tableaux trop complexes (irécupérables) : **suppression** plutôt que paragraphe-bouillie (règle §2.3).
2. **Doublon H1** : un seul `<h1>` sur la page, rendu par `fondamentaux/[slug]/page.tsx` depuis `data.title`. Le pipeline OCR supprime en régénération la **première ligne** du corps si c’est un `# Titre` (strip du H1 body). **Test e2e** : **aucune** fiche ne doit avoir une première ligne de corps commençant par `#` .
3. **Articles clés (UI)** : composant **`<FicheArticlesCles articles={data.articlesCles} />`** dans `fondamentaux/[slug]/page.tsx`, **juste après** le `<h1>` (titre page) et **avant** `<MarkdownArticle>`. Style : **pastilles** `font-ij-mono`, `bg-ij-surface-2`, `text-ij-accent`, **séparées**, en **ligne** (wrap autorisé). Rien de tout cela dans le body markdown.
4. **articlesCites → articlesCles (remplacement)** : **dépréciation totale** de `articlesCites`. Remplacement par `articlesCles: string[]` — **exactement 5** entrées, normalisées. En **2G.2**, script one-shot : lire chaque fiche, extraire les articles du corps (regex), compter, prendre les **5** plus fréquents, appliquer une **liste noire** (à figer en 2G.1 sur les pilotes) pour exclure les références trop génériques ; supprimer partout `articlesCites` dans le frontmatter.
5. **Zéro image (strict)** : **aucune** image dans le corps des fiches. Suppression de toutes les `![](...)` pointant vers `public/fondamentaux/`, puis suppression des `*.jpg` devenus **non référencés**. **DETTE** (phase ultérieure) : recréation en **SVG** ou **Mermaid** des schémas pédagogiques utiles (timelines, arbres de décision flagrance / préliminaire) — **à consigner dans `docs/TECH_DEBT.md` en 2G.4** (pas avant).

**Périmètre fiches** : tout fichier `content/cours/*.md` servi en `/fondamentaux/[slug]` (nombre **variable** : auditer le repo ; l’audit 2G.0 utilise **tous** les `.md` du dossier `cours`).

### 0.1 Audit 2G.0 (avant 2G.1) — rapport HTML enrichi

**Livrable** : `docs/audits/2g0-rapport-corpus.html` (génération : `node scripts/audit-2g0-corpus.mjs` — relecture seule sur le disque, **aucune** modification des `.md`).

En **tête du rapport** — synthèse globale :

- Nombre de fiches par score qualité estimé : **propre** / **moyen** / **cassé** (règles documentées dans le HTML).
- **Top 10** des blocs texte les plus longs (caractères) avec **extrait 100 caractères** (slug d’origine) — pour repérer murs de texte / tableaux écrasés.
- Total de références `![](...)` — **images à supprimer** en 2G.x.
- Total de fichiers `public/fondamentaux/*.jpg` **orphelins** après suppression des références (fichiers présents sur disque, non cités par aucun `.md`).

**Tableau (une ligne par fiche)** :

| Métrique | Description |
|----------|-------------|
| Slug | identifiant URL |
| Images | nombre de `![](...)` dans le corps |
| Tableaux GFM | blocs reconnus (lignes `\|...|` + séparateur `---`) |
| Parag. > 6 lignes | nombre de blocs (séparés par double saut) avec &gt; 6 lignes |
| Max lignes / bloc | plus grand bloc (heuristique) |
| Doublon H1 | `oui` si la 1ʳᵉ ligne du corps est un `# ...` (à supprimer côté pipeline) |
| len(description) | alerter si &gt; 300 car. (mur de texte) |
| articlesCites | `oui` / `non` (legacy, à migrer en 2G.2) |
| Score | `propre` / `moyen` / `cassé` (heuristique — à utiliser pour choisir les **3 pilotes 2G.1** : un de chaque catégorie : cassé, moyen, propre) |

**Usage** : calibrer le chantier et **prioriser les 3 chapitres pilotes** 2G.1.

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
- D’autres fiches n’ont **aucune** image mais souffrent du **texte tabulaire aplati** — l’**audit 2G.0** (§0.1) le mesure fiche par fiche.

**articlesCles** : voir section 4 (remplacement de `articlesCites`, décidé).

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

### 2.3 Choix d’outils — **décision** : **Node + pdfjs-dist uniquement**

| Option | Rôle | Limite franche |
|--------|------|-----------------|
| **pdf-parse (actuel, hors pipeline 2G cible)** | Extraction texte seule (legacy) | Ne suffit pas pour la reconstruction tabulaire fiable. |
| **pdfjs-dist** | Texte + **positions (x, y, page)** → **clustering** lignes/colonnes, sortie GFM | Tableaux denses / scans dégradés : **supprimer** plutôt qu’inventer. |
| **Relecture ciblée** | Cas limites (contestation formateur) | Dernier recours si ambiguïté ; pas d’automatisation Python dans le dépôt pour 2G. |

**Position du plan (honnête)** : un tableau **complexe, mal scanné, ou en image bitmap dans le PDF** ne sera **pas** magiquement « réparé » à 100 % — le livrable acceptable est : **(a)** GFM propre, **(b)** absence volontaire, **(c)** jamais paragraphe-bouillie.

### 2.4 Pilotes 2G.1 (sélection)

- Choisir **3** fiches à partir du **rapport 2G.0** : **1** scorée **cassé**, **1** **moyen**, **1** **propre** (dès qu’il existe un exemplaire propre post-regénération partielle, sinon ajuster).
- Exemples historiques (avant 2G) : beaucoup de tableaux — `police-judiciaire-statut`, `nullites-procedure` ; articles denses, listes — à caler sur l’audit.

Ces **3** fiches servent de **filet de régression** (e2e snapshot visuel post-2G.1, voir section 6).

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

### 3.10 Section « Articles clés » — **décision** : composant React

- **`<FicheArticlesCles articles={data.articlesCles} />`** dans `fondamentaux/[slug]/page.tsx` : **après** le `<h1>` (titre = `data.title`), **avant** `<MarkdownArticle>`. Pastilles `font-ij-mono`, `bg-ij-surface-2`, `text-ij-accent`, en ligne, espacées. **Pas** dans le markdown.
- `articlesCles` : exactement **5** chaînes (voir §4) ; rendu : libellé type « **Articles clés** » + pastilles (sans symbole § en UI, conformément aux règles produit).

### 3.11 Doublon H1 — **décision** : un seul `<h1>`, body sans `#` en tête

- Titre de page = **un seul** `<h1>` depuis `data.title` (page). Le pipeline de régénération **strip** la première ligne du body si c’est un `# ...`. Test e2e : **aucune** fiche avec **`#` en première ligne** du corps après 2G.2.

---

## 4. Spécification frontmatter

### 4.1 Champs conservés (2F / existants)

- `title`, `description` (la 2G devra **alléger** `description` : 1–2 phrases max, non concat OCR)
- `tags`
- `partie`, `chapitre`, `loi2025`, `derniereMiseAJour` (ou équivalent) — **inchangés en sémantique** sauf ajustement doc

### 4.2 Champ : `articlesCles` (seul retenu pour les 5 « phares »)

- Type : `articlesCles: string[]` — **exactement 5** entrées, normalisées (ex. `art. 18 CPP`, `art. R. 15-18 CPP`).
- Règle de remplissage (2G.2) : **extraction** par regex sur le **corps** + **comptage** + **Top 5** + **liste noire** d’exclusion (génériques) — **figée en 2G.1** sur les pilotes.

### 4.3 Remplacement de `articlesCites` (dépréciation)

- **Suppression** de tout `articlesCites` du frontmatter. **Migration** : script one-shot en **2G.2** (voir §0). Aucune cohabitation long terme.

---

## 5. Découpage en vagues

| Vague | Contenu | Sortie |
|--------|---------|--------|
| **2G.0** | Rapport HTML enrichi (§0.1) sur **tout** `content/cours/*.md` ; génère `2g0-rapport-corpus.html` via `node scripts/audit-2g0-corpus.mjs`. Aucun changement de contenu. | `docs/audits/2g0-rapport-corpus.html` |
| **2G.1** | Refonte pipeline (pdfjs-dist + clustering) + **3 pilotes** + snapshots e2e ; liste noire articles ; 2G.3 **minimale** seulement si besoin d’afficher tableaux. | 3 fiches + tests |
| **2G.2** | Régénération du **reste** des fiches + **migration** `articlesCites` → `articlesCles` (script) + **strip** H1 body partout. | N/N fiches |
| **2G.3** | `MarkdownArticle` + intégration `FicheArticlesCles` sur la page fiche. | UI stable |
| **2G.4** | Nettoyage `public/fondamentaux/*.jpg` orphelins + vérif zéro `![](` + entrée **TECH_DEBT** (Mermaid / SVG schémas). | Repo propre + dette tracée |

---

## 6. Tests obligatoires (Definition of Done)

- `npm run lint`, `npx tsc --noEmit`, `npx vitest run`, `npm run build` : **verts**.
- **E2E existants** : non régression (y compris 2F.2 301, hub fondamentaux).
- **E2E (2G.1+)** : snapshots visuels **des 3 fiches pilotes** ; `expect(page.locator('article').filter(...))` : **0** `img` dans le contenu fiche.
- **E2E (2G.2+)** : sur l’échantillon ou tout le hub — **aucun** `content` markdown ne commence par une ligne `#` (assertion contenu / build check selon le plus fiable) ; règle alignée sur strip H1.

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

## 9. Synthèse : arbitrages **clos** (réf. §0)

Les cinq points sont actés (Node + pdfjs-dist ; H1 page + strip body ; `FicheArticlesCles` ; `articlesCles` only ; zéro image + dette SVG/Mermaid en 2G.4 / `TECH_DEBT`).

**Prochaine étape** : exécuter **2G.0** (rapport) → **validation** des 3 **pilotes** 2G.1 → refonte pipeline (hors scope de ce document jusqu’au feu vert par vague).

**Fin du plan (version validée sur le fond).**
