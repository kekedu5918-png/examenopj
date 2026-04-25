# Rapport qualité OCR / intégration — Phase **2F.1.a** (3 chapitres pilotes)

**Date** : 2026-04-25  
**Fichier source** : `content/_sources/fondamentaux-2026/FONDAMENTAUX.pdf` (74 pages, synthèse JUIN 2026, MAJ 01/12/2025).  
**Chapitres livrés** : 1 (procédure), 19 (DPG), 31 (DPS, loi 2025).

**Relecture ciblée (OPJ)** : les fiches `content/cours/*.md` **ne portent pas** de marqueurs `<!-- OCR_REVIEW: -->` (consigne : ne pas les modifier en même temps que ces livrables d’audit). L’**équivalent** pour cibler la relecture est le tableau **§ « Extrait : passages [OCR_INCERTAIN] »** ci-dessous : chaque ligne correspond à l’**intention** d’un `<!-- OCR_REVIEW: ... -->` au-dessus du passage concerné, avec **numéro de ligne** pour ouvrir le fichier directement. Liste des **articles** extraits avec lignes : `docs/audits/2f1a-articles-cites.md`.

---

## 0. Extrait : passages [OCR_INCERTAIN] (conversion ou source fragile)

*Légende* : **l.** = numéro de ligne dans le fichier `content/cours/<slug>.md` au moment de l’export.

### `enquete-flagrance.md`

| l. | Marqueur logique | Motif (relecture ciblée) |
|----|------------------|-------------------------|
| 31 | `[OCR_INCERTAIN]` | Formule « (art. 53) » sans C.P.P. — homogénéité avec le reste de la fiche. |
| 33 | `[OCR_INCERTAIN]` | Renvoi **global** *art. 53 à 74* : utile pédagogiquement ; pas le détail article par article. |
| 86 | `[OCR_INCERTAIN]` | Renvoi raccourci **« 62-2 »** (finalités de GAV) — vérifier que le texte d’accompagnement aligne bien sur **art. 62-2 C.P.P.** et la chaîne 62-2/63. |
| 90 | `[OCR_INCERTAIN]` | *Cass. crim.* « sans date » (jurisprudence abondante) — ne constitue pas une citation d’arrêt vérifiable telle quelle. |
| 54, 66, 67, 71, 73 | `[OCR_INCERTAIN]` | Arrêts **Cass. crim.** (dates) : reprise depuis la **synthèse PDF** — contrôle sur version publiable des arrêts si besoin d’examen. |
| 100, 101 | `[OCR_INCERTAIN]` | Conventions de **Vienne 1961 / 1963** (immunités) : hors C.P.P. ; teneur des engagements conventionnels, pas de « coquille OCR » proprement dite, mais **matière à relecture spécialisée**. |

### `causes-irresponsabilite-attenuation.md`

| l. | Marqueur logique | Motif (relecture ciblée) |
|----|------------------|-------------------------|
| 3, 10–20 | `[OCR_INCERTAIN]` | Frontmatter / liste `articlesCites` : cohérence entre libellés et tableaux. |
| 27 | `[OCR_INCERTAIN]` | *« loi 2016-1691 »* vs *loi n° 2016-1691* (l. 105) — homogénéité des références. |
| 62, 64 | `[OCR_INCERTAIN]` | Bloc *L. 11-1 … R. 11-1* : relecture d’**identifiants d’articles** sur le code **CJPM** (numérotation). |
| **67, 68** | **`[OCR_INCERTAIN]`** | **`Art. L. 121-5` / `L. 121-7` CJPM** : reprise **telle** sur la filière **mineurs** — **susceptible d’écart** avec la numérotation législative (signal déjà en § 2) ; **priorité haute** pour l’OPJ. |
| 99, 101 | `[OCR_INCERTAIN]` | *État de nécessité* : formulation mêlant *danger injuste* / urgence (doctrine) — cadrage strict **art. 122-7** à valider. |
| 36 | `[OCR_INCERTAIN]` | « *ch. d’instruction* » (abréviation) dans un tableau. |

### `viol-agressions-sexuelles.md`

| l. | Marqueur logique | Motif (relecture ciblée) |
|----|------------------|-------------------------|
| 28 | `[OCR_INCERTAIN]` | Bloc **nouveautés 2025** (lois, dates, consentement) : densité législative — **relecture** contre les **JO** et le C. pén. consolidé. |
| 32 | `[OCR_INCERTAIN]` | Énoncé des **qualifications 2025** (consentement, bucco-anaux) : sensible aux amendements successifs. |
| 36 | `[OCR_INCERTAIN]` | Abréviations **V** / **A** (victime / auteur) dans un tableau — clarté pédago., pas un bug OCR. |
| 43, 44 | `[OCR_INCERTAIN]` | Ligne « **etc.** » et *liste législative* : insistance à citer le **texte** pour les circonstances **222-24** et suivantes. |
| 52 | `[OCR_INCERTAIN]` | *Romeo law* (expression) + conditions d’**écart d’âge** — droit national, pas l’anglais ; valider chiffres et **exceptions** sur le C. pén. |
| **62–64** | **`[OCR_INCERTAIN]`** | **§ 31.5** *soumission chimique* : le texte indique d’**insérer l’article exact** de session — **numéro manquant volontairement** ; relecture **bloquante** si l’on fige l’examen. |
| 64 | `[OCR_INCERTAIN]` | *« ordre »* 5 ans / 75 000 € — teneur pénale à confirmer sur l’**article** visé. |
| 60 | `[OCR_INCERTAIN]` | Renvoi *222-24 s.* pour aggravations. |
| 68, 77 | `[OCR_INCERTAIN]` | Niveaux de peines (exposition, harcèlement) — **vérification législative** mentionnée dans la fiche. |

