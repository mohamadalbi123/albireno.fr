import Image from "next/image";
import Link from "next/link";
import { featuredServices } from "@/lib/services";
import { Icon } from "./icon";
const thumbnails: Record<string, { file: string; alt: string }> = {
  meubles: {
    file: "furniture-assembly",
    alt: "Illustration IA de montage de meuble",
  },
  renovation: {
    file: "renovation",
    alt: "Illustration IA de préparation et peinture d’un mur",
  },
  cuisine: {
    file: "kitchen-installation",
    alt: "Illustration IA d’une cuisine aménagée",
  },
  "3d": {
    file: "3d-design",
    alt: "Illustration IA de volumes intérieurs, sans lien avec HomeStyler",
  },
  mobilier: {
    file: "custom-furniture",
    alt: "Illustration IA d’un rangement sur mesure",
  },
  pro: {
    file: "commercial-fitout",
    alt: "Illustration IA d’un espace d’accueil",
  },
};
export function ServiceCards() {
  return (
    <div className="service-grid">
      {featuredServices.map((s) => (
        <article className={`service-card service-${s.kind}`} key={s.slug}>
          <figure className="service-thumb">
            <Image
              src={`/images/services/${thumbnails[s.kind].file}.webp`}
              alt={thumbnails[s.kind].alt}
              width={210}
              height={170}
            />
            <figcaption>Inspiration · image IA</figcaption>
          </figure>
          <span className="service-number">{s.number}</span>
          <h3>
            <Link href={`/${s.slug}`}>
              {s.title}
              <Icon name="diagonal" width={22} />
            </Link>
          </h3>
          <p>{s.short}</p>
          <Link className="service-enquiry" href={`/devis?service=${s.slug}`}>
            Parler de ce projet <Icon name="arrow" width={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}
