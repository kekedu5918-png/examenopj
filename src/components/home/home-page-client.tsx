'use client';

import { HeroSection } from '@/components/home/sections/hero-section';
import {
  HomeEnquetesPillarSection,
  HomeEpreuvesLandingSection,
  HomeFinalPricingSection,
  HomeProgrammeCompletSection,
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
      <StartHereSection />
      <HomeFinalPricingSection />
      <HomeEnquetesPillarSection />
      <HomeEpreuvesLandingSection />
      <HomeProgrammeCompletSection items={infractionPreview} />
    </>
  );
}
