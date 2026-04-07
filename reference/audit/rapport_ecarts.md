# Rapport d’écarts — référentiel infractions

Date : 2026-04-07 (génération automatique + intégration site).

## Source de vérité

- Fichier : `reference/audit/infractions_officielles.json`
- Générateur : `scripts/extract-infractions-fascicules.ts` (extraction I–V depuis `reference/audit/fascicules/F01.txt` … `F07.txt`).

## Résumé

| Ancienne source site | Nouvelle source |
|---------------------|-----------------|
| `recapitulatif-*.ts` + `getInfractionsCatalog()` agrégé | JSON d’audit (153 entrées extraites des .txt) |

## INFRACTIONS CORRECTES

- Les titres, éléments I à V, TENTATIVE / COMPLICITÉ lorsque présents sous la forme `LA TENTATIVE : OUI|NON` / `LA COMPLICITÉ : OUI|NON` ou `TENTATIVE : OUI` dans la section répression sont alignés sur le fascicule extrait.

## INFRACTIONS ERRONÉES (corrigées par remplacement du catalogue)

- L’ancien récapitulatif TypeScript (formulations résumées, TODO) est **remplacé** par le texte intégral des blocs II et III (`contenu_complet`) issus des fichiers .txt.

## INFRACTIONS MANQUANTES

- Fascicules **F08 à F17** : pas de fiches au format « I — élément légal » homogène dans les exports texte (F08 = libertés publiques, F09–F15 = cours / procédure). Aucune entrée du même type que F01–F07 dans ces fichiers → non inclus dans le JSON infractions « qualification pénale ».

## INFRACTIONS MAJ 2025

- Champ `maj_2025` / `badge_maj` : à renseigner après lecture du cahier `_00_cahier_de_mise_jour_de_juillet_2025_d_cembre_2025.pdf` et marquage des infractions concernées (ex. homicide routier, blessures routières — loi 2025-622).

## Identifiants (`id`)

- Format : `F01-001`, …, `F01-p2-001` (partie 2), `F02-001`, …, `F07-xxx`.
- Les anciens identifiants `f01-p1-r0` ne sont plus utilisés ; mettre à jour les favoris / liens profonds éventuels.
