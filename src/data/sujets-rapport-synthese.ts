export type PieceJointe = {
  numero: string;
  type: string;
  contenu: string;
};

export type SujetRapportSynthese = {
  id: string;
  titre: string;
  contexte: string;
  pieces: PieceJointe[];
  structureAttendue: string[];
  dureeConseillee: number;
  difficulte: 'intermediaire' | 'avance';
  isPremium: boolean;
};

const STRUCTURE_STANDARD = [
  'En-tête rapport (service, destinataire : M. le Procureur de la République)',
  'Objet du rapport',
  'Exposé des faits (chronologie)',
  'Éléments à charge',
  'Éléments à décharge',
  'Qualification juridique retenue et base légale',
  'Mesures prises (GAV, notification droits, auditions)',
  'Situation actuelle du mis en cause',
  'Propositions de suites (déferrement / convocation / classement)',
  'Formule de clôture et signature',
] as const;

export const SUJET_RAPPORT_MARTIN: SujetRapportSynthese = {
  id: 'martin-violences-conjugales',
  titre: 'Affaire MARTIN — Violences conjugales avec ITT',
  contexte:
    'Les services sont saisis le 14 mars 2026 vers 22 h 40 à la suite d’un appel au 17. La victime, Mme Julie MARTIN, 34 ans, domiciliée 12 rue des Lilas à Montpellier, allègue des violences de la part de son concubin Thomas MARTIN, 36 ans, dans le cadre de la vie commune. Les constatations matérielles corroborent une altercation récente ; un certificat médical établit une ITT de huit jours. Le mis en cause a été interpellé en fin de nuit, placé en garde à vue, et a été entendu en présence de son avocat. Il conteste partiellement les faits et invoque la légitime défense. Le parquet doit être saisi par un rapport de synthèse structuré.',
  structureAttendue: [...STRUCTURE_STANDARD],
  dureeConseillee: 90,
  difficulte: 'intermediaire',
  isPremium: true,
  pieces: [
    {
      numero: 'Pièce n° 1',
      type: 'PV de constatation des traces et lésions apparentes',
      contenu: `PROCÈS-VERBAL DE CONSTATATION
PV n° 2026/08934/CSP-MP — L’an deux mille vingt-six, le quinze mars, à zéro heure dix

Nous, Capitaine Patricia REYNAUD, Officier de police judiciaire en résidence à Montpellier, assistés du Brigadier Karim BENALI.

AFFAIRE :
C/ Thomas MARTIN, né le 02/08/1989 à Sète, demeurant 12 rue des Lilas, Montpellier.

OBJET :
Constatation photographique et description des traces visibles sur la personne de Mme Julie MARTIN et dans le logement — suite à signalement violences conjugales.

--- À la demande du parquet et dans le prolongement de la saisine téléphonique de 22 h 40, nous nous rendons au domicile commun susvisé. ---
--- L’accès au logement est obtenu après contact avec la victime ; le mis en cause est absent à l’arrivée, signalé comme ayant quitté les lieux à bord du véhicule familial immatriculé AA-***-BB selon déclaration de la victime. ---
--- Mme MARTIN présente les signes suivants : ecchymose hématome sous l’œil gauche d’environ deux centimètres sur trois, avec œdème palpébral ; égratignures horizontales sur l’avant-bras droit ; marque de préhension au lobe de l’oreille droite décrite par l’intéressée comme résultant d’une tiraille violente. Elle déclare avoir reçu une gifle puis avoir été projetée contre l’angle d’un meuble de salon (bord de table basse en verre). ---
--- Trois clichés photographiques à l’échelle sont réalisés sous référence clichés CSP/2026/08934-A à C ; orientation nord du salon ; heure des prises de vues : 00 h 18 à 00 h 22. ---
--- Sur la table basse, constatation de traces de contact correspondant à un déplacement d’objet ; petite trace de sang séché sur le rebord (prélèvement technique demandé au service identité). ---
--- Relevé d’audition du voisinage : bruits de altercation entre 22 h 15 et 22 h 35, cris féminins, porte qui claque, non vu d’auteur direct. ---

Dont procès-verbal.`,
    },
    {
      numero: 'Pièce n° 2',
      type: "PV d'audition de victime (Mme Julie MARTIN)",
      contenu: `PROCÈS-VERBAL D’AUDITION DE VICTIME
PV n° 2026/08935/CSP-MP — L’an deux mille vingt-six, le quinze mars, à une heure quinze

Nous, Capitaine Patricia REYNAUD, OPJ en résidence à Montpellier.

AFFAIRE :
C/ Thomas MARTIN — violences volontaires sur conjoint avec circonstances aggravées (susceptibles).

OBJET :
Audition de Mme Julie MARTIN, née CARON le 12/04/1991 à Lyon.

--- Après information des droits prévus à l’article 10-2 du Code de procédure pénale, la personne entendue déclare sous serment moral de dire la vérité : elle vit en concubinage depuis quatre ans avec Thomas MARTIN ; deux enfants mineurs dorment lors des faits dans la chambre du fond. ---
--- Selon son récit, ce 14 mars vers 21 h 30, une dispute éclate à propos d’une dépense ; le ton monte ; Thomas MARTIN serait devenu « hors de lui », l’aurait giflée une première fois puis aurait saisi son bras droit pour l’immobiliser contre le mur du salon. Elle aurait tenté de se dégager ; il l’aurait lâchée violemment, la projetant contre la table basse, d’où le choc au visage. ---
--- Elle aurait crié ; l’homme serait sorti en claquant la porte vers 22 h 05 après avoir dit « tu ne parles à personne ». Elle aurait composé le 17 une fois seule dans l’appartement, après avoir verrouillé la porte à double tour. ---
--- Elle nie toute provocation physique de sa part avant la gifle ; admet avoir crié et avoir lancé une remarque sur l’usage de l’argent commun ; précise craindre des représailles si le mis en cause revient dans la nuit. ---
--- Elle souhaite déposer plainte et se constituer partie civile ; demande une mesure d’éloignement provisoire de droit commun ; autorise la citation des constatations médicales. ---
Relecture faite ; elle confirme et signe.

L’Officier de police judiciaire                                  Julie MARTIN

Dont procès-verbal.`,
    },
    {
      numero: 'Pièce n° 3',
      type: 'Certificat médical — ITT',
      contenu: `CENTRE HOSPITALIER RÉGIONAL — SERVICE DES URGENCES
Certificat des blessures et ITT

Patient : MARTIN Julie, née le 12/04/1991
Adresse : 12 rue des Lilas, 34000 Montpellier
Date et heure d’examen : 15/03/2026, 01 h 20

Plainte : coups violents au domicile.

Examen clinique :
Contusion péri-orbitaire gauche avec tuméfaction ; pas de vision double rapportée au moment de l’examen ; réflexes pupillaires normaux ; douleur à la palpation de l’arcade sourcilière. Éruptions épidermiques parallèles sur avant-bras droit compatibles avec égratignures superficielles sans signe d’infection. Contusion du pavillon d’oreille droite.

Imagerie : pas d’indication de scanner cérébral selon critères cliniques du moment ; conseil de réévaluation si céphalées persistantes ou vomissements.

Traitement : antalgique de palier I, froid local, arrêt de travail recommandé.

ITT : HUIT (8) JOURS À COMPTER DU 15/03/2026, au titre des lésions décrites, sans préjuger de l’issue judiciaire ni de complications ultérieures.

Le médecin signataire rappelle que ce certificat est établi à partir des constatations médicales et des déclarations de la patiente au service d’accueil des urgences.

Dr Emmanuel PERRIN, médecin urgentiste, cachet et signature illisible conforme au fichier administratif.`,
    },
    {
      numero: 'Pièce n° 4',
      type: "PV d'audition du mis en cause en garde à vue",
      contenu: `PROCÈS-VERBAL D’AUDITION DE PERSONNE GARDÉE À VUE
PV n° 2026/08941/SD — L’an deux mille vingt-six, le quinze mars, à quatorze heures trente

Nous, Lieutenant Alexandre FONTAINE, OPJ en fonction à la sûreté départementale de l’Hérault.

AFFAIRE :
C/ Thomas MARTIN — violences sur concubine.

OBJET :
Audition de Thomas MARTIN, interpellé le 15/03/2026 à 06 h 10 au domicile de ses parents ; placement en GAV à 06 h 45 ; notification des droits à 07 h 05 ; avocat Maître LEFÈVRE commis d’office présent à l’audition.

--- Le mis en cause indique avoir vécu une dispute « classique » sur l’argent ; reconnaît avoir élevé la voix et avoir quitté les lieux pour « calmer le jeu ». Il conteste avoir porté des coups avec l’intention de blesser ; affirme que sa compagne l’aurait poussé en premier dans le couloir et qu’il aurait repoussé son avant-bras pour se dégager ; nie la gifle volontaire ; évoque un possible contact accidentel avec le meuble lorsque « elle trébuche ». ---
--- Il explique son départ nocturne par la peur d’une escalade et le souhait de laisser retomber la tension ; il dit ignorer qu’elle avait appelé la police jusqu’à son interpellation matinale. ---
--- Il conteste toute ITT volontairement provoquée du côté de la victime et demande que soient entendus ses parents, avec lesquels il a passé la nuit. ---
--- Après lecture, il maintient ses déclarations et signe avec son conseil.

Thomas MARTIN                                Me LEFÈVRE                    L’OPJ

Dont procès-verbal.`,
    },
  ],
};

