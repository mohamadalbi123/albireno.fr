/** Central brand/contact configuration. Future trade registration remains unverified. */
export const business = {
  name: "NOM DE MARQUE",
  tagline: "Du simple montage à la transformation complète de votre espace.",
  phone: "+33 7 63 73 43 72",
  email: "mohalbi123@icloud.com",
  whatsappNumber: "33763734372",
  whatsappDisplay: "+33 7 63 73 43 72",
  areas: ["La Rochelle", "Charente-Maritime"],
  legalName: "",
  legalForm: "",
  siret: "",
  publicationDirector: "",
  socialAccounts: [] as { name: string; url: string }[],
  brandApproved: false,
  legalApproved: false,
  privacyApproved: false,
  servicesApproved: false,
  launchApproved: false,
};
export const whatsappMessage =
  "Bonjour, je souhaite vous parler de mon projet d’aménagement intérieur.";
export function whatsappUrl(message = whatsappMessage) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
