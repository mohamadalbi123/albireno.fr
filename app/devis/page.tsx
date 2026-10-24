import { PageIntro } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/lib/services";
import { mailReady, pageMetadata } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Votre projet de cuisine — demande de devis",
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
        text="Installation, rénovation, optimisation ou réparation : une seule demande, adaptée à vos besoins."
      />
      <section className="container section wizard-container">
        <QuoteForm
          mailEnabled={mailReady}
          initialService={selected}
          key={selected || "general"}
        />
        <p className="wizard-endnote">
          Une demande permet d’étudier votre projet. Elle ne constitue ni un
          devis définitif ni une réservation d’intervention.
        </p>
      </section>
    </>
  );
}
