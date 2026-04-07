# Audit fascicule par fascicule (SDCP)

Chaque fichier `Fxx.md` résume le lien entre le PDF dans `reference/fascicules/`, le récapitulatif site et le fichier agrégé `../infractions_officielles.json`.

**Régénérer le JSON** après modification du récap TypeScript :

```bash
npm run audit:infractions
```

Les entrées **F08 à F15** ne sont pas des listes d’infractions dans le référentiel « infractions » du site : ce sont des fascicules **procéduraux ou transverses** (libertés, loi pénale, sanction, cadres PJ, instruction, juridictions, AP/AC/PJ, nullités). Le détail utile à l’examen est partiellement couvert dans **Fondamentaux** et les modules cours.
