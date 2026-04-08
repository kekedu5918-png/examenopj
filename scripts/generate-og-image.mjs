/**
 * Génère public/og-image.png (1200×630) pour les balises Open Graph.
 * Dépendance : sharp (devDependency).
 */
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public');
const outFile = path.join(outDir, 'og-image.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617"/>
      <stop offset="55%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e1b4b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="72" y="200" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="76" font-weight="800" fill="#f8fafc" letter-spacing="-0.03em">ExamenOPJ</text>
  <text x="72" y="290" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="38" fill="#94a3b8">Préparation OPJ 2026</text>
  <text x="72" y="380" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="26" fill="#64748b" font-weight="600">Cours · Quiz · Flashcards · Méthodologie</text>
  <rect x="72" y="440" width="120" height="6" rx="3" fill="#4f6ef7"/>
</svg>`;

await mkdir(outDir, { recursive: true });
const buf = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(outFile, buf);
console.log('Wrote', outFile);
