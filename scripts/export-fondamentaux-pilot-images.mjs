/**
 * 2F.1.a — exporte des captures PNG du PDF, converties en JPEG pour public/fondamentaux/.
 * Pages choisies : schéma / page représentative par chapitre pilote.
 */
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const root = process.cwd();
const pdfPath = path.join(root, 'content/_sources/fondamentaux-2026/FONDAMENTAUX.pdf');
const outDir = path.join(root, 'public/fondamentaux');

const shots = [
  { page: 6, out: 'enquete-flagrance-schema-timeline.jpg' },
  { page: 41, out: 'causes-irresponsabilite-attenuation-p41.jpg' },
  { page: 53, out: 'viol-agressions-sexuelles-schema-2025.jpg' },
];

const buf = await fs.readFile(pdfPath);
const parser = new PDFParse({ data: buf });
await fs.mkdir(outDir, { recursive: true });

for (const { page, out } of shots) {
  const r = await parser.getScreenshot({ partial: [page], scale: 1.2, imageDataUrl: false, imageBuffer: true });
  const p = r.pages[0];
  if (!p?.data) throw new Error(`No screenshot for page ${page}`);
  const jpeg = await sharp(Buffer.from(p.data)).jpeg({ quality: 86 }).toBuffer();
  const dest = path.join(outDir, out);
  await fs.writeFile(dest, jpeg);
  console.log('wrote', path.relative(root, dest), jpeg.length, 'bytes');
}
await parser.destroy();
