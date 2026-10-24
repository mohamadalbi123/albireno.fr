/** No rates are published until explicitly approved. Values are EUR including applicable tax. */
export type PricingItem = {
  id: string;
  label: string;
  unit: "module" | "élément" | "intervention" | "projet";
  amount?: number;
  maximum?: number;
  approved: boolean;
};
export const pricing: PricingItem[] = [
  {
    id: "assembly",
    label: "Montage des meubles de cuisine",
    unit: "module",
    approved: false,
  },
  {
    id: "fixing",
    label: "Positionnement et fixation des meubles",
    unit: "module",
    approved: false,
  },
  {
    id: "worktop",
    label: "Installation du plan de travail",
    unit: "projet",
    approved: false,
  },
  {
    id: "cutting",
    label: "Découpes et ajustements du plan de travail",
    unit: "intervention",
    approved: false,
  },
  {
    id: "removal",
    label: "Dépose du mobilier existant",
    unit: "projet",
    approved: false,
  },
  {
    id: "hinges",
    label: "Réparation des portes et charnières",
    unit: "élément",
    approved: false,
  },
  {
    id: "drawers",
    label: "Réparation des tiroirs",
    unit: "élément",
    approved: false,
  },
  {
    id: "layout",
    label: "Modification de l’agencement",
    unit: "projet",
    approved: false,
  },
  {
    id: "complete",
    label: "Installation complète de cuisine",
    unit: "projet",
    approved: false,
  },
  {
    id: "design",
    label: "Conception de cuisine en 3D",
    unit: "projet",
    approved: false,
  },
];
export const approvedPricing = pricing.filter(
  (p) =>
    p.approved &&
    p.amount !== undefined &&
    Number.isFinite(p.amount) &&
    p.amount >= 0 &&
    (p.maximum === undefined || p.maximum >= p.amount),
);
