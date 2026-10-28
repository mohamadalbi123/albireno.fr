import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { business } from "@/lib/business";
import { commercialLaunchApproved, isIndexable, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: `${business.name} — Installation et rénovation de cuisines à La Rochelle`,
    template: `%s | ${business.name}`,
  },
  description: business.tagline,
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
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        {isIndexable && commercialLaunchApproved && siteUrl && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Organization",
            "@id": `${siteUrl}/#organization`, name: business.name, url: siteUrl,
            telephone: business.phone, email: business.email,
          }).replace(/</g, "\\u003c") }} />
        )}
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
