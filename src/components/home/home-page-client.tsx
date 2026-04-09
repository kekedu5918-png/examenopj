'use client';

import { HeroSection } from '@/components/home/sections/hero-section';
import {
  HomeEnquetesPillarSection,
  HomeEpreuvesLandingSection,
  HomeFinalPricingSection,
  HomeProgrammeCompletSection,
  HomeTestimonialsSection,
  type InfractionPreviewItem,
  StartHereSection,
  TerrainOriginSection,
} from '@/components/home/sections/home-refonte-sections';
import { HomeStatsSection } from '@/components/home/sections/home-stats-section';

export type HomePageClientProps = {
  infractionPreview: InfractionPreviewItem[];
};

export function HomePageClient({ infractionPreview }: HomePageClientProps) {
  return (
    <>
      <HeroSection />
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
