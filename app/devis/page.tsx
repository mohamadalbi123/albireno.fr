import { PageIntro } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/lib/services";
import { mailReady, pageMetadata } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Votre futur projet de cuisine — premier échange",
  "Un parcours guidé pour votre installation, rénovation, optimisation ou réparation de cuisine. Décrivez vos besoins et vérifiez votre demande avant envoi.",
  "/devis",
);
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected =
    service === "autre"
      ? "autre"
      : services.find((s) => s.slug === service)?.id;
  return (
    <>
      <PageIntro
        eyebrow="Parlons de votre cuisine"
        title="Votre projet commence par quelques idées."
        text="L’activité cuisine est en préparation. Ce parcours permet de partager vos besoins pour un futur projet, sans devis ni réservation à ce stade."
      />
      <section className="container section wizard-container">
        <QuoteForm
          mailEnabled={mailReady}
          initialService={selected}
          key={selected || "general"}
        />
        <p className="wizard-endnote">
          Cet échange prépare un éventuel futur projet. Il ne constitue ni une
          demande de prestation payante, ni un devis, ni une réservation d’intervention.
        </p>
      </section>
    </>
  );
}
