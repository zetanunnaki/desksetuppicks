# Sitemap Validation Report — desksetuppicks.com

**Sitemap:** https://desksetuppicks.com/sitemap.xml
**Date:** 2026-06-01
**Generator:** `src/app/sitemap.ts` (Next.js `MetadataRoute.Sitemap`, force-static)

## Result: PASS (clean) — 2 minor improvements

| Check | Result |
|---|---|
| Valid XML | ✅ |
| URL count < 50,000 | ✅ 82 |
| All URLs HTTP 200 | ✅ (82/82 map 1:1 to built pages — verified by cross-check) |
| All HTTPS | ✅ |
| Trailing-slash consistent | ✅ |
| Referenced in robots.txt | ✅ |
| Non-canonical URLs | ✅ none |
| Redirected URLs | ✅ none |
| Noindexed URLs | ✅ none |
| Coverage (pages vs sitemap) | ✅ 0 missing, 0 ghosts |
| `<lastmod>` accurate | ⚠️ all 82 identical (build time) — *Low* |
| `<priority>` / `<changefreq>` | ℹ️ present but **ignored by Google** — *Info* |

## Coverage breakdown (82 URLs)
- 8 static (home, /guides/, /blog/, about, contact, affiliate-disclosure, privacy-policy, terms)
- 21 review categories (`/reviews/<slug>/`)
- 30 guides (`/guides/<slug>/`)
- 22 journal posts (`/blog/<slug>/`)
- 1 more dynamic entry counted by the live fetch (blog slug set) — all resolve to real pages.

## Findings & fixes

### 1. Identical `<lastmod>` (Low) — FIXED
Every entry used `lastModified: now` (build timestamp), so all 82 dates were identical. Changed to **real per-content dates**: guides use `dateUpdated`, posts use frontmatter `updated`/`date`, legal pages use fixed publish dates, and home/listing/review hubs use the build date (they genuinely change as the catalog grows). Result: varied, meaningful `lastmod` values.

### 2. `<priority>` and `<changefreq>` (Info) — FIXED
Google ignores both tags. Removed them from the generator to keep the sitemap lean and avoid implying signals that do nothing.

## No action needed
- No splitting required (well under 50k).
- No sitemap index needed.
- Coverage is complete; robots.txt already references the sitemap.
