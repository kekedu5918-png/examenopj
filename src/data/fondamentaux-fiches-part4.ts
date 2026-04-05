import type { Fiche } from './fondamentaux-types';

const F06_REPERES_MINIERS_FAMILLE: Fiche = {
  id: 'repères-f06-mineurs-famille',
  categorie: 'droit-penal',
  titre: 'F06 — Mineurs, famille et vulnérabilité (repères)',
  accroche:
    'Complète les fiches L303 / L307 (CJPM, GAV mineur, magistrat) : méthode pour le volet « infractions » du fascicule n°6 du programme officiel — à recouper avec le Code pénal et votre support de formation.',
  source: 'Programme fascicule n°6 (SDCP / IREP) — repères méthode',
  lienModule: '/cours/modules/f06',
  fasciculeId: 'f06',
  fasciculeNumero: 6,
  fasciculeDomaine: 'DPS',
  indispensableExamen: true,
  regles: [
    {
      label: 'Victime mineure vs auteur mineur',
      detail:
        'Ne pas mélanger les infractions « sur » mineur et la procédure pénale « pour » mineur : pour ce dernier, le CJPM et les leçons L303 / L307 structurent les auditions, la garde à vue et la présentation au magistrat.',
      article: 'C.pén. · CJPM',
      alerte: true,
    },
    {
      label: 'Qualification et aggravations',
      detail:
        'Raisonner en L.A.M. ; vérifier systématiquement les circonstances liées à l’âge, au lien d’autorité ou à la vulnérabilité — elles déterminent souvent le quantum ou le régime de juridiction.',
      article: 'C.pén. (titres sur mineurs, violences, atteintes sexuelles)',
    },
    {
      label: 'Signalement, protection, coordination',
      detail:
        'Tracer dans le PV les suites confiées au parquet / JDE / services sociaux ; l’OPJ consigne les constatations factuelles sans « conclure » pédagogiquement hors compétence.',
      article: 'Cadre institutionnel formation',
    },
  ],
};

/**
 * Synthèses « programme complet » (thèmes type fascicules F08 à F15 du cursus SDCP / IREP).
 * Référence : vérifier toujours Légifrance — objectif examen = vision transversale lisible en 5 minutes.
 */
