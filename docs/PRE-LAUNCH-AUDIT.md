# ALBI RENO — Pre-launch improvements and audit

Audit date: 26 October 2026 (Europe/Paris). Scope: existing Next.js website and `https://www.albireno.fr`. The owner approved publication of the tested visual update after this audit. The audit observations below record the pre-release state; indexing and automatic email still require separate approvals. This is a preparation review, not a declaration of professional/legal compliance or launch readiness.


## Latest image update — 26 October 2026

The owner requested substantially larger imagery and supplied `albireno_12_separate_images`. This update supersedes the earlier photography layout described below:

- All 12 supplied PNGs are only 374×331/332 concept crops. They were converted to WebP at their actual dimensions and integrated as supporting service illustrations; they are never stretched into full-width assets.
- Five new **1536×1024** AI-generated editorial images were created using those references: a warm oak kitchen, cabinet installation, small-space storage, hinge detail and a kitchen design desk. Prompts, provenance and saved asset paths are documented in `IMAGE-ASSETS.md` and `audit/generated-image-sources.json`.
- The homepage now has a full-width panoramic hero rather than a split portrait layout. On mobile the large photograph follows the headline, with contact actions below. All five service pages have full-width large relevant imagery; service cards also use the sharp editorial assets.
- Large generated images are visibly disclosed as AI inspiration, never completed ALBI RENO work. The two real personal photographs remain in the personal-project feature and portfolio. No generated images were added to the real-project gallery.
- The supplied before/after-style concept appears only as an explicitly imaginary comparison, not evidence of a renovation. The design-desk image is not claimed to be an actual HomeStyler export.
- Total asset inventory is now 46 files: two real personal photos, 27 older small inspirations, 12 new supplied concept crops and five generated editorial images. Real high-resolution professional evidence and the actual kitchen HomeStyler export remain outstanding.

The earlier test results below describe the preceding layout. The image-update verification is recorded in `IMAGE-ASSETS.md`; live deployment remains unchanged until release approval.

## Actual improvements

- Kept ALBI RENO, the descriptor immediately below it, the kitchen-specialist service structure, serif typography, warm surfaces and blue/grey identity. Slightly darkened secondary text within the existing palette to meet contrast requirements on beige backgrounds.
- Enlarged the real kitchen hero from roughly half the desktop grid to 59%, with a full-width portrait photograph on mobile. The caption sits below the photograph instead of hiding part of it. Preserved the local headline; shortened the introductory copy. Added explicit `Demander un devis`, WhatsApp and portfolio actions.
- Enlarged real photography on homepage service cards, the featured project, portfolio and all five service pages. Each service page now has an editorial photograph, explicit personal-project attribution, practical examples, service-specific preparation notes, related-service links and a quotation CTA.
- Used the two existing real photographs only as evidence of the **same personal kitchen**. Renovation examples are not presented as a before/after; repair imagery does not claim an actual client repair. The 3D service clearly distinguishes a photograph of the finished kitchen from a 3D render.
- Added a keyboard-accessible, responsive gallery: enlarge, previous/next, Escape, native modal focus containment and return of focus. Expanded the practical case-study narrative without inventing dimensions, costs, timescales or client work.
- Kept small generated illustrations within their original pixel dimensions, with plain French captions and clear AI disclosure. Fixed a small angle-storage image being stretched vertically. Added AVIF/WebP negotiation and an explicit high fetch priority for hero imagery; below-fold images remain lazy-loaded through Next Image, with responsive sizes and reserved aspect ratios.
- Made four quotation **phases** explicit while retaining the adaptive question screens and multiple-service selections. Clarified the WhatsApp/manual-photo handoff at the start and final action. Connected validation messages to fields, improved focus targets and added explicit telephone/email keyboard hints.
- Browser photo selection now also checks that each file can actually be decoded, not just its declared MIME type, and rejects images above 40 MP. Invalid selections can be removed so users can continue without photos. Server-side photo checking and metadata stripping remain in place for any future email path.
- Added `emailDeliveryApproved: false` and legal/privacy/service gates to prevent configuration alone activating unapproved automatic email. The launch checker now supports the existing WhatsApp preparation mode instead of incorrectly requiring email credentials for every launch.
- Added `vercel.json` with the Next.js framework preset to prevent a return to the earlier generic-framework 404 deployment.
- Added a reusable real-project authoring template in `docs/CASE-STUDY-TEMPLATE.md`.

## Technical SEO findings and changes

