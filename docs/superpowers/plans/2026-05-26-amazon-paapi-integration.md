# Amazon PA-API 5.0 Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Amazon Product Advertising API 5.0 to fetch real product data (prices, images, customer ratings, review counts) at build time, filter for high-rated products only (4+ stars), and generate working affiliate links — replacing all PLACEHOLDER ASINs.

**Architecture:** A Node.js build-time script (`scripts/fetch-amazon-products.mjs`) calls PA-API 5.0 `SearchItems` to find products by name per category, filters results to 4+ star ratings, and writes enriched data back to `products.json`. The script runs before `next build` in the build pipeline. Product types are extended with new Amazon fields (`amazonPrice`, `amazonImageUrl`, `amazonRating`, `reviewCount`, `amazonUrl`). Components are updated to display real Amazon data (live prices, review counts, product images).

**Tech Stack:** Node.js, Amazon PA-API 5.0 (paapi5-nodejs-sdk), dotenv, Next.js 16 static export

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `scripts/fetch-amazon-products.mjs` | Build-time script that calls PA-API, filters by rating, enriches products.json |
| `.env.local` | Amazon API credentials (never committed) |
| `.env.example` | Template showing required env vars (committed) |
| `src/lib/amazon.ts` | Type definitions and helper utilities for Amazon data fields |

### Modified Files
| File | Changes |
|------|---------|
| `src/lib/types.ts` | Add `amazonPrice`, `amazonImageUrl`, `amazonRating`, `reviewCount`, `amazonUrl` fields to `Product` |
| `src/lib/affiliate.ts` | Use `amazonUrl` when available, fall back to ASIN-based link |
| `src/content/products.json` | Script writes enriched data here (new fields per product) |
| `src/components/ProductReviewCard.tsx` | Display real price, Amazon rating, review count, product image |
| `src/components/ComparisonTable.tsx` | Display real price and review count columns |
| `src/components/FeaturedPicks.tsx` | Display real price and product image |
| `src/components/AffiliateButton.tsx` | Accept `amazonUrl` prop as primary link source |
| `src/components/StarRating.tsx` | Accept optional `reviewCount` prop |
| `package.json` | Add `paapi5-nodejs-sdk`, `dotenv`; update build script |
| `.gitignore` | Add `.env.local` |

---

### Task 1: Install Dependencies and Set Up Environment

**Files:**
- Modify: `package.json`
- Create: `.env.example`
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Install paapi5-nodejs-sdk and dotenv**

```bash
npm install paapi5-nodejs-sdk dotenv
```

- [ ] **Step 2: Create `.env.example` with required variable names**

```env
# Amazon Product Advertising API 5.0 Credentials
AMAZON_ACCESS_KEY=your_access_key_here
AMAZON_SECRET_KEY=your_secret_key_here
AMAZON_PARTNER_TAG=desksetuppicks-20
AMAZON_MARKETPLACE=www.amazon.com
```

- [ ] **Step 3: Create `.env.local` with your actual credentials**

```env
AMAZON_ACCESS_KEY=<your-real-access-key>
AMAZON_SECRET_KEY=<your-real-secret-key>
AMAZON_PARTNER_TAG=desksetuppicks-20
AMAZON_MARKETPLACE=www.amazon.com
```

- [ ] **Step 4: Add `.env.local` to `.gitignore`**

Append to `.gitignore`:
```
# Amazon API credentials
.env.local
```

- [ ] **Step 5: Verify `.env.local` is ignored by git**

Run: `git status`
Expected: `.env.local` should NOT appear in untracked files.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example .gitignore
git commit -m "feat: add amazon pa-api dependencies and env config"
```

---

### Task 2: Extend Product Types with Amazon Data Fields

**Files:**
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Add Amazon-specific fields to the Product interface**

In `src/lib/types.ts`, add these optional fields to the `Product` interface after `lastUpdated`:

```typescript
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
  // Amazon PA-API enriched fields
  amazonPrice?: string;
  amazonListPrice?: string;
  amazonImageUrl?: string;
  amazonRating?: number;
  reviewCount?: number;
  amazonUrl?: string;
  lastAmazonSync?: string;
}
```

- [ ] **Step 2: Verify the build still works**

Run: `npx next build`
Expected: Build succeeds — all existing code still works since new fields are optional (`?`).

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: extend Product type with Amazon PA-API fields"
```

