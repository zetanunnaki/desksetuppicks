import type { Category, Product, Guide } from "./types";

// ---- Quick picks (use-case matching from existing badge + price data) ----

function priceNum(p: Product): number {
  const m = (p.amazonPrice || p.priceRange || "").replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  return m ? parseFloat(m[1]) : NaN;
}
const hasBadge = (p: Product, b: string) =>
  (p.badges || []).some((x) => x.toLowerCase().includes(b));

export interface QuickPick {
  label: string;
  blurb: string;
  product: Product;
}

// Derive "best for…" picks from badges, falling back to price extremes.
export function getQuickPicks(products: Product[]): QuickPick[] {
  if (products.length < 2) return [];
  const byRank = [...products].sort((a, b) => a.rank - b.rank);
  const priced = products.filter((p) => !isNaN(priceNum(p)));

  const editors =
    products.find((p) => hasBadge(p, "editor")) || byRank[0];
  const value =
    products.find((p) => hasBadge(p, "value") || hasBadge(p, "budget")) ||
    (priced.length ? priced.reduce((a, b) => (priceNum(b) < priceNum(a) ? b : a)) : null);
  const premium =
    products.find((p) => hasBadge(p, "premium")) ||
    (priced.length ? priced.reduce((a, b) => (priceNum(b) > priceNum(a) ? b : a)) : null);

  const picks: QuickPick[] = [];
  const seen = new Set<string>();
  const add = (label: string, blurb: string, product: Product | null) => {
    if (product && !seen.has(product.id)) {
      picks.push({ label, blurb, product });
      seen.add(product.id);
    }
  };
  add("Top Pick", "Our overall editor's choice", editors);
  add("Best Value", "Most performance per dollar", value);
  add("Best Premium", "Top-end, no compromises", premium);
  return picks;
}

// ---- Related categories (curated internal-linking map) ----

const RELATED: Record<string, string[]> = {
  "standing-desks": ["ergonomic-chairs", "footrests", "monitor-arms", "cable-management"],
  "ergonomic-chairs": ["standing-desks", "footrests", "wrist-rests", "desk-mats"],
  "monitor-arms": ["monitors", "desk-shelves", "standing-desks", "cable-management"],
  "desk-mats": ["wrist-rests", "desk-organizers", "mice", "keyboards"],
  "webcams": ["microphones", "lighting", "headsets", "speakers"],
  "keyboards": ["mice", "wrist-rests", "desk-mats", "usb-hubs"],
  "mice": ["keyboards", "desk-mats", "wrist-rests", "monitors"],
  "monitors": ["monitor-arms", "desk-shelves", "usb-hubs", "standing-desks"],
  "lighting": ["webcams", "monitors", "desk-organizers", "microphones"],
  "cable-management": ["power-strips", "usb-hubs", "standing-desks", "monitor-arms"],
  "headsets": ["microphones", "speakers", "webcams", "usb-hubs"],
  "usb-hubs": ["cable-management", "monitors", "power-strips", "laptop-stands"],
  "desk-shelves": ["monitor-arms", "monitors", "desk-organizers", "laptop-stands"],
  "microphones": ["webcams", "headsets", "speakers", "lighting"],
  "speakers": ["headsets", "microphones", "monitors", "webcams"],
  "laptop-stands": ["monitor-arms", "usb-hubs", "keyboards", "desk-shelves"],
  "desk-organizers": ["desk-mats", "cable-management", "desk-shelves", "wrist-rests"],
  "power-strips": ["cable-management", "usb-hubs", "standing-desks", "monitor-arms"],
  "footrests": ["ergonomic-chairs", "standing-desks", "wrist-rests", "desk-mats"],
  "wrist-rests": ["keyboards", "mice", "desk-mats", "ergonomic-chairs"],
};

export function getRelatedCategories(slug: string, all: Category[], limit = 4): Category[] {
  const wanted = RELATED[slug] || [];
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const out = wanted
    .map((s) => bySlug.get(s))
    .filter((c): c is Category => !!c && c.productCount > 0);
  // top up with other populated categories if the map came up short
  if (out.length < limit) {
    for (const c of all) {
      if (out.length >= limit) break;
      if (c.slug !== slug && c.productCount > 0 && !out.includes(c)) out.push(c);
    }
  }
  return out.slice(0, limit);
}

// ---- Guide <-> review cross-links ----

// Guides relevant to a review category (primary category match first).
export function getGuidesForCategory(slug: string, guides: Guide[], limit = 3): Guide[] {
  const primary = guides.filter((g) => g.category === slug);
  const related = guides.filter(
    (g) => g.category !== slug && (g.relatedCategories || []).includes(slug)
  );
  return [...primary, ...related].slice(0, limit);
}

// Review categories a guide points at (its category + relatedCategories).
export function getReviewSlugsForGuide(guide: Guide): string[] {
  const slugs = [guide.category, ...(guide.relatedCategories || [])].filter(
    (s): s is string => !!s
  );
  return [...new Set(slugs)];
}
