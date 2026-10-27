# ALBI RENO typography review

Status: local preview only, held for the owner's review before deployment.

## Responsive scale

- Reading copy: 17.5px above 700px, 16.5px at 700px and below.
- Navigation, primary buttons and form controls: 16px.
- Supporting text: 15px desktop / 14.5px mobile.
- Captions: 14px desktop / 13.5px mobile.
- Section labels: 13px desktop / 12.5px mobile.
- Existing Manrope / Georgia families, heading scale, colors, editorial image proportions and section spacing retained. The logo lockup retains its compact descriptor.

The scale replaces isolated small pixel sizes across all page styles. Main paragraph text, service descriptions, project narratives, contact copy and legal content share the reading size. The navigation switches to the existing menu earlier, at 1050px, to avoid crowding the logo. Enquiry cards reflow when text is enlarged, and long legal contact links can wrap.

## Validation

- Production build, TypeScript and 12 unit tests passed.
- Smoke audit: 13 pages, 14 internal targets, 46 assets, AVIF negotiation, social image, 404 and API fail-closed behavior passed.
- Browser audit: 52 page layouts (13 pages at 1440, 768, 390 and 320px), mobile menu, gallery and seven enquiry branches passed; zero page errors and zero violations across 33 automated WCAG scans.
- Additional typography checks cover all 13 pages at 320, 390, 700, 768, 1024, 1051, 1100 and 1440px. All 104 layouts passed body-size, horizontal-overflow, clipped-text, header-overlap and retained-noindex checks.
- Enlarged-text checks cover all 13 pages at mobile and desktop widths with the root text size doubled. All 26 enlarged-text layouts passed after fixes for enquiry-card reflow and long email wrapping.
- Representative before/after screenshots are in ignored local evidence folder `docs/audit/typography/`.

## Preparation wording carried forward

The owner's preceding instructions are included in the preview: ALBI RENO's kitchen activity is in preparation; contact CTAs invite a conversation instead of requesting a paid quote; no paid service or intervention booking is offered. Legal wording identifies the same micro-entreprise as Chambre 17 and states the planned activities have not yet been added. No construction registration, qualification or insurance is claimed. Missing business information has not been invented.

No launch approval flags or indexing settings were enabled. No deployment or push was performed. The preceding audit report describes the earlier production release; this document records the subsequent local readability and preparation changes.
