# ALBI RENO — two-service repositioning, 3 November 2026

## Result

The website now positions ALBI RENO around exactly **Conception de cuisines** and **Installation de cuisines**, separately or together, for La Rochelle and surrounding areas. Existing typography, colors, portfolio photographs, AI illustration disclosures, layout system and responsive image handling are preserved. The local estimator is excluded from the repository and deployment.

## Pages and shared components

- Homepage: new « Conception et installation de cuisines à La Rochelle » headline and « Imaginez votre cuisine. Nous la concevons et l’installons. » supporting message. Two hero CTAs preselect design or installation in `/devis`. Exactly two prominent service cards with descriptions and features. The 3D section emphasizes a service performed by ALBI RENO, not a publicly available self-service tool. Pricing now explains five installation-cost factors without publishing arbitrary amounts or repair prices.
- Existing `/conception-cuisine-3d` and `/installation-cuisine-la-rochelle` routes retained with rewritten descriptions, SEO and complementary links. A finalized supplier plan may proceed directly to an installation inquiry.
- Customer journey: discuss → design when requested → customer orders directly → installation after readiness, technical verification and quotation acceptance. No supplier partnership or regulated-trade capability claimed.
- Navigation: Accueil, Conception, Installation, Réalisations, Contact, plus « Parler de mon projet ». Mobile menu, Escape handling and contact destinations retained.
- Footer: design/installation positioning, same email/telephone/WhatsApp/legal links and preparation notice. No social accounts invented.
- Portfolio: both genuine projects and all images preserved. The photographed project is labelled as outside client work; Rochefort remains an in-progress 3D project, not a completed installation.
- Contact, approach, Open Graph and root metadata aligned to the two services. Privacy copy updated to reflect the lack of file upload in the initial inquiry.

## Retired categories

General renovation, repair, maintenance/handyman work and standalone space optimization are no longer marketed as independent services. Optimization and fitting remain relevant design/installation details.

Old service routes redirect permanently (308):

- `/renovation-cuisine-la-rochelle` → `/installation-cuisine-la-rochelle`
- `/reparation-cuisine-la-rochelle` → `/installation-cuisine-la-rochelle`
- `/optimisation-petite-cuisine` → `/conception-cuisine-3d`

These routes were already excluded from indexing. Other canonical paths remain unchanged.

## Simplified inquiry and delivery

`/devis` is now a single form, with no intermediate screens, inventory, mandatory dimensions or repetitive confirmation:

1. Conception, installation or both (required; supports existing slug query parameters as well as the new CTA values).
2. French-format five-digit postcode, including inquiries outside La Rochelle.
3. Optional project description.
4. Name.
5. At least one valid contact method: email or phone. Neither forces the other; an invalid supplied optional value is still rejected.
6. Privacy acknowledgment and existing anti-spam safeguards.

No file upload is presented: automatic delivery/privacy approvals are not enabled and the existing image-only backend is not a verified public PDF upload channel. Photos/plans may be shared directly in the visitor’s email or WhatsApp application.

**Automatic email was disabled before this change and remains disabled.** No provider credentials, environment variables or launch flags were changed. The live form prepares a WhatsApp message, displays that nothing was sent and requires the visitor to open WhatsApp, review and send. Edits invalidate the prepared text. Submission reads the current form controls directly, avoiding reliance on a pending state update during fast interaction or autofill. Public inbox remains `albireno@icloud.com`; phone/WhatsApp remains `+33 7 63 73 43 72`. No test message was sent to the business.

The existing secure email endpoint remains available for a separately approved/configured future activation. Its sender, Turnstile, limits, photo validation, timeouts and idempotency handling were retained. Phone-only inquiries no longer create an empty reply-to. Email request formatting targets the correct inbox. A nonempty provider receipt and successful HTTP response are required before the backend returns `sent: true`; the UI requires that confirmation before showing an acceptance state. A provider receipt confirms acceptance by the sending service, not final inbox receipt.

