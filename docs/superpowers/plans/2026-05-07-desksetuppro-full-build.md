# DeskSetupPro.com Full Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build DeskSetupPro.com — a premium editorial affiliate site for desk setups using Next.js (like GarageGymBuilder/VanLifeKitchen), porting the existing Vite+React mockup design into a production-ready static site.

**Architecture:** Next.js 16 App Router with `output: "export"` for static hosting. The mockup's dark glassmorphic design (slate-950 bg, indigo accents, Outfit/Inter fonts, glass-card components, Framer Motion animations) is preserved exactly. Product data lives in JSON, editorial content in MDX. All pages are statically generated at build time.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, MDX (next-mdx-remote), Lucide React icons

**Source of truth for design:** `C:\Users\Issam\Downloads\desksetuppro\` (the Vite mockup)
**Source of truth for architecture:** `C:\Users\Issam\GarageGymBuilder\` and `C:\Users\Issam\VanLifeKitchen.com\`

---

## File Map

```
desksetuppro/
├── next.config.ts                     # Static export config
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config with @/* alias
├── postcss.config.mjs                 # PostCSS for Tailwind v4
├── .gitignore
├── CNAME                              # GitHub Pages custom domain
├── robots.txt                         # Crawl directives (copied to public/)
├── public/
│   ├── robots.txt
│   ├── images/
│   │   ├── products/                  # Product images (WebP placeholders)
│   │   ├── guides/                    # Guide hero images
│   │   └── og/                        # OG images per section
│   └── fonts/                         # Self-hosted Inter + Outfit (optional)
│
├── scripts/
│   └── generate-sitemap.mjs           # Pre-build sitemap generator
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout: fonts, metadata, analytics, header/footer
│   │   ├── page.tsx                   # Homepage (port of mockup Home.tsx)
│   │   ├── globals.css                # Tailwind v4 + mockup design tokens
│   │   ├── not-found.tsx              # 404 page
│   │   ├── reviews/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Category review pages (port of CategoryReview.tsx)
│   │   ├── guides/
│   │   │   ├── page.tsx               # Guides listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Individual guide (MDX rendered)
│   │   ├── blog/
│   │   │   ├── page.tsx               # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Individual blog post (MDX rendered)
│   │   ├── about/
│   │   │   └── page.tsx               # About page
│   │   ├── contact/
│   │   │   └── page.tsx               # Contact page
│   │   ├── privacy-policy/
│   │   │   └── page.tsx               # Privacy policy
│   │   ├── affiliate-disclosure/
│   │   │   └── page.tsx               # FTC disclosure
│   │   └── terms/
│   │       └── page.tsx               # Terms of service
│   │
│   ├── components/
│   │   ├── Header.tsx                 # Port of mockup Layout.tsx Header
│   │   ├── Footer.tsx                 # Port of mockup Layout.tsx Footer
│   │   ├── Hero.tsx                   # Homepage hero section
│   │   ├── FeaturedPicks.tsx          # Homepage featured products grid
│   │   ├── CategoryGrid.tsx           # Homepage "Browse The Lab" grid
│   │   ├── TrustSection.tsx           # Homepage "Our Editorial Pact"
│   │   ├── ComparisonTable.tsx        # Sortable benchmark table (category pages)
│   │   ├── ProductReviewCard.tsx      # Individual product review block
│   │   ├── BuyingGuide.tsx            # Buying guide section
│   │   ├── FaqAccordion.tsx           # FAQ section with AnimatePresence
│   │   ├── Sidebar.tsx                # Sticky sidebar (TOC + newsletter + ad)
│   │   ├── NewsletterCTA.tsx          # Newsletter signup component
│   │   ├── AdSlot.tsx                 # AdSense placeholder component
│   │   ├── BackToTop.tsx              # Scroll-to-top button
│   │   ├── ScrollProgress.tsx         # Reading progress bar
│   │   ├── StarRating.tsx             # Star rating display
│   │   ├── Badge.tsx                  # Badge component (Editor's Choice, Budget Pick, etc.)
│   │   ├── AffiliateButton.tsx        # Amazon CTA button with tracking
│   │   ├── AffiliateDisclosure.tsx    # Inline disclosure banner
│   │   └── mdx/
│   │       ├── MdxContent.tsx         # MDX renderer with custom components
│   │       ├── ProductCard.tsx        # Inline product recommendation in MDX
│   │       └── ProsCons.tsx           # Pros/cons in MDX content
│   │
│   ├── content/
│   │   ├── products.json              # Master product database (52 products)
│   │   ├── categories.json            # 10 category metadata entries
│   │   ├── guides.json                # 10 guide metadata entries
│   │   ├── guides/                    # MDX files for guides
│   │   │   ├── best-standing-desks-under-500.mdx
│   │   │   ├── best-ergonomic-chairs-compared.mdx
│   │   │   ├── minimal-desk-setup-guide.mdx
│   │   │   ├── cable-management-solutions.mdx
│   │   │   ├── dual-monitor-setup-guide.mdx
│   │   │   ├── best-wfh-accessories.mdx
│   │   │   ├── how-to-build-the-perfect-home-office.mdx
│   │   │   ├── ergonomic-desk-setup-checklist.mdx
│   │   │   ├── budget-desk-setup-under-300.mdx
│   │   │   └── desk-setup-for-developers.mdx
│   │   └── blog/                      # MDX files for blog posts
│   │       ├── standing-desk-vs-sitting-desk.mdx
│   │       ├── how-to-reduce-back-pain-wfh.mdx
│   │       └── best-desk-plants-for-productivity.mdx
│   │
│   └── lib/
│       ├── site-config.ts             # Site metadata, URLs, social links
│       ├── data.ts                    # Data loading functions (getProducts, getCategory, etc.)
│       ├── affiliate.ts               # Amazon affiliate link builder with ASIN validation
│       ├── mdx.ts                     # MDX compilation helpers
│       ├── metadata.ts                # SEO metadata generator per page
│       └── types.ts                   # TypeScript interfaces (Product, Category, Guide, BlogPost)
```

---

## Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `CNAME`
- Create: `public/robots.txt`

- [ ] **Step 1: Initialize the project**

```powershell
cd c:\Users\Issam\DeskSetupPro
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, accept defaults. This creates the Next.js scaffolding.

- [ ] **Step 2: Install additional dependencies**

```powershell
npm install framer-motion lucide-react next-mdx-remote gray-matter clsx tailwind-merge class-variance-authority
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Update `next.config.ts` for static export**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 4: Create `CNAME`**

```
desksetuppro.com
```

- [ ] **Step 5: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://desksetuppro.com/sitemap.xml

User-agent: GPTBot
Allow: /
```

- [ ] **Step 6: Update `.gitignore`**

Ensure it includes:
```
node_modules/
.next/
out/
.env
.env.local
```

- [ ] **Step 7: Verify it builds**

```powershell
npm run build
```

Expected: Build succeeds, `out/` directory created with static HTML.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with static export config"
```

---

## Task 2: Design System — Global CSS & Site Config

**Files:**
- Create: `src/app/globals.css`
- Create: `src/lib/site-config.ts`
- Create: `src/lib/types.ts`

- [ ] **Step 1: Create `src/app/globals.css`**

Port the mockup's design tokens exactly from `Downloads/desksetuppro/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-primary-bg: #0f172a;
  --color-accent-blue: #4f46e5;
  --color-accent-indigo: #6366f1;
  --color-success-green: #10b981;
  --color-surface-card: #1e293b;

  --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
}

@layer base {
  body {
    @apply font-body text-slate-300 bg-slate-950 leading-relaxed antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-extrabold tracking-tight text-white;
  }
}

@layer components {
  .btn-primary {
    @apply px-8 py-4 bg-accent-indigo text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 inline-flex items-center justify-center text-center shadow-lg shadow-indigo-500/20 active:scale-95;
  }

  .btn-outline {
    @apply px-8 py-4 border-2 border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 inline-flex items-center justify-center text-center active:scale-95;
  }

  .section-container {
    @apply w-full max-w-7xl mx-auto px-6 py-20 md:py-32;
  }

  .glass-card {
    @apply bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2rem] shadow-glass;
  }

  .badge-best {
    @apply bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20 shadow-lg shadow-emerald-500/5;
  }

  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-indigo-500;
  }

  .glass-card-hover {
    @apply hover:bg-slate-900/60 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Print */
