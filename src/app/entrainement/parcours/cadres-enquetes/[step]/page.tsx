import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { CadresStepExperience } from '@/components/parcours/cadres/CadresStepExperience';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { CADRES_STEPS, cadresMarkdownPath, type CadresStepSlug } from '@/data/parcours-cadres-enquetes';
import { getSession } from '@/features/account/controllers/get-session';
import { fetchCadresProgressMap } from '@/features/parcours/cadres-progress';
import { readMarkdownFile } from '@/lib/content/markdown';

type Props = { params: { step: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = CADRES_STEPS.find((s) => s.slug === params.step);
  if (!meta) return { title: 'Parcours' };
  return {
    title: `${meta.title} — Cadres d’enquête`,
    description: meta.subtitle,
  };
}

export default async function CadresEnquetesStepPage({ params }: Props) {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect(`/login?next=${encodeURIComponent(`/entrainement/parcours/cadres-enquetes/${params.step}`)}`);
  }

  const meta = CADRES_STEPS.find((s) => s.slug === params.step);
  if (!meta) notFound();

  const { content } = await readMarkdownFile(cadresMarkdownPath(meta.slug as CadresStepSlug));
  const progress = await fetchCadresProgressMap(session.user.id);

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.parcours} pad='default'>
      <CadresStepExperience step={meta} markdown={content} progress={progress} />
    </InteriorPageShell>
  );
}
