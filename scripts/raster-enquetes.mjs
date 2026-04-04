/**
 * Rasterise les PDF d'enquêtes FIOPJ en PNG (documents scannés).
 * Usage : node scripts/raster-enquetes.mjs
 * Sources : dossier ENQUETES_SOURCE_DIR ou public/enquetes/*.pdf
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'enquetes', 'raster');
const PDF_DIR = path.join(ROOT, 'public', 'enquetes');

const SCALE = 2;

const JOBS = [
  { key: 'alpha-sujet', file: 'alpha-sujet.pdf' },
  { key: 'alpha-articulation', file: 'alpha-articulation.pdf' },
  { key: 'alpha-pv-plainte', file: 'alpha-pv-plainte.pdf' },
  { key: 'alpha-rapport', file: 'alpha-rapport.pdf' },
  { key: 'bravo-sujet', file: 'bravo-sujet.pdf' },
  { key: 'bravo-articulation', file: 'bravo-articulation.pdf' },
  { key: 'bravo-articulation-suite', file: 'bravo-articulation-suite.pdf' },
  { key: 'bravo-rapport', file: 'bravo-rapport.pdf' },
];

async function rasterPdf(absPath, baseName) {
  const buf = fs.readFileSync(absPath);
  const parser = new PDFParse({ data: buf });
  const shot = await parser.getScreenshot({
    scale: SCALE,
    imageBuffer: true,
  });
  await parser.destroy();

  const paths = [];
  for (const page of shot.pages) {
    const num = page.pageNumber;
    const outPath = path.join(OUT_DIR, `${baseName}-p${num}.png`);
    fs.writeFileSync(outPath, Buffer.from(page.data));
    paths.push(outPath);
  }
  return paths.length;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const job of JOBS) {
    const abs = path.join(PDF_DIR, job.file);
    if (!fs.existsSync(abs)) {
      console.warn('Missing PDF, skip:', abs);
      continue;
    }
    const n = await rasterPdf(abs, job.key);
    console.log(job.key, '→', n, 'page(s)');
  }
  console.log('Done. PNG dans public/enquetes/raster/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