@media print {
  header, footer, .ad-slot, .newsletter-cta, .back-to-top { display: none !important; }
}
```

- [ ] **Step 2: Create `src/lib/site-config.ts`**

```typescript
export const SITE = {
  name: "DeskSetupPro",
  url: "https://desksetuppro.com",
  tagline: "The Science of a Perfect Workspace",
  description: "Data-backed reviews, ergonomic benchmarks, and aesthetic deep-dives to help you build the ultimate desk setup.",
  locale: "en_US",
  twitter: "@desksetuppro",
  defaultOgImage: "/images/og/default.webp",
  amazonTag: "desksetuppro-20",
  social: {
    twitter: "https://twitter.com/desksetuppro",
    pinterest: "https://pinterest.com/desksetuppro",
    instagram: "https://instagram.com/desksetuppro",
  },
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path}`;
}
```

- [ ] **Step 3: Create `src/lib/types.ts`**

Port and extend the mockup's interfaces:

```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  metaTitle: string;
  metaDescription: string;
  priceRange: string;
  buyingGuideIntro: string;
  keyFactors: string[];
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  specifications: Record<string, string>;
  priceRange: string;
  rating: number;
  affiliateUrl: string;
  asin: string;
  imageUrl: string;
  imagePlaceholder: string;
  badges: string[];
  featured: boolean;
  rank: number;
  dateAdded: string;
  lastUpdated: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  readTime: string;
  category: string | null;
  relatedCategories: string[];
  imageUrl: string;
  featured: boolean;
  datePublished: string;
  dateUpdated: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  date: string;
  updated: string;
  image: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/lib/site-config.ts src/lib/types.ts
git commit -m "feat: add design system (mockup tokens), site config, and TypeScript types"
```