export const SUJET_RAPPORT_ECHO: SujetRapportSynthese = {
  id: 'echo-tf-bo-mineur',
  titre: 'Affaire ECHO — Trafic de stupéfiants en bande organisée',
  contexte:
    'L’enquête « ECHO » vise un réseau d’approvisionnement en résine de cannabis sur le littoral, avec passage de mule amateur et revente en secteur scolaire. Une surveillance électronique et physique est mise en œuvre ; une interpellation en flagrance a lieu après échange de colis dans un parking. Saisies, auditions et rapprochements PADE/TAJ structurent un dossier de taille moyenne exigeant une synthèse rigoureuse pour le parquet, avec qualification pénale nuancée (trafic, association, mineur).',
  structureAttendue: [...STRUCTURE_STANDARD],
  dureeConseillee: 120,
  difficulte: 'avance',
  isPremium: true,
  pieces: [
    {
      numero: 'Pièce n° 1',
      type: 'PV de compte rendu de surveillance opérationnelle',
      contenu: `NOTE DE SYNTHÈSE OPÉRATIONNELLE (versée au dossier sous forme PV n° 2026/11200)
Service : Brigade des stupéfiants, Montpellier.

Du 01/03/2026 au 12/03/2026, surveillance dispositive ciblant un véhicule Peugeot 308 gris métallisé, immatriculation BB-***-CC, utilisé par un individu identifié provisoirement « Jordan E. », contacts téléphoniques croisés avec un numéro enregistré au nom d’une société fictive « Ocean Trade ».

Observations : rendez-vous récurrents le mardi et jeudi à 19 h 30 au parking souterrain Polygone ; remise d’un sac isotherme contre remise d’une liasse ; durée moyenne d’échange inférieure à deux minutes. Corrélation géolocalisation avec un second véhicule Renault Clio blanche conduit par une personne féminine accompagnée d’un mineur visiblement scolarisé (uniforme lycée observé le 06/03).

Le 11/03, observation d’une quantité plastique opaque de forme parallélépipédique évoquant des galettes, non ouverte pour cause de nécessité de flagrance. Information transmise au magistrat superviseur selon voies habituelles ; maintien du dispositif pour identification des receleurs secondaires.`,
    },
    {
      numero: 'Pièce n° 2',
      type: "PV d'interpellation et contrôle post-flagrance",
      contenu: `PROCÈS-VERBAL D’INTERPELLATION
PV n° 2026/11218 — Le 12/03/2026 à 19 h 52, parking niveau -1.

Nous, Major Sophie LEMAIRE, OPJ, assistée de deux équipiers en tenue.

Cadre : flagrance — infractions relatives aux stupéfiants (usage et trafic).

--- À l’issue du repérage, Jordan ELMALEH, né le 09/11/1998, est interpellé alors qu’il saisit un sac isotherme déposé à l’arrière du véhicule 308. Palpation de sécurité ; découverte sur sa personne de 1 120 € fractionnés en petits billets. ---
--- À l’ouverture contrôlée du sac en présence de témoins assermentés : six pains de résine emballés sous film alimentaire, marquages neutres, pesée indiciaire sur site 1,78 kg, scellés STUP/2026/8801 à 8803 selon protocole. ---
--- Notification des droits en garde à vue ; mention du droit à l’avocat ; silence partiel sur l’origine des fonds. ---

Dont procès-verbal.`,
    },
    {
      numero: 'Pièce n° 3',
      type: 'PV de saisie et inventaire',
      contenu: `PROCÈS-VERBAL DE SAISIE
PV n° 2026/11219 — Complément sur lieux et au service.

Inventaire : résine cannabis (scellés STUP/2026/8801-8803) ; téléphone portable Samsung scellé SC/2026/4411, extraction ultérieure autorisée ; ticket de caisse d’une animalerie sans lien apparent retenu comme PJ/2026/118 pour rapport de provenance secondaire.

Prélèvement ADN sur emballage : demande transmise au laboratoire ; numéro de prélèvement interne LP/26/HDF/7782.

Mention légale : saisie opérée en présence de l’intéressé après information de ses droits ; refus de signer le procès-verbal de saisie sans contestation de la présence matérielle des objets.

Scellés conservés au coffre de la brigade en attente de continuation ; échantillon témoin transmis au laboratoire selon circulaire en vigueur.`,
    },
    {
      numero: 'Pièce n° 4',
      type: "PV d'audition de témoin (gérant parking)",
      contenu: `AUDITION DE TÉMOIN — PV n° 2026/11222

M. Franck PUJOL, gérant technique du parking, entendu librement le 13/03/2026.

Il rapporte une altercation verbale courte le 10/03 entre un automobiliste et un groupe de jeunes à proximité de l’ascenseur ; pas de plainte à l’époque. Reconnaît sur photographie le véhicule 308 comme stationnant souvent au même emplacement B17. Indique disposer d’extraits vidéo limités à 72 h ; conservation anticipée effectuée sur réquisition verbale le 12/03 à 22 h. Remet copie sur support numérique scellé VID/2026/009.

Mention : droit de ne pas s’incriminer rappelé ; lecture et signature.`,
    },
    {
      numero: 'Pièce n° 5',
      type: "PV d'audition de mis en cause (comparse ultérieure)",
      contenu: `AUDITION SUITE GAV — PV n° 2026/11240 — Le 14/03/2026

Jordan ELMALEH, assisté de counsel, après mise à disposition des expertises préliminaires de pesée.

--- Reconnaît le transport du sac ; soutient avoir agi sous contrainte morales de tiers non nommés « par peur pour sa famille » sans fournir de nom vérifiable à ce stade. Contestation du caractère commercial ; évoque une « livraison d’amitié » pour un montant symbolique. ---
--- Interrogé sur la présence du mineur observée, indique l’ignorer ; conteste toute volonté de mise en contact de mineurs avec des stupéfiants. ---

Fin de GAV le 14/03 à 18 h ; présentation au parquet recommandée selon note hiérarchique jointe.

Dont procès-verbal.`,
    },
  ],
};

