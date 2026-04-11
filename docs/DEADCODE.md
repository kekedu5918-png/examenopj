# DEADCODE — rapport knip

Ce fichier est alimenté par **`npm run docs:audit-deadcode`** (sortie knip + squelette ci-dessous).

## Tableau de suivi (à compléter après revue humaine)

| Fichier / symbole | Outil | Action proposée | Risque suppression |
|-------------------|-------|-----------------|-------------------|
| *(exécuter `npm run knip` et recopier les lignes ici)* | knip | Vérifier `rg` / import dynamique | Faux positifs fréquents |

## Sortie knip brutes

_Exécutez `npm run knip` ou `npm run docs:audit-deadcode` avec Node/npm._

```
(placeholder — généré automatiquement lors du prochain run)
```

## Interprétation

- **Ne pas supprimer** les fichiers référencés dynamiquement (import dynamique, routes, CMS, scripts one-off).
- Recouper chaque entrée avec une recherche (`rg`) avant suppression.
