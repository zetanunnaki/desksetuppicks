import "dotenv/config";
import fs from "fs";

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "desksetuppro02-20";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.com";
const MIN_RATING = 4.0;

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
    itemCount: 3,
    partnerTag: PARTNER_TAG,
    partnerType: "Associates",
    resources: [
      "itemInfo.title",
      "offersV2.listings.price",
      "offersV2.listings.savingBasis",
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

      if (ratingValue !== null && ratingValue < MIN_RATING) {
        console.warn(
          `  Skipping "${item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue}" — rating ${ratingValue} < ${MIN_RATING}`
        );
        continue;
      }

      const listings =
        item.offersV2?.listings || item.Offers?.Listings || [];
      const firstListing = listings[0];

      const price =
        firstListing?.price?.displayAmount ||
        firstListing?.Price?.DisplayAmount ||
        null;
      const listPrice =
        firstListing?.savingBasis?.displayAmount ||
        firstListing?.SavingBasis?.DisplayAmount ||
        null;
      const imageUrl =
        item.images?.primary?.large?.url ||
        item.Images?.Primary?.Large?.URL ||
        null;
      const reviewCount =
        item.customerReviews?.count ??
        item.CustomerReviews?.Count ??
        null;
      const detailPageUrl =
        item.detailPageURL || item.DetailPageURL || null;
      const asin = item.asin || item.ASIN;

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

    console.warn(
      `  All results for "${productName}" below ${MIN_RATING} stars — skipping`
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
  console.log(`Minimum rating filter: ${MIN_RATING}+ stars\n`);

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
      product.amazonListPrice = result.amazonListPrice;
      product.amazonImageUrl = result.amazonImageUrl;
      product.amazonRating = result.amazonRating;
      product.reviewCount = result.reviewCount;
      product.amazonUrl = result.amazonUrl;
      product.lastAmazonSync = today;
      enrichedCount++;
      console.log(
        `  Found: ${result.amazonPrice || "no price"} | ${result.amazonRating || "?"}/5 | ${result.reviewCount || 0} reviews`
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
  console.log(`Skipped (low rating / not found): ${skippedCount}`);
  console.log(`Products written to: ${productsFile}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