---

## Task 3: Data Layer — Products, Categories, Guides JSON + Data Helpers

**Files:**
- Create: `src/content/products.json` (52 products across 10 categories)
- Create: `src/content/categories.json` (10 categories)
- Create: `src/content/guides.json` (10 guides)
- Create: `src/lib/data.ts`
- Create: `src/lib/affiliate.ts`

- [ ] **Step 1: Create `src/content/categories.json`**

Use the 10 categories from the mockup's constants.ts, extended with SEO fields from the PRD. Each entry matches the `Category` interface. The 10 categories:

1. standing-desks (icon: Maximize2)
2. ergonomic-chairs (icon: Armchair)
3. monitor-arms (icon: ScreenShare)
4. desk-mats (icon: Layers)
5. webcams (icon: Video)
6. keyboards (icon: Keyboard) — "Mechanical Keyboards"
7. mice (icon: MousePointer2) — "Wireless Mice"
8. monitors (icon: Monitor) — "4K Monitors"
9. lighting (icon: Lamp) — "Desk Lighting"
10. cable-management (icon: Zap)

```json
{
  "categories": [
    {
      "id": "standing-desks",
      "name": "Standing Desks",
      "slug": "standing-desks",
      "icon": "Maximize2",
      "description": "Ergonomic height-adjustable desks for active working.",
      "productCount": 6,
      "metaTitle": "The Best Standing Desks of 2026 | DeskSetupPro",
      "metaDescription": "We benchmarked 12 standing desks for motor speed, stability, and build quality. These are the best.",
      "priceRange": "$150–$950",
      "buyingGuideIntro": "Choosing the right standing desk depends on your space, budget, and how often you switch between sitting and standing.",
      "keyFactors": ["Motor type", "Height range", "Weight capacity", "Desktop size", "Warranty"],
      "featured": true
    }
  ]
}
```

Include all 10 categories with full data.

- [ ] **Step 2: Create `src/content/products.json`**

52 products (5–6 per category). Each product matches the `Product` interface. Use the product data from the original plan (Task 1, Step 3) but add `asin` and `slug` fields, and use the mockup's category slugs (e.g., "lighting" not "desk-lamps", "keyboards" not "keyboard-trays").

