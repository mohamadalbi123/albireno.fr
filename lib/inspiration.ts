import type { ProjectImage } from "./projects";

/** Generated editorial assets are inspiration, never evidence of completed work. */
export const editorialImages = {
  hero: {
    src: "/images/editorial/kitchen-hero.webp",
    alt: "Inspiration générée par IA : cuisine chaleureuse en chêne clair avec îlot en pierre et lumière naturelle",
    role: "inspiration", width: 1536, height: 1024,
  },
  installation: {
    src: "/images/editorial/cabinet-installation.webp",
    alt: "Inspiration générée par IA : alignement de meubles de cuisine à l’aide d’un niveau",
    role: "inspiration", width: 1536, height: 1024,
  },
  storage: {
    src: "/images/editorial/small-kitchen-storage.webp",
    alt: "Inspiration générée par IA : petite cuisine en bois avec rangements coulissants et tiroirs organisés",
    role: "inspiration", width: 1536, height: 1024,
  },
  craft: {
    src: "/images/editorial/cabinet-hinge-detail.webp",
    alt: "Inspiration générée par IA : ajustement d’une charnière de porte de cuisine avec un tournevis",
    role: "inspiration", width: 1536, height: 1024,
  },
  design: {
    src: "/images/editorial/kitchen-design-study.webp",
    alt: "Inspiration générée par IA : étude de cuisine sur ordinateur avec plans et échantillons de matières",
    role: "inspiration", width: 1536, height: 1024,
  },
} satisfies Record<string, ProjectImage>;

export function serviceEditorialImage(id: string): ProjectImage {
  const images: Record<string, ProjectImage> = {
    installation: editorialImages.installation,
    renovation: editorialImages.hero,
    optimisation: editorialImages.storage,
    reparation: editorialImages.craft,
    conception: editorialImages.design,
  };
  return images[id] || editorialImages.hero;
}

export type InspirationDetail = ProjectImage & { title: string; disclosure: string };
const detail = (filename: string, title: string, alt: string, height = 331, disclosure = "Illustration d’inspiration fournie · pas une réalisation ALBI RENO."): InspirationDetail => ({
  src: `/images/inspiration-kit/${filename}.webp`, title, alt, role: "inspiration", width: 374, height, disclosure,
});
export const inspirationDetails = {
  installation: detail("cabinet-installation", "Aligner avec précision", "Illustration d’un montage de meuble de cuisine avec un niveau", 332),
  hinge: detail("cabinet-hinge-repair", "Retrouver une ouverture fluide", "Illustration du réglage d’une charnière de porte de meuble", 332),
  drawers: detail("drawer-organizers", "Une place pour chaque ustensile", "Illustration de séparateurs en bois dans un tiroir de cuisine"),
  finished: detail("finished-kitchen", "Bois clair et lignes sobres", "Inspiration de cuisine en bois clair avec plan de travail en pierre"),
  island: detail("hero-kitchen", "Un îlot pour se retrouver", "Inspiration d’îlot central en pierre avec tabourets et suspensions"),
  design: detail("kitchen-3d-design", "Comparer les volumes", "Illustration d’une conception de cuisine sur ordinateur, sans lien avec un export HomeStyler réel"),
  comparison: detail("kitchen-before-after-concept", "Deux ambiances imaginées", "Comparaison conceptuelle de deux ambiances de cuisine, sans chantier réel", 332, "Comparaison illustrative fournie · ni avant/après réel, ni chantier ALBI RENO."),
  sink: detail("kitchen-sink", "Soigner le point d’eau", "Inspiration d’évier intégré dans un plan clair sous des meubles en bois"),
  modern: detail("modern-kitchen", "Une cuisine qui respire", "Inspiration de cuisine lumineuse avec péninsule en pierre claire"),
  pullout: detail("pullout-storage", "Exploiter les rangements bas", "Illustration de paniers coulissants et de casseroles accessibles", 332),
  sinkDetail: detail("sink-detail", "Le soin des finitions", "Inspiration de robinet noir et d’évier encastré dans un plan en pierre claire"),
  storage: detail("small-kitchen-storage", "Ranger sans encombrer", "Illustration de rangements ouverts dans une petite cuisine en bois"),
};
export const serviceDetailImages: Record<string, InspirationDetail[]> = {
  installation: [inspirationDetails.installation, inspirationDetails.drawers, inspirationDetails.sink],
  renovation: [inspirationDetails.finished, inspirationDetails.modern, inspirationDetails.comparison],
  optimisation: [inspirationDetails.storage, inspirationDetails.pullout],
  reparation: [inspirationDetails.hinge, inspirationDetails.sinkDetail],
  conception: [inspirationDetails.design, inspirationDetails.island],
};
