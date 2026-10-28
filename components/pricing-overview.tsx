import { pricing, approvedPricing } from "@/lib/pricing";
import { Eyebrow, Button } from "./ui";
export function PricingOverview() {
  return (
    <section className="pricing-section">
      <div className="container pricing-grid">
        <div>
          <Eyebrow>Préparer le budget d’un futur projet</Eyebrow>
          <h2>
            Ce qui fait
            <br />
            le prix d’un projet.
          </h2>
          <p>
            Nombre de meubles, découpes, état des supports, accès, déplacements,
            matériaux et préparation : le coût dépend du travail réellement
            nécessaire.
          </p>
          <Button href="/devis" variant="outline">
            Décrire mon projet
          </Button>
        </div>
        <div>
          <p className="pricing-note">
            L’activité est en préparation. Nous ne proposons ni devis ni prestation payante
            à ce stade ; les futurs tarifs restent à définir.
          </p>
          <ul>
            {pricing
              .filter((p) =>
                [
                  "assembly",
                  "worktop",
                  "hinges",
                  "complete",
                  "design",
                ].includes(p.id),
              )
              .map((p) => {
                const rate = approvedPricing.find((r) => r.id === p.id);
                return (
                  <li key={p.id}>
                    <span>{p.label}</span>
                    <strong>
                      {rate
                        ? `${rate.amount}${rate.maximum ? `–${rate.maximum}` : ""} € / ${rate.unit}`
                        : "À définir"}
                    </strong>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
