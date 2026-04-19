'use client';

import { useMemo, useState } from 'react';
import { FileText, Printer } from 'lucide-react';

import { evaluerCartouchesParRessource } from '@/components/entrainement/articulation-check';
import type { CartoucheData } from '@/components/entrainement/articulation-types';
import { ArticulationChecklist } from '@/components/entrainement/ArticulationChecklist';
import { CartoucheValidee } from '@/components/entrainement/CartoucheValidee';
import { getArticulationReferenceModel } from '@/data/articulation-reference-models';

type Props = {
  numeroProcedure?: string;
  titreArticulation: string;
  cartouches: CartoucheData[];
  onRecommencer: () => void;
  referenceEnqueteId?: string;
};

export function ArticulationRecap({
  numeroProcedure,
  titreArticulation,
  cartouches,
  onRecommencer,
  referenceEnqueteId,
}: Props) {
  const valides = cartouches.filter((c) => c.valide);

  const modele = useMemo(() => getArticulationReferenceModel(referenceEnqueteId), [referenceEnqueteId]);

  const evalRef = useMemo(() => {
    if (!modele) return null;
    const titresUser = valides.map((c) => c.titre.trim());
    return evaluerCartouchesParRessource(modele.titresOrdre, titresUser);
  }, [modele, valides]);
  const dateStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
  }).format(new Date());

  const [exporting, setExporting] = useState(false);

  async function handleExportDocx() {
    if (exporting) return;
    setExporting(true);
    try {
      const [{ buildArticulationDocx }, fileSaverMod] = await Promise.all([
        import('@/lib/articulation-to-docx'),
        import('file-saver'),
      ]);
      /** `file-saver` est en CJS (`module.exports = saveAs`) → souvent `default`, pas `{ saveAs }`. */
      const saveAsFn =
        typeof fileSaverMod.saveAs === 'function'
          ? fileSaverMod.saveAs
          : typeof fileSaverMod.default === 'function'
            ? fileSaverMod.default
            : null;
      if (!saveAsFn) {
        throw new Error('Téléchargement indisponible : module file-saver non chargé correctement.');
      }
      const blob = await buildArticulationDocx(
        valides,
        numeroProcedure ?? '',
        titreArticulation,
      );
      const stamp = (numeroProcedure?.trim() || new Date().toISOString().slice(0, 10))
        .replace(/[\\/:*?"<>|\s]+/g, '_');
      saveAsFn(blob, `articulation_${stamp}.docx`);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className='space-y-8'>
      <div
        id='articulation-print-area'
        className='space-y-6 rounded-xl border border-slate-300 bg-white p-6 font-serif text-black shadow-lg print:border-0 print:shadow-none'
      >
        <header className='border-b-2 border-black pb-4 text-center print:border-0 print:pb-3 print:text-left'>
          <p className='mb-2 text-sm font-bold uppercase tracking-wide print:mb-0 print:text-[14pt] print:font-normal print:normal-case print:tracking-normal print:text-black'>
            <span className='print:hidden'>
              Numéro de procédure n°{numeroProcedure?.trim() ? ` ${numeroProcedure.trim()}` : '(à compléter par le candidat)'}
            </span>
            <span className='hidden print:inline'>
              Procédure n°{numeroProcedure?.trim() ? ` ${numeroProcedure.trim()}` : ' (à compléter)'}
            </span>
          </p>
          <div className='print:hidden'>
            <h2 className='text-lg font-bold uppercase underline'>Articulation de procédure</h2>
            {titreArticulation.trim() ? (
              <p className='mt-3 text-sm font-semibold'>{titreArticulation.trim()}</p>
            ) : null}
          </div>
        </header>
        <div className='space-y-0'>
          {valides.map((c) => (
            <CartoucheValidee key={c.id} data={c} hideEdit />
          ))}
        </div>
        <p className='text-center text-sm text-slate-600 print:hidden'>
          {valides.length} côte{valides.length > 1 ? 's' : ''} PV — Articulé le {dateStr}
        </p>
      </div>

      {evalRef && modele ? (
        <ArticulationChecklist
          items={evalRef.items}
          ordreRespecte={evalRef.ordreRespecte}
          titreModele={`Enquête ${modele.enqueteId.toUpperCase()}`}
        />
      ) : null}

      <div className='print:hidden'>
        <p className='mb-3 max-w-xl text-xs leading-relaxed text-slate-500'>
          Astuce : dans la fenêtre d’impression, décochez « En-têtes et pieds de page » pour un rendu propre.
        </p>
      </div>
      <div className='flex flex-wrap gap-3 print:hidden'>
        <button
          type='button'
          onClick={onRecommencer}
          className='rounded-lg bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700'
        >
          Recommencer
        </button>
        <button
          type='button'
          onClick={() => window.print()}
          className='inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50'
        >
          <Printer className='size-4' aria-hidden />
          Imprimer / PDF
        </button>
        <button
          type='button'
          onClick={handleExportDocx}
          disabled={exporting || valides.length === 0}
          className='inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <FileText className='size-4' aria-hidden />
          {exporting ? 'Génération…' : 'Exporter en Word'}
        </button>
      </div>
    </div>
  );
}
