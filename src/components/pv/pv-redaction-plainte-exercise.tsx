'use client';

import { useId, useMemo, useState } from 'react';

import { ME1_PV_ENTETE_GAUCHE_HAUT } from '@/data/pv-me1-plainte-exemple4';
import { cn } from '@/utils/cn';

const BLANK = 'xxx';

type FieldRowProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  mono?: boolean;
};

function FieldRow({ id, label, value, onChange, multiline, mono }: FieldRowProps) {
  const C =
    'w-full rounded-lg border border-white/15 bg-navy-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='block text-xs font-medium text-slate-400'>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn(C, mono && 'font-mono text-[12px]')}
          placeholder={BLANK}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(C, mono && 'font-mono text-[12px]')}
          placeholder={BLANK}
        />
      )}
    </div>
  );
}

/** Indications du fascicule : tout ce qui figure entre parenthèses doit être explicité. */
export const ME1_EX4_PARENTHESES_CONSIGNES = [
  '(ADRESSE ET COORDONNÉES) / (DU SERVICE)',
  '(année), (jour, mois), (heures, minutes)',
  '(Prénom, NOM) du rédacteur',
  '(Grade du rédacteur)',
  '(service), (VILLE), résidence',
  'C/ (Prénom, NOM) et (qualification de l’infraction)',
  'Interprète : M. ou Mme (…) (adresse), langue (…)',
  '(infraction, date, lieu)',
  '(flagrant délit ou enquête préliminaire)',
  'Références « Vu les articles »',
  'Lecture / traduction : M. (prénom, nom) interprète, M. (prénom, nom) victime',
];

function g(v: string): string {
  const t = v.trim();
  return t.length > 0 ? t : BLANK;
}

/**
 * Exercice : compléter les champs structurés + rédiger le corps (lignes qui commencent par ---).
 */
