import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });
dotenv.config();

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "desksetuppro02-20";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.com";
const MIN_RATING = 4.5;
const MIN_REVIEW_COUNT = 50;
const TARGET_PER_CATEGORY = 15;

const TOKEN_ENDPOINT = "https://api.amazon.com/auth/o2/token";
const API_BASE = "https://creatorsapi.amazon/catalog/v1";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("AMAZON_CLIENT_ID or AMAZON_CLIENT_SECRET not set in .env.local");
  process.exit(1);
}

const CATEGORY_SEARCH_QUERIES = {
  "standing-desks": [
    "best standing desk electric",
    "adjustable height desk home office",
    "sit stand desk converter",
    "standing desk with drawers",
  ],
  "ergonomic-chairs": [
    "best ergonomic office chair",
    "mesh office chair lumbar support",
    "ergonomic desk chair adjustable",
    "high back office chair ergonomic",
  ],
  "monitor-arms": [
    "monitor arm desk mount",
    "dual monitor arm stand",
    "single monitor arm adjustable",
    "ultrawide monitor arm",
  ],
  "desk-mats": [
    "large desk mat leather",
    "desk pad extended mouse pad",
    "felt desk mat wool",
    "waterproof desk mat office",
  ],
  "webcams": [
    "4K webcam for PC",
    "1080p webcam with microphone",
    "streaming webcam autofocus",
    "webcam for video conferencing",
  ],
  "keyboards": [
    "mechanical keyboard wireless",
    "ergonomic keyboard split",
    "compact mechanical keyboard 75%",
    "low profile mechanical keyboard",
  ],
  "mice": [
    "ergonomic wireless mouse",
    "vertical mouse wireless",
    "trackball mouse wireless",
    "lightweight wireless mouse office",
  ],
  "monitors": [
    "4K monitor 27 inch IPS",
    "ultrawide monitor 34 inch",
    "monitor for programming",
    "USB-C monitor for laptop",
  ],
  "lighting": [
    "LED desk lamp eye care",
    "monitor light bar",
    "desk lamp architect adjustable",
    "smart desk lighting RGB",
  ],
  "cable-management": [
    "under desk cable management tray",
    "cable management clips adhesive",
    "cable sleeve cord organizer",
    "cable management box",
  ],
  "headsets": [
    "wireless headset for work calls",
    "noise cancelling headphones office",
    "bluetooth headset with microphone",
    "over ear headphones comfortable",
  ],
  "usb-hubs": [
    "USB C hub docking station",
    "thunderbolt dock laptop",
    "USB hub powered",
    "USB C hub HDMI",
  ],
  "desk-shelves": [
    "monitor riser stand wood",
    "desk shelf organizer",
    "monitor stand with storage",
    "desktop shelf riser",
  ],
  "microphones": [
    "USB microphone for PC",
    "condenser microphone desk",
    "podcast microphone USB",
    "microphone for video calls",
  ],
  "speakers": [
    "desktop speakers for computer",
    "bluetooth speaker desk compact",
    "PC speakers USB powered",
    "soundbar for desktop monitor",
  ],
  "laptop-stands": [
    "adjustable laptop stand aluminum",
    "laptop riser stand ergonomic",
    "laptop stand for desk",
    "portable laptop stand adjustable",
  ],
  "desk-organizers": [
    "desk organizer with drawers",
    "desktop organizer office supplies",
    "pen holder desk organizer",
    "desk drawer organizer tray",
  ],
  "power-strips": [
    "surge protector power strip USB",
    "power strip with USB C",
    "flat plug power strip",
    "under desk power strip mount",
  ],
  "footrests": [
    "ergonomic foot rest under desk",
    "adjustable footrest office",
    "foot rest for desk at work",
    "rocking footrest ergonomic",
  ],
  "wrist-rests": [
    "keyboard wrist rest pad",
    "mouse wrist rest gel",
    "ergonomic wrist pad memory foam",
    "wrist support keyboard gaming",
  ],
};

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
  "headsets": "Electronics",
  "usb-hubs": "Electronics",
  "desk-shelves": "OfficeProducts",
  "microphones": "Electronics",
  "speakers": "Electronics",
  "laptop-stands": "Electronics",
  "desk-organizers": "OfficeProducts",
  "power-strips": "Electronics",
  "footrests": "OfficeProducts",
  "wrist-rests": "OfficeProducts",
};

