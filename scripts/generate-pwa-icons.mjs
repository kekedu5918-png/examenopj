/**
 * Génère public/icons/icon-{192,512}.png.
 * Si présent : public/icons/logo-source.png OU scripts/logo-source.png (priorité aux deux dans cet ordre).
 * Sinon : placeholder SVG (« E ») — à remplacer par un PNG carré.
 * Usage : npm run pwa:icons
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'icons');
const bgRgb = { r: 15, g: 17, b: 23, alpha: 1 };

function findLogoSource() {
  const paths = [
    path.join(root, 'public', 'icons', 'logo-source.png'),
    path.join(root, 'scripts', 'logo-source.png'),
  ];
  return paths.find((p) => fs.existsSync(p));
}

await fs.promises.mkdir(outDir, { recursive: true });

const logoPath = findLogoSource();

if (logoPath) {
  const buf = await fs.promises.readFile(logoPath);
  for (const size of [512, 192]) {
    await sharp(buf)
      .resize(size, size, {
        fit: 'contain',
        position: 'center',
        background: bgRgb,
      })
      .png()
      .toFile(path.join(outDir, `icon-${size}x${size}.png`));
  }
  console.log(`Icônes PWA générées depuis ${logoPath}`);
} else {
  const svg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0F1117"/>
  <text x="256" y="312" font-family="system-ui,sans-serif" font-size="160" font-weight="700"
    fill="#E8EDF8" text-anchor="middle">E</text>
</svg>`;
  const svgBuf = Buffer.from(svg.trim());
  for (const size of [512, 192]) {
    await sharp(svgBuf).resize(size, size).png().toFile(path.join(outDir, `icon-${size}x${size}.png`));
  }
  console.log('Icônes PWA placeholder (sans logo-source.png) → public/icons/');
}
