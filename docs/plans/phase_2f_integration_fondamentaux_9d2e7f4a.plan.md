# Phase 2F — Intégration contenu Fondamentaux (synthèse session juin 2026)

**Statut** : plan de travail — aucune implémentation ni extraction réalisée dans le cadre de sa rédaction.  
**Document source utilisateur** : variante `FONDAMENTAUX.pdf` (ZIP déguisé, 74 pages JPEG + 74 textes OCR).  
**Mise à jour cible contenu** : 01/12/2025 (lois 2025-532, 2025-622, 2025-623, 2025-1057).  
**Jalon parent** : pause **Phase 2D.2.a** le temps d’exécuter 2F ; reprise 2D.2.a après clôture 2F (voir §10).

**Versionnement** : à ajouter et committer dans le dépôt dès création, conformément à `.cursor/rules/plans-versioning.mdc`.

**Décisions tranchées (2026-04-25, rév. 2026-04-25 — sommaire PDF ch. 16–20)** :

- **Suppression des 17 fiches** markdown actuelles : contenu retiré ; remplacement intégral par la synthèse. Suppression des fichiers en **2F.4** après bascule.
- **Option A** (46 chapitres = 46 fiches) ; slugs **sémantiques purs** (kebab-case) ; ordre d’affichage via `chapitre: N` dans le frontmatter.
- **2F.0** : audit `FICHES` — [Annexe A](#annexe-a--vague-20--analyse-dimpact-fichés--dettes-deep-links). La **dette opérationnelle** prioritaire est le **deep-linking** (fascicule-cours-map, enquêtes, révision, leçons, canonical), pas `FICHES` en runtime.
- **2F.0.5** : [audit deep-links internes](#vague-20-5--audit-deep-links) — livrable `docs/audits/deep-links-fondamentaux-2f.md` (prévu **après** validation plan ; exécution lancée une fois le plan acté sur le fond). **Aucune** modification des 6+ fichiers couplés en **2F.0.5** (livrable seulement).
- **2F.1** : **2F.1.a** (3 chapitres pilotes) puis **2F.1.b** (43 chapitres).
- **Slugs** : **aucun « préfixe défensif »** ; si le **même** slug sert pour un chapitre neuf (thème proche) et l’**ancien** ficher, l’URL reste : **changement de contenu = édition normale, pas de 301** ([§9](#9-politique-de-redirections-http-301--301-sélective)).
- **301** : **sélectives** — **uniquement** pour slugs **orphelins** (aucun chapitre des 46 ne réutilise l’ancien chemin) ; voir [Annexe C](#annexe-c--les-17-anciens-slugs--stratégie-réutilisation--orphelin--301).
- **Sommaire PDF (ch. 16–20) — acté** : **ch. 16** = *La nullité des actes de procédure* → slug **`nullites-procedure`** (**réutilisé**). **ch. 17** = *La classification tripartite et application de la loi* — **pas** l’ancienne fiche `loi-penale-responsabilite` au même intitulé (slug neuf, voir [Annexe B](#annexe-b--mapping-officiel-des-46-chapitres-slugs--titres) ; l’**ancien** `loi-penale-responsabilite` devient **orphelin 301** sauf Décision de renommer un ch. 46 pour le reprendre). **ch. 18** = *La responsabilité pénale des personnes physiques* — slug **`responsabilite-penale-personnes-physiques`**. **ch. 19** = *Les causes d'irresponsabilité et d'atténuation* — slug **`causes-irresponsabilite-attenuation`**. **ch. 20** = *Usage des armes par les forces de l'ordre* — slug **`usage-armes-forces-ordre`**. **Aucun** chapitre « éléments constitutifs et qualification » à cet emplacement (suppression d’une formulation erronée des versions antérieures de l’annexe B).
- **Pilote 2F.1.a (DPG) — tranché** : **chapitre 19** (*causes d'irresponsabilité et d'atténuation*). **Justification** : ce chapitre concentre tableaux, encadrés et finesse rédactionnelle — **stress test** du pipeline OCR / mise en forme ; si 2F.1.a est validée sur le cas exigeant, le batch 2F.1.b est moins aléatoire (logique *« si ça marche sur le plus dur, le reste suit »*). *Alternative documentée* : le ch. 17 (classification) reste le cas « standard » plus rapide à valider ; l’équipe peut déroger une seule fois si le besoin est de **dérisquer** le planning avant 2F.1.b.
- **2F.1.a (lot)** : procédure **`enquete-flagrance`**, DPG piloté **`causes-irresponsabilite-attenuation` (ch. 19)**, DPS **`viol-agressions-sexuelles`**.

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
| **2F.0.5** | **Audit deep-links** : inventaire de **toute** occurrence des **17** anciens slugs sous `src/` (fichier, ligne, type d’usage, recommandation 2F.2) ; livrable **`docs/audits/deep-links-fondamentaux-2f.md`**. Aucun changement de code de navigation — **livrable seulement**. | Validation utilisateur **avant** 2F.2. |
| **2F.1.a** | Unzip, 3 chapitres pilotes : `enquete-flagrance` (proc.) ; **`causes-irresponsabilite-attenuation`** (ch. 19, DPG — pilote tranché) ; `viol-agressions-sexuelles` (DPS). | Validation contenu + OCR. |
| **2F.1.b** | 43 chapitres restants. | 46 fiches, Annexe B alignée. |
| **2F.2** | Mise à jour des sources d’après l’audit ; 301 (orphelins) ; config. | **Hors 2F.0.5** — c’est la prochaine phase après validation de l’audit. |
| **2F.2.5** (opt.) | `FICHES` / leçons si l’on conserve le graphe. | Optionnel. |
| **2F.3** | Hub : filtres, badges 2025, etc. | UX. |
| **2F.4** | Retrait des 17 fichiers obsolètes. | Cohérence. |

**Ordre** : 2F.0 → **2F.0.5** (audit) → 2F.1.a → 2F.1.b → 2F.2 → 2F.3 → 2F.4.

### Vague 2F.0.5 — cadrage

- Périmètre minimum : A.5 + `rg` sur `fondamentaux/` + `next.config` (redirections historiques) ; exclu : génération `.md`, suppression des 17, édition des 6 fichiers couplés (réservé **2F.2**).

---

## §7. Risques (extraits)

- **Deep-links** : incohérence (ex. `/audition` vs `auditions`) — listée en audit 2F.0.5.  
- **OCR** : relecture sur le pilote ch. 19.  
- **JAP / exécution** : vérifier au sommaire complet si un chapitre *exécution des peines* existe hors des ch. 17–20 calibrés ici [Annexe B — note p. Partie III](#annexe-b--mapping-officiel-des-46-chapitres-slugs--titres).

---

## §8. Tests (extraits)

E2E hub ; smoke ; sitemap ; 301 ciblés (orphelins).

---

## §9. Politique de redirections HTTP 301 (301 **sélective**)

1. **Réutilisé** — **pas** de 301.  
2. **Orphelin** — 301 ` → /fondamentaux` (ou cible thématique en 2F.2).  
3. **Nouveau** — pas de 301.

**Orphelins (Annexe C, tels qu’actés)** : **`cadres-enquete`**, **`crimes-biens`**, **`crimes-personnes`**, **`fouille-vehicule`**, **`instruction-mandats`**, **`libertes-publiques`**, **`saisies-scelles`**, et **`loi-penale-responsabilite`** (remplacé sémantiquement par ch. 17–18 sans réutilisation du slug — **7 + 1 = 8** entrées 301 possibles, ou **7** si l’on fusionne cibles éditorialement ailleurs). **`nullites-procedure` retiré** de la liste orphelins (réutilisé, ch. 16).  
**~10 réutilisés** / **~7–8 orphelins** selon arbitrage `loi-penale-responsabilite`.

---

## §10. Métadonnées de fin

- **ID** : `phase_2f_integration_fondamentaux_9d2e7f4a`  
- **Dernière révision** : 2026-04-25 (sommaire 17–20, nullités, pilote 19, audit 2F.0.5 lancé).  
- **Reprise** : 2D.2.a après 2F.

**État** : **PAUSE** après commit `docs(audit): deep-links…` — relecture utilisateur de l’audit, validation, puis 2F.1.a (3 chapitres pilote).

---

## Annexe A — Vague 2F.0 : `FICHES` + dettes **deep-links**

### A.1–A.4 (rappel)

`FICHES` 107 : imports applicatifs **nuls** (hors `data/`) — détail déjà connu.

### A.5 Vraie dette : **deep-links** (6 + extras)

Fichiers **runtime** (dashboard, enquêtes, parcours, révision) + `fondamentaux-canonical-map` + `next.config` (chemins hérités). L’**audit 2F.0.5** (fichier `docs/audits/deep-links-fondamentaux-2f.md`) sert de base à **2F.2**.

---

## Annexe B — Mapping des 46 chapitres (slugs + titres)

**Révision sommaire PDF** : ch. **16–20** recalés ; **ch. 16 = nullités** (réutilisation `nullites-procedure`) ; ch. **17–20** = bloc DPG tel que le sommaire (sans entrée erronée « éléments constitutifs et qualification » à ces rangs).  
**Partie III** : **ch. 15** conserve une entrée *Cour d'assises, appel* ; **l’exécution des peines / JAP (F13)** n’est **pas** redondante avec *nullité* (ch. 16) — vérifier au PDF si un chapitre *exécution* autonome existe et ajuster le numéro (ex. 15 bis / fusion) en **2F.1.b** si le sommaire l’impose (note de reprise). **2F.1.b (OCR complet)** : recouper explicitement le thème **exécution des peines / JAP** avec le sommaire des 46 chapitres — emplacement **probable** : ch. **24** (*Sanctions et échelle des peines*) ou un sous-chapitre connexe, **sans** poser cela en contrainte avant lecture intégrale du PDF. **Non bloquant** pour 2F.1.a.

| Ch. | Titre (aligné sommaire / proposition) | Slug | Part. | Note réutil. §2.1 |
|-----|----------------------------------------|------|--------|-------------------|
| 1 | L’enquête de flagrance | `enquete-flagrance` | I | *nouveau* |
| 2 | L’enquête préliminaire | `enquete-preliminaire` | I | *nouveau* |
| 3 | L’information judiciaire | `information-judiciaire` | I | *nouveau* |
| 4 | Acteurs, statut, direction et contrôle de la police judiciaire | `police-judiciaire-statut` | I | **réutilise** |
| 5 | La garde à vue | `garde-a-vue` | II | **réutilise** |
| 6 | Perquisitions, visites et saisies | `perquisition` | II | **réutilise** |
| 7 | Auditions, mineurs, expertises | `auditions` | II | **réutilise** |
| 8 | Identité, rétention, interpellation | `controle-identite` | II | **réutilise** |
| 9 | Réquisition, commission rogatoire, actes d’enquête | `requisition-commission-rogatoire` | II | *nouveau* |
| 10 | Action publique, opportunité, politique pénale | `action-publique-opportunite` | III | *nouveau* |
| 11 | Parquet, instruction : cadre général | `parquet-instruction` | III | *nouveau* |
| 12 | JLD, détention provisoire, mandats de justice | `jld-mandats` | III | *nouveau* |
| 13 | Mise en examen, juge d’instruction | `mise-en-examen-instruction` | III | *nouveau* |
| 14 | Renvoi, jugement, juridictions répressives | `juridictions-jugement` | III | **réutilise** |
| 15 | Cour d'assises, appel, procédures spéciales | `assises-appel` | III | *nouveau* |
| 16 | La nullité des actes de procédure | `nullites-procedure` | III | **réutilise** |
| 17 | La classification tripartite et application de la loi | `classification-tripartite-application-loi` | IV | *nouveau* |
| 18 | La responsabilité pénale des personnes physiques | `responsabilite-penale-personnes-physiques` | IV | *nouveau* |
| 19 | Les causes d'irresponsabilité et d'atténuation | `causes-irresponsabilite-attenuation` | IV | *nouveau* ; **pilote 2F.1.a DPG** |
| 20 | Usage des armes par les forces de l'ordre | `usage-armes-forces-ordre` | IV | *nouveau* |
| 21 | Complicité, coaction, concours d’infractions | `complicite-concours` | IV | *nouveau* |
| 22 | Tentative, récidive, circonstances, causes d’aggravation | `tentative-recidive-circonstances` | IV | *nouveau* |
| 23 | Personne morale, mineurs (général DPG) | `personne-morale-mineurs` | IV | *nouveau* |
| 24 | Peines : principes, modes, individuation | `peines-modes-individuation` | IV | *nouveau* |
| 25 | Prescription, amnistie, extinction de l’action | `prescription-extinction` | IV | *nouveau* |
| 26 | Sanction pénale, mesures, règles communes de sûreté | `sanction-penale` | IV | **réutilise** |
| 27 | Homicides, atteintes à la vie | `homicides-atteintes-vie` | V | *nouveau* |
| 28 | Atteintes involontaires, mise en danger | `violences-involontaires-integrite` | V | *nouveau* |
| 29 | Enlèvement, séquestration | `enlevement-sequestration` | V | *nouveau* |
| 30 | Violences, menaces, harcèlement | `violences-menaces-harcelement` | V | *nouveau* |
| 31 | Violences et agressions sexuelles | `viol-agressions-sexuelles` | V | *nouveau* (pilote DPS) |
| 32 | Mineurs, famille, mœurs, proxénétisme | `mineurs-cjpm` | V | **réutilise** |
| 33 | Atteintes aux biens, recel, destructions | `atteintes-aux-biens` | V | *nouveau* |
| 34 | Vol, escroquerie, abus de confiance, extorsion | `vols-escroquerie-extorsion` | V | *nouveau* |
| 35 | Stupéfiants : usage, détention, courses | `stupefiants-usage` | V | *nouveau* |
| 36 | Stupéfiants : trafic, bandes, blanchiment | `stupefiants-trafic` | V | *nouveau* |
| 37 | Infractions à la circulation routière | `delits-circulation-routiere` | V | *nouveau* |
| 38 | Atteintes à l’autorité, corruptions, fausses | `atteintes-autorite-corruption` | V | *nouveau* |
| 39 | Atteintes à la nation, terrorisme, paix publique | `atteintes-nation-terrorisme` | V | *nouveau* |
| 40 | Armes, matériels de guerre, munitions | `armes-materiel-guerre` | V | *nouveau* |
| 41 | Traite, atteintes à la dignité, prostitution (hors 31/32) | `traites-dignite-personne` | V | *nouveau* |
| 42 | Infractions numériques, cyberdélinquance | `infractions-numeriques` | V | *nouveau* |
| 43 | Blanchiment, économie, DPS transversal | `blanchiment-infractions-economiques` | V | *nouveau* |
| 44 | Actualisation législative 2025 | `actualisation-lois-2025` | VI | *nouveau* |
| 45 | Outils, méthode et entraînement oral | `outils-oral-entrainement` | VI | *nouveau* |
| 46 | Dernière ligne droite, session 2026 | `entrainement-session-2026` | VI | *nouveau* |

---

## Annexe C — Les 17 anciens slugs (réutilisé / orphelin / 301)

| Ancien slug | Action | Cible 46 (slug) / commentaire | 301 ? |
|-------------|--------|-------------------------------|-------|
| `auditions` | **Réutilisé** | Ch. 7 | Non |
| `cadres-enquete` | **Orphelin** | Deep-link → hub ou cibles 1–3 (2F.2) | **Oui** |
| `controle-identite` | **Réutilisé** | Ch. 8 | Non |
| `crimes-biens` | **Orphelin** | `atteintes-aux-biens` (ch. 33) — **slug différent** | **Oui** (bookmark) |
| `crimes-personnes` | **Orphelin** | Découpé (ch. 27–31…) | **Oui** |
| `fouille-vehicule` | **Orphelin** | `delits-circulation-routiere` (ch. 37) — autre slug | **Oui** |
| `garde-a-vue` | **Réutilisé** | Ch. 5 | Non |
| `instruction-mandats` | **Orphelin** | `jld-mandats` / `parquet-instruction` (2F.2) | **Oui** |
| `juridictions-jugement` | **Réutilisé** | Ch. 14 | Non |
| `libertes-publiques` | **Orphelin** | Aucun 1:1 | **Oui** |
| `loi-penale-responsabilite` | **Orphelin** (remplacé par ch. 17 + 18 **sans** reprise de ce slug) | **301 unique** (décision produit) : **uniquement** vers **`/fondamentaux/classification-tripartite-application-loi`** (ch. 17) — **pas** vers le **hub** ; **ne pas** doubler en 301 vers ch. 18 (liens profonds 2F.2). | **Oui** |
| `mineurs-cjpm` | **Réutilisé** | Ch. 32 | Non |
| `nullites-procedure` | **Réutilisé** | **Ch. 16** (sommaire) | **Non** |
| `perquisition` | **Réutilisé** | Ch. 6 | Non |
| `police-judiciaire-statut` | **Réutilisé** | Ch. 4 | Non |
| `saisies-scelles` | **Orphelin** (fusion sém. ch. 6) | | **Oui** |
| `sanction-penale` | **Réutilisé** | Ch. 26 (ajust. titre) | Non |

**Total** : **10 réutilisés** ; **7 orphelins « purs »** + **`loi-penale-responsabilite`** = **8** entrées 301 listables (arrondi produit : **~7 orphelins** si l’on traite `loi` par **remplacement de liens** sans 301).

**Collisions (ancien = nouveau, même string)** : les **10** réutilisations ci-dessus.

---

*Fin du plan.*
