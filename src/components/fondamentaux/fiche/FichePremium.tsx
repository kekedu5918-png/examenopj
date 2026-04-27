'use client';

import type { ComponentProps, ReactNode } from 'react';

import type { FicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';

import { FicheAccordion, type FicheAccordionItem } from './FicheAccordion';
import { FicheArticlesCles } from './FicheArticlesCles';
import { FicheBlocsSynthese } from './FicheBlocsSynthese';
import { FicheCallout30s } from './FicheCallout30s';
import { FicheFooterCTA } from './FicheFooterCTA';
import { FicheHero } from './FicheHero';
import { FicheSchemaMemo } from './FicheSchemaMemo';
import { FicheStatsGlass } from './FicheStatsGlass';
import { FicheTabs } from './FicheTabs';
import { FicheTimeline } from './FicheTimeline';

const FICHE_HERO_TITLE_ID = 'fiche-hero-title';

export type FichePremiumProps = {
  data: FicheFrontmatterV3;
  slug: string;
  children?: ReactNode;
  /** Texte court pour l’encart 30 s (souvent dérivé du corpus). */
  callout30s?: string;
  breadcrumbItems: ComponentProps<typeof FicheHero>['breadcrumbItems'];
  quizHref?: string;
  footerCtas?: ComponentProps<typeof FicheFooterCTA>['ctas'];
  readingProgress?: number;
  heroDureeIndicative?: string;
  /** Sections « plan détaillé » (accordéons) — alimentées par le frontmatter ou le loader MD. */
  accordionItems?: FicheAccordionItem[];
};

export function FichePremium({
  data,
  slug,
  children,
  callout30s,
  breadcrumbItems,
  quizHref,
  footerCtas,
  readingProgress,
  heroDureeIndicative,
  accordionItems,
}: FichePremiumProps) {
  return (
    <main
      aria-labelledby={FICHE_HERO_TITLE_ID}
      className='mx-auto max-w-4xl px-4 py-8'
      data-testid='fiche-premium'
    >
      <FicheHero
        title={data.title}
        description={data.description}
        chapitre={data.chapitre}
        partie={data.partie}
        loi2025={data.loi2025}
        breadcrumbItems={breadcrumbItems}
        dureeIndicative={heroDureeIndicative}
      />

      <FicheStatsGlass stats={data.stats} />

      <FicheTabs slug={slug} quizHref={quizHref} />

      {callout30s ? <FicheCallout30s text={callout30s} /> : null}

      <FicheSchemaMemo schema={data.schemaMemo} />

      <FicheArticlesCles articles={data.articlesCles} />

      <FicheBlocsSynthese blocs={data.blocs} />

      {data.timeline?.length ? <FicheTimeline items={data.timeline} /> : null}

      {accordionItems?.length ? <FicheAccordion items={accordionItems} /> : null}

      {children ? (
        <div id='fiche-cours' className='mt-10 scroll-mt-24'>
          {children}
        </div>
      ) : null}

      {footerCtas?.length ? (
        <FicheFooterCTA progress={readingProgress} ctas={footerCtas} />
      ) : null}
    </main>
  );
}
