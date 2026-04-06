import type { SujetBlanc } from '@/data/sujets-blancs-types';

const EP1_SUJET_A = `DISSERTATION — SESSION FICTIVE 2026-A
Durée : 3 heures — Coefficient 2 — Sans document

« La réforme de la délinquance en réunion et le traitement pénal des mineurs : entre aggravation légale des peines, personnalisation de la sanction et pragmatisme terrain. »

Vous analyserez la tension entre, d’une part, la logique d’aggravation lorsque les faits sont commis en réunion (personnes agissant en qualité d’auteur ou de complice) et, d’autre part, le régime spécifique des mineurs en matière de responsabilité pénale, de procédure et d’exécution des peines. Vous pourrez mobiliser des exemples issus des violences avec circonstances aggravantes et des infractions à l’ordre public, sans toutefois vous en tenir exclusivement à ces seuls thèmes.

La copie devra comporter une introduction structurée annonçant une problématique nette, au moins deux grandes parties équilibrées subdivisées en sous-parties avec transitions apparentes, et une conclusion ouverte sur les perspectives législatives ou jurisprudentielles. Vous veillerez à distinguer clairement les plans matériel, légal et moral des infractions évoquées à titre d’illustration et à citer avec précision les articles pertinents du Code pénal et, lorsque c’est nécessaire au raisonnement, du Code de procédure pénale.`;

const EP1_CORRIGE_A = `CORRIGÉ INDICATIF — SESSION A — ÉPREUVE 1
(Plan détaillé annoté — plus de 400 mots au total pour le corps commenté)

I. INTRODUCTION (5 à 8 points selon qualité)
Annonce du sujet : la délinquance en réunion renvoie à la fois à une structure matérielle des faits (pluralité d’auteurs ou de coauteurs, aide ou assistance) et à une réponse législative forte en termes d’aggravation. Les mineurs, cependant, bénéficient d’un régime dérogatoire fondé sur l’intérêt supérieur de l’enfant et l’objectif d’éducation. La problématique peut se formuler ainsi : « Dans quelle mesure le droit pénal des mineurs atténue-t-il les effets de l’aggravation “en réunion” tout en préservant la sécurité publique ? »

II. PREMIÈRE GRANDE PARTIE — Cadre de l’aggravation « en réunion »
A. Fondement normatif : rappeler le mécanisme d’aggravation (articles du Code pénal prévoyant une peine aggravée lorsque les faits sont commis en réunion ; distinction auteur / complice).
B. Fonction : intensification de la dangerosité, détermination psychologique mutuelle, difficulté d’enquête.
C. Limites : nécessité de démontrer le lien de participation conscient (pas de simple présence fortuite sans condition mentale requise).

Annotation correcteur : une copie forte cite au moins deux textes précis et une ou deux décisions de principe sans catalogue excédentaire.

III. DEUXIÈME GRANDE PARTIE — Régime des mineurs et tension avec la répression
A. Principes : ordonnance pénale du mineur, personnalisation, primautély éducative.
B. Incidence : adaptation des peines ; minoration possible ; mesures alternatives ; cadre d’audition et de procédure (à évoquer avec prudence et renvoi aux articles applicables selon la version en vigueur).
C. Cas d’accumulation : mineur coauteur avec majeurs — enjeux de qualification, de personnalité et de répartition des peines (citer les logiques, pas inventer de chiffres).

Annotation correcteur : attendre une discussion critique (pas un cours magistral linéaire).

IV. TROISIÈME VOLET POSSIBLE (si la copie tient en 3h) — Pragmatisme OPJ / parquet
Rôle de l’OPJ : constat des conditions de réunion (téléphones, réseaux sociaux, témoins) ; individualisation des rôles ; transmission au parquet pour engagement des poursuites choisies.

V. CONCLUSION
Ouverture sur l’évolution législative récente, la place du juge des enfants, et le risque d’une « double peine » sociologique pour les mineurs malgré des peines allégées.

Ce corrigé ne dispense pas de recouper chaque article cité avec Légifrance le jour de l’examen.`;

