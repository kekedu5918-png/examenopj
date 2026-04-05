import { PVTemplateExercise } from '@/components/pv/pv-template-exercise';
import { PV_ME1_PHASE_A_EXERCISES } from '@/data/pv-me1-exercise-types';

/**
 * Exercices « phase A » : notification de GAV et fin de GAV (en plus du PV plainte dans la section ME1).
 */
export function PVCoursPhaseAExercises() {
  return (
    <div className='mt-16 space-y-16 scroll-mt-24'>
      <div className='border-t border-white/10 pt-14'>
        <h2 className='font-display text-xl font-bold text-white md:text-2xl'>
          Exercices à trous — Phase A (épreuve 2)
        </h2>
        <p className='mt-3 max-w-3xl text-sm text-gray-400'>
          Complétez les champs : les segments non renseignés apparaissent comme <strong className='text-gray-300'>xxx</strong>{' '}
          dans l’aperçu. Recoupez systématiquement avec votre fascicule ME1 et Légifrance.
        </p>
      </div>

      {PV_ME1_PHASE_A_EXERCISES.map((cfg) => (
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
      ))}
    </div>
  );
}
