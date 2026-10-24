import { PageIntro, Eyebrow } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/lib/services";
import { mailReady, pageMetadata } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Votre projet — demande de devis",
  "Préparez une première demande pour votre projet d’aménagement, de montage de meubles ou de rénovation.",
  "/devis",
);
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = services.find((s) => s.slug === service);
  return (
    <>
      <PageIntro
        eyebrow="Votre projet commence ici"
        title="Donnons forme à vos idées."
        text="Quelques informations pour comprendre votre besoin et préparer un premier échange."
      />
      <section className="container section contact-page">
        <aside>
          <Eyebrow>Avant de commencer</Eyebrow>
          <h2>Tout part de votre quotidien.</h2>
          <p>
            Indiquez le lieu, les pièces concernées et les changements
            souhaités. Vous pouvez décrire plusieurs besoins dans une même
            demande.
          </p>
          <p>
            Ajoutez les dimensions et votre calendrier si vous les connaissez.
            Rien ne vous oblige à avoir déjà toutes les réponses.
          </p>
          <p className="quiet-note">
            Cette première demande permet d’échanger sur le projet. Elle ne
            constitue pas un devis ni un engagement de travaux.
          </p>
        </aside>
        <QuoteForm
          mailEnabled={mailReady}
          initialService={selected?.quoteType}
        />
      </section>
    </>
  );
}
