/** Single source of truth. Empty values are deliberately not invented. */
export const business = {
  name: "Luna Plâtrerie",
  address: "2 Place Suzanne Lenglen",
  postalCode: "17440",
  city: "Aytré",
  country: "France",
  whatsappNumber: "33781844419",
  whatsappDisplay: "+33 7 81 84 44 19",
  googleProfile: "https://share.google/UvuHCdw4BZwyBk48M",
  hours: "Du lundi au samedi, de 8h à 18h",
  areas: ["Aytré", "La Rochelle"],
  legalName: "",
  legalForm: "",
  siret: "",
  vat: "",
  publicationDirector: "",
  insurance: "",
  founder: "",
  experience: "",
  qualifications: "",
  // Add only accounts confirmed to belong to this business.
  socialAccounts: [] as { name: string; url: string }[],
  legalApproved: false,
  privacyApproved: false,
  servicesApproved: false,
};
export const whatsappMessage =
  "Bonjour, je souhaite obtenir des renseignements concernant un projet de travaux.";
export function whatsappUrl(message = whatsappMessage) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
