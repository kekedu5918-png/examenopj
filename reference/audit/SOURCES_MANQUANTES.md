# Sources d’audit

## Présents dans le dépôt

| Fichier | Usage |
|---------|--------|
| `reference/audit/fascicules/F01.txt` … `F17.txt` | Extraction infractions (F01–F07), cours verbatim (F09, F10 sur la page module), autres fascicules pour fondamentaux / relecture |
| `reference/audit/infractions_officielles.json` | Généré par `scripts/extract-infractions-fascicules.ts` |
| `reference/fascicules/*.pdf` | PDF officiels (dont cahier MAJ 2025, rapport de synthèse) |

## Hors dépôt ou non texte intégré

| Référence mission | Statut |
|-------------------|--------|
| `B7_02_RAPP_SYNT_1024.txt` | Exemple VERT/VILLA : voir `reference/fascicules/rapport-de-synthese-officiel.pdf` ; l’UI « Rapport de synthèse » utilise l’exemple PERPIGNAN issu de `F16.txt` si le modèle Clermont n’est pas fourni en .txt |
| `B0_ARTICUL_08242.txt` | Articulation BRAVO : données dans `src/data/enquetes/bravo-articulation-p1.ts` et `p2.ts` (à recaler sur PDF si besoin) |
| `Cours_Synthèse_Tableaux_denquête_de_flag.txt` | À ajouter pour rubrique fondamentaux « cadres d’enquête » si vous disposez du fichier formation |
| `Tableau_compétences_FD.txt` | Idem |
