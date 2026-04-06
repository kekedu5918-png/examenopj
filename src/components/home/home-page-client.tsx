'use client';

import dynamic from 'next/dynamic';

import type { FasciculeHomeGroup } from '@/components/home/home-fascicule-types';
import { HomeSectionSkeleton } from '@/components/home/home-section-skeleton';
import { FreeValueSection } from '@/components/home/sections/free-value-section';
import { HeroSection } from '@/components/home/sections/hero-section';
import { StatsBandSection } from '@/components/home/sections/stats-band-section';
import { TestimonialsSection } from '@/components/home/sections/testimonials-section';
import { CredibilityOfficialSourcesSection } from '@/components/sections/credibility-official-sources-section';

const EpreuvesSection = dynamic(
  () => import('@/components/home/sections/epreuves-section').then((m) => ({ default: m.EpreuvesSection })),
  { loading: () => <HomeSectionSkeleton label='Chargement des épreuves' /> },
);

const FasciculesSection = dynamic(
  () => import('@/components/home/sections/fascicules-section').then((m) => ({ default: m.FasciculesSection })),
  { loading: () => <HomeSectionSkeleton label='Chargement du programme' /> },
);

const TimelineSection = dynamic(
  () => import('@/components/home/sections/timeline-section').then((m) => ({ default: m.TimelineSection })),
  { loading: () => <HomeSectionSkeleton label='Chargement de la frise' /> },
);

const CountdownSection = dynamic(
  () => import('@/components/home/sections/countdown-section').then((m) => ({ default: m.CountdownSection })),
  { loading: () => <HomeSectionSkeleton label='Chargement du compte à rebours' /> },
);

const FinalCtaSection = dynamic(
  () => import('@/components/home/sections/final-cta-section').then((m) => ({ default: m.FinalCtaSection })),
  { loading: () => <HomeSectionSkeleton label='Chargement du bloc final' /> },
);

export type { FasciculeHomeGroup, FasciculeHomeItem } from '@/components/home/home-fascicule-types';

export type HomePageClientProps = {
  fasciculeGroups: FasciculeHomeGroup[];
  cahier: { titre: string; periode: string };
  fasciculeCount: number;
};

export function HomePageClient({ fasciculeGroups, cahier, fasciculeCount }: HomePageClientProps) {
  return (
    <>
      <HeroSection />
      <StatsBandSection />
      <CredibilityOfficialSourcesSection />
      <EpreuvesSection />
      <FasciculesSection groups={fasciculeGroups} cahier={cahier} fasciculeCount={fasciculeCount} />
      <FreeValueSection />
      <TimelineSection />
      <CountdownSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
