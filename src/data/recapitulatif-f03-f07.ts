/** Sections tableau récapitulatif + référentiel — fascicules F03 à F07 (SDCP). */
export const recapSectionsF03F07 = [
  {
    id: 'f03-circulation',
    fascicule: 'F03' as const,
    groupTitle: 'Les infractions à la circulation routière',
    headerClass: 'bg-sky-950/80 text-sky-100',
    rows: [
      {
        infraction: '**La conduite sous l\'empire d\'un état alcoolique**',
        legal: 'Art. L. 234-1/I et V C.R.',
        materiel:
          '**UN CONDUCTEUR DE VÉHICULE OU UN ACCOMPAGNATEUR D\'ÉLÈVE CONDUCTEUR** / **TAUX D\'ALCOOLÉMIE ≥ SEUILS LÉGAUX (AIR / SANG)** / **CAS DE CONTRÔLE**',
        moral: '**VOLONTÉ DE CONDUIRE EN AYANT CONSOMMÉ DE L\'ALCOOL**',
      },
      {
        infraction: '**La conduite en état d\'ivresse manifeste**',
        legal: 'Art. L. 234-1/II et V C.R.',
        materiel:
          '**CONDUCTEUR OU ACCOMPAGNATEUR** / **ÉTAT D\'IVRESSE MANIFESTE (SIGNES EXTERNES)** / **PREUVE PAR DÉPISTAGE OU EXAMEN CLINIQUE**',
        moral: '**VOLONTÉ DE CONDUIRE EN ÉTAT D\'IVRESSE MANIFESTE**',
      },
      {
        infraction: '**La conduite après usage de substances ou plantes classées comme stupéfiants**',
        legal: 'Art. L. 235-1/I C.R.',
        materiel:
          '**CONDUCTEUR OU ACCOMPAGNATEUR** / **CAS PERMETTANT LA RECHERCHE** / **PREUVE : DÉPISTAGE POSITIF + ANALYSE CONFIRMATIVE**',
        moral: '**VOLONTÉ DE CONDUIRE APRÈS USAGE DE STUPÉFIANTS**',
      },
      {
        infraction: '**Le délit de fuite**',
        legal: 'Art. 434-10 C.P. et L. 231-1 C.R.',
        materiel:
          '**CONDUCTEUR D\'UN VÉHICULE** / **ACCIDENT** / **CONNAISSANCE D\'AVOIR CAUSÉ OU OCCASIONNÉ L\'ACCIDENT** / **ABSENCE D\'ARRÊT** / **TENTATIVE D\'ÉCHAPPER À SA RESPONSABILITÉ**',
        moral: '**CONSCIENCE + VOLONTÉ DE SE SOUSTRAIRE À SA RESPONSABILITÉ PÉNALE OU CIVILE**',
      },
      {
        infraction: '**L\'homicide routier**',
        legal: 'Art. 221-18 C.P. (loi n° 2025-622 du 09/07/2025)',
        materiel:
          '**CONDUCTEUR DE VTM** / **AU MOINS UNE CIRCONSTANCE DE « VIOLENCE ROUTIÈRE » (ALCOOL, STUPÉFIANTS, EXCÈS DE VITESSE ≥30 KM/H, PERMIS, FUITE, TÉLÉPHONE AU VOLANT, REFUS D\'OBTEMPÉRER, ÉCRAN…)** / **MORT SANS INTENTION** / **CAUSALITÉ**',
        moral: '**ABSENCE D\'INTENTION HOMICIDE** / **FAUTE QUALIFIÉE + COMPORTEMENT DANGEREUX**',
      },
      {
        infraction: '**Le refus d\'obtempérer**',
        legal: 'Art. L. 233-1/I C.R.',
        materiel: '**AGENTS HABILITÉS** / **SOMMATION DE S\'ARRÊTER** / **REFUS D\'OBTEMPÉRER**',
        moral: '**VOLONTÉ DE NE PAS OBEIR À LA SOMMATION**',
      },
      {
        infraction: '**Le refus de se soumettre aux vérifications**',
        legal: 'Art. L. 233-2/I C.R.',
        materiel: '**REFUS DES ÉPREUVES DE DÉPISTAGE OU VÉRIFICATIONS MÉDICALES** / **ALCOOL OU STUPÉFIANTS**',
        moral: '**REFUS VOLONTAIRE ET EN CONNAISSANCE DE CAUSE**',
      },
      {
        infraction: '**Le défaut de permis de conduire**',
        legal: 'Art. L. 221-2/I C.R.',
        materiel:
          '**CONDUCTEUR** / **DÉFAUT DE PERMIS (JAMAIS TITULAIRE, ANNULATION, SUSPENSION, INVALIDATION, RÉTENTION)**',
        moral: '**CONDUIRE VOLONTAIREMENT SANS PERMIS ADAPTÉ**',
      },
      {
        infraction: '**Le défaut d\'assurance**',
        legal: 'Art. L. 324-2/I C.R.',
        materiel: '**VÉHICULE SOUMIS À OBLIGATION D\'ASSURANCE** / **DÉFAUT DE COUVERTURE RC**',
        moral: '**CONDUIRE EN SACHANT L\'ABSENCE D\'ASSURANCE**',
      },
      {
        infraction: '**Les délits relatifs aux plaques et inscriptions apposées sur les véhicules**',
        legal: 'Art. L. 317-4 et L. 317-4-1 C.R.',
        materiel: '**NON-RESPECT DES RÈGLES D\'IMMATRICULATION** / **PLAQUES FALSIFIÉES, DISSIMULÉES OU MANQUANTES**',
        moral: '**CONSCIENCE ET VOLONTÉ DE NE PAS RESPECTER LES RÈGLES D\'IMMATRICULATION**',
      },
      {
        infraction: '**Le délit de grand excès de vitesse**',
        legal: 'Art. L. 413-1 C.R.',
        materiel: '**DÉPASSEMENT ≥ 50 KM/H** / **RÉCIDIVE LÉGALE (3 ANS)**',
        moral: '**CONSCIENCE ET VOLONTÉ EN ÉTAT DE RÉCIDIVE**',
      },
      {
        infraction: '**Le rodéo motorisé**',
        legal: 'Art. L. 236-1/I C.R.',
        materiel:
          '**VÉHICULE TERRESTRE À MOTEUR** / **MANŒUVRES RÉPÉTÉES** / **VIOLATION RÉPÉTÉE DE SÉCURITÉ OU PRUDENCE** / **LIEU : VOIE OU TERRAIN PRIVÉ**',
        moral: '**VIOLATION DÉLIBÉRÉE RÉPÉTÉ CONSCIENTE POUR LA SÉCURITÉ OU LA TRANQUILLITÉ PUBLIQUE**',
      },
      {
        infraction: '**L\'incitation, l\'organisation et la promotion des rodéos motorisés**',
        legal: 'Art. L. 236-2 C.R.',
        materiel:
          '**INCITER À PARTICIPER** / **OU ORGANISER UN RASSEMBLEMENT** / **OU PROMOUVOIR CES RASSEMBLEMENTS**',
        moral: '**VOLONTÉ D\'INCITER, ORGANISER OU PROMOUVOIR**',
      },
    ],
  },
  {
    id: 'f04-etat',
    fascicule: 'F04' as const,
    groupTitle: 'Crimes et délits contre la Nation, l\'État et la paix publique',
    headerClass: 'bg-indigo-950/80 text-indigo-100',
    rows: [
      {
        infraction: '**Les discriminations (par un fonctionnaire)**',
        legal: 'Art. 432-7 C.P.',
        materiel:
          '**DÉPOSITAIRE DE L\'AUTORITÉ PUBLIQUE OU MISSION DE SP** / **REFUS DE DROIT OU ENTRAVE** / **MOTIF DISCRIMINATOIRE**',
        moral: '**CONSCIENCE D\'AGIR DE FAÇON DISCRIMINATOIRE**',
      },
      {
        infraction: '**Les atteintes à l\'inviolabilité du domicile (par un fonctionnaire)**',
        legal: 'Art. 432-8 C.P.',
        materiel: '**AUTORITÉ PUBLIQUE OU MISSION DE SP** / **INTRODUCTION OU PERSISTANCE SANS CONSENTEMENT** / **HORS CAS LÉGAUX**',
        moral: '**CONSCIENCE DE PÉNÉTRER OU SE MAINTENIR HORS CADRE LÉGAL**',
      },
      {
        infraction: '**Les atteintes au secret des correspondances (par un fonctionnaire)**',
        legal: 'Art. 432-9 C.P.',
        materiel:
          '**AUTORITÉ PUBLIQUE OU AGENT RÉSEAU** / **DÉTOURNEMENT, SUPPRESSION, OUVERTURE, RÉVÉLATION** / **HORS CAS LÉGAUX**',
        moral: '**CONSCIENCE D\'AGIR HORS CADRE LÉGAL**',
      },
      {
        infraction: '**La concussion**',
        legal: 'Art. 432-10 C.P.',
        materiel:
          '**AUTORITÉ OU MISSION DE SP** / **RECEVOIR, EXIGER OU ORDONNER DES SOMMES INDUES OU EXONÉRATION ILLICITE**',
        moral: '**CONNAISSANCE DU CARACTÈRE INDU**',
      },
      {
        infraction: '**La corruption passive et le trafic d\'influence passif**',
        legal: 'Art. 432-11 C.P.',
        materiel:
          '**AUTORITÉ OU MISSION DE SP** / **SOLICITER OU AGRÉER AVANTAGES** / **POUR ACTE OU ABSTENTION OU ABUS D\'INFLUENCE**',
        moral: '**CONSCIENCE D\'ACCEPTER UN AVANTAGE INDU**',
      },
      {
        infraction: '**L\'outrage**',
        legal: 'Art. 433-5 C.P.',
        materiel:
          '**PAROLES, GESTES, MENACES OU ÉCRITS NON PUBLICS, ENVOI D\'OBJETS** / **DESTINATAIRE : SP OU AUTORITÉ** / **EXERCICE OU OCCASION DES FONCTIONS**',
        moral: '**VOLONTÉ DE MANIFESTER LE MÉPRIS**',
      },
      {
        infraction: '**La rébellion**',
        legal: 'Art. 433-6 C.P.',
        materiel:
          '**VIOLENCES OU VOIES DE FAIT** / **À L\'ENCONTRE D\'UN AGENT D\'AUTORITÉ OU SP** / **POUR S\'OPPOSER À LOI, RÈGLEMENT OU ACTE**',
        moral: '**CONSCIENCE D\'EXERCER DES VIOLENCES CONTRE L\'AUTORITÉ**',
      },
      {
        infraction: '**La provocation directe à la rébellion**',
        legal: 'Art. 433-10 C.P.',
        materiel:
          '**PROVOCATION À LA RÉBELLION ARMÉE OU NON** / **PAR DISCOURS, ÉCRITS, IMAGES OU SUPPORTS DE COMMUNICATION**',
        moral: '**VOLONTÉ DE PROVOQUER LA RÉSISTANCE CONTRE L\'AUTORITÉ**',
      },
      {
        infraction: '**La non-dénonciation de crime**',
        legal: 'Art. 434-1 C.P.',
        materiel:
          '**CONNAISSANCE D\'UN CRIME** / **ATTEINTES ENCORE PRÉVENABLES OU AUTEURS ENCORE DANGEREUX** / **ABSENCE DE DÉNONCIATION**',
        moral: '**CONSCIENCE DU CRIME + VOLONTÉ DE NE PAS DÉNONCER**',
      },
      {
        infraction: '**Le témoignage mensonger**',
        legal: 'Art. 434-13 C.P.',
        materiel: '**TÉMOIN SOUS SERMENT** / **DÉPOSITION MENSONGÈRE** / **SOUS SERMENT**',
        moral: '**CONSCIENCE DE DÉPOSER FAUX**',
      },
      {
        infraction: '**Le faux et l\'usage de faux**',
        legal: 'Art. 441-1 C.P.',
        materiel:
          '**SUPPORT** / **PREUVE D\'UN DROIT OU FAIT À EFFET JURIDIQUE** / **ALTÉRATION FRAUDULEUSE** / **PRÉJUDICE CAUSÉ OU SUSCEPTIBLE**',
        moral: '**CONSCIENCE D\'ALTÉRER LA VÉRITÉ + INTENTION FRAUDULEUSE OU À DESSEIN DE NUIRE**',
      },
      {
        infraction: '**La participation à une association de malfaiteurs**',
        legal: 'Art. 450-1 C.P.',
        materiel:
          '**GROUPEMENT OU ENTENTE** / **EN VUE DE CRIMES OU DÉLITS ≥ 5 ANS** / **PRÉPARATION PAR FAITS MATÉRIELS**',
        moral: '**CONSCIENCE DE PARTICIPER À UN GROUPEMENT POUR INFRACTIONS GRAVES**',
      },
    ],
  },
  {
    id: 'f05-stupefiants',
    fascicule: 'F05' as const,
    groupTitle: 'Usage et trafic de stupéfiants',
    headerClass: 'bg-purple-950/80 text-purple-100',
    rows: [
      {
        infraction: '**L\'usage illicite de stupéfiants**',
        legal: 'Art. L. 3421-1 C.S.P.',
        materiel: '**USAGE DE SUBSTANCES OU PLANTES CLASSÉES** / **SANS PRESCRIPTION OU HORS CONDITIONS LÉGALES**',
        moral: '**CONSCIENCE D\'USER D\'UNE SUBSTANCE CLASSÉE**',
      },
      {
        infraction: '**La provocation d\'un majeur à l\'usage ou au trafic de stupéfiants**',
        legal: 'Art. L. 3421-4 C.S.P.',
        materiel:
          '**PROVOCATION OU PRÉSENTATION FAVORABLE** / **MAJEUR** / **MÊME SI NON SUIVI D\'EFFET**',
        moral: '**VOLONTÉ DE PROVOQUER**',
      },
      {
        infraction: '**La direction ou l\'organisation d\'un trafic de stupéfiants**',
        legal: 'Art. 222-34 C.P.',
        materiel:
          '**DIRIGER OU ORGANISER UN GROUPEMENT** / **PRODUCTION, FABRICATION, IMPORT, EXPORT, TRANSPORT, DÉTENTION, ACQUISITION**',
        moral: '**CONSCIENCE DE DIRIGER UNE ORGANISATION DE TRAFIC**',
      },
      {
        infraction: '**La production ou la fabrication illicites de stupéfiants**',
        legal: 'Art. 222-35 C.P.',
        materiel: '**PRODUIRE OU FABRIQUER** / **STUPÉFIANTS** / **SANS AUTORISATION**',
        moral: '**CONSCIENCE DE PRODUIRE OU FABRIQUER ILLICITEMENT**',
      },
      {
        infraction: '**L\'importation ou l\'exportation illicites de stupéfiants**',
        legal: 'Art. 222-36 C.P.',
        materiel: '**IMPORTER OU EXPORTER** / **STUPÉFIANTS** / **SANS AUTORISATION**',
        moral: '**CONSCIENCE D\'IMPORTER OU EXPORTER ILLICITEMENT**',
      },
      {
        infraction:
          '**Le transport, la détention, l\'offre, la cession, l\'acquisition ou l\'emploi illicites de stupéfiants**',
        legal: 'Art. 222-37 C.P.',
        materiel: '**TRANSPORTER, DÉTENIR, OFFRIR, CÉDER, ACQUÉRIR OU EMPLOYER** / **SANS AUTORISATION**',
        moral: '**CONSCIENCE D\'AGIR ILLICITEMENT SUR DES STUPÉFIANTS**',
      },
      {
        infraction: '**La facilitation à l\'usage illicite de stupéfiants**',
        legal: 'Art. 222-37 al. 2 C.P.',
        materiel: '**FACILITER L\'USAGE** / **OU ORDONNANCES FICTIVES OU DE COMPLAISANCE**',
        moral: '**CONSCIENCE DE FACILITER L\'USAGE ILLICITE**',
      },
      {
        infraction: '**Le blanchiment du produit du trafic de stupéfiants**',
        legal: 'Art. 222-38 C.P.',
        materiel: '**JUSTIFICATION MENSONGÈRE DE L\'ORIGINE** / **OU CONCOURS À PLACEMENT OU CONVERSION**',
        moral: '**CONSCIENCE DE BLANCHIR LE PRODUIT DU TRAFIC**',
      },
      {
        infraction:
          '**La cession ou l\'offre illicites de stupéfiants à une personne en vue de sa consommation personnelle**',
        legal: 'Art. 222-39 C.P.',
        materiel: '**CÉDER OU OFFRIR** / **DESTINATION : CONSOMMATION PERSONNELLE DU DESTINATAIRE**',
        moral: '**CONSCIENCE DE CÉDER OU OFFRIR POUR CONSOMMATION PERSONNELLE**',
      },
    ],
  },
  {
    id: 'f06-mineurs',
    fascicule: 'F06' as const,
    groupTitle: 'Atteintes aux mineurs et à la famille',
    headerClass: 'bg-rose-950/80 text-rose-100',
    rows: [
      {
        infraction: '**L\'abandon de famille**',
        legal: 'Art. 227-3 C.P.',
        materiel:
          '**OBLIGATION ALIMENTAIRE OU CONTRIBUTIVE OU PENSION** / **SOUSTRACTION > 2 MOIS** / **DÉCISION OU CONVENTION HOMOLOGUÉE**',
        moral: '**VOLONTÉ DE SE SOUSTRAIRE**',
      },
      {
        infraction: '**La non-représentation d\'enfant mineur**',
        legal: 'Art. 227-5 C.P.',
        materiel: '**DÉTENTION LÉGALE DE L\'ENFANT** / **REFUS DE REPRÉSENTATION À AYANT DROIT**',
        moral: '**VOLONTÉ DE PRIVER L\'AUTRE PARENT**',
      },
      {
        infraction: '**La soustraction d\'enfant mineur par un ascendant**',
        legal: 'Art. 227-7 C.P.',
        materiel: '**ASCENDANT** / **SOUSTRACTION À AUTORITÉ PARENTALE OU GARDE LÉGITIME**',
        moral: '**VOLONTÉ DE SOUSTRAIRE À LA GARDE LÉGITIME**',
      },
      {
        infraction: '**La corruption de mineur**',
        legal: 'Art. 227-22 C.P.',
        materiel:
          '**FAVORISER LA CORRUPTION D\'UN MINEUR** / **ASSISTER À DES RÉUNIONS EXHIBITIONS OU RELATIONS SEXUELLES**',
        moral: '**CONSCIENCE DE FAVORISER LA CORRUPTION**',
      },
      {
        infraction: '**Les propositions sexuelles à mineur de 15 ans par moyen électronique**',
        legal: 'Art. 227-22-1 C.P.',
        materiel: '**MAJEUR** / **MINEUR DE 15 ANS** / **PROPOSITION DE RENCONTRE SEXUELLE** / **MOYEN ÉLECTRONIQUE** / **TENTATIVE PUNISSABLE**',
        moral: '**CONSCIENCE DE LA PROPOSITION À UN MINEUR DE 15 ANS**',
      },
      {
        infraction: '**L\'exploitation de l\'image pornographique d\'un mineur**',
        legal: 'Art. 227-23 C.P.',
        materiel:
          '**FIXER, ENREGISTRER, TRANSMETTRE, DIFFUSER, DÉTENIR, ETC.** / **IMAGE PORNOGRAPHIQUE** / **MINEUR OU SEMBLANT MINEUR**',
        moral: '**CONSCIENCE DE PRODUIRE OU DIFFUSER**',
      },
      {
        infraction: '**Les atteintes sexuelles sur mineur de 15 ans par un majeur**',
        legal: 'Art. 227-25 C.P.',
        materiel:
          '**MAJEUR ET MINEUR DE 15 ANS** / **ATTEINTE SEXUELLE SANS VIOLENCE, CONTRAINTE, MENACE NI SURPRISE**',
        moral: '**CONSCIENCE DU CARACTÈRE SEXUEL ET DE LA MINORITÉ**',
      },
      {
        infraction: '**Les atteintes sexuelles sur mineur de plus de 15 ans par un majeur**',
        legal: 'Art. 227-27 C.P.',
        materiel:
          '**ASCENDANT OU PERSONNE AYANT AUTORITÉ** / **MINEUR DE 15 À 18 ANS** / **ATTEINTE SANS VIOLENCE, CONTRAINTE, MENACE NI SURPRISE**',
        moral: '**CONSCIENCE DE L\'ABUS D\'AUTORITÉ**',
      },
    ],
  },
  {
    id: 'f07-armes',
    fascicule: 'F07' as const,
    groupTitle: 'Armes et munitions',
    headerClass: 'bg-amber-950/80 text-amber-100',
    rows: [
      {
        infraction:
          '**L\'acquisition, la détention ou la cession d\'armes de catégorie A ou B sans autorisation**',
        legal: 'Art. L. 317-1 C.I.',
        materiel:
          '**MATÉRIELS CAT. A OU B** / **ACQUÉRIR, DÉTENIR OU CÉDER** / **SANS AUTORISATION OU DÉROGATION**',
        moral: '**CONSCIENCE DE DÉTENIR OU TRANSFÉRER SANS DROIT**',
      },
      {
        infraction: '**Le port ou le transport sans autorisation d\'armes de catégorie A ou B**',
        legal: 'Art. L. 317-8 C.I.',
        materiel: '**ARMES OU MUNITIONS CAT. A OU B** / **PORT OU TRANSPORT** / **SANS AUTORISATION**',
        moral: '**CONSCIENCE DE PORTER OU TRANSPORTER SANS DROIT**',
      },
      {
        infraction: '**Le port ou le transport sans motif légitime d\'armes de catégorie C ou D**',
        legal: 'Art. L. 317-9 C.I.',
        materiel: '**ARMES CAT. C OU D** / **PORT OU TRANSPORT** / **ABSENCE DE MOTIF LÉGITIME**',
        moral: '**CONSCIENCE D\'AGIR SANS MOTIF LÉGITIME**',
      },
    ],
  },
];
