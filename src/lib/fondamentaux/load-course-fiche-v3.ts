import { readMarkdownFile } from '@/lib/content/markdown';
import { type FicheFrontmatterV3, parseFicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { splitMarkdownByH2, stripLeadingH1 } from '@/lib/fondamentaux/split-markdown-h2';

export type CourseFicheV3Payload = {
  data: FicheFrontmatterV3;
  /** Corps MD source (inclut le H1). */
  rawContent: string;
  /** Corps sans H1 (secours si aucune section H2). */
  courseMarkdown: string;
  accordionSections: Array<{ id: string; title: string; bodyMd: string }>;
};

/** @deprecated Utiliser `loadCourseFicheV3`. */
export type PilotFicheV3Payload = CourseFicheV3Payload;

/**
 * Charge une fiche fondamentaux au format V3 si le frontmatter valide le schéma Zod.
 * Sinon retourne `null` (rendu Markdown legacy).
 */
export async function loadCourseFicheV3(basename: string): Promise<CourseFicheV3Payload | null> {
  const { data, content } = await readMarkdownFile(`cours/${basename}.md`);
  const parsed = parseFicheFrontmatterV3(data);
  if (!parsed.success) return null;

  const body = stripLeadingH1(content);
  const accordionSections = splitMarkdownByH2(body);

  return {
    data: parsed.data,
    rawContent: content,
    courseMarkdown: body,
    accordionSections,
  };
}

/** @deprecated Alias `loadCourseFicheV3`. */
export const loadPilotFicheV3 = loadCourseFicheV3;
