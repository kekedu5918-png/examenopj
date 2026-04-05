import { ME1_MENTIONS_MARGINALES_TYPES, ME1_PV_BLOC_DROIT_EX4, ME1_PV_ENTETE_GAUCHE_EX4, ME1_SOURCE_LABEL } from '@/data/pv-me1-plainte-exemple4';

/** Reproduction fidèle de la présentation « en-tête à gauche / trait / bloc PV à droite » (modèle ME1). */
export function PVMe1VerbatimPlainte() {
  return (
    <div className='space-y-8'>
      <p className='text-xs leading-relaxed text-slate-500'>{ME1_SOURCE_LABEL}</p>

      <div>
        <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
          Mentions marginales (types offerts par le fascicule)
        </h3>
        <pre className='overflow-x-auto whitespace-pre-wrap border border-gray-600 bg-[#0a0f16] p-4 font-mono text-[11px] leading-relaxed text-gray-200'>
          {ME1_MENTIONS_MARGINALES_TYPES}
        </pre>
      </div>

      <div>
        <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
          Exemple 4 — Plainte avec interprète (texte conforme au fascicule)
        </h3>
        <div className='flex flex-col overflow-hidden rounded-none border border-gray-600 md:flex-row'>
          <div className='shrink-0 border-gray-600 bg-[#0a0f16] p-4 md:w-[min(100%,280px)] md:border-b-0 md:border-r'>
            <pre className='whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-200'>
              {ME1_PV_ENTETE_GAUCHE_EX4}
            </pre>
          </div>
          <div className='min-w-0 flex-1 bg-[#080c12] p-4'>
            <pre className='whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-200'>
              {ME1_PV_BLOC_DROIT_EX4}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
