import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { contentPath } from '@/lib/content/paths';

export type ParsedMarkdown = {
  data: Record<string, unknown>;
  content: string;
};

export async function readMarkdownFile(relPathFromContent: string): Promise<ParsedMarkdown> {
  const full = contentPath(relPathFromContent);
  const raw = await fs.readFile(full, 'utf8');
  return matter(raw);
}

export async function listMarkdownBasenames(dirRel: string): Promise<string[]> {
  const dir = contentPath(dirRel);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => path.basename(e.name, '.md'));
}

export function slugFromBasename(basename: string): string {
  return basename.toLowerCase();
}
