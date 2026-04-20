'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

import {
  getHomeBelowHeroContainerVariants,
  getHomeBelowHeroItemVariants,
} from '@/components/home/home-landing-motion';
import { HeroSection } from '@/components/home/sections/hero-section';
import { HomeJourneyStrip } from '@/components/home/sections/home-journey-strip';
import {
  HomeEnquetesPillarSection,
  HomeEpreuvesLandingSection,
  type InfractionPreviewItem,
  StartHereSection,
  TerrainOriginSection,
} from '@/components/home/sections/home-refonte-sections';
import { HomeStatsSection } from '@/components/home/sections/home-stats-section';

const HomeTestimonialsSection = dynamic(
  () => import('@/components/home/sections/home-refonte-sections').then((m) => m.HomeTestimonialsSection),
  { loading: () => <div className='min-h-[160px] rounded-xl bg-ij-surface-2/20 ring-1 ring-ij-border/40' aria-hidden /> },
);
const HomeFinalPricingSection = dynamic(
  () => import('@/components/home/sections/home-refonte-sections').then((m) => m.HomeFinalPricingSection),
  { loading: () => <div className='min-h-[200px] rounded-xl bg-ij-surface-2/20 ring-1 ring-ij-border/40' aria-hidden /> },
);
const HomeProgrammeCompletSection = dynamic(
  () => import('@/components/home/sections/home-refonte-sections').then((m) => m.HomeProgrammeCompletSection),
  { loading: () => <div className='min-h-[120px] rounded-xl bg-ij-surface-2/20 ring-1 ring-ij-border/40' aria-hidden /> },
);

export type HomePageClientProps = {
  infractionPreview: InfractionPreviewItem[];
};

export function HomePageClient({ infractionPreview }: HomePageClientProps) {
  const shouldReduce = useReducedMotion();
  const belowHeroContainerVariants = getHomeBelowHeroContainerVariants(shouldReduce);
  const belowHeroItemVariants = getHomeBelowHeroItemVariants(shouldReduce);

  return (
    <>
      <HeroSection />
      <motion.div
        variants={belowHeroContainerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeJourneyStrip />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeStatsSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <StartHereSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <TerrainOriginSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeEnquetesPillarSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeEpreuvesLandingSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeTestimonialsSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeFinalPricingSection />
        </motion.div>
        <motion.div variants={belowHeroItemVariants} className='w-full'>
          <HomeProgrammeCompletSection items={infractionPreview} />
        </motion.div>
      </motion.div>
    </>
  );
}
