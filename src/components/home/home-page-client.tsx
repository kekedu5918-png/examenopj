'use client';

import { HeroSection } from '@/components/home/sections/hero-section';
import { HomeStatsSection } from '@/components/home/sections/home-stats-section';
import {
  HomeEnquetesPillarSection,
  HomeEpreuvesLandingSection,
  HomeFinalPricingSection,
  HomeProgrammeCompletSection,
  HomeTestimonialsSection,
  type InfractionPreviewItem,
  StartHereSection,
} from '@/components/home/sections/home-refonte-sections';

export type HomePageClientProps = {
  infractionPreview: InfractionPreviewItem[];
};

export function HomePageClient({ infractionPreview }: HomePageClientProps) {
  return (
    <>
      <HeroSection />
      <HomeStatsSection />
      <StartHereSection />
      <HomeEnquetesPillarSection />
      <HomeEpreuvesLandingSection />
      <HomeTestimonialsSection />
      <HomeFinalPricingSection />
      <HomeProgrammeCompletSection items={infractionPreview} />
    </>
  );
}
