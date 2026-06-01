import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });
dotenv.config();

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "desksetuppro02-20";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.com";
// NOTE: The Amazon Creators API (like PA-API 5.0) does NOT return star ratings
// or review counts. Quality (4.5+ stars) is enforced via the human-curated
// `rating` field already in products.json. This script enriches each product
// with live ASIN, price, image, stock status, and affiliate URL only.
const MIN_CURATED_RATING = 4.5;
// Minimum token-overlap score required to trust an API result is the same
// product we curated (prevents linking the wrong item, e.g. E6 vs E7).
const MIN_MATCH_SCORE = 0.4;

const TOKEN_ENDPOINT = "https://api.amazon.com/auth/o2/token";
const API_BASE = "https://creatorsapi.amazon/catalog/v1";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn("AMAZON_CLIENT_ID or AMAZON_CLIENT_SECRET not set — skipping product enrichment.");
  console.warn("  Products will use existing data from products.json.");
  process.exit(0);
}

const CATEGORY_SEARCH_INDEX = {
  "standing-desks": "OfficeProducts",
  "ergonomic-chairs": "OfficeProducts",
  "monitor-arms": "OfficeProducts",
  "desk-mats": "OfficeProducts",
  "webcams": "Electronics",
  "keyboards": "Electronics",
  "mice": "Electronics",
  "monitors": "Electronics",
  "lighting": "Electronics",
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const STOPWORDS = new Set([
  "the", "a", "an", "for", "with", "and", "of", "in", "to", "pro", "inch",
  "desk", "office", "home", "computer", "premium",
]);

function tokenize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// Fraction of the curated product-name tokens that appear in the candidate
// title. 1.0 = every meaningful word matched. Used to avoid linking the wrong
// variant (e.g. searching "FlexiSpot E7 Pro" and getting an "E6" result).
function matchScore(productName, candidateTitle) {
  const want = tokenize(productName);
  if (want.length === 0) return 0;
  const have = new Set(tokenize(candidateTitle));
  const hits = want.filter((t) => have.has(t)).length;
  return hits / want.length;
}

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt - 60_000) {
    return accessToken;
  }

  console.log("Authenticating with Amazon Creators API...");
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
  console.log("Authenticated successfully.\n");
  return accessToken;
}

const ITEM_RESOURCES = [
  "itemInfo.title",
  "offersV2.listings.price",
  "offersV2.listings.condition",
  "offersV2.listings.availability",
  "images.primary.large",
];

// Pull the buyable in-stock listing's price/list-price/availability from an item.
function extractListing(item) {
  const listings = item.offersV2?.listings || item.Offers?.Listings || [];
  const listing = listings[0];
  if (!listing) return null;

  const availability =
    listing?.availability?.message ||
    listing?.availability?.type ||
    listing?.Availability?.Message ||
    "";
  if (/out of stock|unavailable/i.test(availability)) return null;

  const price =
    listing?.price?.displayAmount ||
    listing?.price?.money?.displayAmount ||
    listing?.Price?.DisplayAmount ||
    null;
  if (!price) return null;

  return {
    amazonPrice: price,
    amazonListPrice: listing?.price?.savingBasis?.money?.displayAmount || null,
    amazonImageUrl:
      item.images?.primary?.large?.url ||
      item.Images?.Primary?.Large?.URL ||
      null,
    amazonUrl: item.detailPageURL || item.DetailPageURL || null,
  };
}

// Exact lookup by ASIN — no fuzzy matching, always the correct product.
async function getItemByAsin(asin) {
  const token = await getAccessToken();
  const body = {
    itemIds: [asin],
    itemIdType: "ASIN",
    partnerTag: PARTNER_TAG,
    partnerType: "Associates",
    resources: ITEM_RESOURCES,
  };

  try {
    const response = await fetch(`${API_BASE}/getItems`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": MARKETPLACE,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 429) {
      console.warn(`  Rate limited — waiting 2s and retrying...`);
      await sleep(2000);
      return getItemByAsin(asin);
    }

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`  API error (${response.status}) for ASIN ${asin}: ${errBody}`);
      return null;
    }

    const data = await response.json();
    const items =
      data.itemsResult?.items || data.ItemsResult?.Items || data.items || [];
    const item = items[0];
    if (!item) {
      console.warn(`  ASIN ${asin} returned no item.`);
      return null;
    }

    const listing = extractListing(item);
    if (!listing) {
      console.warn(`  ASIN ${asin} is out of stock or has no price.`);
      return null;
    }

    return { asin, ...listing, matchScore: 1 };
  } catch (error) {
    console.error(`  API error for ASIN ${asin}:`, error.message || error);
    return null;
  }
}

