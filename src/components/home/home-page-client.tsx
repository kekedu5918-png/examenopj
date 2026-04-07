'use client';

import { HeroSection } from '@/components/home/sections/hero-section';
import {
  HomeEnquetesPillarSection,
  HomeEpreuvesLandingSection,
  HomeFinalPricingSection,
  HomeFondamentauxPreviewSection,
  HomeInfractionsPreviewSection,
  type InfractionPreviewItem,
  StartHereSection,
  TerrainOriginSection,
} from '@/components/home/sections/home-refonte-sections';
import { StatsBandSection } from '@/components/home/sections/stats-band-section';

export type HomePageClientProps = {
  infractionPreview: InfractionPreviewItem[];
};

export function HomePageClient({ infractionPreview }: HomePageClientProps) {
  return (
    <>
      <HeroSection />
      <StatsBandSection />
      <StartHereSection />
      <HomeEnquetesPillarSection />
      <HomeEpreuvesLandingSection />
      <HomeInfractionsPreviewSection items={infractionPreview} />
      <HomeFondamentauxPreviewSection />
      <TerrainOriginSection />
      <HomeFinalPricingSection />
    </>
  );
}
