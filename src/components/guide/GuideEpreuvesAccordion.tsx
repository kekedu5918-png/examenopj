'use client';

import Link from 'next/link';

import type { SectionAccordionItem } from '@/components/ui/section-accordion';
import { SectionAccordion } from '@/components/ui/section-accordion';

const link = 'font-semibold text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline';

const items: SectionAccordionItem[] = [
  {
    id: 'ep1',
    trigger: 'Épreuve 1 — DPG/DPS (3h, coeff. 2)',
    badge: 'Écrit',
    badgeColor: 'blue',
    defaultOpen: true,
    content: (
      <div className='space-y-3 text-sm leading-relaxed text-gray-300'>
        <p>
          <strong className='text-gray-200'>Ce qu&apos;on évalue :</strong> identifier toutes les infractions
          d&apos;un thème, démontrer les éléments constitutifs, qualifier, classer, identifier les CA et le degré de
          participation.
        </p>
        <p>
          <strong className='text-gray-200'>Erreur fatale :</strong> oublier une infraction → −5 pts chacune. Note
          &lt; 5/20 = éliminatoire.
        </p>
        <p>
          <strong className='text-gray-200'>Outil clé :</strong>{' '}
          <Link href='/epreuves/epreuve-1' className={link}>
            /epreuves/epreuve-1
          </Link>{' '}
          — méthode complète avec phrases types à copier.
        </p>
        <p>
          <strong className='text-gray-200'>À maîtriser :</strong> F01 à F10 (toutes les infractions + CA générales art.
          132-71 à 132-80).
        </p>
      </div>
    ),
  },
  {
    id: 'ep2',
    trigger: 'Épreuve 2 — Procédure pénale (écrit)',
    badge: 'Écrit',
    badgeColor: 'green',
    content: (
      <div className='space-y-3 text-sm leading-relaxed text-gray-300'>
        <p>
          <strong className='text-gray-200'>Ce qu&apos;on évalue :</strong> articulation de procédure (liste
          chronologique des PV), rédaction de PV avec cartouches, rapport de synthèse.
        </p>
        <p>
          <strong className='text-gray-200'>Erreur fatale :</strong> mauvais cadre juridique, PV sans cartouche
          correcte.
        </p>
        <p>
          <strong className='text-gray-200'>Outil clé :</strong>{' '}
          <Link href='/epreuves/epreuve-2' className={link}>
            /epreuves/epreuve-2
          </Link>{' '}
          — tous les cartouches, exemple d&apos;articulation.
        </p>
        <p>
          <strong className='text-gray-200'>À maîtriser :</strong> F11 à F15 (cadres d&apos;enquête, GAV, mandats,
          juridictions, nullités).
        </p>
      </div>
    ),
  },
  {
    id: 'ep3',
    trigger: 'Épreuve 3 — Oral CR Parquet',
    badge: 'Oral',
    badgeColor: 'amber',
    content: (
      <div className='space-y-3 text-sm leading-relaxed text-gray-300'>
        <p>
          <strong className='text-gray-200'>Ce qu&apos;on évalue :</strong> compte rendu téléphonique structuré, chapeau
          introductif, déroulé circonstancié, suites judiciaires, questions du jury.
        </p>
        <p>
          <strong className='text-gray-200'>Erreur fatale :</strong> CR décousu, oublier le cadre juridique, improviser
          sans canevas.
        </p>
        <p>
          <strong className='text-gray-200'>Outil clé :</strong>{' '}
          <Link href='/epreuves/epreuve-3' className={link}>
            /epreuves/epreuve-3
          </Link>{' '}
          — les 8 points du chapeau, flèche temporelle, canevas complet.
        </p>
        <p>
          <strong className='text-gray-200'>À maîtriser :</strong> tout — l&apos;oral mobilise DPS, DPG et procédure en
          même temps.
        </p>
      </div>
    ),
  },
];

export function GuideEpreuvesAccordion() {
  return <SectionAccordion allowMultiple items={items} />;
}
