'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import {
  ME1_PV_CORPS_SQUELETTE_EX4,
  ME1_PV_CORPS_SQUELETTE_EX5,
  ME1_PV_ENTETE_GAUCHE_HAUT,
  PV_ME1_EXERCISE_STORAGE_KEY,
} from '@/data/pv-me1-plainte-exemple4';
import { cn } from '@/utils/cn';

const BLANK = 'xxx';

export type PVMe1ExerciseVariant = 'ex4' | 'ex5';

type Draft = {
  variant: PVMe1ExerciseVariant;
  coords: string;
  codeInsee: string;
  pvMarge: string;
  pvNum: string;
  an: string;
  jour: string;
  heure: string;
  nomOpj: string;
  grade: string;
  service: string;
  ville: string;
  affaire: string;
  objet: string;
  corps: string;
};

const EMPTY_DRAFT: Draft = {
  variant: 'ex4',
  coords: '',
  codeInsee: '',
  pvMarge: '',
  pvNum: '',
  an: '',
  jour: '',
  heure: '',
  nomOpj: '',
  grade: '',
  service: '',
  ville: '',
  affaire: '',
  objet: '',
  corps: '',
};

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

export const ME1_EX5_PARENTHESES_CONSIGNES = [
  'Mêmes parenthèses que l’incipit classique (dates, OPJ, service, ville).',
  'Plainte déposée « au nom de » : (… victime) en qualité de […].',
  'Contre […] pour (… faits) : crochets et parenthèses du fascicule à compléter.',
  'Lecture faite personnellement, M. (prénom, nom) : signataire représentant.',
];

function g(v: string): string {
  const t = v.trim();
  return t.length > 0 ? t : BLANK;
}

function draftFromState(
  variant: PVMe1ExerciseVariant,
  coords: string,
  codeInsee: string,
  pvMarge: string,
  pvNum: string,
  an: string,
  jour: string,
  heure: string,
  nomOpj: string,
  grade: string,
  service: string,
  ville: string,
  affaire: string,
  objet: string,
  corps: string,
): Draft {
  return {
    variant,
    coords,
    codeInsee,
    pvMarge,
    pvNum,
    an,
    jour,
    heure,
    nomOpj,
    grade,
    service,
    ville,
    affaire,
    objet,
    corps,
  };
}

/**
 * Exercice : compléter les champs structurés + rédiger le corps (lignes qui commencent par ---).
 */
