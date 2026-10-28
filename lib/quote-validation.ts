import { business } from "./business.ts";
import {
  needOptions,
  activeQuestions,
  questionError,
  timeframes,
  type Answer,
  type Need,
} from "./quote-flow.ts";
export type QuoteData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  needs: Need[];
  answers: Record<string, Answer>;
  timeframe: string;
  budget: string;
  comments: string;
  sourcing: string;
  consent: boolean;
  website: string;
  token: string;
};
export type FieldErrors = Record<string, string>;
export function validateQuote(input: unknown): {
  data: QuoteData;
  errors: FieldErrors;
  valid: boolean;
} {
  const raw =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const text = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const errors: FieldErrors = {};
  const rawNeeds = raw.needs;
  const needs = (
    Array.isArray(rawNeeds)
      ? rawNeeds.filter(
          (n) => typeof n === "string" && needOptions.some((o) => o.id === n),
        )
      : []
  ) as Need[];
  if (
    !Array.isArray(rawNeeds) ||
    !needs.length ||
    needs.length !== rawNeeds.length ||
    needs.length > 6 ||
    new Set(needs).size !== needs.length ||
    (needs.includes("autre") && needs.length > 1)
  )
    errors.needs = "Sélectionnez vos besoins ou « Je ne sais pas encore ».";
  const rawAnswers =
    raw.answers &&
    typeof raw.answers === "object" &&
    !Array.isArray(raw.answers)
      ? (raw.answers as Record<string, unknown>)
      : {};
  const answers: Record<string, Answer> = {};
  for (const q of activeQuestions(needs)) {
    const v = rawAnswers[q.id];
    const error = questionError(q, v);
    if (error) errors[q.id] = error;
    else if (typeof v === "string") answers[q.id] = v.trim();
    else if (Array.isArray(v)) answers[q.id] = v as string[];
  }
  const data: QuoteData = {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    city: text("city"),
    needs,
    answers,
    timeframe: text("timeframe"),
    budget: text("budget"),
    comments: text("comments"),
    sourcing: text("sourcing"),
    consent: raw.consent === true,
    website: text("website"),
    token: text("token"),
  };
  if (
    data.name.length < 2 ||
    data.name.length > 100 ||
    /[\r\n\x00-\x1F]/.test(data.name)
  )
    errors.name = "Indiquez votre nom et votre prénom (2 à 100 caractères).";
  const digits = data.phone.replace(/[^\d]/g, "");
  if (
    !/^[+\d\s().-]+$/.test(data.phone) ||
    digits.length < 9 ||
    digits.length > 15 ||
    data.phone.length > 30
  )
    errors.phone = "Indiquez un numéro de téléphone valide.";
  if (
    data.email.length > 254 ||
    !/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(data.email) ||
    /[\r\n]/.test(data.email)
  )
    errors.email = "Indiquez une adresse e-mail valide.";
  if (
    data.city.length < 2 ||
    data.city.length > 100 ||
    /[\r\n\x00-\x1F]/.test(data.city)
  )
    errors.city = "Indiquez la commune et, si possible, le code postal.";
  if (!timeframes.includes(data.timeframe))
    errors.timeframe = "Choisissez votre calendrier indicatif.";
  if (data.budget.length > 100 || /[\r\n\x00-\x1F]/.test(data.budget))
    errors.budget = "Limitez le budget indicatif à 100 caractères.";
  if (data.comments.length > 3000)
    errors.comments = "Limitez vos précisions à 3 000 caractères.";
  if (!["Oui", "Non", "À discuter"].includes(data.sourcing))
    errors.sourcing =
      "Précisez si vous souhaitez de l’aide pour choisir les meubles et les matériaux.";
  if (!data.consent)
    errors.consent =
      "Veuillez accepter le traitement de votre demande après lecture de la politique de confidentialité.";
  if (data.website) errors.website = "La demande n’a pas pu être validée.";
  if (data.token.length > 2048)
    errors.token = "Vérification anti-spam invalide.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
export function quoteMessage(data: QuoteData) {
  return `Bonjour ${business.name}, je souhaite vous parler de mon projet.\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nE-mail : ${data.email}\nLieu : ${data.city}\nBesoins : ${data.needs.map((n) => needOptions.find((o) => o.id === n)?.label).join(", ")}\n\n${activeQuestions(
    data.needs,
  )
    .filter((q) => data.answers[q.id]?.length)
    .map(
      (q) =>
        `${q.title}\n${Array.isArray(data.answers[q.id]) ? (data.answers[q.id] as string[]).join(", ") : data.answers[q.id]}`,
    )
    .join(
      "\n\n",
    )}\n\nCalendrier : ${data.timeframe}\nBudget indicatif : ${data.budget || "Non précisé"}\nAide au choix des meubles et des matériaux : ${data.sourcing}\nPrécisions : ${data.comments || "Aucune"}`;
}
