# DeskSetupPicks — Full SEO Audit (re-audit)

**Audited:** https://desksetuppicks.com (live) + local source
**Date:** 2026-06-08 (supersedes the 2026-06-01 audit, which scored 84)
**Business type:** Affiliate product-review publication (desk/home-office gear)
**Scope:** 82 sitemap URLs — 21 review categories, 30 guides, 22 journal posts, core pages

---

## Executive Summary

### Overall SEO Health Score: **90 / 100** (up from 84)

The site is now in strong shape. The previous audit's dominant weakness — every image 404ing — is fully resolved, HTTPS is live and enforced, and over-length titles are gone. Remaining upside is concentrated in **named authorship (E-E-A-T)** and **client-side JS weight**.

| Category | Weight | Score (was) | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 94 (88) | 20.7 |
| Content Quality | 23% | 86 (85) | 19.8 |
| On-Page SEO | 20% | 93 (87) | 18.6 |
| Schema / Structured Data | 10% | 95 (92) | 9.5 |
| Performance (CWV, lab est.) | 10% | 82 (80) | 8.2 |
| AI Search Readiness | 10% | 91 (90) | 9.1 |
| Images | 5% | 92 (35) | 4.6 |
| **Total** | | | **≈ 90** |

> The score is a weighted rubric estimate; Performance is a lab estimate (no Lighthouse/CrUX field run); star ratings remain unverifiable via API. Objective on-page/technical findings are verified — see Certification.

### Fixed since last audit
- ✅ **Images:** 30 guide + 22 journal covers, a 1200×630 OG image, square logo, and a logo-shaped favicon — all present and live (was 35/100).
- ✅ **HTTPS:** live, enforced, `http → 301 → https`, cert issued.
- ✅ **Titles:** 0 of 82 over 60 chars (was 40).
- ✅ **Sitemap:** real per-content `lastmod`, dropped `priority`/`changefreq`.
- ✅ **Integrity:** removed a fabricated 4.7★ product (real 2.6★), an out-of-stock product, and refreshed 39 stale prices to live.
- ✅ Added GA4 analytics + `ads.txt`; Organization schema logo now a real square logo.

### Top remaining issues
1. **Generic authorship ("The DeskSetupPicks Team")** — no named author/bio/Person schema. Top E-E-A-T gap for product advice. *(High)*
2. **Client-side JS (framer-motion across many components)** — adds main-thread work; affects INP/TBT. *(Medium)*
3. **No security headers** (HSTS/CSP) — GitHub Pages can't set them. *(Low; platform limit)*
4. **No field data** — connect Search Console + run Lighthouse to replace estimates. *(Medium, measurement)*
5. **Star ratings unverifiable via API** — keep using human/Rufus verification (monitor arms + walking pads already verified). *(Process)*

### Top quick wins
1. Add a named author + short bio + `Person` schema (the engine already supports per-site authors; wire DeskSetupPicks' data).
2. Submit `sitemap.xml` in Google Search Console; request indexing.
3. Run a live PageSpeed/Lighthouse test now that HTTPS is up; gate framer-motion behind `prefers-reduced-motion` / viewport for below-fold sections.

---

## Technical SEO — 94/100
Static export, fast TTFB, clean trailing-slash URLs. **HTTPS live + enforced** (301 from http). `robots.txt` allows all + GPTBot, declares the sitemap. `sitemap.xml` valid (82 URLs, real lastmod). `llms.txt` live. Per-page canonicals correct. GA4 installed. **Only gap:** no custom security headers (GitHub Pages limitation).

## Content Quality — 86/100
Deep, original, decision-driving: 30 guides + 22 posts + 21 review hubs + 141 curated products, no thin pages. Affiliate disclosure + stated methodology. Fabricated trust metrics removed; catalog integrity-audited (no wrong-product ASINs). **Gap:** generic team authorship — add a named expert with credentials.

## On-Page SEO — 93/100
Unique titles + meta per page; **0 titles over 60 chars**; one `<h1>` each; dense internal linking (guides ↔ reviews ↔ journal ↔ products); keyword-aligned slugs. Minor: breadcrumb "Reviews" still points at a fixed category.

## Schema — 95/100
Full JSON-LD suite: Organization (now a square logo), WebSite, BreadcrumbList, Product + editorial Review, ItemList, Article, FAQPage. Article/Product `image` fields now resolve (covers exist). Editorial Review (no aggregateRating) keeps it policy-safe. **Gap:** no `Person` author schema.

## Performance — 82/100 (lab estimate)
Static HTML + CDN, text LCP, pre-sized WebP covers, transform-based animations (low CLS). **Gap:** framer-motion across Hero/cards/sections adds client JS + main-thread work; GA adds one async script. Recommend field measurement post-HTTPS.

## AI Search Readiness — 91/100
`llms.txt` + GPTBot allowed; self-contained FAQ answers (FAQPage schema); structured, factual, comparison-rich content. Minor: authorship/entity signal weak.

## Images — 92/100 (was 35)
All covers (53), OG, square logo, and logo-shaped favicon present and live; WebP format; alt text on product + cover images. Covers are tasteful branded placeholders (AI art via kie.ai can overwrite later).

---

## Certification (verified, not asserted)
Per-page across **82/82**: title ✓, meta description ✓, canonical correct ✓, single `<h1>` ✓, JSON-LD ✓, og:image ✓; **0** titles > 60. Live: HTTPS enforced, robots+GPTBot, 82-URL sitemap, llms.txt, GA4, ads.txt, OG/logo/favicon all 200. Catalog: 0 unavailable, prices synced to live (per `audit-catalog.mjs`). **Not certified:** the 90/100 score (estimate), Performance (lab estimate), star ratings (API can't return them).
