'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, FileDown, Lock, Play, SkipForward } from 'lucide-react';

import { DossierPiecesAccordion } from '@/components/dossier/DossierPiecesAccordion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import type { QuestionProcedure, SujetBlanc } from '@/data/sujets-blancs-types';

function formatMmSs(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type Props = {
  sujet: SujetBlanc;
  userHasPremium: boolean;
};

export function SujetBlancDetailClient({ sujet, userHasPremium }: Props) {
  const { toast } = useToast();
  const [tab, setTab] = useState('e1');

  /* --- Épreuve 1 chrono & corrigé --- */
  const [e1Running, setE1Running] = useState(false);
  const [e1Sec, setE1Sec] = useState(0);
  const [e1SkipCorrige, setE1SkipCorrige] = useState(false);

  useEffect(() => {
    if (!e1Running) return;
    const id = window.setInterval(() => setE1Sec((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [e1Running]);

  const canRevealCorrige =
    sujet.corrigeDisponible && sujet.epreuve1.corrige && (e1Sec >= 1800 || e1SkipCorrige);

  const printSujetE1 = useCallback(() => {
    window.print();
  }, []);

  /* --- Épreuve 2 réponses --- */
  const [qAnswers, setQAnswers] = useState<Record<number, string>>({});
  const [qCorr, setQCorr] = useState<Record<number, string>>({});

  const correctQuestion = useCallback(
    async (q: QuestionProcedure) => {
      const texte = qAnswers[q.numero] ?? '';
      if (texte.trim().length < 15) {
        toast({ title: 'Texte trop court', description: 'Rédigez au moins quelques lignes.', variant: 'destructive' });
        return;
      }
      try {
        const r = await fetch('/api/correction-rapport', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kind: 'procedure-reponse',
            texte,
            contexte: sujet.epreuve2.contexte,
            intituleQuestion: `${q.numero}. ${q.intitule} (barème /20 : ${q.bareme})`,
          }),
        });
        const j = (await r.json()) as { correction?: string; error?: string };
        if (!r.ok) {
          toast({ title: 'Correction', description: j.error ?? 'Erreur', variant: 'destructive' });
          return;
        }
        setQCorr((prev) => ({ ...prev, [q.numero]: j.correction ?? '' }));
      } catch {
        toast({ title: 'Réseau', variant: 'destructive' });
      }
    },
    [qAnswers, sujet.epreuve2.contexte, toast],
  );

  /* --- Épreuve 3 simulation --- */
  const [oralSim, setOralSim] = useState(false);
  const [oralStep, setOralStep] = useState(0);
  const [oralAnswers, setOralAnswers] = useState<Record<number, string>>({});
  const [oralRecap, setOralRecap] = useState(false);
  const [oralCorr, setOralCorr] = useState<string | null>(null);

  const questions = sujet.epreuve3.questionsJury;

  const runOralCorrection = useCallback(async () => {
    const blob = questions.map((q, i) => `Q${i + 1}: ${q}\nR: ${oralAnswers[i] ?? ''}`).join('\n\n');
    try {
      const r = await fetch('/api/correction-rapport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'procedure-reponse',
          texte: blob,
          contexte: sujet.epreuve3.sujetTire,
          intituleQuestion: 'Simulation oral jury magistrat + commissaire — feedback global',
        }),
      });
      const j = (await r.json()) as { correction?: string; error?: string };
      if (!r.ok) {
        toast({ title: 'Correction', description: j.error ?? 'Erreur', variant: 'destructive' });
        return;
      }
      setOralCorr(j.correction ?? '');
    } catch {
      toast({ title: 'Réseau', variant: 'destructive' });
    }
  }, [oralAnswers, questions, sujet.epreuve3.sujetTire, toast]);

  if (!userHasPremium) {
    return (
      <div className='rounded-2xl border border-examen-premium/30 bg-examen-premium/10 p-10 text-center'>
        <Lock className='mx-auto h-12 w-12 text-examen-premium' aria-hidden />
        <p className='mt-4 text-lg font-semibold text-white'>Sujet blanc complet — Premium</p>
        <p className='mt-2 text-sm text-examen-inkMuted'>
          Le contenu des trois épreuves (sujets, pièces, questions oral) est inclus dans l’abonnement Premium.
        </p>
        <Link
          href='/pricing'
          className='mt-6 inline-flex rounded-lg bg-examen-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-examen-accentHover'
        >
          Débloquer Premium
        </Link>
        <p className='mt-6 text-sm text-examen-inkMuted'>
          Thème : <span className='text-examen-ink'>{sujet.theme}</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Tabs value={tab} onValueChange={setTab} className='w-full'>
        <TabsList className='mb-6 flex h-auto w-full flex-wrap justify-start gap-1 border-b border-white/[0.08] bg-transparent p-0'>
          {[
            { id: 'e1', label: 'Épreuve 1 — DPG / DPS' },
            { id: 'e2', label: 'Épreuve 2 — Procédure' },
            { id: 'e3', label: 'Épreuve 3 — Oral' },
          ].map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className='relative rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-examen-inkMuted data-[state=active]:border-examen-accent data-[state=active]:text-examen-accent'
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='e1' className='space-y-6'>
          <div className='flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.08] bg-examen-card px-4 py-3 text-sm print-hidden'>
            <span>
              {sujet.epreuve1.duree} —{' '}
              <strong className='text-white'>Sans document</strong>
            </span>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='border-white/15'
              onClick={() => setE1Running((v) => !v)}
            >
              <Clock className='mr-1 h-4 w-4' aria-hidden />
              {e1Running ? 'Pause' : 'Démarrer le chrono'}
            </Button>
            <span className='font-mono text-examen-accent'>{formatMmSs(e1Sec)}</span>
            <Button type='button' variant='outline' size='sm' className='border-white/15' onClick={printSujetE1}>
              <FileDown className='mr-1 h-4 w-4' aria-hidden />
              Télécharger le sujet PDF
            </Button>
          </div>

          <div className='print-sujet-sheet rounded-xl border-2 border-white/[0.12] bg-examen-card p-6 md:p-8'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-examen-inkMuted'>Sujet — copie personnelle</p>
            <div className='mt-4 whitespace-pre-wrap font-display text-sm leading-relaxed text-examen-ink md:text-base'>
              {sujet.epreuve1.sujet}
            </div>
            <div className='mt-8 border-t border-white/[0.08] pt-6'>
              <p className='text-xs font-bold uppercase text-examen-inkMuted'>Consignes</p>
              <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-examen-ink'>
                {sujet.epreuve1.consignes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className='mt-6'>
              <p className='text-xs font-bold uppercase text-examen-inkMuted'>Méthodo</p>
              <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-examen-inkMuted'>
                {sujet.epreuve1.pointsMethodo.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {sujet.corrigeDisponible && sujet.epreuve1.corrige ? (
            <Accordion type='single' collapsible className='rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] print-hidden'>
              <AccordionItem value='corr'>
                <AccordionTrigger className='px-4 text-sm font-semibold text-emerald-100 hover:no-underline'>
                  Voir le corrigé (après 30 min de chrono ou passage forcé)
                </AccordionTrigger>
                <AccordionContent className='border-t border-emerald-500/15 px-4 pb-4'>
                  {!canRevealCorrige ? (
                    <div className='space-y-3 pt-2'>
                      <p className='text-sm text-examen-inkMuted'>
                        Encore {Math.max(0, 1800 - e1Sec)} secondes avant déblocage automatique — ou passez maintenant.
                      </p>
                      <Button
                        type='button'
                        size='sm'
                        variant='outline'
                        className='border-white/20'
                        onClick={() => setE1SkipCorrige(true)}
                      >
                        <SkipForward className='mr-1 h-4 w-4' aria-hidden />
                        Passer sans attendre
                      </Button>
                    </div>
                  ) : (
                    <div className='max-h-[min(70vh,480px)] overflow-y-auto whitespace-pre-wrap pt-2 text-sm leading-relaxed text-examen-ink'>
                      {sujet.epreuve1.corrige}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </TabsContent>

        <TabsContent value='e2' className='space-y-8'>
          <div className='rounded-xl border border-white/[0.08] bg-examen-card px-4 py-3 text-sm print-hidden'>
            {sujet.epreuve2.duree} — <strong className='text-white'>Code pénal et CPP autorisés</strong>
          </div>
          <div>
            <p className='text-sm font-semibold text-white'>Contexte</p>
            <p className='mt-2 text-sm leading-relaxed text-examen-inkMuted'>{sujet.epreuve2.contexte}</p>
          </div>
          <div>
            <p className='text-sm font-semibold text-white'>Dossier de pièces</p>
            <div className='mt-4'>
              <DossierPiecesAccordion pieces={sujet.epreuve2.pieces} />
            </div>
          </div>
          <div className='space-y-6'>
            <p className='text-sm font-semibold text-white'>Questions (note sur 20 indiquée par question)</p>
            {sujet.epreuve2.questions.map((q) => (
              <div key={q.numero} className='rounded-xl border border-white/[0.08] bg-white/[0.02] p-4'>
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <p className='font-medium text-examen-ink'>
                    {q.numero}. {q.intitule}
                  </p>
                  <span className='rounded-md bg-examen-accent/15 px-2 py-0.5 text-xs font-bold text-examen-accent'>
                    {q.bareme} pts
                  </span>
                </div>
                <p className='mt-1 text-[10px] uppercase text-examen-inkMuted'>Type : {q.type}</p>
                <label className='mt-3 block text-xs font-medium text-examen-inkMuted' htmlFor={`q-${q.numero}`}>
                  Votre réponse
                </label>
                <textarea
                  id={`q-${q.numero}`}
                  value={qAnswers[q.numero] ?? ''}
                  onChange={(e) => setQAnswers((prev) => ({ ...prev, [q.numero]: e.target.value }))}
                  rows={8}
                  className='mt-1 w-full rounded-lg border border-white/[0.1] bg-examen-canvas px-3 py-2 text-sm text-examen-ink'
                />
                <Button
                  type='button'
                  size='sm'
                  className='mt-2 bg-examen-accent text-white hover:bg-examen-accentHover'
                  onClick={() => void correctQuestion(q)}
                >
                  Corriger avec l’IA
                </Button>
                {qCorr[q.numero] ? (
                  <div className='mt-3 rounded-lg border border-violet-500/25 bg-violet-500/10 p-3 text-sm text-examen-ink'>
                    {qCorr[q.numero]}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='e3' className='space-y-6'>
          <div className='rounded-xl border border-white/[0.08] bg-examen-card px-4 py-3 text-sm'>
            {sujet.epreuve3.duree} — <strong className='text-white'>Jury : magistrat + commissaire</strong>
          </div>
          <div className='rounded-xl border-2 border-examen-accent/35 bg-examen-accent/10 p-6'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-examen-accent'>Sujet tiré au sort</p>
            <p className='mt-3 text-lg font-semibold text-white'>{sujet.epreuve3.sujetTire}</p>
          </div>

          <Accordion type='single' collapsible className='rounded-xl border border-white/[0.08] print-hidden'>
            <AccordionItem value='axes'>
              <AccordionTrigger className='px-4 text-sm text-examen-ink hover:no-underline'>
                Axes de travail (déplier si besoin — peut biaiser la préparation)
              </AccordionTrigger>
              <AccordionContent className='border-t border-white/[0.06] px-4 pb-4'>
                <ul className='list-disc space-y-2 pl-5 text-sm text-examen-inkMuted'>
                  {sujet.epreuve3.axesDeTravail.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {!oralSim ? (
            <Button
              type='button'
              className='bg-examen-premium text-white hover:brightness-110'
              onClick={() => {
                setOralSim(true);
                setOralStep(0);
                setOralRecap(false);
                setOralCorr(null);
              }}
            >
              <Play className='mr-2 h-4 w-4' aria-hidden />
              Démarrer la simulation
            </Button>
          ) : !oralRecap ? (
            <div className='rounded-xl border border-white/[0.1] bg-examen-card p-6'>
              <p className='text-xs text-examen-inkMuted'>
                Question {oralStep + 1} / {questions.length}
              </p>
              <p className='mt-3 text-base font-medium text-white'>{questions[oralStep]}</p>
              <textarea
                value={oralAnswers[oralStep] ?? ''}
                onChange={(e) => setOralAnswers((prev) => ({ ...prev, [oralStep]: e.target.value }))}
                rows={6}
                className='mt-4 w-full rounded-lg border border-white/[0.1] bg-examen-canvas px-3 py-2 text-sm text-examen-ink'
                placeholder='Votre réponse orale structurée…'
              />
              <div className='mt-4 flex flex-wrap gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  disabled={oralStep === 0}
                  onClick={() => setOralStep((s) => Math.max(0, s - 1))}
                >
                  <ChevronLeft className='h-4 w-4' aria-hidden />
                </Button>
                {oralStep < questions.length - 1 ? (
                  <Button type='button' size='sm' onClick={() => setOralStep((s) => s + 1)}>
                    Suivante
                    <ChevronRight className='ml-1 h-4 w-4' aria-hidden />
                  </Button>
                ) : (
                  <Button
                    type='button'
                    size='sm'
                    className='bg-examen-accent text-white'
                    onClick={() => setOralRecap(true)}
                  >
                    Terminer
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <p className='text-sm font-semibold text-white'>Récapitulatif de vos réponses</p>
              <ul className='space-y-4'>
                {questions.map((qq, i) => (
                  <li key={i} className='rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm'>
                    <p className='font-medium text-examen-accent'>Q{i + 1}</p>
                    <p className='text-examen-inkMuted'>{qq}</p>
                    <p className='mt-2 whitespace-pre-wrap text-examen-ink'>{oralAnswers[i] || '—'}</p>
                  </li>
                ))}
              </ul>
              <Button type='button' className='bg-violet-600 text-white hover:bg-violet-500' onClick={() => void runOralCorrection()}>
                Correction IA globale
              </Button>
              {oralCorr ? (
                <div className='whitespace-pre-wrap rounded-lg border border-violet-500/30 bg-violet-500/10 p-4 text-sm text-examen-ink'>
                  {oralCorr}
                </div>
              ) : null}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
