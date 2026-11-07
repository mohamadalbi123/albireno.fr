import {canSendContact} from "./mail-readiness";
import {publicLanguagePaths,languageUrls} from "./language-routes";
import type { Metadata } from "next";
import { business } from "./business";
import { canIndexSite } from "./indexing-policy";
function canonicalOrigin() {
  const raw = process.env.SITE_URL || "https://www.albireno.fr";
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      !url.username && !url.password
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}
export const siteUrl = canonicalOrigin();
export const commercialLaunchApproved =
  business.brandApproved &&
  business.legalApproved &&
  business.privacyApproved &&
  business.servicesApproved &&
  business.launchApproved;
export const isIndexable = canIndexSite({
  ownerApproved: business.indexingApproved,
  enabled: process.env.SITE_INDEXABLE === "true",
  environment: process.env.VERCEL_ENV,
  siteUrl,
  registeredDomain: business.registeredDomain,
});
export const isPreview = !isIndexable;
// Keep the form recipient aligned with the public contact details.
export const contactEmail = business.email;
export const contactPhone = process.env.BUSINESS_PHONE || business.phone;
// Explicit contact-form enablement plus all required technical credentials.
// Commercial launch/insurance flags do not authorise or block a non-binding enquiry.
export const mailReady = canSendContact({enabled:process.env.CONTACT_FORM_ENABLED,from:process.env.CONTACT_FROM_EMAIL,resendKey:process.env.RESEND_API_KEY,turnstileSecret:process.env.TURNSTILE_SECRET_KEY,siteKey:process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,hosts:process.env.TURNSTILE_HOSTNAMES});
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  draft = false,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}`, ...(!draft&&publicLanguagePaths.includes(path)?{languages:languageUrls(path,siteUrl)}:{}) } : undefined,
    robots: { index: isIndexable && !draft, follow: isIndexable && !draft },
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      locale: "fr_FR",
      type: "website",
      siteName: business.name,
      ...(siteUrl
        ? {
            url: `${siteUrl}${path}`,
            images: [
              {
                url: `${siteUrl}/opengraph-image`,
                width: 1200,
                height: 630,
                alt: `${business.name} — Cuisines à La Rochelle`,
              },
            ],
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