Map the PRD categories to the mockup's 10 categories:
- standing-desks → standing-desks (6 products)
- ergonomic-chairs → ergonomic-chairs (6 products)
- monitor-arms → monitor-arms (5 products)
- desk-mats → desk-mats (5 products)
- webcams → webcams (5 products)
- keyboards → keyboards (5 products — mechanical keyboards)
- mice → mice (5 products — wireless mice)
- monitors → monitors (5 products — 4K monitors)
- lighting → lighting (5 products — desk lamps + ring lights)
- cable-management → cable-management (5 products)

- [ ] **Step 3: Create `src/content/guides.json`**

10 guides with full metadata matching the `Guide` interface.

- [ ] **Step 4: Create `src/lib/data.ts`**

```typescript
import categoriesData from "@/content/categories.json";
import productsData from "@/content/products.json";
import guidesData from "@/content/guides.json";
import type { Category, Product, Guide } from "./types";

export function getCategories(): Category[] {
  return categoriesData.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.categories.find((c: Category) => c.slug === slug);
}

export function getProducts(): Product[] {
  return productsData.products;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return productsData.products
    .filter((p: Product) => p.category === categorySlug)
    .sort((a: Product, b: Product) => a.rank - b.rank);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find((p: Product) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return productsData.products
    .filter((p: Product) => p.featured)
    .sort((a: Product, b: Product) => a.rank - b.rank);
}

export function getGuides(): Guide[] {
  return guidesData.guides;
}

export function getFeaturedGuides(): Guide[] {
  return guidesData.guides.filter((g: Guide) => g.featured);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guidesData.guides.find((g: Guide) => g.slug === slug);
}
```

- [ ] **Step 5: Create `src/lib/affiliate.ts`**

```typescript
import { SITE } from "./site-config";

export function amazonLink(asin: string): string {
  if (!asin || asin === "PLACEHOLDER") {
    return "#";
  }
  return `https://www.amazon.com/dp/${asin}?tag=${SITE.amazonTag}`;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/content/ src/lib/data.ts src/lib/affiliate.ts
git commit -m "feat: add product/category/guide data and data access layer"
```

---

## Task 4: Shared Components — Header, Footer, UI Primitives

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/Badge.tsx`
- Create: `src/components/StarRating.tsx`
- Create: `src/components/AffiliateButton.tsx`
- Create: `src/components/AffiliateDisclosure.tsx`
- Create: `src/components/AdSlot.tsx`
- Create: `src/components/NewsletterCTA.tsx`
- Create: `src/components/BackToTop.tsx`
- Create: `src/components/ScrollProgress.tsx`

- [ ] **Step 1: Create `src/components/Header.tsx`**

Port the mockup's `Layout.tsx` Header component. Convert from react-router-dom `<Link>` to Next.js `next/link`. Convert from `motion` to `framer-motion`. Keep the exact same design:
- Fixed header with scroll detection (transparent → frosted glass on scroll)
- Logo: indigo icon + "DeskSetup**Pro**" text
- Desktop nav: Home, Reviews (dropdown with all 10 categories), Guides, Blog, About
- "Setup Quiz" CTA button
- Mobile hamburger with AnimatePresence drawer
- Import categories from `@/lib/data`

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Laptop } from "lucide-react";
import { getCategories } from "@/lib/data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const pathname = usePathname();
  const categories = getCategories();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-3"
          : "bg-transparent py-6"
      }`}
    >
      {/* ... exact same JSX as mockup but with next/link Links ... */}
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

Port the mockup's Footer. Convert `Link` to `next/link`. Same 4-column layout, affiliate disclaimer, copyright.

- [ ] **Step 3: Create remaining UI primitives**

Each is a small focused component:

**Badge.tsx** — Renders badge variants (Editor's Choice=emerald, Budget Pick=blue, etc.)
**StarRating.tsx** — Renders star icons based on rating number using Lucide Star icon
**AffiliateButton.tsx** — Amazon CTA button with `href` from `amazonLink(asin)`, `rel="sponsored nofollow noopener"`, `target="_blank"`
**AffiliateDisclosure.tsx** — Inline banner at top of review/guide pages
**AdSlot.tsx** — Placeholder div with "SPONSORED PLACEMENT" text matching mockup style
**NewsletterCTA.tsx** — Indigo card with email input, matching mockup sidebar CTA design
**BackToTop.tsx** — "use client" component, shows after 1000px scroll, indigo button with ArrowUp
**ScrollProgress.tsx** — "use client" component, fixed top bar using `useScroll` + `useSpring` from framer-motion

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: add header, footer, and UI primitive components"
```

