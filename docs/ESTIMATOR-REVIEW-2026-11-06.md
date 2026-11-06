# Installation estimator — local review, 6 November 2026

Owner approved publication to the existing unlisted `/testing` route on 6 November 2026. The checks below were completed before release. Production is verified separately after the GitHub push.

Review: http://127.0.0.1:3012/testing

## Result

The existing calculator uses all 33 owner-supplied labour prices. The original appearance and optional drawing tool are reused. Each cabinet row represents one physical cabinet with one exclusive type; editing its type replaces its price. Counts, decimal measurements, instant itemized totals, reset and separate quote-only work are supported.

The €150 minimum only fills the gap for priced installation work. It is never added again above the minimum and never applies to a free-design-only request. Empty estimates show no bill; specialist-only work remains “Sur devis”.

Free 3D copy includes one initial proposal and one reasonable revision for qualifying projects, with scope confirmed at the first exchange. Initial design is not charged. VAT status remains unknown: no HT/TTC label or VAT-exemption claim was added. Existing preparation notices remain; no paid bookings or immediate service availability were enabled.

## Requested sample kitchen

| Element | Calculation | Amount |
|---|---:|---:|
| Colonne avec tiroirs | 1 × 175 € | 175 € |
| Meubles bas 30–60 cm | 2 × 75 € | 150 € |
| Meuble pour îlot | 1 × 95 € | 95 € |
| Meubles hauts 30–60 cm | 3 × 65 € | 195 € |
| Plan stratifié | 3 m × 55 € | 165 € |
| Crédence stratifiée | 1,5 m² × 50 € | 75 € |
| Évier | 1 × 65 € | 65 € |
| Découpe évier | 1 × 50 € | 50 € |
| Robinet | 1 × 45 € | 45 € |
| Siphon / évacuation existante | 1 × 40 € | 40 € |
| **Total indicatif de main-d’œuvre** | **7 meubles** | **1 055 €** |

No minimum supplement applies to this sample.

## Quotation and privacy

The existing `/devis` form receives structured quantities/options in a URL fragment, without coordinates or files; the fragment is removed after parsing. The form and server validator recompute the itemized total from the canonical catalog. Client-supplied totals/rates cannot override prices. Invalid transfers block the handoff until removed. The summary is automatically included in the existing WhatsApp draft and the future email payload formatter. Email remains disabled; no environment credentials or integrations were activated. Photos/plans remain local references and must be attached separately in the visitor’s messaging app.

Reloading the quotation page after the fragment is cleared does not persist the estimate. Return to the calculator to attach it again. No persistent customer storage was introduced.

## Verification

- Website unit tests: **31 passed**, including exact catalog prices, sample arithmetic, minimum, free-only/quote-only cases, decimal precision, input limits, duplicate cabinet IDs, type replacement and tampered totals.
- Standalone source unit tests: **55 passed**; type-check passed. Historical optional-designer tests remain separate from the new calculator model.
- Website type-check and production build: **passed**.
- Standalone static export with webpack and TypeScript: **passed**; repeatable local export script verified.
- Existing website smoke checks: **passed** — 11 pages, 12 internal targets, 48 assets, image negotiation, preview noindex, 404 and API validation/fail-closed behavior.
- Browser checks: **passed** at 1440, 390 and 320 px; no horizontal overflow on calculator or quotation form. No browser errors or failed requests.
- Browser sample: 1 055 €, seven cabinet rows. Cabinet replacement/removal, invalid drafts, reset, free design, quote-only work, image reference and optional-designer navigation verified.
- Complete quotation handoff verified with WhatsApp intercepted. The itemized sample reached the draft. **No real enquiry was sent.** Future email formatter verified by unit test; actual email delivery was not enabled/tested.
- `/testing` and `/testing/planner` remain noindex and outside public navigation and sitemap.
- Visual desktop/mobile screenshots inspected. Existing fonts, colors and layout retained; new rules scoped to calculator or optional quote attachment.
- Neither project defines a lint command. `git diff --check` passed.

Evidence and screenshots (local, ignored): `docs/audit/estimator-final/results.json`, `calculator-1440.png`, `calculator-390.png`.

## Changed website files

Status: M modified, A/new untracked source or generated asset, D removed superseded generated asset.

- `M` `app/globals.css`
- `M` `app/politique-confidentialite/page.tsx`
- `M` `components/quote-form.tsx`
- `M` `docs/TESTING-PLANNER.md`
- `M` `lib/quote-validation.ts`
- `D` `public/testing/_next/static/6fFy1LXE6s0WiqReG0xKq/_buildManifest.js`
- `D` `public/testing/_next/static/6fFy1LXE6s0WiqReG0xKq/_ssgManifest.js`
- `D` `public/testing/_next/static/chunks/936-c36b59985f896d43.js`
- `D` `public/testing/_next/static/chunks/app/page-4a654279ccf0f1a1.js`
- `D` `public/testing/_next/static/chunks/app/planner/page-2f255eaf9296206d.js`
- `D` `public/testing/_next/static/css/2ca9c1625832be27.css`
- `M` `scripts/check-testing-planner.mjs`
- `M` `scripts/sync-testing-planner.mjs`
- `M` `testing-planner/index.html`
- `M` `testing-planner/manifest.json`
- `M` `testing-planner/planner.html`
- `??` `lib/kitchen-estimate.ts`
- `??` `public/testing/_next/static/4otTUzae1_Nku1abYdG-p/_buildManifest.js`
- `??` `public/testing/_next/static/4otTUzae1_Nku1abYdG-p/_ssgManifest.js`
- `??` `public/testing/_next/static/chunks/app/page-20d4c5899bcf8a0c.js`
- `??` `public/testing/_next/static/chunks/app/planner/page-11938ca1ce9ed431.js`
- `??` `public/testing/_next/static/css/3b94acbda3ceb987.css`
- `??` `scripts/build-testing-planner.mjs`
- `??` `tests/kitchen-estimate.test.ts`
- New review report: `docs/ESTIMATOR-REVIEW-2026-11-06.md`

## Changed standalone source files

- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/components/installation-estimator.tsx`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/lib/kitchen-estimate.ts`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/app/globals.css`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/tests/kitchen-estimate.test.ts`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/README.md`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/.env.local`

The ignored standalone `.env.local` only gained/updated `NEXT_PUBLIC_QUOTE_URL` for the existing local website form at port 3012. No production environment variable was changed. Generated asset changes are the rebuilt snapshot, not unrelated design edits.

## Remaining owner decisions

- Publication to `/testing` approved on 6 November 2026; retain the preparation restrictions.
- Confirm the applicable VAT regime before issuing final quotations; current estimate deliberately leaves it unclassified.
- Kitchen activity registration, insurance/qualifications and service-launch readiness remain outside this technical update. Existing preparation restrictions remain active.
