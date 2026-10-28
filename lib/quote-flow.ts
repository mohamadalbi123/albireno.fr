export const needOptions = [
  {
    id: "installation",
    label: "Installer une cuisine",
    description: "Cuisine neuve, montage et pose",
    image: "/images/inspiration-kit/cabinet-installation.webp",
  },
  {
    id: "renovation",
    label: "Rénover ma cuisine",
    description: "Moderniser et conserver l’essentiel",
    image: "/images/inspiration-kit/modern-kitchen.webp",
  },
  {
    id: "optimisation",
    label: "Optimiser mon espace",
    description: "Petites surfaces, angles et rangements",
    image: "/images/inspiration-kit/small-kitchen-storage.webp",
  },
  {
    id: "reparation",
    label: "Réparer ou modifier",
    description: "Portes, tiroirs et ajustements",
    image: "/images/inspiration-kit/cabinet-hinge-repair.webp",
  },
  {
    id: "conception",
    label: "Concevoir en 3D",
    description: "Imaginer l’implantation avant les travaux",
    image: "/images/inspiration-kit/kitchen-3d-design.webp",
  },
  {
    id: "autre",
    label: "Je ne sais pas encore",
    description: "Racontez-nous votre idée",
    image: "",
  },
] as const;
export type Need = (typeof needOptions)[number]["id"];
export type Answer = string | string[];
export type Question = {
  id: string;
  need: Need;
  title: string;
  help?: string;
  type: "single" | "multiple" | "text";
  options?: string[];
  optional?: boolean;
  placeholder?: string;
};
export const questions: Question[] = [
  {
    id: "supplier",
    need: "installation",
    title: "Quelle cuisine souhaitez-vous installer ?",
    type: "single",
    options: [
      "Cuisine IKEA",
      "Cuisine Leroy Merlin",
      "Autre marque",
      "Je n’ai pas encore choisi",
    ],
    help: "Les marques nous aident à préparer l’étude. ALBI RENO n’est affiliée à aucune enseigne.",
  },
  {
    id: "layout",
    need: "installation",
    title: "Quelle est la configuration de votre cuisine ?",
    type: "single",
    options: [
      "Linéaire",
      "En L",
      "En U",
      "Avec îlot ou péninsule",
      "Je ne sais pas",
    ],
  },
  {
    id: "delivery",
    need: "installation",
    title: "Votre cuisine est-elle déjà livrée ?",
    type: "single",
    options: ["Oui", "Non", "En cours de commande"],
  },
  {
    id: "modules",
    need: "installation",
    title: "Combien de meubles souhaitez-vous installer et quel plan de travail prévoyez-vous ?",
    type: "text",
    optional: true,
    placeholder:
      "Ex. 6 meubles bas, 3 meubles hauts, plan de travail stratifié",
    help: "Indiquez les éléments à installer et les découpes envisagées si vous les connaissez.",
  },
  {
    id: "renovationChanges",
    need: "renovation",
    title: "Que souhaitez-vous changer ?",
    type: "multiple",
    options: [
      "Façades ou portes",
      "Plan de travail",
      "Rangements",
      "Agencement",
      "Finitions",
      "À définir ensemble",
    ],
  },
  {
    id: "condition",
    need: "renovation",
    title: "Dans quel état sont les meubles actuels ?",
    type: "single",
    options: [
      "Bon état, à moderniser",
      "Certains éléments abîmés",
      "Plusieurs éléments à remplacer",
      "À examiner ensemble",
    ],
  },
  {
    id: "problems",
    need: "optimisation",
    title: "Qu’est-ce qui complique l’utilisation de votre cuisine ?",
    type: "multiple",
    options: [
      "Peu de place",
      "Angles difficiles",
      "Tuyaux ou obstacles",
      "Manque de rangements",
      "Appareils mal placés",
      "Circulation peu pratique",
      "Autre contrainte",
    ],
  },
  {
    id: "dimensions",
    need: "optimisation",
    title: "Quelles sont les dimensions de l’espace ?",
    type: "text",
    optional: true,
    placeholder: "Longueur, largeur et hauteur approximatives",
    help: "Une estimation suffit à ce stade. Les cotes seront à vérifier.",
  },
  {
    id: "storage",
    need: "optimisation",
    title: "Quels rangements et changements imaginez-vous ?",
    type: "text",
    optional: true,
    placeholder:
      "Meubles à garder, objets à ranger, obstacles et changements souhaités…",
  },
  {
    id: "repairs",
    need: "reparation",
    title: "Quels éléments demandent une intervention ?",
    type: "multiple",
    options: [
      "Portes à régler",
      "Charnières à remplacer",
      "Tiroirs ou coulisses",
      "Meuble à ajuster",
      "Plan de travail à adapter",
      "Autre réparation",
    ],
  },
  {
    id: "repairDetails",
    need: "reparation",
    title: "Une référence ou un détail à nous transmettre ?",
    type: "text",
    optional: true,
    placeholder: "Marque, référence, nombre d’éléments et problème rencontré",
  },
  {
    id: "plans",
    need: "conception",
    title: "Avez-vous déjà des mesures ou un plan ?",
    type: "single",
    options: [
      "Un plan coté",
      "Des mesures approximatives",
      "Pas encore, un relevé est nécessaire",
    ],
  },
  {
    id: "designGoals",
    need: "conception",
    title: "Comment imaginez-vous votre future cuisine ?",
    type: "text",
    optional: true,
    placeholder: "Dimensions, ambiance, matières et priorités d’usage…",
  },
  {
    id: "general",
    need: "autre",
    title: "Qu’aimeriez-vous améliorer dans votre cuisine ?",
    type: "text",
    placeholder: "Décrivez votre situation et vos envies en quelques mots.",
  },
];
export const timeframes = [
  "Dès que possible",
  "Dans 1 à 3 mois",
  "Dans 3 à 6 mois",
  "Plus tard / à définir",
];
export function activeQuestions(needs: readonly string[]) {
  return questions.filter((q) => needs.includes(q.need));
}
export function questionError(q: Question, value: unknown): string | undefined {
  if (q.type === "text") {
    if (value === undefined || value === "")
      return q.optional ? undefined : "Décrivez votre besoin pour continuer.";
    if (
      typeof value !== "string" ||
      value.trim().length > 600 ||
      (!q.optional && value.trim().length < 10)
    )
      return "Réponse obligatoire : 10 à 600 caractères. Réponse facultative : 600 caractères maximum.";
  } else if (q.type === "single") {
    if (typeof value !== "string" || !q.options?.includes(value))
      return "Choisissez une réponse pour continuer.";
  } else if (
    !Array.isArray(value) ||
    !value.length ||
    value.length > q.options!.length ||
    value.some((v) => typeof v !== "string" || !q.options?.includes(v)) ||
    new Set(value).size !== value.length
  )
    return "Choisissez au moins une réponse valide.";
}
