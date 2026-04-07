# Rapport d’écarts — infractions site vs fascicules SDCP

**Dernière génération JSON :** voir `infractions_officielles.json` → `meta.generatedAt`  
**Commande :** `npm run audit:infractions` (régénère le JSON depuis `src/data/recapitulatif-*.ts`)

## Synthèse des volumes (export automatique)

| Fascicule | Entrées dans `infractions_officielles.json` | Fichier d’audit |
|-----------|-----------------------------------------------|-----------------|
| F01 | 67 | [fascicules/F01.md](fascicules/F01.md) |
| F02 | 27 | [fascicules/F02.md](fascicules/F02.md) |
| F03 | 13 | [fascicules/F03.md](fascicules/F03.md) |
| F04 | 17 | [fascicules/F04.md](fascicules/F04.md) |
| F05 | 9 | [fascicules/F05.md](fascicules/F05.md) |
| F06 | 20 | [fascicules/F06.md](fascicules/F06.md) |
| F07 | 3 | [fascicules/F07.md](fascicules/F07.md) |
| **Total F01–F07** | **156** | |
| F08–F15 | 0 (pas de liste « infraction » dans ce référentiel) | [fascicules/F08.md](fascicules/F08.md) … [F15.md](fascicules/F15.md) |

> Le **référentiel infractions** de la page `/infractions` peut afficher un sous-ensemble (ex. filtrage, regroupement) : le **JSON d’audit** reflète **chaque ligne** du récapitulatif TypeScript.

## Catégories d’écarts

| Catégorie | Détail |
|-----------|--------|
| **CORRECTES** | À valider **fascicule par fascicule** : comparer chaque `titre` + `element_legal.formulation_exacte` au PDF. |
| **INCOMPLÈTES dans le JSON** | Champs `accroche`, `repression` (peines exactes), `tentative`, `complicite` : marqués **TODO** ou génériques — à compléter depuis **PDF uniquement**. |
| **F08–F15** | Pas d’entrée dans le tableau d’infractions JSON : contenu **procédural / transversal** — suivi dans les fiches [F08–F15](fascicules/) et dans **Fondamentaux** / **cours**. |

## Procédure de correction (phase 2)

1. Ouvrir `reference/audit/fascicules/Fxx.md` et le PDF indiqué.
2. Pour chaque `id` du JSON concernant ce fascicule, compléter les champs manquants **mot pour mot** depuis le fascicule.
3. Mettre à jour le site si le récap TypeScript doit être **corrigé** (erreur repérée par rapport au PDF).
4. Relancer `npm run audit:infractions` pour régénérer le JSON après modification des sources.

## Notes

- **Cahier MAJ** : `_00_cahier_de_mise_jour_de_juillet_2025_d_cembre_2025.pdf` — pour évolutions postérieures au tirage des fascicules.
- **Rapport de synthèse / articulation** : voir `rapport-de-synthese-officiel.pdf` et fascicules B0/B7 dans la formation (noms dans le dépôt peuvent varier).
