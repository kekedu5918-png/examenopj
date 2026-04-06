import type { SujetBlanc } from '@/data/sujets-blancs-types';

const EP1_SUJET_C = `CAS PRATIQUE COMPLEXE — SESSION FICTIVE 2026-C
Durée : 3 heures — Coefficient 2 — Sans document

Dans la nuit du 15 au 16 avril 2026, deux individus armés d’un couteau de cuisine et d’un pistolet d’alarme modifié pénètrent par effraction dans l’appartement de M. et Mme DUVAL à Nice. Ils contraignent le couple à leur communiquer les codes bancaires et emportent bijoux et liquide. Avant de partir, ils enferment Mme DUVAL dans la salle de bains avec une chaise coincée sous la poignée et scotchent la bouche de M. DUVAL sur une durée d’environ quarante minutes selon les déclarations ultérieures. L’auteur présumé armé du pistolet, M. Farid K., est interpellé le 20 avril ; son complice présumé est en fuite.

Vous analyserez les qualifications d’infractions retenues ou discutables (vol avec violence, constitution de bande, séquestration, contrainte, voies de fait aggravées, atteintes aux personnes selon les constatations), les peines encourues, les règles de concours d’infractions et les conséquences sur la compétence matérielle et sur la détention provisoire éventuelle. Vous évoquerez brièvement la problématique de l’arme par destination sans vous substituer à une expertise balistique.`;

export const SESSION_BLANC_C: SujetBlanc = {
  id: 'session-2026-C',
  titre: 'Session fictive 2026 — C',
  description: 'Vol avec violence, arme et séquestration : dossier exigeant sur les trois épreuves.',
  theme: 'Vol aggravé avec arme + séquestration',
  difficulte: 'avance',
  corrigeDisponible: false,
  isPremium: true,
  epreuve1: {
    duree: '3h — Coef. 2',
    sujet: EP1_SUJET_C,
    consignes: [
      'Organisez votre copie en parties claires ; qualifiez avant de commenter les peines.',
      'Sans documents ; précision des références légales valorisée.',
      'Ne donnez pas de solution « unique » si votre raisonnement justifie un débat.',
    ],
    pointsMethodo: [
      'Tableau implicite concours unité / pluralité si pertinent.',
      'Attention à la réserve sur les faits non établis (complice en fuite).',
    ],
  },
  epreuve2: {
    duree: '4h — Code pénal et CPP autorisés',
    contexte:
      'Procédure préliminaire puis flagrance fictive selon pièces : perquisition chez K., auditions VICTIME, GAV auteur, expertise arme.',
    pieces: [
      {
        numero: 'Pièce 1',
        type: 'PV de plainte et constatations domicile',
        contenu: `PV n° 2026/NCE/22301 — 16/04/2026, 06 h 10.
Les époux DUVAL signale effraction, menaces, vol, enfermement. Porte fracturée ; traces de adhésif ; égratignures bras M. DUVAL ; photographies PJ/22301. Inventaire préliminaire des objets volés : alliance, montre, 800 € liquide. Alarmes voisins entendues avec décalage temporel selon PV annexes.`,
      },
      {
        numero: 'Pièce 2',
        type: "PV d'audition conjointe des victimes",
        contenu: `16/04/2026 — Audition M. et Mme DUVAL — séparés puis confrontation sur détails horaires.
Descriptions des auteurs : taille, accents, cagoules partielles ; arme « arme de poing sombre » ; couteau de cuisine identifiable par manque rouge. Mme DUVAL décrit anxiété et enfermement ; craint récidive ; demande mesure de protection. Signatures après lecture.`,
      },
      {
        numero: 'Pièce 3',
        type: "PV de perquisition et saisie d'arme",
        contenu: `PV perquisition — 21/04/2026 — domicile K.
Saisie pistolet alarme modifié conforme fiche technique simplifiée ; munitions factices et douilles ; sac avec adhésif compatible fibres retrouvées chez DUVAL ; téléphone portable — extraction différée sur réquisition ; K. absent mais cohabitant présent ; témoins de perquisition listés en annexe selon formalités.`,
      },
      {
        numero: 'Pièce 4',
        type: 'PV GAV Farid K. (extraits)',
        contenu: `22/04/2026 — Farid K., 28 ans.
Contestations partielles ; reconnaît présence « pour récupérer une dette » ; nie le pistolet chargé ; accuse complice « Sam » en fuite ; empreintes digitales sur scotch demandées en expertise. Avocat CHARTIER présent ; requalification juridique évoquée par l’OPJ dans la marge préparatoire au parquet.`,
      },
    ],
    questions: [
      { numero: 1, intitule: 'Établissez une qualification principale et des qualifications subsidiaires ou alternatives pour les faits de violences et de vol.', bareme: 7, type: 'qualification' },
      { numero: 2, intitule: 'Traitez en 15 lignes la question de la séquestration (éléments légal et matériel).', bareme: 4, type: 'qualification' },
      { numero: 3, intitule: 'Rédigez un PV de notification de droits en GAV adapté à Farid K. (mentions types, sans conclusions sur sa culpabilité).', bareme: 5, type: 'pv' },
      { numero: 4, intitule: 'Synthèse parquet : propositions de qualification et suites (mandat, référé, CRPC) sur une demi-page.', bareme: 4, type: 'rapport' },
    ],
  },
  epreuve3: {
    duree: '40 min préparation — Jury',
    sujetTire:
      'Oral : vous êtes reçu par un substitut qui conteste la valeur des déclarations des victimes face au déni partiel de K. sur l’arme.',
    axesDeTravail: [
      'Hiérarchie des preuves matérielles vs testimoniales.',
      'Tone adapté magistrat vs parties civiles.',
      'Risque médiatique lorsque l’affaire fuite.',
    ],
    questionsJury: [
      'Comment présenter l’expertise arme sans anticiper un rapport non versé ?',
      'Que répondez-vous sur la légalité de la perquisition si la contestation est soulevée ?',
      'Jeu de rôle : le substitut vous demande de classer une infraction secondaire — réagissez.',
      'Quels sont les risques de garde à vue trop longue ici ?',
      'Comment gérez-vous la présence de la presse au tribunal ?',
      'Concluez en une phrase sur la mission de la police judiciaire.',
    ],
  },
};
