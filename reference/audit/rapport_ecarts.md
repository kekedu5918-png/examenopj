# Rapport d’audit — Infractions officielles vs site ExamenOPJ

**Date :** 2026-04-06  
**Sources de vérité :** `reference/audit/fascicules/*.txt` (extractions alignées SDCP), PDFs dans `reference/fascicules/`, cahier MAJ 2025.

## Synthèse

| Zone | Statut |
|------|--------|
| Fichier `infractions_officielles.json` | **Amorcé** : 1 infraction F03 entièrement structurée (F03-01), 3 entrées **MAJ 2025** en attente de relecture fascicule/cahier (champs `TODO` explicites). |
| Référentiel site (`src/data/recapitulatif-*.ts`) | **55** lignes catalogue — formulations alignées sur la logique fascicules historique ; **pas encore** remplacées par import JSON automatique. |
| Écarts | Voir section **MANQUANTES** / **À VALIDER** ci-dessous. |

## CORRECTES (échantillon)

- **F03-01 — Conduite sous l’empire d’un état alcoolique** : entrée JSON `verification: complete` calée sur `reference/audit/fascicules/F03.txt` (élément légal, moral, répression délits/contraventions, complicité, tentative, CA AUCUNE). Sous-points matériels détaillés « contrôle / preuve » : **TODO** dans le JSON pour reprise exhaustive p.1–3 sans paraphraser.

## MANQUANTES (dans le JSON)

- **Infractions F01 à F07** (hors F03-01) : non dupliquées dans `infractions_officielles.json` dans cette itération. **Action :** extraire fascicule par fascicule depuis les `.txt` d’audit, même schéma, sans invention.
- **MAJ 2025** (homicide routier, blessures routières ITT) : entrées présentes avec **TODO** — obligatoire de recaler sur le **cahier juillet–décembre 2025** et le fascicule F03 à jour.

## ERRONÉES / À RISQUE (site vs fascicule)

- Toute ligne du tableau `recapitulatif` qui n’a pas été **recollée** mot pour mot sur une extraction fascicule à jour est **à risque** jusqu’à validation croisée.
- **Pièges d’examen** : le site expose surtout `noteExamen` ; le JSON prévoit `pieges_examen` — **migration** à prévoir sur la fiche détail infraction.

## Fondamentaux (F09–F15)

- La page `/fondamentaux` intègre une **architecture 8 rubriques** (classification, cadres, CI, GAV, audition libre, nullités, perquisitions/saisies/réquisitions, récidive/concours). Les tableaux **doivent** être revus ligne par ligne avec **F09 p.8** (classification), **F11**, **F15**, **F10 p.26** (récidive) — les commentaires `TODO: vérifier F.. p...` dans le code marquent les zones non figées par PDF seul dans cet environnement.

## Rapport de synthèse / Articulation / PV

- **PDF officiel** : `public/docs/rapport-synthese-officiel.pdf` (copie depuis `reference/fascicules/rapport-de-synthese-officiel.pdf`).
- **Modèles B7_02, B0_ARTICUL_08242, B0_ARTICUL_INCID_0723** : interfaces « 3 modes » amorcées ; contenu complet **à caler** sur les PDF nommés dans le cahier des charges (pas d’invention de formulaires).

## Prochaines étapes (ordre strict)

1. Compléter `infractions_officielles.json` pour **toutes** les infractions F01–F07 depuis les `.txt` / PDF.
2. Valider les 3 infractions **MAJ 2025** avec le cahier officiel.
3. Brancher la fiche infraction sur le JSON ou générer `recapitulatif` depuis le JSON.
4. Relecture juridique complète avant toute publication « définitive ».
