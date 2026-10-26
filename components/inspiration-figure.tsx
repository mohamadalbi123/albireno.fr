import Image from "next/image";
import type { InspirationDetail } from "@/lib/inspiration";

export function InspirationFigure({ image }: { image: InspirationDetail }) {
  return (
    <figure className="inspiration-detail">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 420px) 90vw, 374px" />
      <figcaption>
        <strong>{image.title}</strong>
        <span>{image.disclosure}</span>
      </figcaption>
    </figure>
  );
}
