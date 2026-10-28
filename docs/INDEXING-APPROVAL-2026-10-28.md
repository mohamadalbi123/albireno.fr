# Owner-approved indexing of the preparation website

The owner explicitly approved Google indexing on 28 October 2026. This approval covers search visibility of the public preparation website and does not confirm trade registration, legal completeness, insurance, qualifications, paid service availability or automatic email delivery.

## Published indexing scope

Indexable on the canonical Vercel production host, https://www.albireno.fr:

- Homepage `/`
- Portfolio `/realisations`
- Personal project `/realisations/cuisine-optimisee`
- Approach `/notre-approche`
- Contact `/contact`
- Preparation form `/devis`

The five unconfirmed service pages and the legal/privacy pages retain their existing meta noindex directives and are excluded from the sitemap. Crawling stays allowed so search engines can read those directives. API crawling remains disallowed. The canonical sitemap contains exactly six URLs and is advertised in robots.txt.

## Independent approvals

`business.indexingApproved` records the owner's search-visibility approval. `SITE_INDEXABLE=true` and `SITE_URL=https://www.albireno.fr` apply only to the Vercel production environment. Preview, development, unapproved, malformed, non-HTTPS and other-host configurations fail closed. Existing noncanonical-host response headers continue to enforce noindex.

Legal, privacy, services, commercial launch and email-delivery approvals remain false. The preparation copy and all business facts are unchanged. Organization schema stays disabled until the independent commercial readiness flags are satisfied. `check:launch` continues to check commercial readiness; enabling search visibility alone does not make that check pass.

## Verification

- All 17 unit tests passed, including five indexing-policy tests covering independent approval, environment and canonical-origin gates.
- TypeScript and the production Next.js build passed.
- `node scripts/check-indexing.mjs` verified all 13 pages, six sitemap entries, the robots sitemap reference, canonical-host indexing and alternate-host noindex against the local production build. It also verified preparation wording, disabled business schema and the existing disabled automatic-email response.
- The smoke script now supports `EXPECT_INDEXABLE=true`; its default continues to expect a local preview with noindex.
- Search engines choose when to crawl and index; these settings permit indexing and do not establish that Google has already indexed the site.
