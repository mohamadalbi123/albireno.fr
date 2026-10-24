# ALBI RENO

**Installation et rénovation de cuisines** — La Rochelle & alentours.

Next.js / React / TypeScript application reused from the earlier local prototype. The owner purchased `albireno.fr`; DNS, hosting and canonical activation have not been performed. Intended final repository: https://github.com/mohamadalbi123/albireno.fr.git. Do not push or deploy until the site is finished and the owner approves.

```sh
npm ci
npm run dev
npm test
npm run build
npm run typecheck
npm run start
npm run test:smoke
```

Smoke checks target the production server on port 3000 with mail disabled. `check:launch` intentionally fails until legal, privacy, service, domain and delivery configuration is complete.

## Configuration

- Brand, purchased domain, repository and contacts: `lib/business.ts`.
- Five kitchen services and SEO routes: `lib/services.ts`.
- Adaptive questions: `lib/quote-flow.ts`; shared final validation: `lib/quote-validation.ts`.
- Editable pricing: `lib/pricing.ts`. All rates unset/unapproved; public copy shows “Sur devis”.
- Portfolio/media roles: `lib/projects.ts`; the kitchen is personal and Lazoya is unpublished.
- Optional e-mail configuration: `.env.example`. No credentials in Git.

The enquiry combines multiple needs, asks relevant questions, collects optional photographs, and shows a review summary. Without delivery configuration it only prepares a WhatsApp message. Photos must be attached manually there. The email path supports in-memory validation/re-encoding and attachments, but real email receipt remains untested until configured.

See `docs/HANDOVER.md` for implementation and verification status and `docs/CLIENT-CHECKLIST.md` for launch requirements. The site remains local and noindex.