export const SESSION_BLANC_A: SujetBlanc = {
  id: 'session-2026-A',
  titre: 'Session fictive 2026 — A',
  description:
    'Violences en réunion et chaîne de trafic impliquant un mineur : même fil rouge sur dissertation, dossier procédure et oral.',
  theme: 'Violences en réunion et trafic mineur de stupéfiants',
  difficulte: 'avance',
  corrigeDisponible: true,
  isPremium: true,
  epreuve1: {
    duree: '3h — Coef. 2',
    sujet: EP1_SUJET_A,
    consignes: [
      'Rédigez une dissertation structurée avec introduction, développement en deux parties minimum et conclusion.',
      'Sans document autorisé — toute mention d’article doit être issue de votre mémoire et vérifiée après l’épreuve.',
      'Nombre de mots libre ; lisibilité et plan apparent fortement valorisés.',
    ],
    pointsMethodo: [
      'Annoncez une problématique qui dépasse un simple « pour et contre ».',
      'À chaque sous-partie : montrez le lien avec le sujet et le plan annoncé.',
      'Utilisez des exemples factuels sobres (sans invention de dossier réel).',
    ],
    corrige: EP1_CORRIGE_A,
  },
  epreuve2: {
    duree: '4h — Code pénal et CPP autorisés',
    contexte:
      'Nuit du 04 au 05 avril 2026, square des Tilleuls à Toulouse : rixe entre deux groupes après un match diffusé en bar. Un mineur de 16 ans, « K. », est repéré en train de remettre un pochon de résine au majeur « T. » alors que deux victimes présentent des traumatismes cranio-faciaux légers et confusionnel. Le parquet ordonne un rapprochement des vidéos et une recherche des faits de complicité et de trafic.',
    pieces: [
      {
        numero: 'Pièce 1',
        type: 'PV de constatations de rixe et premiers soins',
        contenu: `PV n° 2026/TLSE/44501 — 05/04/2026, 01 h 05 — OPJ Capitaine MOREL.

Sur appels riverains et patrouille municipale : groupe de six à huit personnes ; deux victimes au sol ; traces de sang sur trottoir ; banc public renversé ; bouteille brisée. Premiers témoignages spontanés : « des gamins qui filmaient » ; « un ado en sweat rouge qui passait un truc à un grand ». Bouclage sanitaire ; VICTIMES : M. Perez, 27 ans, plais cranienne ; M. Shah, 29 ans, confusion courte. Tensions entre témoins ; demande de renfort. Photos PJ/44501-A à D annexées.`,
      },
      {
        numero: 'Pièce 2',
        type: 'Extrait vidéo constaté (procès-verbal technique)',
        contenu: `PV technique — Référence VID/2026/8807 — 05/04/2026.
Source : caméra commerce « PMU Les Tilleuls », angle NE. Séquence 00 h 18 : groupe en écharpe ; individu sweat rouge remet objet compact à individu en blouson noir ; gestuelle d’échange monétaire non nette ; zoom pixelisé : comparaison ultérieure avec portrait K. lors de contrôle antérieur. Intégrité fichier SHA-256 notée en marge ; copie figure au dossier strictement pour besoin de procédure.`,
      },
      {
        numero: 'Pièce 3',
        type: "PV d'audition de témoin",
        contenu: `Audition — Mme LAINE — 06/04/2026.
Entendue librement : décrit « un ado » criant en direction d’une victime ; craint représailles ; identifie le sweat rouge ; n'aperçoit pas clairement l’objet remis ; signe après lecture. Mentions droits rappelées. Aucune confrontation immédiate demandée par le parquet à ce stade.`,
      },
      {
        numero: 'Pièce 4',
        type: 'PV de GAV — mineur K. (extraits joignables)',
        contenu: `Audition mineur K., 16 ans, représentant légal présent, avocat commis.
Reconnaît être sur place ; conteste la remise de stupéfiant ; affirme tenir un chargeur de téléphone « pour un pote » ; contradictions avec vidéo signalées par l’OPJ ; maintien de la ligne défensive. Fin de mesure selon décision judiciaire ultérieure non reproduite ici ; état psychique noté « agité puis apaisé » par le médecin de garde.`,
      },
    ],
    questions: [
      {
        numero: 1,
        intitule:
          'Qualifiez sommairement les infractions susceptibles de caractériser les violences en réunion (auteur / complice) au regard des constatations ; citez les articles du Code pénal invoqués sans développement exhaustif.',
        bareme: 4,
        type: 'qualification',
      },
      {
        numero: 2,
        intitule:
          'Exposez la chaîne procédurale de la garde à vue du mineur K. (notification des droits, durées, actes d’enquête consentis) et les points de vigilance nullité.',
        bareme: 5,
        type: 'articulation',
      },
      {
        numero: 3,
        intitule:
          'Rédigez le corps d’un PV de saisie des fichiers vidéo (mentions minimales, scellé numérique, agent technique).',
        bareme: 6,
        type: 'pv',
      },
      {
        numero: 4,
        intitule:
          'Proposez les suites pénales réalistes à l’attention du procureur (mise en examen, CRPC, composition, classement — selon votre analyse).',
        bareme: 5,
        type: 'rapport',
      },
    ],
  },
  epreuve3: {
    duree: '40 min préparation — Oral devant jury',
    sujetTire:
      'Compte-rendu oral au parquet : vous rendez compte de l’affaire « square des Tilleuls » et des difficultés de preuve sur le rôle du mineur K. face à la vidéo et aux dénégations.',
    axesDeTravail: [
      'Hiérarchiser les faits établis vs hypothèses.',
      'Expliquer la doctrine « intérêt du mineur » sans excuser.',
      'Proposer des réquisitions proportionnées et vérifiables.',
    ],
    questionsJury: [
      'Quelle est selon vous la valeur probante de la vidéo face aux dénégations ?',
      'Comment présentez-vous au parquet le risque de réitération dans le quartier ?',
      'Quelle mesure alternative aux poursuites pourriez-vous défendre pour K. et sous quelles conditions ?',
      'Comment gérez-vous la contradiction entre deux témoins rivaux ?',
      'Quels éléments transmettre en priorité au magistrat du siège si saisine future ?',
      'Une question de déontology : faut-il mentionner les doutes dans le rapport ?',
    ],
  },
};
