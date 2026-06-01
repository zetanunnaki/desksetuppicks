# DeskSetupPicks — SEO Action Plan

Prioritized. Items 1–4 are being implemented now in this session.

## 🔴 Critical / High (do now)

1. **Product + Review + ItemList schema on review pages** *(implementing)*
   - Per product: `Product` { name, image, description, `review`: { `@type`: Review, `reviewRating` = curated rating, author = DeskSetupPicks }, `offers`: { price from `amazonPrice`, availability, url } }.
   - Wrap the category's products in an `ItemList` (rank order).
   - Use **editorial `Review`** (not `aggregateRating`) — compliant, since ratings are our editorial scores, not aggregated user reviews.

2. **Canonical URLs on every page** *(implementing)*
   - `alternates.canonical` per route, absolute + trailing slash (e.g. `https://desksetuppicks.com/reviews/standing-desks/`).

3. **Fix duplicated title suffix** *(implementing)*
   - `metaTitle` values in `categories.json` / `guides.json` end in `| DeskSetupPicks`, then the layout template adds `| DeskSetupPicks` again. Strip the suffix from the data (let the template own it), or set `title.absolute`.

4. **Organization + WebSite + BreadcrumbList schema** *(implementing)*
   - `Organization` + `WebSite` (with `potentialAction` SearchAction) injected site-wide via layout.
   - `BreadcrumbList` on review / guide / blog detail pages (markup the breadcrumb that already renders).

## 🟡 Medium (next)

5. Homepage `ItemList`/`CollectionPage` linking the 20 categories.
6. `app/sitemap.ts` (replace build script) so new routes auto-include; add `app/manifest.ts`.
7. `llms.txt` at site root for AI-search citability.
8. Per-page OG images for top categories (currently one default OG image).

## ⚪ Low (backlog)

9. Self-host / preconnect Amazon image domain; consider width/height on `<img>` to lock CLS.
10. Internal-linking pass: related-category links on review pages, guide↔review cross-links.
11. Author bylines as `Person` schema with sameAs (deepens E-E-A-T) once author pages exist.

## Verification
After implementing 1–4, rebuild (`npm run build:no-fetch`) and confirm in `/out`:
- `rel="canonical"` on 44/44 pages.
- `"@type":"Product"`, `"Review"`, `"ItemList"`, `"BreadcrumbList"`, `"Organization"`, `"WebSite"` present.
- Validate with Google Rich Results Test before launch.
