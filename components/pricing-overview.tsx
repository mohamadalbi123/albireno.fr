import { pricing, approvedPricing } from "@/lib/pricing";
import { Eyebrow, Button } from "./ui";
export function PricingOverview() {
  return (
    <section className="pricing-section">
      <div className="container pricing-grid">
        <div>
          <Eyebrow>Un périmètre clair, un devis adapté</Eyebrow>
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
            Chaque demande fait l’objet d’une étude. Aucun tarif automatique ne
            vaut devis définitif.
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
                        : "Sur devis"}
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