---

### Task 3: Build the Amazon PA-API Fetch Script

**Files:**
- Create: `scripts/fetch-amazon-products.mjs`

This is the core script. It reads `products.json`, searches Amazon for each product by name (scoped by category-appropriate search index), filters for 4+ star products, and writes enriched data back.

- [ ] **Step 1: Create the fetch script with PA-API client setup**

Create `scripts/fetch-amazon-products.mjs`:

```javascript
import "dotenv/config";
import fs from "fs";
import ProductAdvertisingAPIv1 from "paapi5-nodejs-sdk";

const ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
const SECRET_KEY = process.env.AMAZON_SECRET_KEY;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "desksetuppicks-20";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.com";
const MIN_RATING = 4.0;

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("Missing AMAZON_ACCESS_KEY or AMAZON_SECRET_KEY in .env.local");
  process.exit(1);
}

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
defaultClient.accessKey = ACCESS_KEY;
defaultClient.secretKey = SECRET_KEY;
defaultClient.host = MARKETPLACE;
defaultClient.region = "us-east-1";

const api = new ProductAdvertisingAPIv1.DefaultApi();

const CATEGORY_SEARCH_INDEX = {
  "standing-desks": "OfficeProducts",
  "ergonomic-chairs": "OfficeProducts",
  "monitor-arms": "OfficeProducts",
  "desk-mats": "OfficeProducts",
  "webcams": "Electronics",
  "keyboards": "Electronics",
  "mice": "Electronics",
  "monitors": "Electronics",
  "lighting": "Tools",
  "cable-management": "OfficeProducts",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchProduct(productName, category) {
  const searchIndex = CATEGORY_SEARCH_INDEX[category] || "All";

  const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
  searchItemsRequest.PartnerTag = PARTNER_TAG;
  searchItemsRequest.PartnerType = "Associates";
  searchItemsRequest.Keywords = productName;
  searchItemsRequest.SearchIndex = searchIndex;
  searchItemsRequest.ItemCount = 3;
  searchItemsRequest.Resources = [
    "ItemInfo.Title",
    "Offers.Listings.Price",
    "Offers.Listings.SavingBasis",
    "Images.Primary.Large",
    "CustomerReviews.StarRating",
    "CustomerReviews.Count",
    "BrowseNodeInfo.BrowseNodes",
  ];

  try {
    const data = await api.searchItems(searchItemsRequest);

    if (!data.SearchResult || !data.SearchResult.Items || data.SearchResult.Items.length === 0) {
      console.warn(`  No results for: ${productName}`);
      return null;
    }

    for (const item of data.SearchResult.Items) {
      const starRating = item.CustomerReviews?.StarRating?.Value;
      const ratingValue = starRating ? parseFloat(starRating) : null;

      if (ratingValue !== null && ratingValue < MIN_RATING) {
        console.warn(`  Skipping "${item.ItemInfo?.Title?.DisplayValue}" — rating ${ratingValue} < ${MIN_RATING}`);
        continue;
      }

      const price = item.Offers?.Listings?.[0]?.Price?.DisplayAmount || null;
      const listPrice = item.Offers?.Listings?.[0]?.SavingBasis?.DisplayAmount || null;
      const imageUrl = item.Images?.Primary?.Large?.URL || null;
      const reviewCount = item.CustomerReviews?.Count || null;
      const detailPageUrl = item.DetailPageURL || null;
      const asin = item.ASIN;

      return {
        asin,
        amazonPrice: price,
        amazonListPrice: listPrice,
        amazonImageUrl: imageUrl,
        amazonRating: ratingValue,
        reviewCount: reviewCount,
        amazonUrl: detailPageUrl,
      };
    }

    console.warn(`  All results for "${productName}" below ${MIN_RATING} stars — skipping`);
    return null;
  } catch (error) {
    const errMsg = error?.response?.body || error?.message || error;
    console.error(`  API error for "${productName}":`, errMsg);
    return null;
  }
}

async function main() {
  console.log("=== Amazon PA-API Product Enrichment ===");
  console.log(`Minimum rating filter: ${MIN_RATING}+ stars\n`);

  const productsFile = "src/content/products.json";
  const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  const products = data.products;

  let enrichedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Searching: ${product.name}`);

    const result = await searchProduct(product.name, product.category);

    if (result) {
      product.asin = result.asin;
      product.amazonPrice = result.amazonPrice;
      product.amazonListPrice = result.amazonListPrice;
      product.amazonImageUrl = result.amazonImageUrl;
      product.amazonRating = result.amazonRating;
      product.reviewCount = result.reviewCount;
      product.amazonUrl = result.amazonUrl;
      product.lastAmazonSync = today;
      enrichedCount++;
      console.log(`  ✓ Found: ${result.amazonPrice || "no price"} | ${result.amazonRating || "?"}/5 | ${result.reviewCount || 0} reviews`);
    } else {
      skippedCount++;
    }

    // Respect PA-API rate limit: 1 request per second
    if (i < products.length - 1) {
      await sleep(1100);
    }
  }

  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2) + "\n");

  console.log("\n=== Summary ===");
  console.log(`Enriched: ${enrichedCount}`);
  console.log(`Skipped (low rating / not found): ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Products written to: ${productsFile}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Test the script with a dry run (verify credentials work)**

Run: `node scripts/fetch-amazon-products.mjs`
Expected: Script starts, prints product names, fetches data from Amazon (or reports credential errors if keys aren't configured yet). Products with <4 stars are skipped with a log message.

- [ ] **Step 3: Verify products.json was enriched**

Run: `head -40 src/content/products.json`
Expected: First product should now have real values for `asin`, `amazonPrice`, `amazonImageUrl`, `amazonRating`, `reviewCount`, `amazonUrl`, `lastAmazonSync` fields.

- [ ] **Step 4: Commit**

```bash
git add scripts/fetch-amazon-products.mjs
git commit -m "feat: add PA-API fetch script with 4+ star rating filter"
```

---

### Task 4: Update Affiliate Link Generation

**Files:**
- Modify: `src/lib/affiliate.ts`

- [ ] **Step 1: Update `amazonLink()` to prefer `amazonUrl` when available**

Replace the contents of `src/lib/affiliate.ts`:

```typescript
import { SITE } from "./site-config";

export function amazonLink(asin: string, amazonUrl?: string): string {
  if (amazonUrl) {
    const url = new URL(amazonUrl);
    url.searchParams.set("tag", SITE.amazonTag);
    return url.toString();
  }
  if (!asin || asin === "PLACEHOLDER") {
    return "#";
  }
  return `https://www.amazon.com/dp/${asin}?tag=${SITE.amazonTag}`;
}
```

- [ ] **Step 2: Verify the build still works**

Run: `npx next build`
Expected: Build succeeds. The new `amazonUrl` parameter is optional so all existing callers still work.

- [ ] **Step 3: Commit**

```bash
git add src/lib/affiliate.ts
git commit -m "feat: update affiliate link to prefer amazon detail page URL"
```

---

### Task 5: Update AffiliateButton Component

**Files:**
- Modify: `src/components/AffiliateButton.tsx`

- [ ] **Step 1: Add `amazonUrl` prop to AffiliateButton**

Replace the contents of `src/components/AffiliateButton.tsx`:

```tsx
import { ExternalLink } from "lucide-react";
import { amazonLink } from "@/lib/affiliate";

interface AffiliateButtonProps {
  asin: string;
  amazonUrl?: string;
  label?: string;
  variant?: "primary" | "table";
}

export function AffiliateButton({
  asin,
  amazonUrl,
  label = "Check Retailer Price",
  variant = "primary",
}: AffiliateButtonProps) {
  const href = amazonLink(asin, amazonUrl);

  if (variant === "table") {
    return (
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="px-6 py-3 bg-white text-slate-950 text-xs font-black rounded-xl hover:bg-indigo-400 hover:text-white transition-all duration-300"
      >
        Check Amazon
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="w-full xl:w-auto px-10 py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center space-x-3 hover:bg-indigo-500 transition-all duration-300 shadow-2xl shadow-indigo-600/20 hover:scale-105 active:scale-95"
    >
      <span>{label}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AffiliateButton.tsx
git commit -m "feat: add amazonUrl prop to AffiliateButton"
```

---

### Task 6: Update StarRating to Show Review Count

**Files:**
- Modify: `src/components/StarRating.tsx`

- [ ] **Step 1: Add optional `reviewCount` prop**

Replace the contents of `src/components/StarRating.tsx`:

```tsx
import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? "text-indigo-400 fill-indigo-400"
              : "text-slate-800"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-white">{rating}</span>
      {reviewCount != null && (
        <span className="ml-1 text-xs text-slate-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StarRating.tsx
git commit -m "feat: add review count display to StarRating"
```

---

### Task 7: Update ProductReviewCard to Show Amazon Data

**Files:**
- Modify: `src/components/ProductReviewCard.tsx`

- [ ] **Step 1: Update ProductReviewCard to display Amazon price, image, rating, and review count**

Replace the contents of `src/components/ProductReviewCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { StarRating } from "./StarRating";
import { Badge } from "./Badge";
import { AffiliateButton } from "./AffiliateButton";
import type { Product } from "@/lib/types";

export function ProductReviewCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const isEditorChoice = product.badges.includes("Editor's Choice");
  const specs = Object.entries(product.specifications);
  const displayPrice = product.amazonPrice || product.priceRange;

  return (
    <motion.div
      id={`review-${product.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start space-x-6 mb-4">
          <span className="text-6xl md:text-8xl font-black text-indigo-600/20 leading-none select-none">
            {num}
          </span>
          <div className="pt-2 md:pt-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {product.name}
            </h2>
            <div className="mt-3">
              <StarRating
                rating={product.amazonRating || product.rating}
                reviewCount={product.reviewCount}
              />
            </div>
          </div>
        </div>
        {isEditorChoice && (
          <div className="flex flex-wrap gap-2 mt-4 ml-0 md:ml-20">
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>
        )}
      </div>

      {/* Product image */}
      <div className="aspect-[21/9] rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 mb-12 flex items-center justify-center overflow-hidden">
        {product.amazonImageUrl ? (
          <img
            src={product.amazonImageUrl}
            alt={product.name}
            className="max-h-full object-contain p-8"
          />
        ) : (
          <span className="text-xs text-slate-700 font-black uppercase tracking-widest">
            {product.imagePlaceholder}
          </span>
        )}
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-8 border-emerald-500/10">
          <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">
            What We Love
          </h3>
          <ul className="space-y-4">
            {product.prosAndCons.pros.map((pro, i) => (
              <li key={i} className="flex items-start space-x-3">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-none" />
                <span className="text-sm text-slate-300 leading-relaxed">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-8 border-rose-500/10">
          <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-6">
            What Could Improve
          </h3>
          <ul className="space-y-4">
            {product.prosAndCons.cons.map((con, i) => (
              <li key={i} className="flex items-start space-x-3">
                <X className="w-4 h-4 text-rose-400 mt-0.5 flex-none" />
                <span className="text-sm text-slate-300 leading-relaxed">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div className="mb-12">
        <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed">
          &ldquo;{product.shortDescription}&rdquo;
        </p>
      </div>

      {/* Specs + CTA */}
      <div className="glass-card p-8 md:p-10">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">
          Key Specifications
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {specs.map(([key, value]) => (
            <div key={key}>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">
                {key}
              </span>
              <span className="text-sm font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4">
          <AffiliateButton asin={product.asin} amazonUrl={product.amazonUrl} />
          <div className="flex flex-col">
            <span className="text-sm text-white font-bold">{displayPrice}</span>
            {product.amazonListPrice && product.amazonPrice !== product.amazonListPrice && (
              <span className="text-xs text-slate-500 line-through">
                {product.amazonListPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npx next build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProductReviewCard.tsx
git commit -m "feat: display Amazon price, image, rating, and review count in ProductReviewCard"
```

---

### Task 8: Update ComparisonTable to Show Amazon Data

**Files:**
- Modify: `src/components/ComparisonTable.tsx`

- [ ] **Step 1: Update ComparisonTable to display real prices and review counts**

Replace the contents of `src/components/ComparisonTable.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutList, ArrowUpDown } from "lucide-react";
import { AffiliateButton } from "./AffiliateButton";
import type { Product } from "@/lib/types";

type SortKey = "name" | "rating";
type SortDir = "asc" | "desc";

export function ComparisonTable({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "rating" ? "desc" : "asc");
    }
  }

  const sorted = [...products].sort((a, b) => {
    const mult = sortDir === "asc" ? 1 : -1;
    if (sortKey === "name") return mult * a.name.localeCompare(b.name);
    return mult * ((a.amazonRating || a.rating) - (b.amazonRating || b.rating));
  });

  return (
    <section id="benchmarks" className="mb-32 scroll-mt-32">
      <div className="flex items-center space-x-4 mb-10">
        <LayoutList className="w-6 h-6 text-indigo-400" />
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Quick Benchmarks
        </h2>
      </div>

      <div className="rounded-[2.5rem] border border-slate-900 shadow-2xl bg-slate-900/20 backdrop-blur-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="text-left px-8 py-6">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    <span>Gear</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-8 py-6">
                  <button
                    onClick={() => toggleSort("rating")}
                    className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    <span>Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-8 py-6">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Price
                  </span>
                </th>
                <th className="text-left px-8 py-6">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Reviews
                  </span>
                </th>
                <th className="text-right px-8 py-6">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((product, idx) => {
                const isEditorChoice = product.badges.includes("Editor's Choice");
                const displayPrice = product.amazonPrice || product.priceRange;
                const displayRating = product.amazonRating || product.rating;
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-slate-800/30 last:border-b-0 ${
                      isEditorChoice ? "bg-indigo-600/5" : ""
                    }`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-5">
                        <span className="text-xs font-black text-slate-600 w-6">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {product.amazonImageUrl ? (
                          <img
                            src={product.amazonImageUrl}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-contain bg-white flex-none"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                        )}
                        <div>
                          <span className="text-sm font-bold text-white">
                            {product.name}
                          </span>
                          {isEditorChoice && (
                            <span className="ml-3 text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                              Top Pick
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(displayRating / 5) * 100}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-sm font-black text-white">
                          {displayRating}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-300">
                        {displayPrice}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-400">
                        {product.reviewCount
                          ? product.reviewCount.toLocaleString()
                          : "—"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <AffiliateButton
                        asin={product.asin}
                        amazonUrl={product.amazonUrl}
                        variant="table"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden divide-y divide-slate-800/30">
          {sorted.map((product, idx) => {
            const isEditorChoice = product.badges.includes("Editor's Choice");
            const displayPrice = product.amazonPrice || product.priceRange;
            const displayRating = product.amazonRating || product.rating;
            return (
              <div
                key={product.id}
                className={`p-6 ${isEditorChoice ? "bg-indigo-600/5" : ""}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xs font-black text-slate-600">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {product.amazonImageUrl ? (
                    <img
                      src={product.amazonImageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-contain bg-white flex-none"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {product.name}
                    </span>
                    {isEditorChoice && (
                      <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                        Top Pick
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(displayRating / 5) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm font-black text-white">
                      {displayRating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.reviewCount && (
                      <span className="text-xs text-slate-500">
                        {product.reviewCount.toLocaleString()} reviews
                      </span>
                    )}
                    <span className="text-sm font-bold text-slate-300">
                      {displayPrice}
                    </span>
                  </div>
                </div>
                <AffiliateButton
                  asin={product.asin}
                  amazonUrl={product.amazonUrl}
                  variant="table"
                />
              </div>
            );
          })}
        </div>

        <div className="px-8 py-4 border-t border-slate-800/30">
          <p className="text-[10px] text-slate-600 italic">
            Prices updated via Amazon PA-API. Availability may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ComparisonTable.tsx
git commit -m "feat: display Amazon images, prices, and review counts in ComparisonTable"
```

---

### Task 9: Update FeaturedPicks to Show Amazon Data

**Files:**
- Modify: `src/components/FeaturedPicks.tsx`

- [ ] **Step 1: Update FeaturedPicks to use Amazon images and prices**

In `src/components/FeaturedPicks.tsx`, update the image and price display areas:

Replace the image placeholder area (the `<div className="relative aspect-[4/3]...">` block inside the `.map()`) with:

```tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-6 bg-gradient-to-br from-slate-800 to-slate-900">
  {product.amazonImageUrl && (
    <img
      src={product.amazonImageUrl}
      alt={product.name}
      className="absolute inset-0 w-full h-full object-contain p-6"
    />
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
  {product.badges.includes("Editor's Choice") && (
    <div className="absolute top-4 left-4">
      <span className="badge-best">TOP RATED</span>
    </div>
  )}
  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
    <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/50">
      <div className="flex items-center space-x-1">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-bold text-white">
          {product.amazonRating || product.rating}
        </span>
        {product.reviewCount && (
          <span className="text-[10px] text-slate-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        )}
      </div>
    </div>
    <span className="text-xl font-black text-white">
      {product.amazonPrice || product.priceRange}
    </span>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturedPicks.tsx
git commit -m "feat: display Amazon images and live prices in FeaturedPicks"
```

---

### Task 10: Update Build Script to Run Fetch Before Build

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add `fetch-products` script and update `build` script**

In `package.json`, update the `scripts` section:

```json
{
  "scripts": {
    "dev": "next dev",
    "fetch-products": "node scripts/fetch-amazon-products.mjs",
    "build": "node scripts/fetch-amazon-products.mjs && node scripts/generate-sitemap.mjs && next build",
    "build:no-fetch": "node scripts/generate-sitemap.mjs && next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

Note: `build:no-fetch` allows local builds without API calls (useful for development or when credentials aren't available).

- [ ] **Step 2: Verify the full build pipeline**

Run: `npm run build`
Expected: Script fetches Amazon data → generates sitemap → builds static site. All pages render with enriched product data.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: add fetch-products script to build pipeline"
```

---

### Task 11: Graceful Fallback — Build Without Credentials

**Files:**
- Modify: `scripts/fetch-amazon-products.mjs`

- [ ] **Step 1: Make the script exit gracefully when credentials are missing**

At the top of `scripts/fetch-amazon-products.mjs`, replace the hard `process.exit(1)` block:

Change:
```javascript
if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("Missing AMAZON_ACCESS_KEY or AMAZON_SECRET_KEY in .env.local");
  process.exit(1);
}
```

To:
```javascript
if (!ACCESS_KEY || !SECRET_KEY) {
  console.warn("⚠ AMAZON_ACCESS_KEY or AMAZON_SECRET_KEY not set — skipping product enrichment.");
  console.warn("  Products will use existing data from products.json.");
  process.exit(0);
}
```

This ensures CI/CD environments without credentials can still build using whatever data is already in `products.json`.

- [ ] **Step 2: Commit**

```bash
git add scripts/fetch-amazon-products.mjs
git commit -m "feat: graceful fallback when Amazon credentials are missing"
```

---

### Task 12: Final Integration Verification

- [ ] **Step 1: Run the full build pipeline end-to-end**

```bash
npm run build
```

Expected: Fetch script runs → products.json enriched → sitemap generated → Next.js build succeeds → static site in `/out/`.

- [ ] **Step 2: Start the dev server and verify pages visually**

```bash
npm run dev
```

Open in browser and verify:
1. **Homepage** (`/`): Featured picks show Amazon images, real prices, ratings with review counts
2. **Category page** (e.g., `/reviews/standing-desks/`): ProductReviewCards show Amazon images, real prices, star ratings with review counts, strikethrough list prices for items on sale
3. **ComparisonTable**: Shows real prices, review count column, product thumbnails from Amazon
4. **Affiliate buttons**: All link to real Amazon product pages with `?tag=desksetuppicks-20`
5. **Products below 4 stars**: Should not appear (filtered out by the fetch script)

- [ ] **Step 3: Verify no PLACEHOLDER ASINs remain for enriched products**

```bash
grep -c "PLACEHOLDER" src/content/products.json
```

Expected: Count should be 0 for enriched products (may be non-zero only for products that couldn't be found on Amazon).

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Amazon PA-API 5.0 integration with high-rating filter"
```
