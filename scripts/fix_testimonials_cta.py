import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'
content = open(FILE, encoding='utf-8').read()

# ── 1. Améliorer la section témoignages ──
OLD_TESTI = """  return (
    <motion.section
      className='border-t border-white/[0.06] bg-white/[0.015] px-4 py-20 md:py-24'
      aria-labelledby='home-testimonials-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <h2
          id='home-testimonials-title'
          className='text-center font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'
        >
          Ils s&apos;entraînent avec ExamenOPJ
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-center text-sm text-gray-400'>
          Retours anonymisés de candidats en préparation OPJ — le même rythme, les mêmes enjeux.
        </p>
        <ul className='mt-12 grid list-none gap-6 md:grid-cols-3'>
          {items.map((t) => (
            <li
              key={t.author}
              className='flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.05]'
            >
              <Quote className='mb-3 h-7 w-7 text-blue-400/50' aria-hidden />
              <blockquote className='flex-1 text-sm leading-relaxed text-gray-300'>&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className='mt-4 text-xs font-medium text-gray-500'>{t.author}</footer>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}"""

NEW_TESTI = """  return (
    <motion.section
      className='relative overflow-hidden border-t border-white/[0.05] px-4 py-20 md:py-24'
      aria-labelledby='home-testimonials-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Fond subtil */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C1525]/80 to-transparent' aria-hidden />

      <div className='relative mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400'>
            <span className='h-1.5 w-1.5 rounded-full bg-current opacity-70' aria-hidden />
            Témoignages
          </span>
          <h2
            id='home-testimonials-title'
            className='mt-4 font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'
          >
            Ils s&apos;entraînent avec ExamenOPJ
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-sm text-slate-400'>
            Retours anonymisés de candidats en préparation OPJ — le même rythme, les mêmes enjeux.
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
              className='relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.04]'
            >
              {/* Inset top highlight */}
              <span className='pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' aria-hidden />
              <Quote className='mb-4 h-6 w-6 text-blue-400/40' aria-hidden />
              <blockquote className='flex-1 text-sm leading-relaxed text-slate-300'>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className='mt-5 flex items-center gap-2.5 border-t border-white/[0.06] pt-4 text-xs font-medium text-slate-500'>
                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs text-blue-400'>
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
}"""

# ── 2. Améliorer le CTA final ──
OLD_CTA = """  return (
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
          <div className='rounded-lg border border-white/[0.1] bg-white/[0.03] p-8'>
            <h3 className='font-display text-xl font-bold text-white'>Gratuit</h3>
            <p className='mt-1 text-sm text-examen-inkMuted'>Pour tester le rythme et la méthode.</p>
            <ul className='mt-4 space-y-2 text-sm text-examen-ink'>
              <li className='flex gap-2'>
                <span className='text-emerald-400'>✓</span> 6 fiches · 5 quiz/jour · Parcours guidé
              </li>
            </ul>
            <MotionLink
              href='/inscription'
              className='mt-6 inline-flex w-full items-center justify-center rounded-md border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label='Créer un compte gratuit'
            >
              Créer mon accès gratuit
            </MotionLink>
          </div>
          <div className='relative rounded-lg border-2 border-examen-accent/40 bg-gradient-to-br from-examen-accent/20 to-examen-premium/10 p-8 shadow-[var(--card-shadow-hover)] md:-translate-y-1'>
            <div className='absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-md bg-orde-gold500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-950'>
              Recommandé
            </div>
            <div className='mb-4 rounded-md border border-amber-200/80 bg-amber-50/95 px-3 py-2 text-center text-xs font-semibold text-amber-950'>
              J-{daysLeft} avant l&apos;examen du 11 juin 2026
            </div>
            <div className='mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
              <Sparkles className='h-3 w-3' aria-hidden />
              Premium
            </div>
            <h3 className='font-display text-xl font-bold text-white'>9,90 €/mois ou 49 € jusqu'au 11 juin</h3>
            <ul className='mt-4 space-y-2 text-sm text-examen-ink'>
              <li className='flex gap-2'>
                <span className='text-emerald-400'>✓</span> Tout le contenu · Enquêtes complètes · PV · Articulation
              </li>
            </ul>
            <MotionLink
              href='/pricing'
              className='mt-6 inline-flex w-full items-center justify-center rounded-md bg-examen-accent py-3 text-sm font-semibold text-white shadow-lg shadow-examen-accent/25 transition hover:bg-examen-accentHover'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label='Voir les détails de l'offre Premium'
            >
              Voir les détails
            </MotionLink>
          </div>
        </div>
        <p className='mt-10 text-center text-xs text-slate-500'>
          Rédigé par un gardien de la paix en formation OPJ présentielle · Paris · Session 2026
        </p>
      </div>
    </motion.section>
  );
}"""

