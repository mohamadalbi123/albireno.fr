# ALBI RENO

**Installation et rénovation de cuisines** — La Rochelle & alentours.

Next.js / React / TypeScript application reused from the earlier local prototype. The owner purchased `albireno.fr`; The .fr domain and Vercel hosting now respond publicly. The visual update was approved for publication on 26 October 2026. The owner approved indexing of the preparation website on 28 October 2026. Automatic email and commercial launch remain subject to separate approvals. Intended final repository: https://github.com/mohamadalbi123/albireno.fr.git. Do not push or deploy until the site is finished and the owner approves.

```sh
npm ci
npm run dev
npm test
npm run build
npm run typecheck
npm run start
npm run test:smoke
```

Smoke checks target the production server on port 3000 with mail disabled. `check:launch` checks commercial readiness and intentionally fails until its outstanding business approvals are complete. Search visibility has its own explicit approval and production-only gate.

The separate local kitchen planner is not part of this repository or deployment. Its future route is reserved only as a disabled contract in `lib/future-integrations.ts`; `/simulateur-pose-cuisine` remains 404 with no public link.

## Configuration

- Brand, purchased domain, repository and contacts: `lib/business.ts`.
- Two core services (design and installation) and existing SEO routes: `lib/services.ts`.
- Three project choices: `lib/quote-flow.ts`; shared final validation: `lib/quote-validation.ts`.
- Future tariff metadata: `lib/pricing.ts`. No rates are published; the homepage explains installation cost factors.
- Portfolio/media roles: `lib/projects.ts`; the kitchen is personal and Lazoya is unpublished.
- Optional e-mail configuration: `.env.example`. No credentials in Git.

The short inquiry asks for a project type, French postcode, name, optional project text and at least one valid contact method (email or phone), plus consent. No file upload or technical inventory is presented. Without delivery approval/configuration it prepares a WhatsApp message which the visitor must review and send. Automatic email remains disabled; future delivery uses the existing sender and anti-spam setup and only confirms acceptance after a provider receipt. Phone-only requests do not send an empty reply-to. No actual mailbox delivery has been tested or enabled.

See `docs/HANDOVER.md` for implementation and verification status and `docs/CLIENT-CHECKLIST.md` for launch requirements. Indexing requires `business.indexingApproved`, `SITE_INDEXABLE=true`, the Vercel production environment and the canonical www domain. Unconfirmed services and legal/privacy pages retain noindex and stay outside the sitemap. Preview hosts and local environments stay noindex. See `docs/PRE-LAUNCH-AUDIT.md` for the latest live/source audit, local improvements and launch blockers.
