# REFACTOR — pistes ciblées (non bloquant)

Ce document complète l’audit produit : il liste des refactorings **optionnels** pour la maintenabilité, sans engagement de roadmap.

## Layout et fond d’écran

| Fichier | Problème | Piste |
|---------|----------|-------|
| `src/app/layout.tsx` | Beaucoup de structure inline | Déjà partiellement extrait (`SiteBackground`, `AnalyticsProviders`) ; garder le layout léger |

## Composants « god » clients

| Fichier / zone | Problème | Piste |
|----------------|----------|-------|
| Grosses pages `*PageClient.tsx` | Fichiers &gt; 300 lignes | Découper en sous-composants + hooks (`useQuizState`, etc.) |
| `PricingThreeColumnPage` | Logique checkout + présentation | Extraire `useStripeCheckout(price)` si la logique grossit |

## Analytics

| Fichier | Problème | Piste |
|---------|----------|-------|
| `TrackOnMount` | Props `properties` non suivies dans les deps | Si besoin de props dynamiques, passer une clé sérialisée JSON ou `useRef` |

## Commandes utiles

- Analyse bundle : `npm run analyze`
- Dead code : `npm run knip` puis `npm run docs:audit-deadcode`
