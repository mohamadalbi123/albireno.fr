import { business } from "@/lib/business";
import { ProjectImage } from "@/components/project-image";
import { serviceEditorialImage, serviceDetailImages } from "@/lib/inspiration";
import { InspirationFigure } from "@/components/inspiration-figure";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { PageIntro, Button, Eyebrow, ContactCTA } from "@/components/ui";
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const item = services.find((s) => s.slug === service);
  return item ? pageMetadata(item.seoTitle, item.seoDescription, `/${item.slug}`, !item.confirmed) : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((s) => s.slug === service);
  if (!s) notFound();
  return (
    <>
      <PageIntro eyebrow="Nos expertises" title={s.seoTitle} text={`${s.short} ${business.preparationNotice}`} />
      <section className="container service-visual" aria-label="Le service en images">
        <figure className="service-main-photo">
          <ProjectImage image={serviceEditorialImage(s.id)} priority sizes="(max-width: 700px) 100vw, (max-width: 1440px) 92vw, 1320px" />
          <figcaption>Inspiration générée par IA · illustration du service, pas une réalisation ALBI RENO.{s.id === "conception" && " Ce visuel n’est pas un export HomeStyler."}</figcaption>
        </figure>
        <div className="service-visual-copy">
          <Eyebrow>Une idée à explorer</Eyebrow>
          <h2>{s.title}</h2>
          <p>{s.examples[0]}. Le choix dépend des dimensions, de l’existant et du périmètre à confirmer.</p>
          <Button href={`/devis?service=${s.slug}`}>Parler de mon projet</Button>
          <Link className="text-link" href="/realisations/cuisine-optimisee">Explorer le projet de cuisine ↗</Link>
        </div>
      </section>
      <section className="container section detail-grid">
        <div>
          <Eyebrow>Un projet à votre mesure</Eyebrow>
          <h2>{s.short}</h2>
          <p className="lead">{s.intro}</p>
          <ol className="detail-steps">
            {s.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>{s.note}</p>
          {s.slug === "installation-cuisine-la-rochelle" && (
            <Link className="text-link" href="/realisations/cuisine-optimisee">
              Voir le projet de cuisine optimisée ↗
            </Link>
          )}
          <h3 className="service-examples-title">
            Ce que nous pouvons étudier
          </h3>
          <ul className="service-examples">
            {s.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <Link className="text-link" href="/devis">
            Réunir plusieurs besoins dans une demande ↗
          </Link>
        </div>
        <aside className="preparation">
          <Eyebrow>Pour commencer</Eyebrow>
          <h3>Préparer notre échange</h3>
          <p>{s.preparation}</p>
          <Button href={`/devis?service=${s.slug}`}>Parler de mon projet</Button>
        </aside>
      </section>
      <section className="container inspiration-section" aria-label="Exemples illustratifs">
        <Eyebrow>Des pistes pour votre cuisine</Eyebrow>
        <h2>Du volume au détail.</h2>
        <p className="inspiration-intro">Ces illustrations présentent des idées d’aménagement. Elles ne montrent pas des chantiers réalisés par ALBI RENO.</p>
        <div className="inspiration-grid">
          {serviceDetailImages[s.id].map((image) => <InspirationFigure key={image.src} image={image} />)}
        </div>
      </section>
      <section className="container related-services">
        <Eyebrow>Un projet peut réunir plusieurs besoins</Eyebrow>
        <h2>Pour aller plus loin</h2>
        <ul>{services.filter((item) => item.id !== s.id).map((item) => <li key={item.id}><Link href={`/${item.slug}`}>{item.title} ↗</Link></li>)}</ul>
      </section>
      <ContactCTA />
    </>
  );
}
