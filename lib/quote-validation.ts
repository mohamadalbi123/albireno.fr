export const workTypes = [
  "Montage de meubles",
  "Rénovation intérieure",
  "Installation de cuisine",
  "Conception 3D",
  "Mobilier sur mesure",
  "Locaux professionnels",
  "Bricolage",
  "Plusieurs services / à préciser",
];
export type QuoteData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  workType: string;
  description: string;
  consent: boolean;
  website: string;
  token: string;
};
export type FieldErrors = Partial<Record<keyof QuoteData, string>>;
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
  const data: QuoteData = {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    city: text("city"),
    workType: text("workType"),
    description: text("description"),
    consent: raw.consent === true,
    website: text("website"),
    token: text("token"),
  };
  const errors: FieldErrors = {};
  if (
    data.name.length < 2 ||
    data.name.length > 100 ||
    /[\r\n\x00-\x1F]/.test(data.name)
  )
    errors.name = "Indiquez votre nom et prénom (2 à 100 caractères).";
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
    errors.city = "Indiquez la ville de votre projet (2 à 100 caractères).";
  if (!workTypes.includes(data.workType))
    errors.workType = "Choisissez le type de votre demande.";
  if (data.description.length < 20 || data.description.length > 5000)
    errors.description = "Décrivez votre projet en 20 à 5 000 caractères.";
  if (!data.consent)
    errors.consent =
      "Veuillez prendre connaissance de la politique de confidentialité et accepter le traitement de votre demande.";
  if (data.website) errors.website = "La demande n’a pas pu être validée.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
export function quoteMessage(data: QuoteData) {
  return `Bonjour, je souhaite obtenir un devis gratuit.\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nE-mail : ${data.email}\nVille du projet : ${data.city}\nType : ${data.workType}\n\n${data.description}`;
}
