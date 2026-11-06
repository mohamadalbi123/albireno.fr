# Visual estimator redesign — local review

Owner approved publishing the redesigned catalogue to the existing `/testing` route. The checks below were completed locally before release; live verification follows the GitHub push.

Preview: http://127.0.0.1:3012/testing

## Changes

- Replaced the three input methods, cabinet type dropdowns and plan upload reference with one illustrated catalogue.
- Five category buttons: Meubles bas, Meubles hauts, Colonnes, Électroménager, Finitions et équipements. All 33 existing priced items remain.
- Original lightweight inline SVG illustrations, no photographs, image generation service, 3D rendering or new dependency.
- +/− controls for unit quantities, decimal metre/m² inputs for measurements, clear selection styling and retained selections when switching categories.
- Desktop sticky itemized summary; mobile expandable bottom summary, item removal/reset, and 44px quantity buttons. Two cards per row at mobile widths tested.
- Two actions reuse the existing quotation form: “Demander un devis personnalisé” and “Demander une conception 3D gratuite”. Selected items/measurements and the computed total travel through the existing validated handoff. Free design alone has no installation minimum.
- Existing preparation notices, VAT uncertainty and exclusions remain. Paid bookings and automatic email delivery remain disabled.
- Main public pages and shared contact form were not modified for this redesign. `/testing` remains noindex and excluded from navigation/sitemap. The separate optional designer route remains available; its logic was not changed. New catalogue styles are scoped to `.visual-estimator`.

## Pricing and decisions

`lib/kitchen-estimate.ts` is **unchanged**. The presentation metadata imports its labels, units and prices, rather than storing a duplicate tariff list. €150 minimum rules remain unchanged. One cabinet selection is one physical cabinet, with no drawer/angle supplements. A cabinet/column and the appliance installed in it are separately identified labour operations; no appliance or connection is added automatically. Sink/hob cutouts are also separate explicit selections.

All 33 currently supported items have an approved price. No new prices or automatic aliases were invented for the additional examples in the brief. Base oven cabinets, lift-up wall cabinets, wall corner cabinets and dedicated refrigerator columns are not separately priced in the existing catalog. Separate variants for oven-only versus oven-and-microwave columns likewise need confirmation if distinct product cards/rates are wanted; the existing “Colonne four / micro-ondes” remains at 180 €. These examples have not been added as invented priced offerings.

## Scenario calculations

For scenarios A/B, “standard” means the existing 30–60 cm base/wall categories. All figures are indicative installation labour, with no HT/TTC classification inferred.

| Scenario | Cabinet subtotal | Other labour | Total |
|---|---:|---:|---:|
| A — small kitchen | 440 € | 270 € | **710 €** |
| B — family kitchen | 835 € | 505 € | **1 340 €** |
| C — defined island kitchen | 785 € | 842,50 € | **1 627,50 €** |

A: 3 × base 75 €, 2 × wall 65 €, 1 × sink cabinet 85 €, oven 55 €, hob 50 €, 3 m laminate top × 55 €.

B: 4 × base 75 €, 2 × drawer base 95 €, 3 × wall 65 €, standard tall 150 €, dishwasher 85 €, oven 55 €, hood 90 €, 5 m laminate top × 55 €.

C (the brief did not specify quantities): 3 × base 75 €, 2 × drawer base 95 €, oven/microwave column 180 €, 2 × island 95 €; oven 55 €, microwave 45 €, hob 50 €, dishwasher 85 €; 4,5 m laminate top × 55 €, 1,5 m² backsplash × 50 €, 4 m plinth × 15 €, 2 finishing panels × 30 €, one sink cutout 50 €, one hob cutout 50 €, one angle joint 65 €.

All totals exceed 150 €: no minimum supplement is added. Unit and browser tests additionally cover one small item reaching the minimum, zero selections, free design alone, quote-only work, decimals, invalid measurements and cabinet removal.

## Verification

- Website: **36 unit tests passed**; type-check and production build passed.
- Standalone source: **60 unit tests passed**; type-check passed. Static export and TypeScript build passed.
- Browser: all A/B/C totals matched the unit tests. Category switches preserve selections; invalid drafts remain blocked across switches. Quote transfer and the full WhatsApp message were verified with navigation intercepted: no real enquiry sent. The free-design-only request carries 0 € and the conception flag.
- Responsive checks: **1440, 768, 390 and 320 px**, all five categories; no horizontal overflow. Two cards per row on mobile and 44px +/− controls verified. Mobile summary opens/closes and the form fits mobile.
- Existing smoke checks: 11 pages, 12 internal targets and 48 assets passed, including image formats, metadata/noindex, 404 and API fail-closed behaviour.
- No browser errors or failed requests. Desktop/mobile screenshots visually inspected.
- No lint command is defined in either project. `git diff --check` passed.

Local evidence (ignored): `docs/audit/visual-estimator/results.json`, `catalog-1440.png`, `catalog-390.png`.

## Website files changed

- `M` `docs/TESTING-PLANNER.md`
- `D` `public/testing/_next/static/4otTUzae1_Nku1abYdG-p/_buildManifest.js`
- `D` `public/testing/_next/static/4otTUzae1_Nku1abYdG-p/_ssgManifest.js`
- `D` `public/testing/_next/static/chunks/app/page-20d4c5899bcf8a0c.js`
- `D` `public/testing/_next/static/chunks/app/planner/page-11938ca1ce9ed431.js`
- `D` `public/testing/_next/static/css/3b94acbda3ceb987.css`
- `M` `scripts/build-testing-planner.mjs`
- `M` `scripts/check-testing-planner.mjs`
- `M` `scripts/sync-testing-planner.mjs`
- `M` `testing-planner/index.html`
- `M` `testing-planner/manifest.json`
- `M` `testing-planner/planner.html`
- `??` `lib/estimator-catalog.ts`
- `??` `public/testing/_next/static/chunks/app/page-6ea4f6012e3f0ad3.js`
- `??` `public/testing/_next/static/chunks/app/planner/page-39fcb2c31d3c7bda.js`
- `??` `public/testing/_next/static/css/1433935a3f000ebb.css`
- `??` `public/testing/_next/static/glf8LMK4ynvLnRPDB16KP/_buildManifest.js`
- `??` `public/testing/_next/static/glf8LMK4ynvLnRPDB16KP/_ssgManifest.js`
- `??` `tests/estimator-catalog.test.ts`
- New review report: `docs/VISUAL-ESTIMATOR-REVIEW-2026-11-06.md`

## Standalone source files changed

- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/components/installation-estimator.tsx`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/components/catalog-illustration.tsx`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/lib/estimator-catalog.ts`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/app/globals.css`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/tests/estimator-catalog.test.ts`
- `/Users/mohamadalbi/Documents/ChatGPT/AlbiReno Kitchen Planner/README.md`

Generated asset additions/removals are the refreshed static snapshot. No prices, business details, production environment variables or public indexing settings changed.
