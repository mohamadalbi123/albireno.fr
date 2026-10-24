import type { Metadata } from "next";
import { business } from "./business";
function canonicalOrigin() {
  const raw = process.env.SITE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}
export const siteUrl = canonicalOrigin();
export const isIndexable =
  business.brandApproved &&
  business.legalApproved &&
  business.privacyApproved &&
  business.servicesApproved &&
  business.launchApproved &&
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview" &&
  !!siteUrl &&
  !new URL(siteUrl).hostname.endsWith("vercel.app") &&
  !new URL(siteUrl).hostname.endsWith("chambre17.com");
export const isPreview = !isIndexable;
export const contactEmail = process.env.BUSINESS_EMAIL || business.email;
export const contactPhone = process.env.BUSINESS_PHONE || business.phone;
export const mailReady =
  process.env.CONTACT_FORM_ENABLED === "true" &&
  !!contactEmail &&
  !!process.env.CONTACT_FROM_EMAIL &&
  !!process.env.RESEND_API_KEY &&
  !!process.env.TURNSTILE_SECRET_KEY &&
  !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
  !!process.env.TURNSTILE_HOSTNAMES;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  draft = false,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}` } : undefined,
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
