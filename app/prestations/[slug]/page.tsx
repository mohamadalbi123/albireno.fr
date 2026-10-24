import Link from "next/link";
import { notFound } from "next/navigation";
import { services, availableServices } from "@/lib/services";
import { isPreview, pageMetadata } from "@/lib/site";
import {
  PageIntro,
  PhotoPlaceholder,
  ContactCTA,
  Button,
} from "@/components/ui";
import { Icon } from "@/components/icon";
export function generateStaticParams() {
  return availableServices(isPreview).map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) return {};
  return pageMetadata(
    `${s.title} à Aytré et La Rochelle`,
    `${s.intro} Échangez avec Luna Plâtrerie pour préciser votre projet.`,
    `/prestations/${slug}`,
    !s.confirmed,
  );
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = availableServices(isPreview).find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageIntro
        eyebrow="Votre projet intérieur"
        title={service.title}
        text={service.intro}
      />
      <section className="container section">
        {!service.confirmed && (
          <div className="editorial-notice">
            <strong>Prestation à confirmer</strong>
            <p>
              Cette page est une présentation préparatoire. La réalisation de
              ces travaux par Luna Plâtrerie reste à valider ; elle ne constitue
              pas une offre de service confirmée.
            </p>
          </div>
        )}
        <div className="service-detail-grid">
          <PhotoPlaceholder
            label="Photo de cette prestation à venir"
            kind={service.icon}
          />
          <div>
            <h2>Les points à réfléchir ensemble.</h2>
            <div className="benefits">
              {service.benefits.map((b) => (
                <div key={b.title}>
                  <Icon name="check" />
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="info-band">
          <h2>Préparer votre demande à Aytré ou La Rochelle</h2>
          <p>
            {service.preparation} Indiquez également la commune du chantier :
            les possibilités d’intervention seront étudiées lors du premier
            échange.
          </p>
          <Button>Présenter mon projet</Button>
        </div>
        <div className="related-services">
          <h2>D’autres sujets à explorer</h2>
          {availableServices(isPreview)
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <Link href={`/prestations/${s.slug}`} key={s.slug}>
                {s.title}
                <Icon name="arrow" />
              </Link>
            ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
