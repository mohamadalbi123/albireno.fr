import { PageIntro } from "@/components/ui";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Politique de confidentialité",
  "Fonctionnement du formulaire de préparation et des liens de contact ALBI RENO.",
  "/politique-confidentialite",
  true,
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="Vos informations"
        title="Politique de confidentialité"
        text="Cette page décrit la préparation de votre demande et les moyens de contact disponibles. L’envoi automatique par e-mail est désactivé."
      />
      <article className="container legal-copy section">
        <h2>Préparation d’une demande</h2>
        <p>
          Le formulaire transmet vos coordonnées, votre message et les éventuelles photos au serveur du site pour validation. Il ne redirige pas vers WhatsApp. Tant que le service e-mail n’est pas configuré et activé, le serveur refuse l’envoi et affiche une erreur ; aucune confirmation d’envoi n’est donnée. Les données saisies restent dans la page pour vous permettre de réessayer.
        </p>
        <h2>Estimation d’installation</h2><p>Le calcul est effectué dans votre navigateur. Si vous choisissez d’ajouter votre estimation à une demande, les quantités et options sont transmises au formulaire dans un fragment du lien, sans coordonnées ni fichier. Ce fragment est retiré de l’adresse après lecture et le récapitulatif reste dans la page. Il est inclus dans votre demande via le formulaire. L’action distincte de partage WhatsApp prépare un brouillon que vous vérifiez et envoyez vous-même.</p>
        <p>La sélection du calculateur peut aussi être transmise dans un fragment du lien lorsque vous changez de langue, puis retirée de l’adresse. Aucune coordonnée n’y est incluse.</p>
        <p>Les quantités et mesures du calculateur sont conservées dans la session de votre onglet pour retrouver votre estimation après un retour ou un rechargement. Aucune coordonnée, photo ou donnée du formulaire n’y est enregistrée. Vous pouvez réinitialiser l’estimation à tout moment.</p>
        <h2>Contact direct</h2>
        <p>
          Les liens de contact par téléphone et par e-mail ouvrent l’application choisie sur
          votre appareil. Les échanges sont ensuite traités par les services que
          vous utilisez. Ces options sont indépendantes du formulaire. Si vous choisissez WhatsApp, le texte du lien est transmis à ce service à son ouverture ; vous décidez ensuite de l’envoyer.
        </p>
        <h2>Envoi automatique futur</h2>
        <p>
          L’activation de l’envoi par e-mail nécessite de configurer et de vérifier
          les prestataires d’envoi et de protection anti-spam. Les photos facultatives sont préparées dans la mémoire de la page, puis transmises uniquement lorsque vous soumettez le formulaire. En cas d’envoi activé, les images sont validées et réencodées avant d’être jointes au message. Aucune galerie publique ni base de fichiers n’est créée. La conservation dans la messagerie et chez le
          prestataire devra être définie. Les finalités, bases légales,
          destinataires, durées de conservation, transferts éventuels et
          modalités d’exercice des droits seront précisés avant cette activation
          publique.
        </p>
        <h2>Hébergement et données techniques</h2>
        <p>
          Le site est hébergé par Vercel. Son affichage et sa sécurité impliquent
          le traitement de données techniques par cet hébergeur, distinctes des
          informations que vous saisissez pour préparer votre demande.
          Vous pouvez consulter la{" "}
          <a href="https://vercel.com/legal/privacy-notice">
            notice de confidentialité de Vercel
          </a>.
        </p>
        <h2>Mesure d’audience</h2>
        <p>
          Aucun outil publicitaire ou de mesure d’audience n’est installé dans
          cette version. Des événements techniques sont préparés dans la page pour distinguer un clic de contact, l’ouverture de WhatsApp et une demande acceptée par le service d’envoi, si celui-ci est activé ultérieurement. Ils ne contiennent ni nom, ni coordonnées, ni texte du projet ; ils ne sont ni enregistrés ni envoyés à un service de mesure. Toute activation d’un outil externe nécessitera une mise à jour de ces informations et du dispositif de consentement approprié. Les polices et photographies sont servies par le site.
        </p>
        <h2>Contact</h2>
        <p>
          Pour toute question sur vos données ou pour exercer vos droits auprès
          de Mohamad Albi :{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>.
        </p>
      </article>
    </>
  );
}
