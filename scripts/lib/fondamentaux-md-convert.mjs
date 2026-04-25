/**
 * Convertit le texte brut d'un chapitre PDF (marqueur CHAPITRE n) en markdown GFM simplifié.
 */
export function parseHeaderLine(firstLine) {
  const m = firstLine?.match(/^CHAPITRE\s+(\d+)\s+—\s*(.+)$/);
  if (!m) return { num: 0, title: (firstLine || '').replace(/^CHAPITRE\s+\d+\s+/, '').trim() };
  return { num: +m[1], title: m[2].trim() };
}

/**
 * @param {string} cleaned
 * @param {{ titre: string }} meta
 * @returns {string}
 */
export function bodyToMarkdown(cleaned, meta) {
  const lines = cleaned.split('\n').map((l) => l.trim());
  const out = [];
  let i = 0;
  if (lines[0]?.startsWith('CHAPITRE ')) {
    i = 1;
  }
  out.push(`# ${meta.titre}\n\n`);
  if (i < lines.length && /^n\s+Articles\s/i.test(lines[i])) {
    out.push(`*${lines[i].replace(/^n\s+/, '')}*\n\n`);
    i += 1;
  }

  const buf = [];
  const flush = () => {
    if (buf.length) {
      out.push(reflowBuffer(buf) + '\n\n');
      buf.length = 0;
    }
  };

  for (; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      flush();
      continue;
    }

    const sub = line.match(/^(\d{1,2}\.\d{1,2})\s+(.+)$/);
    if (sub) {
      flush();
      out.push(`## ${sub[1]} ${sub[2]}\n\n`);
      continue;
    }

    if (/^n\s+/i.test(line)) {
      flush();
      const block = [line];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const L = lines[j];
        if (!L) continue;
        if (/^(\d{1,2}\.\d{1,2})\s+/.test(L)) break;
        if (/^n\s/i.test(L)) break;
        block.push(L);
      }
      const merged = reflowBuffer(block.map((b) => b.replace(/^n\s+/i, '')));
      out.push('> ' + merged + '\n\n');
      i = j - 1;
      continue;
    }

    if (/^schéma\s+\d/i.test(line) || /^tableau\s+\d?/i.test(line)) {
      flush();
      out.push(`*${line}*\n\n`);
      continue;
    }

    buf.push(line);
  }
  flush();
  return out.join('').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function reflowBuffer(buf) {
  return buf
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,;:.!?])/g, '$1')
    .trim();
}
