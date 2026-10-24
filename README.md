# Interior studio — local prototype

French renovation, installation and interior planning site. Brand placeholder: `NOM DE MARQUE`. Next.js App Router, React, TypeScript, CSS, locally served Manrope; no new dependencies added for the redesign.

```sh
npm ci
npm run dev
npm test
npm run build
npm run typecheck
npm run start
npm run test:smoke
```

Smoke checks require the local production server on port 3000 and disabled mail delivery. `npm run check:launch` is expected to fail until launch requirements are satisfied. Do not publish this prototype without the owner's approval.

- Brand, contacts and approval flags: `lib/business.ts`.
- Services and independent service routes: `lib/services.ts`, `app/[service]/page.tsx`.
- Portfolio kinds, photos and draft visibility: `lib/projects.ts`.
- Responsive photography: `components/project-image.tsx`.
- Service thumbnails: supplied AI illustrations, labelled as inspiration.
- Configuration: `.env.example`. Keep secrets out of Git.
- Audit, architecture and next phases: `docs/HANDOVER.md`.
- Launch blockers: `docs/CLIENT-CHECKLIST.md`.

The site stays noindex through metadata, HTTP headers, robots and an empty sitemap until all approval flags and the final domain are configured. This is an indexing safeguard, not access control. No production deployment has been made.

The basic enquiry form supports one primary category and a free-text description of additional needs. Without delivery credentials, it only prepares an encoded WhatsApp message. Nothing is sent automatically. Multi-service conditional steps, uploads and submission summary remain Phase 3 work.