NEW_CTA = """  return (
    <motion.section
      className='relative overflow-hidden border-t border-white/[0.05] px-4 py-20 md:py-28'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Fond dégradé */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080F1E] via-[#0C1525] to-[#080F1E]' aria-hidden />
      {/* Orb centré */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_65%)]' aria-hidden />

      <div className='relative mx-auto max-w-5xl'>
        {/* Titre centré */}
        <div className='mb-12 text-center'>
          <p className='mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-400'>
            J-{daysLeft} — Session 2026
          </p>
          <h2 className='font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
            Prêt à commencer ?
          </h2>
          <p className='mx-auto mt-4 max-w-xl text-base text-slate-400'>
            Accès gratuit pour démarrer. Premium pour aller au bout.
          </p>
        </div>

        {/* Cards pricing */}
        <div className='grid gap-5 md:grid-cols-2 md:items-stretch'>
          {/* Gratuit */}
          <div className='flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition-all hover:border-white/[0.14]'>
            <p className='text-xs font-bold uppercase tracking-widest text-slate-500'>Gratuit</p>
            <h3 className='mt-2 font-sans text-2xl font-extrabold text-white'>0 €</h3>
            <p className='mt-1 text-sm text-slate-400'>Pour tester le rythme et la méthode.</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-slate-300'>
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
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label='Créer un compte gratuit'
            >
              Créer mon accès gratuit
            </MotionLink>
          </div>

          {/* Premium */}
          <div className='relative flex flex-col overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/15 via-[#0E1B2E] to-violet-600/10 p-7 md:-translate-y-1'>
            {/* Badge */}
            <span className='absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg'>
              Recommandé
            </span>
            {/* Top line */}
            <span className='pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400' aria-hidden />

            <div className='mb-4 flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-blue-400' aria-hidden />
              <p className='text-xs font-bold uppercase tracking-widest text-blue-400'>Premium</p>
            </div>
            <h3 className='font-sans text-2xl font-extrabold text-white'>9,90 €<span className='text-base font-normal text-slate-400'>/mois</span></h3>
            <p className='mt-1 text-sm text-slate-400'>ou 49 € accès jusqu&apos;au 11 juin</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-slate-300'>
              {[
                'Tout le contenu — 15 fascicules',
                'Enquêtes complètes avec corrections',
                'Modèles de PV et articulation',
                'Quiz illimités + répétition espacée',
              ].map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <span className='mt-0.5 text-blue-400'>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <MotionLink
              href='/pricing'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:shadow-[0_0_28px_rgba(37,99,235,0.45)]'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label="Voir les détails de l'offre Premium"
            >
              Voir les détails
              <ArrowRight className='h-4 w-4' aria-hidden />
            </MotionLink>
          </div>
        </div>

        <p className='mt-10 text-center text-xs text-slate-600'>
          Rédigé par un gardien de la paix en formation OPJ présentielle · Paris · Session 2026
        </p>
      </div>
    </motion.section>
  );
}"""

if OLD_TESTI not in content:
    print('WARNING: OLD_TESTI not found')
else:
    content = content.replace(OLD_TESTI, NEW_TESTI, 1)
    print('OK: testimonials updated')

if OLD_CTA not in content:
    print('WARNING: OLD_CTA not found')
else:
    content = content.replace(OLD_CTA, NEW_CTA, 1)
    print('OK: CTA updated')

open(FILE, 'w', encoding='utf-8').write(content)
print('Done - length:', len(content))
