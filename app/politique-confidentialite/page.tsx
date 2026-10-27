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
          restent dans la page. Le bouton de préparation crée un lien WhatsApp
          contenant votre texte. Ce texte est transmis à WhatsApp lorsque vous
          ouvrez le lien ; l’envoi du message au destinataire reste à votre
          initiative.
        </p>
        <h2>Contact direct</h2>
        <p>
          Les liens de téléphone et d’e-mail ouvrent l’application choisie sur
          votre appareil. Les échanges sont ensuite traités par les services que
          vous utilisez. Les photos sélectionnées restent en mémoire dans la
          page lorsque l’envoi automatique est désactivé. Elles ne sont pas
          jointes au lien WhatsApp et doivent être ajoutées manuellement dans
          cette application.
        </p>
        <h2>Envoi automatique futur</h2>
        <p>
          L’activation de l’envoi par e-mail nécessite de configurer et vérifier
          les prestataires d’envoi et de protection anti-spam. Lorsque cet envoi
          est activé, les photos sont vérifiées et réencodées sans métadonnées,
          puis transmises en pièces jointes. Aucune galerie publique ni base de
          fichiers n’est créée. La conservation dans la messagerie et chez le
          prestataire devra être définie. Les finalités, bases légales,
          destinataires, durées de conservation, transferts éventuels et
          modalités d’exercice des droits seront précisés avant cette activation
          publique.
        </p>
        <h2>Hébergement et données techniques</h2>
        <p>
          Le site est hébergé par Vercel. Son affichage et sa sécurité impliquent
          le traitement de données techniques par cet hébergeur, distinctes des
          informations que vous saisissez dans la préparation de votre demande.
          Vous pouvez consulter la{" "}
          <a href="https://vercel.com/legal/privacy-notice">
            notice de confidentialité de Vercel
          </a>.
        </p>
        <h2>Mesure d’audience</h2>
        <p>
          Aucun outil publicitaire ou de mesure d’audience n’est installé dans
          cette version. Les polices et photographies sont servies par le site.
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
