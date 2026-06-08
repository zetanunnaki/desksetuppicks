// Full catalog audit: live availability + price (and title) for every product via
// the Creators API. CERTIFIES availability + price. Does NOT certify ratings —
// the API does not return star ratings.
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: ".env.local" });

const C = process.env.AMAZON_CLIENT_ID, S = process.env.AMAZON_CLIENT_SECRET;
const T = process.env.AMAZON_PARTNER_TAG || "desksetuppro02-20", M = "www.amazon.com";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (s) => { const m = String(s || "").replace(/,/g, "").match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : NaN; };

const tk = (await (await fetch("https://api.amazon.com/auth/o2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${Buffer.from(`${C}:${S}`).toString("base64")}` }, body: "grant_type=client_credentials&scope=creatorsapi::default" })).json()).access_token;

async function get(asin) {
  const r = await fetch("https://creatorsapi.amazon/catalog/v1/getItems", { method: "POST", headers: { Authorization: `Bearer ${tk}`, "Content-Type": "application/json", "x-marketplace": M }, body: JSON.stringify({ itemIds: [asin], itemIdType: "ASIN", partnerTag: T, partnerType: "Associates", resources: ["itemInfo.title", "offersV2.listings.price", "offersV2.listings.availability"] }) });
  if (!r.ok) return { error: `${r.status}` };
  const it = ((await r.json()).itemsResult?.items || [])[0]; if (!it) return { error: "no item" };
  const L = (it.offersV2?.listings || [])[0] || {};
  return { title: it.itemInfo?.title?.displayValue || "", price: L.price?.displayAmount || L.price?.money?.displayAmount || "", avail: L.availability?.message || L.availability?.type || "" };
}

const products = JSON.parse(fs.readFileSync("src/content/products.json", "utf-8")).products;
const unavailable = [], priceDrift = [], noPrice = [], errors = [];
let inStock = 0, priceOk = 0;
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const res = await get(p.asin);
  if (res.error) { errors.push({ slug: p.slug, asin: p.asin, error: res.error }); }
  else {
    const unavail = /unavailable|out of stock/i.test(res.avail);
    if (unavail || !res.price) {
      if (unavail) unavailable.push({ slug: p.slug, asin: p.asin, avail: res.avail });
      else noPrice.push({ slug: p.slug, asin: p.asin });
    } else {
      inStock++;
      const live = num(res.price), ours = num(p.amazonPrice || p.priceRange);
      if (!isNaN(live) && !isNaN(ours) && Math.abs(live - ours) > 0.01) priceDrift.push({ slug: p.slug, ours: p.amazonPrice || p.priceRange, live: res.price });
      else priceOk++;
    }
  }
  process.stdout.write(`\r${i + 1}/${products.length}`);
  await sleep(1050);
}
const report = { total: products.length, inStock, priceOk, priceDrift, unavailable, noPrice, errors };
fs.writeFileSync("scripts/_catalog-audit.json", JSON.stringify(report, null, 2));
console.log(`\n\n=== CATALOG AUDIT (${products.length} products) ===`);
console.log(`In stock w/ price: ${inStock}`);
console.log(`Price matches ours: ${priceOk}`);
console.log(`Price DRIFTED: ${priceDrift.length}`);
console.log(`Unavailable: ${unavailable.length}`);
console.log(`In stock but no price returned (variation parent): ${noPrice.length}`);
console.log(`API errors: ${errors.length}`);
if (priceDrift.length) console.log("\nDRIFT:", priceDrift.slice(0, 40).map(d => `${d.slug} ${d.ours}->${d.live}`).join("\n  "));
if (unavailable.length) console.log("\nUNAVAILABLE:", unavailable.map(u => u.slug).join(", "));
if (noPrice.length) console.log("\nNO PRICE:", noPrice.map(u => u.slug).join(", "));
if (errors.length) console.log("\nERRORS:", errors.map(e => `${e.slug}(${e.error})`).join(", "));
