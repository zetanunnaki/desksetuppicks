// Generate on-theme branded placeholder covers + default OG image with sharp.
// No external API. These fix the image 404s now; AI covers can overwrite later.
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const W = 1200, H = 630;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) { if (line) lines.push(line); line = w; }
    else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

// Brand mark: gradient tile + white monitor-with-check glyph (matches the site logo).
function mark(x, y, size = 64) {
  const s = size / 24 * 0.62;
  const pad = (size - 24 * s) / 2;
  return `
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="16" fill="url(#g)"/>
    <g transform="translate(${x + pad},${y + pad}) scale(${s})" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2.5"/>
      <path d="M8.5 10.2l2.4 2.4 4.6-5"/>
      <path d="M9 20h6M12 16v4"/>
    </g>`;
}

const FONT = "'Segoe UI','Outfit','Helvetica Neue',Arial,sans-serif";

function svg({ title, tag, center }) {
  const defs = `
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#818cf8"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#6366f1" stop-opacity="0.45"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const bg = `<rect width="${W}" height="${H}" fill="#0f172a"/>
    <circle cx="${W - 120}" cy="120" r="420" fill="url(#glow)"/>
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#g)"/>`;

  if (center) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${bg}
      ${mark(W / 2 - 44, 200, 88)}
      <text x="${W / 2}" y="350" text-anchor="middle" font-family="${FONT}" font-size="64" font-weight="800" fill="#ffffff">DeskSetupPicks</text>
      <text x="${W / 2}" y="410" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="500" fill="#94a3b8">${esc(SITE_TAGLINE)}</text>
    </svg>`;
  }

  const lines = wrap(title, 26);
  const startY = 372 - (lines.length - 1) * 33;
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 72}">${esc(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${bg}
    ${mark(80, 72, 56)}
    <text x="148" y="110" font-family="${FONT}" font-size="26" font-weight="800" fill="#ffffff">DeskSetupPicks</text>
    <text x="80" y="${startY - 64}" font-family="${FONT}" font-size="18" font-weight="800" letter-spacing="4" fill="#818cf8">${esc(tag)}</text>
    <text x="80" y="${startY}" font-family="${FONT}" font-size="58" font-weight="800" fill="#ffffff">${titleTspans}</text>
  </svg>`;
}

const SITE_TAGLINE = "The Science of a Perfect Workspace";

async function render(svgStr, outRel) {
  const abs = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  await sharp(Buffer.from(svgStr)).webp({ quality: 86 }).toFile(abs);
  console.log("OK", outRel);
}

// Default OG
await render(svg({ center: true }), "public/images/og/default.webp");

// Guides
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/guides.json"), "utf-8")).guides;
for (const g of guides) await render(svg({ title: g.title, tag: "BUYING GUIDE" }), `public/images/guides/${g.slug}.webp`);

// Blog
const blogDir = path.join(ROOT, "src/content/blog");
for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith(".mdx"))) {
  const src = fs.readFileSync(path.join(blogDir, f), "utf-8");
  const title = (src.match(/title:\s*"([^"]+)"/) || [])[1] || f.replace(".mdx", "");
  await render(svg({ title, tag: "JOURNAL" }), `public/images/blog/${f.replace(".mdx", ".webp")}`);
}

console.log("\nDone.");
