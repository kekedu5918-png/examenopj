'use client';

import { useMemo, useState } from 'react';

import { rapportPerpignanExemple } from '@/data/rapport-synthese-f16-exemple-perpignan';

const INTRO_VERROUILLEE = rapportPerpignanExemple.introduction;
const CONCLUSION_VERROUILLEE = rapportPerpignanExemple.conclusionTitreEtCorps;

/**
 * Entraînement : formules F16 verrouillées (vert) ; zones narratives (orange) éditables ; checklist « Vérifier ».
 */
export function RapportSyntheseEntrainementStructured() {
  const [faits, setFaits] = useState('');
  const [enquete, setEnquete] = useState('');
  const [objet, setObjet] = useState<string>(rapportPerpignanExemple.objet);
  const [etatCivil, setEtatCivil] = useState('');
  const [destinataires, setDestinataires] = useState<string>(rapportPerpignanExemple.destinataires);

  const checks = useMemo(() => {
    const enteteOk =
      rapportPerpignanExemple.entete.split('\n').filter(Boolean).length >= 8;
    const introOk = INTRO_VERROUILLEE.trim().length > 0;
    const faitsOk = faits.trim().length > 20;
    const enqueteOk = enquete.trim().length > 20;
    const conclusionArticles =
      CONCLUSION_VERROUILLEE.includes('222-12') && CONCLUSION_VERROUILLEE.includes('code pénal');
    const etatOk = etatCivil.includes('né le') && etatCivil.includes('demeurant');
    const vuOk = true;
    const destOk =
      destinataires.toLowerCase().includes('parquet') &&
      destinataires.toLowerCase().includes('archives');

    return {
      enteteOk,
      introOk,
      faitsOk,
      enqueteOk,
      conclusionArticles,
      etatOk,
      vuOk,
      destOk,
      score: [
        enteteOk,
        introOk,
        faitsOk,
        enqueteOk,
        conclusionArticles,
        etatOk,
        vuOk,
        destOk,
      ].filter(Boolean).length,
    };
  }, [faits, enquete, etatCivil, destinataires]);

  return (
    <div className='space-y-6'>
      <p className='text-xs text-examen-inkMuted'>
        Les passages <span className='rounded bg-emerald-600/30 px-1 text-emerald-100'>verts</span> reprennent les formules
        de l’exemple F16 (non modifiables). Les zones{' '}
        <span className='rounded bg-orange-500/30 px-1 text-orange-100'>orange</span> sont à compléter pour vous entraîner.
      </p>

      <div className='overflow-x-auto rounded-lg border border-neutral-300 bg-white p-4 shadow-sm md:p-6'>
        <div className='mx-auto max-w-3xl space-y-4 font-serif text-[13px] text-gray-900 md:text-[14px]'>
          <pre className='whitespace-pre-wrap rounded border border-emerald-700/40 bg-emerald-50/90 p-3 text-gray-900'>
            {rapportPerpignanExemple.entete}
          </pre>

          <label className='block'>
            <span className='mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-800'>OBJET (variable)</span>
            <textarea
              className='min-h-[72px] w-full rounded border border-orange-400/60 bg-orange-50/90 p-3 font-serif text-gray-900'
              value={objet}
              onChange={(e) => setObjet(e.target.value)}
            />
          </label>

          <pre className='whitespace-pre-wrap rounded border border-neutral-200 bg-white p-3'>
            {rapportPerpignanExemple.affaire}
{'\n'}
            {rapportPerpignanExemple.references}
{'\n'}
            {rapportPerpignanExemple.piecesJointes}
          </pre>

          <pre className='whitespace-pre-wrap rounded border border-emerald-700/40 bg-emerald-50/90 p-3 text-gray-900'>
            {INTRO_VERROUILLEE}
          </pre>

          <label className='block'>
            <span className='mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-800'>LES FAITS</span>
            <textarea
              className='min-h-[120px] w-full rounded border border-orange-400/60 bg-orange-50/90 p-3 font-serif text-gray-900'
              placeholder='Rédigez la section LES FAITS…'
              value={faits}
              onChange={(e) => setFaits(e.target.value)}
            />
          </label>

          <label className='block'>
            <span className='mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-800'>L’ENQUÊTE</span>
            <textarea
              className='min-h-[160px] w-full rounded border border-orange-400/60 bg-orange-50/90 p-3 font-serif text-gray-900'
              placeholder='Rédigez la section L’ENQUÊTE…'
              value={enquete}
              onChange={(e) => setEnquete(e.target.value)}
            />
          </label>

          <pre className='whitespace-pre-wrap rounded border border-emerald-700/40 bg-emerald-50/90 p-3 text-gray-900'>
            {CONCLUSION_VERROUILLEE}
          </pre>

          <label className='block'>
            <span className='mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-800'>
              ÉTAT CIVIL DU MIS EN CAUSE
            </span>
            <textarea
              className='min-h-[96px] w-full rounded border border-orange-400/60 bg-orange-50/90 p-3 font-serif text-gray-900'
              placeholder='Nom, prénom, date et lieu de naissance, profession, domicile…'
              value={etatCivil}
              onChange={(e) => setEtatCivil(e.target.value)}
            />
          </label>

          <pre className='whitespace-pre-wrap rounded border border-neutral-200 bg-white p-3'>
            {rapportPerpignanExemple.vuEtTransmis}
          </pre>

          <label className='block'>
            <span className='mb-1 block text-xs font-semibold uppercase tracking-wide text-orange-800'>DESTINATAIRES</span>
            <textarea
              className='min-h-[88px] w-full rounded border border-orange-400/60 bg-orange-50/90 p-3 font-serif text-gray-900'
              value={destinataires}
              onChange={(e) => setDestinataires(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-xl border border-white/10 bg-examen-card p-4'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span className='text-sm font-semibold text-white'>
            Score indicatif : {checks.score} / 8 éléments
          </span>
        </div>
        <ul className='space-y-2 text-sm text-examen-inkMuted'>
          <li>{checks.enteteOk ? '✓' : '○'} Entête présent (modèle F16)</li>
          <li>{checks.introOk ? '✓' : '○'} Formule d’introduction (texte F16)</li>
          <li>{checks.faitsOk ? '✓' : '○'} Section LES FAITS non vide</li>
          <li>{checks.enqueteOk ? '✓' : '○'} Section L’ENQUÊTE non vide</li>
          <li>{checks.conclusionArticles ? '✓' : '○'} Conclusion avec qualification / article (modèle F16)</li>
          <li>{checks.etatOk ? '✓' : '○'} État civil : mentions naissance + domicile</li>
          <li>{checks.vuOk ? '✓' : '○'} VU ET TRANSMIS (présent dans le modèle)</li>
          <li>{checks.destOk ? '✓' : '○'} Destinataires : parquet + archives</li>
        </ul>
      </div>
    </div>
  );
}
