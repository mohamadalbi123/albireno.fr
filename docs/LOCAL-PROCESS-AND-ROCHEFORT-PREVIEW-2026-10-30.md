# ALBI RENO — local process and Rochefort preview

The owner approved publication of the reviewed process section, step icons and Rochefort project on 30 October 2026.

## Comment ça marche ?

The existing generic three-step summary was replaced by a four-step server component directly after the services, before the portfolio feature. Existing fonts, typography tokens, colors and shared Button/Eyebrow/Icon components are reused. Inline SVGs and a reduced-motion-aware CSS hover effect add no client-side JavaScript or external assets.

The section covers measurements, a free first preliminary 3D concept, direct supplier selection/payment by the customer and installation under a separately accepted quote. Only the initial preliminary concept is described as free. The existing budget row, nearby 3D caption and dedicated 3D page were aligned with that scope to avoid contradicting it. No supplier affiliation is introduced. The explicitly requested preliminary concept is represented as an approved zero-cost design item; every other price remains unset and unapproved. Supplier examples do not imply affiliation. Plumbing, electrical and structural changes require assessment and separate quotation; no automatic inclusion or qualification is claimed.

The activity-in-preparation notice remains visible, and the steps are framed as the planned process for future projects. The CTA uses the existing `/contact` route. No business approval flags or live indexing settings were changed.

## Rochefort project

The owner confirmed Rochefort as the location. Both supplied JPGs are displayed as 3D design views of a project in progress, with no claim of completed installation, client status or design software. New local route: `/realisations/cuisine-rochefort`.

Full-size WebP copies preserve the complete 3440×1439 canvases, with compressed sizes around 57 KB and 79 KB. CSS frames the kitchen more closely in cards; the lightbox displays the full images. The existing finished personal kitchen remains the homepage feature. Its original context was moved into its project data so it is not incorrectly applied to the new project.

The new project is explicitly noindex and excluded from the sitemap. Its `published` field makes it visible in this local preview only; production publication has now been explicitly approved by the owner.

## Checks

- Next.js production build and TypeScript passed.
- All 17 existing unit tests passed.
- Smoke checks passed for 14 local pages, 15 internal targets and 48 image assets, including 404s and the fail-closed email endpoint.
- All 20 browser layout checks passed for the homepage, portfolio, existing personal project and new project at 1440, 1024, 768, 390 and 320px. They verify section position, four steps, three benefits, responsive columns, CTA navigation, reduced-motion behavior, image decoding and gallery navigation/Escape/focus restoration. No overflow or JavaScript errors were found.
- No stylesheet changes apply to existing photographic frames; the extra image framing is scoped to 3D design media.
- Automated axe scans were unavailable because the temporary axe-core installation from the previous session no longer exists; no fresh axe score is claimed.

## Step-icon refinement

On review, the owner requested a small photo or icon beside each step. Each heading now has a framed 48px icon badge: ruler, 3D cube, cart and kitchen cabinet. Headings, CTA and reduced-motion behavior were checked at 1440, 1024, 768, 390 and 320px, including heading clipping and page overflow. Build and type-check passed. These icon changes were approved for publication with the rest of the preview.