const CATEGORY_LABELS = {
  "standing-desks": "standing desk",
  "ergonomic-chairs": "ergonomic chair",
  "monitor-arms": "monitor arm",
  "desk-mats": "desk mat",
  "webcams": "webcam",
  "keyboards": "mechanical keyboard",
  "mice": "wireless mouse",
  "monitors": "4K monitor",
  "lighting": "desk light",
  "cable-management": "cable management solution",
  "headsets": "headset",
  "usb-hubs": "USB hub",
  "desk-shelves": "desk shelf",
  "microphones": "microphone",
  "speakers": "desktop speaker",
  "laptop-stands": "laptop stand",
  "desk-organizers": "desk organizer",
  "power-strips": "power strip",
  "footrests": "footrest",
  "wrist-rests": "wrist rest",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

function determineBudgetTier(priceStr) {
  if (!priceStr) return "mid-range";
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return "mid-range";
  if (num < 50) return "budget";
  if (num < 200) return "mid-range";
  return "premium";
}

function inferUseCases(title, features, category, budgetTier) {
  const cases = [];
  const text = `${title} ${features.join(" ")}`.toLowerCase();

  if (budgetTier === "budget") cases.push("Budget-Friendly");
  if (budgetTier === "premium") cases.push("Premium Pick");

  if (/home office|work from home|wfh/i.test(text)) cases.push("Work From Home");
  if (/gaming/i.test(text)) cases.push("Gaming");
  if (/streaming|podcast|content creat/i.test(text)) cases.push("Content Creation");
  if (/portable|travel|foldable|compact/i.test(text)) cases.push("Portable");
  if (/dual monitor|multi.?monitor/i.test(text)) cases.push("Multi-Monitor Setup");
  if (/small desk|small space|compact/i.test(text)) cases.push("Small Spaces");
  if (/ergonomic|posture|back support|lumbar/i.test(text)) cases.push("Ergonomic");
  if (/quiet|silent|noise cancel/i.test(text)) cases.push("Quiet Environment");
  if (/usb.?c|thunderbolt/i.test(text)) cases.push("USB-C Setup");
  if (/wireless|bluetooth/i.test(text)) cases.push("Wireless");
  if (/minimalist|clean|sleek/i.test(text)) cases.push("Minimalist Setup");

  if (cases.length === 0) cases.push("General Use");
  return cases;
}

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt - 60_000) {
    return accessToken;
  }

  console.log("  Authenticating...");
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=creatorsapi::default",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
  console.log("  Authenticated.\n");
  return accessToken;
}

async function searchItems(keywords, searchIndex, page = 1) {
  const token = await getAccessToken();

  const body = {
    keywords,
    searchIndex,
    itemCount: 10,
    itemPage: page,
    partnerTag: PARTNER_TAG,
    partnerType: "Associates",
    resources: [
      "itemInfo.title",
      "itemInfo.features",
      "offersV2.listings.price",
      "offersV2.listings.condition",
      "offersV2.listings.availability",
      "images.primary.large",
      "customerReviews.starRating",
      "customerReviews.count",
    ],
  };

  const response = await fetch(`${API_BASE}/searchItems`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 403) {
    const errBody = await response.text();
    if (errBody.includes("AssociateNotEligible")) {
      console.error("\n  Account not yet eligible for Creators API.");
      console.error("  New credentials can take 24-48 hours to activate.");
      process.exit(0);
    }
    throw new Error(`403: ${errBody}`);
  }

  if (response.status === 429) {
    console.warn("  Rate limited — waiting 3s...");
    await sleep(3000);
    return searchItems(keywords, searchIndex, page);
  }

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`API error (${response.status}): ${errBody}`);
  }

  return response.json();
}

function extractProduct(item, category) {
  const rating =
    item.customerReviews?.starRating?.value ??
    item.CustomerReviews?.StarRating?.Value;
  const ratingValue = rating != null ? parseFloat(rating) : null;

  if (ratingValue === null || ratingValue < MIN_RATING) return null;

  const reviewCount =
    item.customerReviews?.count ??
    item.CustomerReviews?.Count ??
    null;

  if (reviewCount === null || reviewCount < MIN_REVIEW_COUNT) return null;

  const listings = item.offersV2?.listings || item.Offers?.Listings || [];
  const firstListing = listings[0];

  if (!firstListing) return null;

  const availability =
    firstListing?.availability?.message ||
    firstListing?.availability?.type ||
    firstListing?.Availability?.Message ||
    null;

  if (availability && /out of stock|unavailable/i.test(availability)) return null;

  const title =
    item.itemInfo?.title?.displayValue ||
    item.ItemInfo?.Title?.DisplayValue ||
    "";
  const price =
    firstListing?.price?.displayAmount ||
    firstListing?.Price?.DisplayAmount ||
    null;
  const imageUrl =
    item.images?.primary?.large?.url ||
    item.Images?.Primary?.Large?.URL ||
    null;
  const detailPageUrl = item.detailPageURL || item.DetailPageURL || null;
  const asin = item.asin || item.ASIN;
  const features =
    item.itemInfo?.features?.displayValues ||
    item.ItemInfo?.Features?.DisplayValues ||
    [];

  const slug = slugify(title);
  const categoryLabel = CATEGORY_LABELS[category] || category;
  const budgetTier = determineBudgetTier(price);

  const pros = features.slice(0, 4).map((f) =>
    f.length > 150 ? f.substring(0, 147) + "..." : f
  );

  const shortDesc = features[0]
    ? features[0].length > 160
      ? features[0].substring(0, 157) + "..."
      : features[0]
    : `A ${ratingValue}-star rated ${categoryLabel} backed by ${reviewCount.toLocaleString()} customer reviews on Amazon.`;

  const useCases = inferUseCases(title, features, category, budgetTier);

  return {
    id: slug,
    name: title,
    slug,
    category,
    shortDescription: shortDesc,
    prosAndCons: {
      pros:
        pros.length >= 2
          ? pros
          : [
              `Rated ${ratingValue}/5 stars with ${reviewCount.toLocaleString()} verified reviews`,
              `${price ? `Available at ${price}` : "Competitively priced"} — ${budgetTier} tier`,
            ],
      cons: [
        "Review full specifications on the Amazon listing before purchasing",
        "Availability and pricing may vary",
      ],
    },
    specifications: {},
    priceRange: price || "Check Amazon",
    rating: ratingValue,
    affiliateUrl: "",
    asin,
    imageUrl: `/images/products/${slug}.webp`,
    imagePlaceholder: title,
    badges: ratingValue >= 4.8 ? ["Top Rated"] : [],
    featured: false,
    rank: 99,
    dateAdded: new Date().toISOString().split("T")[0],
    lastUpdated: new Date().toISOString().split("T")[0],
    amazonPrice: price,
    amazonImageUrl: imageUrl,
    amazonRating: ratingValue,
    reviewCount,
    amazonUrl: detailPageUrl,
    lastAmazonSync: new Date().toISOString().split("T")[0],
    budgetTier,
    useCases,
  };
}

