// SEO claim verification — scans the built /out (the exact deployed artifact)
// and asserts each objective audit claim across ALL pages, with evidence.
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "out");
const SITE = "https://desksetuppicks.com";

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

function routeFromFile(f) {
  let r = "/" + path.relative(OUT, path.dirname(f)).split(path.sep).join("/");
  if (r === "/.") r = "/";
  return r === "/" ? "/" : r + "/";
}

const files = walk(OUT);
let totals = { pages: 0, title: 0, desc: 0, canonical: 0, canonicalCorrect: 0, h1one: 0, jsonld: 0, og: 0 };
const titleLens = [];
const fails = { canonical: [], h1: [], title: [], desc: [], jsonld: [] };
const schemaTypes = {};

for (const f of files) {
  const route = routeFromFile(f);
  // skip the 404 page
  if (route.includes("_not-found") || route.includes("404")) continue;
  const html = fs.readFileSync(f, "utf-8");
  totals.pages++;

  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  if (title) { totals.title++; titleLens.push({ route, len: title.length }); } else fails.title.push(route);

  const desc = /<meta name="description"/i.test(html);
  if (desc) totals.desc++; else fails.desc.push(route);

  const can = (html.match(/rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  if (can) {
    totals.canonical++;
    const expected = SITE + route;
    if (can === expected) totals.canonicalCorrect++;
    else fails.canonical.push(`${route}  ->  ${can}`);
  } else fails.canonical.push(`${route}  (MISSING)`);

  const h1count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1count === 1) totals.h1one++; else fails.h1.push(`${route} (h1=${h1count})`);

  const types = [...html.matchAll(/"@type":"([^"]+)"/g)].map((m) => m[1]);
  if (types.length) { totals.jsonld++; for (const t of types) schemaTypes[t] = (schemaTypes[t] || 0) + 1; }
  else fails.jsonld.push(route);

  if (/property="og:image"/i.test(html) || /"og:image"/.test(html)) totals.og++;
}

const longTitles = titleLens.filter((t) => t.len > 60);
const maxTitle = titleLens.sort((a, b) => b.len - a.len)[0];

console.log("=== PER-PAGE CHECKS (across", totals.pages, "pages in /out) ===");
console.log("title present:        ", totals.title, "/", totals.pages);
console.log("meta description:     ", totals.desc, "/", totals.pages);
console.log("canonical present:    ", totals.canonical, "/", totals.pages);
console.log("canonical CORRECT:    ", totals.canonicalCorrect, "/", totals.pages);
console.log("exactly one <h1>:     ", totals.h1one, "/", totals.pages);
console.log("has JSON-LD:          ", totals.jsonld, "/", totals.pages);
console.log("has og:image:         ", totals.og, "/", totals.pages);
console.log("titles > 60 chars:    ", longTitles.length, "(longest:", maxTitle?.len, "->", JSON.stringify(maxTitle?.route) + ")");
console.log("\n=== JSON-LD @types found ===");
console.log(Object.entries(schemaTypes).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}:${n}`).join("  "));
console.log("\n=== FAILURES ===");
for (const [k, arr] of Object.entries(fails)) {
  if (arr.length) console.log(`${k} (${arr.length}):`, arr.slice(0, 8).join(" | "));
}
if (Object.values(fails).every((a) => a.length === 0)) console.log("none");
