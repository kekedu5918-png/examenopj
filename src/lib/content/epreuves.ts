import { readMarkdownFile } from '@/lib/content/markdown';

export async function getEpreuveDocument(slug: string) {
  return readMarkdownFile(`epreuves/${slug}.md`);
}
