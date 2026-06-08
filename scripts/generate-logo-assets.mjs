// Generate brand logo + favicon assets from the same monitor-with-checkmark mark
// used in the header Logo component, so favicons + schema logo match exactly.
import sharp from "sharp";
import fs from "fs";

// Rounded gradient tile (indigo -> violet, matching the header Logo) + white glyph.
function markSvg(size) {
  const pad = Math.round(size * 0.03);
  const tile = size - pad * 2;
  const r = Math.round(size * 0.215);
  const scale = (tile / 24) * 0.6;
  const gpad = pad + (tile - 24 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#6366f1"/><stop offset="0.5" stop-color="#4f46e5"/><stop offset="1" stop-color="#7c3aed"/>
  </linearGradient></defs>
  <rect x="${pad}" y="${pad}" width="${tile}" height="${tile}" rx="${r}" fill="url(#g)"/>
  <g transform="translate(${gpad},${gpad}) scale(${scale})" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="12" rx="2.5"/>
    <path d="M8.5 10.2l2.4 2.4 4.6-5"/>
    <path d="M9 20h6M12 16v4"/>
  </g>
</svg>`;
}

async function png(size, out) {
  await sharp(Buffer.from(markSvg(size))).png().toFile(out);
  console.log("OK", out);
}

await png(512, "public/images/logo.png");      // Organization schema logo
await png(512, "src/app/icon.png");             // favicon (Next app router)
await png(180, "src/app/apple-icon.png");       // apple touch icon
fs.rmSync("src/app/favicon.ico", { force: true }); // drop the old default
console.log("Done. Removed old favicon.ico.");
