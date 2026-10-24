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
  return item ? pageMetadata(item.seoTitle, item.short, `/${item.slug}`) : {};
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
      <PageIntro eyebrow="Nos expertises" title={s.seoTitle} text={s.short} />
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
              Voir la cuisine personnelle optimisée ↗
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
          <Button href={`/devis?service=${s.slug}`}>Parler de ce projet</Button>
        </aside>
      </section>
      <ContactCTA />
    </>
  );
}
