/** Central brand/contact configuration. Future trade registration remains unverified. */
export const business = {
  name: "ALBI RENO",
  registeredDomain: "albireno.fr",
  repository: "https://github.com/mohamadalbi123/albireno.fr.git",
  descriptor: "Installation et rénovation de cuisines",
  tagline: "Installation et rénovation de cuisines",
  phone: "+33 7 63 73 43 72",
  email: "mohalbi123@icloud.com",
  whatsappNumber: "33763734372",
  whatsappDisplay: "+33 7 63 73 43 72",
  areas: ["La Rochelle", "Charente-Maritime"],
  legalName: "Mohamad Albi",
  legalForm: "Entrepreneur individuel — micro-entreprise",
  siret: "131 127 979 00014",
  publicationDirector: "Mohamad Albi",
  socialAccounts: [] as { name: string; url: string }[],
  brandApproved: true,
  legalApproved: false,
  privacyApproved: false,
  servicesApproved: false,
  launchApproved: false,
};
export const whatsappMessage =
  "Bonjour, je souhaite vous parler de mon projet de cuisine.";
export function whatsappUrl(message = whatsappMessage) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
