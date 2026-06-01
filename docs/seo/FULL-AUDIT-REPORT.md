# DeskSetupPicks — SEO Audit Report

**Date:** 2026-06-01
**Scope:** Static export (`/out`, 44 rendered HTML pages) + source. Production domain `desksetuppicks.com` not yet live (DNS unresolved), so the audit ran against the real generated HTML — the exact output Google will index.
**Business type:** Affiliate review publisher (Amazon Associates) — desk-setup gear. 131 products / 20 review categories + guides + blog.

## SEO Health Score: 69 / 100

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22% | 70 | robots.txt, sitemap, viewport, mobile all good; **no canonicals** |
| Content Quality | 23% | 82 | Real editorial content, pros/cons, specs, FAQ, named team (E-E-A-T) |
| On-Page SEO | 20% | 72 | Good H1/meta/alt; **duplicated title suffix** bug |
| Schema / Structured Data | 10% | 35 | Only FAQ + Article; **no Product/Review/Breadcrumb/Org/WebSite** |
| Performance (CWV) | 10% | 70 | Static export (fast); can't measure field CWV without live domain |
| AI Search Readiness | 10% | 60 | GPTBot allowed; no `llms.txt`; structured content is citable |
| Images | 5% | 75 | Alt text present everywhere; remote Amazon images, `unoptimized:true` |

## What's already strong ✅
- **Meta basics**: unique titles + meta descriptions on all 44 pages; OG title/description/image on 44/44; Twitter card; `metadataBase` set.
- **Alt text**: every product `<img>` has `alt=` (21/21 on a sampled review page).
- **One H1 per page**; clean heading hierarchy.
- **robots.txt** allows crawl + GPTBot, points to sitemap; **sitemap.xml** covers all 41 routes with priorities.
- **Mobile**: viewport meta, responsive layout (sm/md/lg).
- Static export = fast TTFB, no render-blocking server.

## Critical / High findings 🔴

### 1. No Product / Review structured data (HIGH — biggest miss)
Review category pages list products with editorial ratings + live prices, but emit **zero Product/Review JSON-LD**. Result: no star/price rich results in Google — the single highest-CTR feature for an affiliate review site. Only `FAQPage` (20 pages) and `Article` (3 blog posts) schema exist.
**Fix:** Emit `Product` with nested editorial `Review` (`reviewRating` = curated rating) + `offers` (live price) per product, wrapped in an `ItemList`. Use editorial `Review`, not fabricated `aggregateRating`, to stay within Google policy.

### 2. No canonical URLs (HIGH)
0/44 pages emit `<link rel="canonical">`. With `trailingSlash: true` and affiliate query params in the wild, this invites duplicate-content dilution.
**Fix:** Set `alternates.canonical` per route (absolute, trailing-slash form).

### 3. Duplicated title suffix (HIGH, quick win)
Review + guide pages render e.g. `The Best Standing Desks of 2026 | DeskSetupPicks | DeskSetupPicks`. The metadata `title.template` (`%s | DeskSetupPicks`) is appended to a `metaTitle` that already ends in `| DeskSetupPicks`.
**Fix:** Strip the site name from `metaTitle` values (or use `title.absolute`). Wastes ~16 chars of SERP title and reads spammy.

## Medium findings 🟡
4. **No BreadcrumbList schema** — breadcrumbs render visually but aren't marked up (miss breadcrumb rich result).
5. **No Organization / WebSite schema** site-wide — miss knowledge-panel signals + sitelinks search box.
6. **Homepage has no structured data** at all.
7. **No `llms.txt`** — AI-search citability nicety.

## Low findings ⚪
8. Sitemap is a build script (fine); could move to `app/sitemap.ts` for auto-inclusion.
9. Images `unoptimized: true` (required for static export of remote Amazon images) — acceptable; alt text good.

See `ACTION-PLAN.md` for the prioritized fix list.
