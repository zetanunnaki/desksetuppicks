# DeskSetupPicks — SEO Action Plan

Prioritized fixes from the 2026-06-01 audit (score: **85/100**). Ordered by impact-to-effort.

## Critical (do now)

- [ ] **Enable Enforce HTTPS** once GitHub finishes the TLS cert (in progress). Until then, http-only with https canonicals is a temporary mismatch. *(Effort: 1 API call.)*
- [ ] **Generate cover + OG images** — run `scripts/generate-covers.mjs` after topping up kie.ai credits. This is the single biggest score lever (Images 35→~90) and fixes social previews + schema images in one move. *(Effort: 1 command + wiring already planned.)*

## High (within 1 week)

- [ ] **Add a default 1200×630 OG image** at `/images/og/default.webp` (add it as a target in the cover generator). *(Effort: small.)*
- [ ] **Wire cover images into the UI** — guide/blog cards, featured hero, and article headers currently ignore `imageUrl` and show icon placeholders. Render the real cover with the icon as fallback. *(Effort: medium; already in the cover-image plan.)*
- [ ] **Per-article OG + Article-schema images** — point `articleSchema.image` and per-page `og:image` at each article's cover once generated. *(Effort: small, in schema/metadata builders.)*
- [ ] **Named authorship + bio** — introduce at least one named editor persona with credentials; add `Person` schema and an author byline/`sameAs`. Strengthens E-E-A-T for product recommendations. *(Effort: medium; content + schema.)*

## Medium (within 1 month)

- [ ] **Trim long `<title>`s** — certification found **40 of 82 pages** exceed 60 chars (longest 85). Shorten `metaTitle`s before the brand suffix to avoid SERP truncation on ~half the site. *(Effort: small, data edits.)*
- [ ] **Reduce client-side JS** — audit framer-motion usage; consider CSS animations or `prefers-reduced-motion` and lazy/viewport-gated motion on below-fold sections to cut main-thread work. *(Effort: medium.)*
- [ ] **Substantiate testing claims** — add brief per-product "how we tested" notes instead of a flat site-wide "30 days". *(Effort: medium, content.)*
- [ ] **Connect Search Console + run Lighthouse** (post-HTTPS) to replace lab estimates with field CWV and indexation data. *(Effort: small setup.)*

## Low (backlog)

- [ ] Remove unused Next starter assets in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
- [ ] Point the breadcrumb "Reviews" link at a reviews index rather than a fixed category.
- [ ] Revisit the review-hero "from {N×6}+ considered" computed figure for literal accuracy.
- [ ] Consider a header-capable host or meta-CSP if security headers become a priority (GitHub Pages can't set them).

## Already fixed this session (no action needed)
- Enabled `@tailwindcss/typography` (content was rendering unstyled site-wide).
- Replaced fabricated social proof (500k readers / 4.9 rating / 287 products) with verifiable stats.
- Added 40 high-value articles with deep internal linking.
- Per-page canonicals, full schema suite (Product/Review, Breadcrumb, Org, WebSite, ItemList, Article, FAQPage), sitemap, llms.txt.