export function PVRedactionPlainteExercise() {
  const uid = useId();
  const { toast } = useToast();
  const [hydrated, setHydrated] = useState(false);
  const [variant, setVariant] = useState<PVMe1ExerciseVariant>('ex4');
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PV_ME1_EXERCISE_STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw) as Partial<Draft>;
        if (d.variant === 'ex4' || d.variant === 'ex5') setVariant(d.variant);
        if (typeof d.coords === 'string') setCoords(d.coords);
        if (typeof d.codeInsee === 'string') setCodeInsee(d.codeInsee);
        if (typeof d.pvMarge === 'string') setPvMarge(d.pvMarge);
        if (typeof d.pvNum === 'string') setPvNum(d.pvNum);
        if (typeof d.an === 'string') setAn(d.an);
        if (typeof d.jour === 'string') setJour(d.jour);
        if (typeof d.heure === 'string') setHeure(d.heure);
        if (typeof d.nomOpj === 'string') setNomOpj(d.nomOpj);
        if (typeof d.grade === 'string') setGrade(d.grade);
        if (typeof d.service === 'string') setService(d.service);
        if (typeof d.ville === 'string') setVille(d.ville);
        if (typeof d.affaire === 'string') setAffaire(d.affaire);
        if (typeof d.objet === 'string') setObjet(d.objet);
        if (typeof d.corps === 'string') setCorps(d.corps);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(
          PV_ME1_EXERCISE_STORAGE_KEY,
          JSON.stringify(
            draftFromState(
              variant,
              coords,
              codeInsee,
              pvMarge,
              pvNum,
              an,
              jour,
              heure,
              nomOpj,
              grade,
              service,
              ville,
              affaire,
              objet,
              corps,
            ),
          ),
        );
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [
    hydrated,
    variant,
    coords,
    codeInsee,
    pvMarge,
    pvNum,
    an,
    jour,
    heure,
    nomOpj,
    grade,
    service,
    ville,
    affaire,
    objet,
    corps,
  ]);

  const aperçu = useMemo(() => {
    const coordBlock = coords.trim() || `${BLANK}\n${BLANK}`;
    const left = `${ME1_PV_ENTETE_GAUCHE_HAUT}\n${coordBlock}\nCODE INSEE : ${g(codeInsee)}\nP.V. : ${g(pvMarge)}\n__________`;

    const affaireBloc = affaire.trim() || `${BLANK}\n${BLANK}\n${BLANK}`;
    const corpsDefaut =
      variant === 'ex4'
        ? `--- ${BLANK}\n--- ${BLANK}\n… (corps complet Ex. 4 : lignes --- jusqu’aux signatures L’intéressé(e) / L’interprète / L’O.P.J.)`
        : `---\n---\n---\n--- Je dépose plainte contre ${BLANK} pour (…) au nom de ${BLANK} en qualité de ${BLANK}.\n… (lignes --- et signatures)`;
    const corpsBloc = corps.trim() || corpsDefaut;

    const entêteDroit =
      `PROCÈS-VERBAL\n` +
      `PV n° ${g(pvNum)}\n` +
      `L’an ${g(an)},\n` +
      `Le ${g(jour)}, à ${g(heure)}\n` +
      `Nous, ${g(nomOpj)}\n` +
      `${g(grade)}\n` +
      `En fonction à ${g(service)} de ${g(ville)}\n` +
      `OFFICIER DE POLICE JUDICIAIRE en résidence à ${g(ville)},\n` +
      `AFFAIRE :\n${affaireBloc}\n` +
      `OBJET :\n${g(objet)}\n`;

    const right = variant === 'ex4' ? `${entêteDroit}1\n2\n${corpsBloc}` : `${entêteDroit}${corpsBloc}`;

    return { left, right, full: `${left}\n\n— — —\n\n${right}` };
  }, [coords, codeInsee, pvMarge, pvNum, an, jour, heure, nomOpj, grade, service, ville, affaire, objet, corps, variant]);

  const resetAll = useCallback(() => {
    setVariant('ex4');
    setCoords('');
    setCodeInsee('');
    setPvMarge('');
    setPvNum('');
    setAn('');
    setJour('');
    setHeure('');
    setNomOpj('');
    setGrade('');
    setService('');
    setVille('');
    setAffaire('');
    setObjet('');
    setCorps('');
    try {
      localStorage.removeItem(PV_ME1_EXERCISE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast({ title: 'Réinitialisé', description: 'Brouillon effacé (y compris dans le navigateur).' });
  }, [toast]);

  const insertSkeleton = useCallback(() => {
    setCorps(variant === 'ex4' ? ME1_PV_CORPS_SQUELETTE_EX4 : ME1_PV_CORPS_SQUELETTE_EX5);
    toast({ title: 'Canevas inséré', description: variant === 'ex4' ? 'Squelette Ex. 4 (interprète).' : 'Squelette Ex. 5 (représentant).' });
  }, [variant, toast]);

  const copyAperçu = useCallback(() => {
    void navigator.clipboard.writeText(aperçu.full).then(
      () => toast({ title: 'Copié', description: 'Aperçu complet (gauche + droit).' }),
      () => toast({ title: 'Échec', description: 'Copie manuelle depuis l’aperçu.', variant: 'destructive' }),
    );
  }, [aperçu.full, toast]);

  const parenList = variant === 'ex4' ? ME1_EX4_PARENTHESES_CONSIGNES : ME1_EX5_PARENTHESES_CONSIGNES;

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 print:hidden sm:flex-row sm:flex-wrap sm:items-center'>
        <span className='text-xs font-medium text-slate-400'>Modèle d’exercice</span>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setVariant('ex4')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
              variant === 'ex4' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10',
            )}
          >
            Ex. 4 — Interprète
          </button>
          <button
            type='button'
            onClick={() => setVariant('ex5')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
              variant === 'ex5' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10',
            )}
          >
            Ex. 5 — Représentant
          </button>
        </div>
        <div className='flex flex-wrap gap-2 sm:ml-auto'>
          <button
            type='button'
            onClick={insertSkeleton}
            className='rounded-lg border border-violet-500/35 bg-violet-500/15 px-3 py-1.5 text-xs font-medium text-violet-200 hover:bg-violet-500/25'
          >
            Insérer le canevas ME1
          </button>
          <button
            type='button'
            onClick={copyAperçu}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
          >
            Copier l’aperçu
          </button>
          <button
            type='button'
            onClick={resetAll}
            className='rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-500/20'
          >
            Tout effacer
          </button>
        </div>
        {!hydrated ? <span className='text-[11px] text-slate-600'>Chargement du brouillon…</span> : <span className='text-[11px] text-slate-600'>Brouillon sauvegardé localement.</span>}
      </div>

      <div className='rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4 text-sm text-amber-100/95'>
        <p className='font-semibold text-amber-200'>Consignes type concours (épreuve 2)</p>
        <ul className='mt-2 list-inside list-disc space-y-1 text-amber-100/90'>
          <li>Les champs vides s’affichent comme {BLANK} dans l&apos;aperçu.</li>
          <li>
            Remplacez les indications <strong className='text-white'>entre parenthèses</strong> et les segments entre{' '}
            <strong className='text-white'>crochets</strong> selon le modèle choisi.
          </li>
          <li>
            <strong className='text-white'>Ex. 5</strong> : après l’OBJET, trois lignes <strong className='font-mono text-white'>---</strong> puis le corps (comme au
            fascicule).
          </li>
        </ul>
      </div>

      <div>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-slate-500'>Parenthèses / crochets à traiter</h3>
        <ul className='space-y-1 text-xs text-slate-400'>
          {parenList.map((t) => (
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
            label='Adresse et coordonnées du service'
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
          <FieldRow id={`${uid}-pvn`} label='PV n°' value={pvNum} onChange={setPvNum} mono />
          <FieldRow id={`${uid}-an`} label='L’an (année)' value={an} onChange={setAn} />
          <FieldRow id={`${uid}-jour`} label='Le (jour, mois)' value={jour} onChange={setJour} />
          <FieldRow id={`${uid}-heure`} label='à (heures, minutes)' value={heure} onChange={setHeure} />
          <FieldRow id={`${uid}-nopj`} label='Nous, (Prénom, NOM)' value={nomOpj} onChange={setNomOpj} />
          <FieldRow id={`${uid}-grade`} label='(Grade du rédacteur)' value={grade} onChange={setGrade} />
          <FieldRow id={`${uid}-srv`} label='En fonction à (service)' value={service} onChange={setService} />
          <FieldRow id={`${uid}-ville`} label='(VILLE) / résidence OPJ' value={ville} onChange={setVille} />
          <FieldRow
            id={`${uid}-aff`}
            label='AFFAIRE : bloc (C/ …, qualification …)'
            value={affaire}
            onChange={setAffaire}
            multiline
            mono
          />
          <FieldRow id={`${uid}-obj`} label='OBJET :' value={objet} onChange={setObjet} multiline mono />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-corps`} className='mb-1 block text-xs font-bold uppercase tracking-wide text-rose-400/90'>
          Corps du procès-verbal{' '}
          {variant === 'ex4' ? '(après les lignes 1 / 2 — pagination fascicule)' : '(dès la première ligne --- sous l’OBJET, comme l’Ex. 5 ME1)'}
        </label>
        <textarea
          id={`${uid}-corps`}
          value={corps}
          onChange={(e) => setCorps(e.target.value)}
          rows={14}
          className='w-full rounded-lg border border-rose-500/30 bg-navy-950/90 px-3 py-2 font-mono text-[12px] leading-relaxed text-white placeholder:text-slate-500 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20'
          placeholder={
            variant === 'ex4'
              ? '--- OFFICIER DE POLICE JUDICIAIRE…\n--- Étant au service.\n--- Constatons que…'
              : '---\n---\n---\n--- Je dépose plainte contre…'
          }
        />
      </div>

      <div>
        <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-slate-500'>Aperçu assemblé (contrôle)</h3>
        <p className='mb-2 text-[11px] text-slate-600 print:hidden'>
          Impression navigateur possible : les blocs passent en fond blanc si votre thème d’impression le permet.
        </p>
        <div className='flex flex-col overflow-hidden rounded-none border border-gray-600 print:border-black md:flex-row'>
          <div className='shrink-0 border-b border-gray-600 bg-[#0a0f16] p-3 print:bg-white md:w-[min(100%,260px)] md:border-b-0 md:border-r'>
            <pre className='max-h-[480px] overflow-auto whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-gray-300 print:text-black'>
              {aperçu.left}
            </pre>
          </div>
          <div className='min-w-0 flex-1 bg-[#080c12] p-3 print:bg-white'>
            <pre className='max-h-[480px] overflow-auto whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-gray-300 print:text-black'>
              {aperçu.right}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
