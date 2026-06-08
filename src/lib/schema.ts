import { SITE, absoluteUrl } from "./site-config";
import { amazonLink } from "./affiliate";
import type { Category, Product, Guide } from "./types";

// Trailing-slash absolute URL (matches next.config trailingSlash: true).
function url(path: string): string {
  const p = path.endsWith("/") ? path : `${path}/`;
  return absoluteUrl(p);
}

// Parse "$1,499.99" -> "1499.99". Returns null if no number found.
function parsePrice(display?: string): string | null {
  if (!display) return null;
  const m = display.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  return m ? m[1] : null;
}

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: absoluteUrl("/images/logo.png"),
    description: SITE.description,
    sameAs: [SITE.social.twitter, SITE.social.pinterest, SITE.social.instagram],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

// Editorial Review nested in a Product. Uses our curated rating as the
// reviewRating (a publisher's editorial score), plus a live Offer.
export function productReviewSchema(product: Product) {
  const rating = product.amazonRating || product.rating;
  const price = parsePrice(product.amazonPrice || product.priceRange);
  const buyUrl = amazonLink(product.asin, product.amazonUrl);

  const offers = price
    ? {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: buyUrl !== "#" ? buyUrl : url(`/reviews/${product.category}`),
      }
    : undefined;

  return {
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    ...(product.amazonImageUrl ? { image: product.amazonImageUrl } : {}),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating,
        bestRating: 5,
      },
      author: { "@type": "Organization", name: SITE.name },
    },
    ...(offers ? { offers } : {}),
  };
}

// ItemList of the category's products, each an editorial-reviewed Product.
export function reviewItemListSchema(category: Category, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.name}`,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: productReviewSchema(product),
    })),
  };
}

// Homepage ItemList linking the category review pages (helps sitelinks/coverage).
export function categoryListSchema(categories: Category[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} Review Categories`,
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: url(`/reviews/${c.slug}`),
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    author: { "@type": "Organization", name: opts.author || SITE.name },
    publisher: { "@id": ORG_ID },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url(opts.path) },
  };
}

export type { Category, Product, Guide };