| Check | Observed live deployment | Local change / disposition |
| --- | --- | --- |
| Page availability | All 13 known pages HTTP 200; missing route HTTP 404 | Smoke and browser checks retained |
| Host redirect | Apex redirects 308 to `https://www.albireno.fr/` | Existing Vercel configuration is correct |
| Titles / H1 / language | French pages, unique titles, one H1 per page | Retained; improved service descriptions with service + La Rochelle + practical scope |
| Canonicals | No canonical link detected on live pages | Canonical defaults to the verified www production origin; validated overrides reject embedded credentials |
| Noindex | Live pages have meta and HTTP `noindex` | Intentionally retained pending legal, privacy, service and owner launch approvals |
| robots.txt | Live file blocks all crawling | Local file permits page crawling so bots can actually read noindex, blocks `/api/`, adds sitemap only on approved launch |
| Sitemap | Live file is valid XML with no URL entries | Preserved until approved launch; removed legal/privacy pages from the future sitemap because they are deliberately noindex |
| Social sharing | OG endpoint HTTP 200 | Canonical origin now also produces absolute social image URLs; existing branded image retained |
| Internal links | Service/footer/portfolio/quote links present | Added related services and a personal-project link to every service page |
| Images | Two 1200×1600 real assets; 27 very small AI crops | Measured actual files against manifest; improved sizes, aspect ratios and priority; no artificial upscaling |
| Structured data | No local-business markup in current draft | Minimal Organization JSON-LD prepared behind launch approvals. No ratings, reviews, opening hours, partnerships or physical shop invented |
| LocalBusiness / Service schema | Legal address and professional scope not confirmed | **Deferred**: verify business identity/address and confirm actual services before adding a LocalBusiness and linked Service entities |
| Search Console | Verification hook exists; ownership/access not provided | Owner must verify domain property, approve indexing, then submit sitemap and inspect canonical URLs |