---

## 1. Nature du source et extraction

| Élément | Constat |
|---------|--------|
| **Format** | Fichier **PDF** binaire (en-tête `%PDF-1.4`) — **pas** une archive ZIP déguisée. |
| **Texte** | Extraction programmatique : `pdf-parse` v2 (`PDFParse` + `getText()`), découpe par marqueur **`CHAPITRE n`** (46 occurrences, indices cohérents avec le sommaire). |
| **Fidélité** | L’OCR n’est **pas** un moteur externe (Tesseract) : c’est l’**extraction de texte** intégrée au PDF. Qualité des **accents** et **césures** : bonne sur les extraits lus, quelques césures (mots coupés) corrigées **à la main** en rédaction. |
| **Images** | Pages rendues en PNG par `getScreenshot` puis **JPEG** (qualité 86) via `sharp` — noms : `enquete-flagrance-schema-timeline.jpg` (p. 6), `causes-irresponsabilite-attenuation-p41.jpg` (p. 41), `viol-agressions-sexuelles-schema-2025.jpg` (p. 53). |

**Estimation taux d’automatisation brut → markdown structuré** (hors relecture) : **~40 %** (retrait mécanique de pieds de page possible) ; le **gros** du travail pilote a été la **mise en forme sémantique** (titres, tableaux GFM, encadrés, listes) et le **raccord** aux références juridiques — **~60 %** du temps **éditorial**.

---

## 2. Chapitre par chapitre

### Ch. 1 — `enquete-flagrance`

| Critère | Détail |
|--------|--------|
| **Retouches manuelles** | Fusion des césures ; transformation du « faux » tableau tête L.19 en tableau GFM ; retrait des blocs *SYNTHÈSE OPJ* / *Page n* (non repris dans le .md) ; homogénéisation *art. … C.P.P.* |
| **Conversion auto « réussie » (ordre de grandeur)** | **~70 %** du texte utile, après idée d’enchaînement des sections. |
| **Risques résiduels** | Numéros d’**articles** et **Cass. crim.** à re-vérifier sur fascicule si copie d’examen. |

### Ch. 19 — `causes-irresponsabilite-attenuation`

| Critère | Détail |
|--------|--------|
| **Retouches manuelles** | Gros tableaux (19.1, 19.2, 19.3) recompilés ; titres 19.1–19.8 ; encadrés *ATTENTION* / *DÉFINITION* ; **point de vigilance** : le PDF source cite **Art. L. 121-5** / **L. 121-7** avec renvoi *CJPM* pour certaines tranches d’âge — cohérence à **valider** avec le texte code (possible **coquille** *L. 12-1* / *L. 12-2* / autre) lors de 2F.1.b. |
| **Conversion auto** | **~55 %** (structure plus dense, nombreux sous-tableaux). |
| **Image p. 41** | Page « mix » (fin minorité, ordre illégal, *définition* L.D. + suite) : utile pour **revue visuelle** ; le schéma n’est **pas** une recréation vectorielle, c’est un **raster** fidèle. |

### Ch. 31 — `viol-agressions-sexuelles`

| Critère | Détail |
|--------|--------|
| **Retouches manuelles** | Bloc 2025 (consentement, bucco-anaux, professions de santé) ; harmonisation *art. 222-…* ; section **31.5** (soumission chimique) : le **n° d’article** exact doit être **relevé** sur le C. pén. en vigueur au moment de l’examen (place réservée dans le texte). |
| **Conversion auto** | **~50 %** (réforme 2025 = forte densité d’amendements). |
| **Frontmatter** | `loi2025: true` (conformément à la consigne *ch. 31 ou 44*). |

---

## 3. Suggestions de pipeline pour **2F.1.b** (43 chapitres)

1. **Script unique** : lecture PDF — découpe `CHAPITRE n` — `cleanFooters(text)` (regex *SYNTHÈSE OPJ*, *Page \d+*, *-- n of 74 --*).  
2. **Détection titres** : heuristique `^\d+\.\d+ ` → `##` ; `^n [A-ZÉÈ…]` → encadré `> **…**` (à calibrer).  
3. **Tableaux** : tenter `getTable()` (pdf-parse) en secours, sinon export **screenshot** par page *tableau* identifié par mots-clés *Tableau* / *Schéma*.  
4. **Contrôle qualité** : un **JSON** d’*articles* extraits par regex ( `\bart\.\s*\d|L\.\s*n°?\s*[\d-]+` ) comparé au markdown final.  
5. **Légitimité pédagogique** : conserver en **bannière** *« vérifier sur les fascicules officiels »* sur les fiches issues de la synthèse (déjà esprit du PDF).  

---

## 4. Tests automatisés (non-régression)

- **E2E** : `e2e/2f1a-fondamentaux-pilots-capture.spec.ts` — capture **pleine page**, **dark** → `docs/audits/2f1a-captures/*.png`.  
- Mise à jour **snapshot** `light-locked-fondamentaux` (hub plus haut : **+3** cartes).  
- Ajustement **flaky** `infractions` (délai d’ouverture accordéon + visibilité du premier `infraction-card`).

---

*Livrable validé côté CI : lint, tsc, vitest, build, `test:e2e`.*  
*Pas de `git push` sans validation produit (consigne 2F.1.a).*

**Complément relecture** : liste d’**articles** avec numéros de ligne — [2f1a-articles-cites.md](./2f1a-articles-cites.md).
