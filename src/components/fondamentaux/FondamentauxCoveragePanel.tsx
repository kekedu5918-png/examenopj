'use client';

import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { getFondamentauxCoverageRows, getFondamentauxModulesSansFiche } from '@/data/fondamentaux-coverage';

export function FondamentauxCoveragePanel() {
  const rows = getFondamentauxCoverageRows();
  const trous = getFondamentauxModulesSansFiche();

  return (
    <div className='mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8'>
      <GlassCard padding='p-6' className='border-white/10'>
        <h2 className='font-display text-lg font-bold text-white'>Audit de couverture (fascicules → fiches)</h2>
        <p className='mt-2 text-sm text-gray-400'>
          Table de traçabilité entre les <strong className='text-gray-200'>titres de modules</strong> du programme et les fiches « Fondamentaux ». Lors
          d’une mise à jour de fascicule ou de votre document personnel, vérifiez chaque ligne et complétez les modules encore sans fiche dédiée.
        </p>

        <div className='mt-6 overflow-x-auto rounded-xl border border-white/10'>
          <table className='w-full min-w-[640px] border-collapse text-left text-sm'>
            <thead>
              <tr className='border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wide text-gray-500'>
                <th className='px-3 py-2'>Module</th>
                <th className='px-3 py-2'>Fiches (id)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.moduleId} className='border-b border-white/[0.06] align-top odd:bg-white/[0.02]'>
                  <td className='px-3 py-2'>
                    <Link href={r.href} className='font-medium text-cyan-300 hover:text-cyan-200'>
                      F{r.numero.toString().padStart(2, '0')}
                    </Link>
                    <div className='text-xs text-gray-500'>{r.titre}</div>
                  </td>
                  <td className='px-3 py-2 font-mono text-xs text-gray-300'>{r.ficheIds.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {trous.length ? (
          <div className='mt-4 rounded-lg border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-100'>
            <p className='font-semibold'>Modules sans fiche liée (à prioriser si le sommaire officiel exige une synthèse)</p>
            <ul className='mt-2 list-inside list-disc space-y-1 text-amber-100/90'>
              {trous.map((t) => (
                <li key={t.id}>
                  F{t.numero.toString().padStart(2, '0')} — {t.titre}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </GlassCard>
    </div>
  );
}
