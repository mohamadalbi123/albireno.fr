import Link from "next/link";
import { featuredServices } from "@/lib/services";
import { serviceEditorialImage } from "@/lib/inspiration";
import { ProjectImage } from "./project-image";
import { Icon } from "./icon";
export function ServiceCards() {
  return (
    <div className="service-grid kitchen-services">
      {featuredServices.map((s) => (
        <article className={`service-card service-${s.id}`} key={s.slug}>
          <figure className="service-thumb photo-thumb">
            <Link href={`/${s.slug}`} tabIndex={-1} aria-hidden="true">
              <ProjectImage image={serviceEditorialImage(s.id)} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 50vw" />
            </Link>
            <figcaption>Inspiration générée par IA · illustration du service</figcaption>
          </figure>
          <span className="service-number">
            {s.number}
            {s.id === "optimisation" && " / NOTRE APPROCHE"}
          </span>
          <h3>
            <Link href={`/${s.slug}`}>
              {s.title}
              <Icon name="diagonal" width={22} />
            </Link>
          </h3>
          <p>{s.short}</p>
          {s.id === "optimisation" && (
            <p className="service-emphasis">
              Petite surface. Angles difficiles.
              <br />
              De nouvelles possibilités à explorer.
            </p>
          )}
          <Link className="service-enquiry" href={`/devis?service=${s.slug}`}>
            Parler de ce projet <Icon name="arrow" width={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}
