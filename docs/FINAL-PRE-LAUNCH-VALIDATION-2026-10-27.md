# ALBI RENO — Final pre-launch validation

**Date:** 27 October 2026, Europe/Paris  
**Live site:** https://www.albireno.fr/  
**Deployed version audited:** `4a7e5ba00077e156214c65c8124bf878fecda40f`  
**Scope:** final quality control, not a redesign. No brand, palette, typography, service, project or commercial-status change was made. Corrections listed below are local and have **not** been pushed/deployed by this audit.

## 1. PASS — What is ready

- All 13 published pages return HTTP 200. Genuine unknown routes return 404, including the deliberately unpublished Lazoya project.
- French titles and meta descriptions are present and unique across those 13 pages. Each rendered page has one H1; primary content uses H2 sections and H3 subsections/cards. The streamed quotation page’s headings were checked in a real browser, not only raw HTML.
- ALBI RENO and “Installation et rénovation de cuisines” remain together in the hero. Positioning covers installation/pose, renovation, repairs, furniture assembly, small-space organization and optional 3D design around La Rochelle. Nothing presents the company as a kitchen retailer; supplier references explicitly disclaim affiliation.
- HTTPS works, apex redirects to www, and canonical URLs use `https://www.albireno.fr`. No localhost or unrelated-domain canonical was detected.
- 39 distinct internal/contact/metadata targets were inventoried; internal routes and fragments have no broken targets. The two linked external websites, Vercel and Chambre17, return HTTP 200. Telephone/email/WhatsApp destinations match the configured public contact details.
- The 46 deployed image files are reachable and their hashes match the approved release. Actual dimensions match the asset manifest. Wide generated assets are 1536×1024, real personal photographs 1200×1600, supporting supplied crops 374×331/332 and deliberately capped in display size.
- The hero and service imagery remain large, relevant and sharp at the tested viewports. Aspect ratios reserve layout space; hero imagery is prioritized; lower images are lazy loaded. A direct deployed optimizer request returned a **1080×720 AVIF, 37,920 bytes, HTTP 200**.
- Real photography remains prominent in the personal-project feature and gallery, explicitly labeled **Projet personnel**. Generated illustrations retain clear inspiration disclosure and are not presented as client work. The concept comparison is explicitly not a real before/after. There are no invented reviews, ratings, certifications, opening hours or storefront claims.
- Chrome passed all five quotation service branches, the combined five-service branch and the undecided branch. Multiple selections, conditional questions, mandatory fields, consent, editing/back navigation, invalid-photo recovery and prepared-message invalidation work.
- The quotation has four **phases**, with several adaptive question screens inside the second phase. Final review prepares a WhatsApp URL; it does not claim receipt or send automatically. The text explicitly says no message/photo has been sent and that photos must be attached manually.
- The actual live API rejected six synthetic negative/disabled-delivery tests: bad origin 403, wrong content type 415, malformed JSON 400, absent consent 400, honeypot 400, and valid but email-disabled payload 503. No email was sent.
- Local production build, TypeScript and 12 existing unit tests pass. npm’s advisory audit reports **zero known vulnerabilities** across the installed dependency tree as checked today. This is not a penetration-test or blanket security certification.

## 2. FIXED — Verified issues and scope of corrections

| Severity | Finding | Correction | Release status |
| --- | --- | --- | --- |
| P2 | WebKit did not consistently restore focus to the photograph trigger after closing the modal gallery. Chrome’s native behavior had hidden this difference | Store the actual opening button and explicitly restore focus on the dialog’s close event | Local source correction; regression-tested before delivery |
| P2 | The header’s global Escape listener could focus the menu button even when the menu was closed, stealing focus from unrelated controls/dialogs | Handle Escape only while the mobile menu is open | Local source correction; closed-menu Escape regression check added |
| P3 | The legal notice says “Hébergement prévu” despite the deployed site already being hosted on Vercel | Changed only that wording to “Hébergement du site”; identity, SIRET, declared activity, address and insurance statements were preserved | Local, not deployed |
| P2 documentation/privacy completeness | The privacy notice explains in-page form preparation but omits the separate technical processing inherent in live hosting | Added a factual hosting/technical-data paragraph and a link to Vercel’s privacy notice; no retention period, lawful basis or owner practice was invented | Local, not deployed; the full privacy notice still needs owner approval |

