# DeskSetupPicks — Full SEO Audit

**Audited:** http://desksetuppicks.com (live GitHub Pages deploy) + local source
**Date:** 2026-06-01
**Business type:** Affiliate product-review publication (desk/home-office gear)
**Scope:** 82 sitemap URLs — 21 review categories, 30 guides, 22 journal posts, plus core pages

---

## Executive Summary

### Overall SEO Health Score: **85 / 100**

A strong, well-architected static site with comprehensive structured data, deep original content, and clean internal linking. The score is held back almost entirely by **one category: images** — every cover and the social/OG image currently 404. Fixing images alone lifts the site into the low 90s.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 85 | 19.6 |
| On-Page SEO | 20% | 87 | 17.4 |
| Schema / Structured Data | 10% | 92 | 9.2 |
| Performance (CWV) | 10% | 80 | 8.0 |
| AI Search Readiness | 10% | 90 | 9.0 |
| Images | 5% | 35 | 1.8 |
| **Total** | | | **≈ 84** |

> On-Page revised 90→87 after certification found over-length titles affect ~half the site (see Certification section), not "a few" as first written. The score is a weighted **estimate** per the rubric, not a measured value; Performance is a **lab estimate** (no Lighthouse/CrUX field run). The objective findings below were independently verified — see **Certification**.

### Top 5 Critical / High Issues
1. **All images 404** — `og:image` (`/images/og/default.webp`), every guide/blog cover, and local product images return 404. Breaks social sharing previews and removes images from rich results. *(Generation already queued via kie.ai — pending account credits.)*
2. **HTTPS not yet enforced** — site currently serves over HTTP only; GitHub is still provisioning the TLS cert. Canonicals/sitemap already use `https://`, so there is a temporary scheme mismatch until the cert lands and Enforce HTTPS is enabled.
3. **Generic authorship ("The DeskSetupPicks Team")** — no named author or bio entity. For product-recommendation (YMYL-adjacent) content, named experts with credentials materially strengthen E-E-A-T.
4. **Article/Product schema `image` fields point to 404s** — weakens rich-result eligibility until cover images exist.
5. **No default OG image** — social shares of any page have no preview image.

### Top 5 Quick Wins
1. Generate a **1200×630 default OG image** + per-article covers (already scripted; one command after kie.ai top-up).
2. Once the TLS cert lands, **enable Enforce HTTPS** (one API call / one toggle).
3. Add a **named author + short bio** (Person schema) — even one editor persona with real credentials.
4. Delete unused Next starter assets in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
5. Trim a handful of **over-length `<title>`s** (some exceed ~60 chars after the ` | DeskSetupPicks` suffix).

---

## Technical SEO — 88/100

**Strong:**
- Static export (Next.js 16) → fast TTFB, clean trailing-slash URLs, no render-blocking SSR.
- `robots.txt` present: `Allow: /`, sitemap declared, **GPTBot explicitly allowed** (good for AI surfaces).
- `sitemap.xml` valid with 82 URLs (via `app/sitemap.ts`, force-static).
- Per-page **canonical** tags, all correct and absolute (`https://desksetuppicks.com/...`).
- `manifest.webmanifest` present; favicon present.

**Issues:**
- **HTTPS not enforced yet** (cert provisioning). Until live, HTTP-only with https canonicals = transient mismatch. *(High, self-resolving.)*
- **No security headers** (HSTS, CSP, X-Content-Type-Options) — GitHub Pages cannot serve custom headers on static hosting. *(Low; platform limitation. A meta CSP or a move to a header-capable host would be the only options.)*

## Content Quality — 85/100

**Strong:**
- Deep, original, decision-driving content: 30 buying guides + 22 journal posts + 21 review hubs + 137 curated products. No thin pages.
- Consistent high-value structure (elimination matrix, quantified thresholds, tiered picks, FAQ, verdict with "skip it if…").
- Affiliate disclosure present; editorial methodology stated ("30 days of testing", "no paid placement").
- Fabricated trust metrics were removed — current stats (137 products, 21 categories, 30 guides, 4.5★ bar) are all verifiable. Good integrity signal.

**Issues:**
- **Generic author entity** — "The DeskSetupPicks Team" with no named person, bio, or credentials. *(High for E-E-A-T.)*
- "Tested 30+ days / 6 weeks" claims appear site-wide as flat values; consider per-product testing notes to substantiate. *(Medium.)*
- Review-hero "from {N×6}+ considered" is a computed figure rather than a real count. *(Low.)*

## On-Page SEO — 90/100

**Strong:**
- Unique `metaTitle` + `metaDescription` per category, guide, and post.
- One `<h1>` per page; clean H2/H3 hierarchy (now styled via the typography fix).
- Extensive internal linking: guides ↔ reviews ↔ journal ↔ products, related-category modules, and in-article contextual links.
- Descriptive, keyword-aligned slugs.

