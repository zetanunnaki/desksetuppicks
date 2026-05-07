# Product Requirements Document (PRD)
# DeskSetupPro.com — Work From Home Desk Setups

**Version:** 1.0
**Date:** May 2026
**Stack:** Static site (HTML/CSS/JS) — GitHub Pages hosting, no database
**Monetization:** Amazon Associates affiliate links + Google AdSense display ads

---

## 1. Project Overview

DeskSetupPro.com is a high-value editorial affiliate website focused on optimizing home office and desk setups for productivity and aesthetics. The site targets remote workers, freelancers, gamers, and anyone building or upgrading a desk setup.

The site must be **static** (no backend, no database), hosted on **GitHub Pages**, and built to be fast, SEO-optimized, and AdSense-compliant from day one. All product recommendations link to Amazon via affiliate tags. The site must feel like a premium editorial publication — not a thin affiliate site.

---

## 2. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Organic traffic | Monthly pageviews | 35,000+ within 6–12 months |
| Affiliate revenue | Monthly commission | 2,000–4,500 USD/month |
| AdSense revenue | RPM × pageviews | Supplemental income stream |
| User trust | Time on page, return visits | Avg 3+ min on article pages |
| SEO authority | Domain rating / indexed pages | 50+ indexed pages in 3 months |

---

## 3. Technical Architecture

### 3.1 Stack & Hosting

- **Static Site Generator:** Use vanilla HTML/CSS/JS OR Eleventy (11ty) if a build step is acceptable. All output must be static HTML deployable to GitHub Pages.
- **Hosting:** GitHub Pages (free, custom domain support)
- **Domain:** DeskSetupPro.com (custom domain pointed to GitHub Pages)
- **CSS Framework:** Tailwind CSS (via CDN or build step)
- **JavaScript:** Vanilla JS only — no frameworks. Minimal JS for mobile menu toggle, filtering, dark mode toggle, and lazy loading.
- **No database.** All product data lives in JSON files within the repo.
- **No server-side code.** Everything is pre-rendered static HTML.

### 3.2 Project File Structure

```
/
├── index.html                          # Homepage
├── about.html                          # About page
├── contact.html                        # Contact page
├── privacy-policy.html                 # Privacy policy (required for AdSense)
├── affiliate-disclosure.html           # FTC affiliate disclosure
├── terms.html                          # Terms of service
├── 404.html                            # Custom 404 page
│
├── /categories/
│   ├── standing-desks.html
│   ├── ergonomic-chairs.html
│   ├── monitor-arms.html
│   ├── desk-mats.html
│   ├── cable-management.html
│   ├── desk-shelves.html
│   ├── keyboard-trays.html
│   ├── webcams.html
│   ├── ring-lights.html
│   └── desk-lamps.html
│
├── /guides/
│   ├── best-standing-desks-under-500.html
│   ├── best-ergonomic-chairs-compared.html
│   ├── minimal-desk-setup-guide.html
│   ├── cable-management-solutions.html
│   ├── dual-monitor-setup-guide.html
│   ├── best-wfh-accessories.html
│   ├── how-to-build-the-perfect-home-office.html
│   ├── ergonomic-desk-setup-checklist.html
│   ├── budget-desk-setup-under-300.html
│   └── desk-setup-for-developers.html
│
├── /blog/
│   ├── index.html                      # Blog listing page
│   ├── standing-desk-vs-sitting-desk.html
│   ├── how-to-reduce-back-pain-wfh.html
│   ├── best-desk-plants-for-productivity.html
│   └── ... (expandable)
│
├── /data/
│   ├── products.json                   # Master product database
│   ├── categories.json                 # Category metadata
│   └── guides.json                     # Guide metadata
│
├── /assets/
│   ├── /css/
│   │   └── styles.css                  # Global stylesheet
│   ├── /js/
│   │   └── main.js                     # Global JS (menu, dark mode, filters)
│   ├── /images/
│   │   ├── /products/                  # Product images (optimized WebP)
│   │   ├── /guides/                    # Guide hero images
│   │   ├── /icons/                     # UI icons (SVG)
│   │   └── logo.svg                    # Site logo
│   └── /fonts/                         # Self-hosted fonts (optional)
│
├── sitemap.xml                         # SEO sitemap
├── robots.txt                          # Crawl directives
├── CNAME                               # GitHub Pages custom domain
└── README.md                           # Repo documentation
```

