# Phase 2F — Intégration contenu Fondamentaux (synthèse session juin 2026)

**Statut** : plan de travail — aucune implémentation ni extraction réalisée dans le cadre de sa rédaction.  
**Document source utilisateur** : variante `FONDAMENTAUX.pdf` (ZIP déguisé, 74 pages JPEG + 74 textes OCR).  
**Mise à jour cible contenu** : 01/12/2025 (lois 2025-532, 2025-622, 2025-623, 2025-1057).  
**Jalon parent** : pause **Phase 2D.2.a** le temps d’exécuter 2F ; reprise 2D.2.a après clôture 2F (voir §9).

**Versionnement** : à ajouter et committer dans le dépôt dès création, conformément à `.cursor/rules/plans-versioning.mdc`.

**Décisions tranchées (2026-04-25)** :

- **Suppression des 17 fiches actuelles** : le contenu markdown existant est **retiré intégralement** ; le nouveau document de synthèse remplace tout le corpus actuel. Suppression des fichiers en **fin de phase (2F.4)**, une fois les 46 fiches en place et validées.
- **Option A** (46 fiches = 46 chapitres) **confirmée** ; slugs **sémantiques purs** (kebab-case, **sans** préfixe numérique dans l’URL). L’ordre d’affichage est porté par le frontmatter `chapitre: N` (1–46), pas par le slug.
- **Redirections 301** (option retenue) : toute ancienne URL `/fondamentaux/{ancien-slug}` → **`/fondamentaux`** (hub). Détails : voir [§9](#9-politique-de-redirections-http-301).
- **2F.1** scindé en **2F.1.a** (échantillon 3 chapitres) et **2F.1.b** (43 chapitres restants après validation).
- **2F.0** (préliminaire) : audit d’impact du tableau **`FICHES` (107 entrées)** — rapport : [Annexe A — Vague 2F.0](#annexe-a--vague-20--analyse-dimpact-fichés).

---

## §1. Inventaire du document source

### Disponibilité dans le dépôt

- Aucun fichier nommé `FONDAMENTAUX.pdf` n’est présent à la racine du dépôt local au moment de l’analyse. La référence fournie par l’utilisateur (`/mnt/project/FONDAMENTAUX.pdf` côté environnement cloud, ou `c:\Users\lenov\Downloads\FONDAMENTAUX.pdf` côté poste) doit être **copiée volontairement** dans le repo (emplacement proposé en implémentation future : `content/_sources/fondamentaux-2026/` ou `docs/_private/` selon politique d’exclusion éventuelle — à trancher), **ou** rester hors dépôt avec chemin documenté.
- Tant que l’archive n’est pas versionnée, l’extraction en CI ou sur une autre machine exigera la même fourniture.

### Méthode d’extraction (fichier = ZIP, extension .pdf)

- Outil : **`unzip`** (ligne de commande, natif sur macOS/Linux ; sur Windows, équivalent `tar -xf` si l’archive est reconnue, ou 7-Zip / PowerShell `Expand-Archive` selon le format réel du conteneur).
- Contenu attendu : **74 images JPEG** (une par page) + **74 fichiers texte** type `1.txt` … `74.txt` (OCR).
- Cohérence : **1 image + 1 .txt** par page ; le plan du document (pages 2-3) sert d’**ancrage structurel** pour découper en chapitres (46) et parties (6).

### Volume

- **~21 000 mots** de texte structuré (après nettoyage OCR, ordre de grandeur).  
- **6 parties**, **46 chapitres** (alignés sur l’utilisateur : Partie I chap. 1-4, II 5-9, III 10-16, IV 17-26, V 27-43, VI 44-46).  
- Fiches pédagogiques annoncées par l’auteur : **+100 tableaux**, **+50 encadrés**, **8 schémas** (repris visuellement sur les JPEG ; le texte OCR seul ne suffit pas pour tout reconstituer — voir §4).

---

## §2. Analyse du contenu actuel à remplacer

**Décision** : **suppression complète** des 17 fiches listées ci-dessous ; aucun contenu de l’ancien corpus n’est conservé. Les liens pédagogiques, dashboard et mappages qui pointaient vers ces slugs doivent être **réalignés** (nouvelles cibles) ou tomber sur le hub via **301** (voir §10) jusqu’à traitement en **2F.2 / 2F.2.5**.

### 2.1 Hub `/fondamentaux` et liste des fiches « réelles » (Markdown) — listées pour suppression

Le hub utilise `getCourseSummaries()` (`src/lib/content/courses.ts`) qui parcourt **uniquement** `content/cours/*.md`. Il n’existe **pas** de `src/data/cours-data.ts` : la source de vérité des URLs publiques est le dossier **`content/cours/`**.

**Liste exhaustive des 17 fiches markdown actuelles** (fichier → slug URL = nom de fichier en minuscules) :

| Fichier | Slug `/fondamentaux/[slug]` |
|---------|------------------------------|
| `auditions.md` | `auditions` |
| `cadres-enquete.md` | `cadres-enquete` |
| `controle-identite.md` | `controle-identite` |
| `crimes-biens.md` | `crimes-biens` |
| `crimes-personnes.md` | `crimes-personnes` |
| `fouille-vehicule.md` | `fouille-vehicule` |
| `garde-a-vue.md` | `garde-a-vue` |
| `instruction-mandats.md` | `instruction-mandats` |
| `juridictions-jugement.md` | `juridictions-jugement` |
| `libertes-publiques.md` | `libertes-publiques` |
| `loi-penale-responsabilite.md` | `loi-penale-responsabilite` |
| `mineurs-cjpm.md` | `mineurs-cjpm` |
| `nullites-procedure.md` | `nullites-procedure` |
| `perquisition.md` | `perquisition` |
| `police-judiciaire-statut.md` | `police-judiciaire-statut` |
| `saisies-scelles.md` | `saisies-scelles` |
| `sanction-penale.md` | `sanction-penale` |

- **Rendu** : `src/app/fondamentaux/[slug]/page.tsx` charge le markdown et affiche le corps via **`MarkdownArticle`** (`src/components/content/MarkdownArticle.tsx`).  
- **Composant liste** : **`CoursFichesListClient`** — rechercheTexte sur `title` + `tags` du frontmatter, pas sur le corps entier (la recherche globale produit, elle, un index sur le contenu — voir §7).

### 2.2 Données TypeScript `FICHES` (hors markdown)

Les modules `src/data/fondamentaux-fiches-part1.ts` … `part4.ts` et `fondamentaux-from-chapters.ts` agrègent **`FICHES`** (`src/data/fondamentaux-fiches.ts`) : **107 entrées** au total (39 fiches « statiques » + **68** fiches issues des leçons `lecons-chapters`), utilisées pour **grilles de couverture fascicules**, liens pédagogiques, parcours, etc. — **ce n’est pas** ce qui alimente la liste du hub ni les pages détail markdown.

Le découplage concret (runtime vs données mortes) est détaillé en **Annexe A**. En synthèse : les **liens vers les 17 slugs** à risque 404 se trouvent surtout dans **données TS** (enquêtes, révision, parcours, `fascicule-cours-map`) et **non** via `FICHES` ; une vague **2F.2.5** reste possible pour remettre en cohérence `FICHES` / leçons / canonical map **si** l’on conserve ce graphe.

### 2.3 Format actuel des fiches (frontmatter + corps)

- **Frontmatter** YAML : au minimum `title`, `tags` (tableau de chaînes), souvent `description` pour le SEO.  
- **Corps** : Markdown (titres, tableaux GFM, citations, listes) ; pas de format « fiche structurée » JSON dans le hub.

### 2.4 SEO et `sitemap`

- Métadonnées par fiche : `generateMetadata` lit `title` et `description` depuis le frontmatter (`src/app/fondamentaux/[slug]/page.tsx`).  
- `src/app/sitemap.ts` génère une entrée par basename `content/cours/*.md` pour `/fondamentaux/{slug}`. **Tout remplacement de slugs** implique mises à jour sitemap, `canonical`, liens internes (footer, enquêtes, onboarding, tarifs, etc.) et **risque 404** sur les anciennes URLs — stratégie de **redirections 301** ou table de **aliases** à prévoir en vague 2F.2/2F.3 (à confirmer).

---

## §3. Stratégie de mapping (options A / B / C) — **Option A retenue**

| Critère | **Option A — 1 fiche = 1 chapitre (46)** | **Option B — 1 fiche = 1 partie (6)** | **Option C — 6 hubs partie + 46 sous-fiches** |
|--------|------------------------------------------|----------------------------------------|-----------------------------------------------|
| URLs | Ex. slugs sémantiques (voir [Annexe B](#annexe-b--mapping-officiel-des-46-chapitres-slugs--titres)) | Ex. `/fondamentaux/partie-iii-juridictionnel` | Ex. `/fondamentaux/iii/chap-12` (segment dynamique) |
| Navigabilité | Bonne granularité, liste longue sur le hub | Peu d’entrées, **pavés** très longs | Meilleure hiérarchie, refonte routing plus lourde |
| Recherche / SEO | 46 cibles indexables, titres fins | 6 pages « fourre-tout » | Intermédiaire |

**Décision** : **Option A (46 fiches, 1:1 chapitre)**. Option C : uniquement en sous-fonctionnalité (filtre par `partie` sur le hub) si besoin ; pas de refonte d’URL à deux segments pour l’instant.

**Convention de slugs (confirmée)** :

- **Sémantique pur** : `kebab-case`, **aucun** préfixe `01-` ni `chap-12-` dans l’URL.
- **Numéro de chapitre** : **uniquement** dans le frontmatter `chapitre: N` (1–46) ; le tri du hub l’exploite (implémentation en 2F.2 / 2F.3).
- Fichier de vérité : un mapping central (ex. `src/data/fondamentaux-chapitres.json` ou équivalent) aligné sur **Annexe B**, validé par l’utilisateur avant 2F.1.a.

---

## §4. Workflow d’extraction et conversion

### 4.1 Texte OCR → Markdown propre

- **Entrée** : les 74 `.txt` (ou script qui concatène / découpe selon marqueurs de chapitre identifiés dans le plan p.2-3 / titres en gras sur les images).  
- **Pipeline proposé** (implémentation future) :  
  1. Script Node ou Python : lecture des fichiers, **normalisation Unicode**, fusion des sauts de ligne parasites.  
  2. **Détection des titres** (regex `^\d+(\.\d+)*\s`, `#` implicites, mots-clés « Chapitre », etc.) + mapping vers `#` / `##` / `###`.  
  3. **Nettoyage OCR** : suppression des **pieds de page répétés**, numéros de page isolés, caractères « confus » (l/I/1, O/0), espaces insécables.  
  4. Génération d’un **fichier .md par chapitre** dans `content/cours/` (ou `content/fondamentaux/` si le code est étendu pour lire un second dossier — à trancher : préférer **étendre `listMarkdownBasenames`** + chemins, ou conserver un seul répertoire pour simplicité).

### 4.2 Tableaux et encadrés

- Tableaux reconnus dans l’OCR : souvent **cassés** ; prévoir recomposition manuelle ciblée ou post-traitement sur patterns `|` et lignes.  
- Encadrés : transformer en `> **…**` ou composants **blockquote** thémés (si le design l’impose) — `MarkdownArticle` doit supporter le sous-ensemble choisi (tester GFM + extensions).

### 4.3 Schémas et images (JPEG de page)

- **Insertion directe** : placer des copies optimisées dans `public/fondamentaux/…` (ou `content/cours/assets/`) et référencer en `![](…)` — **recommandé** pour fidélité visuelle, si droits/usage le permettent.  
- **Reconstruction** : Mermaid, HTML, ou refonte en SVG seulement si l’on veut du texte indexable / thème clair-sombre unifié — **coût élevé** pour 8 schémas + nombreux tableaux.  
- **Stratégie pragmatique** : images pour schémas et tableaux **complexes** ; markdown natif pour tableaux **simples** et reproductibles proprement depuis le texte.

### 4.4 Conservation de la cohérence éditoriale

- Hiérarchie de titres alignée sur le plan (Partie / Chapitre / sous-sections 1.1, 1.2).  
- **Articles CPP/CP** : normaliser l’appellation (`art. 53 CPP`, liens optionnels vers Légifrance en vague ultérieure).  
- **Listes** : préserver le sens ; les listes OCR fragmentées en paragraphes courts à recoller.

---

## §5. Métadonnées des fiches (cible)

Pour chaque fiche générée, prévoir (frontmatter + éventuellement source TS pour filtres avancés) :

| Champ | Description |
|-------|-------------|
| `title` | Titre chapitre (affichage + `<title>`) |
| `description` | Résumé ou extrait 1-2 phrases (meta description) |
| `tags` | au minimum un axe pédago : `procédure` / `pénal général` / `pénal spécial` / `oral` / `2025` … |
| `partie` | entier 1-6 (nouveau champ — support frontmatter personnalisé, à lire côté hub si on filtre) |
| `chapitre` | entier 1-46 (ordre d’affichage) |
| `derniereMiseAJour` | `2025-12-01` (ISO) |
| `loi2025` | booléen ou tag pour badge « Mise à jour 2025 » |
| `articlesCites` | liste optionnelle en YAML — extraction semi-auto (regex `art\.\s*\d+`, références CPP/CP) + relecture |

Le type `CourseSummary` actuel n’inclut que `slug`, `title`, `tags` : **l’étape 2F.3** peut étendre le typage et `getCourseSummaries()` pour exposer `partie`, `chapitre`, `loi2025` sans casser l’existant (champs optionnels).

---

## §6. Découpage en vagues (décisions intégrées)

| Vague | Contenu | Critère de sortie |
|-------|---------|-------------------|
| **2F.0** | **Analyse d’impact `FICHES` (107 entrées)** — imports, runtime, couplage aux 17 slugs ; diagnostic : [Annexe A](#annexe-a--vague-20--analyse-dimpact-fichés). Ne tranche pas la stratégie ; informe la suite (2F.2.5 optionnelle). | Rapport validé par l’utilisateur |
| **2F.1.a** | Extraction `unzip`, pipeline OCR → MD ; **3 chapitres pilotes** (1 procédure, 1 DPG, 1 DPS — proposés : `enquete-flagrance`, `responsabilite-penale-principes`, `viol-agressions-sexuelles` ou équivalents issus d’Annexe B) dans `content/cours/`, frontmatter complet. | Validation **utilisateur** qualité OCR, tableaux, schémas, titres |
| **2F.1.b** | Génération des **43** chapitres restants ; correctifs pipeline issus de 2F.1.a. | 46 `.md` présents, cohérents avec Annexe B (slugs figés) |
| **2F.2** | `getCourseSummaries` (tri `chapitre`), `sitemap`, `local-search` ; **redirections 301** (§10) ; mise à jour des **liens internes** vers les **nouveaux** slugs là où l’on veut du deep-link (sinon hub). | Pas de 404 sur parcours critiques ; 301 actives pour les 17 anciennes URLs |
| **2F.2.5** (optionnelle) | Si le diagnostic 2F0 + produit impose de **reconnecter** le graphe `FICHES` / leçons / fascicules aux 46 slugs : suppression des refs obsolètes, ajout des refs nouvelles. | Cohérence métadonnées / couverture fascicules |
| **2F.3** | UI : ordre par `chapitre`, filtre par `partie`, badge **Mise à jour 2025** ; ajustements `CoursFichesListClient` / hub. | UX validée |
| **2F.4** | **Suppression définitive** des **17** fichiers markdown listés en §2.1 (après validation des 46 et bascule de trafic) ; nettoyage des **références code** aux anciens slugs ; e2e / smoke verts. | Ancien corpus absent de `content/cours/` ; liens internes pointent vers nouveaux slugs ou hub |

**Ordre** : 2F.0 → 2F.1.a → validation → 2F.1.b → 2F.2 (+ 2F.2.5 si retenu) → 2F.3 → **2F.4** (suppression des 17 en **dernier**).

---

## §7. Risques

1. **Performance** : 46 fiches denses + images → pages SSR/SSG lourdes ; mitiger (images `next/image`, lazy loading dans `MarkdownArticle` si besoin, pas de string markdown gigantesque inutile en mémoire côté client).  
2. **Qualité OCR** : relecture humaine **indispensable** sur articles, chiffres, et références législatives.  
3. **Remplacement complet** : plus de cohabitation avec l’ancienne nomenclature en ligne ; l’enjeu est la **mise à jour des liens** (dashboard, enquêtes, révision) et des **301** le temps de la bascule, pas de conservation parallèle des 17 fiches.  
4. **Schémas / tableaux** : perte pédagogique si seule l’OCR textuelle est publiée ; **prévoir budget temps** image + légendes.  
5. **Recherche** : le hub filtre sur titre+tags ; le **corps** n’est pas indexé sur la page hub — la **recherche globale** (`local-search`) lit bien le markdown ; vérifier après ajout de volume.  
6. **Contraintes de dépôt** : poids des JPEG dans `public/` — impact repo et build Vercel (limites de taille).

---

## §8. Tests et validation

- **E2E** : étendre ou adapter `e2e/fondamentaux.spec.ts` — au minimum **hub 200**, **échantillon de slugs** (pas forcément 46 tests distincts : paramétrage à partir d’une liste attendue).  
- **Smoke** (`e2e/smoke.spec.ts`) : conserver **vert** (route `/fondamentaux` déjà couverte).  
- **Sitemap** : génération build incluant les nouveaux slugs.  
- **Contenu** : le pilote est porté par **2F.1.a** (3 chapitres) avant le batch **2F.1.b** (43 chapitres).  
- **A11y** : les tests axe existants sur le hub restent valides ; re-vérifier si la structure de titres des nouvelles fiches introduit des `h1` multiples (MarkdownArticle / shell).

---

## §9. Politique de redirections HTTP 301

**Décision (option B)** : toute ancienne URL **`/fondamentaux/{slug-ancien}`** parmi les **17** slugs historiques redirige en **301** vers **`/fondamentaux`** (hub). Objectifs : conserver le **domaine SEO** (pas de soft-404), ramener l’utilisateur sur la liste à jour ; les nouvelles fiches sont découvertes depuis le hub.

**Implémentation prévue** : `next.config.js` (`redirects`) **ou** `middleware.ts` Next.js (liste statique des 17 chemins source). À activer en **2F.2** en même temps que la publication des 46 slugs (ou dès que les anciennes pages sont retirées), et maintenir jusqu’à décision de retirer les 301 (optionnel, longue traîne SEO).

**Liste des 17 sources** : mêmes slugs que le tableau §2.1 (`auditions`, `cadres-enquete`, … `sanction-penale`).

---

## §10. Métadonnées de fin de plan

- **ID plan** : `phase_2f_integration_fondamentaux_9d2e7f4a`  
- **Date de rédaction** : 2026-04-25 ; **révision** : 2026-04-25 (décisions suppression, slugs, vagues, 301).  
- **Prochaine étape** : validation **Annexe B** (titres + slugs) par l’utilisateur ; lancement **2F.0** documenté ; extraction **2F.1.a** après fourniture ZIP.  
- **Reprise** : clôturer 2F avant de **reprendre la Phase 2D.2.a**.

---

## Annexe A — Vague 2F.0 : analyse d’impact `FICHES` (107 entrées)

### A.1 Commandes équivalentes (résultat au 2026-04-25)

Recherches dans `src/` (outils type `rg` / grep du dépôt) :

| Motif | Résultat |
|-------|----------|
| `from '@/data/fondamentaux-fiches'` | `fondamentaux-coverage.ts`, `fondamentaux-by-module.ts` |
| `from '@/data/fondamentaux-fiches-part` | **Aucun** (les `part1`…`part4` sont importés **relativement** depuis `fondamentaux-fiches.ts` uniquement). |
| `from '@/data/fondamentaux-from-chapters` | **Aucun** (import relatif depuis `fondamentaux-fiches.ts` uniquement). |
| `FICHES` (hors tests) | `fondamentaux-fiches.ts` (définition), `fondamentaux-coverage.ts`, `fondamentaux-by-module.ts`, `fondamentaux-data.ts` (réexport). |

**Aucun** fichier sous `src/app/`, `src/components/`, `src/features/`, etc. n’importe `fondamentaux-fiches` ni `FICHES` directement, sauf **via** les deux modules `coverage` / `by-module` — eux-mêmes **jamais importés** ailleurs dans le dépôt (vérification par recherche d’`import` de chemins ou de symboles `getFondamentauxCoverageRows`, `getFondamentauxLinksForCourseModule` : **0 consommateur** hors définition).

**`fondamentaux-data.ts`** (baril `FICHES` + types) : **aucun** `import` d’un autre module applicatif repéré (le fichier sert d’**API export** sans usage actif détectable).

**Conséquence** : le **tableau `FICHES` 107** est **aussi découplé** du runtime UI que l’on peut l’être dans un build « tree-shake » : il constitue surtout un **cimetière de graphe éditorial** (données + génération `leons-chapters` → 68 fiches) **sans** alimenter aujourd’hui le hub, la liste, ni une page publique vérifiée.

### A.2 Par import / fichier

| Fichier | Rôle | Monté en runtime (UI) ? | Impact lié **aux 17 slugs** markdown supprimés |
|---------|------|------------------------|-----------------------------------------------|
| `fondamentaux-coverage.ts` | Agrège `FICHES` par fascicule pour grille « couverture » | **Non** (aucun import entrant) | Aucun direct ; données potentiellement obsolètes. |
| `fondamentaux-by-module.ts` | `getFondamentauxLinksForCourseModule` → liens `href: /fondamentaux/${f.id}` | **Non** (aucun import entrant) | Si jamais réutilisé : attention **IDs** type `L101` vs slugs réels (incohérence historique) ; indépendant des 17 `.md` **sauf** les entrées `part` qui utilisent `cadres-enquete`, `garde-a-vue`, etc. |
| `fondamentaux-display-order.ts` | Utilitaires de tri / groupement de `Fiche` | **Non** (aucun import entrant) | Aucun. |
| `fondamentaux-fiches.ts` + `part*` + `from-chapters` | Source des 107 fiches | **Via chaîne morte** ci-dessus | Couplage **faible** au live ; refonte 2F optionnelle : supprimer le système (scénario C) **ou** aligner (2F.2.5). |

### A.3 Où le **couplage réel** aux 17 slugs vit (hors `FICHES`)

Fichiers **effectivement** utilisés en navigation / runtime qui référencent des **URLs** ` /fondamentaux/{slug}` (échantillon non exhaustif : recherche ciblée ` /fondamentaux/` dans `src/`) :

| Fichier | Usage |
|---------|--------|
| `lib/content/fascicule-cours-map.ts` | `getCoursPathForFascicule` — utilisé par **`src/app/(account)/dashboard/page.tsx`** : les cartes thème renvoient vers un **slug** parmi les 17 (mappage F01–F15). **Fort impact** si les slugs disparaissent sans remplacement. |
| `data/enquetes-data.ts` | Liens pédagogiques **multi-slugs** (ex. `crimes-personnes`, `garde-a-vue`, `cadres-enquete`). |
| `data/revision-themes.ts`, `data/cours-revision-fil.ts` | Règles de révision vers fiches. |
| `components/lessons/ParcoursOpjPedagogyBlock.tsx` | Raccourcis GAV, perquisition, audition. |
| `components/lessons/fiches/AuditionLessonBlocks.tsx` | Lien GAV. |
| `data/fondamentaux-canonical-map.ts` | Renvois leçon → **IDs canoniques** `garde-a-vue`, `controle-identite` (L301…L1101). **À mettre en phase** avec 46 slugs. |

**`local-search.ts`** : pas de liste statique des 17 ; la recherche indexe le **contenu** des `.md` — impact par **changement de fichiers** plutôt que par `FICHES`.

**Quiz** : pas d’analyse `FICHES` directe ici ; les **href** de quiz pointent ailleurs (paramètres `f=fxx` typiquement).

### A.4 Positionnement des trois scénarios (sans trancher)

| Scénario | Diagnostic factuel 2026-04-25 |
|----------|------------------------------|
| **A — FICHES fortement couplé, 2F.2.5 nécessaire** | **Sous-confirmé** pour le **hub** : `FICHES` n’est **pas** la colonne vertébrale de `/fondamentaux` aujourd’hui. En revanche, **les liens TS énumérés en A.3** sont **coupés** aux 17 slugs — une vague **2F.2.5**-like reste **pertinente** pour **eux** (re-map vers les 46 **ou** hub), indépendamment de la décision d’**effacer** ou **rebrancher** `FICHES`. |
| **B — FICHES partiel** : enlever les 17 ref sans 46 | Possible pour **FICHES** (peu d’effet user si modules morts) ; **impossible** pour **dashboard + enquêtes + parcours** sans **301** (prévu) **et** mises à jour ciblées, sinon liens 404. |
| **C — FICHES non utilisé, suppression complète (comme hub Phase 2D)** | **Proche** pour l’**arbre `FICHES` seul** (pas d’import app). Nécessite quand même un **pruning** (imports cassés, `lecons-chapters` / canonical map) et une **décision produit** sur le **parcours** existant. |

*L’utilisateur tranche* entre maintien d’un **méta-graphe** 46 fiches, **abandon** de `FICHES`, ou **refactor** partiel (2F.2.5).

---

## Annexe B — Mapping **officiel** des 46 chapitres (slugs + titres)

**Légende** : titres et slugs **proposés** d’après la structure « 6 parties / 46 chapitres » (document juin 2026) et le programme type OPJ. **Ajustement obligatoire** : les libellés exacts de **pages 2–3** de ton PDF (plan détaillé) ; les slugs de la **colonne 3** doivent rester stables, courts et uniques. Les **46 slugs doivent être disjoints** des **17** slugs listés en §2.1 (redirections 301 vers le hub) : une collision provoquerait une 301 indésirable vers le hub. Exemple : pas de `garde-a-vue` ni `juridictions-jugement` pour les chapitres 5 / 14 — ici `regime-garde-a-vue` et `cours-repressifs-jugement`. Les exemples explicites (ch.1, 12, 31) sont respectés.

| Ch. | Titre court (proposé) | Slug proposé | Part. |
|-----|------------------------|-------------|--------|
| 1 | L’enquête de flagrance | `enquete-flagrance` | I |
| 2 | L’enquête préliminaire | `enquete-preliminaire` | I |
| 3 | L’information judiciaire | `information-judiciaire` | I |
| 4 | Acteurs, direction et contrôle de la police judiciaire | `acteurs-direction-police-judiciaire` | I |
| 5 | La garde à vue | `regime-garde-a-vue` | II |
| 6 | Perquisitions, visites et saisies | `perquisitions-saisies` | II |
| 7 | Auditions, auditions de mineurs et expertises | `auditions-expertises` | II |
| 8 | Identité, rétention, interpellation | `identite-retention-interpellation` | II |
| 9 | Réquisition, commission rogatoire et actes d’enquête | `requisition-commission-rogatoire` | II |
| 10 | Action publique, opportunité et politique pénale | `action-publique-opportunite` | III |
| 11 | Parquet, instruction : cadre général | `parquet-instruction` | III |
| 12 | Juge des libertés, mandats, détention provisoire | `jld-mandats` | III |
| 13 | Mise en examen et juge d’instruction | `mise-en-examen-instruction` | III |
| 14 | Renvoi, jugement, juridictions répressives | `cours-repressifs-jugement` | III |
| 15 | Cour d’assises, appel, procédures particulières | `assises-appel` | III |
| 16 | Exécution des peines et juge de l’application | `execution-peines-jap` | III |
| 17 | Sources et principes du droit pénal | `droit-penal-sources-principes` | IV |
| 18 | Classification des infractions et des peines | `classification-infractions-peines` | IV |
| 19 | Éléments constitutifs et qualification | `elements-constitutifs-qualification` | IV |
| 20 | Absence d’infraction, causes d’irresponsabilité | `absence-infraction-irresponsabilite` | IV |
| 21 | Complicité, concours d’infractions | `complicite-concours` | IV |
| 22 | Tentative, récidive, circonstances, causes d’aggravation | `tentative-recidive-circonstances` | IV |
| 23 | Personne morale, mineurs (DPG) | `personne-morale-mineurs` | IV |
| 24 | Peines, modes et individuation | `peines-modes-individuation` | IV |
| 25 | Prescription, amnistie, mesures d’extinction | `prescription-extinction` | IV |
| 26 | Règles communes, mesures sûreté, cadre général | `regles-communes-sanctions` | IV |
| 27 | Homicides et atteintes volontaires à la vie | `homicides-atteintes-vie` | V |
| 28 | Atteintes et violences involontaires | `violences-involontaires-integrite` | V |
| 29 | Enlèvement, séquestration, atteintes à la personne | `enlevement-sequestration` | V |
| 30 | Violences, menaces, harcèlement | `violences-menaces-harcelement` | V |
| 31 | Violences et agressions sexuelles | `viol-agressions-sexuelles` | V |
| 32 | Mineurs, famille, pornographie, proxénétisme | `mineurs-famille-moeurs` | V |
| 33 | Atteintes aux biens, destructions, recel | `atteintes-aux-biens` | V |
| 34 | Vol, escroquerie, abus de confiance, extorsion | `vols-escroquerie-extorsion` | V |
| 35 | Stupéfiants : usage, détention, courses | `stupefiants-usage` | V |
| 36 | Stupéfiants : trafic, blanchiment, bandes | `stupefiants-trafic` | V |
| 37 | Circulation routière | `delits-circulation-routiere` | V |
| 38 | Atteintes à l’autorité, actes d’enquête simulés, corruptions | `atteintes-autorite-corruption` | V |
| 39 | Atteintes à la nation, paix publique, terrorisme | `atteintes-nation-terrorisme` | V |
| 40 | Armes, matériels de guerre, munitions | `armes-materiel-guerre` | V |
| 41 | Prostitution, traite, atteintes à la dignité (hors c.31/32) | `traites-dignite-personne` | V |
| 42 | Infractions numériques et cyberdélinquance | `infractions-numeriques` | V |
| 43 | Blanchiment, infractions économiques, corruption transnationale | `blanchiment-infractions-economiques` | V |
| 44 | Actualisation législative 2025 | `actualisation-lois-2025` | VI |
| 45 | Outils, fiches-méthode et entraînement à l’oral | `outils-oral-entrainement` | VI |
| 46 | Dernière ligne droite, checklist examen (session 2026) | `entrainement-session-2026` | VI |

**Pilote 2F.1.a (recommandation Cursor)** : chapitre **1** (procédure) `enquete-flagrance` ; chapitre **19** (DPG) `elements-constitutifs-qualification` ; chapitre **31** (DPS) `viol-agressions-sexuelles` — sous réserve d’adéquation exacte au découpage du PDF.

---

*Fin du plan.*
