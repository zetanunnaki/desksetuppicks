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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

async function searchProduct(productName, category) {
  const searchIndex = CATEGORY_SEARCH_INDEX[category] || "All";
  const token = await getAccessToken();

  const body = {
    keywords: productName,
    searchIndex,
    itemCount: 5,
    partnerTag: PARTNER_TAG,
    partnerType: "Associates",
    resources: [
      "itemInfo.title",
      "offersV2.listings.price",
      "offersV2.listings.condition",
      "offersV2.listings.availability",
      "images.primary.large",
      "customerReviews.starRating",
      "customerReviews.count",
    ],
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

    for (const item of items) {
      const starRating =
        item.customerReviews?.starRating?.value ??
        item.CustomerReviews?.StarRating?.Value;
      const ratingValue = starRating != null ? parseFloat(starRating) : null;

      if (ratingValue === null || ratingValue < MIN_RATING) {
        const title = item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue;
        console.warn(
          `  Skipping "${title}" — ${ratingValue === null ? "no rating data" : `rating ${ratingValue} < ${MIN_RATING}`}`
        );
        continue;
      }

      const reviewCount =
        item.customerReviews?.count ??
        item.CustomerReviews?.Count ??
        null;

      if (reviewCount === null || reviewCount < MIN_REVIEW_COUNT) {
        const title = item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue;
        console.warn(
          `  Skipping "${title}" — ${reviewCount === null ? "no review data" : `only ${reviewCount} reviews (need ${MIN_REVIEW_COUNT}+)`}`
        );
        continue;
      }

      const listings =
        item.offersV2?.listings || item.Offers?.Listings || [];
      const firstListing = listings[0];

      if (!firstListing) {
        console.warn(
          `  Skipping "${item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue}" — no offers (out of stock)`
        );
        continue;
      }

      const availability =
        firstListing?.availability?.message ||
        firstListing?.availability?.type ||
        firstListing?.Availability?.Message ||
        null;

      if (availability && /out of stock|unavailable/i.test(availability)) {
        console.warn(
          `  Skipping "${item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue}" — ${availability}`
        );
        continue;
      }

      const price =
        firstListing?.price?.displayAmount ||
        firstListing?.Price?.DisplayAmount ||
        null;
      const imageUrl =
        item.images?.primary?.large?.url ||
        item.Images?.Primary?.Large?.URL ||
        null;
      const detailPageUrl =
        item.detailPageURL || item.DetailPageURL || null;
      const asin = item.asin || item.ASIN;

      return {
        asin,
        amazonPrice: price,
        amazonImageUrl: imageUrl,
        amazonRating: ratingValue,
        reviewCount,
        amazonUrl: detailPageUrl,
      };
    }

    console.warn(
      `  No qualifying results for "${productName}" (need ${MIN_RATING}+ stars, ${MIN_REVIEW_COUNT}+ reviews, in stock)`
    );
    return null;
  } catch (error) {
    console.error(`  API error for "${productName}":`, error.message || error);
    return null;
  }
}

async function main() {
  console.log("=== Amazon Creators API Product Enrichment ===");
  console.log(`Partner tag: ${PARTNER_TAG}`);
  console.log(`Quality filters: ${MIN_RATING}+ stars, ${MIN_REVIEW_COUNT}+ reviews, in stock\n`);

  const productsFile = "src/content/products.json";
  const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  const products = data.products;

  let enrichedCount = 0;
  let skippedCount = 0;
  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Searching: ${product.name}`);

    const result = await searchProduct(product.name, product.category);

    if (result) {
      product.asin = result.asin;
      product.amazonPrice = result.amazonPrice;
      product.amazonImageUrl = result.amazonImageUrl;
      product.amazonRating = result.amazonRating;
      product.reviewCount = result.reviewCount;
      product.amazonUrl = result.amazonUrl;
      product.lastAmazonSync = today;
      enrichedCount++;
      console.log(
        `  OK: ${result.amazonPrice || "no price"} | ${result.amazonRating}/5 | ${result.reviewCount} reviews`
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
