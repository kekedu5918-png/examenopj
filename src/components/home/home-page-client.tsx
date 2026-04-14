'use client';

import dynamic from 'next/dynamic';

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
  { loading: () => <div className='min-h-[160px]' aria-hidden /> },
);
const HomeFinalPricingSection = dynamic(
  () => import('@/components/home/sections/home-refonte-sections').then((m) => m.HomeFinalPricingSection),
  { loading: () => <div className='min-h-[200px]' aria-hidden /> },
);
const HomeProgrammeCompletSection = dynamic(
  () => import('@/components/home/sections/home-refonte-sections').then((m) => m.HomeProgrammeCompletSection),
  { loading: () => <div className='min-h-[120px]' aria-hidden /> },
);

export type HomePageClientProps = {
  infractionPreview: InfractionPreviewItem[];
};

export function HomePageClient({ infractionPreview }: HomePageClientProps) {
  return (
    <>
      <HeroSection />
      <HomeJourneyStrip />
      <HomeStatsSection />
      <StartHereSection />
      <TerrainOriginSection />
      <HomeEnquetesPillarSection />
      <HomeEpreuvesLandingSection />
      <HomeTestimonialsSection />
      <HomeFinalPricingSection />
      <HomeProgrammeCompletSection items={infractionPreview} />
    </>
  );
}