---

## Task 5: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

```powershell
npm run dev
```

Open http://localhost:3000 and verify header/footer render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with fonts, metadata, header, and footer"
```

---

## Task 6: Homepage

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/FeaturedPicks.tsx`
- Create: `src/components/CategoryGrid.tsx`
- Create: `src/components/TrustSection.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

Port the mockup's hero section exactly. "use client" for Framer Motion animations. Floating gradient orbs, stagger-animated headline "The Science of a Perfect Workspace.", subtitle, two CTA buttons ("Explore The Gear" → /reviews/standing-desks, "Start The Quiz" → /guides/how-to-build-the-perfect-home-office), "Trusted by 500k+ Remote Professionals" badge.

- [ ] **Step 2: Create `src/components/FeaturedPicks.tsx`**

Port the mockup's "Master List 01" section. Uses `getFeaturedProducts()` from data layer. 3-column grid of glass cards with product image (placeholder), rating badge, price, verdict quote, "Read The Breakdown" CTA linking to the product's category page.

- [ ] **Step 3: Create `src/components/CategoryGrid.tsx`**

Port the mockup's "Browse The Lab" section. Renders all 10 categories from `getCategories()`. Each card has the Lucide icon (dynamically loaded), category name, item count, hover animations (translate-y, border glow, icon rotate).

- [ ] **Step 4: Create `src/components/TrustSection.tsx`**

Port the mockup's "Our Editorial Pact" section. 3-column layout with Microscope and Award icons, glass cards.

- [ ] **Step 5: Create `src/app/page.tsx`**

Compose homepage from components:

```typescript
import { Hero } from "@/components/Hero";
import { FeaturedPicks } from "@/components/FeaturedPicks";
import { CategoryGrid } from "@/components/CategoryGrid";
import { TrustSection } from "@/components/TrustSection";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterCTA } from "@/components/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="pt-24 md:pt-12 overflow-x-hidden">
      <Hero />
      <FeaturedPicks />
      <CategoryGrid />
      <AdSlot />
      <TrustSection />
      <NewsletterCTA variant="full-width" />
    </div>
  );
}
```

- [ ] **Step 6: Test in browser**

Run `npm run dev`. Verify: hero animations play, featured picks grid renders, category cards link correctly, mobile responsive at 320/768/1024/1280px.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/components/Hero.tsx src/components/FeaturedPicks.tsx src/components/CategoryGrid.tsx src/components/TrustSection.tsx
git commit -m "feat: add homepage with hero, featured picks, category grid, and trust section"
```

---

## Task 7: Category Review Pages (Dynamic Route)

**Files:**
- Create: `src/app/reviews/[slug]/page.tsx`
- Create: `src/components/ComparisonTable.tsx`
- Create: `src/components/ProductReviewCard.tsx`
- Create: `src/components/BuyingGuide.tsx`
- Create: `src/components/FaqAccordion.tsx`
- Create: `src/components/Sidebar.tsx`
- Create: `src/content/category-content.ts` (buying guide + FAQ content per category)

- [ ] **Step 1: Create `src/content/category-content.ts`**

This file holds the buying guide sections and FAQ data for each category. It's a TypeScript file exporting a `Record<string, { buyingGuide: { title: string; content: string }[]; faqs: FaqItem[] }>`.

Each of the 10 categories gets:
- 4–6 buying guide subsections (title + paragraph)
- 5 FAQ items (question + answer)

Content for all 10 categories included.

- [ ] **Step 2: Create `src/components/ComparisonTable.tsx`**

Port the mockup's "Quick Benchmarks" table. "use client" component with sort state. Props: `products: Product[]`. Renders:
- Frosted glass container with `rounded-[2.5rem]`
- Column headers: Gear, Score, Price, Action — all clickable for sort
- Animated rating bars using `motion.div`
- Editor's Choice rows highlighted with `bg-indigo-600/5`
- "Check Amazon" button per row using `AffiliateButton`
- Price disclaimer below table

