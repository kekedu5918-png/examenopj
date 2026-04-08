/** Tableau récapitulatif thématique F03 à F07 — repères « I – Élément légal » alignés sur les fascicules SDCP (version au 01/12/2025). */

export const recapSectionsF03F07 = [
  {
    id: 'f03-circulation',
    fascicule: 'F03' as const,
    groupTitle: 'Les infractions à la circulation routière',
    headerClass: 'bg-sky-950/80 text-sky-100',
    rows: [
      {
        infraction: '**La conduite sous l’empire d’un état alcoolique**',
        legal: 'Art. L. 234-1 / I et V du C.R.',
        materiel:
          '**UN CONDUCTEUR DE VÉHICULE OU UN ACCOMPAGNATEUR D’ÉLÈVE CONDUCTEUR** (véhicules y compris cycles et traction animale) / **CONDUITE OU ACCOMPAGNEMENT SUR VOIE OUVERTE À LA CIRCULATION PUBLIQUE** / **ÉTAT ALCOOLIQUE : TAUX DÉLICTUEL ≥ 0,80 G/L SANG OU ≥ 0,40 MG/L AIR EXPIRÉ** / **TAUX CONTRAVENTIONNEL (AUTRES CAS) : ≥ 0,50 G/L OU 0,25 MG/L** ; **SEUILS BAS POUR TC, PERMIS PROBATOIRE, APPRENTISSAGE**',
        moral:
          '**VOLONTÉ DE CONDUIRE EN AYANT CONSOMMÉ DE L’ALCOOL** — infraction intentionnelle (*Cass. crim.* 19/12/1994) / Repères : immunité diplomatique applicable ; parlementaires (dépistage possible en flagrant délit).',
        priorite: 'core' as const,
      },
      {
        infraction: '**La conduite en état d’ivresse manifeste**',
        legal: 'Art. L. 234-1 / II et V du C.R.',
        materiel:
          '**CONDUCTEUR OU ACCOMPAGNATEUR** / **ÉTAT D’IVRESSE MANIFESTE** : signes extérieurs perceptibles (élocution, équilibre, coordination, agressivité, etc.) / **PAS DE SEUIL CHIFFRÉ OBLIGATOIRE**',
        moral: '**CONSCIENCE D’ÊTRE EN ÉTAT D’IVRESSE AU MOMENT DE CONDUIRE**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**La conduite après usage de stupéfiants**',
        legal: 'Art. L. 235-1 / I du C.R.',
        materiel:
          '**CONDUCTEUR OU ACCOMPAGNATEUR D’ÉLÈVE CONDUCTEUR** / **USAGE DE SUBSTANCES OU PLANTES CLASSÉES COMME STUPÉFIANTS** établi par **ANALYSE SANGUINE OU SALIVAIRE**',
        moral: '**VOLONTÉ DE CONDUIRE EN AYANT FAIT USAGE DE STUPÉFIANTS**',
        priorite: 'core' as const,
      },
      {
        infraction: '**Le délit de fuite**',
        legal: 'Art. 434-10 C.P. et L. 231-1 C.R.',
        materiel:
          '**CONDUCTEUR DE VÉHICULE OU ENGIN** (terrestre, fluvial ou maritime) / **ACCIDENT** : dommage matériel ou corporel / **ABSENCE D’ARRÊT** et **TENTATIVE D’ÉCHAPPER** à la responsabilité pénale ou civile',
        moral:
          '**CONNAISSANCE D’AVOIR CAUSÉ OU OCCASIONNÉ UN ACCIDENT** / **VOLONTÉ D’ÉCHAPPER À LA RESPONSABILITÉ**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**L’homicide routier**',
        legal: 'Art. 221-18 C.P. (loi n° 2025-622 du 09/07/2025)',
        materiel:
          '**CONDUCTEUR DE VTM** / **CIRCONSTANCE DE « VIOLENCE ROUTIÈRE »** (alcool, stupéfiants, excès de vitesse ≥ 30 km/h, défaut de permis, fuite, téléphone au volant, refus d’obtempérer, écran, etc.) / **MORT SANS INTENTION DE LA DONNER** / **CAUSALITÉ**',
        moral: '**ABSENCE D’INTENTION HOMICIDE** / **FAUTE QUALIFIÉE ET COMPORTEMENT DANGEREUX**',
        priorite: 'core' as const,
      },
      {
        infraction: '**Le refus d’obtempérer**',
        legal: 'Art. L. 233-1 / I C.R. (simple) / Art. L. 233-1-1 C.R. (mise en danger — aggravé)',
        materiel:
          '**CONDUCTEUR** / **SOMMATION DE S’ARRÊTER** par agent **HABILITÉ**, **INSIGNES APPARENTS** / **REFUS : NE PAS S’ARRÊTER**',
        moral: '**CONSCIENCE DE LA SOMMATION** / **VOLONTÉ DE NE PAS OBTEMPÉRER**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**Le refus de se soumettre aux vérifications (alcool / stupéfiants)**',
        legal: 'Art. L. 234-8 C.R. (alcool) / Art. L. 235-3 C.R. (stupéfiants)',
        materiel:
          '**CONDUCTEUR OU ACCOMPAGNATEUR** / **REFUS DES VÉRIFICATIONS** (éthylomètre, prise de sang ; analyses sanguines ou salivaires pour stupéfiants)',
        moral: '**VOLONTÉ DÉLIBÉRÉE DE REFUSER LES VÉRIFICATIONS**',
      },
      {
        infraction: '**Le défaut de permis de conduire**',
        legal: 'Art. L.221-2 C.R.',
        materiel:
          '**CONDUIRE UN VÉHICULE** **SANS PERMIS ADAPTÉ** À LA CATÉGORIE / **OU** permis **ANNULÉ, INVALIDÉ, SUSPENDU OU RETENU**',
        moral: '**VOLONTÉ DE CONDUIRE EN SACHANT NE PAS ÊTRE LÉGITIMEMENT TITULAIRE**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**Le défaut d’assurance**',
        legal: 'Art. L. 324-2 / I C.R.',
        materiel:
          '**MISE EN CIRCULATION** d’un **VÉHICULE TERRESTRE À MOTEUR** ou **REMORQUE** / **ABSENCE DE GARANTIE RC** obligatoire',
        moral: '**CONSCIENCE DE NE PAS ÊTRE ASSURÉ**',
        priorite: 'secours' as const,
      },
      {
        infraction: '**Les délits relatifs aux plaques et inscriptions**',
        legal: 'Art. L. 317-2 / I, L. 317-3 / I, L. 317-4 / I et L. 317-4-1 / I C.R.',
        materiel:
          '**USAGE D’UNE PLAQUE OU INSCRIPTION PORTANT DES INFORMATIONS FAUSSES OU SUPPOSÉES** (*L. 317-2 / I*) / **FAIRE CIRCULER SANS PLAQUES OU INSCRIPTIONS EXIGÉES** et **DÉCLARER** un numéro, nom ou domicile autre (*L. 317-3 / I*) / **PLAQUE OU INSCRIPTION NE CORRESPONDANT PAS** à la qualité du véhicule ou de l’utilisateur (*L. 317-4 / I*) / **PLAQUE PORTANT UN NUMÉRO ATTRIBUÉ À UN AUTRE VÉHICULE** dans des circonstances pouvant déterminer des poursuites contre un tiers (*L. 317-4-1 / I*)',
        moral: '**VOLONTÉ D’UTILISER OU DE FAIRE CIRCULER AVEC DES PLAQUES NON CONFORMES**',
      },
      {
        infraction: '**Le grand excès de vitesse**',
        legal: 'Art. L. 413-1 / I C.R.',
        materiel:
          '**CONDUCTEUR** / **DÉPASSEMENT ≥ 50 KM/H** par rapport à la vitesse maximale autorisée / **(CONTRAVENTION 5e CLASSE EN RÉCIDIVE → QUALIFICATION DÉLICTUELLE)**',
        moral: '**VOLONTÉ DE DÉPASSER LA VITESSE AUTORISÉE**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**Le rodéo motorisé**',
        legal: 'Art. L. 236-1 C.R.',
        materiel:
          '**VÉHICULE TERRESTRE À MOTEUR** / **CONDUITE RÉPÉTANT INTENTIONNELLEMENT DES MANŒUVRES** violent des obligations de prudence ou sécurité / **CONDITIONS** compromettant la **SÉCURITÉ DES USAGERS** ou troublant la **TRANQUILLITÉ PUBLIQUE**',
        moral: '**VOLONTÉ D’ADOPTER UNE CONDUITE DANGEREUSE RÉPÉTÉE ET INTENTIONNELLE**',
      },
      {
        infraction: '**L’incitation, l’organisation et la promotion de rodéos motorisés**',
        legal: 'Art. L. 236-2 C.R.',
        materiel:
          '**INCITER, ORGANISER OU PROMOUVOIR** la commission d’un rodéo motorisé / **PAR TOUT MOYEN** (réseaux sociaux, appels, etc.)',
        moral: '**VOLONTÉ D’INCITER, D’ORGANISER OU DE PROMOUVOIR**',
        priorite: 'secours' as const,
      },
    ],
  },
  {
    id: 'f04-etat',
    fascicule: 'F04' as const,
    groupTitle: 'Crimes et délits contre la Nation, l’État et la paix publique',
    headerClass: 'bg-indigo-950/80 text-indigo-100',
    rows: [
      {
        infraction: '**Les discriminations commises par une personne exerçant une fonction publique**',
        legal: 'Art. 432-7 C.P. (prévoit et réprime)',
        materiel:
          '**DISCRIMINATION** au sens des **225-1 et 225-1-1 C.P.** / **DÉPOSITAIRE DE L’AUTORITÉ PUBLIQUE** ou **MISSION DE SERVICE PUBLIC** / **DANS L’EXERCICE OU À L’OCCASION DES FONCTIONS** / **REFUS D’UN DROIT** ou **ENTRAVE À UNE ACTIVITÉ ÉCONOMIQUE**',
        moral: '**CONSCIENCE DE COMMETTRE UN ACTE DISCRIMINATOIRE** / **CONNAISSANCE DU MOTIF DISCRIMINATOIRE**',
      },
      {
        infraction: '**Les atteintes à l’inviolabilité du domicile (par une personne publique)**',
        legal: 'Art. 432-8 C.P. (prévoit et réprime)',
        materiel:
          '**INTRODUCTION OU TENTATIVE** dans le **DOMICILE D’AUTRUI** / **CONTRE LE GRÉ DE L’OCCUPANT** / **PAR DÉPOSITAIRE DE L’AUTORITÉ PUBLIQUE** / **HORS CAS LÉGAUX**',
        moral: '**CONSCIENCE D’AGIR HORS DES CAS PRÉVUS PAR LA LOI**',
      },
      {
        infraction: '**Les atteintes au secret des correspondances (par une personne publique)**',
        legal: 'Art. 432-9 C.P. (prévoit et réprime)',
        materiel:
          '**ORDONNER, COMMETTRE OU FACILITER**, hors cas légaux, détournement, suppression, ouverture de **CORRESPONDANCES** ou **RÉVÉLATION DU CONTENU** de correspondances / **OU**, pour agent de réseau ou fournisseur de télécommunications : **INTERCEPTION**, **DÉTOURNEMENT** des correspondances **ÉLECTRONIQUES**, **UTILISATION OU DIVULGATION** de leur contenu / **AUTORITÉ PUBLIQUE** ou **MISSION DE SERVICE PUBLIC** (selon cas)',
        moral: '**CONSCIENCE D’AGIR HORS DES CAS PRÉVUS PAR LA LOI**',
      },
      {
        infraction: '**La concussion**',
        legal: 'Art. 432-10 C.P. (prévoit et réprime)',
        materiel:
          '**RECEVOIR, EXIGER OU ORDONNER** une somme **NON DUE** ou **EXCÉDANT** ce qui est dû / **AU TITRE DE DROITS, CONTRIBUTIONS, IMPÔTS OU TAXES** / **AUTORITÉ PUBLIQUE** ou **MISSION DE SP**',
        moral: '**CONSCIENCE DE PERCEVOIR OU ORDONNER DES SOMMES INDUES**',
      },
      {
        infraction: '**La corruption passive**',
        legal: 'Art. 432-11 al. 1 et 2 C.P. (prévoit et réprime)',
        materiel:
          '**SOLLICITER OU AGRÉER SANS DROIT** offres, promesses, dons, avantages / **AUTORITÉ PUBLIQUE** ou **MISSION DE SP** / **POUR ACCOMPLIR OU S’ABSTENIR** d’un **ACTE DE SA FONCTION**',
        moral:
          '**CONSCIENCE D’AGIR EN VIOLATION DU DEVOIR DE PROBITÉ** / **VOLONTÉ D’OBTENIR UN AVANTAGE EN CONTREPARTIE D’ACTES DE FONCTION OU D’ABSTENTION**',
      },
      {
        infraction: '**Le trafic d’influence passif (personne publique, mission de SP ou mandat électif)**',
        legal: 'Art. 432-11 al. 1 et 3 C.P. (définit et réprime)',
        materiel:
          '**SOLLICITER OU AGRÉER SANS DROIT** des offres, promesses, dons, présents ou avantages / **POUR ABUSER OU AVOIR ABUSÉ** de son **INFLUENCE RÉELLE OU SUPPOSÉE** / **EN VUE D’OBTENIR** distinctions, emplois, marchés ou **Toute AUTRE DÉCISION FAVORABLE** d’une autorité ou administration',
        moral: '**CONSCIENCE D’ABUSER DE SON INFLUENCE** / **VOLONTÉ D’OBTENIR UN AVANTAGE**',
      },
      {
        infraction: '**Le trafic d’influence actif (corrupteur d’influence — particulier)**',
        legal: 'Art. 433-2 C.P.',
        materiel:
          '**PROPOSER SANS DROIT**, directement ou indirectement, des offres, promesses, dons, présents ou avantages **À PERSONNE DÉPOSITAIRE DE L’AUTORITÉ PUBLIQUE, CHARGÉE D’UNE MISSION DE SP OU INVESTIE D’UN MANDAT ÉLECTIF** / **POUR QU’ELLE ABUSE OU QU’ELLE AIT ABUSÉ** de son influence réelle ou supposée',
        moral: '**CONSCIENCE DE CORROMPRE L’INFLUENCE**',
        priorite: 'secours' as const,
      },
      {
        infraction: '**L’outrage**',
        legal: 'Art. 433-5 C.P. (prévoit et réprime)',
        materiel:
          '**PAROLES, GESTES, MENACES, ÉCRITS OU IMAGES NON PUBLICS**, ou envoi d’objets / **À PERSONNE CHARGÉE D’UNE MISSION DE SP** (exercice ou occasion) / **ATTEINTE À LA DIGNITÉ** ou au **RESPECT DÛ À LA FONCTION**',
        moral: '**VOLONTÉ DE PORTER ATTEINTE À LA DIGNITÉ OU AU RESPECT DÛ À LA FONCTION** / **CONNAISSANCE DE LA QUALITÉ DE LA VICTIME**',
      },
      {
        infraction: '**La rébellion**',
        legal: 'Art. 433-6 C.P. (définition) / Art. 433-7 C.P. (répression)',
        materiel:
          '**RÉSISTANCE PAR VIOLENCE OU VOIE DE FAIT** / **À AUTORITÉ PUBLIQUE OU MISSION DE SP** / **AGISSANT POUR L’EXÉCUTION DES LOIS, ORDRES, DÉCISIONS DE JUSTICE**',
        moral: '**VOLONTÉ DE RÉSISTER** / **CONNAISSANCE DE LA QUALITÉ DE LA PERSONNE**',
      },
      {
        infraction: '**L’usurpation de titres ou qualités (personne chargée de service public)**',
        legal: 'Art. 433-17 C.P.',
        materiel:
          '**USURPER UN TITRE, UNE QUALITÉ OU UNE ATTRIBUTION** permettant de présenter comme personne **INVESTIE D’UNE FONCTION PUBLIQUE** / **USAGE PUBLIC DE CE TITRE OU DE SIGNES DISTINCTIFS** (selon cas)',
        moral: '**VOLONTÉ D’USURPER LA FONCTION OU LE SIGNE DISTINCTIF** / **CONSCIENCE DE LA TROMPERIE SUR SA QUALITÉ**',
        priorite: 'freq' as const,
        noteExamen:
          'Très classique en sujet mêlant contrôle d’identité, interpellation ou barrière de sécurité. Non développé dans l’extrait F04 fourni — vérifier le programme officiel.',
      },
      {
        infraction: '**La non-dénonciation de crime**',
        legal: 'Art. 434-1 C.P. (prévoit et réprime)',
        materiel:
          '**CONNAISSANCE D’UN CRIME** encore **PRÉVENABLE** ou dont les auteurs peuvent **RECIDIVER** / **ABSENCE D’INFORMATION** aux autorités judiciaires ou administratives',
        moral: '**CONSCIENCE DE L’EXISTENCE DU CRIME** / **VOLONTÉ DE NE PAS INFORMER**',
      },
      {
        infraction: '**Le témoignage mensonger**',
        legal: 'Art. 434-13 C.P. (définit et réprime)',
        materiel:
          '**DÉPOSITION MENSONGÈRE SOUS SERMENT** / **DEVANT JURIDICTION** ou **OPJ EN COMMISSION ROGATOIRE**',
        moral: '**CONSCIENCE DE LA FAUSSETÉ** / **VOLONTÉ DE TROMPER LA JUSTICE**',
      },
      {
        infraction: '**Le faux et l’usage de faux**',
        legal: 'Art. 441-1 C.P. (définit et réprime)',
        materiel:
          '**ALTÉRATION FRAUDULEUSE DE LA VÉRITÉ** dans un écrit ou support d’expression de la pensée / **DE NATURE À CAUSER UN PRÉJUDICE** / **MOYENS LÉGAUX** : contrefaçon, falsification, suppression, addition, etc.',
        moral: '**CONSCIENCE DE L’ALTÉRATION** / **INTENTION FRAUDULEUSE (TROMPER)**',
      },
      {
        infraction: '**Le faux dans un document administratif**',
        legal: 'Art. 441-2 C.P. — faux et usage (définit et réprime)',
        materiel:
          '**CONTREFAÇON OU FALSIFICATION** d’un **DOCUMENT DÉLIVRÉ PAR UNE ADMINISTRATION** établi pour constater **DROIT, IDENTITÉ, QUALITÉ** ou **AUTORISATION**',
        moral: '**CONSCIENCE DE FALSIFIER UN DOCUMENT ADMINISTRATIF** / **INTENTION FRAUDULEUSE**',
      },
      {
        infraction: '**Le faux dans une écriture publique ou authentique**',
        legal: 'Art. 441-4 C.P. (définit et réprime)',
        materiel: '**FAUX** dans une **ÉCRITURE PUBLIQUE OU AUTHENTIQUE** ou enregistrement ordonné par l’autorité publique',
        moral: '**INTENTION FRAUDULEUSE**',
      },
      {
        infraction: '**Les faux certificats ou attestations**',
        legal: 'Art. 441-7 C.P. — établissement et usage (définit et réprime)',
        materiel:
          '**ATTESTATION OU CERTIFICAT** sur des **FAITS MATÉRIELLEMENT INEXACTS** / **FALSIFICATION** d’un certificat sincère / **USAGE** de certificat inexact ou falsifié',
        moral: '**CONSCIENCE DE L’INEXACTITUDE**',
      },
      {
        infraction: '**L’association de malfaiteurs**',
        legal: 'Art. 450-1 C.P. (définit et réprime — infraction formelle)',
        materiel:
          '**GROUPEMENT OU ENTENTE** / **EN VUE DE LA PRÉPARATION** d’**INFRACTIONS PUNIES D’AU MOINS 5 ANS** / **FAITS MATÉRIELS** caractérisant la participation (réunions, échanges, moyens…) / **AU MOINS 2 PERSONNES**',
        moral: '**PARTICIPATION SCIEMMENT VOLONTAIRE** / **CONNAISSANCE DU BUT**',
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
        infraction: '**L’usage illicite de stupéfiants**',
        legal: 'Art. L. 3421-1 al. 1 C.S.P. (définit et réprime)',
        materiel:
          '**USAGE** (consommation / absorption) d’une **SUBSTANCE OU PLANTE CLASSÉE STUPÉFIANT** au sens de l’**art. L. 5132-7 C.S.P.** / **Peut inclure** acquisition, détention ou transport lorsque **DESTINÉS À L’USAGE EXCLUSIF** de la personne (appréciation au cas par cas)',
        moral: '**USAGE INTENTIONNEL EN CONNAISSANCE DE CAUSE**',
        priorite: 'freq' as const,
      },
      {
        infraction:
          '**La provocation d’un majeur à l’usage ou au trafic de stupéfiants (ou présentation sous un jour favorable)**',
        legal: 'Art. L. 3421-4 al. 1 et 2 C.S.P. (définit et réprime)',
        materiel:
          '**ACTE DE PROVOCATION OU DE PUBLICITÉ** : provocation (directe ou indirecte) encourageant ou incitant l’usage ou le trafic — **même non suivie d’effet** — à l’infraction d’**usage *L. 3421-1*** ou aux infractions **222-34 à 222-39 C.P.** / **OU** **présentation sous un jour favorable** de ces infractions / **OU** provocation à l’usage de substances **présentées comme** ayant les effets de stupéfiants (*al.2*)',
        moral:
          '**PROVOQUER OU PRÉSENTER EN CONNAISSANCE DE CAUSE** — *alinéa 1* ; *al.2* : provocation en connaissance de cause à l’usage de substances **présentées comme** stupéfiants',
        priorite: 'secours' as const,
      },
      {
        infraction: '**La direction ou l’organisation d’un trafic de stupéfiants**',
        legal: 'Art. 222-34 al. 1 C.P. (définit et réprime)',
        materiel:
          '**DIRIGER OU ORGANISER** un **GROUPEMENT** (ensemble structuré de personnes, pas seulement biens réunis par un seul individu) ayant pour objet la **production, fabrication, importation, exportation, transport, détention, offre, cession, acquisition ou emploi ILLICITES** de stupéfiants / **≠ association de malfaiteurs** : 222-34 suppose le **trafic effectivement commis**, l’association peut exister **avant** la réalisation du trafic',
        moral: '**DIRIGER OU ORGANISER EN CONNAISSANCE DE CAUSE** un groupement ayant pour objet le trafic',
      },
      {
        infraction: '**La production ou la fabrication illicites de stupéfiants**',
        legal: 'Art. 222-35 al. 1 C.P. (réprime)',
        materiel: '**PRODUCTION OU FABRICATION** de stupéfiants **SANS AUTORISATION**',
        moral: '**CONSCIENCE DE PRODUIRE OU FABRIQUER ILLICITEMENT**',
        priorite: 'freq' as const,
      },
      {
        infraction: '**L’importation ou l’exportation illicites de stupéfiants**',
        legal: 'Art. 222-36 al. 1 C.P. (réprime)',
        materiel:
          '**IMPORTATION OU EXPORTATION ILLICITES** : **importation** : pénétration ou tentative sur le territoire national **en possession** de stupéfiants (y compris destination étrangère alléguée) ; **exportation** : hypothèses plus rares / **Stupéfiants** au sens **222-41 C.P.** (listes **L. 5132-7 C.S.P.**) — désignation précise de la substance',
        moral: '**IMPORTER OU EXPORTER EN CONNAISSANCE DE CAUSE** des stupéfiants sans droit',
        priorite: 'freq' as const,
      },
      {
        infraction:
          '**Le transport, la détention, l’offre, la cession, l’acquisition ou l’emploi illicites de stupéfiants**',
        legal: 'Art. 222-37 al. 1 C.P. (réprime)',
        materiel:
          '**TRANSPORT** : transporter sans autorisation (*ex.* porteur sur la voie publique — peut cumuler **transport et détention**, *Cass. crim.*) / **DÉTENTION** : possession de stupéfiants (y compris à proximité, *cache sous matelas d’un codétenu* si lien de droit établi) ; **détention illicite** seulement si **inscrite dans un trafic** ou **222-39** / **OFFRE, CESSION, ACQUISITION, EMPLOI** illicites — **trafic entre plusieurs personnes** ; **cession à personne déterminée pour sa conso perso.** → **222-39**',
        moral: '**CONSCIENCE D’AGIR DANS LE TRAFIC** ou sans droit selon l’acte',
        priorite: 'core' as const,
      },
      {
        infraction: '**La facilitation de l’usage illicite de stupéfiants**',
        legal: 'Art. 222-37 al. 2 C.P. (définit et réprime)',
        materiel:
          '**FACILITER PAR QUELQUE MOYEN QUE CE SOIT** l’usage illicite / **OU** **SE FAIRE DÉLIVRER** des stupéfiants au moyen d’**ORDONNANCES FICTIVES OU DE COMPLAISANCE** / **OU** **DÉLIVRER** des stupéfiants sur de telles ordonnances **EN CONNAISSANT** leur caractère fictif ou complaisant',
        moral: '**FACILITER EN CONNAISSANCE DE CAUSE** l’usage illicite (ou dol équivalent selon hypothèse)',
        priorite: 'freq' as const,
      },
      {
        infraction: '**La cession ou l’offre illicite de stupéfiants en vue d’une consommation personnelle**',
        legal: 'Art. 222-39 al. 1 C.P. (définit et réprime)',
        materiel:
          '**OFFRE OU CESSION** de stupéfiants **À UNE PERSONNE DÉTERMINÉE** en vue de sa **CONSOMMATION PERSONNELLE** (« petits trafics » — *offrir à un mineur pour sa conso* peut poser **222-39 *al.2*** aggravé).',
        moral: '**CONSCIENCE DE CÉDER OU D’OFFRIR DANS CE CADRE**',
      },
      {
        infraction: '**Le blanchiment du produit du trafic de stupéfiants**',
        legal: 'Art. 222-38 al. 1 C.P. (définit et réprime)',
        materiel:
          '**FAUSSE JUSTIFICATION DE L’ORIGINE** du bien provenant du trafic **OU** **concours au placement, à la dissimulation ou à la conversion** du produit du trafic',
        moral: '**CONSCIENCE QUE LE BIEN PROVIENT DU TRAFIC**',
        priorite: 'secours' as const,
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
        infraction: '**L’abandon de famille**',
        legal: 'Art. 227-3 C.P. (définit et réprime)',
        materiel:
          '**INEXÉCUTION** d’une **DÉCISION JUDICIAIRE** ou **TITRE EXÉCUTOIRE** (373-2-2, 229-1 C.civ., etc.) imposant pension, contribution, subsides ou prestations / **> DEUX MOIS** sans acquitter **INTÉGRALEMENT** / **BÉNÉFICIAIRE** : enfant mineur, ascendant, descendant ou conjoint',
        moral: '**VOLONTÉ DE NE PAS EXÉCUTER** (non involontaire si précarité non imputable)',
      },
      {
        infraction:
          '**Le non-respect d’une ordonnance de protection du juge aux affaires familiales (violences)**',
        legal: 'Art. 227-4-2 C.P. (définit et réprime)',
        materiel:
          '**VIOLATION D’OBLIGATIONS OU D’INTERDICTIONS** fixées par **ORDONNANCE DE PROTECTION** (*art. 515-9 et s. C.civ.*) / **NOTIFIÉE** ou exécutée volontairement',
        moral: '**CONSCIENCE DE NE PAS RESPECTER L’ORDONNANCE**',
      },
      {
        infraction: '**Le défaut de notification de changement de domicile au créancier d’une pension (ordonnance de protection)**',
        legal: 'Art. 227-4-3 C.P. (définit et réprime)',
        materiel:
          '**INSCRIPTION DU CRÉANCIER** sur ordonnance *515-13-1 C.civ.* / **CHANGEMENT DE DOMICILE** sans **NOTIFICATION** alors qu’elle est **IMPOSÉE**',
        moral: '**VOLONTÉ DE NE PAS NOTIFIER**',
      },
      {
        infraction: '**La non-représentation d’enfant mineur**',
        legal: 'Art. 227-5 C.P. (définit et réprime)',
        materiel:
          '**DÉTENTION LÉGALE** de l’enfant mineur / **REFUS DE LE PRÉSENTER** à la personne ayant **DROIT DE VISION** ou garde judiciaire non exclusif',
        moral: '**VOLONTÉ DE PRIVIER L’AUTRE PARENT OU TITULAIRE DU DROIT**',
      },
      {
        infraction: '**Le défaut de notification de transfert de domicile d’enfant**',
        legal: 'Art. 227-6 C.P. (définit et réprime)',
        materiel:
          '**CONVENTION OU DÉCISION** prévoyant droit de visite / **TRANSFERT RÉEL DE RÉSIDENCE** de l’enfant **SANS INFORMATION** du titulaire du droit dans les délais et formes requises',
        moral: '**VOLONTÉ DE SOUSTRAIRE L’INFORMATION**',
      },
      {
        infraction: '**La soustraction d’enfant mineur par ascendant**',
        legal: 'Art. 227-7 C.P. (définit et réprime)',
        materiel:
          '**ASCENDANT** (ou assimilé) / **SOUSTRACTION À L’EXERCICE DE L’AUTORITÉ PARENTALE, DROIT DE GARDE OU DROIT DE VISION LÉGITIME**',
        moral: '**VOLONTÉ DE SOUSTRAIRE**',
      },
      {
        infraction: '**La soustraction d’enfant mineur sans violence ni fraude (non-ascendant)**',
        legal: 'Art. 227-8 C.P. (définit et réprime)',
        materiel:
          '**AUTEUR AUTRE QU’ASCENDANT** / **SOUSTRACTION SANS FRAUDE NI VIOLENCE** à l’égard de l’enfant / **à l’égard du titulaire de l’autorité parentale ou du droit de garde**',
        moral: '**VOLONTÉ DE SOUSTRAIRE**',
      },
      {
        infraction: '**La privation d’aliments ou de soins à mineur de quinze ans (mise en péril)**',
        legal: 'Art. 227-15 C.P. (définit et réprime)',
        materiel:
          '**MINEUR DE 15 ANS** / **PRIVATION D’ALIMENTS OU DE SOINS** indispensable / **PAR PERSONNE AYANT L’OBLIGATION OU MINEUR CAPABLE** (trois hypothèses du texte)',
        moral: '**VOLONTÉ OU DOL** (*dol général ou intention homicide suivant cas*)',
      },
      {
        infraction: '**La soustraction d’un parent à ses obligations légales (délaissement)**',
        legal: 'Art. 227-17 C.P. (définit et réprime)',
        materiel:
          '**PÈRE OU MÈRE** / **ENFANT DE MOINS DE 15 ANS** dont ils ont **L’AUTORITÉ PARENTALE OU LA GARDE** / **DÉLAISSER** cet enfant **EN FRAUDE AUX OBLIGATIONS LÉGALES** à son égard',
        moral: '**VOLONTÉ DE SE SOUSTRAIRE À SES OBLIGATIONS**',
      },
      {
        infraction: '**La provocation directe d’un mineur à l’usage illicite de stupéfiants**',
        legal: 'Art. 227-18 al. 1 C.P. (définit et réprime)',
        materiel:
          '**PROVOCATION DIRECTE** : agissements encourageant ou incitant l’**usage** illicite — **relation précise et incontestable** et **lien étroit** entre provocation et faits (*Cass. crim.*) / **s’adresser à un mineur identifié** / **Se distingue de *L. 3421-4 C.S.P.*** (apologie ou propagande sans incitation directe vers un mineur déterminé)',
        moral: '**CONSCIENCE D’INCITER UN MINEUR** à l’usage illicite',
        priorite: 'freq' as const,
      },
      {
        infraction: '**La provocation directe d’un mineur au trafic de stupéfiants**',
        legal: 'Art. 227-18-1 al. 1 C.P. (définit et réprime)',
        materiel:
          '**PROVOCATION DIRECTE** du mineur à **transporter, détenir, offrir ou céder** des stupéfiants **ou** à se rendre **complice** — vise les **infractions de trafic** (transport, détention, offre, cession illicites, etc.)',
        moral: '**CONSCIENCE D’INCITER UN MINEUR** au trafic',
        priorite: 'freq' as const,
      },
      {
        infraction: '**La provocation directe d’un mineur à la consommation excessive d’alcool**',
        legal: 'Art. 227-19 C.P. (prévoit et réprime)',
        materiel:
          '**PROVOCATION DIRECTE** à la consommation **EXCESSIVE OU HABITUELLE** de boissons alcooliques / **MINEUR**',
        moral: '**CONSCIENCE DE PROVOQUER LE MINEUR**',
      },
      {
        infraction: '**La provocation directe d’un mineur à commettre un crime ou un délit**',
        legal: 'Art. 227-21 al. 1 C.P. (prévoit et réprime)',
        materiel:
          '**PROVOCATION DIRECTE** / **CRIME OU DÉLIT** (hors cas spécialement réprimés)',
        moral: '**VOLONTÉ D’INCITER**',
      },
      {
        infraction: '**La corruption de mineur**',
        legal: 'Art. 227-22 al. 1 et 2 C.P. (prévoit et réprime)',
        materiel:
          '**AIDER, INCITER OU FACILITER** la **CORRUPTION** d’un mineur / être **PRÉSENT** à réunion ou spectacle où mineurs **ONT DES RAPPORTS SEXUELS** / **À TITRE ONÉREUX OU GRATUIT**',
        moral: '**CONSCIENCE DE FAVORISER LA CORRUPTION**',
      },
      {
        infraction: '**Les propositions sexuelles à un mineur de quinze ans par moyen électronique**',
        legal: 'Art. 227-22-1 C.P. (prévoit et réprime)',
        materiel:
          '**MAJEUR** / **MINEUR DE 15 ANS** / **MOYEN DE COMMUNICATION ÉLECTRONIQUE** / **PROPOSITION DE RENCONTRE AYANT POUR OBJECTIF OU SACHANT QU’ELLE POURRAIT AVOIR POUR EFFET UNE ATTAINTE SEXUELLE**',
        moral: '**CONSCIENCE DU CONTEXTE**',
      },
      {
        infraction: '**La captation, la détention ou la diffusion d’images à caractère pornographique de mineurs**',
        legal: 'Art. 227-23 C.P. — plusieurs figures (à l’al. 1 notamment : prévoit et réprime la captation en vue de diffusion)',
        materiel:
          '**FIXER, ENREGISTRER, TRANSMETTRE, DIFFUSER, OFFRIR, DÉTENIR** des **IMAGES À CARACTÈRE PORNOGRAPHIQUE** impliquant un **MINEUR OU PERSONNE AYANT L’APPARENCE D’UN MINEUR** (selon al.)',
        moral: '**CONSCIENCE DU CARACTÈRE PORNOGRAPHIQUE ET DE LA MINORITÉ (OU APPARENCE)**',
      },
      {
        infraction:
          '**La diffusion d’un message à caractère violent, terroriste, pornographique ou dangereux susceptible d’être vu par un mineur**',
        legal: 'Art. 227-24 al. 1 C.P. (prévoit et réprime)',
        materiel:
          '**DIFFUSION** (selon modalités du texte) d’un **MESSAGE** violent, incitant au terrorisme, pornographique ou dangereux / **SUSCEPTIBLE D’ÊTRE VU OU PERÇU PAR UN MINEUR**',
        moral: '**CONSCIENCE DE LA DIFFUSION ET DU CONTENU**',
      },
      {
        infraction: '**La provocation à la pédopornographie**',
        legal: 'Art. 227-28-3 C.P. (prévoit et réprime)',
        materiel:
          '**PROVOCATION** d’un second **À COMMETTRE** les faits du **227-23** / **PAR ORDRE, DON D’INSTRUCTIONS, DON OU OFFRE DE MOYENS**',
        moral: '**VOLONTÉ DE PROVOQUER LA COMMISSION**',
      },
      {
        infraction: '**Les atteintes sexuelles sur mineur de quinze ans par un majeur**',
        legal: 'Art. 227-25 C.P.',
        materiel:
          '**MAJEUR ET MINEUR DE 15 ANS** / **ATTEINTE SEXUELLE** sans violence, contrainte, menace ou surprise (*hors agressions plus graves spécialisées*)',
        moral: '**CONSCIENCE DU CARACTÈRE SEXUEL ET DE LA MINORITÉ**',
      },
      {
        infraction:
          '**Les atteintes sexuelles sur mineur de plus de quinze ans avec abus d’autorité**',
        legal: 'Art. 227-27 C.P. (prévoit et réprime)',
        materiel:
          '**MAJEUR** et **MINEUR DE 15 À 18 ANS** / **ASCENDANT, PERSONNE AYANT AUTORITÉ OU CHARGE DE L’ÉDUCER** / **ATTEINTE SEXUELLE SANS VIOLENCE, CONTRAINTE, MENACE OU SURPRISE** (*hors viol et assimilés*)',
        moral: '**CONSCIENCE DE L’ABUS D’AUTORITÉ OU DE LA RELATION**',
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
          '**L’acquisition, la détention ou la cession de matériels de guerre, armes, éléments d’arme ou munitions des catégories A ou B sans autorisation**',
        legal: 'Art. 222-52 C.P. (réprime — v. al. 1 à 3 selon hypothèses)',
        materiel:
          '**ACQUISITION, DÉTENTION OU CESSION** de **MATÉRIELS DE GUERRE, ARMES, ÉLÉMENTS D’ARME OU MUNITIONS** **A OU B** / **SANS AUTORISATION** prévue (notamment **L. 2332-1 C.DEF.** et **L. 312-1 à L. 312-4**, **L. 312-4-3**, **L. 314-2**, **L. 314-3 C.S.I.**)',
        moral: '**VOLONTÉ DE DÉTENIR OU DE TRANSFÉRER** / **CONSCIENCE DE L’ABSENCE D’AUTORISATION**',
        priorite: 'core' as const,
      },
      {
        infraction: '**Le port ou le transport sans autorisation ou sans motif légitime (catégories A ou B)**',
        legal: 'Art. 222-54 C.P. (prévoit et réprime — v. al. 1 à 3)',
        materiel:
          '**PORT OU TRANSPORT** de matériels de guerre, armes, éléments d’arme ou munitions **A OU B** / **HORS DOMICILE** (sauf dérogations) / **SANS AUTORISATION DE PORT** ou **SANS MOTIF LÉGITIME DE TRANSPORT** selon cas',
        moral: '**VOLONTÉ DE PORTER OU TRANSPORTER** / **CONSCIENCE DE L’ABSENCE DE titre ou de motif**',
        priorite: 'freq' as const,
      },
      {
        infraction:
          '**Le port ou le transport sans motif légitime d’armes, munitions ou éléments des catégories C ou D (hors faible dangerosité non visée)**',
        legal: 'Art. L. 317-8 C.S.I. (prévoit et réprime)',
        materiel:
          '**HORS DOMICILE** / **PORT OU TRANSPORT** d’**ARMES C** ou d’**ARMES D FIGURANT SUR LISTE** (et munitions ou éléments) / **SANS MOTIF LÉGITIME** / **HORS** dérogations résultant notamment des **L. 315-1 et L. 315-2 C.S.I.** et textes d’application (*R. 315-1*, *R. 315-2*, etc.) — NOTA fascicule : **exception** des matériels de **faible dangerosité** figurant sur liste dédiée',
        moral: '**VOLONTÉ DE PORTER OU TRANSPORTER** / **CONSCIENCE DE L’ABSENCE DE MOTIF LÉGITIME**',
        priorite: 'freq' as const,
        noteExamen:
          'L’articulation interne du C.S.I. peut renvoyer aux *2°* et *3°* de *L. 317-8* selon les sous-catégories ; l’élément légal du fascicule F07 est posé à *L. 317-8* pour C et D listés.',
      },
    ],
  },
];
