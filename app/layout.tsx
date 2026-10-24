import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { business } from "@/lib/business";
import { isIndexable, siteUrl, contactPhone } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: "Luna Plâtrerie — Plaquiste à Aytré et La Rochelle",
    template: "%s | Luna Plâtrerie",
  },
  description:
    "Luna Plâtrerie, entreprise de plâtrerie à Aytré, près de La Rochelle. Parlons de votre projet intérieur et demandez un devis gratuit.",
  robots: { index: isIndexable, follow: isIndexable },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    ...(siteUrl ? { url: siteUrl } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      postalCode: business.postalCode,
      addressCountry: "FR",
    },
    ...(contactPhone ? { telephone: contactPhone } : {}),
    areaServed: business.areas.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      business.googleProfile,
      ...business.socialAccounts.map((s) => s.url),
    ],
  };
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
