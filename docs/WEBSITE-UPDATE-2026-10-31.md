# ALBI RENO — website update, 31 October 2026

## Implemented

- Central contact email and form recipient: `albireno@icloud.com`. Removed the environment recipient override to prevent a stale address diverging from the visible contact details. All public pages inherit the new footer contact. Telephone and WhatsApp destinations unchanged.
- Google HTML-file ownership verification: `public/google4b9b87ef974dde9f.html`, containing exactly `google-site-verification: google4b9b87ef974dde9f.html`. This is the HTML-file method, not a meta-tag token. No additional meta tag was added. Preserve this file in future deployments.
- Project title: « Projet de cuisine — Conception & aménagement ». Description: « Étude de l’espace, conception 3D et optimisation de l’agencement pour une cuisine fonctionnelle et adaptée aux besoins du projet. » Removed public references to « projet personnel » and « cuisine personnelle » across homepage, portfolio, services, approach, legal text and image alt text.
- Preserved the distinction between photographs of the finished space and the Rochefort project’s 3D renders. No client installation reference added.
- Replaced both Rochefort images with supplied sharper screenshots, encoded as WebP (59,980 and 43,548 bytes). Versioned paths avoid stale optimized-image caches. Correct intrinsic dimensions and descriptive 3D alt text; removed the old zoom so the entire image fits without distortion. Existing frames and gallery controls retained; no source-image alterations.
- Homepage metadata now emphasizes installation and renovation of kitchens in La Rochelle while explicitly stating the activity is in preparation.
- Reduced repetition: the secondary seven-step process list is now a five-point 3D design checklist. The main « Comment ça marche ? » journey, layout, fonts and colors remain unchanged.

## Files changed

- `lib/business.ts`, `lib/site.ts`, `.env.example`: shared email and form recipient configuration.
- `lib/projects.ts`: title, description, project context and updated media references.
- `app/page.tsx`: homepage project label, SEO metadata and complementary 3D checklist.
- `app/[service]/page.tsx`, `app/notre-approche/page.tsx`, `app/realisations/page.tsx`, `app/mentions-legales/page.tsx`: consistent project wording.
- `app/globals.css`: only the existing 3D image fit rule changed.
- `public/images/projects/rochefort/cuisine-rochefort-v2-01.webp`, `cuisine-rochefort-v2-02.webp`, `public/images/asset-manifest.json`: optimized replacement assets and provenance.
- `public/google4b9b87ef974dde9f.html`: verification file.
- `docs/CLIENT-CHECKLIST.md`, this report: current contact and review results.

## SEO and release checks

- Existing policy retained: six approved public pages indexable on canonical production only; eight deliberately excluded pages (five unconfirmed service pages, Rochefort, legal and privacy) remain noindex. Local and preview hosts remain noindex.
- Robots permits crawling, blocks `/api/`, and advertises the sitemap on production. Sitemap includes only canonical indexable pages. No schema or commercial launch flag was enabled.
- Seven form branches plus mobile navigation and gallery interaction passed (nine flows). The first form run timed out during smooth scrolling; repeating the form checks under reduced motion passed. No message was sent.
- All 14 pages at four viewport widths (320, 390, 768, 1440px): 56 layout checks passed, with no missing images, overflow or browser errors.
- Unit tests: 17 passed. Build and TypeScript checks passed. No lint command/configuration is defined in this repository.
- Local smoke checks passed: 14 pages, 15 internal targets, 48 assets, unique titles/descriptions, AVIF negotiation, 404, social image, API validation and disabled-email response.
- All 14 pages checked for new mailto address and absence of old email/project wording; exact Google verification file returned HTTP 200 without redirect, with no duplicate verification tag.
- Rochefort gallery: 20 page/viewport combinations, 320–1440px, no horizontal overflow or browser errors; next/previous, Escape and focus restoration passed. No axe scan was performed in this run.

## Legal review: not a commercial-launch clearance

The official French company-search API returned an active EI with SIREN **131127979**, SIRET **13112797900014**, municipality **Lagord**, and main activity **62.01Z (computer programming)**. Personal name and street address are withheld in the public data. The existing owner-supplied identity/SIRET was retained; this public result does not establish registration, qualification or insurance for kitchen/construction work.

- Keep all preparation notices, no paid booking, no invented insurance or qualification claims.
- Owner must confirm the full professional/domiciliation address for the legal notice; the existing incomplete-address text is not a completed legal notice. The host’s published legal-contact telephone was added with its precise DMCA-agent context and source.
- Confirm the activity addition through the formalities portal, and the qualifications/insurance required for the actual scope with the CMA/insurer before offering paid work. Main APE alone neither authorizes nor exhaustively lists all activities.
- LocalBusiness markup deferred: an operating kitchen business and full legal address have not been verified. No address, hours, reviews, ratings, certifications or offers were invented.
- Automatic form email stays disabled. The existing form prepares a WhatsApp message for the visitor to review and send; photos are attached manually. Direct mailto links open the visitor’s mail app. Inbox ownership/delivery needs an owner-side check.

Sources reviewed 31 October 2026:

- [Official company search result](https://recherche-entreprises.api.gouv.fr/search?q=131127979&per_page=1)
- [Mandatory website notices](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr)
- [Building-business requirements](https://entreprendre.service-public.gouv.fr/vosdroits/F39041)
- [Micro-entrepreneur insurance](https://entreprendre.service-public.gouv.fr/vosdroits/F23667)
- [Vercel legal-contact phone](https://vercel.com/legal/dmca-policy)
- [Google ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en)

Owner confirmed on 31 October that kitchen activities have **not yet** been added. Preparation wording remains mandatory for this release; the legal address is still outstanding.

## Owner actions after release

1. Verify the new iCloud inbox can receive email.
2. In the Search Console URL-prefix property `https://www.albireno.fr/`, select HTML-file verification and click Verify. If using a Domain property instead, use its DNS TXT verification method; this HTML file does not verify a Domain property.
3. Submit `https://www.albireno.fr/sitemap.xml` and request indexing of approved public URLs using URL Inspection. Verification permits management; Google controls actual indexing.
4. Supply the legal address and confirm activity/qualification/insurance readiness before commercial launch or LocalBusiness activation.
