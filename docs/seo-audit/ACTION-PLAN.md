# DeskSetupPicks — SEO Action Plan (2026-06-08)

Score: **90/100** (up from 84). Most of the prior critical items are done. Remaining, by impact-to-effort.

## High (within 1 week)
- [ ] **Named author + bio + `Person` schema.** Replace the generic "The DeskSetupPicks Team" with a real named editor (credentials + photo). The engine already supports per-site authors; wire DeskSetupPicks' author into the Article schema + bylines. Biggest remaining E-E-A-T lever.
- [ ] **Connect Google Search Console**, submit `https://desksetuppicks.com/sitemap.xml`, request indexing of key pages. Turns "estimated" indexation into measured.

## Medium (within 1 month)
- [ ] **Run a live Lighthouse/PageSpeed test** (now that HTTPS is up) to get real CWV, then act on INP/TBT.
- [ ] **Trim client-side JS:** audit framer-motion usage; gate below-fold animations behind `prefers-reduced-motion` and viewport, or swap simple ones to CSS.
- [ ] **Substantiate testing claims** with brief per-product "how we tested" notes.
- [ ] **Keep prices/availability fresh:** re-run `node scripts/audit-catalog.mjs` + `node scripts/refresh-prices.mjs` periodically (Amazon prices drift).

## Low (backlog)
- [ ] Point the breadcrumb "Reviews" link at a reviews index instead of a fixed category.
- [ ] Replace branded placeholder covers with kie.ai AI art (pending kie.ai credits — say "go").
- [ ] Bump the deploy workflow's GitHub Actions to Node-24-compatible versions (deprecation notice).
- [ ] Security headers (HSTS/CSP) would require a header-capable host or a meta-CSP (GitHub Pages can't set them).

## Already fixed (this + last session)
- Images: all covers + OG + square logo + logo-shaped favicon (was the #1 gap).
- HTTPS live + enforced; titles all ≤60; sitemap real lastmod, no dead tags.
- Removed a fabricated-rating product + an out-of-stock product; refreshed 39 live prices; monitor-arms expanded to 10 verified arms.
- GA4 analytics; ads.txt; Organization schema square logo; typography plugin; honest stats.
- Full schema suite, per-page canonicals, llms.txt, GPTBot-allowed robots.

## Not auto-certifiable
Star ratings (Amazon API doesn't expose them; Amazon blocks scraping) — verify via Rufus/manual as done for monitor arms + walking pads. Audit tools left in `scripts/`: `seo-verify.mjs`, `audit-catalog.mjs`, `audit-asins.mjs`, `refresh-prices.mjs`.
