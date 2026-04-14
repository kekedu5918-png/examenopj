import { PVTemplateExercise } from '@/components/pv/pv-template-exercise';
import {
  PV_ME1_PHASE_A_EXERCISES,
  PV_ME1_TEMPLATE_EXERCISES_ALL,
  type PVMe1TemplateExerciseConfig,
} from '@/data/pv-me1-exercise-types';

const PV_ME1_EXERCISES_EXTENDED = PV_ME1_TEMPLATE_EXERCISES_ALL.slice(PV_ME1_PHASE_A_EXERCISES.length);

function renderExerciseSection(cfg: PVMe1TemplateExerciseConfig) {
  return (
    <section
      key={cfg.id}
      id={`pv-exercice-${cfg.id}`}
      className='scroll-mt-24 rounded-2xl border border-emerald-500/20 bg-navy-950/40 p-6 md:p-8'
      aria-labelledby={`pv-ex-${cfg.id}-title`}
    >
      <h3 id={`pv-ex-${cfg.id}-title`} className='font-display text-lg font-semibold text-emerald-200'>
        {cfg.heading}
      </h3>
      <div className='mt-6'>
        <PVTemplateExercise config={cfg} />
      </div>
    </section>
  );
}

/**
 * Exercices « phase A » (GAV) + extraits programme (voisinage, témoin, interpellation, présentation).
 * Repliés par défaut : l’entraînement principal est le PV blanc (même page).
 */
export function PVCoursPhaseAExercises() {
  return (
    <details className='group mt-16 scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] open:border-violet-500/25 open:bg-violet-500/[0.04]'>
      <summary className='cursor-pointer list-none px-5 py-4 font-display text-base font-semibold text-white marker:content-none md:text-lg [&::-webkit-details-marker]:hidden'>
        <span className='mr-2 inline-block text-violet-300 transition-transform duration-200 group-open:rotate-90'>▸</span>
        Exercices à trous optionnels (GAV, voisinage, témoin…)
        <span className='mt-1 block text-xs font-normal text-slate-400 group-open:hidden'>
          Ouvrez pour des squelettes préstructurés — sinon utilisez l’onglet « PV blanc ».
        </span>
      </summary>
      <div className='space-y-16 border-t border-white/10 px-5 pb-12 pt-8'>
        <div>
          <h2 className='font-display text-xl font-bold text-white md:text-2xl'>
            Exercices à trous — ME1 (épreuve 2)
          </h2>
          <p className='mt-3 max-w-3xl text-sm text-gray-400'>
            Complétez les champs : les segments non renseignés apparaissent comme <strong className='text-gray-300'>xxx</strong>{' '}
            dans l’aperçu. Recoupez systématiquement avec votre support ME1 (session juin 2026) et Légifrance.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-cyan-400/90'>Bloc 1 — Garde à vue</h3>
          <p className='max-w-3xl text-xs text-gray-500'>
            Notification et fin de mesure : socle pour l’épreuve 2 (rédaction ME1).
          </p>
        </div>
        {PV_ME1_PHASE_A_EXERCISES.map(renderExerciseSection)}

        <div className='space-y-3 border-t border-white/10 pt-12'>
          <h3 className='text-xs font-bold uppercase tracking-wider text-amber-400/90'>Extraits supplémentaires (programme)</h3>
          <p className='max-w-3xl text-xs text-gray-500'>
            Squelettes calés sur les rubriques enquête de voisinage, audition de témoin, interpellation et constitution de groupe.
          </p>
        </div>
        {PV_ME1_EXERCISES_EXTENDED.map(renderExerciseSection)}
      </div>
    </details>
  );
}
