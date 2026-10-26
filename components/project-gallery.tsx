"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage as Media } from "@/lib/projects";
import { ProjectImage } from "./project-image";

const roleLabels: Record<Media["role"], string> = { before: "Avant intervention", original: "État existant", design: "Conception 3D", finished: "Photographie réelle · Espace terminé", inspiration: "Inspiration générée par IA" };

export function ProjectGallery({ images, label }: { images: Media[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="project-gallery">
        {images.map((image, i) => (
          <figure key={image.src}>
            <button className="gallery-open" type="button" aria-label={`Agrandir : ${image.alt}`} onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}>
              <ProjectImage image={image} sizes="(max-width: 700px) 90vw, 45vw" />
              <span className="gallery-hint">Agrandir ↗</span>
            </button>
            <figcaption>{label} · {roleLabels[image.role]} · Vue {i + 1}</figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className="image-dialog" aria-labelledby="gallery-title" onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}>
        <div className="dialog-toolbar">
          <p id="gallery-title">{label} · {selected + 1} / {images.length}</p>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Fermer la photographie">Fermer ×</button>
        </div>
        <Image src={images[selected].src} alt={images[selected].alt} width={images[selected].width} height={images[selected].height} sizes="(max-width: 700px) 90vw, 70vw" />
        <div className="dialog-toolbar">
          <button type="button" disabled={images.length < 2} onClick={() => setSelected((selected + images.length - 1) % images.length)}>← Précédente</button>
          <button type="button" disabled={images.length < 2} onClick={() => setSelected((selected + 1) % images.length)}>Suivante →</button>
        </div>
        <p>{images[selected].alt}</p>
      </dialog>
    </>
  );
}