export const SUJET_RAPPORT_GOLF: SujetRapportSynthese = {
  id: 'golf-enlevement-sequestration',
  titre: 'Affaire GOLF — Enlèvement et séquestration',
  contexte:
    'Une étudiante signale sous la contrainte un enlèvement simulé puis réel dans un scénario confus impliquant deux hommes et un véhicule volé. Les constatations téléphoniques (Bornes, géolocalisation), les auditions de voisinage et la garde à vue de l’auteur présumé complètent un dossier sensible nécessitant une synthèse particulièrement prudente sur la distinction entre faits établis et hypothèses.',
  structureAttendue: [...STRUCTURE_STANDARD],
  dureeConseillee: 120,
  difficulte: 'avance',
  isPremium: true,
  pieces: [
    {
      numero: 'Pièce n° 1',
      type: "Extrait de PV d'appel et enregistrement du 17 (résumé officiel)",
      contenu: `RAPPEL D’ENREGISTREMENT — Référence appel 17 : 26GOLF7782 — 18/03/2026, 21 h 42.

Opérateur CRS : une voix féminine paniquée indique être « dans un coffre » ; bruits de moteur ; coupure à 21 h 44. Relocalisation cellulaire sur relais 87422 secteur périphérie ouest de Nîmes. Création de faisceau prioritaire ; enregistrement archivé sous support AAP/2026/4401.

Le standard signale qu’une seconde ligne depuis le téléphone personnel de la victime présumée capte un SMS automatique « besoin d’aide » envoyé à 21 h 47 vers un proche.

Ces éléments sont versés au dossier pour besoin de cohérence horaire ; ils ne préjugent pas de l’authenticité des déclarations ultérieures.`,
    },
    {
      numero: 'Pièce n° 2',
      type: 'PV de constatations sur la découverture du véhicule',
      contenu: `CONSTATATIONS — PV n° 2026/13005 — 19/03/2026, 06 h 10, chemin rural Voie Domitienne, lieu-dit Mas Blanc.

Véhicule Renault Clio IV noir, volé signalé JVL/2026/887, retrouvé abandonné ; moteur froid ; portière conducteur ouverte ; sac à dos abandonné contenant lacets en nylon et ruban adhésif ; buée intérieure aux vitres suggérant occupation récente de l’habitacle.

Relevés technique : empreinte partielle talon sur seuil de portière ; prélèvement fibre textile ; envoi au laboratoire LST/2026/3309.

Aucune personne sur les lieux ; périmètre isolé ; chien de recherche négatif dans un rayon de 300 m à 07 h 30.`,
    },
    {
      numero: 'Pièce n° 3',
      type: "PV d'audition de témoins (riverains)",
      contenu: `AUDITIONS VOISINAGE — PV n° 2026/13012 à 13015 — 19/03/2026 matinée.

Plusieurs auditions concordantes : cris entendus vers 22 h 10–22 h 25 ; phares dans le champ derrière la résidence étudiante ; des témoins rapportent deux silhouettes masculines forçant l’entrée d’une voiture déjà présente ; immatricule non lu ; une personne témoigne avoir cru reconnaître une Clio noire « comme celle de Chloé » sans certitude.

Aucun témoin oculaire direct de l’enlèvement ; toutes les personnes entendues ont signé après lecture ; mentions d’âge et de lien avec la victime portées en marge.`,
    },
    {
      numero: 'Pièce n° 4',
      type: "PV d'audition du mis en cause après GAV (séquestration)",
      contenu: `AUDITION GAV — PV n° 2026/13044 — Mis en cause : Kevin HORTALA, né le 03/01/1994.

--- Reconnaît avoir été présent avec un complice recherché « Nino » non identifié ; minimise son rôle comme conducteur ; nie avoir enfermé la victime dans le coffre ; affirme que celle-ci serait montée « volontairement pour parler » puis aurait paniqué ; conteste l’intention criminelle d’enlèvement ; évoque un règlement de compte lié à une dette de stupéfiants. ---
--- Concernant les liens et ruban, indique qu’ils étaient dans le sac de « Nino » sans qu’il en connaisse l’usage au départ. ---

Notification des droits art. 63-1 rappelée ; confrontation technique demandée au parquet pour organisation ultérieure.`,
    },
    {
      numero: 'Pièce n° 5',
      type: 'PV de réquisition et examen médical de la victime',
      contenu: `RÉQUISITION MÉDICALE — PV n° 2026/13050 — 19/03/2026, 14 h 00.

La victime Chloé ARNAUD, majeure, identité vérifiée à l’issue de sa mise en liberté par les auteurs selon son récit à 23 h 50 sur aire d’autoroute (témoignage d’un routier en cours de consolidation), est examinée au samu psychiatrique et par médecin légiste demandé par le parquet.

Constatations : contusions poignets compatibles avec lien serre ; état de stress post-traumatique aigu ; pas de lésions internes au scanner abdominale ; surveillance ambulatoire prescrite.

Le médecin légiste joint une estimation d’ITT provisoire à zéro jour au sens strict pénal des lésions corporelles mais recommande inclusion d’un suivi psychologique dans le dossier de personne.

Les scellés biologiques et photographies médico-légales sont inventoriés sous référence MLL/2026/5510.`,
    },
  ],
};

export const SUJETS_RAPPORT_SYNTHESE: SujetRapportSynthese[] = [
  SUJET_RAPPORT_MARTIN,
  SUJET_RAPPORT_ECHO,
  SUJET_RAPPORT_GOLF,
];

export function getSujetRapportById(id: string): SujetRapportSynthese | undefined {
  return SUJETS_RAPPORT_SYNTHESE.find((s) => s.id === id);
}