async function discoverForCategory(category) {
  const queries = CATEGORY_SEARCH_QUERIES[category];
  const searchIndex = CATEGORY_SEARCH_INDEX[category] || "All";
  const seenAsins = new Set();
  const products = [];

  for (const query of queries) {
    if (products.length >= TARGET_PER_CATEGORY) break;

    console.log(`  Searching: "${query}"`);
    try {
      const data = await searchItems(query, searchIndex);
      const items =
        data.searchResult?.items ||
        data.SearchResult?.Items ||
        [];

      for (const item of items) {
        const asin = item.asin || item.ASIN;
        if (seenAsins.has(asin)) continue;
        seenAsins.add(asin);

        const product = extractProduct(item, category);
        if (product) {
          products.push(product);
          console.log(
            `    + ${product.name.substring(0, 55)} | ${product.amazonRating}/5 | ${product.reviewCount.toLocaleString()} reviews | ${product.amazonPrice || "?"}`
          );
        }

        if (products.length >= TARGET_PER_CATEGORY) break;
      }
    } catch (err) {
      console.error(`    Error: ${err.message}`);
    }

    await sleep(1100);
  }

  products.sort((a, b) => {
    const rDiff = (b.amazonRating || 0) - (a.amazonRating || 0);
    if (rDiff !== 0) return rDiff;
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });
  products.forEach((p, i) => {
    p.rank = i + 1;
    if (i === 0 && p.amazonRating >= 4.7) {
      p.badges = ["Editor's Choice"];
      p.featured = true;
    }
  });

  return products;
}

async function main() {
  console.log("=== Amazon Product Discovery ===");
  console.log(`Target: ~${TARGET_PER_CATEGORY} products per category`);
  console.log(`Quality bar: ${MIN_RATING}+ stars, ${MIN_REVIEW_COUNT}+ reviews, in stock`);
  console.log(`Categories: ${Object.keys(CATEGORY_SEARCH_QUERIES).length}\n`);

  const categoriesFile = "src/content/categories.json";
  const productsFile = "src/content/products.json";

  const categoriesData = JSON.parse(fs.readFileSync(categoriesFile, "utf-8"));
  const existingData = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  const existingAsins = new Set(
    existingData.products
      .filter((p) => p.asin && p.asin !== "PLACEHOLDER")
      .map((p) => p.asin)
  );

  const allNewProducts = [];

  for (const category of Object.keys(CATEGORY_SEARCH_QUERIES)) {
    console.log(`\n[${category.toUpperCase()}]`);
    const products = await discoverForCategory(category);

    const novel = products.filter((p) => !existingAsins.has(p.asin));
    novel.forEach((p) => existingAsins.add(p.asin));
    allNewProducts.push(...novel);

    console.log(
      `  Found ${products.length} qualifying products, ${novel.length} new\n`
    );

    const cat = categoriesData.categories.find((c) => c.id === category);
    if (cat) {
      const existingCount = existingData.products.filter(
        (p) => p.category === category
      ).length;
      cat.productCount = existingCount + novel.length;
    }
  }

  existingData.products.push(...allNewProducts);

  fs.writeFileSync(productsFile, JSON.stringify(existingData, null, 2) + "\n");
  fs.writeFileSync(
    categoriesFile,
    JSON.stringify(categoriesData, null, 2) + "\n"
  );

  console.log("=== Discovery Complete ===");
  console.log(`New products discovered: ${allNewProducts.length}`);
  console.log(`Total products now: ${existingData.products.length}`);
  console.log(`All products meet: ${MIN_RATING}+ stars, ${MIN_REVIEW_COUNT}+ reviews, in stock`);
  console.log(`Written to: ${productsFile}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
