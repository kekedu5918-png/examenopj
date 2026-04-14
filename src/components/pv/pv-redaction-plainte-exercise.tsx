'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { PVMe1DocumentShell } from '@/components/pv/pv-me1-document-shell';
import { useToast } from '@/components/ui/use-toast';
import {
  ME1_PV_BLOC_DROIT_EX4,
  ME1_PV_BLOC_DROIT_EX5,
  ME1_PV_CORPS_SQUELETTE_EX4,
  ME1_PV_CORPS_SQUELETTE_EX5,
  ME1_PV_ENTETE_GAUCHE_EX4,
  ME1_PV_ENTETE_GAUCHE_HAUT,
  PV_ME1_EXERCISE_STORAGE_KEY,
} from '@/data/pv-me1-plainte-exemple4';
import { cn } from '@/utils/cn';

export type PVMe1ExerciseVariant = 'ex4' | 'ex5';

const STORAGE_V2 = 'examenopj-pv-me1-exercise-v2';

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
  'Contre […] pour (… faits) : crochets et parenthèses du modèle officiel à compléter.',
  'Lecture faite personnellement, M. (prénom, nom) : signataire représentant.',
];

const BLANK = 'xxx';

function g(v: string): string {
  const t = v.trim();
  return t.length > 0 ? t : BLANK;
}

type LegacyV1 = {
  variant?: PVMe1ExerciseVariant;
  coords?: string;
  codeInsee?: string;
  pvMarge?: string;
  pvNum?: string;
  an?: string;
  jour?: string;
  heure?: string;
  nomOpj?: string;
  grade?: string;
  service?: string;
  ville?: string;
  affaire?: string;
  objet?: string;
  corps?: string;
};

function migrateV1ToColumns(d: LegacyV1): { variant: PVMe1ExerciseVariant; left: string; right: string } | null {
  if (typeof d.coords !== 'string' && typeof d.pvNum !== 'string') return null;
  const variant = d.variant === 'ex5' ? 'ex5' : 'ex4';
  const coordBlock = (d.coords ?? '').trim() || `${BLANK}\n${BLANK}`;
  const left = `${ME1_PV_ENTETE_GAUCHE_HAUT}\n${coordBlock}\nCODE INSEE : ${g(d.codeInsee ?? '')}\nP.V. : ${g(d.pvMarge ?? '')}\n__________`;

  const affaireBloc = (d.affaire ?? '').trim() || `${BLANK}\n${BLANK}\n${BLANK}`;
  const corpsDefaut =
    variant === 'ex4'
      ? `--- ${BLANK}\n--- ${BLANK}\n… (corps complet Ex. 4 : lignes --- jusqu’aux signatures L’intéressé(e) / L’interprète / L’O.P.J.)`
      : `---\n---\n---\n--- Je dépose plainte contre ${BLANK} pour (…) au nom de ${BLANK} en qualité de ${BLANK}.\n… (lignes --- et signatures)`;
  const corpsBloc = (d.corps ?? '').trim() || corpsDefaut;

  const entêteDroit =
    `PROCÈS-VERBAL\n` +
    `PV n° ${g(d.pvNum ?? '')}\n` +
    `L’an ${g(d.an ?? '')},\n` +
    `Le ${g(d.jour ?? '')}, à ${g(d.heure ?? '')}\n` +
    `Nous, ${g(d.nomOpj ?? '')}\n` +
    `${g(d.grade ?? '')}\n` +
    `En fonction à ${g(d.service ?? '')} de ${g(d.ville ?? '')}\n` +
    `OFFICIER DE POLICE JUDICIAIRE en résidence à ${g(d.ville ?? '')},\n` +
    `AFFAIRE :\n${affaireBloc}\n` +
    `OBJET :\n${g(d.objet ?? '')}\n`;

  const right = variant === 'ex4' ? `${entêteDroit}1\n2\n${corpsBloc}` : `${entêteDroit}${corpsBloc}`;

  return { variant, left, right };
}

