/**
 * Phase 2G.0 — Rapport HTML audit corpus fondamentaux (lecture seule).
 * Usage : node scripts/audit-2g0-corpus.mjs
 * Sortie : docs/audits/2g0-rapport-corpus.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const coursDir = path.join(root, 'content', 'cours');
const outFile = path.join(root, 'docs', 'audits', '2g0-rapport-corpus.html');
const fondamentauxPublic = path.join(root, 'public', 'fondamentaux');

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const GFM_SEP_RE = /^\s*\|?(\s*:?-+\s*\|)+[\s-:|]+$/m;

function countGfmTableBlocks(body) {
  const lines = body.split('\n');
  let n = 0;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.includes('|') && i + 1 < lines.length) {
      const next = lines[i + 1].trim();
      if (GFM_SEP_RE.test(next) || /^\s*\|?[\s\-:|]+\|/.test(next)) {
        n += 1;
        i += 2;
        while (i < lines.length && lines[i].trim().startsWith('|')) i += 1;
        continue;
      }
    }
    i += 1;
  }
  return n;
}

function paragraphBlocks(body) {
  const raw = body.replace(/\r\n/g, '\n').trim();
  if (!raw) return [];
  return raw.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
}

function paragraphLineStats(body) {
  let maxL = 0;
  let countOver6 = 0;
  for (const block of paragraphBlocks(body)) {
    if (block.startsWith('```')) continue;
    if (/^#{1,6}\s/m.test(block) && block.split('\n').length === 1) continue;
    if (/^\s*\|/.test(block) && block.includes('\n|')) continue;
    const lineCount = block.split('\n').length;
    if (lineCount > maxL) maxL = lineCount;
    if (lineCount > 6) countOver6 += 1;
  }
  return { maxL, countOver6 };
}

function collectAllParagraphsForTop(body, slug) {
  const out = [];
  for (const block of paragraphBlocks(body)) {
    if (block.startsWith('```')) continue;
    if (block.length < 80) continue;
    if (/^\s*\|/.test(block) && GFM_SEP_RE.test(block)) continue;
    out.push({ slug, text: block, len: block.length, lines: block.split('\n').length });
  }
  return out;
}

function qualityScore(row) {
  if (row.images > 0 || row.dupH1 || row.parasOver6Lines > 0 || row.descLen > 300) return 'cassé';
  if (row.descLen > 200) return 'moyen';
  if (row.maxParLines > 5) return 'moyen';
  if (row.gfmTables === 0 && row.bodyLen > 5000) return 'moyen';
  if (row.hasArticlesCites) return 'moyen';
  return 'propre';
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function main() {
  const files = fs
    .readdirSync(coursDir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'fr'));

  const rows = [];
  const allPara = [];
  let totalImages = 0;
  const referencedJpgs = new Set();

  for (const f of files) {
    const full = path.join(coursDir, f);
    const raw = fs.readFileSync(full, 'utf8');
    const { data, content: body } = matter(raw);
    const slug = f.replace(/\.md$/i, '').toLowerCase();
    const images = (body.match(IMG_RE) || []).length;
    totalImages += images;
    for (const m of body.matchAll(IMG_RE)) {
      const url = m[2].replace(/^<|>$/g, '').split(' ')[0];
      if (url.includes('fondamentaux') && url.endsWith('.jpg')) {
        const base = path.basename(url.split('?')[0]);
        referencedJpgs.add(base);
      }
    }
    const gfmTables = countGfmTableBlocks(body);
    const { maxL: maxParLines, countOver6: parasOver6Lines } = paragraphLineStats(body);
    allPara.push(...collectAllParagraphsForTop(body, slug));
    const firstLine = body.replace(/^\s*/, '').split('\n')[0] || '';
    const dupH1 = /^#\s+/.test(firstLine);
    const desc = data.description;
    const descLen = typeof desc === 'string' ? desc.length : 0;
    const hasArticlesCites = data.articlesCites != null && (Array.isArray(data.articlesCites) ? data.articlesCites.length > 0 : true);

    const row = {
      slug,
      file: f,
      images,
      gfmTables,
      maxParLines,
      parasOver6Lines,
      dupH1,
      descLen,
      hasArticlesCites,
      bodyLen: body.length,
    };
    row.score = qualityScore(row);
    rows.push(row);
  }

  allPara.sort((a, b) => b.len - a.len);
  const top10 = allPara.slice(0, 10);

  let nPropre = 0;
  let nMoyen = 0;
  let nCasse = 0;
  for (const r of rows) {
    if (r.score === 'propre') nPropre++;
    else if (r.score === 'moyen') nMoyen++;
    else nCasse++;
  }

  let jpgsOnDisk = [];
  if (fs.existsSync(fondamentauxPublic)) {
    jpgsOnDisk = fs.readdirSync(fondamentauxPublic).filter((x) => x.toLowerCase().endsWith('.jpg'));
  }
  const orphanJpgs = jpgsOnDisk.filter((j) => !referencedJpgs.has(j));
  const totalOrphans = orphanJpgs.length;
  const totalRef = referencedJpgs.size;

  const genAt = new Date().toISOString();
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>2G.0 — Audit corpus fondamentaux (pré-refonte)</title>
  <style>
    :root { font-family: system-ui, sans-serif; line-height: 1.4; }
    body { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; color: #111; }
    h1 { font-size: 1.4rem; }
    h2 { font-size: 1.1rem; margin-top: 2rem; }
    .meta { color: #444; font-size: 0.9rem; margin: 0.5rem 0 1.5rem; }
    .summary { background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 1rem 1.25rem; }
    .summary table { width: 100%; border-collapse: collapse; }
    .summary th, .summary td { text-align: left; padding: 0.35rem 0.5rem; border-bottom: 1px solid #e0e0e0; }
    .ok { color: #0a0; }
    .mid { color: #a60; }
    .bad { color: #a00; }
    table.grid { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
    table.grid th, table.grid td { border: 1px solid #ccc; padding: 0.4rem; vertical-align: top; }
    table.grid th { background: #eee; }
    tr.score-propre { background: #f0fff4; }
    tr.score-moyen { background: #fff8f0; }
    tr.score-casse { background: #fff0f0; }
    .excerpt { font-size: 0.75rem; color: #333; }
    .note { font-size: 0.85rem; color: #666; }
  </style>
</head>
<body>
  <h1>Phase 2G.0 — Rapport d’audit du corpus (pré-refonte)</h1>
  <p class="meta">Généré le ${esc(genAt)} — lecture seule sur <code>content/cours/*.md</code> — <strong>${rows.length}</strong> fiche(s) auditée(s)</p>
  <p class="note">Règles de score (estimé) : <span class="bad">cassé</span> si images, doublon H1 (1ʳᵉ ligne du corps = <code>#</code>), au moins un bloc « paragraphe » &gt; 6 lignes, ou <code>description</code> &gt; 300 car. ; <span class="mid">moyen</span> si description &gt; 200, max lignes/par. &gt; 5, pas de tableau GFM sur long corps, ou <code>articlesCites</code> (legacy) ; sinon <span class="ok">propre</span>. Les listes / blockquotes comptent comme des blocs (même heuristique par double saut de ligne).</p>

  <h2>Synthèse</h2>
  <div class="summary">
    <table>
      <tr><th>Fiches — score « propre »</th><td class="ok">${nPropre}</td></tr>
      <tr><th>Fiches — score « moyen »</th><td class="mid">${nMoyen}</td></tr>
      <tr><th>Fiches — score « cassé »</th><td class="bad">${nCasse}</td></tr>
      <tr><th>Total références <code>![](…)</code> (tous chemins) dans le corps</th><td>${totalImages}</td></tr>
      <tr><th>Fichiers <code>public/fondamentaux/*.jpg</code> référencés (nom de fichier)</th><td>${totalRef}</td></tr>
      <tr><th>Fichiers <code>*.jpg</code> orphelins (présents sur disque, non référés par aucune fiche)</th><td>${totalOrphans}</td></tr>
    </table>
  </div>

  <h2>Top 10 des blocs (paragraphes) les plus longs (caractères)</h2>
  <p class="note">Extrait 100 premiers caractères — à utiliser pour repérer « murs » de texte / tableaux écrasés.</p>
  <table class="grid">
    <thead>
      <tr>
        <th>Slug</th>
        <th>Car.</th>
        <th>Lignes</th>
        <th>Extrait (100 car.)</th>
      </tr>
    </thead>
    <tbody>
${top10
  .map(
    (p) => `      <tr>
        <td><code>${esc(p.slug)}</code></td>
        <td>${p.len}</td>
        <td>${p.lines}</td>
        <td class="excerpt">${esc(p.text.replace(/\s+/g, ' ').slice(0, 100))}…</td>
      </tr>`,
  )
  .join('\n')}
    </tbody>
  </table>

  <h2>Orphelins <code>public/fondamentaux/*.jpg</code> (hors référencement)</h2>
  <p class="note">${totalOrphans === 0 ? 'Aucun.' : 'Supprimer en 2G.4 si toujours orphelins.'}</p>
  ${
    orphanJpgs.length
      ? `<ul>${orphanJpgs.map((j) => `<li><code>${esc(j)}</code></li>`).join('')}</ul>`
      : '<p>(aucun)</p>'
  }

  <h2>Détail par fiche</h2>
  <table class="grid">
    <thead>
      <tr>
        <th>Slug</th>
        <th>Images</th>
        <th>Tableaux GFM</th>
        <th>Parag. &gt; 6 lignes</th>
        <th>Max lignes / bloc</th>
        <th>Doublon H1 (1ʳᵉ ligne)</th>
        <th>len(description)</th>
        <th>articlesCites (legacy)</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
${rows
  .map(
    (r) => `      <tr class="score-${r.score === 'cassé' ? 'casse' : r.score}">
        <td><code>${esc(r.slug)}</code></td>
        <td>${r.images}</td>
        <td>${r.gfmTables}</td>
        <td>${r.parasOver6Lines}</td>
        <td>${r.maxParLines}</td>
        <td>${r.dupH1 ? 'oui' : 'non'}</td>
        <td>${r.descLen}${r.descLen > 300 ? ' ⚠' : ''}</td>
        <td>${r.hasArticlesCites ? 'oui' : 'non'}</td>
        <td><strong>${esc(r.score)}</strong></td>
      </tr>`,
  )
  .join('\n')}
    </tbody>
  </table>

  <p class="note" style="margin-top:2rem;">Livrable : <code>docs/audits/2g0-rapport-corpus.html</code> — Regénérer : <code>node scripts/audit-2g0-corpus.mjs</code></p>
</body>
</html>
`;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
  console.log('Written:', outFile);
  console.log(`Fiches: ${rows.length} | propres: ${nPropre} | moyens: ${nMoyen} | cassés: ${nCasse} | images ref: ${totalImages} | jpg orphelins: ${totalOrphans}`);
}

main();
