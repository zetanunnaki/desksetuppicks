// Generate on-theme cover images via the kie.ai unified Jobs API
// (google/nano-banana), convert to webp, and save to public/images/.
//
// Usage:
//   node scripts/generate-covers.mjs test      -> only the homepage hero (approval test)
//   node scripts/generate-covers.mjs missing   -> every cover that doesn't exist yet
//   node scripts/generate-covers.mjs all        -> regenerate everything
//   node scripts/generate-covers.mjs <slug>     -> a single guide/blog slug (or "hero")
//
// Requires KIE_API_KEY in .env.local. Stops cleanly on 402 (insufficient credits).
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import sharp from "sharp";

dotenv.config({ path: ".env.local" });

const KEY = process.env.KIE_API_KEY;
const BASE = "https://api.kie.ai";
const MODEL = "google/nano-banana";
const ROOT = process.cwd();

if (!KEY) {
  console.error("KIE_API_KEY missing from .env.local");
  process.exit(1);
}
const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Theme-locked prompt ----
const STYLE =
  "Abstract minimal editorial cover illustration, premium flat vector style. " +
  "Deep navy background color #0f172a. Clean glowing line-art rendered in an indigo-to-violet gradient (#6366f1 to #818cf8). " +
  "Subtle dotted grid texture, soft glow, generous negative space, balanced composition. " +
  "Absolutely no text, no words, no letters, no logos. 16:9 landscape.";

const buildPrompt = (subject) => `${subject}. ${STYLE}`;

// ---- Collect targets ----
function guideTargets() {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/guides.json"), "utf-8"));
  return data.guides.map((g) => ({
    out: `public/images/guides/${g.slug}.webp`,
    prompt: buildPrompt(`A cover representing the topic "${g.title}"`),
  }));
}
function blogTargets() {
  const dir = path.join(ROOT, "src/content/blog");
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => {
    const src = fs.readFileSync(path.join(dir, f), "utf-8");
    const m = src.match(/title:\s*"([^"]+)"/);
    const title = m ? m[1] : f.replace(".mdx", "");
    return {
      out: `public/images/blog/${f.replace(".mdx", ".webp")}`,
      prompt: buildPrompt(`A cover representing the topic "${title}"`),
    };
  });
}
const heroTarget = {
  out: "public/images/hero.webp",
  prompt: buildPrompt(
    "A wide atmospheric hero scene of a modern home-office desk setup — monitor, desk, chair, and lamp rendered as elegant glowing line-art"
  ),
};

// ---- API ----
async function createTask(prompt) {
  const r = await fetch(`${BASE}/api/v1/jobs/createTask`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model: MODEL, input: { prompt, output_format: "png", image_size: "landscape_16_9" } }),
  });
  const data = await r.json().catch(() => null);
  if (data?.code === 402) {
    console.error("\n402 Credits insufficient — top up the kie.ai account, then re-run.\n");
    process.exit(2);
  }
  if (data?.code !== 200 && data?.code !== 0) {
    console.error("createTask unexpected:", JSON.stringify(data));
    return null;
  }
  return data?.data?.taskId || data?.data?.task_id || data?.taskId || null;
}

function extractUrl(data) {
  const d = data?.data ?? {};
  let rj = d.resultJson ?? d.result_json;
  if (typeof rj === "string") { try { rj = JSON.parse(rj); } catch { rj = null; } }
  return (
    rj?.resultUrls?.[0] || rj?.result_urls?.[0] || rj?.urls?.[0] ||
    d.resultUrls?.[0] || d.result?.resultUrls?.[0] || d.output?.[0] ||
    d.resultUrl || null
  );
}

async function poll(taskId) {
  for (let i = 0; i < 60; i++) {
    await sleep(3000);
    const r = await fetch(`${BASE}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers });
    const data = await r.json().catch(() => null);
    const state = String(data?.data?.state ?? data?.data?.status ?? "");
    if (/fail|error/i.test(state)) { console.error("  task failed:", JSON.stringify(data?.data)); return null; }
    const url = extractUrl(data);
    if (url) return url;
    if (/success|completed|done/i.test(state)) { console.error("  done but no url:", JSON.stringify(data)); return null; }
  }
  console.error("  timed out");
  return null;
}

async function genOne({ out, prompt }) {
  const abs = path.join(ROOT, out);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  process.stdout.write(`-> ${out} ... `);
  const taskId = await createTask(prompt);
  if (!taskId) { console.log("SKIP (no task)"); return false; }
  const url = await poll(taskId);
  if (!url) { console.log("SKIP (no result)"); return false; }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await sharp(buf).webp({ quality: 82 }).toFile(abs);
  console.log("OK");
  return true;
}

// ---- Run ----
const mode = process.argv[2] || "missing";
let targets;
if (mode === "test") targets = [heroTarget];
else if (mode === "all") targets = [heroTarget, ...guideTargets(), ...blogTargets()];
else if (mode === "missing") targets = [heroTarget, ...guideTargets(), ...blogTargets()].filter((t) => !fs.existsSync(path.join(ROOT, t.out)));
else {
  const all = [heroTarget, ...guideTargets(), ...blogTargets()];
  targets = all.filter((t) => t.out.includes(`/${mode}.webp`) || (mode === "hero" && t.out.endsWith("hero.webp")));
}

console.log(`kie.ai cover generation — ${MODEL} — ${targets.length} image(s)\n`);
let ok = 0;
for (const t of targets) { if (await genOne(t)) ok++; await sleep(800); }
console.log(`\nDone: ${ok}/${targets.length} generated.`);
