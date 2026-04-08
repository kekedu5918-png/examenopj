'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileEdit,
  Gavel,
  Layers,
  Map,
  Mic,
  Scale,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { LANDING_EASE, MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ENQUETES } from '@/data/enquetes-data';

export type InfractionPreviewItem = {
  id: string;
  infraction: string;
  fascicule: string;
};

/** Section 2 — Par où commencer (homepage). */
export function StartHereSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const cards = [
    {
      emoji: '🗺️',
      title: 'Je découvre l’examen',
      text: 'Je ne connais pas encore les 3 épreuves, ni ce qu’on attend de moi.',
      cta: 'Commencer ici',
      href: '/epreuves',
    },
    {
      emoji: '📚',
      title: 'Je révise le fond',
      text: 'Je connais les épreuves. Je veux maîtriser infractions et procédure.',
      cta: 'Aller aux infractions',
      href: '/infractions',
    },
    {
      emoji: '⚡',
      title: 'Je m’entraîne sur les exercices',
      text: 'Je veux faire des enquêtes types, des PV et des articulations.',
      cta: 'Voir les enquêtes',
      href: '/cours/enquetes',
    },
  ] as const;

  return (
    <motion.section
      className='border-t border-white/[0.06] bg-examen-canvas px-4 py-20 md:py-28'
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
          badgeClassName='bg-cyan-500/20 text-cyan-200'
          title='Par où commencer ?'
          subtitle='Selon où tu en es, voici le chemin.'
          className='mx-auto mb-12 max-w-2xl text-center'
        />
        <div className='home-start-grid'>
          {cards.map((c, i) => (
            <motion.div
              key={c.href}
              initial={MOTION_INITIAL_FOR_SEO}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: LANDING_EASE, delay: i * 0.06 }}
            >
              <MotionLink
                href={c.href}
                className='home-start-card group flex h-full flex-col'
                whileTap={{ scale: 0.96 }}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <span className='text-3xl' aria-hidden>
                  {c.emoji}
                </span>
                <h3 className='mt-4 font-display text-lg font-bold text-white'>{c.title}</h3>
                <p className='mt-2 flex-1 text-sm leading-relaxed text-examen-inkMuted'>{c.text}</p>
                <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-examen-accent'>
                  {c.cta} <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' aria-hidden />
                </span>
              </MotionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/** Section 3 — Enquêtes (pilier n°1). */
export function HomeEnquetesPillarSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const parentVariants = shouldReduce
    ? {}
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07 },
        },
      };
  const cardVariants = shouldReduce
    ? {}
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
            badgeClassName='bg-violet-500/20 text-violet-200'
            title='Les enquêtes — la trame de la formation'
            subtitle='Chaque enquête suit exactement le cadre travaillé en formation présentielle.'
            className='mx-auto mb-12 max-w-3xl text-center'
          />
        </motion.div>
        <motion.div className='home-enquetes-grid' variants={parentVariants} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-50px' }}>
          {ENQUETES.map((e) => (
            <motion.div key={e.id} variants={cardVariants}>
              <Link
                href={`/cours/enquetes/${e.id}`}
                className='home-enquete-card'
              >
                <span className='home-enquete-code'>{e.code}</span>
                <p className='home-enquete-title'>{e.titre}</p>
                <div className='flex flex-wrap items-center gap-1.5'>
                  <span className='home-enquete-badge'>
                    Épreuve 1
                  </span>
                  <span className='home-enquete-badge'>
                    Épreuve 2
                  </span>
                </div>
                <span className='mt-1 text-xs font-medium text-examen-accent'>Voir l’enquête →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className='mt-10 flex flex-col items-center text-center'>
          <MotionLink
            href='/cours/enquetes'
            className='inline-flex items-center gap-2 rounded-xl bg-examen-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-examen-accent/20 transition hover:bg-examen-accentHover'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Accéder aux enquêtes complètes
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
      className='border-t border-white/[0.06] bg-white/[0.02] px-4 py-20 md:py-28'
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
          badgeClassName='bg-rose-500/20 text-rose-200'
          title='3 épreuves. Une méthode pour chacune.'
          subtitle='Beaucoup de candidats arrivent sans savoir exactement ce qui les attend. Voici ce que l’examen demande.'
          className='mx-auto mb-12 max-w-2xl text-center'
        />
        <div className='grid gap-6 md:grid-cols-3'>
          <MotionLink
            href='/epreuves/epreuve-1'
            className='group rounded-2xl border border-white/[0.08] bg-examen-canvas/80 p-6 transition hover:border-rose-500/30'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Scale className='h-10 w-10 text-rose-400' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-display text-lg font-bold text-white'>Épreuve 1</h3>
            <p className='mt-1 text-sm text-examen-inkMuted'>DPG / DPS — 3 h · coef. 2</p>
            <p className='mt-3 text-sm text-examen-ink'>Qualification des infractions.</p>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-examen-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>

          <MotionLink
            href='/epreuves/epreuve-2'
            className='group relative rounded-2xl border-2 border-examen-accent/50 bg-gradient-to-br from-examen-accent/15 to-transparent p-6 shadow-[0_0_40px_rgba(79,110,247,0.12)] transition hover:border-examen-accent'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className='absolute right-4 top-4 rounded-full bg-amber-500/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
              La plus technique
            </span>
            <FileEdit className='h-10 w-10 text-examen-accent' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-display text-lg font-bold text-white'>Épreuve 2</h3>
            <p className='mt-1 text-sm text-examen-inkMuted'>Procédure pénale — 4 h</p>
            <ul className='mt-3 space-y-1.5 text-sm text-examen-ink'>
              <li className='flex gap-2'>
                <span className='text-examen-accent'>·</span> Rédaction de PV
              </li>
              <li className='flex gap-2'>
                <span className='text-examen-accent'>·</span> Articulation de procédure
              </li>
              <li className='flex gap-2'>
                <span className='text-examen-accent'>·</span> Rapport de synthèse
              </li>
            </ul>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-examen-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>

          <MotionLink
            href='/epreuves/epreuve-3'
            className='group rounded-2xl border border-white/[0.08] bg-examen-canvas/80 p-6 transition hover:border-emerald-500/30'
            whileTap={{ scale: 0.96 }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Mic className='h-10 w-10 text-emerald-400' strokeWidth={1.5} aria-hidden />
            <h3 className='mt-4 font-display text-lg font-bold text-white'>Épreuve 3</h3>
            <p className='mt-1 text-sm text-examen-inkMuted'>Oral — mise en situation</p>
            <p className='mt-3 text-sm text-examen-ink'>40 min de préparation · jury magistrat et commissaire.</p>
            <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-examen-accent'>
              Voir la méthode <ArrowRight className='h-4 w-4' aria-hidden />
            </span>
          </MotionLink>
        </div>
        <p className='mt-10 text-center'>
          <Link href='/epreuves' className='text-sm font-semibold text-examen-accent underline-offset-2 hover:underline'>
            Vue d’ensemble des 3 épreuves →
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

/** Section 5 — Aperçu infractions. */
export function HomeInfractionsPreviewSection({ items }: { items: InfractionPreviewItem[] }) {
  return (
    <section className='px-4 py-20 md:py-28' aria-labelledby='home-infractions-title'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='home-infractions-title'
          badge='ÉPREUVE 1'
          badgeClassName='bg-amber-500/20 text-amber-200'
          title='55 infractions à maîtriser pour l’épreuve 1'
          subtitle='Chaque infraction : élément légal, matériel, moral, et les pièges de l’examen. Aucune ne doit t’échapper.'
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
                    {it.fascicule}
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
  { icon: Map, title: 'Cadres d’enquête', line: 'Flagrance, préliminaire, instruction…' },
  { icon: Shield, title: 'Contrôle d’identité', line: 'Art. 78-1 à 78-6 CPP' },
  { icon: Gavel, title: 'Garde à vue', line: 'Placement, droits, durées' },
  { icon: BookOpen, title: 'Audition libre', line: 'Art. 61-1 CPP' },
  { icon: Layers, title: 'Nullités de procédure', line: 'Causes, effets, pièges' },
  { icon: ClipboardList, title: 'Perquisitions & saisies', line: 'Conditions et formalités' },
] as const;

/** Section 6 — Fondamentaux (aperçu). */
export function HomeFondamentauxPreviewSection() {
  return (
    <section className='border-t border-white/[0.06] bg-examen-canvas px-4 py-20 md:py-28' aria-labelledby='home-fond-title'>
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='home-fond-title'
          badge='SOCLE'
          badgeClassName='bg-sky-500/20 text-sky-200'
          title='Les fondamentaux de l’OPJ'
          subtitle='Le socle de procédure que tout OPJ doit maîtriser en fond : cadres d’enquête, contrôle d’identité, GAV, nullités.'
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
          badgeClassName='bg-white/10 text-examen-ink'
          title='Un contenu qui vient du terrain.'
          className='mb-8'
        />
        <p className='text-base leading-relaxed text-examen-inkMuted md:text-lg'>
          ExamenOPJ est rédigé par un gardien de la paix à Paris, actuellement en formation OPJ en présentiel. Les
          enquêtes, les modèles de PV, les fiches de procédure — tout est issu de la formation réelle, mis en ligne au fur
          et à mesure. Quand le cours évolue, le site évolue.
        </p>
        <div className='mx-auto mt-10 max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.04] px-6 py-5 text-sm leading-relaxed text-examen-ink'>
          <p className='font-semibold text-white'>Gardien de la paix · Formation OPJ 2026</p>
          <p className='mt-1 text-examen-inkMuted'>Paris · Site indépendant</p>
          <p className='mt-3 text-xs text-examen-inkMuted'>
            Rédigé par un gardien de la paix en formation OPJ · Paris · 2026 — pas de prénom ni de photo : anonymat
            volontaire.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Section 8 — CTA final + pricing résumé. */
export function HomeFinalPricingSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  return (
    <motion.section
      className='border-t border-white/[0.06] bg-gradient-to-b from-examen-canvas to-navy-950 px-4 py-20 md:py-28'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-5xl'>
        <h2 className='text-center font-display text-3xl font-bold text-white md:text-4xl'>Prêt à commencer ?</h2>
        <p className='mx-auto mt-3 max-w-xl text-center text-examen-inkMuted'>
          Accès gratuit pour démarrer. Premium pour aller au bout.
        </p>
        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          <div className='rounded-2xl border border-white/[0.1] bg-white/[0.03] p-8'>
            <h3 className='font-display text-xl font-bold text-white'>Gratuit — Commencer maintenant</h3>
            <ul className='mt-4 space-y-2 text-sm text-examen-ink'>
              <li className='flex gap-2'>
                <span className='text-emerald-400'>✓</span> 6 fiches · 5 quiz/jour · Parcours 7 étapes
              </li>
            </ul>
            <MotionLink
              href='/signup'
              className='mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]'
              whileTap={{ scale: 0.96 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Créer mon accès gratuit
            </MotionLink>
          </div>
          <div className='rounded-2xl border-2 border-examen-accent/40 bg-gradient-to-br from-examen-accent/20 to-examen-premium/10 p-8 shadow-lg shadow-examen-accent/10'>
            <div
              style={{
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.75rem',
                color: '#92400E',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              ⏰ 65 jours avant l&apos;examen du 11 juin 2026
            </div>
            <div className='mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
              <Sparkles className='h-3 w-3' aria-hidden />
              Premium
            </div>
            <h3 className='font-display text-xl font-bold text-white'>9,90 €/mois ou 49 € jusqu’au 11 juin</h3>
            <ul className='mt-4 space-y-2 text-sm text-examen-ink'>
              <li className='flex gap-2'>
                <span className='text-emerald-400'>✓</span> Tout le contenu · Enquêtes complètes · PV · Articulation
              </li>
            </ul>
            <MotionLink
              href='/pricing'
              className='mt-6 inline-flex w-full items-center justify-center rounded-xl bg-examen-accent py-3 text-sm font-semibold text-white shadow-lg shadow-examen-accent/25 transition hover:bg-examen-accentHover'
              whileTap={{ scale: 0.96 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Voir l’offre complète
            </MotionLink>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9CA3AF', marginTop: '2rem', marginBottom: '2rem' }}>
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
      className='border-t border-white/[0.06] bg-examen-canvas px-4 py-20 md:py-28'
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
          badgeClassName='bg-sky-500/20 text-sky-200'
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
              subtitle='Chaque infraction : élément légal, matériel, moral, et les pièges de l’examen. Aucune ne doit t’échapper.'
              className='mb-8 text-left'
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
                        {it.fascicule}
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
              <MotionLink
                href='/infractions'
                className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]'
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
              badgeClassName='bg-sky-500/20 text-sky-200'
              title='Les fondamentaux de l’OPJ'
              subtitle='Le socle de procédure que tout OPJ doit maîtriser en fond : cadres d’enquête, contrôle d’identité, GAV, nullités.'
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
                  <GlassCard hover padding='p-5' className='h-full border-white/10'>
                    <b.icon className='h-8 w-8 text-sky-400' strokeWidth={1.5} aria-hidden />
                    <h3 className='mt-3 font-display text-base font-bold text-white'>{b.title}</h3>
                    <p className='mt-1 text-sm text-examen-inkMuted'>{b.line}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <div className='mt-10 text-center'>
              <MotionLink
                href='/fondamentaux'
                className='inline-flex items-center gap-2 rounded-xl bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-100 ring-1 ring-sky-500/30 transition hover:bg-sky-500/30'
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