**Issues:**
- **40 of 82 pages have `<title>` > 60 characters** (longest 85: `/blog/usb-c-vs-thunderbolt/`) — risk of SERP truncation on roughly half the site. *(Medium — revised up from "Low" after certification.)*
- Breadcrumb "Reviews" link points to a fixed category (`/reviews/standing-desks`) rather than a reviews index. *(Low.)*

## Schema / Structured Data — 92/100

**Strong:**
- Comprehensive JSON-LD: Organization, WebSite, BreadcrumbList, Product + editorial Review, ItemList, Article, FAQPage.
- Review uses an **editorial reviewRating** (no aggregateRating) — policy-compliant for affiliate.
- 6 JSON-LD blocks on the homepage; breadcrumbs + Article on guides; FAQPage on review hubs.

**Issues:**
- **`image` fields resolve to 404s** (Article/Product/og) — populate once covers exist to unlock image-rich results. *(High once images land.)*
- No `Person` schema for authors (ties to the authorship gap). *(Medium.)*

## Performance (CWV) — 80/100 (lab estimate; no field data)

**Strong:** static HTML, small payloads, CDN delivery, text-based LCP (hero headline), transform-based animations (low CLS risk).

**Issues:**
- **Framer-motion across many components** (Hero, cards, TrustSection, ProductReviewCard) adds client JS and main-thread work. *(Medium.)*
- Images are `unoptimized` (required for static export) — fine for small Amazon CDN thumbnails, but the forthcoming covers should be shipped pre-sized as compressed WebP (the generator already does `sharp` → WebP q82).
- No CrUX/field data available in this audit; recommend Search Console + a Lighthouse run post-HTTPS.

## AI Search Readiness — 90/100

**Strong:** `llms.txt` present; GPTBot allowed; clean semantic HTML; self-contained FAQ answers (ideal for extraction/citation); structured, factual, comparison-rich content.
**Issues:** generic authorship weakens the entity/authority signal AI engines use; no `sameAs`/author profiles. *(Medium.)*

## Images — 35/100 (weakest category)

- **`og:image` → 404** (`/images/og/default.webp`): no social preview on any shared link.
- **All guide/blog cover images → 404**: listing cards fall back to icon placeholders; no images in Article schema.
- Local product images (`/images/products/*.webp`) 404, but product cards correctly use live **Amazon CDN images** with proper `alt` text, so product visuals are fine.
- **Action already in motion:** `scripts/generate-covers.mjs` (kie.ai `google/nano-banana` → WebP) is built and ready; blocked only on kie.ai credits. Extend it to also emit the 1200×630 default OG image.

---

## Certification

Objective findings were independently verified with a script (`scripts/seo-verify.mjs`) over **all 82 pages** of the built artifact (the exact bytes deployed), plus live `curl` checks against `desksetuppicks.com`. Results:

**Per-page (82/82 unless noted) — CERTIFIED:**
| Check | Result |
|---|---|
| `<title>` present | 82 / 82 ✅ |
| meta description present | 82 / 82 ✅ |
| canonical present | 82 / 82 ✅ |
| canonical exactly correct (`https://desksetuppicks.com` + route) | 82 / 82 ✅ |
| exactly one `<h1>` | 82 / 82 ✅ |
| JSON-LD present | 82 / 82 ✅ |
| `og:image` tag present | 82 / 82 ✅ |
| titles > 60 chars | **40 / 82 ⚠️** (longest 85) |

**JSON-LD @types emitted (certified counts):** Product 137, Review 137, Rating 137, Offer 137, Question 105, Answer 105, WebSite 82, ListItem 380, BreadcrumbList 74, Article 53, WebPage 53, ItemList 22, FAQPage 21, Organization (sitewide).

**Live deployment — CERTIFIED:**
| Check | Result |
|---|---|
| `robots.txt` (Allow /, sitemap, GPTBot allowed) | ✅ present |
| `sitemap.xml` `<loc>` count | 82 ✅ (matches build) |
| `og:image` file (`/images/og/default.webp`) | **404 ❌** |
| sample cover (`/images/guides/best-webcams.webp`) | **404 ❌** |
| HTTPS serving / Enforce HTTPS | **not yet ❌** (cert `state: null`, provisioning) |

**NOT certified (estimates / not measured):** the overall 84/100 score (weighted rubric judgment), the Performance/CWV score (lab estimate — no Lighthouse or CrUX field data), indexation/traffic (no Search Console/GA), and backlink metrics. Connect GSC + run Lighthouse post-HTTPS to obtain measured values.

## Methodology / limitations
Audited the live HTTP deploy plus local source. No Lighthouse field run or Search Console/GA data was available in this pass (recommend connecting GSC + running Lighthouse once HTTPS is live). Score is a weighted estimate per the audit rubric.
