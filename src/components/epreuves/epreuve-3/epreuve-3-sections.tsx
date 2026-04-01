'use client';

import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  MessageCircle,
  Phone,
  Shield,
  Target,
  Timer,
  Zap,
} from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const ease = [...LANDING_EASE] as [number, number, number, number];

const sectionMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.55, ease },
};

function Phase1Card({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div {...sectionMotion} className='border-l-4 border-emerald-500 pl-5'>
      <div className='flex gap-4'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg'>
          {n}
        </div>
        <div className='min-w-0 flex-1 space-y-4'>
          <h3 className='text-lg font-bold uppercase tracking-wide text-gray-100'>{title}</h3>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

const misEnCauseItems = [
  'Statut : libre / garde à vue',
  'Identité complète (vérifiée)',
  'Date et lieu de naissance',
  'Profession',
  'Domicile',
  'Droits du gardé à vue',
  'Heures (début / prolongation / reprise / temps restant)',
  'Examen médical ou psychiatrique',
] as const;

const victimesItems = [
  'Identité complète vérifiée',
  'Date et lieu de naissance',
  'Domicile',
  'Dépôt de plainte',
  'ITT (certificat médical)',
  'Préjudice',
  'Constitution de partie civile',
  'N° de sécurité sociale',
] as const;

const generalElements = [
  'Nature des faits / localisation / date',
  'Retentissement public / médiatique éventuel',
  'Cadre juridique',
  'Nombre de personnes (impliquées auteurs / victimes) interpellées',
  "Conditions de l'interpellation",
] as const;

const chapeauPoints = [
  "Se présenter et s'assurer de son interlocuteur",
  'Le but de cet appel',
  'Qualifications exactes des faits, date et lieu → donner précision importante (arme, ITT...)',
  "Cadre juridique (flagrant délit, préliminaire...)",
  'Auteurs des faits (GAV, identités, spécificités : mineur, connu, ivresse...)',
  'Victimes (identités, spécificités, préjudice matériel/physique/moral)',
  'Retentissement médiatique ou difficultés rencontrées',
  'Rappel des faits motivant la saisine',
] as const;

const timelineSteps = ['Saisine', 'Actes effectués', '…', "Heure de l'avis", 'Actes à venir'] as const;

const versionMisEnCause = [
  "Les actes d'enquête effectués : constatations, perquisitions, saisies, réquisitions",
  "Les actes d'enquête effectués sans l'assistance d'un avocat",
  'Auditions et confrontations (avec ou sans avocat)',
  "Les éléments vérifiés au cours de l'enquête",
  "Les éléments restant à vérifier → modalités, changement éventuel de cadre d'enquête / transport hors ressort",
  'Scellés',
] as const;

export function Epreuve3Sections() {
  return (
    <div className='mx-auto max-w-4xl space-y-24 px-6 pb-24'>
      {/* SECTION 1 — PRÉSENTATION */}
      <motion.section id='presentation' className='scroll-mt-28' {...sectionMotion}>
        <SectionTitle
          badge='FORMAT'
          badgeClassName='bg-emerald-500/20 text-emerald-300'
          title="Déroulement de l'épreuve"
          className='mb-8'
        />
        <GlassCard className='mb-8' padding='p-6'>
          <p className='text-gray-300'>
            Le candidat tire un sujet au sort. Il doit réaliser un compte rendu téléphonique structuré au parquet,
            comme s&apos;il appelait le magistrat de permanence pour rendre compte d&apos;une affaire.
            L&apos;épreuve est suivie de questions du jury.
          </p>
        </GlassCard>

        <div className='mb-8 grid gap-4 md:grid-cols-3'>
          {[
            {
              icon: Timer,
              title: 'Préparation',
              desc: 'Analyse du sujet et préparation du canevas',
            },
            {
              icon: Phone,
              title: 'Compte rendu',
              desc: 'CR téléphonique structuré au parquet',
            },
            {
              icon: MessageCircle,
              title: 'Questions',
              desc: 'Questions du jury sur le dossier',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title} hover padding='p-5' className='text-center'>
              <Icon className='mx-auto mb-3 h-8 w-8 text-emerald-400' strokeWidth={1.5} />
              <p className='font-semibold text-gray-100'>{title}</p>
              <p className='mt-2 text-sm text-gray-500'>{desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className='border-amber-500/20 bg-amber-500/5' padding='p-6'>
          <p className='text-sm leading-relaxed text-gray-300'>
            <span className='font-semibold text-amber-200'>N.B. :</span> Il s&apos;agit toujours de trouver
            l&apos;équilibre entre l&apos;autonomie attendue d&apos;un OPJ, son sens de l&apos;initiative et la
            nécessité de communiquer avec les autorités et les partenaires.
          </p>
        </GlassCard>
      </motion.section>

      {/* SECTION 2 — PRÉPARATION */}
      <section id='preparation' className='scroll-mt-28 space-y-12'>
        <motion.div {...sectionMotion}>
          <SectionTitle
            badge='PHASE I'
            badgeClassName='bg-emerald-500/20 text-emerald-300'
            title="La préparation de l'appel"
            subtitle='Avant de décrocher le téléphone'
            className='mb-10'
          />
        </motion.div>

        <div className='space-y-12'>
          <Phase1Card n={1} title='IDENTIFIER LE MOMENT OPPORTUN'>
            <p className='text-sm text-gray-400'>Déterminer le but du compte rendu à effectuer :</p>
            <div className='grid gap-2 sm:grid-cols-2'>
              {[
                "Est-ce que c'est un avis obligatoire ?",
                "Est-ce que c'est un appel pour solliciter une autorisation ?",
                "Est-ce que c'est un appel pour une information ?",
                "Est-ce qu'on va solliciter quelque chose ?",
              ].map((q) => (
                <div key={q} className='rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-3 text-sm text-gray-300'>
                  • {q}
                </div>
              ))}
            </div>
          </Phase1Card>

          <Phase1Card n={2} title="CONNAÎTRE L'ORGANISATION DU PARQUET">
            <p className='text-sm leading-relaxed text-gray-400'>
              Connaître les règles de fonctionnement du parquet (différents services, horaires, coordonnées) pour
              identifier l&apos;interlocuteur compétent et la manière d&apos;opérer, surtout lorsque l&apos;on est
              nouvel arrivant.
            </p>
          </Phase1Card>

          <Phase1Card n={3} title='RELIRE LA PROCÉDURE'>
            <p className='text-sm leading-relaxed text-gray-400'>
              Relire minutieusement la procédure pour s&apos;assurer de la connaissance parfaite de l&apos;ensemble.
              Il peut être utile de prendre des notes et de placer des marque-pages ou post-it lorsque la procédure
              est volumineuse ou complexe.
            </p>
          </Phase1Card>

          <Phase1Card n={4} title='EXTRAIRE LES ÉLÉMENTS UTILES SELON LE CANEVAS'>
            <p className='text-sm text-gray-400'>
              Préparer les informations selon le canevas suivant :
            </p>
            <GlassCard className='bg-navy-900/80' padding='p-5'>
              <p className='mb-4 text-sm font-semibold text-gray-300'>Éléments généraux</p>
              <ul className='mb-6 space-y-1 text-sm text-gray-400'>
                {generalElements.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
              <div className='grid gap-6 md:grid-cols-2'>
                <div>
                  <p className='mb-3 font-bold text-red-400'>MIS EN CAUSE</p>
                  <ul className='space-y-1.5 text-sm text-gray-400'>
                    {misEnCauseItems.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='mb-3 font-bold text-blue-400'>VICTIMES</p>
                  <ul className='space-y-1.5 text-sm text-gray-400'>
                    {victimesItems.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </Phase1Card>

          <Phase1Card n={5} title="SOLLICITER SON INTERLOCUTEUR">
            <p className='text-sm leading-relaxed text-gray-400'>
              Sur sollicitation de votre interlocuteur, effectuer des propositions de nouveaux actes
              d&apos;investigation, de mesures à prendre ou exprimer un point de vue.
            </p>
            <p className='text-sm text-amber-400'>
              Ni en service, ni à l&apos;examen oral, vos interlocuteurs ne se contenteront d&apos;un argument tel que
              « j&apos;appelle le parquet » ou « je vous appelle ». Ce sont des obligations incontournables.
            </p>
          </Phase1Card>
        </div>
      </section>

      {/* SECTION 3 — APPEL */}
      <section id='appel' className='scroll-mt-28 space-y-16'>
        <motion.div {...sectionMotion}>
          <SectionTitle
            badge='PHASE II'
            badgeClassName='bg-emerald-500/20 text-emerald-300'
            title="L'appel"
            subtitle='Le déroulement du compte rendu téléphonique'
            className='mb-8'
          />
        </motion.div>

        <div>
          <h3 className='mb-8 text-lg font-bold text-emerald-300'>A — Déroulement de l&apos;appel</h3>

          <div className='space-y-10'>
            <motion.div {...sectionMotion} className='space-y-4'>
              <div className='flex gap-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
                  1
                </span>
                <div>
                  <h4 className='font-bold text-gray-100'>PRÉSENTATION DE L&apos;OPJ</h4>
                  <p className='mt-1 text-sm text-gray-400'>
                    Prénom, nom, grade, qualification judiciaire, service d&apos;affectation
                  </p>
                </div>
              </div>
              <div className='rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-sm italic text-gray-300'>
                « Bonjour, Gardien de la paix XXXX, officier de police judiciaire à la sûreté départementale de Lyon,
                suis-je bien en relation avec la permanence du parquet de Lyon ? »
              </div>
              <p className='text-sm text-amber-400'>
                ⚠️ Préciser la section : majeur / mineur / criminelle
              </p>
            </motion.div>

            <motion.div {...sectionMotion} className='flex gap-3'>
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
                2
              </span>
              <div>
                <h4 className='font-bold text-gray-100'>
                  S&apos;ASSURER D&apos;ÊTRE EN RELATION AVEC L&apos;INTERLOCUTEUR DÉSIRÉ
                </h4>
              </div>
            </motion.div>

            <motion.div {...sectionMotion} className='space-y-4'>
              <div className='flex gap-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
                  3
                </span>
                <div>
                  <h4 className='font-bold text-gray-100'>PRÉCISER LE MOTIF DE L&apos;APPEL</h4>
                  <p className='mt-1 text-sm text-gray-400'>→ Le but du compte rendu</p>
                </div>
              </div>
              <div className='flex flex-wrap gap-2'>
                {['Prolongation GAV', 'Avis de placement', 'Autorisation perquisition', 'Compte rendu final'].map(
                  (b) => (
                    <span
                      key={b}
                      className='rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300'
                    >
                      {b}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            <motion.div {...sectionMotion} className='space-y-6'>
              <div className='flex gap-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
                  4
                </span>
                <div>
                  <h4 className='font-bold text-gray-100'>RELATER LES FAITS ET LE DÉROULEMENT DE L&apos;ENQUÊTE</h4>
                  <p className='mt-1 text-sm text-gray-400'>Suivre le canevas préparé lors de la phase I</p>
                </div>
              </div>

              <div>
                <p className='mb-3 text-sm font-semibold text-gray-300'>
                  Rappel des 8 points du chapeau introductif
                </p>
                <ol className='list-decimal space-y-2 pl-5 text-sm text-gray-400'>
                  {chapeauPoints.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p className='mb-2 font-semibold text-gray-200'>DÉROULÉ CIRCONSTANCIÉ — Flèche temporelle</p>
                <p className='mb-4 text-sm text-gray-400'>
                  Tous les actes en partant de votre saisine jusqu&apos;à la date et l&apos;heure de votre avis. Il faut
                  également anticiper sur la suite des investigations.
                </p>
                <div className='flex flex-wrap items-center justify-center gap-2 py-4'>
                  {timelineSteps.map((step, i) => (
                    <Fragment key={step}>
                      {i > 0 ? (
                        <span className='text-emerald-500' aria-hidden>
                          →
                        </span>
                      ) : null}
                      <span className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-gray-200 md:text-sm'>
                        {step}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>

              <div>
                <p className='mb-2 font-semibold text-gray-200'>SUITES JUDICIAIRES ENVISAGEABLES</p>
                <p className='text-sm text-gray-400'>
                  Alternatives aux poursuites, poursuites et conditions de mise en œuvre
                </p>
              </div>

              <div className='grid gap-4 md:grid-cols-1'>
                <GlassCard padding='p-5'>
                  <p className='mb-3 font-bold text-gray-100'>VERSION DES MIS EN CAUSE</p>
                  <ul className='space-y-2 text-sm text-gray-400'>
                    {versionMisEnCause.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </GlassCard>
                <GlassCard padding='p-5'>
                  <p className='mb-3 font-bold text-gray-100'>VERSION DES VICTIMES</p>
                  <ul className='space-y-2 text-sm text-gray-400'>
                    {victimesItems.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className='mb-8 text-lg font-bold text-emerald-300'>B — Caractéristiques du compte rendu</h3>
          <div className='grid gap-4 md:grid-cols-3'>
            <motion.div {...sectionMotion}>
              <GlassCard className='h-full border-emerald-500/25' padding='p-5'>
                <Zap className='mb-3 h-8 w-8 text-emerald-400' />
                <p className='font-bold text-gray-100'>SYNTHÉTIQUE</p>
                <p className='mt-2 text-sm text-gray-400'>
                  Contexte de la permanence — nombre important d&apos;appels reçus
                </p>
              </GlassCard>
            </motion.div>
            <motion.div {...sectionMotion}>
              <GlassCard className='h-full border-blue-500/25' padding='p-5'>
                <Target className='mb-3 h-8 w-8 text-blue-400' />
                <p className='font-bold text-gray-100'>PRÉCIS ET COMPLET</p>
                <p className='mt-2 text-sm text-gray-400'>
                  Tous les éléments qui doivent permettre au magistrat de prendre une décision adaptée
                </p>
              </GlassCard>
            </motion.div>
            <motion.div {...sectionMotion}>
              <GlassCard className='h-full border-gold-400/25' padding='p-5'>
                <Shield className='mb-3 h-8 w-8 text-gold-400' />
                <p className='font-bold text-gray-100'>FIABLE</p>
                <p className='mt-2 text-sm text-gray-400'>
                  Influe sur la relation de confiance entre magistrats et enquêteurs. La décision repose souvent sur
                  les CR oraux et il convient que lorsque la procédure écrite arrive, elle corresponde à ce qui a été
                  précédemment relaté.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SUIVI */}
      <motion.section id='suivi' className='scroll-mt-28 space-y-8' {...sectionMotion}>
        <SectionTitle
          badge='PHASE III'
          badgeClassName='bg-emerald-500/20 text-emerald-300'
          title='Le suivi du compte rendu'
          className='mb-6'
        />
        <p className='text-sm leading-relaxed text-gray-400'>
          À tout instant de l&apos;appel, veiller à l&apos;efficacité de sa communication (qualité de l&apos;expression
          verbale, vérification de la bonne compréhension des informations transmises et des instructions reçues).
        </p>
        <div className='space-y-4'>
          <GlassCard className='flex gap-4' padding='p-5'>
            <CheckCircle className='h-8 w-8 shrink-0 text-emerald-400' />
            <p className='font-medium text-gray-200'>Exécuter les instructions reçues</p>
          </GlassCard>
          <GlassCard className='flex gap-4' padding='p-5'>
            <AlertCircle className='h-8 w-8 shrink-0 text-amber-400' />
            <p className='font-medium text-gray-200'>
              Ne pas remettre en cause la décision exprimée en reprenant le parquet pour en solliciter une nouvelle
            </p>
          </GlassCard>
          <GlassCard className='flex gap-4' padding='p-5'>
            <BarChart3 className='h-8 w-8 shrink-0 text-blue-400' />
            <p className='font-medium text-gray-200'>
              Auto-évaluer la qualité et l&apos;efficacité de son compte-rendu
            </p>
          </GlassCard>
        </div>
      </motion.section>

      {/* SECTION 5 — RÉCAP */}
      <motion.section id='recap' className='scroll-mt-28' {...sectionMotion}>
        <SectionTitle
          badge='SYNTHÈSE'
          badgeClassName='border border-gold-400/30 bg-gold-400/10 text-gold-400'
          title='Structure complète du CR Parquet'
          className='mb-8'
        />
        <div className='rounded-3xl border border-white/10 bg-navy-900/50 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]'>
          <div className='mb-6 rounded-lg border-l-4 border-amber-400 bg-amber-400/5 p-6'>
            <h3 className='font-bold text-amber-300'>BLOC I — PRÉPARATION</h3>
            <ul className='mt-3 space-y-1 text-sm text-gray-400'>
              <li>→ Moment opportun</li>
              <li>→ Organisation du parquet</li>
              <li>→ Relecture de la procédure</li>
              <li>→ Extraction du canevas (mis en cause + victimes)</li>
              <li>→ Propositions d&apos;actes</li>
            </ul>
          </div>
          <div className='mb-6 rounded-lg border-l-4 border-emerald-400 bg-emerald-400/5 p-6'>
            <h3 className='font-bold text-emerald-300'>BLOC II — APPEL</h3>
            <p className='mt-2 text-sm font-semibold text-gray-300'>A) Déroulement :</p>
            <ol className='mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-400'>
              <li>Présentation</li>
              <li>Interlocuteur</li>
              <li>Motif</li>
              <li>Faits + enquête (8 points du chapeau + flèche temporelle + suites)</li>
            </ol>
            <p className='mt-4 text-sm text-gray-400'>
              B) Caractéristiques : <span className='text-gray-300'>Synthétique • Précis • Fiable</span>
            </p>
          </div>
          <div className='rounded-lg border-l-4 border-blue-400 bg-blue-400/5 p-6'>
            <h3 className='font-bold text-blue-300'>BLOC III — SUIVI</h3>
            <ul className='mt-3 space-y-1 text-sm text-gray-400'>
              <li>→ Exécuter les instructions</li>
              <li>→ Ne pas contester</li>
              <li>→ Auto-évaluer</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — NAV */}
      <motion.section id='navigation' className='scroll-mt-28 pb-8' {...sectionMotion}>
        <h2 className='text-xl font-bold text-white'>Les autres épreuves</h2>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <Link
            href='/epreuves/epreuve-1'
            className='group rounded-2xl border border-red-500/25 bg-white/[0.02] p-6 transition-all hover:border-red-500/40 hover:bg-white/[0.04]'
          >
            <p className='font-display text-lg font-semibold text-red-300'>Épreuve 1 — DPG/DPS</p>
            <p className='mt-2 text-sm text-gray-500'>Méthodologie droit pénal</p>
          </Link>
          <Link
            href='/epreuves/epreuve-2'
            className='group rounded-2xl border border-blue-500/25 bg-white/[0.02] p-6 transition-all hover:border-blue-500/40 hover:bg-white/[0.04]'
          >
            <p className='font-display text-lg font-semibold text-blue-300'>Épreuve 2 — Procédure pénale</p>
            <p className='mt-2 text-sm text-gray-500'>PV, articulation, synthèse</p>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