### 3.3 Product Data Schema (products.json)

All product data is stored in a single JSON file. The site owner manually updates this file to add/edit products and insert Amazon affiliate links.

```json
{
  "products": [
    {
      "id": "flexispot-e7",
      "name": "FlexiSpot E7 Standing Desk",
      "slug": "flexispot-e7-standing-desk",
      "category": "standing-desks",
      "subcategory": null,
      "shortDescription": "Premium dual-motor standing desk with programmable presets",
      "fullDescription": "The FlexiSpot E7 features a powerful dual-motor system...",
      "prosAndCons": {
        "pros": [
          "Dual motor for smooth, fast height adjustment",
          "Programmable height presets (up to 4)",
          "Supports up to 355 lbs",
          "Anti-collision technology"
        ],
        "cons": [
          "Desktop sold separately on some models",
          "Assembly takes 45–60 minutes"
        ]
      },
      "specifications": {
        "heightRange": "22.8\" – 48.4\"",
        "weightCapacity": "355 lbs",
        "desktopSizes": ["48x24", "55x28", "60x30", "72x30"],
        "motorType": "Dual motor",
        "warranty": "15 years on frame, 5 years on motor"
      },
      "priceRange": "400–550 USD",
      "rating": 4.7,
      "ratingOutOf": 5,
      "affiliateUrl": "PLACEHOLDER_AMAZON_LINK",
      "imageUrl": "/assets/images/products/flexispot-e7.webp",
      "imagePlaceholder": "A modern standing desk with black frame and walnut top",
      "badges": ["Editor's Choice", "Best Value"],
      "featured": true,
      "dateAdded": "2026-05-01",
      "lastUpdated": "2026-05-01"
    }
  ]
}
```

### 3.4 Categories Schema (categories.json)

```json
{
  "categories": [
    {
      "id": "standing-desks",
      "name": "Standing Desks",
      "slug": "standing-desks",
      "description": "Find the best standing desks for your home office...",
      "heroImage": "/assets/images/categories/standing-desks-hero.webp",
      "metaTitle": "Best Standing Desks for Home Office (2026) | DeskSetupPro",
      "metaDescription": "Expert-reviewed standing desks ranked by value...",
      "priceRange": "200–800 USD",
      "buyingGuideIntro": "Choosing the right standing desk depends on...",
      "keyFactors": ["Motor type", "Height range", "Weight capacity", "Desktop size", "Warranty"]
    }
  ]
}
```

---

## 4. Page Designs & Layouts

### 4.1 Global Components (present on every page)

#### Navigation Bar (sticky)
- Logo (left) — links to homepage
- Nav links: Home, Categories (dropdown with all 10), Guides, Blog, About
- Dark mode toggle (sun/moon icon)
- Mobile: hamburger menu with slide-out drawer
- Slim top banner: "Independent reviews. We earn from qualifying purchases." (FTC compliance)

#### Footer
- 4-column layout: Quick Links, Categories, Guides, Legal
- Legal column: Privacy Policy, Affiliate Disclosure, Terms of Service, Contact
- Copyright notice
- Social links (optional placeholders)
- "As an Amazon Associate, I earn from qualifying purchases" (required text)

#### Affiliate Disclosure Banner
- On every page with affiliate links, a visible disclosure at the top of the content area:
  > "DeskSetupPro is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. [Learn more](/affiliate-disclosure.html)"

#### AdSense Slots (placeholder divs)
- Header leaderboard (728x90)
- Sidebar rectangle (300x250)
- In-article (468x60)
- Footer leaderboard (728x90)

### 4.2 Homepage (index.html)

**Sections in order:**

1. **Hero Section**
   - Headline: "Build Your Perfect Desk Setup"
   - Subhead: "Expert reviews, honest comparisons, and curated guides to help you create a productive and beautiful workspace."
   - Two CTAs: "Browse Reviews" and "Take the Setup Quiz"
   - Background: subtle gradient or hero image placeholder

2. **Featured Picks Bar**
   - Horizontal scrollable row of 4-5 cards: "Best Standing Desk", "Best Ergonomic Chair", "Best Monitor Arm", "Best Desk Mat", "Best Webcam"
   - Each card: product image placeholder, product name, one-line verdict, star rating, "Read Review" link, Amazon affiliate button placeholder

