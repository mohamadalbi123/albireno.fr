import Image from "next/image";
import type { ProjectImage as Media } from "@/lib/projects";
export function ProjectImage({
  image,
  priority = false,
  className = "",
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  image: Media;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`project-image ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}
