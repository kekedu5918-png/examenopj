/**
 * Lit tools/elite-chapters-raw.js (copie de OPJ Elite) et écrit src/data/elite-lecons-content.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPath = join(__dirname, 'elite-chapters-raw.js');
const outPath = join(root, 'src', 'data', 'elite-lecons-content.json');

const code = readFileSync(srcPath, 'utf8');
const chapters = new Function(`${code}\nreturn CHAPTERS;`)();

writeFileSync(outPath, JSON.stringify(chapters, null, 2), 'utf8');
console.log('OK', outPath, 'chapters:', chapters.length);
