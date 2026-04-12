/**
 * Régénère la section « Sortie knip brutes » dans docs/DEADCODE.md.
 * Usage : node scripts/generate_audit_docs.mjs
 */
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'docs', 'DEADCODE.md');

let knipBody =
  '_Exécutez `npm run knip` à la racine du dépôt et remplacez ce bloc par la sortie._';

try {
  const raw = execSync('npx --yes knip --no-progress', {
    cwd: root,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 5 * 1024 * 1024,
  });
  if (raw.trim()) knipBody = '```\n' + raw.trim() + '\n```';
} catch {
  /* knip / npx indisponible */
}

const template = `# DEADCODE — rapport knip

Ce fichier est alimenté par **\`npm run docs:audit-deadcode\`** (sortie knip + squelette ci-dessous).

## Tableau de suivi (à compléter après revue humaine)

| Fichier / symbole | Outil | Action proposée | Risque suppression |
|-------------------|-------|-----------------|-------------------|
| *(exécuter \`npm run knip\` et recopier les lignes ici)* | knip | Vérifier \`rg\` / import dynamique | Faux positifs fréquents |

## Sortie knip brutes

${knipBody}

## Interprétation

- **Ne pas supprimer** les fichiers référencés dynamiquement (import dynamique, routes, CMS, scripts one-off).
- Recouper chaque entrée avec une recherche (\`rg\`) avant suppression.

`;

mkdirSync(join(root, 'docs'), { recursive: true });
writeFileSync(outPath, template, 'utf8');
console.log('Wrote', outPath);