export const FONDAMENTAUX_PART4: Fiche[] = [
  F06_REPERES_MINIERS_FAMILLE,
  {
    id: 'synthese-liberte-loi-sanction',
    categorie: 'droit-penal',
    titre: 'Libertés publiques, loi pénale et sanction',
    accroche:
      'Du texte à la peine : légalité et interprétation, personnalisation, unité, concours, tentative, responsabilité et peines — la toile de fond de toute qualification OPJ.',
    source: 'Fascicules type F08, F09, F10 C.P. / C.P.P. — synthèse',
    lienModule: '/cours/modules/f09',
    lienQuiz: '/entrainement/quiz?mode=module&f=f09',
    regles: [
      {
        label: 'Échelle des normes',
        detail:
          'Loi pénale stricte : nul crime ou délit sans texte préalable, clair et accessible. Distinguer loi pénale / répressive / de police ; attention aux ordonnances et décrets d’application.',
        article: 'Art. 111-1 à 111-4 C.P.',
      },
      {
        label: 'Loi pénale dans le temps',
        detail:
          'Rétroactivité mitigée (*prior mitior*) ; temps de l’infraction = temps de l’acte matériel (continu / habituel : se reporter au thème). Prescription de l’action publique distincte de la peine.',
        article: 'Art. 112-1 et 112-2 C.P.',
        alerte: true,
      },
      {
        label: 'Territorialité et personnalité',
        detail:
          'Principe : loi française pour infractions commises en France ; exceptions réservées au thème (atteinte aux intérêts fondamentaux, certaines infractions numériques, etc.).',
        article: 'Art. 113-1 et s. C.P.',
      },
      {
        label: 'Libertés et proportionnalité',
        detail:
          'Atteintes aux libertés (manifestation, vie privée, expression) : rechercher base légale, nécessité et proportion au regard de l’objectif (ordre public, sécurité). Croiser avec art. préliminaire C.P.P.',
        article: 'C. constitutionnel, C.P., C.P.P.',
      },
      {
        label: 'Personnalisation de la peine',
        detail:
          'Jugement individualisé : circonstances atténuantes/aggravantes, personnalité, préjugés 132-24 C.P. Opposer peine principale / complémentaire / mesures de sûreté.',
        article: 'Art. 132-1 et s. C.P.',
      },
      {
        label: 'Unité et concours',
        detail:
          'Single act / pluralité d’infractions : absorption légale, continuation apparente, concours idéal / réel — erreur fréquente en copie si on ne pose pas la méthode.',
        article: 'Art. 132-2 à 132-5 C.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Notion', 'Question clé à l’examen'],
      lignes: [
        ['Tentative', 'Début d’exécution + non achèvement indépendant de la volonté ?'],
        ['Complicité', 'Connaissance + aide ou assistance (y compris complicité par abstention encadrée)'],
        ['Peine encourue', 'Quantum max + contraintes de cour d’assises / comparution / C.R.P.C.'],
      ],
    },
  },
  {
    id: 'synthese-pj-instruction-jugement',
    categorie: 'procedure',
    titre: 'Mission PJ, instruction, mandats et juridictions de jugement',
    accroche:
      'De la première mesure au prononcé : cadres d’enquête, mandats de justice, contraintes, saisine des juridictions et exécution — le fil qu’un correcteur attend dans un PV / un rapport.',
    source: 'Fascicules type F11, F12, F13 C.P.P. — synthèse',
    lienModule: '/cours/modules/f12',
    lienQuiz: '/entrainement/quiz?mode=module&f=f12',
    regles: [
      {
        label: 'Cadres : flagrance, préliminaire, instruction',
        detail:
          'Chaque acte doit « tenir » sous un état procédural ; un changement de cadre peut invalider ou conditionner la suite (saisine obligatoire du parquet, durées, habilitations).',
        article: 'Art. 41, 52 à 78, 79 à 230 C.P.P.',
      },
      {
        label: 'Mandats et contrôle judiciaire',
        detail:
          'Commission rogatoire = prolongement du bras du magistrat ; respect du périmètre. JLD : CJ, ARSE, détention — motivation, proportionnalité, assistance avocat.',
        article: 'Art. 81, 137 et s. C.P.P.',
        alerte: true,
      },
      {
        label: 'Actes coercitifs probants',
        detail:
          'Perquisitions, écoutes, saisies : autorisation / validation / levée ; trace horaire et lieu ; chaîne de garde pour scellés et données.',
        article: 'Art. 56, 706-95 et s. C.P.P.',
      },
      {
        label: 'Victime et partie civile',
        detail:
          'Information des droits, constitution de partie civile, mesures de protection ; articulation avec l’action publique et le juge civil.',
        article: 'Art. 11-1 et s., 162 et s. C.P.P.',
      },
      {
        label: 'Jugement et exécution',
        detail:
          'Ordre des juridictions : police / correctionnelle / cour d’assises ; appel et cassation (*quorum, publicité, mineurs*). Exécution : mandats de dépôt, contrôle pénitentiaire, JAP.',
        article: 'L. 112-1 C. pénitentiaire, 712-6 et s. C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Acte', 'Contrôle'],
      lignes: [
        ['GAV majeur / mineur', 'Registre, minutage, notifications hiérarchiques et au magistrat'],
        ['PV d’audition', 'Notification droits, contradictoire, assistance défense'],
        ['Saisine juridiction', 'Compétence matérielle et territoriale, qualification provisoire'],
      ],
    },
  },
  {
    id: 'synthese-parquet-controle-nullite',
    categorie: 'acteurs',
    titre: 'Parquet, police PJ, contrôle de la PJ et nullités',
    accroche:
      'Qui oriente, qui contrôle, quand l’acte est annulé : action publique, hiérarchie, inspections et juridiction de contrôle — le triptyque « mission — responsabilité — sanction procédurale ».',
    source: 'Fascicules type F14, F15 C.P.P. — synthèse',
    lienModule: '/cours/modules/f14',
    lienQuiz: '/entrainement/quiz?mode=module&f=f14',
    regles: [
      {
        label: 'Action publique',
        detail:
          'Principe d’opportunité encadré ; alternatives aux poursuites ; recevabilité ; saisine — sans confusion entre appréciation du parquet et appréciation du juge.',
        article: 'Art. 40 à 49, 41-1 et s. C.P.P.',
      },
      {
        label: 'Ministère public : indivisibilité et rôle',
        detail:
          'Parquet unifié ; mission de veiller à la manifestation de la vérité et aux droits des parties ; instruction vs poursuite : deux temps, deux logiques.',
        article: 'Constitution, C.P.P. (titres préliminaires)',
      },
      {
        label: 'Direction et contrôle PJ',
        detail:
          'Procureur de la République : donne l’impulsion ; procureur général : contrôle d’habilitation, d’évaluation ; IGJ / chambre de l’instruction pour situations graves.',
        article: 'Art. 41, 44, R. 15-5 et s. C.P.P.',
        alerte: true,
      },
      {
        label: 'Nullités : tronc commun',
        detail:
          'Inobservation d’une formalité substantielle + grief pour la défense = nullité assortie de sanctions possibles pour l’auteur de l’acte. Distinguer vice de procédure / vice de consentement / absence de base légale.',
        article: 'Art. 171 et s. C.P.P.',
      },
      {
        label: 'Sanction de l’irrégularité',
        detail:
          'Exclusion de preuve, nullité d’acte subséquent ou arrêt partiel selon connexité ; restitution des droits du mis en cause. À l’écrit : démontrer le lien de causalité entre irrégularité et préjudice.',
        article: 'Art. 174, 803-1 (garde à vue) et jurisprudence',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Situation', 'Réflexe'],
      lignes: [
        ['Oubli de notification de droit', 'Grief + nullité potentielle + chaîne causale vers la mesure attaquée'],
        ['Acte hors cadre (hors commission rogatoire)', 'Incompétence ou nullité pour défaut de base légale'],
        ['Contrôle hiérarchique', 'Qui saisit : PG, IGJ, chambre de l’instruction selon gravité'],
      ],
    },
  },
];
