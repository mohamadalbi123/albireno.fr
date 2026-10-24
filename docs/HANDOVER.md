# Audit and implementation — 24 October 2026

## Reused foundation

The existing app uses Next.js 16, React 19, strict TypeScript, plain CSS and local Manrope fonts. Retained the framework, lockfile, dependency versions, reusable buttons/headings/icons, responsive menu logic, quote validation, origin/body-size protection, Turnstile/Resend delivery scaffold, metadata helpers, robots/sitemap and Vercel-compatible build configuration. No new paid dependency or service was provisioned.

The initial uncommitted prototype was preserved as local Git commit `c5e5a69`. Redesign work is on `codex/interior-studio`; no remote push or deployment was performed.

## Architecture and routes

- `lib/business.ts`: brand placeholder, contacts, verified future approval flags. Existing digital registration is not treated as renovation registration.
- `lib/services.ts`: seven unique service definitions, six homepage entry points.
- `lib/projects.ts`: typed personal / own-business / client / concept / inspiration records; optional location, image roles, dimensions, service list, project details and external HomeStyler URL. Only published records generate pages.
- `components/project-image.tsx`: Next responsive image, fixed aspect ratio, meaningful alt; hero loaded eagerly, others lazily.
- `components/service-cards.tsx`: crawlable service and quote links; six supplied small AI thumbnails with visible labels.
- Header/footer/UI helpers reused with new typography and beige/brown/muted-blue tokens.
- `/`, seven service URLs from the brief, `/realisations`, `/realisations/cuisine-optimisee`, `/notre-approche`, `/devis`, `/contact`, `/mentions-legales`, `/politique-confidentialite`.
- `app/[service]/page.tsx`: static service routes; unknown slugs 404. Service-specific content and preparation guidance come from data.
- `app/realisations/[slug]/page.tsx`: published projects only. Lazoya deliberately returns 404.
- `/api/devis`: server validation, spam challenge and optional e-mail transport retained; disabled without configuration.

Old business identity, address, hours, Google profile, service copy and LocalBusiness schema removed. Obsolete pages/components removed rather than exposed with stale content. A verified LocalBusiness schema remains a future launch task.

## Media and HomeStyler

Both the original ZIP and extracted visual-library folder contain folders/README only. The later populated ZIP contains 17 AI illustrations and the same two personal kitchen photographs. AI assets are tiny crops (service images roughly 210–227 × 170 px); they are temporary and should not be enlarged into production hero photography.

The kitchen photographs were resized to 1200 × 1600 WebP with metadata stripped. They appear as a personal project, never a paid client case or before/after. Supplied illustrations were converted to WebP at their original dimensions; six are used as labelled service thumbnails. The others are retained in the media library for future approved use. Sources and classifications are recorded in `public/images/asset-manifest.json` and `public/images/README.md`.

The supplied HomeStyler URL was opened in the browser on 24 October 2026. The 3D scene rendered successfully with the visible title “Lazoya Centre de beauté Oct 2026 Final” and designer “Mohamad Albi”. Its URL is attached to the unpublished Lazoya record. No claim is made that it represents the kitchen. Embedding permission/support is not yet verified; no iframe is shipped. The portfolio template supports a clearly labelled external link when a project with a viewer is approved and published.

## Current functionality

Service links lead to individual pages; each quote link preselects the relevant category. The form validates name, phone, e-mail, city, category, description and consent. It prepares a WhatsApp URL and explicitly says no message has been sent. Opening that link passes the text to WhatsApp; the visitor must send it there. Invalid input is rejected. No file uploads, lead database or dashboard are provided yet.

## Remaining phases

1. Approve brand/domain, legal identity for the actual trade activities, service scope, relevant insurance, contractual terms and sourcing model; validate final legal/privacy pages and media permissions.
2. Replace low-resolution service illustrations with final approved photos or renders; add approved HomeStyler exports and real Lazoya photos/copy. Test embedding permissions and mobile viewer behavior before enabling it.
3. Build the guided multi-service quote wizard with conditional fields, property type/postcode, dimensions, timing, optional budget, 3D/sourcing requests and review summary. Define secure storage, upload validation and retention before adding photos.
4. Configure delivery and anti-spam credentials, verified sender domain/hostnames, and test actual delivery/receipt and failures end to end. Currently only disabled delivery and validation are tested.
5. Perform final launch accessibility/performance audits and external review. No Lighthouse/Core Web Vitals score or full assistive-technology certification is claimed.
6. Publish only after explicit approval. Repo remote retains its pre-existing name; no remote rename was performed.

## Verification results

Final local production build and TypeScript check passed. All six unit tests passed. HTTP smoke checks passed for all 15 pages and 16 internal targets, unique titles/descriptions, one H1 per page, French document language, noindex headers/robots/empty sitemap, social image, unknown-route 404 and unpublished Lazoya 404. API tests cover origin rejection, unsupported content type, malformed JSON, missing consent, spam field, oversized request and disabled-delivery 503.

Browser checks passed at 320, 390, 768 and 1440 px: no horizontal overflow after correcting mobile heading whitespace and using a single service-card column on narrow phones. Verified mobile menu opening/closing, service-to-quote category selection, six empty-field validation errors, prepared WhatsApp message with correct number/category, and invalidation of the prepared link after editing. No external message was sent. All six service thumbnails loaded and browser error/warning log was empty. Kitchen photography was visually inspected in desktop/tablet/mobile layouts.

Limitations: no enabled-email receipt test, no file upload system, no HomeStyler iframe verification, no full Lighthouse/Core Web Vitals or screen-reader audit. Public launch check intentionally fails while the required configuration/approvals remain absent.
