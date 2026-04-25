# Rapport qualité OCR / intégration — Phase **2F.1.a** (3 chapitres pilotes)

**Date** : 2026-04-25  
**Fichier source** : `content/_sources/fondamentaux-2026/FONDAMENTAUX.pdf` (74 pages, synthèse JUIN 2026, MAJ 01/12/2025).  
**Chapitres livrés** : 1 (procédure), 19 (DPG), 31 (DPS, loi 2025).

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
