# Unlisted kitchen planner

Owner authorized publishing a standalone testing copy at `/testing` on 5 November 2026. This is an unlisted, public-link sandbox, not authenticated or private. It is not the public estimator integration at `/simulateur-pose-cuisine`, which remains disabled and returns 404.

## Starting point

The entry page is the simple installation estimator, with quantity, total-cabinet-length and plan/photo-reference options. The drawing workspace is optional at `/testing/planner`. Automatic plan/image extraction is not connected; the upload control explicitly says this and keeps the document in browser memory. Rates remain fictional pending owner calibration. The length label explains that five 60 cm base cabinets occupy 3 m, excluding upper/tall units and room dimensions.

## Isolation and behavior

- `app/testing/route.ts` and its optional designer subroute emit the standalone HTML at build time, bypassing the main site's layout, CSS, navigation, footer and contact measurement component.
- Internal links use full document navigation between the two static HTML routes. No public-site layout is shared.
- Bundled client assets live under `public/testing/_next/`. No planner dependencies are added to the main website package.
- The response and asset prefix have `X-Robots-Tag: noindex, nofollow, noarchive`; standalone HTML also has a robots noindex/nofollow meta tag. It is omitted from navigation and sitemap. Crawling is allowed so crawlers can see noindex; this is not access control.
- The testing app uses its own browser key, `albireno-planner-testing-v1-projects`. Localhost saves are not automatically transferred to the online origin. No contact data is saved in project storage.
- No API, server submission, account, analytics provider, ad tag or real pricing is connected. Quote preparation is a client-memory-only preview. Fictional prices, technical exclusions and prototype notices remain.
- The source localhost planner and public website design remain separate. The online copy is a versioned static snapshot, not a live connection to localhost.

## Updating the snapshot

Build an isolated copy of the standalone planner with Next.js `output: 'export'`, `basePath: '/testing'` and the testing browser storage key. Keep its noindex metadata. The current snapshot was built with `next build --webpack`; its dependencies were reused from the local planner without changing that project.

Then import its export into this repository:

```sh
node scripts/sync-testing-planner.mjs /path/to/static/export
npm test
npm run build
npm run typecheck
```

The sync command requires the exported HTML to contain noindex and the `/testing/_next/static/` asset prefix. `testing-planner/manifest.json` records the snapshot HTML hash and storage/indexing contract. Deploy with the existing GitHub main → Vercel production workflow after checking the complete testing flow and existing public website.