function defaultsForVariant(v: PVMe1ExerciseVariant): { left: string; right: string } {
  if (v === 'ex5') {
    return { left: ME1_PV_ENTETE_GAUCHE_EX4, right: ME1_PV_BLOC_DROIT_EX5 };
  }
  return { left: ME1_PV_ENTETE_GAUCHE_EX4, right: ME1_PV_BLOC_DROIT_EX4 };
}

/**
 * Exercice plainte : deux colonnes éditables (marge / bloc principal), calées sur le support ME1.
 */
export function PVRedactionPlainteExercise() {
  const { toast } = useToast();
  const [hydrated, setHydrated] = useState(false);
  const [variant, setVariant] = useState<PVMe1ExerciseVariant>('ex4');
  const [leftDoc, setLeftDoc] = useState('');
  const [rightDoc, setRightDoc] = useState('');

  useEffect(() => {
    try {
      const rawV2 = localStorage.getItem(STORAGE_V2);
      if (rawV2) {
        const j = JSON.parse(rawV2) as { variant?: string; left?: string; right?: string };
        if (j.variant === 'ex4' || j.variant === 'ex5') setVariant(j.variant);
        if (typeof j.left === 'string') setLeftDoc(j.left);
        if (typeof j.right === 'string') setRightDoc(j.right);
        setHydrated(true);
        return;
      }
      const rawV1 = localStorage.getItem(PV_ME1_EXERCISE_STORAGE_KEY);
      if (rawV1) {
        const d = JSON.parse(rawV1) as LegacyV1;
        const mig = migrateV1ToColumns(d);
        if (mig) {
          setVariant(mig.variant);
          setLeftDoc(mig.left);
          setRightDoc(mig.right);
          localStorage.setItem(STORAGE_V2, JSON.stringify({ variant: mig.variant, left: mig.left, right: mig.right }));
        }
      } else {
        const d = defaultsForVariant('ex4');
        setLeftDoc(d.left);
        setRightDoc(d.right);
      }
    } catch {
      const d = defaultsForVariant('ex4');
      setLeftDoc(d.left);
      setRightDoc(d.right);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_V2, JSON.stringify({ variant, left: leftDoc, right: rightDoc }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [hydrated, variant, leftDoc, rightDoc]);

  const fullDoc = useMemo(() => `${leftDoc}\n\n— — —\n\n${rightDoc}`, [leftDoc, rightDoc]);

  const applyVariantDefaults = useCallback(
    (v: PVMe1ExerciseVariant) => {
      const d = defaultsForVariant(v);
      setVariant(v);
      setLeftDoc(d.left);
      setRightDoc(d.right);
      toast({ title: 'Modèle rechargé', description: v === 'ex4' ? 'Exemple 4 — interprète.' : 'Exemple 5 — représentant.' });
    },
    [toast],
  );

  const insertSkeletonCorps = useCallback(() => {
    setRightDoc((prev) => {
      const inject = variant === 'ex4' ? ME1_PV_CORPS_SQUELETTE_EX4 : ME1_PV_CORPS_SQUELETTE_EX5;
      if (prev.includes('---')) return `${prev.trim()}\n\n${inject}`;
      return inject;
    });
    toast({ title: 'Canevas inséré', description: 'Bloc de corps ajouté en fin de colonne droite (ajustez si besoin).' });
  }, [variant, toast]);

  const resetAll = useCallback(() => {
    applyVariantDefaults(variant);
    try {
      localStorage.removeItem(STORAGE_V2);
      localStorage.removeItem(PV_ME1_EXERCISE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast({ title: 'Réinitialisé', description: 'Colonnes remises au modèle vierge ME1.' });
  }, [variant, applyVariantDefaults, toast]);

  const copyFull = useCallback(() => {
    void navigator.clipboard.writeText(fullDoc).then(
      () => toast({ title: 'Copié', description: 'Document complet (marge + bloc principal).' }),
      () => toast({ title: 'Échec', description: 'Copie manuelle.', variant: 'destructive' }),
    );
  }, [fullDoc, toast]);

  const parenList = variant === 'ex4' ? ME1_EX4_PARENTHESES_CONSIGNES : ME1_EX5_PARENTHESES_CONSIGNES;

  const colClass =
    'min-h-[280px] w-full resize-y bg-transparent font-mono text-[11px] leading-relaxed text-gray-100 placeholder:text-slate-600 focus:border-0 focus:outline-none focus:ring-0 md:min-h-[520px]';

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 print:hidden sm:flex-row sm:flex-wrap sm:items-center'>
        <span className='text-xs font-medium text-slate-400'>Modèle officiel</span>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => applyVariantDefaults('ex4')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
              variant === 'ex4' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10',
            )}
          >
            Ex. 4 — Interprète
          </button>
          <button
            type='button'
            onClick={() => applyVariantDefaults('ex5')}
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
            onClick={insertSkeletonCorps}
            className='rounded-lg border border-violet-500/35 bg-violet-500/15 px-3 py-1.5 text-xs font-medium text-violet-200 hover:bg-violet-500/25'
          >
            Insérer canevas corps (lignes ---)
          </button>
          <button
            type='button'
            onClick={copyFull}
            className='rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10'
          >
            Copier tout le PV
          </button>
          <button
            type='button'
            onClick={resetAll}
            className='rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-500/20'
          >
            Réinitialiser
          </button>
        </div>
        {!hydrated ? (
          <span className='text-[11px] text-slate-600'>Chargement du brouillon…</span>
        ) : (
          <span className='text-[11px] text-slate-600'>Brouillon sauvegardé localement.</span>
        )}
      </div>

      <details className='rounded-xl border border-amber-500/25 bg-amber-500/[0.07] print:hidden'>
        <summary className='cursor-pointer px-4 py-3 text-sm font-semibold text-amber-200'>
          Consignes &amp; liste des parenthèses à traiter
        </summary>
        <div className='border-t border-amber-500/20 px-4 py-3 text-sm text-amber-100/95'>
          <ul className='list-inside list-disc space-y-1'>
            <li>
              Remplacez chaque indication <strong className='text-white'>entre parenthèses</strong> sur le document, comme sur une
              copie papier ME1.
            </li>
            <li>
              Colonne gauche = marge (République, adresse, code INSEE, n° PV). Colonne droite = procès-verbal et corps avec lignes{' '}
              <strong className='font-mono text-white'>---</strong>.
            </li>
            <li>
              <strong className='text-white'>Ex. 5</strong> : vérifier les trois lignes <strong className='font-mono text-white'>---</strong> sous
              l’OBJET avant le corps, comme sur le modèle ME1.
            </li>
          </ul>
          <p className='mt-4 text-xs font-bold uppercase tracking-wide text-amber-300/90'>Rappel des zones typiques</p>
          <ul className='mt-2 space-y-1 text-xs text-amber-100/80'>
            {parenList.map((t) => (
              <li key={t} className='flex gap-2'>
                <span className='text-amber-600/80' aria-hidden>
                  →
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
          Feuille de procès-verbal — gabarit deux colonnes (PDF ME1)
        </h3>
        <p className='mb-3 text-[11px] text-slate-500'>
          Marge étroite à gauche, corps du PV à droite, filet de séparation — comme l’imposé du support ME1.
        </p>
        <div className='max-h-[min(78vh,940px)] overflow-auto print:max-h-none'>
          <PVMe1DocumentShell
            plain
            left={
              <textarea
                id='pv-col-left'
                value={leftDoc}
                onChange={(e) => setLeftDoc(e.target.value)}
                className={colClass}
                spellCheck={false}
                autoComplete='off'
                aria-label='Marge gauche — en-tête service'
              />
            }
            right={
              <textarea
                id='pv-col-right'
                value={rightDoc}
                onChange={(e) => setRightDoc(e.target.value)}
                className={colClass}
                spellCheck={false}
                autoComplete='off'
                aria-label='Bloc principal — AFFAIRE, OBJET, corps, signatures'
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
