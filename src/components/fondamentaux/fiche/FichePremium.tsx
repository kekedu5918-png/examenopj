'use client';

import { useSyncExternalStore } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

import { MarkdownArticle } from '@/components/content/MarkdownArticle';
import type { FicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';

import { fadeUpVariants, staggerContainerVariants } from './fiche-motion';
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

function subscribePrefersReducedMotion(onStoreChange: () => void) {
  if (typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getPrefersReducedMotionClient() {
  if (typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export type FichePremiumProps = {
  data: FicheFrontmatterV3;
  slug: string;
  /** Remplace le préfixe `/fondamentaux/<slug>` pour la barre d’ancres (preview DS). */
  tabsBasePath?: string;
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
  /** Découpe H2 du cours : chaque section est rendue en markdown dans un accordéon. */
  accordionMarkdownSections?: Array<{ id: string; title: string; bodyMd: string }>;
};

export function FichePremium({
  data,
  slug,
  tabsBasePath,
  children,
  callout30s,
  breadcrumbItems,
  quizHref,
  footerCtas,
  readingProgress,
  heroDureeIndicative,
  accordionItems,
  accordionMarkdownSections,
}: FichePremiumProps) {
  const mediaReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionClient,
    () => false,
  );

  const accordionMarkdownItems: FicheAccordionItem[] | undefined = accordionMarkdownSections?.length
    ? accordionMarkdownSections.map((s) => ({
        id: s.id,
        title: s.title,
        content: (
          <MarkdownArticle
            markdown={s.bodyMd}
            className='prose prose-sm prose-invert max-w-none prose-headings:font-sans prose-p:text-ij-text-muted prose-li:text-ij-text-muted prose-strong:text-ij-text prose-a:text-violet-300 prose-li:marker:text-violet-400'
          />
        ),
      }))
    : undefined;

  const resolvedAccordion =
    accordionItems?.length ? accordionItems : accordionMarkdownItems?.length ? accordionMarkdownItems : undefined;

  return (
    <MotionConfig reducedMotion='user'>
      <main
        aria-labelledby={FICHE_HERO_TITLE_ID}
        className='mx-auto max-w-4xl px-4 py-8'
        data-testid='fiche-premium'
        data-reduced-motion={mediaReducedMotion ? 'true' : 'false'}
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

        <motion.div variants={staggerContainerVariants} initial='hidden' animate='visible'>
          <motion.div variants={fadeUpVariants}>
            <FicheStatsGlass stats={data.stats} />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <FicheTabs slug={slug} basePath={tabsBasePath} quizHref={quizHref} />
          </motion.div>

          {callout30s ? (
            <motion.div variants={fadeUpVariants}>
              <FicheCallout30s text={callout30s} />
            </motion.div>
          ) : null}

          <motion.div variants={fadeUpVariants}>
            <FicheSchemaMemo schema={data.schemaMemo} />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <FicheArticlesCles articles={data.articlesCles} />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <FicheBlocsSynthese blocs={data.blocs} />
          </motion.div>

          {data.timeline?.length ? (
            <motion.div variants={fadeUpVariants}>
              <FicheTimeline items={data.timeline} />
            </motion.div>
          ) : null}

          {resolvedAccordion?.length ? (
            <motion.div variants={fadeUpVariants}>
              <FicheAccordion items={resolvedAccordion} />
            </motion.div>
          ) : null}

          {children ? (
            <motion.div variants={fadeUpVariants}>
              <div id='fiche-cours' className='mt-10 scroll-mt-24'>
                {children}
              </div>
            </motion.div>
          ) : null}

          {footerCtas?.length ? (
            <motion.div variants={fadeUpVariants}>
              <FicheFooterCTA progress={readingProgress} ctas={footerCtas} />
            </motion.div>
          ) : null}
        </motion.div>
      </main>
    </MotionConfig>
  );
}
