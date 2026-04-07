'use client';

import Link from 'next/link';
import { ArrowRight, ListOrdered } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { ENQUETES } from '@/data/enquetes-data';

const STEPS = [
  { n: 1, t: 'FAITS', d: 'Que s’est-il passé ?' },
  { n: 2, t: 'QUALIFICATION', d: 'Quelle(s) infraction(s) ?' },
  { n: 3, t: 'ARTICLES', d: 'Quels textes ?' },
  { n: 4, t: 'CADRE', d: 'Quelle procédure applicable ?' },
  { n: 5, t: 'ACTES', d: 'Quels actes de police judiciaire ?' },
] as const;

/** // TODO: enrichir exemples annotés et listes exhaustives cartouches depuis fascicules ME1. */
export function Epreuve2Methodology() {
  return (
    <div className='mx-auto max-w-5xl space-y-16 px-6 pb-16'>
      <p className='text-center text-lg text-gray-300'>
        Trois exercices en 4 heures. Chacun obéit à une logique précise. Cette page te donne la méthode exacte pour
        chacun.
      </p>

      <nav
        aria-label='Sommaire Épreuve 2'
        className='flex flex-wrap justify-center gap-3 border-b border-white/10 pb-8 text-sm'
      >
        <a href='#e2-pv' className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white hover:border-examen-accent/40'>
          1. Rédaction de PV
        </a>
        <a href='#e2-art' className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white hover:border-examen-accent/40'>
          2. Articulation
        </a>
        <a href='#e2-rapport' className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white hover:border-examen-accent/40'>
          3. Rapport de synthèse
        </a>
      </nav>

      <section id='e2-pv' className='scroll-mt-28'>
        <h2 className='font-display text-2xl font-bold text-white md:text-3xl'>1. La rédaction de PV</h2>
        <p className='mt-3 text-gray-400'>
          Le thème est tiré au sort le jour J. Le modèle de PV doit être su par cœur. Les cartouches sont obligatoires et
          immuables.
        </p>

        <div className='mt-8 space-y-6'>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-gray-400'>Les cartouches obligatoires</h3>
            <p className='mt-2 text-sm leading-relaxed text-gray-300'>
              {/* TODO: liste exhaustive alignée fascicule ME1 — saisines, GAV, interpellations, auditions, etc. */}
              Liste complète à recaler sur votre fascicule « procès-verbaux » : une cartouche par type d’acte, mentions
              d’identité OPJ/APJ, références d’articles, chronologie et renvois aux pièces jointes.
            </p>
          </GlassCard>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-gray-400'>Structure imposée</h3>
            <p className='text-sm text-gray-300'>Début (identification, cadre) → corps (faits télégraphiques) → clôture (mentions légales, signatures).</p>
          </GlassCard>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-gray-400'>Formules exactes</h3>
            <p className='text-sm text-gray-300'>Les formulations officielles du fascicule doivent être récitées mot à mot où le programme l’exige.</p>
          </GlassCard>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-gray-400'>Erreurs qui coûtent des points</h3>
            <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-gray-300'>
              <li>Cartouche incomplète ou titre erroné</li>
              <li>Confusion de cadre (flagrance / préliminaire)</li>
              <li>Faits narratifs au lieu d’actes datés et qualifiés</li>
            </ul>
          </GlassCard>
        </div>

        <div className='mt-8 overflow-x-auto rounded-xl border border-white/10'>
          <table className='w-full min-w-[520px] text-left text-sm'>
            <thead>
              <tr className='border-b border-white/10 bg-white/5'>
                <th className='px-4 py-3 text-gray-400'>Thème (exemple)</th>
                <th className='px-4 py-3 text-gray-400'>Enquête associée</th>
                <th className='px-4 py-3 text-gray-400'>Modèle</th>
              </tr>
            </thead>
            <tbody>
              {ENQUETES.filter((e) => ['alpha', 'bravo', 'delta', 'echo'].includes(e.id)).map((e) => (
                <tr key={e.id} className='border-b border-white/5'>
                  <td className='px-4 py-3 text-gray-200'>{e.themeCourt ?? e.titre}</td>
                  <td className='px-4 py-3 font-mono text-examen-accent'>{e.code}</td>
                  <td className='px-4 py-3'>
                    <Link href='/cours/modeles-pv' className='text-examen-accent hover:underline'>
                      Voir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className='mt-6 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100'>
          Les modèles sont conformes aux fascicules officiels. Ils doivent être sus par cœur. Le thème est tiré au sort
          le jour J.
        </p>
      </section>

      <section id='e2-art' className='scroll-mt-28'>
        <h2 className='font-display text-2xl font-bold text-white md:text-3xl'>2. L’articulation de procédure</h2>
        <p className='mt-3 text-gray-400'>
          L’exercice phare de l’épreuve 2. Il teste ta capacité à raisonner comme un OPJ : des faits vers les actes de
          procédure.
        </p>

        <ol className='relative mt-10 space-y-6 border-l border-examen-accent/30 pl-8'>
          {STEPS.map((s) => (
            <li key={s.n} className='relative'>
              <span className='absolute -left-[39px] flex h-8 w-8 items-center justify-center rounded-full bg-examen-accent text-sm font-bold text-white'>
                {s.n}
              </span>
              <h3 className='font-semibold text-white'>{s.t}</h3>
              <p className='text-sm text-gray-400'>{s.d}</p>
            </li>
          ))}
        </ol>

        <GlassCard padding='p-6' className='mt-10'>
          <h3 className='flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400'>
            <ListOrdered className='h-4 w-4' aria-hidden />
            Exemple type (situation d&apos;étude)
          </h3>
          <p className='mt-3 text-sm leading-relaxed text-gray-300'>
            {/* TODO: exemple complet annoté étape par étape. */}
            À traiter sur une planche d’enquête (Alpha, Bravo…) : partir des faits du sujet, poser les qualifications,
            citer les articles, verrouiller le cadre puis enchaîner les PV nécessaires sans rupture de logique.
          </p>
          <Link href='/entrainement/articulation' className='mt-4 inline-flex text-sm font-semibold text-examen-accent hover:underline'>
            Exercices d’articulation →
          </Link>
        </GlassCard>

        <ul className='mt-6 list-inside list-disc space-y-2 text-sm text-gray-400'>
          <li>Erreur fréquente : confondre qualification et mesure de sûreté</li>
          <li>Erreur fréquente : oublier la saisine ou l’avis dans le bon ordre</li>
        </ul>
      </section>

      <section id='e2-rapport' className='scroll-mt-28'>
        <h2 className='font-display text-2xl font-bold text-white md:text-3xl'>3. Le rapport de synthèse</h2>
        <p className='mt-3 text-gray-400'>
          Le rapport de synthèse obéit à une structure stricte issue des fascicules. Chaque partie a ses formules
          imposées.
        </p>
        <div className='mt-8 space-y-4'>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold text-gray-400'>Structure conforme</h3>
            <p className='mt-2 text-sm text-gray-300'>Parties obligatoires selon le modèle parquet / fascicule RS.</p>
          </GlassCard>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold text-gray-400'>Introduction et clôture</h3>
            <p className='mt-2 text-sm text-gray-300'>Formules d’accroche et de synthèse à stabiliser à l’entraînement.</p>
          </GlassCard>
          <GlassCard padding='p-6'>
            <h3 className='text-sm font-bold text-gray-400'>Ce qu’on évalue</h3>
            <p className='mt-2 text-sm text-gray-300'>Fond, forme, exhaustivité des faits et des suites proposées.</p>
          </GlassCard>
        </div>
      </section>

      <div className='flex justify-center pt-4'>
        <Link
          href='/cours/enquetes'
          className='inline-flex items-center gap-2 rounded-xl bg-examen-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-examen-accent/20 hover:bg-examen-accentHover'
        >
          S’entraîner avec les enquêtes
          <ArrowRight className='h-4 w-4' aria-hidden />
        </Link>
      </div>
    </div>
  );
}