3. **Latest Guides Section**
   - Grid of 3 latest editorial guides (card format: thumbnail placeholder, title, excerpt, read time, date)

4. **Category Browser**
   - Visual grid of all 10 product categories (icon + name + product count). Each links to its category page.

5. **"Why Trust Us?" Section**
   - 3 columns: "100+ Hours of Research", "Real Desk Setup Testing", "No Sponsored Rankings"
   - Short paragraph about editorial independence

6. **Setup Inspiration Gallery Preview**
   - 4-image masonry grid showcasing featured desk setups with captions

7. **Newsletter Signup**
   - Full-width CTA: "Get Weekly Setup Tips & Deals" with email input and subscribe button

### 4.3 Category Page Template (categories/{slug}.html)

10 categories: standing-desks, ergonomic-chairs, monitor-arms, desk-mats, cable-management, desk-shelves, keyboard-trays, webcams, ring-lights, desk-lamps

**Sections:**

1. **Category Hero** - H1, intro paragraph, last updated date, anchor links
2. **Quick Comparison Table** - Sortable table with rank, product name, key specs, rating, price, Amazon CTA
3. **Individual Product Review Cards** (5-8 per category) - H2, image, pros/cons, star rating, review text, specs table, Amazon CTA with `data-amazon-asin=""` attribute
4. **Buying Guide Section** - H2 with 4-6 H3 subsections covering key decision factors
5. **FAQ Section** - Expandable accordion items with schema markup
6. **Related Categories** - Links to related category pages

### 4.4 Guide Page Template (guides/{slug}.html)

10 guides covering desk setup topics with:
- Hero with title, author, date, read time
- Table of contents (auto-generated from headings)
- Long-form content with inline product recommendations
- Product comparison tables where relevant
- AdSense slots between sections

### 4.5 Blog Pages

- Blog listing page (blog/index.html) with card grid
- Individual blog posts with standard article layout
- Sidebar with recent posts, categories, newsletter CTA

### 4.6 Legal & Info Pages

- **About** - Team/mission info, methodology
- **Contact** - Contact form placeholder
- **Privacy Policy** - Required for AdSense
- **Affiliate Disclosure** - FTC compliance
- **Terms of Service** - Standard terms
- **404** - Custom error page with search and navigation

---

## 5. Design & Brand Guidelines

### 5.1 Visual Identity
- **Primary background (hero):** Dark charcoal (#1a1a2e)
- **Content areas:** Clean white (#ffffff)
- **Accent/CTAs:** Blue (#4361ee)
- **Alternating sections:** Warm gray (#f8f9fa)
- **Best Pick badges:** Green (#06d6a0)
- **Typography:** Inter or system sans-serif, 16px base, 1.7 line-height
- **Feel:** Clean, modern, trustworthy — Wirecutter/rtings.com inspired

### 5.2 Responsive Design
- Mobile-first layout
- Breakpoints: 320px, 768px, 1024px, 1280px
- Horizontal scroll or stacked cards for tables on mobile
- Sticky TOC sidebar on desktop; floating TOC button on mobile

### 5.3 Performance Targets
- Lighthouse 90+ on all categories
- No JS frameworks — vanilla JS or Alpine.js only
- Lazy-load all images, WebP with JPG fallback
- Total page weight under 500KB (excluding images)

---

## 6. SEO Requirements

- Semantic HTML5 (proper heading hierarchy, article/section tags)
- Meta titles and descriptions on every page
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (Product, FAQ, BreadcrumbList, Article schemas)
- XML sitemap (sitemap.xml)
- robots.txt with proper directives
- Canonical URLs on every page
- Internal linking strategy between categories, guides, and blog posts

---

## 7. Monetization Setup

### 7.1 Amazon Associates
- All product CTAs use affiliate links stored in products.json
- `data-amazon-asin` attributes for easy bulk ASIN updates
- Proper disclosure on every page with affiliate links

### 7.2 Google AdSense
- Placeholder `<div>` elements with class `adsense-slot` and appropriate sizes
- Ad slots: header leaderboard, sidebar rectangle, in-article, footer leaderboard
- Privacy policy page required before AdSense approval