Google requires access to the page to read `noindex`; a robots.txt block can hide that instruction. The local change permits crawling without enabling indexing. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Structured data must reflect real business facts; validation and public URL inspection remain launch tasks. [Google LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Quotation flow and data handling

Story: a visitor chooses one or more needs → answers only relevant questions → provides context and contact details → reviews the summary and privacy notice → prepares a WhatsApp link → decides whether to send the message in WhatsApp and manually attach photographs.

Current implementation does **not** submit a request automatically in WhatsApp mode. Data and selected photos remain in page memory; no local storage or database is used. Opening the WhatsApp link shares its encoded text with WhatsApp, but preparing it does not send a message. Navigating away/reloading loses the draft. Existing privacy copy describes that behavior. Contact links open the chosen telephone/email/WhatsApp application; account receipt and response are not tested by opening links.

The optional email endpoint is inactive and now also requires explicit source approval. It validates origin, JSON type, bounded body, all fields/consent/honeypot; checks Turnstile action/hostname; checks and re-encodes photos; and uses provider idempotency and timeouts. It is **not verified as delivered email**: no provider credentials, approved privacy text or recipient receipt test were supplied. Provider acceptance is not proof of inbox receipt. Do not enable the path until delivery, spam controls, retention and disclosures have been reviewed and approved.

## Image inventory and missing assets

Actual dimensions of all 29 assets were measured with Sharp and match `public/images/asset-manifest.json`.

| Asset | Available | Remaining need |
| --- | --- | --- |
| Personal kitchen photographs 01 / 02 | Two real 1200×1600 WebP images | Sufficient at current CSS sizes; larger originals (~2000–2400 px long edge or more) would improve large retina displays |
| Installation imagery | Generated crops 229–237 px wide; one 236×93 | Real high-resolution mounting, alignment and finished-work details with usage rights |
| Renovation imagery | Generated crops 194–236 px wide | Genuine documented existing/finished pairs from the same authorized project; never invent a transformation |
| Small-space solutions | Generated crops 139–240 px wide | Real wide view and detail shots showing corner/height storage, clear circulation and fittings |
| Repair imagery | Generated crops 126–173 px wide | Real close-ups of hinges, runners and cabinet adjustments; current crop remains a small illustration |
| 3D design | Generated crops 205–225 px wide | **Missing actual HomeStyler export/link for the personal kitchen**. Need approved plan and render, preferably ≥1600–2000 px wide |
| Worktop / craft / material details | Crops 90–155 px wide | Real close-ups with permission, ideally ≥1600 px wide |

The only HomeStyler URL in source belongs to unpublished Lazoya content. It was not assigned to the kitchen or published. No new stock images or AI-generated work were substituted for real projects.

## Launch blockers requiring owner decisions or information

1. **Legal identity and address**: confirm the recorded legal name/form/SIRET and provide the complete publishable professional address and applicable registration details. Existing source explicitly says that the full address is missing. No registry verification or silent identity edits were performed.
2. **Kitchen-related activity**: confirm the declared activities, exact permitted scope, any applicable professional qualification/authorization requirements and appropriate insurance with the relevant professional advisers. The current legal notice describes an IT activity and kitchen activity still in preparation. The site must not imply that this is already resolved.
3. **Hosting particulars**: live hosting is now Vercel, but the notice still says “hébergement prévu”. Confirm the host’s correct legal address/contact details before updating the notice; its current address was not silently replaced.
4. **Privacy completion**: approve the final notice, including hosting logs/processors, purposes/legal bases, recipients, handling of WhatsApp exchanges and photos, retention in the owner’s devices/mailboxes, transfers, rights and complaint process. Existing future-email placeholders must be completed before email activation. Any additional consent mechanism depends on actual tools used; no analytics were added.
5. **Commercial service approval**: all five services remain `confirmed: false`; rates remain “Sur devis”. Confirm scope and prerequisites before approving commercial availability. No new guarantee, qualification, insurance claim or booking/payment workflow was activated.
6. **Image rights and evidence**: approve public use of real photographs and provide missing true 3D materials and future authorized client case studies. Current portfolio remains explicitly personal.
7. **Indexing decision**: keep noindex until the above are resolved. Then set `SITE_URL=https://www.albireno.fr`, confirm approval flags and actual services, set `SITE_INDEXABLE=true`, run the launch checker, build and verify headers, canonicals, sitemap and Search Console. Do not remove draft protections just to improve an SEO score.
8. **Communication handoff**: manually test the actual WhatsApp destination and photo attachment on iOS/Android before launch. Tests here prepare but never send messages. Email is optional; enabling it needs separate approval and real receipt testing.
9. **Release approval**: review these local changes and approve a deployment. Recheck live pages and real-device behavior after release. No push or deployment was performed for this audit.

For legal-notice review, the official checklist includes the individual’s identity/contact/address and activity-dependent registration information. These missing facts need owner verification. [French Ministry of Economy checklist](https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter).

## Verification evidence

Live observations are saved in `docs/audit/live-results.json`; they describe the older deployed version, not these local changes. Browser screenshots and test results are in `docs/audit/`. Final test counts and performance measurements are recorded below after the verification run.

### Final verification results

| Check | Result |
| --- | --- |
| `npm run build` | PASS: production Next.js build, all routes generated/compiled |
| `npm run typecheck` | PASS |
| `npm test` | PASS: 12 tests covering validation, combined needs, stale answers, WhatsApp encoding and server photo processing |
| `npm run test:smoke` | PASS: 13 pages, 14 internal targets, all 29 assets, actual AVIF negotiation, unique titles/descriptions, canonical URLs, draft headers/robots/sitemap, 404/social image, API fail-closed cases |
| Chrome layout checks | PASS: 13 pages × 4 widths (320/390/768/1440) = 52 checks; no horizontal overflow or detected broken loaded images |
| Browser user journeys | PASS: all five service branches, combined five-service branch and undecided branch; multiple selections, required fields, back/edit navigation, corrupted-photo recovery, valid photo selection, consent and WhatsApp preparation |
| Mobile menu / gallery | PASS: open/close, Escape and focus restoration; gallery previous/next and native modal behavior |
| axe automated scans | PASS: 33 scans (13 pages at desktop/mobile + seven quote review states), zero WCAG A/AA violations detected after corrections |
| Browser errors | No page errors recorded during test |
| Mobile Lighthouse | Performance **96**, Accessibility **100**, Best Practices **100**, SEO **69** |
| Lighthouse lab metrics | LCP **2.69 s**, CLS **0**, TBT **35.5 ms**. LCP remains slightly above the 2.5 s “good” threshold in this simulated mobile run; scores vary with device/load |
| SEO score limitation | The remaining weighted failure is `is-crawlable` because the pages intentionally carry noindex. The draft restrictions were not removed to inflate the score |
| `npm run check:launch` | EXPECTED FAIL: explicit SITE_URL configuration, legal/privacy/service/launch approvals and service confirmations remain outstanding |
| Lint | No lint script/configuration exists in the project; no lint pass claimed. TypeScript and `git diff --check` pass |

The browser tests prepared WhatsApp URLs but did not open/send them, submit a real email, call the telephone number or write to an external service. The contact-link targets match the configured public contact details; ownership/receipt is not proven by a link test. The gallery and menu were tested with a keyboard in Chrome. Automated accessibility scans do not replace screen-reader, real-device or human usability review.

Core Web Vitals limitations: these are **local production-build lab measurements**, not field data from the live site. INP requires real interaction/field measurement; TBT is only a lab diagnostic, not a measured INP. Real-device Safari/Firefox, actual WhatsApp handoff, recipient email delivery and Search Console/Rich Results validation remain owner/release checks. No claim of universal accessibility or fully passed Core Web Vitals is made.

### Reproduction

Run `npm run build`, then `npm run start` in a separate terminal, followed by `npm run test:smoke`. For the optional browser harness, provide a locally installed Playwright package via `PLAYWRIGHT_PACKAGE` (its absolute package.json path), an installed Chrome executable via `CHROME_PATH`, and axe-core's `axe.min.js` via `AXE_SCRIPT`, then run `node scripts/audit-browser.mjs`. These tools were installed temporarily outside project dependencies; no new production package was added. Lighthouse JSON and screenshots are retained in `docs/audit/`.
