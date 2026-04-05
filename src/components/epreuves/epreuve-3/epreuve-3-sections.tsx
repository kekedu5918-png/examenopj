'use client';

import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
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
import { CopyBox } from '@/components/ui/CopyBox';
import { GlassCard } from '@/components/ui/GlassCard';
import type { SectionAccordionItem } from '@/components/ui/section-accordion';
import { SectionAccordion } from '@/components/ui/section-accordion';

const ease = [...LANDING_EASE] as [number, number, number, number];

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
    <div className='border-l-4 border-emerald-500 pl-5'>
      <div className='flex gap-4'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg'>
          {n}
        </div>
        <div className='min-w-0 flex-1 space-y-4'>
          <h3 className='text-lg font-bold uppercase tracking-wide text-gray-100'>{title}</h3>
          {children}
        </div>
      </div>
    </div>
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

const FORMULE_PRESENTATION_OPJ = `« Bonjour, Gardien de la paix XXXX, officier de police judiciaire à la sûreté départementale de Lyon,
suis-je bien en relation avec la permanence du parquet de Lyon ? »`;

export function Epreuve3Sections() {
  const formatContent = (
    <div>
      <GlassCard className='mb-8' padding='p-6'>
        <p className='text-gray-300'>
          Le candidat tire un sujet au sort. Il doit réaliser un compte rendu téléphonique structuré au parquet,
          comme s&apos;il appelait le magistrat de permanence pour rendre compte d&apos;une affaire. L&apos;épreuve est
          suivie de questions du jury.
        </p>
      </GlassCard>

      <div className='mb-8 grid gap-4 md:grid-cols-3'>
        {[
          { icon: Timer, title: 'Préparation', desc: 'Analyse du sujet et préparation du canevas' },
          { icon: Phone, title: 'Compte rendu', desc: 'CR téléphonique structuré au parquet' },
          { icon: MessageCircle, title: 'Questions', desc: 'Questions du jury sur le dossier' },
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
          l&apos;équilibre entre l&apos;autonomie attendue d&apos;un OPJ, son sens de l&apos;initiative et la nécessité
          de communiquer avec les autorités et les partenaires.
        </p>
      </GlassCard>
    </div>
  );

  const preparationContent = (
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
          Connaître les règles de fonctionnement du parquet (différents services, horaires, coordonnées) pour identifier
          l&apos;interlocuteur compétent et la manière d&apos;opérer, surtout lorsque l&apos;on est nouvel arrivant.
        </p>
      </Phase1Card>

      <Phase1Card n={3} title='RELIRE LA PROCÉDURE'>
        <p className='text-sm leading-relaxed text-gray-400'>
          Relire minutieusement la procédure pour s&apos;assurer de la connaissance parfaite de l&apos;ensemble. Il peut
          être utile de prendre des notes et de placer des marque-pages ou post-it lorsque la procédure est volumineuse ou
          complexe.
        </p>
      </Phase1Card>

      <Phase1Card n={4} title='EXTRAIRE LES ÉLÉMENTS UTILES SELON LE CANEVAS'>
        <p className='text-sm text-gray-400'>Préparer les informations selon le canevas suivant :</p>
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
          Sur sollicitation de votre interlocuteur, effectuer des propositions de nouveaux actes d&apos;investigation, de
          mesures à prendre ou exprimer un point de vue.
        </p>
        <p className='text-sm text-amber-400'>
          Ni en service, ni à l&apos;examen oral, vos interlocuteurs ne se contenteront d&apos;un argument tel que «
          j&apos;appelle le parquet » ou « je vous appelle ». Ce sont des obligations incontournables.
        </p>
      </Phase1Card>
    </div>
  );

  const appelContent = (
    <div className='space-y-10'>
      <h3 className='text-lg font-bold text-emerald-300'>A — Déroulement de l&apos;appel</h3>

      <div className='space-y-4'>
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
        <CopyBox tag='FORMULE' label='Présentation OPJ (exemple)' text={FORMULE_PRESENTATION_OPJ} />
        <p className='text-sm text-amber-400'>⚠️ Préciser la section : majeur / mineur / criminelle</p>
      </div>

      <div className='flex gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
          2
        </span>
        <div>
          <h4 className='font-bold text-gray-100'>S&apos;ASSURER D&apos;ÊTRE EN RELATION AVEC L&apos;INTERLOCUTEUR DÉSIRÉ</h4>
        </div>
      </div>

      <div className='space-y-4'>
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
          {['Prolongation GAV', 'Avis de placement', 'Autorisation perquisition', 'Compte rendu final'].map((b) => (
            <span
              key={b}
              className='rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300'
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex gap-3'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
            4
          </span>
          <div>
            <h4 className='font-bold text-gray-100'>RELATER LES FAITS ET LE DÉROULEMENT DE L&apos;ENQUÊTE</h4>
            <p className='mt-1 text-sm text-gray-400'>Suivre le canevas préparé lors de la phase I</p>
          </div>
        </div>
        <p className='text-sm text-gray-500'>
          Enchaîner ensuite avec les huit points du chapeau introductif, la flèche temporelle et les suites judiciaires
          (sections dédiées ci-dessous).
        </p>
      </div>
    </div>
  );

  const chapeauContent = (
    <div className='space-y-4'>
      <p className='text-sm text-gray-400'>
        Chaque point structure l&apos;information transmise au magistrat ; les formules peuvent être adaptées aux faits.
      </p>
      {chapeauPoints.map((text, i) => (
        <CopyBox key={i} tag='CHAPEAU' label={`Point ${i + 1}`} text={text} />
      ))}
    </div>
  );

  const flecheContent = (
    <div className='space-y-8'>
      <p className='text-sm text-gray-400'>
        Tous les actes en partant de votre saisine jusqu&apos;à la date et l&apos;heure de votre avis. Il faut également
        anticiper sur la suite des investigations.
      </p>
      <div>
        <p className='mb-2 font-semibold text-gray-200'>DÉROULÉ CIRCONSTANCIÉ — Flèche temporelle</p>
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
    </div>
  );

  const suitesContent = (
    <div>
      <p className='text-sm text-gray-400'>
        Alternatives aux poursuites, poursuites et conditions de mise en œuvre — à évoquer de manière précise et alignée
        sur le cadre procédural et les instructions possibles du parquet.
      </p>
    </div>
  );

  const caracteristiquesContent = (
    <div className='grid gap-4 md:grid-cols-3'>
      <GlassCard className='h-full border-emerald-500/25' padding='p-5'>
        <Zap className='mb-3 h-8 w-8 text-emerald-400' />
        <p className='font-bold text-gray-100'>SYNTHÉTIQUE</p>
        <p className='mt-2 text-sm text-gray-400'>
          Contexte de la permanence — nombre important d&apos;appels reçus
        </p>
      </GlassCard>
      <GlassCard className='h-full border-blue-500/25' padding='p-5'>
        <Target className='mb-3 h-8 w-8 text-blue-400' />
        <p className='font-bold text-gray-100'>PRÉCIS ET COMPLET</p>
        <p className='mt-2 text-sm text-gray-400'>
          Tous les éléments qui doivent permettre au magistrat de prendre une décision adaptée
        </p>
      </GlassCard>
      <GlassCard className='h-full border-gold-400/25' padding='p-5'>
        <Shield className='mb-3 h-8 w-8 text-gold-400' />
        <p className='font-bold text-gray-100'>FIABLE</p>
        <p className='mt-2 text-sm text-gray-400'>
          Influe sur la relation de confiance entre magistrats et enquêteurs. La décision repose souvent sur les CR oraux
          et il convient que lorsque la procédure écrite arrive, elle corresponde à ce qui a été précédemment relaté.
        </p>
      </GlassCard>
    </div>
  );

  const suiviContent = (
    <div className='space-y-4'>
      <p className='text-sm leading-relaxed text-gray-400'>
        À tout instant de l&apos;appel, veiller à l&apos;efficacité de sa communication (qualité de l&apos;expression
        verbale, vérification de la bonne compréhension des informations transmises et des instructions reçues).
      </p>
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
        <p className='font-medium text-gray-200'>Auto-évaluer la qualité et l&apos;efficacité de son compte-rendu</p>
      </GlassCard>
    </div>
  );

  const recapContent = (
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
  );

  const visionIaContent = (
    <div className='space-y-4 text-sm text-gray-400'>
      <p>
        Cahier des charges produit pour une <strong className='text-gray-200'>mise en situation orale d’entraînement</strong> (hors épreuve
        réelle), à valider avant tout développement — phase ultérieure.
      </p>
      <ul className='list-disc space-y-2 pl-5'>
        <li>
          <strong className='text-gray-200'>RGPD / vie privée</strong> : finalité limitée à la préparation personnelle, durée de conservation
          courte ou suppression immédiate après analyse, information transparente, exercice des droits (accès, effacement), DPA fournisseur si
          traitement externalisé.
        </li>
        <li>
          <strong className='text-gray-200'>Audio et vidéo</strong> : consentement libre et explicite avant enregistrement, option audio seul,
          pas de relecture « cachée » par défaut ; chiffrement au repos et contrôle d’accès.
        </li>
        <li>
          <strong className='text-gray-200'>Modèle de feedback</strong> : critères alignés sur l’épreuve 3 (structure du CR parquet, hiérarchie
          faits / actes / personnes / suites, ton professionnel) ; mention obligatoire que l’IA peut se tromper ; pas de score présenté comme
          verdict du jury.
        </li>
        <li>
          <strong className='text-gray-200'>Exploitabilité</strong> : plafonds de coût API, garde-fous de fiabilité, mode dégradé sans cloud si
          indisponibilité.
        </li>
      </ul>
    </div>
  );

  const items: SectionAccordionItem[] = [
    {
      id: 'format',
      trigger: "Format et déroulement de l'épreuve",
      badge: 'Oral',
      badgeColor: 'blue',
      defaultOpen: true,
      content: formatContent,
    },
    {
      id: 'preparation',
      trigger: "Phase I — Préparer l'appel (avant de décrocher)",
      badge: '5 étapes',
      badgeColor: 'green',
      defaultOpen: true,
      content: preparationContent,
    },
    {
      id: 'appel-deroulement',
      trigger: "Phase II — Déroulement de l'appel",
      badge: '4 étapes',
      badgeColor: 'green',
      content: appelContent,
    },
    {
      id: 'chapeau',
      trigger: 'Les 8 points du chapeau introductif',
      badge: '8 points',
      badgeColor: 'amber',
      content: chapeauContent,
    },
    {
      id: 'fleche-temporelle',
      trigger: 'La flèche temporelle — Déroulé circonstancié',
      badge: 'Chronologie',
      badgeColor: 'gray',
      content: flecheContent,
    },
    {
      id: 'suites-judiciaires',
      trigger: 'Les suites judiciaires envisageables',
      badge: 'Décision',
      badgeColor: 'amber',
      content: suitesContent,
    },
    {
      id: 'caracteristiques',
      trigger: 'Les 3 caractéristiques du bon compte rendu',
      badge: 'Évaluation',
      badgeColor: 'blue',
      content: caracteristiquesContent,
    },
    {
      id: 'suivi',
      trigger: 'Phase III — Suivi du compte rendu',
      badge: '3 règles',
      badgeColor: 'gray',
      content: suiviContent,
    },
    {
      id: 'recap-structure',
      trigger: 'Récapitulatif — Structure complète du CR Parquet',
      badge: 'Synthèse',
      badgeColor: 'blue',
      content: recapContent,
    },
    {
      id: 'vision-oral-ia',
      trigger: 'Vision produit — Oral d’entraînement assisté (phase ultérieure)',
      badge: 'Spec',
      badgeColor: 'gray',
      content: visionIaContent,
    },
  ];

  return (
    <div className='mx-auto max-w-4xl space-y-12 px-6 pb-24'>
      <SectionAccordion allowMultiple items={items} />

      <motion.section
        id='navigation'
        className='scroll-mt-28 pb-8'
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease }}
      >
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