async function searchProduct(productName, category) {
  const searchIndex = CATEGORY_SEARCH_INDEX[category] || "All";
  const token = await getAccessToken();

  const body = {
    keywords: productName,
    searchIndex,
    itemCount: 5,
    partnerTag: PARTNER_TAG,
    partnerType: "Associates",
    resources: ITEM_RESOURCES,
  };

  try {
    const response = await fetch(`${API_BASE}/searchItems`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": MARKETPLACE,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 429) {
      console.warn(`  Rate limited — waiting 2s and retrying...`);
      await sleep(2000);
      return searchProduct(productName, category);
    }

    if (response.status === 403) {
      const errBody = await response.text();
      if (errBody.includes("AssociateNotEligible")) {
        console.error("\n  Account not yet eligible for Creators API.");
        console.error("  New credentials can take 24-48 hours to activate.");
        console.error("  Your account qualifies — try again tomorrow.\n");
        process.exit(0);
      }
      console.error(`  API error (403) for "${productName}": ${errBody}`);
      return null;
    }

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`  API error (${response.status}) for "${productName}": ${errBody}`);
      return null;
    }

    const data = await response.json();

    const items =
      data.searchResult?.items ||
      data.SearchResult?.Items ||
      [];

    if (items.length === 0) {
      console.warn(`  No results for: ${productName}`);
      return null;
    }

    // Score every candidate by name match + in-stock + has-price, then pick
    // the best. Ratings/reviews are NOT available from the API — quality is
    // already guaranteed by the curated 4.5+ rating in products.json.
    let best = null;

    for (const item of items) {
      const title =
        item.itemInfo?.title?.displayValue ||
        item.ItemInfo?.Title?.DisplayValue ||
        "";

      const listings = item.offersV2?.listings || item.Offers?.Listings || [];
      const firstListing = listings[0];
      if (!firstListing) continue; // no offer = no buyable stock

      const availability =
        firstListing?.availability?.message ||
        firstListing?.availability?.type ||
        firstListing?.Availability?.Message ||
        "";

      if (/out of stock|unavailable/i.test(availability)) continue;

      const price =
        firstListing?.price?.displayAmount ||
        firstListing?.price?.money?.displayAmount ||
        firstListing?.Price?.DisplayAmount ||
        null;
      if (!price) continue; // no price = can't display

      const score = matchScore(productName, title);
      if (!best || score > best.score) {
        best = {
          score,
          title,
          asin: item.asin || item.ASIN,
          amazonPrice: price,
          amazonListPrice:
            firstListing?.price?.savingBasis?.money?.displayAmount || null,
          amazonImageUrl:
            item.images?.primary?.large?.url ||
            item.Images?.Primary?.Large?.URL ||
            null,
          amazonUrl: item.detailPageURL || item.DetailPageURL || null,
        };
      }
    }

    if (!best) {
      console.warn(`  No in-stock results with a price for "${productName}"`);
      return null;
    }

    if (best.score < MIN_MATCH_SCORE) {
      console.warn(
        `  Skipping "${productName}" — best match too weak (${(best.score * 100).toFixed(0)}%): "${best.title}"`
      );
      return null;
    }

    return {
      asin: best.asin,
      amazonPrice: best.amazonPrice,
      amazonListPrice: best.amazonListPrice,
      amazonImageUrl: best.amazonImageUrl,
      amazonUrl: best.amazonUrl,
      matchScore: best.score,
    };
  } catch (error) {
    console.error(`  API error for "${productName}":`, error.message || error);
    return null;
  }
}

async function main() {
  console.log("=== Amazon Creators API Product Enrichment ===");
  console.log(`Partner tag: ${PARTNER_TAG}`);
  console.log(`Curated quality bar: ${MIN_CURATED_RATING}+ stars (from products.json)`);
  console.log(`API enriches: ASIN, price, image, stock, affiliate URL\n`);

  const productsFile = "src/content/products.json";
  const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  const products = data.products;

  let enrichedCount = 0;
  let skippedCount = 0;
  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Enforce the curated quality bar before spending an API call.
    if (typeof product.rating !== "number" || product.rating < MIN_CURATED_RATING) {
      console.warn(
        `[${i + 1}/${products.length}] Skipping "${product.name}" — curated rating ${product.rating ?? "—"} < ${MIN_CURATED_RATING}`
      );
      skippedCount++;
      continue;
    }

    // ASIN is the only reliable input: keyword search matches the wrong
    // variant too often (e.g. E7 Pro -> E6, "U2723DE" -> P2425H bundle).
    // Products without a real ASIN are skipped, not searched, so wrong data
    // can never enter the catalog. Set SEARCH_FALLBACK=1 to opt into search.
    const hasAsin = product.asin && product.asin !== "PLACEHOLDER";

    if (!hasAsin && process.env.SEARCH_FALLBACK !== "1") {
      console.warn(
        `[${i + 1}/${products.length}] Needs ASIN: "${product.name}" — no ASIN set, skipping (add ASIN to enrich)`
      );
      skippedCount++;
      continue;
    }

    const mode = hasAsin ? "ASIN" : "Search";
    console.log(`[${i + 1}/${products.length}] ${mode}: ${product.name}`);

    const result = hasAsin
      ? await getItemByAsin(product.asin)
      : await searchProduct(product.name, product.category);

    if (result) {
      product.asin = result.asin;
      product.amazonPrice = result.amazonPrice;
      if (result.amazonListPrice) product.amazonListPrice = result.amazonListPrice;
      product.amazonImageUrl = result.amazonImageUrl;
      product.amazonUrl = result.amazonUrl;
      product.lastAmazonSync = today;
      enrichedCount++;
      const matchNote = hasAsin
        ? "exact ASIN"
        : `match ${(result.matchScore * 100).toFixed(0)}%`;
      console.log(
        `  OK: ${result.amazonPrice} | rating ${product.rating}/5 (curated) | ${matchNote} | ${result.asin}`
      );
    } else {
      skippedCount++;
    }

    if (i < products.length - 1) {
      await sleep(1100);
    }
  }

  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2) + "\n");

  console.log("\n=== Summary ===");
  console.log(`Enriched: ${enrichedCount}`);
  console.log(`Skipped (didn't meet quality bar): ${skippedCount}`);
  console.log(`Products written to: ${productsFile}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
