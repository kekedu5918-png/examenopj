import { FormationExamTrap, FormationKeyJuris, FormationTip } from '@/components/cours/formation/AlphaFormationCallouts';
import {
  FormationChapter,
  FormationH3,
  FormationH4,
  FormationH5,
  FormationOl,
  FormationP,
  FormationQuote,
  FormationTable,
  FormationUl,
} from '@/components/cours/formation/AlphaFormationProse';

/**
 * Fiche programme — Enquête Alpha, 1er thème procédure.
 * Contenu fourni par le responsable éditorial (fascicule / formation).
 */
export function AlphaCadresFlagranceFiche() {
  return (
    <div className='space-y-6 text-left'>
      <div className='rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 to-transparent px-4 py-3 md:px-5'>
        <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/90'>Procédure pénale · Thème 1</p>
        <p className='mt-1 font-display text-lg font-bold text-white md:text-xl'>
          Les cadres juridiques (généralités), l&apos;enquête de flagrant délit
        </p>
      </div>

      {/* —— Cadres juridiques — généralités —— */}
      <div className='rounded-2xl border border-white/[0.08] bg-black/30 p-4 md:p-6'>
        <FormationH3>LES CADRES JURIDIQUES — Généralités</FormationH3>
        <FormationH4>Définition & fondement textuel</FormationH4>
        <FormationP>
          Les actes de police judiciaire (constater les infractions, rassembler les preuves, rechercher les auteurs)
          s&apos;exercent au cours de la phase policière, désignée dans le Code de procédure pénale sous le nom
          d&apos;enquêtes.
        </FormationP>
        <FormationP>
          La procédure au cours des enquêtes est secrète (art. 11 C.P.P.). Ce secret garantit : l&apos;efficacité des
          investigations ; le respect de la présomption d&apos;innocence (art. 9-1 du Code civil).
        </FormationP>

        <FormationH4>Les trois cadres juridiques principaux</FormationH4>
        <FormationP>
          Les articles 14 et 17 du C.P.P. mentionnent trois cadres dans lesquels s&apos;exerce la mission de police
          judiciaire :
        </FormationP>
        <FormationTable
          caption='Les trois cadres'
          headers={['Cadre', 'Fondement', 'Spécificité']}
          rows={[
            ['Enquête de flagrant délit (FD)', 'Art. 53 à 73 C.P.P.', 'Infraction en train de se commettre ou venant de se commettre'],
            ['Enquête préliminaire (EP)', 'Art. 75 à 78 C.P.P.', 'Enquête de droit commun, moins coercitive'],
            ['Commission rogatoire (CR)', 'Art. 81 et 151 à 154-2 C.P.P.', "Délégation d'un juge d'instruction"],
          ]}
        />

        <FormationH4>Les cadres spécifiques</FormationH4>
        <FormationP>
          La loi n° 2004-204 du 9 mars 2004 (dite loi Perben II) a créé des dispositions spécifiques à la délinquance et
          criminalité organisées. Des cadres additionnels existent également pour :
        </FormationP>
        <FormationUl>
          <li>La mort de cause inconnue ou suspecte (art. 74 C.P.P.)</li>
          <li>La découverte d&apos;une personne grièvement blessée (art. 74 al. 6 C.P.P.)</li>
          <li>Les disparitions inquiétantes (art. 74-1 C.P.P.)</li>
          <li>La recherche des personnes en fuite (art. 74-2 C.P.P.)</li>
        </FormationUl>

        <div className='mt-5'>
          <FormationTip>
            <p>
              <strong className='text-sky-100'>À retenir :</strong> Les contrôles d&apos;identité ne constituent pas à
              proprement parler un cadre d&apos;enquête, mais ils concourent à faciliter l&apos;accomplissement des actes
              de la mission de police judiciaire.
            </p>
          </FormationTip>
        </div>
      </div>

      {/* —— Enquête FD — intro —— */}
      <div className='rounded-2xl border border-violet-500/20 bg-violet-950/20 p-4 md:p-6'>
        <FormationH3 className='flex items-center gap-2'>
          <span aria-hidden>🔍</span> L&apos;ENQUÊTE DE FLAGRANT DÉLIT — Cours complet
        </FormationH3>
        <FormationH4>Base textuelle</FormationH4>
        <FormationP>Articles 53 à 73 du C.P.P.</FormationP>
      </div>

      <FormationChapter id='alpha-ch1-flagrance' title='CHAPITRE 1 — La notion de flagrance' badge='Ch. 1' defaultOpen>
        <FormationH4>1.1 La flagrance proprement dite</FormationH4>
        <FormationP>L&apos;article 53 du C.P.P. définit deux cas :</FormationP>
        <FormationH5>1.1.1 — Le crime ou le délit se commettant actuellement</FormationH5>
        <FormationP>
          L&apos;infraction est en train de se commettre au moment où les policiers interviennent. Il y a simultanéité
          entre la commission des faits et l&apos;intervention des agents.
        </FormationP>
        <FormationH5>1.1.2 — Le crime ou le délit venant de se commettre</FormationH5>
        <FormationP>
          Les faits viennent de se produire dans un temps très proche. La jurisprudence exige que l&apos;infraction ait
          un caractère d&apos;actualité (Cass. crim. n°90-87.360 du 26 février 1991). Dans les cas litigieux, l&apos;OPJ
          sollicitera des instructions du parquet.
        </FormationP>
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              La contravention ne peut pas donner lieu à une enquête de flagrant délit. Seuls les crimes et délits
              entrent dans le champ de la flagrance.
            </p>
          </FormationExamTrap>
        </div>

        <FormationH4 className='mt-8'>1.2 La flagrance par présomption</FormationH4>
        <FormationP>Elle regroupe deux situations distinctes attachées à la personne soupçonnée :</FormationP>

        <FormationH5>1.2.1 — La clameur publique</FormationH5>
        <FormationQuote>
          « Dans un temps très voisin de l&apos;action, la personne soupçonnée est poursuivie par la clameur publique »
        </FormationQuote>
        <FormationUl>
          <li>
            La clameur publique n&apos;est pas une rumeur. Elle est constituée d&apos;un cri (accusation : Au voleur ! /
            injonction : Arrêtez-le !) émanant de la victime, d&apos;un témoin ou de plusieurs personnes.
          </li>
          <li>Elle doit se situer dans un temps très voisin de l&apos;action — court, suite et prolongement de l&apos;infraction.</li>
          <li>Elle constitue un indice suffisant de présomption d&apos;imputabilité pour justifier la capture.</li>
        </FormationUl>

        <FormationH5>1.2.2 — La découverte d&apos;objets, traces ou indices</FormationH5>
        <FormationQuote>
          « Dans un temps très voisin de l&apos;action, la personne soupçonnée est trouvée en possession d&apos;objets,
          ou présente des traces ou indices, laissant penser qu&apos;elle a participé au crime ou au délit »
        </FormationQuote>
        <FormationUl>
          <li>Révèle à la fois la commission d&apos;une infraction récente ET l&apos;imputabilité à l&apos;individu.</li>
          <li>
            Exemple classique : individu surpris la nuit porteur d&apos;instruments d&apos;effraction + sac d&apos;objets
            précieux, qui tente de fuir à la vue des policiers → présence d&apos;indices matériels ET d&apos;un
            indice-attitude (la fuite).
          </li>
          <li>Autre exemple : se débarrasser d&apos;un poste radio à la vue de la police = apparence d&apos;une infraction flagrante.</li>
        </FormationUl>
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              La flagrance par présomption nécessite obligatoirement que les faits se soient produits dans un temps très
              voisin — ce n&apos;est pas une simple coïncidence temporelle.
            </p>
          </FormationExamTrap>
        </div>
      </FormationChapter>

      <FormationChapter id='alpha-ch2-domaine' title="CHAPITRE 2 — Le domaine d'application" badge='Ch. 2'>
        <FormationH4>2.1 Les personnes</FormationH4>
        <FormationP>Certaines personnes bénéficient d&apos;une protection particulière :</FormationP>
        <FormationUl>
          <li>
            Agents diplomatiques + famille + personnel de service : immunité totale, aucune arrestation possible.
          </li>
          <li>
            Fonctionnaires consulaires : ne peuvent être arrêtés que pour crime grave, et sauf crime flagrant, les
            conventions bilatérales les exemptent généralement d&apos;arrestation.
          </li>
          <li>
            Président de la République : inviolabilité totale pendant son mandat, pour tous actes (y compris étrangers à
            sa fonction) — l&apos;inviolabilité prend fin 1 mois après la fin du mandat.
          </li>
          <li>
            Parlementaires : l&apos;irresponsabilité ne concerne que leurs opinions/votes. En dehors de cette hypothèse,
            ils peuvent être arrêtés et placés en GAV en cas de flagrant délit, à condition qu&apos;il existe des indices
            graves et concordants de nature à motiver leur mise en examen. L&apos;OPJ doit en rendre compte au procureur
            de la République qui en informe le Garde des Sceaux.
          </li>
          <li>Mineurs : peuvent faire l&apos;objet d&apos;une enquête de FD, mais des règles spécifiques s&apos;appliquent pour la garde à vue.</li>
        </FormationUl>
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              Un parlementaire peut être placé en GAV en flagrant délit — mais uniquement si les indices sont graves ET
              concordants. Ce n&apos;est pas automatique.
            </p>
          </FormationExamTrap>
        </div>

        <FormationH4 className='mt-8'>2.2 Les lieux</FormationH4>
        <FormationP>Certains lieux sont protégés :</FormationP>
        <FormationUl>
          <li>Locaux diplomatiques + demeure privée de l&apos;agent + véhicules de mission : inviolables, sauf réquisition du chef de mission.</li>
          <li>Locaux consulaires : protégés uniquement pour la partie professionnelle.</li>
          <li>Assemblée nationale / Sénat : introduction possible uniquement sur réquisition du président de l&apos;assemblée concernée.</li>
          <li>
            Enceinte universitaire : 3 hypothèses d&apos;entrée → réquisition du chef d&apos;établissement, autorisation
            écrite du procureur de la République, ou exceptionnellement pour mettre fin à des infractions particulièrement graves.
          </li>
          <li>Établissements militaires (temps de guerre) : réquisition préalable de l&apos;OPJ nécessaire (art. L. 212-6 code de justice militaire).</li>
          <li>Établissements intéressant la défense nationale : autorisation préalable obligatoire (art. 413-7 C.P.).</li>
        </FormationUl>
      </FormationChapter>

      <FormationChapter id='alpha-ch3-procedure-fd' title='CHAPITRE 3 — La procédure de flagrant délit' badge='Ch. 3'>
        <FormationH4>3.1 Les autorités habilitées</FormationH4>
        <FormationH5>Le procureur de la République</FormationH5>
        <FormationP>En plus de ses pouvoirs de direction et contrôle, le procureur peut accomplir lui-même des actes de PJ en flagrant délit :</FormationP>
        <FormationUl>
          <li>Art. 41 al. 5 C.P.P. : dispose de tous les pouvoirs et prérogatives d&apos;un OPJ</li>
          <li>Art. 41 al. 6 C.P.P. : peut se transporter sur tout le territoire national (voire à l&apos;étranger sur accord des autorités étrangères)</li>
          <li>
            Art. 68 C.P.P. : quand il se rend sur les lieux d&apos;un crime/délit flagrant, l&apos;OPJ présent est dessaisi de plein droit. Le PR peut alors accomplir lui-même les actes, ordonner à l&apos;OPJ de poursuivre ou charger un autre OPJ
          </li>
          <li>Art. 63 al. 1 C.P.P. : peut demander à l&apos;OPJ de prendre une mesure de garde à vue</li>
          <li>
            Art. 70 C.P.P. : peut décerner un mandat de recherche en cas de crime/délit flagrant puni d&apos;au moins 3 ans d&apos;emprisonnement contre toute personne à l&apos;encontre de laquelle il existe des raisons plausibles de soupçonner qu&apos;elle a commis l&apos;infraction
          </li>
          <li>
            Art. 72 C.P.P. : lorsque le PR et le juge d&apos;instruction sont simultanément sur les lieux, le PR peut requérir l&apos;ouverture d&apos;une information dont est saisi le JI présent
          </li>
        </FormationUl>

        <FormationH5 className='mt-6'>Les officiers de police judiciaire</FormationH5>
        <FormationP>
          Seuls les OPJ de « plein exercice » (art. 16 et 16-1 A C.P.P.) sont compétents. Les OPJ de l&apos;art. L. 130-1 du Code de la route ont une compétence d&apos;attribution limitée aux seules infractions routières et atteintes involontaires à la vie lors d&apos;accidents.
        </FormationP>
        <FormationP>En dehors des magistrats et OPJ, certains actes relevant du FD sont accordés à :</FormationP>
        <FormationUl>
          <li>Les APJ (art. 20 C.P.P.)</li>
          <li>Les assistants d&apos;enquête (art. 21-3 C.P.P.)</li>
          <li>Tout citoyen : pour appréhender, dans un lieu public, l&apos;auteur présumé d&apos;une infraction flagrante (art. 73 al. 1 C.P.P.)</li>
        </FormationUl>
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              Tout citoyen peut appréhender l&apos;auteur d&apos;une infraction flagrante dans un lieu public — mais pas dans un lieu privé. Cette compétence est strictement limitée.
            </p>
          </FormationExamTrap>
        </div>

        <FormationH4 className='mt-8'>3.2 La durée de l&apos;enquête</FormationH4>
        <FormationP>L&apos;enquête de flagrant délit est conditionnée par l&apos;urgence.</FormationP>
        <FormationH5>Durée initiale</FormationH5>
        <FormationP>
          L&apos;enquête de flagrance peut se poursuivre sans discontinuer pendant une durée de 8 jours sous le contrôle du procureur de la République (art. 53 C.P.P.).
        </FormationP>
        <div className='mt-3'>
          <FormationKeyJuris title='Jurisprudence clé'>
            <p>
              C&apos;est la continuité des actes d&apos;investigation et non celle des actes de procédure les relatant qui importe à la validité de l&apos;enquête (Cass. crim. n° 94-84.744 du 20 décembre 1994).
            </p>
          </FormationKeyJuris>
        </div>

        <FormationH5 className='mt-6'>Prolongation</FormationH5>
        <FormationP>
          Le procureur de la République peut prolonger l&apos;enquête de flagrance pour 8 jours supplémentaires si deux conditions cumulatives sont réunies : l&apos;infraction est un crime ou un délit puni d&apos;une peine ≥ 5 ans d&apos;emprisonnement ; les investigations ne peuvent être différées.
        </FormationP>
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              Dès lors qu&apos;il y a interruption dans le déroulement des opérations, l&apos;enquête ne peut être poursuivie qu&apos;en enquête préliminaire ou sur commission rogatoire. Une interruption = fin du régime FD.
            </p>
          </FormationExamTrap>
        </div>
        <FormationP className='mt-4'>
          <strong className='text-slate-200'>Durée totale maximale en FD de droit commun : 16 jours.</strong>
        </FormationP>

        <FormationH4 className='mt-8'>3.3 Les actes de la procédure</FormationH4>
        <FormationP>Il n&apos;existe pas de chronologie type des actes d&apos;enquête.</FormationP>

        <FormationH5>3.3.1 — La saisine</FormationH5>
        <FormationUl>
          <li>La saisine de l&apos;OPJ est réalisée par la connaissance d&apos;une des situations de fait de la flagrance (plainte victime, relation des faits par témoin…).</li>
          <li>La constatation du caractère flagrant figure dans le premier PV de la procédure (PV de saisine).</li>
          <li>Dès qu&apos;il est avisé d&apos;un crime flagrant, l&apos;OPJ doit aussitôt en informer le procureur de la République (art. 54 al. 1 C.P.P.).</li>
        </FormationUl>

        <FormationH5>3.3.2 — La plainte</FormationH5>
        <FormationP>
          <strong className='text-slate-200'>Généralités (art. 15-3 C.P.P.) :</strong> Les OPJ/APJ sont obligés de recevoir les plaintes, y compris si leur service est territorialement incompétent (transmission au service compétent). Tout dépôt de plainte = PV obligatoire + récépissé immédiat mentionnant les délais de prescription et la possibilité de constitution de partie civile. Si le plaignant le demande : copie du PV remise immédiatement. Les OPJ/APJ peuvent s&apos;identifier par leur numéro d&apos;immatriculation administrative.
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>Les plaintes en ligne — THÉSEE (art. 15-3-1 C.P.P.) :</strong> Uniquement pour les plaintes contre inconnu pour escroquerie (y compris connexe à accès frauduleux STAD), chantage, extorsion connexe.
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>La visioplainte (art. 15-3-1-1 C.P.P.) :</strong> Applicable à toutes infractions contre les personnes ou les biens. La victime ne peut pas se voir imposer ce mode de dépôt.
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>L&apos;OPJ ne peut pas refuser une plainte même si son service est incompétent. L&apos;obligation de recevoir les plaintes est absolue.</p>
          </FormationExamTrap>
        </div>

        <FormationH5 className='mt-6'>3.3.3 — Les constatations</FormationH5>
        <FormationP>
          L&apos;OPJ se transporte sur les lieux dès qu&apos;il a connaissance d&apos;un crime/délit flagrant (art. 54 C.P.P.). Il a pour mission : de constater l&apos;état des lieux ; de saisir les indices et éléments de preuve ; d&apos;effectuer les prélèvements utiles.
        </FormationP>

        <FormationH5>3.3.4 — Les perquisitions</FormationH5>
        <FormationP>
          Principe : En FD, les perquisitions sont possibles de plein droit, sans consentement de la personne, dans tout lieu où des éléments de preuve peuvent être trouvés. Réservées à l&apos;OPJ. Réalisables à toute heure du jour et de la nuit en flagrant délit (dérogation importante au principe général). Le consentement de l&apos;occupant n&apos;est pas requis en FD. Les perquisitions s&apos;étendent à tout local susceptible de receler des pièces ou objets en lien avec l&apos;infraction.
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>En FD, les perquisitions sont possibles de nuit — ce n&apos;est pas le cas en enquête préliminaire (sauf exceptions).</p>
          </FormationExamTrap>
        </div>

        <FormationH5>3.3.5 — Les fouilles de personnes</FormationH5>
        <FormationP>
          En FD, l&apos;OPJ peut procéder à la fouille intégrale des personnes interpellées, à des fins de recherche d&apos;indices et de sécurisation.
        </FormationP>

        <FormationH5>3.3.6 — Les fouilles de véhicules</FormationH5>
        <FormationP>
          Possibles dans le cadre du FD, notamment lorsqu&apos;il existe des raisons plausibles de soupçonner que le véhicule contient des éléments liés à l&apos;infraction.
        </FormationP>

        <FormationH5>3.3.7 — Les saisies et scellés</FormationH5>
        <FormationP>
          L&apos;OPJ saisit tous objets, documents, données informatiques pouvant constituer des preuves. Les objets saisis sont placés sous scellés avec PV descriptif. La restitution est possible ultérieurement selon décision judiciaire.
        </FormationP>

        <FormationH5>3.3.8 — L&apos;interpellation de l&apos;auteur présumé</FormationH5>
        <FormationP>
          L&apos;auteur présumé peut être interpellé et conduit devant l&apos;OPJ pour faire l&apos;objet des mesures prévues par la loi (art. 73 C.P.P.). Rappel art. 73 al. 1 C.P.P. : En cas de crime ou de délit flagrant puni d&apos;une peine d&apos;emprisonnement, tout citoyen a qualité pour appréhender l&apos;auteur et le conduire devant l&apos;OPJ le plus proche — uniquement dans un lieu public.
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>
              La faculté de l&apos;art. 73 est accordée à tout citoyen mais dans un lieu public uniquement. Un citoyen ne peut pas pénétrer dans un domicile privé pour appréhender un auteur.
            </p>
          </FormationExamTrap>
        </div>

        <FormationH5>3.3.9 — La garde à vue (droit commun)</FormationH5>
        <FormationP>
          <strong className='text-slate-200'>Définition :</strong> Mesure par laquelle une personne à l&apos;encontre de laquelle existent une ou plusieurs raisons plausibles de soupçonner qu&apos;elle a commis ou tenté de commettre une infraction est maintenue à la disposition des enquêteurs (art. 62-2 C.P.P.).
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>Conditions de placement :</strong> La mesure doit être l&apos;unique moyen de parvenir à l&apos;un des objectifs suivants : permettre l&apos;exécution des investigations impliquant la présence de la personne ; garantir la présentation de la personne devant le procureur ; empêcher que la personne ne modifie les preuves ou indices ; empêcher que la personne ne fasse pression sur les témoins ou victimes ; empêcher la concertation avec des coauteurs ou complices ; garantir la mise en œuvre des mesures destinées à faire cesser le crime ou délit.
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>Compétence :</strong> La GAV est décidée par l&apos;OPJ, sous le contrôle du procureur de la République.
        </FormationP>
        <FormationTable
          caption='Durées — droit commun (schéma indicatif)'
          headers={['Situation', 'Durée initiale', 'Prolongation', 'Durée totale']}
          rows={[
            ['Droit commun', '24h', '24h (sur autorisation PR)', '48h'],
            ['Infraction punie ≥ 5 ans (ex. : crime)', '24h', '24h', '48h'],
            ['Criminalité organisée', '48h', '24h + 24h (JL)', '96h ou plus'],
          ]}
        />
        <div className='mt-4'>
          <FormationExamTrap>
            <p>
              La GAV ne peut être décidée que si elle est l&apos;unique moyen d&apos;atteindre les objectifs légaux. L&apos;OPJ doit justifier cette nécessité dans le PV de placement.
            </p>
          </FormationExamTrap>
        </div>
        <FormationP>
          <strong className='text-slate-200'>Droits notifiés immédiatement</strong> à la personne gardée à vue : la nature de l&apos;infraction motivant la GAV ; la durée de la mesure et ses prolongations possibles ; le droit d&apos;être examinée par un médecin ; le droit de faire prévenir un proche et son employeur ; le droit d&apos;être assistée par un avocat ; le droit de garder le silence ; le droit à un interprète si nécessaire ; ses droits en matière de procédure pénale.
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>
              La notification des droits doit être immédiate au moment du placement en GAV. Tout retard injustifié peut entraîner la nullité de la procédure.
            </p>
          </FormationExamTrap>
        </div>

        <FormationH5>3.3.10 — Les auditions</FormationH5>
        <FormationP>
          <strong className='text-slate-200'>Les témoins :</strong> Toute personne susceptible de fournir des renseignements sur les faits est convocable. Elle n&apos;a pas à être assistée d&apos;un avocat. Elle prête serment de dire la vérité.
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>L&apos;audition libre :</strong> Toute personne qui n&apos;est pas placée en GAV mais auditionnée en tant que suspecte libre doit être informée qu&apos;elle peut quitter les locaux à tout moment, de l&apos;infraction pour laquelle elle est entendue, et de son droit d&apos;être assistée par un avocat.
        </FormationP>
        <FormationP>
          <strong className='text-slate-200'>Le mis en cause :</strong> Auditionné après notification de ses droits (droit au silence, droit à l&apos;avocat). Toute audition d&apos;un gardé à vue est précédée de la notification de ses droits.
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>Un témoin et un mis en cause ne peuvent pas être auditionnés dans les mêmes formes. Le statut de la personne conditionne le formalisme applicable.</p>
          </FormationExamTrap>
        </div>

        <FormationH5>3.3.11 — Les réquisitions</FormationH5>
        <FormationP>
          Les réquisitions permettent à l&apos;OPJ d&apos;obtenir la communication de documents ou données auprès de toute personne physique ou morale (art. 60 C.P.P. en FD). Elles visent notamment : les établissements bancaires (relevés de comptes) ; les opérateurs téléphoniques (fadettes, données de connexion) ; les gestionnaires de systèmes d&apos;information ; les médecins (levée du secret médical dans certains cas).
        </FormationP>
        <div className='mt-3'>
          <FormationExamTrap>
            <p>
              Le refus de répondre à une réquisition judiciaire est pénalement sanctionné. Les réquisitions en FD sont fondées sur l&apos;art. 60 C.P.P., et non l&apos;art. 77-1 (EP).
            </p>
          </FormationExamTrap>
        </div>

        <FormationH5>3.3.12 — La saisie des comptes bancaires</FormationH5>
        <FormationP>
          Possible en FD sur autorisation du procureur de la République ou du JI. Elle permet de bloquer les fonds et documents bancaires en lien avec l&apos;infraction.
        </FormationP>

        <FormationH4 className='mt-10'>TABLEAU RÉCAPITULATIF — FD vs EP</FormationH4>
        <FormationTable
          headers={['Critère', 'Flagrant délit (FD)', 'Enquête préliminaire (EP)']}
          rows={[
            ['Fondement', 'Art. 53-73 C.P.P.', 'Art. 75-78 C.P.P.'],
            ['Durée', '8j + 8j (max 16j)', '2 ans + 1 an (max 5 ans)'],
            ['Perquisitions de nuit', 'Oui', 'Non (sauf exceptions)'],
            ['Consentement perquisition', 'Non requis', 'Requis (sauf autorisation JL)'],
            ['Coercition', 'Possible de plein droit', 'Limitée'],
            ['Réquisitions', 'Art. 60 C.P.P.', 'Art. 77-1 C.P.P.'],
          ]}
        />

        <FormationH4 className='mt-10'>Pièges classiques d&apos;examen — FD</FormationH4>
        <FormationOl>
          <li>La contravention ne peut pas donner lieu à une enquête de FD. Seuls crimes et délits entrent dans le champ de la flagrance.</li>
          <li>Une interruption des actes d&apos;investigation met fin à l&apos;enquête de FD. Elle ne peut alors être poursuivie qu&apos;en EP ou sur CR.</li>
          <li>
            La prolongation à 16 j nécessite 2 conditions cumulatives : peine ≥ 5 ans ET investigations ne pouvant être différées.
          </li>
          <li>L&apos;art. 73 (appréhension par un citoyen) est limité aux lieux publics.</li>
          <li>L&apos;OPJ est dessaisi de plein droit dès que le procureur de la République se rend sur les lieux (art. 68 C.P.P.).</li>
          <li>Un parlementaire peut être placé en GAV en FD, mais uniquement s&apos;il existe des indices graves ET concordants.</li>
          <li>La notification des droits en GAV doit être immédiate — tout retard peut entraîner la nullité.</li>
          <li>La GAV n&apos;est possible que si c&apos;est l&apos;unique moyen d&apos;atteindre les objectifs légaux de l&apos;art. 62-2 C.P.P.</li>
          <li>THÉSÉE est limité aux plaintes contre inconnu pour des infractions numériques listées — pas applicable à toutes les infractions.</li>
          <li>L&apos;OPJ ne peut jamais refuser une plainte, même hors de sa compétence territoriale.</li>
        </FormationOl>

        <p className='mt-8 border-t border-white/10 pt-6 text-center text-[11px] leading-relaxed text-slate-500'>
          Référence éditoriale : programme officiel — Examen Juin 2026 — Version au 01/12/2025 © SDCP
        </p>
      </FormationChapter>
    </div>
  );
}
