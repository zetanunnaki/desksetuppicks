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
