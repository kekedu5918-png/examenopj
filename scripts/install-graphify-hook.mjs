/**
 * Copie scripts/git-hooks/post-commit vers .git/hooks/post-commit (UTF-8 / Windows-safe).
 * Usage : npm run hooks:graphify
 */
import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'scripts', 'git-hooks', 'post-commit');
const destDir = join(root, '.git', 'hooks');
const dest = join(destDir, 'post-commit');

if (!existsSync(join(root, '.git'))) {
  console.warn('[install-graphify-hook] Pas de depot git, abandon.');
  process.exit(0);
}

if (!existsSync(src)) {
  console.error('[install-graphify-hook] Fichier source manquant:', src);
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
try {
  chmodSync(dest, 0o755);
} catch {
  /* Windows : chmod optionnel */
}
console.log('[install-graphify-hook] Installe .git/hooks/post-commit (UTF-8 graphify).');
