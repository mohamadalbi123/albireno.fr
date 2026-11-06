# Unlisted kitchen estimator

The existing `/testing` route hosts the installation calculator; `/testing/planner` remains the optional drawing tool. No new calculator page or public navigation entry was created. These are unlisted public links, not authenticated/private pages. The owner approved publishing the revised estimator to `/testing` on 6 November 2026.

## Pricing update — 5 November 2026

`lib/kitchen-estimate.ts` is the authoritative owner-supplied tariff catalog and calculation/validation module. A matching copy is held in the sibling standalone planner for local development. The export script always copies the canonical website module into the snapshot, so the calculator and quotation validator use the same rates.

- 11 exclusive cabinet types, 22 worktop/finish/appliance/accessory/removal prices.
- One ID and one type per physical cabinet. Changing a type replaces its price; no drawer or angle supplements. Add/remove physical cabinet rows individually.
- Quantities are bounded, finite and nonnegative; counts are integers, measurements accept two decimal places. Decimal comma supported. Invalid drafts block the total and quotation action.
- Minimum €150 only fills the gap for priced installation work. Empty estimates have no bill. Free design alone costs €0. Specialist-only requests remain “Sur devis”. Mixed requests explicitly exclude separately quoted work.
- Initial free 3D proposal plus one reasonable revision for qualifying projects; eligibility/scope confirmed at first exchange, no invented eligibility threshold.
- Fiscality is unconfirmed: no HT/TTC claim. Kitchen preparation notices remain. No insurance, qualification or availability claims introduced.
- Plan/photo reference remains in browser memory, with no automatic reading or automatic attachment transmission.
- Optional designer remains unpriced; legacy internal demonstration pricing is not used by this calculator.

## Existing quotation flow

“Recevoir mon devis personnalisé” opens the existing `/devis` form with the structured quantities/options in a URL fragment. No contact data or files are in that fragment, which is removed from the address after parsing. The form validates and recomputes prices and displays an itemized attachment. Invalid transfers block submission until removed. Customer comments remain separate. Removing the attachment leaves the ordinary inquiry form available.

WhatsApp is the currently available handoff: the visitor supplies contact details and consent, then opens the complete text to verify/send themselves. Automatic email remains disabled; its existing payload formatter also includes the validated estimate when enabled in the future. No external integration, credentials, advertising or public indexing configuration changed. A reload after the fragment is removed requires returning to the calculator to reattach the estimate; no persistent customer storage was added.

The standalone development app uses `NEXT_PUBLIC_QUOTE_URL` in its ignored local environment to point to `http://127.0.0.1:3012/devis`. The website snapshot uses `/devis`, on the same website origin.

## Isolation

The two testing route handlers bypass the main layout. Assets are under `public/testing/_next/`. HTML and HTTP headers remain noindex/nofollow, noarchive and no-referrer. No public nav/sitemap entry is added. Original drawing storage remains separate from the testing key `albireno-planner-testing-v1-projects`.

## Rebuild locally

```sh
node scripts/build-testing-planner.mjs '/path/to/AlbiReno Kitchen Planner'
npm test
npm run typecheck
npm run build
```

The build script stages source under `/private/tmp/albireno-testing-export`, exports with webpack and imports the snapshot. It does not deploy. Do not copy the standalone `.env.local` to the snapshot. The manifest records tariff version 2 and unconfirmed tax status.

Browser verification: `scripts/check-testing-planner.mjs` with `TEST_BASE_URL`, `PLAYWRIGHT_PACKAGE` and `CHROME_PATH`. WhatsApp navigation is intercepted; no real messages are sent. Screenshots/results are written to ignored `docs/audit/estimator-final/`.


## Visual catalogue redesign

The next local snapshot replaces all three input methods with one five-category illustrated catalogue. No plan upload, length-based cabinet inference, method tabs or drawing-tool link remains in the estimator. The separate optional drawing route is retained because it is independently referenced; its design and logic are not changed.

The presentation metadata in `lib/estimator-catalog.ts` reads every label, price and unit from the unchanged canonical `lib/kitchen-estimate.ts`. All 33 approved items remain, with no new rates. Unit cards use bounded +/− controls; metre and square-metre cards accept decimal measurements. Selection and invalid drafts persist across category changes. The summary offers item removal/reset and two existing-form handoffs (quotation or free 3D design).

Illustrations are original inline SVG, with no image downloads or heavy rendering dependency. New CSS is scoped under `.visual-estimator`; mobile uses two cards per row and an expandable fixed summary, while desktop uses a sticky itemized summary. Preparation notices, unknown tax status, €150 minimum and quote-only exclusions remain.

The owner approved publishing this redesign at the existing `/testing` URL. The route remains unlisted and noindex.
