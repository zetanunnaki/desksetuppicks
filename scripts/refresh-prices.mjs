// Patch products.json amazonPrice to the live values found by audit-catalog.mjs
// (reads scripts/_catalog-audit.json). Makes displayed prices accurate as of today.
import fs from "fs";
const audit = JSON.parse(fs.readFileSync("scripts/_catalog-audit.json", "utf-8"));
const file = "src/content/products.json";
const data = JSON.parse(fs.readFileSync(file, "utf-8"));
const today = "2026-06-08";
const bySlug = new Map(data.products.map((p) => [p.slug, p]));
let n = 0;
for (const d of audit.priceDrift) {
  const p = bySlug.get(d.slug);
  if (!p) continue;
  p.amazonPrice = d.live;
  p.lastAmazonSync = today;
  n++;
}
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`Refreshed ${n} prices to live values.`);
