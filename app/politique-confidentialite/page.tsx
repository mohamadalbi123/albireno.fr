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
          Lorsque l’envoi automatique est désactivé, les informations saisies
          restent dans la page. Après validation des champs, le bouton « Continuer sur WhatsApp » ouvre WhatsApp avec votre texte prérempli. Ce texte est transmis à WhatsApp à cette étape ; vous vérifiez ensuite le message et décidez de l’envoyer au destinataire dans l’application.
        </p>
        <h2>Estimation d’installation</h2><p>Le calcul est effectué dans votre navigateur. Si vous choisissez d’ajouter votre estimation à une demande, les quantités et options sont transmises au formulaire dans un fragment du lien, sans coordonnées ni fichier. Ce fragment est retiré de l’adresse après lecture et le récapitulatif reste dans la page. Il sera inclus dans le texte transmis à WhatsApp lorsque vous ouvrirez l’application. Aucun plan ni photographie n’est joint automatiquement.</p>
        <h2>Contact direct</h2>
        <p>
          Les liens de contact par téléphone et par e-mail ouvrent l’application choisie sur
          votre appareil. Les échanges sont ensuite traités par les services que
          vous utilisez. Aucun fichier n’est téléversé dans le formulaire. Si vous choisissez de partager des photos ou un plan, vous les ajoutez directement dans votre application de messagerie.
        </p>
        <h2>Envoi automatique futur</h2>
        <p>
          L’activation de l’envoi par e-mail nécessite de configurer et de vérifier
          les prestataires d’envoi et de protection anti-spam. Le formulaire ne propose actuellement aucun téléversement de fichier. Aucune galerie publique ni base de fichiers n’est créée. La conservation dans la messagerie et chez le
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
