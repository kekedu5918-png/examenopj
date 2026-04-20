# Audit cohérence — Chiffres clés home vs contenu réel

Date : 2026-04-20 (durant Phase 2B.2.1)
Commit déclencheur : 34cb07e (2B.2.1 compteurs)
Décision : non corrigé en 2B.2, à trancher post-Phase 2B.

## Stats affichées sur la home (HomeStatsSection)

| Valeur | Label | Sublabel | Source réelle | Cohérence |
|--------|-------|----------|---------------|-----------|
| 15 | Fascicules officiels | SDCP complets | [à vérifier] | OK à confirmer |
| 55+ | Infractions détaillées | éléments constitutifs | `getInfractionsCatalog()` = 160 | **INCOHÉRENT** |
| 3 | Épreuves couvertes | écrit · dossier · oral | découpage examen | OK |
| 200+ | Questions de quiz | avec correction détaillée | `quizQuestions.length` = 232 | OK |

## Incohérence principale : 55+ vs 160

- Home : 55+
- Page `/infractions` (titre SEO + grille) : 160
- Source : `getInfractionsCatalog()` dans `src/data/recapitulatif-data.ts`

La home sous-vend le volume réel du catalogue d'un facteur ~3. Pour un produit de préparation OPJ destiné à une cible exigeante, c'est une incohérence à corriger.

## Options produit (à trancher post-Phase 2B)

- **A.** Aligner la home sur 160 (ou 150+ pour se laisser une marge). Option la plus simple.
- **B.** Redéfinir le périmètre « Infractions détaillées » différemment de `getInfractionsCatalog()` si métier distinct (ex. sous-ensemble réellement rédigé en profondeur vs simple entrée catalogue). Nécessite clarification métier.
- **C.** Reformuler le label pour qu'il ne promette plus un volume précis (ex. « Large référentiel d'infractions »).

## Contrôle à faire sur le 15 « Fascicules officiels »

Pas vérifié à cette date. À recompter contre la source réelle (grep fascicules, dossier `docs/fascicules/` ou équivalent) avant décision produit.

## Commit associé

Ce fichier d'audit + pas de modification code.

Message : `chore(home): audit cohérence chiffres clés vs contenu réel (Phase 2B.2.1)`