- [ ] **Step 3: Create `src/components/ProductReviewCard.tsx`**

Port the mockup's individual review section. Props: `product: Product, index: number`. Renders:
- Numbered circle (01, 02...) + product name as H2
- Star rating display
- Large image placeholder (aspect 21:9, rounded-[2.5rem])
- Pros (emerald bg) / Cons (rose bg) grid with Check/X icons
- Verdict quote (italic)
- Review description paragraph
- Specs display in glass card with "Check Retailer Price" CTA
- All using the exact mockup styling

- [ ] **Step 4: Create `src/components/BuyingGuide.tsx`**

Props: `categorySlug: string`. Loads buying guide content from `category-content.ts`. Renders the BookOpen icon header + glass card with subsections.

- [ ] **Step 5: Create `src/components/FaqAccordion.tsx`**

"use client" component. Props: `faqs: FaqItem[]`. Port the mockup's FAQ with AnimatePresence, ChevronRight rotation, glass-card styling.

Includes JSON-LD FAQPage schema in a `<script type="application/ld+json">` tag.

- [ ] **Step 6: Create `src/components/Sidebar.tsx`**

Port the mockup's sticky sidebar. Props: `products: Product[]`. Renders:
- "Navigation Directory" with jump links (01. Quick Benchmarks, 02. Top Recommendations, product names indented, 03. Buying Guide, 04. FAQ)
- Newsletter CTA (indigo card)
- Sponsorship placeholder

- [ ] **Step 7: Create `src/app/reviews/[slug]/page.tsx`**

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory, getCategories } from "@/lib/data";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProductReviewCard } from "@/components/ProductReviewCard";
import { BuyingGuide } from "@/components/BuyingGuide";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Sidebar } from "@/components/Sidebar";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { getCategoryContent } from "@/content/category-content";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.metaTitle,
    description: category.metaDescription,
  };
}

