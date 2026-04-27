import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { parseFicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';

const COURS_DIR = path.join(process.cwd(), 'content/cours');

describe('Fiches fondamentaux — frontmatter V3 (46 chapitres)', () => {
  const files = fs.readdirSync(COURS_DIR).filter((f) => f.endsWith('.md'));

  it('compte exactement 46 fiches', () => {
    expect(files).toHaveLength(46);
  });

  for (const file of files.sort()) {
    it(`parse Zod OK — ${file}`, () => {
      const raw = fs.readFileSync(path.join(COURS_DIR, file), 'utf8');
      const { data } = matter(raw);
      const r = parseFicheFrontmatterV3(data);
      expect(r.success, r.success ? '' : JSON.stringify(r.error.format(), null, 2)).toBe(true);
    });
  }
});
