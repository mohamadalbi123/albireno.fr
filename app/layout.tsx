import {headers} from "next/headers";
import {LanguageProvider} from "@/components/language-context";
import {serverTranslation} from "@/lib/server-translation";
import {t,type Locale} from "@/lib/i18n";
import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "@/styles/languages.css";
import { ContactMeasurement } from "@/components/contact-measurement";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { business } from "@/lib/business";
import { commercialLaunchApproved, isIndexable, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: `${business.name} — Conception et installation de cuisines à La Rochelle`,
    template: `%s | ${business.name}`,
  },
  description: business.tagline,
  robots: { index: isIndexable, follow: isIndexable },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale=((await headers()).get("x-albireno-language")||"fr") as Locale;
  return (
    <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}>
      <body><LanguageProvider locale={locale}>
        <a className="skip-link" href="#contenu">
          {t("Aller au contenu",locale)}
        </a>
        {isIndexable && commercialLaunchApproved && siteUrl && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Organization",
            "@id": `${siteUrl}/#organization`, name: business.name, url: siteUrl,
            telephone: business.phone, email: business.email,
          }).replace(/</g, "\\u003c") }} />
        )}
        <ContactMeasurement />
        <Header />
        <main id="contenu">{children}</main>
        {serverTranslation(<Footer />,locale)}
      </LanguageProvider></body>
    </html>
  );
}