export function PVRedactionPlainteExercise() {
  const uid = useId();
  const [coords, setCoords] = useState('');
  const [codeInsee, setCodeInsee] = useState('');
  const [pvMarge, setPvMarge] = useState('');
  const [pvNum, setPvNum] = useState('');
  const [an, setAn] = useState('');
  const [jour, setJour] = useState('');
  const [heure, setHeure] = useState('');
  const [nomOpj, setNomOpj] = useState('');
  const [grade, setGrade] = useState('');
  const [service, setService] = useState('');
  const [ville, setVille] = useState('');
  const [affaire, setAffaire] = useState('');
  const [objet, setObjet] = useState('');
  const [corps, setCorps] = useState('');

  const aperçu = useMemo(() => {
    const coordBlock = coords.trim() || `${BLANK}\n${BLANK}`;
    const left = `${ME1_PV_ENTETE_GAUCHE_HAUT}\n${coordBlock}\nCODE INSEE : ${g(codeInsee)}\nP.V. : ${g(pvMarge)}\n__________`;

    const affaireBloc = affaire.trim() || `${BLANK}\n${BLANK}\n${BLANK}`;
    const corpsBloc =
      corps.trim() ||
      `--- ${BLANK}\n--- ${BLANK}\n… (rédiger ici tout le corps du PV : lignes --- conformes au fascicule, jusqu’aux signatures L’intéressé(e) / L’interprète / L’O.P.J.)`;

    const right =
      `PROCÈS-VERBAL\n` +
      `PV n° ${g(pvNum)}\n` +
      `L’an ${g(an)},\n` +
      `Le ${g(jour)}, à ${g(heure)}\n` +
      `Nous, ${g(nomOpj)}\n` +
      `${g(grade)}\n` +
      `En fonction à ${g(service)} de ${g(ville)}\n` +
      `OFFICIER DE POLICE JUDICIAIRE en résidence à ${g(ville)},\n` +
      `AFFAIRE :\n${affaireBloc}\n` +
      `OBJET :\n${g(objet)}\n` +
      `1\n` +
      `2\n` +
      corpsBloc;

    return { left, right };
  }, [coords, codeInsee, pvMarge, pvNum, an, jour, heure, nomOpj, grade, service, ville, affaire, objet, corps]);

  return (
    <div className='space-y-8'>
      <div className='rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4 text-sm text-amber-100/95'>
        <p className='font-semibold text-amber-200'>Consignes type concours (épreuve 2)</p>
        <ul className='mt-2 list-inside list-disc space-y-1 text-amber-100/90'>
          <li>Les champs vides s’affichent comme {BLANK} dans l&apos;aperçu.</li>
          <li>
            Remplacez systématiquement les indications <strong className='text-white'>entre parenthèses</strong> du fascicule (voir liste
            ci-dessous).
          </li>
          <li>
            Le <strong className='text-white'>corps</strong> du PV commence à la première ligne en <strong className='font-mono text-white'>---</strong>{' '}
            (reprenant le modèle ME1, sans sauter les mentions légales).
          </li>
        </ul>
      </div>

      <div>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-slate-500'>Parenthèses à traiter (rappel fascicule)</h3>
        <ul className='space-y-1 text-xs text-slate-400'>
          {ME1_EX4_PARENTHESES_CONSIGNES.map((t) => (
            <li key={t} className='flex gap-2'>
              <span aria-hidden className='text-slate-600'>
                →
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='space-y-4'>
          <p className='text-xs font-bold uppercase tracking-wide text-emerald-400/90'>En-tête gauche (marge)</p>
          <FieldRow
            id={`${uid}-coords`}
            label='Adresse et coordonnées du service (remplace « (ADRESSE ET COORDONNÉES) » et « (DU SERVICE) » ; une ou deux lignes)'
            value={coords}
            onChange={setCoords}
            multiline
            mono
          />
          <FieldRow id={`${uid}-insee`} label='CODE INSEE' value={codeInsee} onChange={setCodeInsee} />
          <FieldRow id={`${uid}-pvm`} label='P.V. (marge) — ex. n° …/…' value={pvMarge} onChange={setPvMarge} mono />
        </div>

        <div className='space-y-4'>
          <p className='text-xs font-bold uppercase tracking-wide text-emerald-400/90'>Bloc droit — incipit</p>
          <FieldRow id={`${uid}-pvn`} label='PV n° (modèle …/…/… du fascicule)' value={pvNum} onChange={setPvNum} mono />
          <FieldRow id={`${uid}-an`} label='L’an (année)' value={an} onChange={setAn} />
          <FieldRow id={`${uid}-jour`} label='Le (jour, mois)' value={jour} onChange={setJour} />
          <FieldRow id={`${uid}-heure`} label='à (heures, minutes)' value={heure} onChange={setHeure} />
          <FieldRow id={`${uid}-nopj`} label='Nous, (Prénom, NOM)' value={nomOpj} onChange={setNomOpj} />
          <FieldRow id={`${uid}-grade`} label='(Grade du rédacteur)' value={grade} onChange={setGrade} />
          <FieldRow id={`${uid}-srv`} label='En fonction à (service)' value={service} onChange={setService} />
          <FieldRow id={`${uid}-ville`} label='(VILLE) / résidence OPJ' value={ville} onChange={setVille} />
          <FieldRow
            id={`${uid}-aff`}
            label='AFFAIRE : bloc complet (C/ …, qualification …) — une ligne par ligne du modèle'
            value={affaire}
            onChange={setAffaire}
            multiline
            mono
          />
          <FieldRow
            id={`${uid}-obj`}
            label='OBJET : (ex. Plainte de … — reprendre la ligne « à la ligne » du sujet)'
            value={objet}
            onChange={setObjet}
            multiline
            mono
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-corps`} className='mb-1 block text-xs font-bold uppercase tracking-wide text-rose-400/90'>
          Corps du procès-verbal (à partir de « --- OFFICIER DE POLICE JUDICIAIRE… » ou équivalent selon l’énoncé)
        </label>
        <textarea
          id={`${uid}-corps`}
          value={corps}
          onChange={(e) => setCorps(e.target.value)}
          rows={14}
          className='w-full rounded-lg border border-rose-500/30 bg-navy-950/90 px-3 py-2 font-mono text-[12px] leading-relaxed text-white placeholder:text-slate-500 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20'
          placeholder={`--- OFFICIER DE POLICE JUDICIAIRE en résidence à …\n--- Étant au service.\n--- Constatons que …\n…\nL'intéressé(e)  L'interprète  L'O.P.J.`}
        />
      </div>

      <div>
        <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-slate-500'>Aperçu assemblé (contrôle)</h3>
        <div className='flex flex-col overflow-hidden rounded-none border border-gray-600 md:flex-row'>
          <div className='shrink-0 border-gray-600 bg-[#0a0f16] p-3 md:w-[min(100%,260px)] md:border-b-0 md:border-r'>
            <pre className='max-h-[480px] overflow-auto whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-gray-300'>
              {aperçu.left}
            </pre>
          </div>
          <div className='min-w-0 flex-1 bg-[#080c12] p-3'>
            <pre className='max-h-[480px] overflow-auto whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-gray-300'>
              {aperçu.right}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
