// Audit every product's ASIN against its name + availability via the Creators API.
// Catches wrong/relisted ASINs (e.g. "Jarvis" name pointing at a "Jax" listing).
// NOTE: the API cannot return star ratings — this verifies the LINK is the right
// product, not the rating. Ratings must be confirmed separately.
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: ".env.local" });

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "desksetuppro02-20";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || "www.amazon.com";
const TOKEN_ENDPOINT = "https://api.amazon.com/auth/o2/token";
const API_BASE = "https://creatorsapi.amazon/catalog/v1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STOP = new Set(["the","a","an","for","with","and","of","in","to","pro","inch","desk","office","home","computer","premium","2","2-in-1","smart"]);
const tok = (s) => (s||"").toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(t=>t.length>1&&!STOP.has(t));
function score(name, title) {
  const want = tok(name); if (!want.length) return 0;
  const have = new Set(tok(title));
  return want.filter(t=>have.has(t)).length / want.length;
}

async function token() {
  const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const r = await fetch(TOKEN_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/x-www-form-urlencoded", Authorization:`Basic ${creds}` }, body:"grant_type=client_credentials&scope=creatorsapi::default" });
  if (!r.ok) throw new Error(`auth ${r.status}: ${await r.text()}`);
  return (await r.json()).access_token;
}
async function getItem(tk, asin) {
  const r = await fetch(`${API_BASE}/getItems`, { method:"POST", headers:{ Authorization:`Bearer ${tk}`, "Content-Type":"application/json", "x-marketplace":MARKETPLACE }, body: JSON.stringify({ itemIds:[asin], itemIdType:"ASIN", partnerTag:PARTNER_TAG, partnerType:"Associates", resources:["itemInfo.title","offersV2.listings.availability"] }) });
  if (!r.ok) return { error:`${r.status}` };
  const d = await r.json();
  const it = (d.itemsResult?.items || d.items || [])[0];
  if (!it) return { error:"no item" };
  const av = (it.offersV2?.listings||[])[0]?.availability?.message || (it.offersV2?.listings||[])[0]?.availability?.type || "";
  return { title: it.itemInfo?.title?.displayValue || "", avail: av };
}

const products = JSON.parse(fs.readFileSync("src/content/products.json","utf-8")).products;
const tk = await token();
console.log("Authenticated. Auditing", products.length, "products...\n");
const flags = [];
for (let i=0;i<products.length;i++){
  const p = products[i];
  const res = await getItem(tk, p.asin);
  const s = res.title ? score(p.name, res.title) : 0;
  const bad = !!res.error || s < 0.34 || /unavailable|out of stock/i.test(res.avail||"");
  if (bad) {
    flags.push({ slug:p.slug, rating:p.rating, asin:p.asin, name:p.name, live:res.title||res.error, score:+s.toFixed(2), avail:res.avail });
    console.log(`FLAG ${p.slug} (r${p.rating}) [${p.asin}] score ${s.toFixed(2)}\n   ours: ${p.name}\n   live: ${res.title||res.error}  ${res.avail||""}`);
  }
  await sleep(1100);
}
fs.writeFileSync("scripts/_asin-audit.json", JSON.stringify(flags,null,2));
console.log(`\n=== ${flags.length} flagged / ${products.length} ===`);