The existing Vercel address matches its current official privacy notice. The hosting paragraph does not establish the owner’s broader privacy compliance. [Vercel privacy notice](https://vercel.com/legal/privacy-notice).

Audit tooling corrections were separate from product issues: the reusable browser audit now accepts a valid cached 304 response, waits for settled navigation to avoid errors caused by canceling prefetches, checks gallery focus restoration and verifies that Escape in a form does not invoke the closed menu. Identical duplicate generated `.next/types` files were removed after they produced a local duplicate-type error; TypeScript then passed. No source types were deleted or hidden.

## 3. NEEDS MY INPUT — Facts and decisions still missing

1. **Exact registered activity and scope.** Provide the current registration/extract and confirm which kitchen services may actually be offered. The notice still says the existing business activity is programming (APE 62.01Z) and kitchen activity is being prepared. This was not silently changed.
2. **Qualification and insurance.** Confirm the applicable requirements for the exact interventions, especially any electrical, gas, plumbing, construction/fixing or related work. Supply appropriate insurer/coverage details and confirm any construction/decennial obligations that apply to that scope. No blanket assumption that every furniture task has identical requirements was made. [Official building-business guidance](https://entreprendre.service-public.gouv.fr/vosdroits/F39041).
3. **Legal identity and complete professional address.** Confirm name, legal form, SIRET, registration details and publication information. The recorded SIRET has a valid 14-digit checksum, which is **not registry verification or proof of the registered trade**. The full publishable professional address is still missing; the host telephone/contact particulars also need completing as appropriate. [Current official website-notice checklist](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr).
4. **Privacy decisions.** Confirm purposes/legal bases, recipients/processors, retention for WhatsApp/email/customer photos and hosting data, transfers/safeguards, rights handling and CNIL complaint information. The current page is an accurate description of the draft workflow, not a completed privacy-compliance package. No fabricated retention term was inserted. [CNIL information requirements](https://www.cnil.fr/fr/informer-les-personnes).
5. **Consumer-facing terms.** Confirm the applicable quotation/pricing information (including whether estimates/travel are chargeable), accepted-work scope, contract/payment rules, any withdrawal/off-premises terms and an actual consumer mediator where applicable. Do not add a made-up mediator or insurance policy. [Consumer mediation](https://entreprendre.service-public.gouv.fr/vosdroits/F33338), [quotation requirements](https://entreprendre.service-public.gouv.fr/vosdroits/F31144?lang=fr).
6. **Evidence and media.** Confirm usage rights for the supplied project media. The actual personal-kitchen HomeStyler export/link is still absent. The only source HomeStyler link belongs to the unpublished Lazoya project and is not exposed as the kitchen’s plan. No additional project was invented.
7. **Launch/indexing approval.** After the legal/privacy/service facts are complete, confirm which services are public and authorize indexing. Current approval flags and `confirmed: false` services remain unchanged.
8. **Real-device/account handoff.** Confirm that the telephone number, email inbox and WhatsApp account belong to the intended recipient. Link targets and draft creation were tested; an actual phone call, inbox receipt or message transmission was not performed.

## 4. BLOCKERS — What prevents a proper launch

| Priority | Blocker | What resolves it |
| --- | --- | --- |
| P1 business/legal | Kitchen-related registration, scope, applicable qualifications and appropriate insurance are not confirmed | Owner evidence and professional confirmation for the actual scope |
| P1 legal/privacy | Complete professional identity/address and approved privacy/consumer information remain missing | Owner supplies facts and approves the final wording |
| P1 SEO launch | The deployed site deliberately returns noindex and an empty sitemap | Complete approvals first, then configure/approve indexing and confirmed services, rebuild and verify live responses |
| P2 release quality | Keyboard and wording corrections in this report are not yet deployed | Review and authorize publication of the prepared patch, then repeat the focused live checks |
| P3 validation gap | Firefox could not start in the available macOS headless runtime; physical iOS/Android app handoff was not tested | A successful Firefox/real-device check; this is an environment coverage gap, not evidence of a site defect |

A reachable website is not the same as a business authorized and prepared to take paid installation work. `noindex` does not make the public website private and does not replace legal prerequisites.

## 5. SEO — Actual deployed responses and measured performance

| Item | Live result |
| --- | --- |
| Public pages | 13 HTTP 200, unique French titles/descriptions, one rendered H1 each |
| Local positioning | La Rochelle/Charente-Maritime references match existing configured area; no new geographic claims or location-page expansion |
| HTTPS redirects | HTTP apex → HTTPS apex (308) → HTTPS www (308); HTTP www → HTTPS www (308) |
| Canonicals | Correct www HTTPS canonical per route |
| robots.txt | HTTP 200; `Allow: /`, `Disallow: /api/`; no blanket crawl block |
| Indexing | **All audited pages intentionally have meta noindex and `X-Robots-Tag: noindex, nofollow, noarchive`** |
| sitemap.xml | HTTP 200, well-formed XML, **zero URL entries while launch is unapproved** |
| Social metadata | Absolute OG page/image URLs, branded 1200×630 image endpoint HTTP 200, summary-large-image Twitter card |
| Structured data | No live JSON-LD while launch approvals are false. Minimal Organization markup is prepared in source behind those approvals. LocalBusiness/Service markup remains deferred until actual business facts are verified; no fake address/reviews/ratings |
| Search Console | Source supports a verification token; no HTML verification token was observed. DNS-based verification may exist, but account ownership/access was not available to verify it. Submit sitemap and inspect canonicals only after approved indexing |
| 404s | Unknown path and unpublished Lazoya route return genuine HTTP 404 |

These are deliberate draft restrictions, not accidental omissions to remove during this audit. Google must be allowed to fetch a page to see its noindex instruction; the deployed robots file permits that. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

### Fresh Lighthouse measurements against the deployed homepage

| Measurement | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | **97** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **69** | **69** |
| LCP | **2.3 s** | **0.4 s** |
| CLS | **0** | **0** |
| Total Blocking Time | **120 ms** | **0 ms** |

The weighted SEO failure is intentional non-indexability. Removing the launch safeguards merely to improve the score would be inappropriate.

These are fresh **lab results on the actual deployed homepage**, not estimates and not a guarantee across all pages/devices/networks. TBT is not INP. Real-user INP and the full field Core Web Vitals assessment remain **unverified**: the public PageSpeed API returned HTTP 429 / daily quota exhausted. Scores from the earlier local build were not reused as live measurements.

## 6. TESTS — Evidence and practical limits

- **Chrome/live:** 13 routes × 4 viewport widths (320, 390, 768, 1440) = **52 layout checks**; seven full quotation branches plus menu and gallery interactions; **33 axe scans**, zero detected WCAG A/AA violations; no page errors in that completed run.
- **WebKit/live:** all 52 layout checks completed; the gallery focus-restoration check exposed the P2 issue above. The harness stopped at that broken interaction rather than reporting a false full pass.
- **WebKit/local corrected build:** PASS — 52 layout checks at the same four widths, seven quotation branches plus menu/gallery flows, 33 axe scans with zero detected violations, zero recorded page errors. Gallery focus restoration and closed-menu Escape both pass. Settled navigation avoided the canceled-prefetch errors reproduced by rapid hard navigation in the first harness run. Native WebKit is a useful Safari-engine check, not a physical iPhone/iPad test.
- **Firefox:** installation succeeded, but the browser did not start: local sandbox/graphics initialization failed and the launch timed out. No Firefox website-pass claim is made.
- **Live HTTP:** page status, canonical/title/description/social metadata, heading data, security headers, internal paths/fragments, contact targets, external websites, robots/sitemap, redirects and 404s checked. All 46 raw image hashes match the deployed release; optimizer AVIF checked directly.
- **Security/API:** six safe synthetic rejection/disabled-delivery cases checked on the actual live endpoint. Origin, MIME/JSON, consent/honeypot and fail-closed email behavior passed. Existing server-side body bounds, image validation/re-encoding, Turnstile and provider controls were reviewed; real email delivery remains unconfigured/unapproved.
- **Credentials/dependencies:** 14 built client JS/map files scanned for common private-key/provider-token patterns; no matches and no server mail-secret variable names found in client output. Only `.env.example` is tracked among environment configuration files. npm advisory audit: zero known vulnerabilities. These checks are not exhaustive penetration testing.
- **Build/type/unit/smoke:** corrected production build passes; TypeScript passes after removing identical generated-cache duplicates; 12 unit tests pass; smoke checks pass for 13 pages, 14 internal targets, 46 assets, AVIF, draft SEO, social image, 404s and fail-closed API cases.
- **Lint:** no lint script/configuration exists, so no lint pass is claimed. `git diff --check` and browser-audit script syntax checks pass.
- **Launch checker:** intentionally fails for missing local explicit SITE_URL and legal/privacy/service/launch approvals plus service confirmations. This does not mean the deployed canonical is wrong; its actual response was verified.
- **Contact boundary:** correct `tel:+33763734372`, `mailto:mohalbi123@icloud.com` and WhatsApp recipient `33763734372` were verified. No call, email or WhatsApp message was sent. External application launch and recipient-account receipt depend on device/account setup and remain owner checks.

Machine-readable evidence and screenshots are retained locally in `docs/audit/final-2026-10-27/`; Chrome screenshots from the live audit are also in `docs/audit/`. Raw traces are ignored by Git. The source patch changes two focus behaviors, hosting wording, privacy hosting disclosure and test-harness reliability; it introduces no new customer feature.

## 7. FINAL VERDICT

**NOT READY for a full commercial and SEO launch.**

The deployed website is technically operational and performs well. Small, verified accessibility/documentation corrections have been prepared locally. The decisive launch blockers are the owner’s business/legal/privacy confirmations and the intentionally disabled indexing. Complete those facts and approve the prepared patch before calling the website fully launch-ready.