export default function CategoryReviewPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);
  const content = getCategoryContent(params.slug);

  return (
    <div className="pt-24 md:pt-12 bg-slate-950 min-h-screen">
      <ScrollProgress />

      {/* Hero section with breadcrumb, title, description, author, date */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* ... port from mockup CategoryReview.tsx hero ... */}
      </section>

      <AffiliateDisclosure />

      <div className="section-container py-0 flex flex-col lg:flex-row gap-16">
        <main className="flex-1 min-w-0">
          <ComparisonTable products={products} />

          <section id="reviews" className="space-y-40 mb-32 scroll-mt-32">
            {products.map((product, idx) => (
              <ProductReviewCard key={product.id} product={product} index={idx} />
            ))}
          </section>

          <BuyingGuide categorySlug={params.slug} />
          <FaqAccordion faqs={content.faqs} />
        </main>

        <Sidebar products={products} />
      </div>

      <BackToTop />
    </div>
  );
}
```

- [ ] **Step 8: Test in browser**

Navigate to `/reviews/standing-desks`. Verify: hero renders, comparison table sorts, product cards display with all data from JSON, FAQ accordion works, sidebar TOC links scroll correctly, affiliate buttons have correct hrefs.

- [ ] **Step 9: Commit**

```bash
git add src/app/reviews/ src/components/ComparisonTable.tsx src/components/ProductReviewCard.tsx src/components/BuyingGuide.tsx src/components/FaqAccordion.tsx src/components/Sidebar.tsx src/content/category-content.ts
git commit -m "feat: add category review pages with comparison table, product cards, buying guide, FAQ"
```

---

## Task 8: MDX Infrastructure + Guide Pages

**Files:**
- Create: `src/lib/mdx.ts`
- Create: `src/components/mdx/MdxContent.tsx`
- Create: `src/components/mdx/ProductCard.tsx`
- Create: `src/components/mdx/ProsCons.tsx`
- Create: `src/content/guides/*.mdx` (10 files)
- Create: `src/app/guides/page.tsx`
- Create: `src/app/guides/[slug]/page.tsx`

- [ ] **Step 1: Create `src/lib/mdx.ts`**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getGuideContent(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  return { content, frontmatter: data };
}

export function getBlogContent(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  return { content, frontmatter: data };
}

export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
```

- [ ] **Step 2: Create MDX components**

**MdxContent.tsx** — Client component that uses `next-mdx-remote` to render MDX with custom component overrides. Maps `<ProductCard>`, `<ProsCons>`, `<h2>`, `<h3>`, `<a>` to styled components.

**ProductCard.tsx** — Takes `productId` prop, looks up product from data, renders a glass-card with image, name, rating, price, and Amazon CTA. Used inline in guide content.

**ProsCons.tsx** — Takes `pros` and `cons` string arrays, renders the emerald/rose boxes from the mockup design.

- [ ] **Step 3: Create 10 guide MDX files**

Each guide MDX file in `src/content/guides/` has:
- YAML frontmatter (title, description, author, date, readTime, image)
- Long-form content with H2/H3 sections
- Inline `<ProductCard productId="..." />` components for recommendations
- 1,000–2,000 words of editorial content

Files:
1. `best-standing-desks-under-500.mdx`
2. `best-ergonomic-chairs-compared.mdx`
3. `minimal-desk-setup-guide.mdx`
4. `cable-management-solutions.mdx`
5. `dual-monitor-setup-guide.mdx`
6. `best-wfh-accessories.mdx`
7. `how-to-build-the-perfect-home-office.mdx`
8. `ergonomic-desk-setup-checklist.mdx`
9. `budget-desk-setup-under-300.mdx`
10. `desk-setup-for-developers.mdx`

- [ ] **Step 4: Create `src/app/guides/page.tsx`**

Guides listing page. Grid of guide cards (glass-card style) showing title, description, read time, date. Uses `getGuides()`.

- [ ] **Step 5: Create `src/app/guides/[slug]/page.tsx`**

Dynamic route for individual guides. Uses `generateStaticParams()` from `getAllGuideSlugs()`. Renders MDX content with sidebar TOC, affiliate disclosure, AdSense slots.

```typescript
import { getGuideBySlug } from "@/lib/data";
import { getGuideContent, getAllGuideSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Sidebar } from "@/components/Sidebar";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  const { content } = getGuideContent(params.slug);

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      {/* Guide hero: title, author, date, read time */}
      <div className="section-container flex flex-col lg:flex-row gap-16">
        <article className="flex-1 min-w-0 article-content">
          <MdxContent source={content} />
        </article>
        {/* Sidebar with TOC */}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Test**

Navigate to `/guides/` and `/guides/best-standing-desks-under-500`. Verify: listing page shows all 10 guides, individual guide renders MDX with inline product cards.

- [ ] **Step 7: Commit**

```bash
git add src/lib/mdx.ts src/components/mdx/ src/content/guides/ src/app/guides/
git commit -m "feat: add MDX infrastructure and 10 guide pages"
```

---

## Task 9: Blog Section

**Files:**
- Create: `src/content/blog/*.mdx` (3 blog posts)
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create 3 blog post MDX files**

Each has frontmatter (title, description, author, date, readTime, image, tags) and 800–1,500 words of content.

1. `standing-desk-vs-sitting-desk.mdx`
2. `how-to-reduce-back-pain-wfh.mdx`
3. `best-desk-plants-for-productivity.mdx`

- [ ] **Step 2: Create `src/app/blog/page.tsx`**

Blog listing with glass-card grid.

- [ ] **Step 3: Create `src/app/blog/[slug]/page.tsx`**