Actual mailbox delivery has **not** been verified, because this path is intentionally disabled. To activate it later: complete business/privacy approvals, configure the existing provider/anti-spam settings and verify a controlled receipt. This release does not claim automatic submission delivery.

## SEO and business accuracy

- Homepage title, descriptions, Open Graph, navigation and internal links now focus on kitchen design and installation without keyword stuffing.
- Existing canonical HTTPS www host, robots, verification file and sitemap behavior retained.
- Six approved preparation-site pages remain indexable; five remaining intentionally excluded pages are the two unconfirmed services, Rochefort, legal and privacy. Sitemap contains six canonical URLs. The three retired service URLs redirect instead of becoming duplicate pages.
- Preview and local alternate hosts remain noindex. Google HTML verification file remains available unchanged.
- Structured business markup remains off because commercial readiness is unverified. No address, hours, reviews, qualifications or insurance were invented.
- Activity-in-preparation notices remain visible. Existing unregistered-activity/legal facts are preserved, including the outstanding full legal address. This release does not authorize paid work or bookings.

## Future estimator

`lib/future-integrations.ts` reserves `/simulateur-pose-cuisine` with `publicEnabled: false`. It creates no page, route import, public link or working-calculator claim. The URL intentionally returns 404.

The separate `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner` source/configuration was hashed before and after this work: **23 files unchanged**. It was not merged, built, committed or deployed as part of this website release.

## Validation

- 21 unit tests passed, including single-contact requests, postcode format/outside-area handling, stale questionnaire field removal, consent/spam/header checks, safe WhatsApp encoding and provider-receipt validation.
- TypeScript and optimized Next.js build passed. No lint command/configuration is present.
- Local smoke: 11 pages, 12 internal targets, 48 assets, AVIF negotiation, metadata uniqueness, canonicals, API validation/fail-closed behavior, retired-service redirects, estimator 404 and Google verification file.
- Local indexing: 6 indexable pages, 5 intentionally noindex pages, 6 sitemap entries; alternate hosts noindex; commercial schema and automatic email remain off.
- Browser: 55 page/viewport combinations across 1440, 1024, 768, 430 and 320 px. Two service cards, hero query parameters, four process steps, no file upload, no horizontal overflow and no browser errors.
- Inquiry flows: all three preselected types; required fields, email-only and phone-only contact, postcode outside La Rochelle, acknowledgment, WhatsApp preview and invalidation after editing.
- Mobile navigation and Escape; Rochefort gallery next/Escape preserved.
- Visual review corrected the inherited narrow paragraph width for the two service cards. No font, image or color redesign.

Detailed screenshots/browser logs are local, ignored files under `docs/audit/repositioning/`. Production status, commit and live-check results are provided in the delivery message.

## Files modified

Pages: `app/page.tsx`, `app/[service]/page.tsx`, `app/devis/page.tsx`, `app/contact/page.tsx`, `app/notre-approche/page.tsx`, `app/politique-confidentialite/page.tsx`, `app/layout.tsx`, `app/opengraph-image.tsx`.

Shared UI: `components/header.tsx`, `components/service-cards.tsx`, `components/how-it-works.tsx`, `components/pricing-overview.tsx`, `components/quote-form.tsx`, targeted additions in `app/globals.css`. Footer inherits the updated shared business description; its layout is unchanged.

Data/backend: `lib/business.ts`, `lib/services.ts`, `lib/inspiration.ts`, `lib/pricing.ts`, `lib/quote-flow.ts`, `lib/quote-validation.ts`, new `lib/quote-delivery.ts`, new `lib/future-integrations.ts`, `app/api/devis/route.ts`, `next.config.ts`.

Checks/docs: `tests/quote-validation.test.ts`, new `tests/quote-delivery.test.ts`, `scripts/audit-browser.mjs`, `scripts/smoke.mjs`, `scripts/check-indexing.mjs`, `README.md`, this report.
