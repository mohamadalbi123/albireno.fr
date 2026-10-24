import { PageIntro } from "@/components/ui";
import { business } from "@/lib/business";
import { contactEmail, mailReady, pageMetadata } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Politique de confidentialité",
  "Informations sur les données du formulaire de contact, leur utilisation et les droits des personnes.",
  "/confidentialite",
  !business.privacyApproved,
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vos informations personnelles"
        title="Politique de confidentialité"
        text="Comprendre les informations utilisées lorsque vous prenez contact avec Luna Plâtrerie."
      />
      <article className="prose container">
        {!business.privacyApproved && (
          <div className="editorial-notice">
            <strong>Version préparatoire</strong>
            <p>
              Le responsable du traitement, les durées de conservation et les
              prestataires doivent être confirmés avant l’activation de l’envoi
              par e-mail et le lancement du site.
            </p>
          </div>
        )}
        <h2>Qui est responsable ?</h2>
        <p>
          Luna Plâtrerie, {business.address}, {business.postalCode}{" "}
          {business.city}. L’identité juridique complète est à confirmer dans
          les mentions légales.
        </p>
        <h2>Quelles informations sont utilisées ?</h2>
        <p>
          Le formulaire demande votre nom, téléphone, adresse e-mail, commune du
          chantier, type de demande et description du projet. Ces informations
          permettent d’étudier votre besoin et d’y répondre. Merci de ne pas
          transmettre de données sensibles ou de documents d’identité.
        </p>
        <h2>Comment votre demande est-elle envoyée ?</h2>
        {mailReady ? (
          <p>
            Lorsque vous envoyez le formulaire, les informations sont transmises
            au service d’envoi d’e-mails Resend puis à la messagerie de
            l’entreprise. Cloudflare Turnstile vérifie la demande pour lutter
            contre les envois automatisés ; ce service peut traiter des données
            techniques de connexion.
          </p>
        ) : (
          <p>
            L’envoi par e-mail n’est pas encore activé. Les informations saisies
            restent dans la page. Le bouton de préparation crée un lien
            contenant votre message ; il ne transmet pas de demande à
            l’entreprise. Lorsque vous ouvrez ce lien, les informations du
            message sont transmises à WhatsApp. Vous pouvez vérifier et modifier
            le message avant de l’envoyer dans WhatsApp.
          </p>
        )}
        <h2>Finalité et base du traitement</h2>
        <p>
          Vos informations servent à traiter votre demande et à préparer, à
          votre initiative, une éventuelle proposition de travaux. La base
          juridique envisagée est l’exécution de mesures précontractuelles à
          votre demande. Elle sera confirmée par le responsable du traitement.
        </p>
        <h2>Destinataires et conservation</h2>
        <p>
          La demande est destinée à Luna Plâtrerie et aux prestataires
          techniques strictement nécessaires à son acheminement. Le site ne
          comporte ni compte client ni base de données des demandes. Les règles
          de conservation de la messagerie, les journaux techniques et les
          éventuels transferts hors de l’Union européenne doivent être précisés
          avec les prestataires avant le lancement.
        </p>
        <h2>Liens externes</h2>
        <p>
          Google et WhatsApp ne sont chargés qu’après ouverture de leurs liens.
          Leur utilisation est régie par leurs politiques respectives :{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
          </a>{" "}
          et{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
        <h2>Cookies et mesure d’audience</h2>
        <p>
          Aucun outil publicitaire, de mesure d’audience ou de carte intégrée
          n’est installé. Les polices sont hébergées avec le site. Aucun bandeau
          de consentement n’est affiché pour ces technologies absentes. Toute
          évolution des outils devra être accompagnée d’une réévaluation des
          informations et du consentement nécessaires.
        </p>
        <h2>Vos droits et vos contacts</h2>
        <p>
          Selon le traitement et les conditions applicables, vous pouvez
          demander l’accès, la rectification, l’effacement ou la limitation du
          traitement de vos données, et exercer les autres droits prévus par la
          réglementation.
        </p>
        <p>
          {contactEmail ? (
            <>
              Pour exercer vos droits :{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          ) : (
            <>
              En attendant la confirmation de l’adresse e-mail, vous pouvez
              écrire à Luna Plâtrerie, {business.address}, {business.postalCode}{" "}
              {business.city}.
            </>
          )}
        </p>
        <p>
          Vous pouvez également contacter la{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
          >
            CNIL
          </a>{" "}
          pour toute réclamation concernant vos données personnelles.
        </p>
      </article>
    </>
  );
}
