import { business } from "../lib/business.ts";
import { services } from "../lib/services.ts";
const errors = [];
let origin;
try {
  origin = new URL(process.env.SITE_URL);
} catch {
  errors.push("SITE_URL : domaine définitif HTTPS requis.");
}
if (
  origin &&
  (origin.protocol !== "https:" ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash ||
    /localhost|127\.0\.0\.1|vercel\.app$|chambre17\.com$/.test(origin.hostname))
)
  errors.push(
    "SITE_URL doit désigner uniquement le domaine définitif du client.",
  );
// WhatsApp preparation is an intentional supported delivery mode.
// Email requires explicit approval, provider configuration and receipt testing.
if (process.env.CONTACT_FORM_ENABLED === "true") {
  if (!business.emailDeliveryApproved)
    errors.push("Envoi e-mail : validation explicite et test de réception requis.");
  for (const name of ["CONTACT_FROM_EMAIL", "RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "NEXT_PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_HOSTNAMES"])
    if (!process.env[name]) errors.push(`${name} : à configurer pour l’envoi e-mail.`);
}
for (const key of ["legalName", "legalForm", "siret", "publicationDirector"])
  if (!business[key])
    errors.push(`Identité professionnelle : ${key} manquant.`);
for (const key of [
  "brandApproved",
  "legalApproved",
  "privacyApproved",
  "servicesApproved",
  "launchApproved",
])
  if (!business[key]) errors.push(`Validation requise : ${key}.`);
if (!services.some((s) => s.confirmed))
  errors.push("Confirmer au moins une prestation dans lib/services.ts.");
if (errors.length) {
  console.error(
    "Le lancement commercial reste bloqué :\n" +
      errors.map((e) => "• " + e).join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    "Configuration de lancement complète. Vérifier aussi le parcours WhatsApp (ou la réception e-mail si activée), DNS/HTTPS, données légales et accord du client.",
  );
}
