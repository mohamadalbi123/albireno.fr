# AlbiReno — Local refinement before Google Ads

Local review URL: http://127.0.0.1:3011/ (website, separate from the standalone planner on port 3010).

## Changes

- Homepage: requested headline and supporting text; explicit direct purchasing/delivery with the supplier, no furniture supplied or delivered by AlbiReno. Installation CTA is “Demander un devis”, preselecting installation. Design remains independently accessible.
- Four-step journey: customer discussion → 3D → supplier order/delivery → future installation after technical review and agreed quote. Existing finalized plans can bypass design.
- Remote preparation: dimensions/photos allow an initial 3D study before the customer finalizes the supplier order, reducing unnecessary store appointments. Conditions are to be agreed; no free-design promise.
- Trust: the existing photographed kitchen section moves immediately after the journey, ahead of AI solution illustrations. Its label explicitly says real photographs and “Hors chantier client”. Rochefort remains a 3D project in progress. Images themselves are unchanged.
- Enquiries: unchanged short form, with one optional plan/photos status selector. The choice is validated server-side and included in the WhatsApp/email summary. No uploads or storage introduced. Email OR phone remains sufficient. Installation-only visitors no longer need to say they have already bought the kitchen.
- Shared CTAs/header/mobile navigation/service pages/contact/pricing use consistent installation enquiry wording. Existing contact details remain centralized in `lib/business.ts`.
- Metadata: homepage, installation and enquiry titles/descriptions focus on cuisine installation/pose at La Rochelle, with preparation status. Existing draft/noindex gates are preserved.
- Privacy copy explains the local event preparation. Other legal facts, SIRET, commercial readiness and service restrictions remain unchanged.

## Measurement preparation

`ContactMeasurement` installs one delegated click listener with cleanup. `trackContact` dispatches the browser CustomEvent `albireno:conversion`:

| event | method | meaning |
| --- | --- | --- |
| contact_click | phone, whatsapp, email | Business contact link activated; not proof of a call/message |
| inquiry_handoff | whatsapp | Validated enquiry handed to WhatsApp; not proof of sending |
| inquiry_submitted | email | Future enabled email API confirms `sent:true`; not inbox receipt |

Payload contains only event, method, pathname and (for enquiries) project_type. No names, contact fields, postcode, free text, files, query parameters or link URLs. No collector, cookie, localStorage, Google tag or outbound measurement request is installed. No events are persisted. Hosting-provider legal contact clicks are excluded. These events require an approved adapter/measurement setup before they can appear in Google reports.

## Verification

- `npm test`: 23 passing tests, including optional plan status and measurement privacy/failure isolation.
- `npm run typecheck` and `npm run build`: pass. No lint command is configured.
- Existing smoke: 11 pages, 12 internal targets, 48 assets, AVIF, canonical/metadata/noindex checks, verification HTML, redirects, API validation and disabled email fail-closed behavior.
- Browser layouts: all 55 page/viewport checks passed (11 pages at 1440, 1024, 768, 430 and 320px). The subsequent enquiry phase exposed a test focus race: it typed while validation was moving focus, leaving the name empty. The test now waits for validation focus. A final 320px page regression plus mobile navigation, all three enquiry types, email-only/phone-only and gallery passed with zero browser errors. See ignored `docs/audit/refinement/layout-run.log`, `docs/audit/refinement/final-regression.log` and `docs/audit/repositioning/browser-results.json`.
- Focused mobile contact checks: installation preselection, no event on invalid form, plan/photos included in intercepted WhatsApp handoff, distinct handoff event, phone/email/WhatsApp click events, no personal data or external tracking requests. WhatsApp/native application navigation intercepted; no real enquiries sent.
- Local production-build mobile diagnostic: simulated 1.6Mbps, 150ms latency and 4x CPU slowdown. Homepage LCP about 1.64s, CLS 0 in this single run. This is not production field data or a Google Ads readiness certification; subsequent routes reused the browser cache. Existing responsive AVIF/WebP images, dimensions, self-hosted fonts and image loading strategy retained; no new dependencies or CSS changes.
- Screenshots/logs remain ignored under `docs/audit/`.

## Approval and manual decisions

1. The owner approved production deployment on 5 November 2026 ("lets go live now"). Release through the existing GitHub/Vercel workflow; this approval does not enable paid services or advertising.
2. Paid installation remains unavailable. Confirm registration, appropriate insurance/qualifications where required, complete professional address and commercial readiness before any paid-service launch. Existing preparation notices remain.
3. Finalize design commercial conditions before advertising pricing or free design.
4. Before enabling Google Ads measurement: choose/provide the Google Ads/GA4 or GTM IDs, approve conversion definitions and the applicable consent/privacy setup. Do not count WhatsApp clicks as confirmed enquiries. Automatic email is still disabled pending its separate readiness/configuration approval.
5. Installation and conception pages retain their existing draft/noindex status. No indexing approval was inferred from this request and no ad campaign was created or launched.

## Files changed

Pages: `app/page.tsx`, `app/[service]/page.tsx`, `app/contact/page.tsx`, `app/devis/page.tsx`, `app/notre-approche/page.tsx`, `app/politique-confidentialite/page.tsx`, `app/layout.tsx`.

Shared UI: `components/header.tsx`, `components/ui.tsx`, `components/how-it-works.tsx`, `components/pricing-overview.tsx`, `components/quote-form.tsx`, new `components/contact-measurement.tsx`.

Data/measurement: `lib/services.ts`, `lib/quote-flow.ts`, `lib/quote-validation.ts`, new `lib/contact-events.ts`.

Validation: `scripts/audit-browser.mjs` (scoped installation CTA selector and navigation waits), new `scripts/check-contact-refinement.mjs`, new `tests/contact-events.test.ts`, `tests/quote-validation.test.ts` (updated enquiry label expectation), this report.
