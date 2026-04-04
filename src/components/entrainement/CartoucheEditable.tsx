'use client';

import { useEffect, useState } from 'react';
import type { Ref } from 'react';

import { type CartoucheData, coteLabel,QUALITE_OPTIONS } from '@/components/entrainement/articulation-types';
import { cn } from '@/utils/cn';

type Props = {
  numero: number;
  initialData: CartoucheData;
  onValidate: (data: CartoucheData) => void;
  onTerminer?: () => void;
  showTerminer: boolean;
  innerRef?: Ref<HTMLDivElement>;
};

function isPresetQualite(q: string): q is (typeof QUALITE_OPTIONS)[number] {
  return (QUALITE_OPTIONS as readonly string[]).includes(q);
}

export function CartoucheEditable({
  numero,
  initialData,
  onValidate,
  onTerminer,
  showTerminer,
  innerRef,
}: Props) {
  const [date, setDate] = useState(initialData.date);
  const [heure, setHeure] = useState(initialData.heure);
  const [qualiteMode, setQualiteMode] = useState<'select' | 'autre'>(
    initialData.qualite &&
      !QUALITE_OPTIONS.includes(initialData.qualite as (typeof QUALITE_OPTIONS)[number])
      ? 'autre'
      : 'select',
  );
  const [qualiteSelect, setQualiteSelect] = useState(
    QUALITE_OPTIONS.includes(initialData.qualite as (typeof QUALITE_OPTIONS)[number])
      ? initialData.qualite
      : QUALITE_OPTIONS[0],
  );
  const [qualiteAutre, setQualiteAutre] = useState(
    qualiteMode === 'autre' ? initialData.qualite : '',
  );
  const [titre, setTitre] = useState(initialData.titre);
  const [contenu, setContenu] = useState(initialData.contenu);

  useEffect(() => {
    setDate(initialData.date);
    setHeure(initialData.heure);
    setTitre(initialData.titre);
    setContenu(initialData.contenu);
    if (isPresetQualite(initialData.qualite)) {
      setQualiteMode('select');
      setQualiteSelect(initialData.qualite);
      setQualiteAutre('');
    } else if (initialData.qualite) {
      setQualiteMode('autre');
      setQualiteAutre(initialData.qualite);
    } else {
      setQualiteMode('select');
      setQualiteSelect(QUALITE_OPTIONS[0]);
      setQualiteAutre('');
    }
  }, [initialData]);

  const qualite = qualiteMode === 'autre' ? qualiteAutre.trim() : qualiteSelect;

  const handleValidate = () => {
    if (!date.trim() || !heure.trim() || !qualite || !titre.trim() || !contenu.trim()) {
      return;
    }
    onValidate({
      id: numero,
      date: date.trim(),
      heure: heure.trim(),
      qualite,
      titre: titre.trim(),
      contenu: contenu.trim(),
      valide: true,
    });
  };

  const canSubmit = date.trim() && heure.trim() && qualite && titre.trim() && contenu.trim();

  return (
    <div ref={innerRef} className='rounded-sm border border-slate-300 bg-white font-serif text-black shadow-sm'>
      <div className='grid grid-cols-1 md:grid-cols-[130px_1fr]'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-3 border-b border-slate-300 bg-slate-100 px-3 py-4 md:flex-col md:justify-center md:border-r md:border-b-0 md:py-6'>
          <span className='rounded border border-slate-400 bg-white px-3 py-1 text-xl font-bold tabular-nums'>
            {coteLabel(numero)}
          </span>
          <div className='flex w-full max-w-[280px] flex-col gap-2 md:w-auto md:max-w-none'>
            <label className='sr-only' htmlFor={`art-date-${numero}`}>
              Date
            </label>
            <input
              id={`art-date-${numero}`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder='JJ/MM/AA'
              className='w-full rounded border border-slate-400 bg-white px-2 py-1.5 text-center text-sm outline-none focus:border-blue-500'
            />
            <label className='sr-only' htmlFor={`art-heure-${numero}`}>
              Heure
            </label>
            <input
              id={`art-heure-${numero}`}
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              placeholder='HHhMM'
              className='w-full rounded border border-slate-400 bg-white px-2 py-1.5 text-center text-sm outline-none focus:border-blue-500'
            />
            <label className='sr-only' htmlFor={`art-qual-${numero}`}>
              Qualité
            </label>
            <select
              id={`art-qual-${numero}`}
              value={qualiteMode === 'autre' ? 'AUTRE' : qualiteSelect}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'AUTRE') {
                  setQualiteMode('autre');
                } else {
                  setQualiteMode('select');
                  setQualiteSelect(v);
                }
              }}
              className='w-full rounded border border-slate-400 bg-white px-2 py-1.5 text-center text-sm outline-none focus:border-blue-500'
            >
              {QUALITE_OPTIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
              <option value='AUTRE'>Autre…</option>
            </select>
            {qualiteMode === 'autre' ? (
              <input
                value={qualiteAutre}
                onChange={(e) => setQualiteAutre(e.target.value)}
                placeholder='Précisez la qualité'
                className='w-full rounded border border-slate-400 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500'
              />
            ) : null}
          </div>
        </div>
        <div className='flex flex-col gap-3 px-4 py-4 md:py-5'>
          <div>
            <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600' htmlFor={`art-titre-${numero}`}>
              Titre du PV
            </label>
            <input
              id={`art-titre-${numero}`}
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder='SAISINE – PLAINTE DE…'
              className='w-full rounded border border-slate-400 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500'
            />
          </div>
          <div className='min-h-0 flex-1'>
            <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600' htmlFor={`art-contenu-${numero}`}>
              Contenu (une idée par ligne ; « - » ajouté si absent)
            </label>
            <textarea
              id={`art-contenu-${numero}`}
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder={
                '- Résumé des faits\n- Qualification\n- Cadre juridique\n- Actions menées\n- Annexes'
              }
              rows={6}
              className='min-h-[120px] w-full resize-y rounded border border-slate-400 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500'
            />
          </div>
          {!canSubmit ? (
            <p className='text-xs text-amber-700'>Remplissez tous les champs pour valider.</p>
          ) : null}
          <div className='flex flex-wrap gap-3 pt-1'>
            <button
              type='button'
              onClick={handleValidate}
              disabled={!canSubmit}
              className={cn(
                'rounded-lg px-4 py-2.5 text-sm font-bold text-white transition',
                canSubmit ? 'bg-emerald-600 hover:bg-emerald-700' : 'cursor-not-allowed bg-slate-400',
              )}
            >
              Valider cette côte
            </button>
            {showTerminer && onTerminer ? (
              <button
                type='button'
                onClick={onTerminer}
                className='rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700'
              >
                Terminer l&apos;articulation
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
