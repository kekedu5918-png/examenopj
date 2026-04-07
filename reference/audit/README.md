# Audit fascicules — mode d’emploi

## Fichier `infractions_officielles.json`

### À quoi il sert ?

C’est la **base utilisée par le site** pour la page **Infractions** (`/infractions`) : titres, accroches, éléments II / III complets, circonstances aggravantes, répression, tentative / complicité.

Vous **n’avez pas besoin d’ouvrir ou d’éditer ce fichier à la main** pour utiliser le site : il est **importé au build** comme une dépendance de code (`src/data/infractions-officielles-catalog.ts`).

### Quand le régénérer ?

Regénérez le JSON **uniquement** si vous :

- mettez à jour les fichiers texte `reference/audit/fascicules/F01.txt` … `F07.txt` (nouvelle version SDCP, corrections OCR, etc.) ;
- voulez **repartir d’une extraction propre** après avoir modifié le script.

Commande :

```bash
npm run audit:extract-fascicules
```

Le fichier `reference/audit/infractions_officielles.json` est **écrasé**. Ensuite :

```bash
npm run build
```

pour vérifier que tout compile (le bundle Infractions inclut le JSON).

### Ancien script (récap TypeScript)

`npm run audit:infractions` lance encore `export-infractions-audit.ts` (récap historique). La **source officielle** du référentiel infractions en ligne est désormais l’**extracteur fascicules**, pas cet export.

### Fichiers utiles

| Fichier | Rôle |
|---------|------|
| `scripts/extract-infractions-fascicules.ts` | Extraction I–V depuis F01–F07 |
| `reference/audit/rapport_ecarts.md` | Journal de passage ancien récap → JSON |
| `reference/audit/SOURCES_MANQUANTES.md` | PDF / textes encore externes au dépôt |
