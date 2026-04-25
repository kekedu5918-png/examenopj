# Audit deep-links — Fondamentaux Phase 2F (avant suppression des 17 fiches)

**Date** : 2026-04-25  
**Périmètre** : `src/` (Next.js) + `next.config.js` (hors `content/cours/*.md` — fiches elles-mêmes hors audit code).  
**Référence** : [Annexe C](../plans/phase_2f_integration_fondamentaux_9d2e7f4a.plan.md#annexe-c--les-17-anciens-slugs-stratégie-réutilisation--orphelin--301) du plan Phase 2F (stratégie réutilisé / orphelin / 301).  
**Hors scope** : extraction ZIP, génération markdown, édition des fichiers de données (réservé **2F.2** après validation de cet audit).

**Statut** : **2F.1.a** — décisions d’audit incrustées (§3 *audition* / `next.config` ; *loi-penale* **301 → ch. 17**) ; relecture utilisateur sur les **3** fiches + rapport `docs/audits/2f1a-rapport-qualite-ocr.md` ; **2F.1.b** (43 ch.) après feu vert.

---

## 1. Rappel : mapping global des 17 anciens slugs

| Slug | Statut cible 46 (plan acté) | Slug 46 cible (si réutilisé) |
|------|-----------------------------|------------------------------|
| `auditions` | Réutilisé | ch. 7 `auditions` |
| `cadres-enquete` | Orphelin (301) | — |
| `controle-identite` | Réutilisé | ch. 8 `controle-identite` |
| `crimes-biens` | Orphelin (301) | rempl. éditorial possible `atteintes-aux-biens` (ch. 33) |
| `crimes-personnes` | Orphelin (301) | multi-cibles 27+ (2F.2) |
| `fouille-vehicule` | Orphelin (301) | p.ex. `delits-circulation-routiere` (ch. 37) |
| `garde-a-vue` | Réutilisé | ch. 5 `garde-a-vue` |
| `instruction-mandats` | Orphelin (301) | p.ex. `jld-mandats` / `parquet-instruction` |
| `juridictions-jugement` | Réutilisé | ch. 14 `juridictions-jugement` |
| `libertes-publiques` | Orphelin (301) | — |
| `loi-penale-responsabilite` | Orphelin (301) | **301 unique** : `classification-tripartite-application-loi` **(ch. 17)** — **pas** le hub (décision produit ; voir plan Annexe C) |
| `mineurs-cjpm` | Réutilisé | ch. 32 `mineurs-cjpm` |
| `nullites-procedure` | Réutilisé | ch. 16 `nullites-procedure` |
| `perquisition` | Réutilisé | ch. 6 `perquisition` |
| `police-judiciaire-statut` | Réutilisé | ch. 4 `police-judiciaire-statut` |
| `saisies-scelles` | Orphelin (301) | thème fusionné ch. 6 (slug `perquisition`) |
| `sanction-penale` | Réutilisé | ch. 26 `sanction-penale` |

**Compte** : **10 réutilisés** ; **7 orphelins** « purs » + **`loi-penale-responsabilite`** = **8** chemins 301 listables (voir plan §9).

---

## 2. Tableau exhaustif des occurrences (fichier, ligne, usage)

*Les numéros de ligne sont ceux du dépôt au moment de l’audit.*

| # | Fichier | Ligne | Slug cible (path) | Type d’usage | Réutil. / orphelin (Annexe C) | Recommandation 2F.2 (non exécutée ici) |
|---|---------|-------|--------------------|-------------|--------------------------|----------------------------------------|
| 1 | `lib/content/fascicule-cours-map.ts` | 13 | `crimes-personnes` | Mappage primaire fascicule F01 | Orphelin | Remplacer par slug(s) 46 (p.ex. ch. 27) ou hub ; MAJ + libellé card |
| 2 | idem | 14 | `crimes-biens` | Mappage F02 | Orphelin | idem ch. 33 / hub |
| 3 | idem | 15 | `crimes-personnes` | Mappage F03 | Orphelin | idem |
| 4 | idem | 16 | `crimes-biens` | Mappage F04 | Orphelin | idem |
| 5 | idem | 17 | `crimes-personnes` | Mappage F05 | Orphelin | idem |
| 6 | idem | 18 | `mineurs-cjpm` | Mappage F06 | **Réutilisé** (ch. 32) | Conserver URL ; vérifier libellé |
| 7 | idem | 19 | `fouille-vehicule` | Mappage F07 | Orphelin | Cible p.ex. `delits-circulation-routiere` ou hub |
| 8 | idem | 20 | `libertes-publiques` | Mappage F08 | Orphelin | Cible 46 dédiée ou hub |
| 9 | idem | 21 | `loi-penale-responsabilite` | Mappage F09 | Orphelin | **301 → ch. 17** `classification-tripartite-application-loi` (pas hub) + MAJ liens 2F.2 |
| 10 | idem | 22 | `sanction-penale` | Mappage F10 | **Réutilisé** (ch. 26) | Conserver |
| 11 | idem | 23 | `cadres-enquete` | Mappage F11 | Orphelin | Hub ou `enquete-flagrance` / `enquete-preliminaire` / `information-judiciaire` |
| 12 | idem | 24 | `instruction-mandats` | Mappage F12 | Orphelin | `jld-mandats` / `mise-en-examen-instruction` / split |
| 13 | idem | 25 | `juridictions-jugement` | Mappage F13 | **Réutilisé** (ch. 14) | Conserver |
| 14 | idem | 26 | `police-judiciaire-statut` | Mappage F14 | **Réutilisé** (ch. 4) | Conserver |
| 15 | idem | 27 | `nullites-procedure` | Mappage F15 (dernier F01–F15) | **Réutilisé** (ch. 16) | Conserver |
| 16 | idem | 35 | `auditions` | Secondaire F06 | **Réutilisé** (ch. 7) | Conserver secondaire |
| 17 | idem | 36 | `garde-a-vue` … | Secondaire F11 | **Réutilisé** | Conserver |
| 18 | idem | 36 | `controle-identite` | Secondaire F11 | **Réutilisé** | Conserver |
| 19 | idem | 36 | `auditions` | Secondaire F11 | **Réutilisé** | Conserver |
| 20 | idem | 36 | `perquisition` | Secondaire F11 | **Réutilisé** | Conserver |
| 21 | idem | 37 | `perquisition` | Secondaire F12 | **Réutilisé** | Conserver |
| 22 | idem | 37 | `saisies-scelles` | Secondaire F12 | **Orphelin** | Remplacer par `perquisition` ou supprimer suggestion |
| 23 | idem | 37 | `instruction-mandats` | Secondaire F12 | **Orphelin** | Cible 46 adaptée |
| 24 | idem | 38 | `police-judiciaire-statut` | Secondaire F14 | **Réutilisé** | Conserver |
| 25 | idem | 39 | `nullites-procedure` | Secondaire F15 | **Réutilisé** | Conserver |
| 26 | `app/(account)/dashboard/page.tsx` | — | (via `getCoursPathForFascicule`) | Runtime liste modules | Agrège lignes 1–25 | Même corrigés que 1–25 |
| 27 | `data/enquetes-data.ts` | 69 | `crimes-biens` | Lien pédago enquête Alpha | Orphelin | Rempl. → `atteintes-aux-biens` (ou 301 si lien mort temp.) |
| 28 | idem | 70 | `cadres-enquete` | idem | Orphelin | Hub / multi cibles |
| 29 | idem | 103–104 | `crimes-personnes` | Bravo | Orphelin | idem ch. 27+ |
| 30 | idem | 104 | `cadres-enquete` | idem | Orphelin | idem |
| 31 | idem | 123–124 | `crimes-personnes` + `perquisition` | Charlie | Mélange | Rempl. personnes + perq **réutilisé** |
| 32 | idem | 143–144 | `controle-identite` + `cadres-enquete` | Delta | Réutilisé + orphelin | idem |
| 33 | idem | 163 | `garde-a-vue` | Echo | **Réutilisé** | Conserver |
| 34 | idem | 181–182 | `crimes-personnes` + `cadres-enquete` | Foxtrot | orphelin + orphelin | 2F.2 |
| 35 | idem | 199 | `crimes-personnes` | Golf | Orphelin | 2F.2 |
| 36 | idem | 216–217 | `crimes-personnes` + `cadres-enquete` | India | idem | 2F.2 |
| 37 | idem | 234 | `crimes-personnes` | Accident | Orphelin | 2F.2 |
| 38 | idem | 251 | `crimes-biens` | Patrimoniale | Orphelin | `atteintes-aux-biens` |
| 39 | `data/revision-themes.ts` | 116 | `cadres-enquete` | Parcours thème cadres | Orphelin | 2F.2 + libellé |
| 40 | idem | 117 | `garde-a-vue` | idem | **Réutilisé** | Conserver |
| 41 | idem | 155–156 | `crimes-personnes` | Thème personnes | Orphelin | 2F.2 |
| 42 | idem | 188–189 | `crimes-biens` | Thème biens | Orphelin | 2F.2 |
| 43 | `data/cours-revision-fil.ts` | 37 | `cadres-enquete` | Fil révision | Orphelin | 2F.2 |
| 44 | idem | 38 | `garde-a-vue` | idem | **Réutilisé** | Conserver |
| 45 | idem | 61 | `crimes-biens` | idem | Orphelin | 2F.2 |
| 46 | `components/lessons/ParcoursOpjPedagogyBlock.tsx` | 39 | `garde-a-vue` | CTA pédago | **Réutilisé** | Conserver |
| 47 | idem | 40 | `perquisition` | idem | **Réutilisé** | Conserver |
| 48 | idem | 41 | `audition` (⚠️) | CTA (note : **pas** `auditions` du fichier) | Incohérence / pas dans les 17 seuls | **Corriger** → `/fondamentaux/auditions` (slug réel) ; 404 aujourd’hui si fiche s’appelle `auditions` |
| 49 | `components/lessons/fiches/AuditionLessonBlocks.tsx` | 39 | `garde-a-vue` | Raccourci GAV | **Réutilisé** | Conserver |
| 50 | `data/fondamentaux-canonical-map.ts` | 7–16 | `garde-a-vue` (L301…L307) | ID leçon → fiche | **Réutilisé** | Vérifier slugs 46 côté leçon (2F.2.5) |
| 51 | idem | 16 | `controle-identite` (L1101) | idem | **Réutilisé** | idem |
| 52 | `features/examenopj/controllers/local-search.ts` | 6 | (`garde-a-vue` en commentaire) | Doc | n/a | Mettre commentaire aligné 2F.2 |
| 53 | idem | 91 | *dynamique* | Recherche `href` bâti sur slug `.md` | Tous contenus | Pas de refonte slug côté TS ; s’aligne sur `content/cours` |
| 54 | `data/fondamentaux-by-module.ts` | 11 | `` `/fondamentaux/${f.id}` `` | FICHES 107 (IDs Lxxx, `garde-a-vue`…) | Mixte | Mourir en 2F.2.5 si graphe supprimé ; cohérence `f.id` vs slug (bug latent) |
| 55 | `app/sitemap.ts` | 12, 66 | *tout slug `cours`* | Sitemap génératif | 17 actuels | Régénération après 46 fiches + 2F.2 |
| 56 | `app/fondamentaux/[slug]/page.tsx` | 27–28 | canonique / OG | Métas | n/a | OK |
| 57 | `next.config.js` | 90 | `/cours/:slug` → fondamentaux | Redirection 301 héritée | 17+ | Cohabiter avec 301 orphelins (ordre rewrites) |
| 58 | idem | 103 | `/cours/f01-crimes-personnes` → `crimes-personnes` | Redirection ciblée | **Orphelin** | Cible 301 finale `crimes-personnes` → **hub** (Annexe C) **ou** nouvelle cible 46 (à trancher) |
| 59 | idem | 104 | `f02-crimes-biens` | idem | **Orphelin** | idem |
| 60 | `data/fondamentaux-fiches-part1.ts` | 329 | `id: 'audition'` (pas l’URL) | ID fiche `FICHES` | Coh. `/audition` pédago | **Aligner** id/slug 2F.2.5 (optionnel) — pas d’URL directe ici |
| 61 | `data/fondamentaux-fiches-part1.ts` | 6, 100, 213, 489 | `cadres-enquete`, `garde-a-vue`, `perquisition`, `nullites` | `id` fiche / pas toujours = slug 17 | 2F.2.5 | Alignement graphe / markdown |

*Les composants n’incluent que le hub* (`/fondamentaux` sans segment) : `AccountBottomNav`, `Footer`, `navigation.ts`, `EnqueteDetailClient`, `CoursFichesListClient` (prop `basePath`) — **hors** 17 slugs, non listés ligne à ligne.

---

## 3. Cas sans équivalent 1:1 (explicite)

- **`cadres-enquete`** : thème ventilé sur ch. 1–3 (aucun slug identique) → **301** (bookmark) + **reliens 2F.2** vers le hub ou 3 cibles.  
- **`crimes-biens` / `crimes-personnes`** : synthèses « fourre-tout » remplacées par des chapitres DPS ciblés → **301** + MAJ de tous les `href` en **§2** vers slugs 46.  
- **`fouille-vehicule`**, **`libertes-publiques`**, **`instruction-mandats`**, **`saisies-scelles`** : pas de **réutilisation** de l’identifiant d’URL (Annexe C) → **301** pour résidu bookmark **ou** remplacement de liens uniquement.  
- **`loi-penale-responsabilite`** : **301** **ciblée** vers **ch. 17** `classification-tripartite-application-loi` (décision tranchée — **pas** le hub) ; voir **Annexe C** du plan.  
- **`/fondamentaux/audition`** (`ParcoursOpjPedagogyBlock`) : **n’est pas** un des 17 slugs (fiche réelle : `auditions.md` → URL `/fondamentaux/auditions`). **Vérification `next.config.js`** : **aucun** `rewrite` / `redirect` spécifique vers `audition` (héritage utile = `/cours/:slug` → `/fondamentaux/:slug` seulement) ; le segment **`audition`** n’est **jamais** mappé par la plateforme vers `auditions`. **Conclusion** : **anomalie = lien (slug) erroné dans le code** → correction **2F.2** vers `/fondamentaux/auditions` ; **pas** de **301** « plateforme ». *(Si l’on souhaitait un filet serveur, ce serait un choix 2F.2 explicite — aujourd’hui inutile si le `href` est corrigé.)*

---

## 4. Synthèse d’action (à valider par le produit, implémentation 2F.2)

1. **301** (Next) : n’inscrire en **permanent: true** que les **7 (+1)** orphelins retenus (§9 plan), *après* remplacement des liens **internes** quand c’est possible.  
2. **next.config** lignes 103–104 : aligner sur la même politique (SoT `crimes-personnes` / `crimes-biens` → hub ou slugs 33 / 27).  
3. **`fascicule-cours-map`** : haute densité d’**orphelins** — cœur du travail 2F.2 pour le **dashboard** connecté.  
4. **`enquetes-data`** : 20+ liens pédago ; mêmes reprises.  
5. **Bug `audition` / `auditions`** : correction simple une ligne (Parcours).

---

*Fin d’audit — en attente de validation utilisateur (PAUSE) avant 2F.1.a.*
