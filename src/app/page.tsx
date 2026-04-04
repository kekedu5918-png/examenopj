import type { Metadata } from 'next';

import type { FasciculeHomeGroup } from '@/components/home/home-fascicule-types';
import { HomePageClient } from '@/components/home/home-page-client';
import { cahierMiseAJour, DOMAIN_LABELS } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';

const FASCICULES_HOME: Record<
  'dps' | 'dpg' | 'proc',
  readonly { num: string; titre: string; pages: number }[]
> = {
  dps: [
    { num: '01', titre: 'Les crimes et délits contre les personnes', pages: 99 },
    { num: '02', titre: 'Les crimes et délits contre les biens', pages: 103 },
    { num: '03', titre: 'Les infractions à la circulation routière', pages: 32 },
    { num: '04', titre: "Les crimes contre la nation, l'État et la paix publique", pages: 75 },
    { num: '05', titre: "L'usage et le trafic de stupéfiants", pages: 29 },
    { num: '06', titre: 'Les atteintes aux mineurs et à la famille', pages: 57 },
    { num: '07', titre: 'Les armes et munitions', pages: 35 },
  ],
  dpg: [
    { num: '08', titre: 'Les libertés publiques', pages: 112 },
    { num: '09', titre: 'De la loi pénale, de la responsabilité pénale', pages: 49 },
    { num: '10', titre: 'La sanction', pages: 75 },
  ],
  proc: [
    { num: '11', titre: 'Les cadres juridiques et les actes de la mission de PJ', pages: 174 },
    { num: '12', titre: "L'instruction préparatoire, les mandats, la détention provisoire", pages: 56 },
    { num: '13', titre: 'Les juridictions de jugement, l’exécution des décisions', pages: 33 },
    { num: '14', titre: 'Action publique, action civile, OPJ/APJ', pages: 62 },
    { num: '15', titre: 'La nullité des actes de procédure', pages: 10 },
  ],
};

const DOMAIN_ORDER: { key: keyof typeof FASCICULES_HOME; domain: Domain }[] = [
  { key: 'dps', domain: 'DPS' },
  { key: 'dpg', domain: 'DPG' },
  { key: 'proc', domain: 'PROCEDURE' },
];

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "Préparez l'examen OPJ 2026 : 15 fascicules SDCP, quiz, flashcards, épreuves et méthodologie. Version alignée sur le programme officiel.",
};

export default function HomePage() {
  const fasciculeGroups: FasciculeHomeGroup[] = DOMAIN_ORDER.map(({ key, domain }) => ({
    domain,
    label: DOMAIN_LABELS[domain],
    items: FASCICULES_HOME[key].map((row) => ({
      id: `f${row.num}`,
      num: parseInt(row.num, 10),
      title: row.titre,
      pages: row.pages,
    })),
  }));

  const fasciculeCount = fasciculeGroups.reduce((acc, g) => acc + g.items.length, 0);

  return <HomePageClient fasciculeGroups={fasciculeGroups} cahier={{ titre: cahierMiseAJour.titre, periode: cahierMiseAJour.periode }} fasciculeCount={fasciculeCount} />;
}
