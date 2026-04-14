# DEADCODE — ExamenOPJ

> Généré à partir d’analyse statique (`knip`) et de revue ciblée. **Ne pas supprimer en masse** : `knip` ne résout pas toujours les imports dynamiques, les entrées App Router, ni les usages indirects.

## Risque global

| Risque | Signification |
|--------|----------------|
| **Sûr** | Fichier manifestement orphelin après grep + absence dans `app/` |
| **À vérifier** | Signal knip uniquement — confirmer par recherche `import` / route |
| **Risqué** | Export public API, barrel, ou données référencées par clé string |

## Candidats « sûrs » ou très probablement sûrs

- Aucun fichier listé par knip comme « unused » n’a été supprimé automatiquement ici. **Action recommandée** : pour chaque fichier, lancer `rg "NomDuFichier|NomExport" src app` avant suppression.

## Faux positifs fréquents (ne pas supprimer sans preuve)

- **`src/components/fondamentaux/*.tsx`** : montées par `src/app/fondamentaux/page.tsx` et `[slug]/page.tsx` — knip peut ne pas lier toute la chaîne.
- **`src/data/fondamentaux-*.ts`** : importés par pages serveur ou loaders — vérifier avec ripgrep.
- **`SynthèsePattern.tsx`** : si présent sous nom encodé (`Synth%C3%A8sePattern`), unifier le nom de fichier en `SynthèsePattern.tsx` (UTF-8) pour éviter doublons Git sous Windows.

## Dépendances npm signalées « unused » par knip

Packages Radix listés comme non utilisés : **souvent faux** si utilisés via composants shadcn dupliqués ou chemins non indexés. Vérifier `src/components/ui/*` avant retrait.

- `@radix-ui/react-avatar`, `react-collapsible`, `react-scroll-area`, `react-separator`, `react-switch`, `react-tooltip` — **à vérifier** (`risque: moyen`).

## Exports réellement peu utilisés (candidats à nettoyage documenté)

- **`src/lib/learningPath.ts`** : exports `completeLesson`, `getUserFullProgress`, `isLessonUnlocked`, etc. — **non référencés par des composants `.tsx`** au moment de l’audit. Indique plutôt une **fonctionnalité pas encore branchée UI** qu’un mort : **ne pas supprimer** tant que le parcours Duolingo n’est pas livré.

## Script utile

```bash
npm run knip
npm run docs:audit-deadcode
```

Mettre à jour ce fichier après chaque passe de suppression validée.
