# Phase 2F — Intégration contenu Fondamentaux (synthèse session juin 2026)

**Statut** : plan de travail — aucune implémentation ni extraction réalisée dans le cadre de sa rédaction.  
**Document source utilisateur** : variante `FONDAMENTAUX.pdf` (ZIP déguisé, 74 pages JPEG + 74 textes OCR).  
**Mise à jour cible contenu** : 01/12/2025 (lois 2025-532, 2025-622, 2025-623, 2025-1057).  
**Jalon parent** : pause **Phase 2D.2.a** le temps d’exécuter 2F ; reprise 2D.2.a après clôture 2F (voir §10).

**Versionnement** : à ajouter et committer dans le dépôt dès création, conformément à `.cursor/rules/plans-versioning.mdc`.

**Décisions tranchées (2026-04-25, rév. 2026-04-25)** :

- **Suppression des 17 fiches** markdown actuelles : contenu retiré ; remplacement intégral par la synthèse. Suppression des fichiers en **2F.4** après bascule.
- **Option A** (46 chapitres = 46 fiches) ; slugs **sémantiques purs** (kebab-case) ; ordre d’affichage via `chapitre: N` dans le frontmatter.
- **2F.0** : audit `FICHES` — [Annexe A](#annexe-a--vague-20--analyse-dimpact-fichés--dettes-deep-links). La **dette opérationnelle** prioritaire est le **deep-linking** (fascicule-cours-map, enquêtes, révision, leçons, canonical), pas `FICHES` en runtime.
- **2F.0.5** : [audit deep-links internes](#vague-20-5--audit-deep-links) — livrable `docs/audits/deep-links-fondamentaux-2f.md` **produit en exécution de 2F.0.5**, **après validation du présent plan** (pas d’audit exhaustif rédigé avant cette validation, sauf cadrage ci-dessous).
- **2F.1** : **2F.1.a** (3 chapitres pilotes) puis **2F.1.b** (43 chapitres).
- **Slugs** : **aucun « préfixe défensif »** (ex. `regime-garde-a-vue`) ; si le **même** slug sert pour un chapitre neuf (thème proche) et l’**ancien** ficher, l’URL reste : **changement de contenu = édition normale, pas de 301** ([§9](#9-politique-de-redirections-http-301--301-sélective)).
- **301** : **sélectives** — **uniquement** pour slugs devenus **orphelins** (aucun chapitre des 46 ne réutilise l’ancien chemin) ; voir [Annexe C](#annexe-c--les-17-anciens-slugs--stratégie-réutilisation--orphelin--301).
- **Pilote 2F.1.a (DPG)** : chapitre **19** = titre attendu d’après le sommaire p.2–3 du PDF : **« Les causes d'irresponsabilité et d'atténuation »** (slug proposé `causes-irresponsabilite-attenuation`) — **à confirmer sur le document source** avant extraction ; n’est **pas** « Éléments constitutifs et qualification » si le sommaire tranche autrement (voir [§6 / Annexe B](#annexe-b--mapping-officiel-des-46-chapitres-slugs--titres)).

---

## §1. Inventaire du document source

### Disponibilité dans le dépôt

- Aucun fichier `FONDAMENTAUX.pdf` versionné par défaut ; fourniture utilisateur requise (emplacement e.g. `content/_sources/fondamentaux-2026/` — à trancher).

### Méthode d’extraction (ZIP)

- Outil : **`unzip`** (ou équivalents Windows). Contenu : **74 JPEG** + **74** `.txt` (OCR). Plan p.2–3 = référence de découpe (46 chapitres, 6 parties).

### Volume

- **~21 000 mots**, **+100** tableaux / **+50** encadrés / **8** schémas (pages images).

---

## §2. Analyse du contenu actuel à remplacer

**Décision** : suppression intégrale des **17** `.md` listés (§2.1) ; le corpus ne vit plus dans l’**URL** (réutilisée) ou tombe en **301** (orphelin) selon [Annexe C](#annexe-c--les-17-anciens-slugs--stratégie-réutilisation--orphelin--301). Les liens code (`enquetes-data`, `fascicule-cours-map`, etc.) sont remis en cohérence en **2F.0.5 (livrable)** + **2F.2**.

### 2.1 Liste des 17 fiches (fichier → slug)

| Fichier | Slug |
|---------|------|
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

**Rendu** : `MarkdownArticle` + hub `CoursFichesListClient`.

### 2.2 `FICHES` (107 entrées)

Détaillé en [Annexe A.1–A.4](#annexe-a--vague-20--analyse-dimpact-fichés--dettes-deep-links) ; le couplage **navigation** tient surtout au **fichier de fiches** `content/cours/*.md` + **données** listées en **A.5**, pas sur `FICHES`.

### 2.3 Format actuel

- Frontmatter YAML : `title`, `tags`, `description`…

### 2.4 SEO

- Sitemap = basenames `content/cours` ; 301 = voir [§9](#9-politique-de-redirections-http-301--301-sélective) (uniquement orphelins).

---

## §3. Option A retenue — slugs sémantiques

- 46 fiches, une URL par chapitre, **slugs sémantiques** ; numéro en `chapitre: N` uniquement.  
- **Réutilisation** d’un ancien slug autorisée sans 301 dès qu’un chapitre des 46 **reprend** l’URL (même sémantique) — **contenu remplacé** (décision produit 2026-04-25).  
- Fichier de vérité (mapping) aligné sur **Annexe B** + **Annexe C**.

---

## §4. Workflow d’extraction (rappel)

OCR → nettoyage → `.md` par chapitre ; tableaux / schémas (images ou GFM) ; [§4 détail inchangé logiquement].

---

## §5. Métadonnées fiches (cible)

`title`, `description`, `tags`, `partie` (1–6), `chapitre` (1–46), `derniereMiseAJour`, `loi2025`, `articlesCites` optionnel.

---

## §6. Découpage en vagues

| Vague | Contenu | Sortie / garde-fous |
|-------|---------|---------------------|
| **2F.0** | Analyse `FICHES` + rappel dette deep-links | [Annexe A](#annexe-a--vague-20--analyse-dimpact-fichés--dettes-deep-links) |
| **2F.0.5** | **Audit deep-links internes** : inventaire explicite de chaque `href` vers `/fondamentaux/{slug}` (et références aux 17 slugs) dans le dépôt ; pour chaque lien, cible cible 46 (slug nouveau) *ou* « orphelin → 301 ». Fichier **`docs/audits/deep-links-fondamentaux-2f.md`**. | **Livrable après validation de ce plan** ; validation utilisateur **avant** 2F.2 (mise à jour des sources couplées). **Ne pas exécuter** 2F.0.5 avant validation du plan révisé. |
| **2F.1.a** | Unzip, 3 chapitres pilotes en `content/cours/` : procédure `enquete-flagrance`, DPG **`causes-irresponsabilite-attenuation` (ch. 19 — titre à confirmer p.2–3)**, DPS `viol-agressions-sexuelles`. | Validation contenu + OCR + forme. |
| **2F.1.b** | 43 chapitres restants. | 46 fiches, Annexe B alignée. |
| **2F.2** | `getCourseSummaries`, tri `chapitre`, sitemap, `local-search` ; **mise à jour** `fascicule-cours-map`, `enquetes-data`, `revision-themes`, `cours-revision-fil`, leçons, `fondamentaux-canonical-map` d’après 2F.0.5 ; **301** uniquement pour orphelins (Annexe C) ; `next.config` / `middleware`. | Cohérence liens. |
| **2F.2.5** (opt.) | `FICHES` / leçons si l’on conserve le graphe. | Optionnel. |
| **2F.3** | Hub : filtres, badges 2025, etc. | UX. |
| **2F.4** | Retrait des 17 fichiers obsolètes (quand les 46 remplacent en prod + liens basculés). | Pas de 404 sur chemins ciblés. |

**Ordre** : 2F.0 → **2F.0.5** (après **validation** plan) → 2F.1.a → 2F.1.b → 2F.2 → 2F.3 → 2F.4.

### Vague 2F.0.5 — audit deep-links (cadrage)

- **Périmètre** : au minimum `lib/content/fascicule-cours-map.ts`, `data/enquetes-data.ts`, `data/revision-themes.ts`, `data/cours-revision-fil.ts`, `components/lessons/ParcoursOpjPedagogyBlock.tsx`, `components/lessons/fiches/AuditionLessonBlocks.tsx`, `data/fondamentaux-canonical-map.ts` ; **plus** tout fichier supplémentaire découvert par `rg '/fondamentaux/' src/` (ex. `EnqueteDetailClient` n’a que le hub, pas de slug ; **nota** : `ParcoursOpjPedagogyBlock` contient aujourd’hui `/fondamentaux/audition` — probable incohérence avec le slug `auditions` du fichier, à trancher en 2F.0.5 / 2F.2).
- **Livrable** : tableau (fichier, ligne, href actuel, slug cible parmi 46, commentaire) dans `docs/audits/deep-links-fondamentaux-2f.md`. Les cas **sans** chapitre dédié → marquer **orphelin** (301 vers `/fondamentaux` si politique retenue).

---

## §7. Risques (extraits)

- **Deep-links** : oubli de mise à jour d’un `href` = 404 (réduit par 301 ciblés sur orphelins + MAJ 2F.2).  
- **OCR** : relecture humaine.  
- **Pilote ch. 19** : vérifier le **titre exact** au PDF avant de figer le slug DPG (cf. [Annexe B ch. 19](#annexe-b--mapping-officiel-des-46-chapitres-slugs--titres)).

---

## §8. Tests (extraits)

E2E hub ; smoke ; sitemap ; alignement 301 sur orphelins.

---

## §9. Politique de redirections HTTP 301 (301 **sélective**)

**Principe (révision 2026-04-25)** : **pas** de 301 globale pour les 17 anciens slugs. Trois cas :

1. **Réutilisé** — l’**ancien** slug est repris par **un** chapitre des 46 (même chemin) : le **contenu** est remplacé ; **aucune 301** (l’URL reste valide). C’est l’**édition normale** d’une fiche.  
2. **Orphelin** — l’**ancien** slug **ne** correspond **à aucun** chapitre (aucune réutilisation) : **301** de `/fondamentaux/{slug-ancien}` → `/fondamentaux` (hub), *sauf* si l’on préfère une cible thématique explicite plus tard.  
3. **Nouveau** — slug des 46 **sans** prédécesseur dans les 17 : **aucune 301** (création nette).

**Implémentation** : liste de redirections = **sous-ensemble** des 17, limitée aux **orphelins** (voir **Annexe C**). `next.config.mjs` / `next.config.js` `redirects` ou `middleware` avec liste statique **des seuls orphelins**. Maintenir tant que l’on veut capturer d’anciens liens bookmarkés / externes.

**Liste des 301** = colonne *Orphelin* d’[Annexe C](#annexe-c--les-17-anciens-slugs--stratégie-réutilisation--orphelin--301) (8 slugs tels qu’actuellement retenus ; **à valider** à l’issue du mapping Annexe B si un slug 46 est ajusté).

---

## §10. Métadonnées de fin

- **ID** : `phase_2f_integration_fondamentaux_9d2e7f4a`  
- **Dernière révision** : 2026-04-25 (2F.0.5, slugs, 301, chap. 19, dette deep-links).  
- **Reprise** : 2D.2.a après 2F.

---

## Annexe A — Vague 2F.0 : analyse d’impact `FICHES` + **dette deep-links**

### A.1 Commandes (rappel, `src/`)

| Motif | Résultat |
|-------|----------|
| `from '@/data/fondamentaux-fiches'` | `fondamentaux-coverage.ts`, `fondamentaux-by-module.ts` |
| `fondamentaux-fiches-part` / `fondamentaux-from-chapters` (imports `@/`) | **Aucun** — imports **relatifs** depuis `fondamentaux-fiches.ts` seulement |
| `FICHES` (hors tests) | `fondamentaux-fiches.ts`, `fondamentaux-coverage.ts`, `fondamentaux-by-module.ts`, `fondamentaux-data.ts` |

**Aucun** `app` / `components` (hors `data/`) n’importe `fondamentaux-fiches` : **arbre `FICHES` quasi inerte** en UI.

### A.2–A.4 (résumé)

Fichiers `coverage`, `by-module`, `display-order` : **0 import** applicatif. Scénario **C** (suppression future du système) reste plausible côté code mort ; **2F.2.5** reste **optionnelle**.

### A.5 **Vraie dette : deep-links (6 + fichiers connexes)**

Ces ressources **pointent** vers des slugs concrets ou des IDs canoniques — **c’est** ce qui **casse** si les 17 pages disparaissent sans remplacement. **Runtime** = oui pour ceux consommés par des pages (dashboard, enquêtes, parcours, révision).

| Fichier | Rôle / runtime | Exemples de slugs ou mécanisme |
|--------|----------------|--------------------------------|
| `lib/content/fascicule-cours-map.ts` | **Oui** — `getCoursPathForFascicule` : `(account)/dashboard/page.tsx` → `/fondamentaux/{slug}` (F01–F15) | 17 slugs du mapping primaire/secondaire |
| `data/enquetes-data.ts` | **Oui** — liens « voir fiche » par enquête | `crimes-biens`, `cadres-enquete`, `garde-a-vue`, … |
| `data/revision-themes.ts` | **Oui** — étapes de révision | `cadres-enquete`, `garde-a-vue`, `crimes-personnes`, `crimes-biens` |
| `data/cours-revision-fil.ts` | **Oui** | `cadres-enquete`, `garde-a-vue`, `crimes-biens` |
| `components/lessons/ParcoursOpjPedagogyBlock.tsx` | **Oui** | `garde-a-vue`, `perquisition`, `audition` (sic — voir 2F.0.5) |
| `components/lessons/fiches/AuditionLessonBlocks.tsx` | **Oui** | `garde-a-vue` (témoin → hub) |
| `data/fondamentaux-canonical-map.ts` | Leçon → fiche (IDs `L301`… → `garde-a-vue`, `controle-identite`) | Mise en phase avec 46 + slugs cibles |
| *Autres* | Liens **hub seul** `/fondamentaux` (Footer, navigation, `EnqueteDetailClient`, etc.) : **hors** périmètre slug ; recherche `rg` complémentaire en 2F.0.5 | — |

**Conclusion** : l’**audit exhaustif 2F.0.5** (fichier `docs/audits/deep-links-fondamentaux-2f.md`) est le **gouverneur** de la **2F.2** (MAJ ciblée), **après** validation du plan. La **dette** n’est **pas** `FICHES` 107, mais ces **fichiers + canonical**.

---

## Annexe B — Mapping des 46 chapitres (slugs + titres)

**Slugs sémantiques purs** : réutilisation d’un **ancien** slug du tableau §2.1 dès qu’il désigne le **même thème** de chapitre (ex. ch.5 `garde-a-vue` — **pas** de variante `regime-…`).

**Chapitre 19 (DPG)** : selon le sommaire **p.2–3 du PDF** (à **relire** sur le source avant 2F.1.a) : **« Les causes d'irresponsabilité et d'atténuation »** ; slug proposé **`causes-irresponsabilite-attenuation`**. Le chapitre **« Éléments constitutifs et qualification »** est placé en **ch. 18** ici (ordre pédago courant) — **ajuster** si l’ordre du PDF diffère. **Confirmation** : le pilote 2F.1.a DPG cible le **ch. 19** (causes) **et non** un libellé « éléments constitutifs… » par erreur.

| Ch. | Titre (proposé) | Slug | Part. | Note réutil. ancien §2.1 |
|-----|-----------------|------|--------|-------------------------|
| 1 | L’enquête de flagrance | `enquete-flagrance` | I | *nouveau* |
| 2 | L’enquête préliminaire | `enquete-preliminaire` | I | *nouveau* |
| 3 | L’information judiciaire | `information-judiciaire` | I | *nouveau* |
| 4 | Acteurs, statut, direction et contrôle de la police judiciaire | `police-judiciaire-statut` | I | **réutilise** ancien |
| 5 | La garde à vue | `garde-a-vue` | II | **réutilise** ancien |
| 6 | Perquisitions, visites et saisies | `perquisition` | II | **réutilise** ancien (titre = périmètre élargi) |
| 7 | Auditions, mineurs, expertises | `auditions` | II | **réutilise** ancien |
| 8 | Identité, rétention, interpellation | `controle-identite` | II | **réutilise** ancien |
| 9 | Réquisition, commission rogatoire, actes d’enquête | `requisition-commission-rogatoire` | II | *nouveau* |
| 10 | Action publique, opportunité, politique pénale | `action-publique-opportunite` | III | *nouveau* |
| 11 | Parquet, instruction : cadre général | `parquet-instruction` | III | *nouveau* |
| 12 | JLD, détention provisoire, mandats de justice | `jld-mandats` | III | *nouveau* |
| 13 | Mise en examen, juge d’instruction | `mise-en-examen-instruction` | III | *nouveau* |
| 14 | Renvoi, jugement, courtes répressives | `juridictions-jugement` | III | **réutilise** ancien |
| 15 | Cour d’assises, appel, procédures spéciales | `assises-appel` | III | *nouveau* |
| 16 | Exécution des peines, JAP | `execution-peines-jap` | III | *nouveau* |
| 17 | Loi pénale, responsabilité (sources) | `loi-penale-responsabilite` | IV | **réutilise** ancien |
| 18 | L’infraction : éléments constitutifs et qualification | `elements-constitutifs-qualification` | IV | *nouveau* (titre ch. 18 — vér. PDF) |
| 19 | Les causes d'irresponsabilité et d'atténuation | `causes-irresponsabilite-attenuation` | IV | *nouveau* (pilote 2F.1.a DPG) |
| 20 | Complicité, coaction, concours d’infractions | `complicite-concours` | IV | *nouveau* |
| 21 | Tentative, récidive, circonstances, causes d’aggravation | `tentative-recidive-circonstances` | IV | *nouveau* |
| 22 | Personne morale, mineurs (général DPG) | `personne-morale-mineurs` | IV | *nouveau* |
| 23 | Peines : principes, modes, individuation | `peines-modes-individuation` | IV | *nouveau* |
| 24 | Sanction pénale, mesures et sûreté | `sanction-penale` | IV | **réutilise** ancien |
| 25 | Prescription, amnistie, extinction de l’action | `prescription-extinction` | IV | *nouveau* |
| 26 | Règles communes, cadre sanction | `regles-communes-sanctions` | IV | *nouveau* |
| 27 | Homicides, atteintes à la vie | `homicides-atteintes-vie` | V | *nouveau* |
| 28 | Atteintes involontaires, mise en danger | `violences-involontaires-integrite` | V | *nouveau* |
| 29 | Enlèvement, séquestration | `enlevement-sequestration` | V | *nouveau* |
| 30 | Violences, menaces, harcèlement | `violences-menaces-harcelement` | V | *nouveau* |
| 31 | Violences et agressions sexuelles | `viol-agressions-sexuelles` | V | *nouveau* (pilote DPS) |
| 32 | Mineurs, famille, mœurs, proxénétisme | `mineurs-cjpm` | V | **réutilise** ancien |
| 33 | Atteintes aux biens, recel, destructions | `atteintes-aux-biens` | V | *nouveau* |
| 34 | Vol, escroquerie, abus de confiance, extorsion | `vols-escroquerie-extorsion` | V | *nouveau* |
| 35 | Stupéfiants : usage, détention, courses | `stupefiants-usage` | V | *nouveau* |
| 36 | Stupéfiants : trafic, bandes, blanchiment | `stupefiants-trafic` | V | *nouveau* |
| 37 | Infractions à la circulation routière | `delits-circulation-routiere` | V | *nouveau* |
| 38 | Atteintes à l’autorité, corruptions, fausses | `atteintes-autorite-corruption` | V | *nouveau* |
| 39 | Atteintes à la nation, terrorisme, paix publique | `atteintes-nation-terrorisme` | V | *nouveau* |
| 40 | Armes, matériels de guerre, munitions | `armes-materiel-guerre` | V | *nouveau* |
| 41 | Traite, atteintes à la dignité, prostitution (hors c. 31/32) | `traites-dignite-personne` | V | *nouveau* |
| 42 | Infractions numériques, cyberdélinquance | `infractions-numeriques` | V | *nouveau* |
| 43 | Blanchiment, économie, DPS transversal | `blanchiment-infractions-economiques` | V | *nouveau* |
| 44 | Actualisation législative 2025 | `actualisation-lois-2025` | VI | *nouveau* |
| 45 | Outils, méthode et entraînement oral | `outils-oral-entrainement` | VI | *nouveau* |
| 46 | Dernière ligne droite, session 2026 | `entrainement-session-2026` | VI | *nouveau* |

---

## Annexe C — Les 17 anciens slugs : stratégie (réutilisé / orphelin / 301)

Aligné sur **Annexe B** (tels qu’actuellement retenus). **Réutilisé** = **pas de 301** (contenu neuf). **Orphelin** = **301** → `/fondamentaux` (sauf cible thématique explicite ultérieure). **Ajustement** : si l’on change un slug 46, recalculer orphelins / réutilisations.

| Ancien slug (§2.1) | Action | Chapitre / commentaire 46 (si pas orphelin) | 301 ? |
|--------------------|--------|---------------------------------------------|-------|
| `auditions` | **Réutilisé** | Ch. 7 `auditions` | Non |
| `cadres-enquete` | **Orphelin** (thème ventilé sur ch.1–3, pas d’ancre slug unique) | — | **Oui** |
| `controle-identite` | **Réutilisé** | Ch. 8 | Non |
| `crimes-biens` | **Orphelin** (remplacé sémantiquement par ex. ch. 33 `atteintes-aux-biens`, **slug différent**) | Mise à jour liens 2F.2 → `atteintes-aux-biens` plutôt que 301 si souhaité | **Oui** si aucune MAJ de lien (bookmark ancien) |
| `crimes-personnes` | **Orphelin** (découpé, pas de slug identique) | Idem, liens 2F.2 vers ch. 27+ | **Oui** |
| `fouille-vehicule` | **Orphelin** (intégré à ch. 37, slug `delits-circulation-routiere`) | | **Oui** |
| `garde-a-vue` | **Réutilisé** | Ch. 5 | Non |
| `instruction-mandats` | **Orphelin** (ch. 11/12/13 n’empruntent pas ce slug) | 2F.2 : cible `jld-mandats` ou `parquet-instruction` | **Oui** (bookmark) |
| `juridictions-jugement` | **Réutilisé** | Ch. 14 | Non |
| `libertes-publiques` | **Orphelin** (pas de 1:1 en Annexe B) | | **Oui** |
| `loi-penale-responsabilite` | **Réutilisé** | Ch. 17 | Non |
| `mineurs-cjpm` | **Réutilisé** | Ch. 32 | Non |
| `nullites-procedure` | **Orphelin** (aucun chapitre ne porte ce slug en B actuelle — **à réintroduire** si le PDF a un ch. nullités : sinon 301) | *À vérifier p.2–3* | **Oui** (tant qu’absent des 46) |
| `perquisition` | **Réutilisé** | Ch. 6 (périmètre élargi) | Non |
| `police-judiciaire-statut` | **Réutilisé** | Ch. 4 | Non |
| `saisies-scelles` | **Orphelin** (fusion thématique ch.6 sous `perquisition`) | | **Oui** |
| `sanction-penale` | **Réutilisé** | Ch. 24 | Non |

**Comptes indicatifs** (à recalculer si Annexe B bouge) : **~9 réutilisés** (aucune 301) ; **~8 orphelins** (301). `nullites-procedure` : **décision** selon sommaire PDF (ch. dédié = ajouter le slug en B et hors orphelins).

**Slugs 46 *nouveaux* (hors 17)** : tous les chapitres dont le slug n’apparaissait pas dans §2.1 — **aucune 301 d’ancrage** ; création d’URL neuves.

**Collisions effectives (ancien = nouveau, même string de slug)** : les **9** slugs de la colonne *Réutilisé* du tableau ci-dessus (lorsqu’on publie chaque `.md` sous ce nom) — c’est l’**intention** : **même URL, nouveau contenu**.

---

*Fin du plan.*
