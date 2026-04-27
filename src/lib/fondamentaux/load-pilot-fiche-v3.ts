import { readMarkdownFile } from '@/lib/content/markdown';
import { type FicheFrontmatterV3, parseFicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { splitMarkdownByH2, stripLeadingH1 } from '@/lib/fondamentaux/split-markdown-h2';

/** Slugs pilotes Phase 2H — contenu V3 + `FichePremium` (URLs inchangées). */
export const FONDAMENTAUX_V3_PILOT_BASENAMES = [
  'enquete-flagrance',
  'causes-irresponsabilite-attenuation',
  'viol-agressions-sexuelles',
] as const;

export type FondamentauxV3PilotBasename = (typeof FONDAMENTAUX_V3_PILOT_BASENAMES)[number];

export type PilotFicheV3Payload = {
  data: FicheFrontmatterV3;
  /** Corps MD source (inclut le H1). */
  rawContent: string;
  /** Cours principal sans H1 (zone « Cours »). */
  courseMarkdown: string;
  accordionSections: Array<{ id: string; title: string; bodyMd: string }>;
};

export function isPilotFicheV3Basename(basename: string): basename is FondamentauxV3PilotBasename {
  return (FONDAMENTAUX_V3_PILOT_BASENAMES as readonly string[]).includes(basename);
}

/**
 * Charge une fiche pilote si le YAML valide le schéma V3.
 * Retourne `null` si ce n’est pas un pilote ou si le frontmatter n’est pas encore migré.
 */
export async function loadPilotFicheV3(basename: string): Promise<PilotFicheV3Payload | null> {
  if (!isPilotFicheV3Basename(basename)) return null;

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