Individual blog post page with MDX rendering, sidebar, JSON-LD Article schema.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/ src/app/blog/
git commit -m "feat: add blog listing and 3 blog posts"
```

---

## Task 10: Legal & Info Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/privacy-policy/page.tsx`
- Create: `src/app/affiliate-disclosure/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create all 6 pages**

Each uses the glass-card design system. Static content:

**about/page.tsx** — Mission statement, "Our Process" (research, testing, writing), "Our Promise" (editorial independence), team placeholder.

**contact/page.tsx** — Contact form (name, email, subject, message) with glass-card styling. Form action="#" placeholder.

**privacy-policy/page.tsx** — Full privacy policy required for AdSense. Sections: Information We Collect, Cookies (Google Analytics, AdSense), Third-Party Services, Your Rights, Children's Privacy, Contact.

**affiliate-disclosure/page.tsx** — FTC disclosure. What Are Affiliate Links, How We Make Money, Does This Affect Reviews, Amazon Associates disclosure text.

**terms/page.tsx** — Standard TOS.

**not-found.tsx** — Custom 404 with "Page Not Found" message, link to homepage and category grid.

- [ ] **Step 2: Commit**

```bash
git add src/app/about/ src/app/contact/ src/app/privacy-policy/ src/app/affiliate-disclosure/ src/app/terms/ src/app/not-found.tsx
git commit -m "feat: add legal pages (about, contact, privacy, disclosure, terms, 404)"
```

---

## Task 11: Sitemap Generation & SEO Finalization

**Files:**
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json` (add prebuild script)

- [ ] **Step 1: Create `scripts/generate-sitemap.mjs`**

```javascript
import fs from "fs";
import path from "path";

const SITE_URL = "https://desksetuppro.com";
const today = new Date().toISOString().split("T")[0];

const categories = JSON.parse(
  fs.readFileSync("src/content/categories.json", "utf-8")
).categories;

const guides = JSON.parse(
  fs.readFileSync("src/content/guides.json", "utf-8")
).guides;

const blogSlugs = fs
  .readdirSync("src/content/blog")
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(".mdx", ""));

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/about/", priority: "0.4", changefreq: "monthly" },
  { loc: "/contact/", priority: "0.3", changefreq: "monthly" },
  { loc: "/privacy-policy/", priority: "0.2", changefreq: "yearly" },
  { loc: "/affiliate-disclosure/", priority: "0.2", changefreq: "yearly" },
  { loc: "/terms/", priority: "0.2", changefreq: "yearly" },
  { loc: "/guides/", priority: "0.7", changefreq: "weekly" },
  { loc: "/blog/", priority: "0.6", changefreq: "weekly" },
  ...categories.map((c) => ({
    loc: `/reviews/${c.slug}/`,
    priority: "0.9",
    changefreq: "weekly",
  })),
  ...guides.map((g) => ({
    loc: `/guides/${g.slug}/`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...blogSlugs.map((slug) => ({
    loc: `/blog/${slug}/`,
    priority: "0.6",
    changefreq: "monthly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log(`Sitemap generated: ${urls.length} URLs`);
```

- [ ] **Step 2: Update `package.json` build script**

```json
"build": "node scripts/generate-sitemap.mjs && next build"
```

- [ ] **Step 3: Run full build**

```powershell
npm run build
```

Verify: `out/` directory contains all pages as static HTML, `public/sitemap.xml` exists with all URLs.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-sitemap.mjs package.json public/sitemap.xml
git commit -m "feat: add sitemap generation and finalize SEO"
```

---

## Task 12: Final Review & Quality Check

- [ ] **Step 1: Full build and verify**

```powershell
npm run build
```

Check the `out/` directory contains:
- `index.html` (homepage)
- `reviews/standing-desks/index.html` (and all 9 other categories)
- `guides/index.html` + 10 guide pages
- `blog/index.html` + 3 blog posts
- `about/`, `contact/`, `privacy-policy/`, `affiliate-disclosure/`, `terms/` pages
- `404.html`
- `sitemap.xml`, `robots.txt`, `CNAME`

- [ ] **Step 2: Test in browser (dev mode)**

Run `npm run dev` and check:
- Homepage: hero animations, featured picks, category grid, all links work
- Category pages: table sorting, product cards, FAQ accordion, sidebar TOC
- Guide pages: MDX renders correctly, inline product cards work
- Blog pages: listing and individual posts render
- Legal pages: all content displays
- Mobile responsive at 320px, 768px, 1024px
- All internal links navigate correctly

- [ ] **Step 3: Validate SEO**

For every page type, verify:
- Unique `<title>` and `<meta name="description">`
- Open Graph tags
- JSON-LD structured data (FAQPage on category pages, Article on guides/blog)
- Proper heading hierarchy (one H1 per page)
- `rel="sponsored nofollow noopener"` on all affiliate links
- Canonical URLs

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final review — verify build, responsive design, SEO, and all pages"
```
