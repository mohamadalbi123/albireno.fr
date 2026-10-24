import { PageIntro, ContactCTA } from "@/components/ui";
import { ServiceCards } from "@/components/service-cards";
import { pageMetadata, isPreview } from "@/lib/site";
export const metadata = pageMetadata(
  "Travaux de plâtrerie et projets intérieurs",
  "Découvrez les domaines de travaux à discuter avec Luna Plâtrerie, à Aytré et autour de La Rochelle. Présentez votre projet pour en préciser le périmètre.",
  "/prestations",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Prestations"
        title="Donnons forme à vos idées."
        text="Votre intérieur, vos usages, vos envies. Échangeons pour définir les travaux adaptés à votre projet."
      />
      <section className="section container">
        {isPreview && (
          <div className="editorial-notice">
            <strong>Présentation en cours de validation</strong>
            <p>
              Les domaines ci-dessous sont envisagés pour le site. Leur prise en
              charge par Luna Plâtrerie doit encore être confirmée. Contactez
              l’entreprise avant de prévoir ces travaux.
            </p>
          </div>
        )}
        <ServiceCards />
        <div className="info-band">
          <h2>Chaque intérieur a ses contraintes.</h2>
          <p>
            L’état des supports, les dimensions, l’accès et la destination des
            pièces sont autant d’éléments à préciser. Décrivez votre projet : un
            échange permettra d’identifier les points à examiner avant tout
            devis.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
