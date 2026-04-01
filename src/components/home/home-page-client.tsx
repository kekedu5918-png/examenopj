'use client';

import { CountdownSection } from '@/components/home/sections/countdown-section';
import { EpreuvesSection } from '@/components/home/sections/epreuves-section';
import { FasciculesSection } from '@/components/home/sections/fascicules-section';
import { FinalCtaSection } from '@/components/home/sections/final-cta-section';
import { HeroSection } from '@/components/home/sections/hero-section';
import { StatsBandSection } from '@/components/home/sections/stats-band-section';
import { TimelineSection } from '@/components/home/sections/timeline-section';

export function HomePageClient() {
  return (
    <>
      <HeroSection />
      <StatsBandSection />
      <EpreuvesSection />
      <FasciculesSection />
      <TimelineSection />
      <CountdownSection />
      <FinalCtaSection />
    </>
  );
}
