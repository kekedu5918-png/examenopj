'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Headphones, Pause, Play, RotateCcw, Square } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { stripMdBold } from '@/utils/infraction-display-derive';
import { chunkForSpeech, listFrenchVoicesRanked, textForSpeech } from '@/utils/infraction-speech';

type Props = {
  infractionLabel: string;
  legal: string;
  materiel: string;
  moral: string;
  className?: string;
};

const RATE_MIN = 0.82;
const RATE_MAX = 1;

/**
 * Lecture vocale L → M → M en chaîne, avec boucle et choix de voix française.
 * Utilise la synthèse du navigateur : sur Edge / Chrome, choisir une voix « Google » ou « Neural » si disponible.
 */
export function InfractionAudioCoach({ infractionLabel, legal, materiel, moral, className }: Props) {
  const idBase = useId();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState<string>('');
  const [rate, setRate] = useState(0.9);
  const [loop, setLoop] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<string>('');
  const cancelRef = useRef(false);

  const label = useMemo(() => textForSpeech(stripMdBold(infractionLabel)), [infractionLabel]);

  const scriptParts = useMemo(() => {
    const intro = `Infraction : ${label}.`;
    const leg = chunkForSpeech(stripMdBold(legal));
    const matParts = chunkForSpeech(stripMdBold(materiel));
    const morParts = chunkForSpeech(stripMdBold(moral));
    const out: { tag: string; text: string }[] = [{ tag: 'intro', text: intro }];
    leg.forEach((t, i) => out.push({ tag: `légal-${i}`, text: `Élément légal. ${t}` }));
    matParts.forEach((t, i) => out.push({ tag: `matériel-${i}`, text: `Élément matériel. ${t}` }));
    morParts.forEach((t, i) => out.push({ tag: `moral-${i}`, text: `Élément moral. ${t}` }));
    return out;
  }, [label, legal, materiel, moral]);

  const refreshVoices = useCallback(() => {
    const ranked = listFrenchVoicesRanked();
    setVoices(ranked);
    if (ranked.length && !voiceUri) {
      setVoiceUri(ranked[0]!.voiceURI);
    }
  }, [voiceUri]);

  useEffect(() => {
    refreshVoices();
    const w = window.speechSynthesis;
    w.addEventListener('voiceschanged', refreshVoices);
    return () => w.removeEventListener('voiceschanged', refreshVoices);
  }, [refreshVoices]);

  const stop = useCallback(() => {
    cancelRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPhase('');
  }, []);

  const runFromIndex = useCallback(
    (startIdx: number) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      cancelRef.current = false;
      window.speechSynthesis.cancel();

      const voiceObj = voices.find((v) => v.voiceURI === voiceUri) ?? voices[0];

      const speakIdx = (i: number) => {
        if (cancelRef.current) {
          setPlaying(false);
          setPhase('');
          return;
        }
        if (i >= scriptParts.length) {
          if (loop) {
            speakIdx(0);
            return;
          }
          setPlaying(false);
          setPhase('');
          return;
        }
        const part = scriptParts[i]!;
        setPhase(
          part.tag.startsWith('légal')
            ? 'Élément légal'
            : part.tag.startsWith('matériel')
              ? 'Élément matériel'
              : part.tag.startsWith('moral')
                ? 'Élément moral'
                : 'Introduction',
        );
        const u = new SpeechSynthesisUtterance(part.text);
        u.lang = 'fr-FR';
        u.rate = rate;
        u.pitch = 1;
        if (voiceObj) u.voice = voiceObj;
        u.onend = () => speakIdx(i + 1);
        u.onerror = () => {
          setPlaying(false);
          setPhase('');
        };
        window.speechSynthesis.speak(u);
      };

      setPlaying(true);
      speakIdx(startIdx);
    },
    [voices, voiceUri, rate, loop, scriptParts],
  );

  const pauseResume = useCallback(() => {
    const w = window.speechSynthesis;
    if (w.speaking && !w.paused) {
      w.pause();
      setPhase((p) => (p ? `${p} (pause)` : 'Pause'));
    } else if (w.paused) {
      w.resume();
    }
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div
      className={cn(
        'rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/[0.12] to-transparent p-4',
        className,
      )}
    >
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex items-start gap-2'>
          <span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-200'>
            <Headphones className='h-4 w-4' aria-hidden />
          </span>
          <div>
            <h3 className='text-xs font-bold uppercase tracking-wide text-violet-200'>Révision vocale</h3>
            <p className='mt-1 max-w-md text-[11px] leading-relaxed text-slate-400'>
              Écoute en boucle légal, matériel et moral. Pour une voix plus naturelle, utilisez{' '}
              <strong className='font-medium text-slate-300'>Chrome ou Edge</strong> et, si proposé, une voix{' '}
              <strong className='font-medium text-slate-300'>Google français</strong> ou{' '}
              <strong className='font-medium text-slate-300'>Neural</strong> dans le menu ci‑dessous.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-2'>
        <Button
          type='button'
          size='sm'
          variant='secondary'
          className='gap-1.5 border-violet-500/30 bg-violet-500/15 text-violet-50 hover:bg-violet-500/25'
          onClick={() => runFromIndex(0)}
        >
          <Play className='h-3.5 w-3.5' aria-hidden />
          Lire / relancer
        </Button>
        <Button type='button' size='sm' variant='outline' className='gap-1.5 border-white/15' onClick={pauseResume}>
          <Pause className='h-3.5 w-3.5' aria-hidden />
          Pause / reprendre
        </Button>
        <Button type='button' size='sm' variant='outline' className='gap-1.5 border-white/15' onClick={stop}>
          <Square className='h-3.5 w-3.5' aria-hidden />
          Stop
        </Button>
        <label className='ml-1 flex cursor-pointer items-center gap-2 text-xs text-slate-400'>
          <input
            type='checkbox'
            className='rounded border-white/20 bg-navy-900'
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
          />
          Boucle
        </label>
      </div>

      <div className='mt-4 grid gap-3 sm:grid-cols-2'>
        <div>
          <label className='text-[10px] font-semibold uppercase tracking-wide text-slate-500' htmlFor={`${idBase}-voice`}>
            Voix (français)
          </label>
          <select
            id={`${idBase}-voice`}
            value={voiceUri}
            onChange={(e) => setVoiceUri(e.target.value)}
            className='mt-1 w-full rounded-lg border border-white/10 bg-navy-950/80 px-2 py-2 text-xs text-slate-200'
          >
            {voices.length === 0 ? <option value=''>Chargement des voix…</option> : null}
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-[10px] font-semibold uppercase tracking-wide text-slate-500' htmlFor={`${idBase}-rate`}>
            Débit ({rate.toFixed(2)})
          </label>
          <input
            id={`${idBase}-rate`}
            type='range'
            min={RATE_MIN}
            max={RATE_MAX}
            step={0.02}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className='mt-2 w-full accent-violet-500'
          />
          <p className='mt-1 text-[10px] text-slate-600'>Un peu plus lent aide à mémoriser.</p>
        </div>
      </div>

      {playing && phase ? (
        <p className='mt-3 flex items-center gap-2 text-xs text-violet-200/90'>
          <RotateCcw className='h-3.5 w-3.5 shrink-0 animate-spin' style={{ animationDuration: '3s' }} aria-hidden />
          {phase}
        </p>
      ) : null}
    </div>
  );
}
