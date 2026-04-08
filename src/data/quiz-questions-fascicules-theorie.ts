import type { QuizQuestion } from '@/data/types';

/**
 * QCM dérivés des fascicules F08–F14 (programme juin 2026) : formulations interrogatives,
 * pas de pseudo-définitions du type « X est : ». Bonne réponse en position B (index 1) pour ~65 % des items.
 */
export const quizQuestionsFasciculesTheorie: QuizQuestion[] = [
  // ─── F08 Libertés publiques ───
  {
    id: 'f08-q-001',
    question:
      'Face à une ingérence de l’autorité publique dans une liberté fondamentale, quel test le juge européen retient-il en substance pour valider la mesure ?',
    options: [
      'Elle doit toujours être la plus sévère possible pour l’ordre public',
      'Elle doit être prévue par la loi, poursuivre un but légitime et être nécessaire et proportionnée',
      'Elle n’est jamais justiciable devant un juge si le ministre l’a signée',
      'La seule condition prévue est l’avis préalable du préfet',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-002',
    question:
      'Le principe « nul ne peut être soumis qu’à la peine prévue… avant la commission de l’infraction » relève surtout de quel ensemble de garanties ?',
    options: [
      'De la légalité des délits et des peines (DDHC et jurisprudence CEDH / Conseil constitutionnel)',
      'Du seul droit douanier',
      'Du droit international privé',
      'Des seules contraventions de police',
    ],
    correctIndex: 0,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-003',
    question:
      'À quoi sert principalement la Question prioritaire de constitutionnalité (Q.P.C.) dans la pratique du droit répressif ?',
    options: [
      'Remplacer le pourvoi en cassation',
      'Permettre au juge du fond de renvoyer une disposition légale devant le Conseil constitutionnel si les droits et libertés garantis par la Constitution sont en jeu',
      'Suspendre automatiquement toute procédure pénale pendant cinq ans',
      'Confier le contrôle des lois exclusivement au Parquet',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-004',
    question:
      'Lorsqu’un justiciable invoque l’article 5 § 1 de la CEDH (droit à la liberté et à la sûreté), quel garde-fou structure le contrôle de la privation de liberté en France ?',
    options: [
      'Le contrôle judiciaire par une autorité judiciaire, notamment le JLD pour les mesures privatives de liberté',
      'L’autorité administrative seule, sans juge',
      'La seule possibilité de saisiner est le défenseur des droits',
      'Aucun recours n’est ouvert avant jugement définitif',
    ],
    correctIndex: 0,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-005',
    question:
      'En quoi le contrôle d’identité diffère-t-il fondamentalement d’une vérification d’identité au sens des articles 78-2 et 78-3 C.P.P. ?',
    options: [
      'Ce sont deux expressions strictement interchangeables',
      'Le contrôle d’identité ne suppose pas la rétention de la personne ; la vérification peut conduire à une rétention encadrée (quatre heures max)',
      'Seule la gendarmerie peut effectuer une vérification',
      'La vérification n’existe que pour les mineurs',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-006',
    question:
      'Quel est le rôle institutionnel majeur du Contrôleur général des lieux de privation de liberté (C.G.L.P.L.) évoqué dans l’esprit des fascicules sur les libertés ?',
    options: [
      'Prononcer des peines pénales à la place du juge',
      'Contrôler a posteriori les conditions de détention et en rendre compte (protection contre les traitements inhumains ou dégradants)',
      'Diriger les enquêtes de police judiciaire',
      'Remplacer le procureur de la République lors des GAV',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-007',
    question:
      'Pourquoi le principe de laïcité et la liberté de manifester sont-ils souvent croisés dans une copie sur les libertés publiques ?',
    options: [
      'Parce que la loi interdit toute manifestation depuis 1958',
      'Parce qu’il faut concilier libertés, ordre public et proportionnalité des mesures de dispersion ou d’interdiction',
      'Parce que seuls les préfets peuvent en décider sans texte',
      'Parce que la CEDH n’impose aucun critère',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f08-q-008',
    question:
      'Que garantit essentiellement l’article 8 CEDH dans les dossiers où l’OPJ met en œuvre des techniques d’écoute ou de géolocalisation ?',
    options: [
      'Que toute atteinte est automatiquement légale',
      'Le respect du droit au respect de la vie privée ; les ingérences doivent être prévues par la loi et proportionnées',
      'Qu’aucun juge n’est nécessaire avant les écoutes',
      'Que seuls les crimes de sang sont concernés',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },

  // ─── F09 Loi pénale & responsabilité ───
  {
    id: 'f09-q-010',
    question:
      'Un candidat distingue crime, délit et contravention : quelle conséquence procédurale majeure découle de cette tripartition du point de vue de la juridiction de jugement ?',
    options: [
      'Toutes les infractions relèvent du tribunal de police',
      'En principe, crimes → cour d’assises (ou C.C.D. selon le cas), délits → tribunal correctionnel, contraventions → tribunal de police',
      'Seules les contraventions passent devant la cour d’assises',
      'Le tribunal administratif juge les crimes',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-011',
    question:
      'Comment le Code pénal sanctionne-t-il en principe la tentative d’un crime, sans circonstances particulières le modifiant ?',
    options: [
      'La tentative de crime n’est jamais punie',
      'La tentative de crime est toujours punissable (même peine que l’infraction consommée, sous réserve de dispositions spéciales)',
      'Elle n’est punie que si le juge en convient discrétionnairement',
      'Elle est toujours classée contravention',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-012',
    question:
      'Pour un délit, dans quelle hypothèse la tentative devient-elle en principe punissable ?',
    options: [
      'Dans tous les délits, systématiquement',
      'Uniquement si le texte incriminant la tentative l’exprès prévoit',
      'Jamais pour les délits',
      'Seulement si la victime est un magistrat',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-013',
    question:
      'Deux personnes se concertent : l’une commet le vol, l’autre garde le véhicule moteur sans entrer dans l’appartement. Comment qualifier le rôle du conducteur en droit pénal général ?',
    options: [
      'Il est nécessairement incapable pénalement',
      'Il peut être complice par aide ou assistance si les conditions de l’article 121-7 C.P. sont réunies',
      'Il n’y a jamais de complicité sans présence physique sur les lieux',
      'Le complice est toujours puni plus lourdement que l’auteur',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-014',
    question:
      'Quelle affirmation reflète le mieux la *lex mitius* en droit pénal français ?',
    options: [
      'Toute loi nouvelle plus douce s’applique rétroactivement aux faits déjà commis au profit du condamné',
      'La loi nouvelle la plus favorable au prévenu peut s’appliquer immédiatement aux faits antérieurs (sous réserves d’ordre public)',
      'Le juge ne peut jamais appliquer une loi postérieure',
      'Seule la loi plus sévère profite au condamné',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-015',
    question:
      'Une personne morale peut-elle encourir une sanction pénale autonome pour des faits commis pour son compte par un dirigeant ?',
    options: [
      'Non, le droit pénal français ignore les personnes morales',
      'Oui, selon les conditions de l’article 121-2 C.P., cumul possible avec la sanction de la personne physique',
      'Oui, mais uniquement pour les contraventions',
      'Uniquement si le préfet l’ordonne',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-016',
    question:
      'En cas de trouble psychique ayant aboli le discernement au moment des faits, quelle logique retient classiquement le code pénal ?',
    options: [
      'La peine est toujours double',
      'L’irresponsabilité pénale peut être retenue et conduire à une mesure de sûreté ou un suivi adapté selon les cas',
      'Le trouble est toujours sans effet sur la peine',
      'Seul le prévenu peut invoquer la légitime défense',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-017',
    question:
      'Pourquoi distingue-t-on concours réel et concours idéal dans une copie sur la sanction ?',
    options: [
      'Parce qu’ils sont synonymes',
      'Parce que le concours idéal vise une pluralité de qualifications d’un même fait matériel, le concours réel une pluralité d’infraction distinctes',
      'Parce que le concours idéal n’existe qu’en droit fiscal',
      'Le concours réel suppose toujours une seule peine de prison à vie',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },

  // ─── F10 Sanction ───
  {
    id: 'f10-q-020',
    question:
      'Avant de parler de « récidive légale », quel élément temporel et juridique impose-t-on en général par rapport à une condamnation antérieure ?',
    options: [
      'Une simple garde à vue suffit',
      'Une condamnation définitive antérieure respectant le délai légal entre les deux infractions, selon les cas (crime / délit)',
      'Une plainte de la victime suffit',
      'Aucune formalité n’est requise',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f10-q-021',
    question:
      'Le juge estime qu’un même geste matériel réalise plusieurs incriminations : quelle technique utilise-t-il le plus souvent pour fixer la peine ?',
    options: [
      'Cumul matématique illimité',
      'Absorption au profit de l’infraction la plus sévère (concours idéal), sous contrôle de la légalité des peines',
      'Il classe toujours sans suite',
      'Il demande l’avis du procureur général uniquement pour les contraventions',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f10-q-022',
    question:
      'En quoi la « réitération » diffère-t-elle typiquement de la « récidive légale » au tableau de la personnalisation de la peine ?',
    options: [
      'Ce sont des termes strictement identiques',
      'La réitération ne suppose pas les mêmes conditions de condamnation définitive préalable que la récidive légale',
      'La réitération impose automatiquement la perpétuité',
      'Seule la récidive existe dans le code',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f10-q-023',
    question:
      'Que vise principalement une peine complémentaire telle qu’une interdiction d’exercer une activité professionnelle ?',
    options: [
      'Remplacer systématiquement l’emprisonnement',
      'Prévenir un risque de réitération ou protéger une victime ou la société, après condamnation',
      'Augmenter les impôts locaux',
      'Annuler la peine principale',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },

  // ─── F11 Actes PJ / cadres ───
  {
    id: 'f11-q-030',
    question:
      'Un OPJ veut contrôler un piéton uniquairement parce qu’il est « visiblement étranger » sans autre motif : que risque juridiquement cette pratique au vu de la jurisprudence et des fascicules ?',
    options: [
      'Elle est toujours licite avant 22 h',
      'Elle est illicite : le contrôle sur la « seule apparence » ou le profilage ethnique viole les garanties fondamentales',
      'Elle est réservée aux maires',
      'Elle est automatiquement couverte par la zone frontalière',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-031',
    question:
      'En enquête préliminaire au domicile, l’occupant refuse l’accès aux forces de l’ordre : en l’absence de consentement exprès, qui peut en principe autoriser une perquisition chez lui ?',
    options: [
      'Le maire, seul',
      'Le juge des libertés et de la détention, par décision écrite et motivée dans les cas prévus par la loi',
      'L’adjoint au maire sans formalité',
      'Aucune autorisation n’est jamais nécessaire en préliminaire',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-032',
    question:
      'Pourquoi l’OPJ doit-il distinguer soigneusement le cadre de la garde à vue de celui de l’enquête de flagrance ?',
    options: [
      'Parce qu’ils portent exactement les mêmes durées toujours',
      'Parce que la durée maximale de la procédure de flagrance (huit jours, prolongation encadrée) ne se confond pas avec le plafond de privation de liberté en GAV de droit commun',
      'Parce que la GAV n’existe qu’en instruction',
      'Parce que l’un est civil et l’autre fiscal',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-033',
    question:
      'Lors d’une perquisition au cabinet d’un avocat, quel formalisme majeur le fascicule et le C.P.P. rappellent-ils systématiquement ?',
    options: [
      'Aucune protection particulière',
      'Présence du bâtonnier ou de son délégué et respect du secret professionnel (art. 56-1 C.P.P.)',
      'Convocation par courrier simple du client',
      'Interdiction absolue de tout acte d’enquête',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-034',
    question:
      'Une personne est entendue en audition libre : quel droit matériel la distingue d’un gardé à vue dans la rédaction du procès-verbal ?',
    options: [
      'Elle ne peut jamais parler à son avocat',
      'Elle peut quitter les lieux à tout moment puisqu’elle n’est pas privée de liberté',
      'Elle doit obligatoirement prêter serment',
      'La durée est plafonnée à trente minutes sans exception',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-035',
    question:
      'Qui délivre exclusivement une commission rogatoire destinée à habiliter un OPJ à accomplir des actes au nom du juge d’instruction ?',
    options: [
      'Le procureur de la République',
      'Le juge d’instruction',
      'Le président du tribunal judiciaire dans tous les cas',
      'Le préfet de police',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-036',
    question:
      'Pendant l’exécution d’un acte sur le fondement d’une commission rogatoire, que doit exhiber l’OPJ selon les exigences réitérées dans les fascicules ?',
    options: [
      'Un simple courriel du greffe',
      'L’original de la commission rogatoire lors des actes concernés',
      'La seule carte professionnelle',
      'Un mandat d’arrêt systématique',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-037',
    question:
      'En flagrance, une perquisition au domicile d’un tiers peut-elle intervenir la nuit ?',
    options: [
      'Jamais, même pour un crime',
      'Oui, notamment en cas de crime (périmètre à vérifier au texte applicable au moment des faits)',
      'Uniquement avec l’accord du maire',
      'Seulement entre midi et quatorze heures',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-038',
    question:
      'Dans quel cadre l’officier de police judiciaire doit-il en principe solliciter une autorisation écrite du procureur avant certaines réquisitions en préliminaire ?',
    options: [
      'Jamais, l’OPJ est totalement autonome',
      'Lorsque l’acte dépasse ses pouvoirs propres et que le texte exige l’accord préalable du parquet',
      'Uniquement pour les contraventions de stationnement',
      'Seulement le dimanche',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-039',
    question:
      'Un mineur de quinze ans est entendu sur des faits graves : quel impératif traverse généralement les auditions et GAV mineurs dans les fascicules procédure ?',
    options: [
      'Traiter le mineur comme un majeur sans aucune formalité',
      'Respecter les règles spécifiques du CJPM (représentants légaux, avocat, magistrat, durées…)',
      'Interdire tout entretien avec un avocat',
      'Supprimer la notification des droits',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-040',
    question:
      'Que doit contenir un procès-verbal d’audition pour conserver une forte valeur probante devant le juge ?',
    options: [
      'Uniquement le opinions de l’OPJ sur la culpabilité',
      'Les mentions légales des droits notifiés, l’identité des personnes et le compte rendu fidèle des déclarations',
      'Seulement la photocopie du titre de séjour',
      'Un code-barres sans signature',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },

  // ─── F12 Instruction, mandats, CJ, ARSE, DP ───
  {
    id: 'f12-q-050',
    question:
      'Quels trois caractères classiques de l’instruction préparatoire retient-on dans les manuels et fascicules (avant d’aborder les réformes de détail) ?',
    options: [
      'Oral, public, contradictoire',
      'Écrit, secret, non contradictoire',
      'Écrit, public, toujours contradictoire',
      'Oral, secret, contradictoire',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-051',
    question:
      'Parmi les cinq mandats traditionnellement étudiés pour l’examen OPJ, lequel permet de conduire la personne devant le juge sans pour autant signifier une incarcération immédiate comme effet propre ?',
    options: ['Le mandat d’arrêt', 'Le mandat d’amener', 'Le mandat de dépôt', 'Le mandat de recherche'],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-052',
    question:
      'Le « mandat de recherche » du code (art. 122-4 C.P.P. et suivants) est-il délivré par le juge d’instruction ?',
    options: [
      'Oui, en toutes circonstances',
      'Non, il est émis par le procureur de la République dans les cas légaux',
      'Oui, mais uniquement pour les contraventions',
      'Non, c’est une mesure administrative préfectorale',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-053',
    question:
      'Le contrôle judiciaire peut-il imposer à une personne physique toute obligation imaginable que le juge estimerait utile ?',
    options: [
      'Oui, sans limite',
      'Non, la liste des obligations est limitative aux textes (art. 138 C.P.P. et prolongements)',
      'Oui, sauf le week-end',
      'Uniquement pour les personnes morales',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
    explication: 'Les 17 obligations du contrôle judiciaire pour les personnes physiques : liste limitative.',
  },
  {
    id: 'f12-q-054',
    question:
      'L’assignation à résidence avec surveillance électronique (A.R.S.E.) peut-elle être ordonnée pour n’importe quel délit mineur sans condition de peine encourue ?',
    options: [
      'Oui, systématiquement',
      'Non, elle suppose notamment une infraction punie d’au moins deux ans d’emprisonnement (cadre légal à vérifier au moment de l’examen)',
      'Oui, mais seulement la nuit',
      'Non, elle est réservée aux témoins',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-055',
    question:
      'Qui statue en principe sur une demande de placement en détention provisoire à l’issue d’une mise en examen ?',
    options: [
      'Le juge d’instruction seul, sans autre magistrat',
      'Le juge des libertés et de la détention, saisi sur réquisitions ou observations',
      'Le maire de la commune du domicile',
      'Le ministre de l’Intérieur',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-056',
    question:
      'La détention provisoire est-elle possible pour tout simple délit de signalisation routière ?',
    options: [
      'Oui, automatiquement',
      'Non, elle suppose notamment un crime ou un délit puni d’au moins trois ans d’emprisonnement et l’une des finalités légales (art. 144 C.P.P.)',
      'Oui, si le prévenu refuse l’amende',
      'Uniquement pour les contraventions',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-057',
    question:
      'À quoi sert l’ordonnance de règlement en fin d’information lorsqu’elle statue sur des griefs de nullité ?',
    options: [
      'À classer le dossier sans jamais informer les parties',
      'À trancher les nullités soulevées (ou les constater prescrites) avant la clôture, dans un cadre contradictoire encadré',
      'À transférer le dossier au tribunal administratif',
      'À annuler toute peine prononcée',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-058',
    question:
      'Le juge d’instruction a-t-il le pouvoir de placer lui-même et seul un mis en examen en détention provisoire sans intervention du JLD ?',
    options: [
      'Oui, dans tous les dossiers',
      'Non, la détention provisoire est ordonnée par le JLD saisi dans les formes légales',
      'Oui, mais uniquement pour les crimes fiscaux',
      'Oui, si le prévenu est majeur',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-059',
    question:
      'Quel est le destinateur logique de la demande de mise en examen formulée par le ministère public après une enquête de police ?',
    options: [
      'Le maire',
      'Le juge d’instruction, sauf compétence directe du tribunal pour certains faits',
      'Le défenseur des droits seul',
      'La cour d’appel en premier ressort',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },

  // ─── F13 Juridictions & exécution ───
  {
    id: 'f13-q-070',
    question:
      'Pourquoi dit-on que le pourvoi en cassation n’est pas un « troisième examen du fond » des faits ?',
    options: [
      'Parce qu’il est gratuit',
      'Parce qu’il contrôle la légalité, pas l’appréciation souveraine des juges du fond sur la conviction des faits',
      'Parce qu’il est réservé aux avocats parisiens',
      'Parce qu’il n’existe plus depuis 2010',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-071',
    question:
      'Un justiciable veut contester un jugement pénal contradictoire en temps utile : quel réflexe de droit commun retient-on en procédure pénale ?',
    options: [
      'L’opposition devant le même juge, dans les dix jours du prononcé si jugement par défaut non applicable ici',
      'L’appel dans le délai légal à compter du prononcé (sauf cas spéciaux)',
      'Le recours gracieux au préfet',
      'La saisine du juge aux affaires familiales',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
    explication: 'Appel : art. 498 C.P.P. (10 jours en règle générale au prononcé).',
  },
  {
    id: 'f13-q-072',
    question:
      'À quel magistrat ou juridiction associe-t-on en principe l’exécution des peines privatives de liberté après jugement définitif ?',
    options: [
      'Le maire',
      'Le juge de l’application des peines (J.A.P.) et les services pénitentiaires',
      'Le procureur général de cassation seul',
      'Le tribunal administratif',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-073',
    question:
      'Les crimes relèvent-ils en principe de la cour d’assises pour leur jugement au fond (hors cas spéciaux type C.C.D.) ?',
    options: [
      'Non, le tribunal de police juge toujours les crimes',
      'Oui, en principe la cour d’assises est compétente pour les crimes devant un jury (sauf dévolution légale)',
      'Seulement si la victime est mineure',
      'Jamais en France métropolitaine',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-074',
    question:
      'Que signifie qu’une décision pénale « a passé en force de chose jugée » pour l’action publique sur les mêmes faits ?',
    options: [
      'Que le ministère public peut toujours réouvrir sans limite',
      'Que l’autorité de la chose jugée au pénal fait obstacle à une nouvelle poursuite pour les mêmes faits et la même qualification',
      'Que la victime perd tout droit civil',
      'Que le prévenu est automatiquement innocenté une seconde fois',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },

  // ─── F14 Action publique / PJ / contrôle ───
  {
    id: 'f14-q-080',
    question:
      'Un riverain découvre un cambriolage et souhaite obtenir réparation de son préjudice devant le tribunal répressif : quel couple d’actions doit-il distinguer dans sa stratégie ?',
    options: [
      'Uniquement une demande au juge des enfants',
      'L’action publique (répression) poussée par le parquet et éventuellement l’action civile (indemnisation)',
      'Seulement une médiation fiscale',
      'Uniquement un recours devant le tribunal des prud’hommes',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-081',
    question:
      'Qui dispose en principe du pouvoir d’apprécier l’opportunité des poursuites au stade de l’enquête et de la poursuite ?',
    options: [
      'Le juge d’instruction seul',
      'Le ministère public (procureur de la République et hiérarchie) dans le cadre légal',
      'La victime exclusivement',
      'Le Conseil constitutionnel',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-082',
    question:
      'Que recouvre l’article 14 C.P.P. lorsqu’on décrit la mission de la police judiciaire à un jury d’examens ?',
    options: [
      'Le maintien exclusif de l’ordre public lors des matchs',
      'La constatation des infractions, la recherche des preuves et des auteurs, et la transmission à la justice',
      'Le jugement des délits mineurs',
      'L’exécution des mandats de perpétuité',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-083',
    question:
      'Quelle autorité « surveille » l’activité des officiers de police judiciaire au sens large du contrôle prévu par le code et les fascicules ?',
    options: [
      'Le maire seul',
      'Le procureur général, sans exclure les contrôles disciplinaires (chambre de l’instruction, etc.)',
      'L’inspection générale des finances uniquement',
      'Le juge des référés civils',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-084',
    question:
      'Pourquoi l’officier de police judiciaire doit-il justifier d’une habilitation pour accomplir certains actes coercitifs ?',
    options: [
      'Pour des raisons purement esthétiques',
      'Parce que la loi distingue officiers, agents et assistants ; sans habilitation valable, l’acte est exposé à sanction civile ou nullité',
      'Parce que l’habilitation remplace le code pénal',
      'Parce que seuls les étrangers sont concernés',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-085',
    question:
      'Une victime veut participer au procès pénal pour obtenir des dommages-intérêts : quel mécanisme retient-on au fascicule sur l’action civile ?',
    options: [
      'Un simple courriel au parquet sans autre formalité',
      'La constitution de partie civile dans les formes prévues par le C.P.P.',
      'Une déclaration sur l’honneur devant le maire',
      'Le recours au tribunal de commerce',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-086',
    question:
      'Le parquet peut-il proposer une médiation pénale ou une composition pénale sans que le texte encadre la procédure ?',
    options: [
      'Oui, de façon entièrement discrétionnaire sans texte',
      'Non, ces voies sont régies par des articles précis du C.P.P. (alternatives aux poursuites)',
      'Uniquement pour les crimes d’assises',
      'Jamais pour les victimes',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-087',
    question:
      'Lorsqu’un agent de police judiciaire constate une infraction et transmet au parquet, à quel moment la notion d’« action publique » devient-elle centrale dans la copie ?',
    options: [
      'Jamais, elle est réservée au droit civil',
      'Dès la mise en mouvement ou le refus de poursuite : le ministère public orchestre l’action publique au nom de la société',
      'Uniquement après exécution définitive de la peine',
      'Seulement si la victime est fonctionnaire',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },

  // ─── Variété d’indices corrects + renfort volume (toujours questions complètes) ───
  {
    id: 'f08-q-090',
    question:
      'Selon la logique des libertés publiques, pourquoi les maires disposent-ils encore de pouvoirs de police mais ne « jugent » pas les crimes ?',
    options: [
      'Parce que le maire est juge unique des assises',
      'Parce que la police du maire vise surtout l’ordre public local, distincte du procès pénal devant les juridictions répressives',
      'Parce que le Code pénal lui interdit tout arrêté',
      'Parce qu’il fixe seul les peines de cour d’assises',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f09-q-091',
    question:
      'Un avocat vous demande où trouver la définition de la complicité : quel article cite-t-on en premier lieu au tableau du fascicule F09 ?',
    options: ['L’article 121-5 du Code pénal', 'L’article 121-7 du Code pénal', 'L’article 132-2 du Code pénal', 'L’article 111-1 du Code pénal'],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-092',
    question:
      'Peut-on cumuler pour une même personne physique une condamnation de la personne morale et une condamnation personnelle pour les mêmes faits ?',
    options: [
      'Non, la personne morale absorbe toujours la faute',
      'Oui, le cumul des sanctions est possible lorsque les conditions de chaque qualité d’auteur sont réunies',
      'Non, seule l’amende administrative est possible',
      'Oui, mais seulement pour les contraventions de Vᵉ classe',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-093',
    question:
      'L’élément légal d’une infraction renvoie-t-il aux circulaires ministérielles comme source directe de l’incrimination ?',
    options: [
      'Oui, elles créent seules le crime',
      'Non, la circulaire n’a pas valeur normative pénale ; l’incrimination vient de la loi (ou texte assimilé habilité)',
      'Oui, pour tous les délits routiers',
      'Uniquement si le préfet l’approuve',
    ],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f10-q-094',
    question:
      'Que risque un candidat qui confond « circonstances atténuantes » et « cause d’irresponsabilité » dans une copie sur la sanction ?',
    options: [
      'Aucun risque, ce sont des synonymes absolus',
      'Une confusion méthodologique lourde : l’une atténue la peine si elle est retenue, l’autre peut exclure l’imputabilité',
      'Uniquement une faute de style',
      'Le correcteur doit annuler toute la copie',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f11-q-095',
    question:
      'Dans l’esprit du fascicule F11, après expiration du délai maximal de l’enquête de flagrance sans poursuites adaptées, vers quel régime bascule-t-on en principe ?',
    options: [
      'Vers l’instruction obligatoire devant la cour d’assises',
      'Vers l’enquête préliminaire ou une autre forme prévue par le dossier et le parquet',
      'Vers l’extinction automatique de toute action publique',
      'Vers une procédure administrative préfectorale exclusive',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-096',
    question:
      'Pourquoi le fascicule insiste-t-il sur la distinction entre contrôle de régularité du séjour et contrôle judiciaire d’identité ?',
    options: [
      'Parce qu’ils emploient toujours les mêmes articles',
      'Parce que le cadre juridique, les autorités compétentes et les garanties diffèrent selon l’infraction invoquée',
      'Parce qu’il n’y a aucune différence opérationnelle',
      'Parce que seuls les douaniers contrôlent les Français',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-097',
    question:
      'En matière de saisie pénale au cours d’une perquisition, quel principe doit guider l’OPJ pour éviter les nullités pour « pêche au large » ?',
    options: [
      'Saisir tout objet sans lien avec l’infraction poursuivie',
      'Respecter la spécialité de la mesure et documenter le lien avec les faits visés',
      'Ne jamais établir de procès-verbal',
      'Laisser les objets sur place sans inventaire',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-098',
    question:
      'Parmi les mandats délivrés par le juge d’instruction, lequel entraîne en principe un placement immédiat en détention après exécution valide ?',
    options: ['Le mandat de recherche', 'Le mandat de comparution', 'Le mandat de dépôt', 'L’assignation à résidence'],
    correctIndex: 2,
    fascicule: 12,
    domaine: 'Procédure pénale',
    explication: 'Le mandat de dépôt vise l’incarcération immédiate sur ordonnance du JI.',
  },
  {
    id: 'f12-q-099',
    question:
      'Le mandat d’arrêt vise surtout quelle situation au regard du fascicule sur les mandats ?',
    options: [
      'La simple audition libre sans contrainte',
      'Les personnes en fuite ou résidant à l’étranger dans les hypothèses légales',
      'Les témoins mineurs',
      'Les gardes à vue de moins de six heures',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-100',
    question:
      'Une fois la personne trouvée sur le fondement d’un mandat de recherche délivré par le procureur, que prescrit en substance le C.P.P. pour la suite immédiate ?',
    options: [
      'La libérer sans formalité',
      'La présenter sans délai au procureur de la République et, sauf motivations contraires, la placer en garde à vue (art. 122 al. 2 C.P.P.)',
      'La renvoyer devant le tribunal administratif',
      'Attendre six mois avant toute mesure',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-101',
    question:
      'Pourquoi l’ordonnance pénale est-elle évoquée dans les fascicules sur les juridictions comme une voie spécifique ?',
    options: [
      'Parce qu’elle remplace toujours l’assises',
      'Parce qu’elle permet, dans un cadre légal restreint, une sanction sans audience contradictoire préalable dans les hypothèses prévues',
      'Parce qu’elle est réservée aux crimes',
      'Parce qu’elle est signée par le préfet',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-102',
    question:
      'Que peut demander une juridiction de jugement si elle estime utile de prolonger une mesure d’instruction pendant qu’elle statue au fond ?',
    options: [
      'Rien : elle perd toute compétence',
      'Certaines mesures d’enquête ou de coopération dans les limites prévues par le code (à ne pas confondre avec l’instruction préparatoire)',
      'Une commission rogatoire internationale seule sans juge',
      'L’annulation systématique du procès-verbal',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-103',
    question:
      'En cas de plainte avec constitution de partie civile, quel effet majeur sur l’action publique retient-on d’après le fascicule F14 ?',
    options: [
      'Elle éteint systématiquement l’action civile',
      'Elle met en mouvement l’action publique dans les cas où la loi l’exige pour poursuivre',
      'Elle interdit au parquet d’enquêter',
      'Elle supprime le rôle du juge d’instruction',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-104',
    question:
      'Un OPJ constate une infraction et rédige un procès-verbal transmis au procureur : à qui incombe-t-il en principe d’engager ou de classer les poursuites ?',
    options: [
      'À l’OPJ seul',
      'Au ministère public, sous le contrôle du juge pour certains cas spécifiques',
      'À la victime exclusivement',
      'Au médiateur de la République',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-105',
    question:
      'Quelle durée initiale de garde à vue pour un majeur en droit commun est le repère cardinal rappelé dans tous les fascicules procédure ?',
    options: ['Douze heures', 'Vingt-quatre heures', 'Quarante-huit heures d’emblée', 'Une semaine'],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f08-q-106',
    question:
      'L’article 3 de la CEDH prohibe la torture : peut-on l’écarter au motif d’une situation de crise ?',
    options: [
      'Oui, par décret du préfet',
      'Non, l’interdiction est absolue ; aucune dérogation n’est admise',
      'Oui, pour les seules garde à vue',
      'Oui, si le ministre de la Justice l’ordonne',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f09-q-107',
    question:
      'Comment qualifieriez-vous le commencement d’exécution d’un crime interrompu par des circonstances extérieures indépendantes de la volonté de l’auteur ?',
    options: ['Une simple contravention', 'Une tentative punissable si les autres conditions sont réunies', 'Un fait justificatif automatique', 'Une erreur de droit incurable'],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f10-q-108',
    question:
      'En matière de concours réel de plusieurs infractions, que fait le juge lorsque les peines privatives de liberté sont de même nature ?',
    options: [
      'Il additionne toujours sans plafond',
      'Il applique la peine la plus forte sauf textes spéciaux de cumul (art. 132-3 et s. C.P.)',
      'Il choisit la peine la plus faible',
      'Il renvoie le dossier au tribunal administratif',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f12-q-109',
    question:
      'Le fascicule F12 rappelle que le JLD intervient aussi pendant l’enquête : pour autoriser quoi, entre autres, sur demande motivée ?',
    options: [
      'Les seules amendes administratives',
      'Des perquisitions ou mesures coercitives lorsque la loi exige un contrôle judiciaire préalable',
      'Les nominations de maire',
      'La dissolution du syndicat des avocats',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f14-q-110',
    question:
      'Que doit faire un OPJ qui constate une infraction et est tenu par la loi de la signaler au parquet sans délai (logique de l’art. 40 C.P.P.) ?',
    options: [
      'Attendre l’accord du maire',
      'Transmettre sans retard les éléments utiles au procureur de la République pour apprécier la suite à donner',
      'Classer lui-même l’affaire',
      'Prononcer la peine sur-le-champ',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f09-q-111',
    question:
      'Où situeriez-vous en premier la légitime défense dans le code montré aux candidats (fascicule F09) ?',
    options: ['Article 122-7 du Code pénal', 'Article 122-5 du Code pénal', 'Article 121-2 du Code pénal', 'Article 113-2 du Code pénal'],
    correctIndex: 1,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f09-q-112',
    question:
      'L’état de nécessité est édité à quel article du Code pénal général ?',
    options: ['122-4', '122-5', '122-7', '122-9'],
    correctIndex: 2,
    fascicule: 9,
    domaine: 'DPG',
  },
  {
    id: 'f11-q-113',
    question:
      'À partir de quel moment compte-t-on en général les vingt-quatre premières heures de garde à vue pour un majeur ?',
    options: [
      'À l’arrivée au parking du commissariat',
      'À l’heure d’appréhension ou d’immobilisation de la personne',
      'Au lendemain matin à huit heures',
      'Après la signature du conseil municipal',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-114',
    question:
      'Le mandat de comparution vise à obtenir quoi de la personne concernée ?',
    options: [
      'Son incarcération immédiate sans débat',
      'Sa comparution volontaire à une date fixée devant le juge d’instruction',
      'Son expulsion du territoire',
      'Une médiation obligatoire civile',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f13-q-115',
    question:
      'Qui exerce en principe le ministère public devant le tribunal correctionnel ?',
    options: [
      'Le juge d’instruction',
      'Le procureur de la République ou ses substituts',
      'Le bâtonnier',
      'Le préfet de département',
    ],
    correctIndex: 1,
    fascicule: 13,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f08-q-116',
    question:
      'Pourquoi l’État peut-il être condamné civilement après une arrestation ou une garde à vue irrégulière ?',
    options: [
      'Parce que le juge pénal refuse toujours de se saisir',
      'Parce qu’une faute engageant la responsabilité de l’État peut être démontrée sur le fondement de la faute de service',
      'Parce que tout prévenu obtient automatiquement des dommages-intérêts',
      'Parce que le Code pénal l’interdit',
    ],
    correctIndex: 1,
    fascicule: 8,
    domaine: 'DPS',
  },
  {
    id: 'f10-q-117',
    question:
      'Qu’appelle-t-on « mesure de sûreté » par opposition à une peine classique ?',
    options: [
      'Une simple amende forfaitaire',
      'Une mesure visant la dangerosité ou la réinsertion sans être une peine au sens strict (ex. suivi socio-judiciaire, rétention de sûreté selon textes)',
      'Une peine infligée par le maire',
      'Une mesure réservée au droit commercial',
    ],
    correctIndex: 1,
    fascicule: 10,
    domaine: 'DPG',
  },
  {
    id: 'f14-q-118',
    question:
      'Les agents de police judiciaire adjoints peuvent-ils accomplir tous les actes d’un officier de police judiciaire ?',
    options: [
      'Oui, sans aucune différence',
      'Non, leur catalogue d’actes est limité par la loi (art. 21 C.P.P. et doctrine)',
      'Oui, dès qu’ils portent un brassard',
      'Oui, pour toutes les GAV de nuit',
    ],
    correctIndex: 1,
    fascicule: 14,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f11-q-119',
    question:
      'Dans le thème des réquisitions bancaires simplifié pour l’oral, qui est titulaire du pouvoir de réquisition en flagrance selon le tableau général du fascicule ?',
    options: [
      'Uniquement le maire',
      'L’OPJ agissant dans le cadre légal sans ordre préalable du PR pour les réquisitions de l’article 60 C.P.P., avec information du parquet',
      'Le juge des enfants',
      'Aucun acteur ne peut réquisitionner',
    ],
    correctIndex: 1,
    fascicule: 11,
    domaine: 'Procédure pénale',
  },
  {
    id: 'f12-q-120',
    question:
      'Qui clôt juridiquement l’information après instruction si le juge estime la mise en cause suffisamment établie pour renvoyer ?',
    options: [
      'Le préfet',
      'Le juge d’instruction par ordonnance de renvoi devant la juridiction compétente',
      'L’OPJ qui a rédigé le PV',
      'Le médiateur pénal',
    ],
    correctIndex: 1,
    fascicule: 12,
    domaine: 'Procédure pénale',
  },
];
