# Large-image update — ALBI RENO

26 October 2026. The owner approved this visual update for publication after reviewing the local implementation. Results below describe the pre-release verification.

The owner's twelve supplied reference crops measure 374×331/332. To fulfil the request for significantly larger images without stretching those files, five new editorial images were created with the **built-in image_gen tool**. All five are 1536×1024, individually inspected, converted to WebP at source size and served through responsive Next Image with AVIF/WebP negotiation.

| Asset saved in workspace | Use |
| --- | --- |
| `public/images/editorial/kitchen-hero.webp` | Full-width homepage hero and renovation inspiration |
| `public/images/editorial/cabinet-installation.webp` | Large installation page image and service card |
| `public/images/editorial/small-kitchen-storage.webp` | Large optimization page image and service card |
| `public/images/editorial/cabinet-hinge-detail.webp` | Large repair page image and service card |
| `public/images/editorial/kitchen-design-study.webp` | Large 3D-conception page image and service card |

The new images are visibly labeled **Inspiration générée par IA**, never completed ALBI RENO projects. The design illustration is not claimed to be a real HomeStyler export. Original personal kitchen photographs remain in the personal-project feature/gallery.

All 12 supplied images are also integrated into supporting service illustrations, homepage storage details and quotation thumbnails, at a maximum display width of 374 pixels. The before/after-like illustration is explicitly a comparison of imagined ambiences, not a renovation reference. No source PNG was modified.

The homepage uses a wide, full-container hero on desktop and a large full-width portrait crop after the headline on mobile. All service pages have large, full-container editorial images. The palette, typography, service structure, legal gates and WhatsApp workflow are retained.

The complete prompt set is in [IMAGE-GENERATION-PROMPTS.md](IMAGE-GENERATION-PROMPTS.md); generated-source provenance is in `audit/generated-image-sources.json`. The exact inventory/dimensions are in `public/images/asset-manifest.json` (46 images). Authentic professional photography and the actual personal-kitchen HomeStyler export remain outstanding launch materials.

Verification results are appended after the final browser/performance checks.

## Final verification

- Production build, TypeScript, 12 unit tests and smoke checks pass. Smoke checks cover 13 pages, 14 internal targets, all 46 image assets and AVIF delivery.
- Browser checks pass at 320, 390, 768 and 1440 pixels: 52 layouts, seven quotation branches plus menu/gallery flows, no page errors. All 33 axe scans report zero automated accessibility violations.
- Mobile Lighthouse lab result after the large-image update: Performance 98, Accessibility 100, Best Practices 100, SEO 69. LCP 2.3 s, CLS 0, TBT 10 ms. The SEO score reflects deliberate noindex restrictions; these remain pending launch approval. Lab data is not real-user Core Web Vitals/INP evidence.
- Current screenshots: docs/audit/large-image-home-1440.jpg and large-image-home-390.jpg.
- The local preview was refreshed. No push or deployment was performed.
