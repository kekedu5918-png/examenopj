import { listMarkdownBasenames, readMarkdownFile, slugFromBasename } from '@/lib/content/markdown';

export type CourseSummary = {
  slug: string;
  title: string;
  tags: string[];
};

export async function getCourseSummaries(): Promise<CourseSummary[]> {
  const basenames = await listMarkdownBasenames('cours');
  const out: CourseSummary[] = [];
  for (const base of basenames) {
    const { data } = await readMarkdownFile(`cours/${base}.md`);
    const title = typeof data.title === 'string' ? data.title : base.replace(/-/g, ' ');
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === 'string')
      : [];
    out.push({ slug: slugFromBasename(base), title, tags });
  }
  return out.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
}

export async function resolveCourseBasename(slug: string): Promise<string | null> {
  const basenames = await listMarkdownBasenames('cours');
  for (const b of basenames) {
    if (slugFromBasename(b) === slug.toLowerCase()) return b;
  }
  return null;
}
