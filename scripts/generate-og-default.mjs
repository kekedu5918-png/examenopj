import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const W = 1200;
const H = 630;
const out = join(process.cwd(), 'public', 'og-default.png');

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4F6EF7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3D5CE8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0A0A0F"/>
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="url(#bar)"/>
  <text x="600" y="260" text-anchor="middle" fill="#F0F0F5" font-family="system-ui, Segoe UI, sans-serif" font-size="72" font-weight="800" letter-spacing="-0.04em">EXAMENOPJ</text>
  <text x="600" y="340" text-anchor="middle" fill="#8888A0" font-family="system-ui, Segoe UI, sans-serif" font-size="28" font-weight="500">Préparation Examen OPJ — Juin 2026</text>
</svg>
`;

const buf = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(out, buf);
// eslint-disable-next-line no-console
console.log('Wrote', out);
