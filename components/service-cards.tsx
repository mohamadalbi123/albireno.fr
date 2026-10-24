import Link from "next/link";
import { Icon } from "./icon";
import { availableServices } from "@/lib/services";
import { isPreview } from "@/lib/site";
export function ServiceCards() {
  const items = availableServices(isPreview);
  return (
    <>
      {items.length ? (
        <div className="services-grid">
          {items.map((s) => (
            <Link
              className="service-card"
              key={s.slug}
              href={`/prestations/${s.slug}`}
            >
              <div className="service-card-top">
                <Icon name={s.icon} width={34} height={34} />
                <span>{s.number}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <div className="service-card-bottom">
                <span>
                  {s.confirmed
                    ? "Découvrir la prestation"
                    : "Prestation à confirmer"}
                </span>
                <span className="circle-arrow">
                  <Icon name="arrow" width={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>
          Le détail des prestations sera précisé prochainement. Contactez-nous
          pour étudier votre demande de travaux de plâtrerie.
        </p>
      )}
    </>
  );
}
