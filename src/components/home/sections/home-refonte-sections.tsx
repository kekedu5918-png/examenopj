'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Crosshair,
  FileEdit,
  Gavel,
  Layers,
  Map,
  Mic,
  Quote,
  Scale,
  Shield,
  Sparkles,
} from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ENQUETES } from '@/data/enquetes-data';
import { getDaysUntilExam } from '@/lib/exam-countdown';

export type InfractionPreviewItem = {
  id: string;
  infraction: string;
  /** Libellé famille (ex. « Contre les biens ») — jamais de code Fxx côté accueil. */
  familleLabel: string;
};

/** Section 2 — Par où commencer (homepage). */
export function StartHereSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const cards = [
    {
      Icon: Map,
      color: 'blue' as const,
      step: '01',
      title: 'Je découvre',
      text: 'Comprendre les 3 épreuves, les coefficients et le déroulé du jour J.',
      cta: 'Voir les épreuves',
      href: '/epreuves',
    },
    {
      Icon: BookOpen,
      color: 'violet' as const,
      step: '02',
      title: 'Je révise le fond',
      text: 'Fiches fondamentaux, infractions et procédure alignées sur le programme officiel.',
      cta: 'Ouvrir les fondamentaux',
      href: '/fondamentaux',
    },
    {
      Icon: Crosshair,
      color: 'cyan' as const,
      step: '03',
      title: "Je m'entraîne",
      text: "Enquêtes types, modèles de PV et articulation comme en formation.",
      cta: 'Lancer une enquête',
      href: '/enquetes',
    },
  ] as const;

  const colorMap = {
    blue:   { icon: 'border-blue-500/20 bg-blue-500/10 text-blue-400',    card: 'hover:border-blue-500/30 hover:bg-blue-500/[0.04]',    step: 'text-blue-500/40' },
    violet: { icon: 'border-violet-500/20 bg-violet-500/10 text-violet-400', card: 'hover:border-violet-500/30 hover:bg-violet-500/[0.04]', step: 'text-violet-500/40' },
    cyan:   { icon: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',    card: 'hover:border-cyan-500/30 hover:bg-cyan-500/[0.04]',    step: 'text-cyan-500/40' },
  } as const;

  return (
    <motion.section
      className='border-t border-ij-border/50 bg-ij-bg px-4 py-20 md:py-28'
      aria-labelledby='start-here-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='start-here-title'
          badge='PARCOURS'
          badgeClassName='text-cyan-200'
          title='Par où commencer ?'
          titleGradient
          size='display'
          subtitle='Trois gestes qui structurent ta préparation — du cadre officiel à la mise en situation.'
          className='mx-auto mb-14 max-w-3xl text-center'
        />
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {cards.map((c, i) => {
            const colors = colorMap[c.color];
            return (
              <motion.div
                key={c.href}
                initial={MOTION_INITIAL_FOR_SEO}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: LANDING_EASE, delay: i * 0.08 }}
              >
                <MotionLink
                  href={c.href}
                  className={[
                    'group relative flex h-full flex-col overflow-hidden rounded-3xl',
                    'border border-ij-border/70 bg-gradient-to-b from-ij-surface-2/35 to-ij-surface-2/15 p-6 md:p-7',
                    'transition-all duration-300',
                    colors.card,
                    'shadow-ij-elevated ring-1 ring-ij-border/40',
                  ].join(' ')}
                  whileTap={{ scale: 0.97 }}
                  whileHover={shouldReduce ? {} : { y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <span
                    className={['pointer-events-none absolute right-4 top-3 font-mono text-5xl font-black', colors.step].join(' ')}
                    aria-hidden
                  >
                    {c.step}
                  </span>
                  <span className='pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ij-border/60 to-transparent' aria-hidden />
                  <span className={['flex h-11 w-11 items-center justify-center rounded-xl border', colors.icon].join(' ')}>
                    <c.Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className='mt-5 font-ij-sans text-lg font-bold text-ij-text'>{c.title}</h3>
                  <p className='mt-2 flex-1 text-sm leading-relaxed text-ij-text-muted'>{c.text}</p>
                  <span className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ij-text-muted transition-colors group-hover:text-ij-text'>
                    {c.cta}
                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' aria-hidden />
                  </span>
                </MotionLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

/** Section 3 — Enquêtes (pilier n°1). */
export function HomeEnquetesPillarSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const parentVariants: Variants | undefined = shouldReduce
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07 },
        },
      };
  const cardVariants: Variants | undefined = shouldReduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        },
      };

  return (
    <motion.section
      id='enquetes-pilier'
      className='scroll-mt-24 px-4 py-20 md:py-28'
      aria-labelledby='enquetes-pilier-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionTitle
            titleId='enquetes-pilier-title'
            badge='PILIER N°1 · Exclusif'
            badgeClassName='text-violet-200'
            title='Les enquêtes — la trame de la formation'
            titleGradient
            size='display'
            subtitle='Chaque enquête suit exactement le cadre travaillé en formation présentielle.'
            className='mx-auto mb-12 max-w-3xl text-center'
          />
        </motion.div>
        <motion.div
          className='mx-auto mt-6 max-w-4xl space-y-4'
          variants={parentVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {ENQUETES.slice(0, 4).map((e) => (
            <motion.div key={e.id} variants={cardVariants}>
              <Link
                href={`/enquetes/${e.id}`}
                className='home-enquete-card-horizontal group flex flex-col gap-3 rounded-2xl border border-ij-border/70 bg-gradient-to-r from-ij-surface/90 to-ij-surface-2/25 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-ij-accent/35 hover:shadow-xl hover:shadow-black/30 sm:flex-row sm:items-center sm:justify-between sm:gap-6'
              >
                <div className='flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6'>
                  <span className='home-enquete-code-large font-ij-display text-2xl text-ij-text sm:w-36 sm:shrink-0'>
                    {e.code}
                  </span>
                  <p className='min-w-0 flex-1 text-sm font-medium leading-snug text-ij-text'>{e.titre}</p>
                </div>
                <div className='flex flex-shrink-0 flex-wrap items-center gap-2 sm:justify-end'>
                  <span className='rounded border border-ij-border/80 bg-ij-surface-2/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ij-text-subtle'>
                    Épreuve 1
                  </span>
                  <span className='rounded border border-ij-border/80 bg-ij-surface-2/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ij-text-subtle'>
                    Épreuve 2
                  </span>
                  <span className='text-xs font-semibold text-ij-accent transition group-hover:text-ij-accent/90'>
                    Ouvrir →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className='mt-10 flex flex-col items-center text-center'>
          <MotionLink
            href='/enquetes'
            className='inline-flex items-center gap-2 rounded-md bg-ij-accent px-6 py-3 text-sm font-semibold text-ij-bg shadow-ij-soft transition hover:opacity-90'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Voir les 10 enquêtes
            <ArrowRight className='h-4 w-4' aria-hidden />
          </MotionLink>
        </div>
      </div>
    </motion.section>
  );
}

/** Section 4 — Épreuves (épreuve 2 mise en avant). */
export function HomeEpreuvesLandingSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  return (
    <motion.section
      className='border-t border-ij-border/60 bg-ij-surface-2/20 px-4 py-20 md:py-28'
      aria-labelledby='home-epreuves-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='home-epreuves-title'
          badge='ÉPREUVES'
          badgeClassName='text-rose-200'
          title='3 épreuves. Une méthode pour chacune.'
          titleGradient
          size='display'
          subtitle="Beaucoup de candidats arrivent sans savoir exactement ce qui les attend. Voici ce que l'examen demande."
          className='mx-auto mb-12 max-w-3xl text-center'
        />
        <div className='grid gap-6 md:grid-cols-3'>
          <MotionLink
            href='/epreuves/epreuve-1'
            className='group rounded-3xl border border-ij-border/70 bg-gradient-to-b from-ij-surface-2/40 to-ij-surface-2/15 p-7 shadow-lg shadow-black/20 ring-1 ring-ij-border/40 transition hover:border-rose-500/35'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Scale className='h-10 w-10 text-rose-400' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-ij-display text-lg font-bold text-ij-text'>Épreuve 1</h3>
            <p className='mt-1 text-sm text-ij-text-muted'>DPG / DPS — 3 h · coef. 2</p>
            <p className='mt-3 text-sm text-ij-text'>Qualification des infractions.</p>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ij-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>

          <MotionLink
            href='/epreuves/epreuve-2'
            className='group relative rounded-3xl border-2 border-ij-accent/55 bg-gradient-to-br from-ij-accent/20 via-ij-surface-2/25 to-transparent p-7 shadow-[0_0_48px_rgba(212,168,83,0.15)] ring-1 ring-ij-accent/25 transition hover:border-ij-accent hover:shadow-[0_0_56px_rgba(212,168,83,0.2)]'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className='absolute right-4 top-4 rounded-full bg-amber-500/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
              La plus technique
            </span>
            <FileEdit className='h-10 w-10 text-ij-accent' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-ij-display text-lg font-bold text-ij-text'>Épreuve 2</h3>
            <p className='mt-1 text-sm text-ij-text-muted'>Procédure pénale — 4 h</p>
            <ul className='mt-3 space-y-1.5 text-sm text-ij-text'>
              <li className='flex gap-2'>
                <span className='text-ij-accent'>·</span> Rédaction de PV
              </li>
              <li className='flex gap-2'>
                <span className='text-ij-accent'>·</span> Articulation de procédure
              </li>
              <li className='flex gap-2'>
                <span className='text-ij-accent'>·</span> Rapport de synthèse
              </li>
            </ul>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ij-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>

          <MotionLink
            href='/epreuves/epreuve-3'
            className='group rounded-3xl border border-ij-border/70 bg-gradient-to-b from-ij-surface-2/40 to-ij-surface-2/15 p-7 shadow-lg shadow-black/20 ring-1 ring-ij-border/40 transition hover:border-emerald-500/35'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Mic className='h-10 w-10 text-emerald-400' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-ij-display text-lg font-bold text-ij-text'>Épreuve 3</h3>
            <p className='mt-1 text-sm text-ij-text-muted'>Oral — mise en situation</p>
            <p className='mt-3 text-sm text-ij-text'>40 min de préparation · jury magistrat et commissaire.</p>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ij-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>
        </div>
        <p className='mt-10 text-center'>
          <Link href='/epreuves' className='text-sm font-semibold text-ij-accent underline-offset-2 hover:underline'>
            Vue d’ensemble des 3 épreuves →
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

/**
 * @deprecated Composant non monté sur / au 2026-04-19.
 * Tokens legacy conservés intentionnellement — à migrer ou supprimer en Phase 3
 * (décomposition de home-refonte-sections.tsx).
 */
export function HomeInfractionsPreviewSection({ items }: { items: InfractionPreviewItem[] }) {
  return (
    <section className='px-4 py-20 md:py-28' aria-labelledby='home-infractions-title'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='home-infractions-title'
          badge='ÉPREUVE 1'
          badgeClassName='bg-amber-500/20 text-amber-200'
          title="55 infractions à maîtriser pour l'épreuve 1"
          subtitle="Chaque infraction : élément légal, matériel, moral, et les pièges de l'examen. Aucune ne doit t'échapper."
          className='mx-auto mb-8 max-w-2xl text-center'
        />
        <Accordion type='single' collapsible className='w-full space-y-2'>
          {items.map((it) => (
            <AccordionItem key={it.id} value={it.id} className='rounded-xl border border-white/[0.08] bg-white/[0.02] px-4'>
              <AccordionTrigger className='flex flex-col items-stretch gap-2 py-4 text-left hover:no-underline sm:flex-row sm:items-start'>
                <span className='flex flex-wrap gap-2'>
                  <span className='shrink-0 rounded-md bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-200'>
                    Épreuve 1 — Qualification
                  </span>
                  <span className='shrink-0 rounded-md border border-white/10 px-2 py-0.5 font-mono-label text-[10px] text-examen-inkMuted'>
                    {it.familleLabel}
                  </span>
                </span>
                <span className='min-w-0 flex-1 font-medium text-white'>
                  <FlashcardRichText text={it.infraction} inline />
                </span>
              </AccordionTrigger>
              <AccordionContent className='pb-4 text-sm text-examen-inkMuted'>
                <Link href='/infractions' className='text-examen-accent hover:underline'>
                  Ouvrir le référentiel complet →
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className='mt-10 text-center'>
          <Link
            href='/infractions'
            className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]'
          >
            Voir les 55 infractions
            <ArrowRight className='h-4 w-4' aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

const FOND_BLOCS = [
  { icon: Map, title: "Cadres d'enquête", line: 'Flagrance, préliminaire, instruction…' },
  { icon: Shield, title: "Contrôle d'identité", line: 'Art. 78-1 à 78-6 CPP' },
  { icon: Gavel, title: 'Garde à vue', line: 'Placement, droits, durées' },
  { icon: BookOpen, title: 'Audition libre', line: 'Art. 61-1 CPP' },
  { icon: Layers, title: 'Nullités de procédure', line: 'Causes, effets, pièges' },
  { icon: ClipboardList, title: 'Perquisitions & saisies', line: 'Conditions et formalités' },
] as const;

/**
 * @deprecated Composant non monté sur / au 2026-04-19.
 * Tokens legacy conservés intentionnellement — à migrer ou supprimer en Phase 3
 * (décomposition de home-refonte-sections.tsx).
 */
export function HomeFondamentauxPreviewSection() {
  return (
    <section className='border-t border-white/[0.06] bg-examen-canvas px-4 py-20 md:py-28' aria-labelledby='home-fond-title'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='home-fond-title'
          badge='SOCLE'
          badgeClassName='bg-sky-500/20 text-sky-200'
          title="Les fondamentaux de l'OPJ"
          subtitle="Le socle de procédure que tout OPJ doit maîtriser en fond : cadres d'enquête, contrôle d'identité, GAV, nullités."
          className='mx-auto mb-12 max-w-2xl text-center'
        />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {FOND_BLOCS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={MOTION_INITIAL_FOR_SEO}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard hover padding='p-5' className='h-full border-white/10'>
                <b.icon className='h-8 w-8 text-sky-400' strokeWidth={1.5} aria-hidden />
                <h3 className='mt-3 font-display text-base font-bold text-white'>{b.title}</h3>
                <p className='mt-1 text-sm text-examen-inkMuted'>{b.line}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className='mt-10 text-center'>
          <Link
            href='/fondamentaux'
            className='inline-flex items-center gap-2 rounded-xl bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-100 ring-1 ring-sky-500/30 transition hover:bg-sky-500/30'
          >
            Accéder aux fondamentaux
            <ArrowRight className='h-4 w-4' aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Section 7 — Terrain (remplace témoignages). */
export function TerrainOriginSection() {
  return (
    <section className='px-4 py-20 md:py-24' aria-labelledby='terrain-title'>
      <div className='mx-auto max-w-3xl text-center'>
        <SectionTitle
          titleId='terrain-title'
          badge='TRANSPARENCE'
          badgeClassName='bg-ij-surface-2/50 text-ij-text'
          title='Un contenu qui vient du terrain.'
          className='mb-8'
        />
        <p className='text-base leading-relaxed text-ij-text-muted md:text-lg'>
          ExamenOPJ est rédigé par un gardien de la paix à Paris, actuellement en formation OPJ en présentiel. Les
          enquêtes, les modèles de PV, les fiches de procédure — tout est issu de la formation réelle, mis en ligne au fur
          et à mesure. Quand le cours évolue, le site évolue.
        </p>
        <div className='mx-auto mt-10 max-w-md rounded-2xl border border-ij-border/70 bg-ij-surface-2/30 px-6 py-5 text-sm leading-relaxed text-ij-text'>
          <p className='font-semibold text-ij-text'>Gardien de la paix · Formation OPJ 2026</p>
          <p className='mt-1 text-ij-text-muted'>Paris · Site indépendant</p>
          <p className='mt-3 text-xs text-ij-text-muted'>
            Rédigé par un gardien de la paix en formation OPJ · Paris · 2026 — pas de prénom ni de photo : anonymat
            volontaire.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Profils-types de candidats — section d'usage illustratif.
 *
 * Note honnêteté : tant que nous ne disposons pas de témoignages réels collectés
 * avec consentement explicite, cette section présente des profils-types décrivant
 * comment chaque type de candidat peut utiliser l'outil — pas des citations attribuées.
 * Cf. plan d'engagement (vague 5).
 */
export function HomeTestimonialsSection() {
  const shouldReduce = useReducedMotion();
  const items = useMemo(
    () =>
      [
        {
          quote:
            "Profil pressé : 30 min/jour, fiches courtes + 5 quiz quotidiens. L'objectif est d'enchaîner les sessions courtes plutôt que les marathons.",
          author: 'Profil A — révision rapide',
        },
        {
          quote:
            "Profil méthodique : parcours guidé en 7 leçons, flashcards à répétition espacée et articulation interactive avant chaque enquête.",
          author: 'Profil B — préparation structurée',
        },
        {
          quote:
            "Profil examen blanc : 2 enquêtes complètes par semaine + sujets blancs corrigés et rapport de synthèse type pour s'auto-évaluer.",
          author: 'Profil C — entraînement intensif',
        },
      ] as const,
    []
  );

  return (
    <motion.section
      className='relative overflow-hidden border-t border-ij-border/50 px-4 py-20 md:py-24'
      aria-labelledby='home-testimonials-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Fond subtil */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-ij-surface/80 to-transparent' aria-hidden />

      <div className='relative mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-ij-border/70 bg-ij-surface-2/30 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ij-text-subtle'>
            <span className='h-1.5 w-1.5 rounded-full bg-current opacity-70' aria-hidden />
            Profils d&apos;usage
          </span>
          <h2
            id='home-testimonials-title'
            className='mt-4 font-ij-sans text-3xl font-extrabold tracking-tight text-ij-text md:text-4xl'
          >
            Trois façons de réviser avec ExamenOPJ
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-sm text-ij-text-muted'>
            Profils-types illustrant les parcours possibles. Les vrais témoignages, recueillis avec
            consentement, seront publiés progressivement à mesure que les candidats acceptent de
            partager leur expérience.
          </p>
        </div>

        <ul className='mt-4 grid list-none gap-5 md:grid-cols-3'>
          {items.map((t, i) => (
            <motion.li
              key={t.author}
              initial={MOTION_INITIAL_FOR_SEO}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: LANDING_EASE }}
              className='relative flex flex-col overflow-hidden rounded-2xl border border-ij-border/70 bg-ij-surface-2/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ij-border-strong/45 hover:bg-ij-surface-2/40'
            >
              {/* Inset top highlight */}
              <span className='pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ij-accent/35 to-transparent' aria-hidden />
              <Quote className='mb-4 h-6 w-6 text-ij-accent/40' aria-hidden />
              <blockquote className='flex-1 text-sm leading-relaxed text-ij-text-muted'>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className='mt-5 flex items-center gap-2.5 border-t border-ij-border/50 pt-4 text-xs font-medium text-ij-text-subtle'>
                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ij-accent/15 text-xs text-ij-accent'>
                  {t.author.charAt(0)}
                </span>
                {t.author}
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

/** Section 8 — CTA final + pricing résumé. */
export function HomeFinalPricingSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const daysLeft = getDaysUntilExam();

  return (
    <motion.section
      className='relative overflow-hidden border-t border-ij-border/50 px-4 py-20 md:py-28'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Fond dégradé */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-ij-bg via-ij-surface to-ij-bg' aria-hidden />
      {/* Orb centré */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_65%)]' aria-hidden />

      <div className='relative mx-auto max-w-5xl'>
        <div className='mb-12 text-center'>
          <p className='mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ij-accent'>
            J-{daysLeft} — Session 2026
          </p>
          <h2 className='font-ij-sans text-4xl font-extrabold tracking-tight text-ij-text md:text-5xl'>
            Prêt à commencer ?
          </h2>
          <p className='mx-auto mt-4 max-w-xl text-base text-ij-text-muted'>
            Accès gratuit pour démarrer. Premium pour aller au bout.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-2 md:items-stretch'>
          {/* Gratuit */}
          <div className='flex flex-col rounded-2xl border border-ij-border/70 bg-ij-surface-2/25 p-7 transition-all hover:border-ij-border-strong/40'>
            <p className='text-xs font-bold uppercase tracking-widest text-ij-text-subtle'>Gratuit</p>
            <h3 className='mt-2 font-ij-sans text-2xl font-extrabold text-ij-text'>0 €</h3>
            <p className='mt-1 text-sm text-ij-text-muted'>Pour tester le rythme et la méthode.</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-ij-text-muted'>
              {[
                '6 fiches fondamentaux',
                '5 questions de quiz / jour',
                'Parcours guidé étape par étape',
              ].map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <span className='mt-0.5 text-emerald-400'>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <MotionLink
              href='/inscription'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ij-border-strong/50 py-3 text-sm font-semibold text-ij-text transition hover:bg-ij-surface-2/40'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label='Créer un compte gratuit'
            >
              Créer mon accès gratuit
            </MotionLink>
          </div>

          {/* Premium */}
          <div className='relative flex flex-col overflow-hidden rounded-2xl border border-ij-accent/35 bg-gradient-to-br from-ij-accent/12 via-ij-surface to-ij-primary/10 p-7 md:-translate-y-1'>
            <span className='absolute right-4 top-4 rounded-full bg-ij-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ij-bg shadow-ij-soft'>
              Recommandé
            </span>
            <span className='pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-ij-accent to-ij-accent/60' aria-hidden />

            <div className='mb-4 flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-ij-accent' aria-hidden />
              <p className='text-xs font-bold uppercase tracking-widest text-ij-accent'>Premium</p>
            </div>
            <h3 className='font-ij-sans text-2xl font-extrabold text-ij-text'>
              9,90 €<span className='text-base font-normal text-ij-text-muted'>/mois</span>
            </h3>
            <p className='mt-1 text-sm text-ij-text-muted'>ou 49 € accès jusqu&apos;au 11 juin</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-ij-text-muted'>
              {[
                'Tout le contenu — 15 thèmes du programme',
                'Enquêtes complètes avec corrections',
                "Modèles de PV et articulation",
                'Quiz illimités + répétition espacée',
              ].map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <span className='mt-0.5 text-ij-accent'>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <MotionLink
              href='/pricing'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ij-accent py-3 text-sm font-semibold text-ij-bg shadow-ij-soft transition hover:opacity-90'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label="Voir les détails de l'offre Premium"
            >
              Voir les détails
              <ArrowRight className='h-4 w-4' aria-hidden />
            </MotionLink>
          </div>
        </div>

        <p className='mt-10 text-center text-xs text-ij-text-subtle'>
          Rédigé par un gardien de la paix en formation OPJ présentielle · Paris · Session 2026
        </p>
      </div>
    </motion.section>
  );
}

export function HomeProgrammeCompletSection({ items }: { items: InfractionPreviewItem[] }) {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  return (
    <motion.section
      className='border-t border-ij-border/60 bg-ij-bg px-4 py-20 md:py-28'
      aria-labelledby='programme-complet-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='programme-complet-title'
          badge='PROGRAMME'
          badgeClassName='bg-ij-accent/20 text-ij-accent'
          title='Le programme complet'
          className='mx-auto mb-12 max-w-2xl text-center'
        />
        <div className='home-program-grid'>
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SectionTitle
              titleId='home-infractions-title'
              badge='ÉPREUVE 1'
              badgeClassName='bg-amber-500/20 text-amber-200'
              title='55 infractions à maîtriser pour l’épreuve 1'
          subtitle="Chaque infraction : élément légal, matériel, moral, et les pièges de l'examen. Aucune ne doit t'échapper."
              className='mb-8 text-left'
            />
            <Accordion type='single' collapsible className='w-full space-y-2'>
              {items.map((it) => (
                <AccordionItem key={it.id} value={it.id} className='rounded-xl border border-ij-border/70 bg-ij-surface-2/25 px-4'>
                  <AccordionTrigger className='flex flex-col items-stretch gap-2 py-4 text-left hover:no-underline sm:flex-row sm:items-start'>
                    <span className='flex flex-wrap gap-2'>
                      <span className='shrink-0 rounded-md bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-200'>
                        Épreuve 1 — Qualification
                      </span>
                      <span className='shrink-0 rounded-md border border-ij-border/80 px-2 py-0.5 font-mono-label text-[10px] text-ij-text-muted'>
                        {it.familleLabel}
                      </span>
                    </span>
                    <span className='min-w-0 flex-1 font-medium text-ij-text'>
                      <FlashcardRichText text={it.infraction} inline />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className='pb-4 text-sm text-ij-text-muted'>
                    <Link href='/infractions' className='text-ij-accent hover:underline'>
                      Ouvrir le référentiel complet →
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className='mt-10 text-center'>
              <MotionLink
                href='/infractions'
                className='inline-flex items-center gap-2 rounded-xl border border-ij-border-strong/50 bg-ij-surface-2/35 px-6 py-3 text-sm font-semibold text-ij-text transition hover:bg-ij-surface-2/50'
                whileTap={{ scale: 0.96 }}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Voir les 55 infractions
                <ArrowRight className='h-4 w-4' aria-hidden />
              </MotionLink>
            </div>
          </motion.div>
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SectionTitle
              titleId='home-fond-title'
              badge='SOCLE'
              badgeClassName='bg-ij-accent/20 text-ij-accent'
              title='Les fondamentaux de l’OPJ'
          subtitle="Le socle de procédure que tout OPJ doit maîtriser en fond : cadres d'enquête, contrôle d'identité, GAV, nullités."
              className='mb-12 text-left'
            />
            <div className='grid gap-4 sm:grid-cols-2'>
              {FOND_BLOCS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={MOTION_INITIAL_FOR_SEO}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <GlassCard hover padding='p-5' className='h-full border-ij-border/60'>
                    <b.icon className='h-8 w-8 text-ij-accent' strokeWidth={1.5} aria-hidden />
                    <h3 className='mt-3 font-ij-display text-base font-bold text-ij-text'>{b.title}</h3>
                    <p className='mt-1 text-sm text-ij-text-muted'>{b.line}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <div className='mt-10 text-center'>
              <MotionLink
                href='/fondamentaux'
                className='inline-flex items-center gap-2 rounded-xl bg-ij-accent/20 px-6 py-3 text-sm font-semibold text-ij-text ring-1 ring-ij-accent/35 transition hover:bg-ij-accent/30'
                whileTap={{ scale: 0.96 }}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Accéder aux fondamentaux
                <ArrowRight className='h-4 w-4' aria-hidden />
              </MotionLink>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
