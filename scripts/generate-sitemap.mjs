import fs from "fs";

const SITE_URL = "https://desksetuppicks.com";
const today = new Date().toISOString().split("T")[0];

const categories = JSON.parse(
  fs.readFileSync("src/content/categories.json", "utf-8")
).categories;

const guides = JSON.parse(
  fs.readFileSync("src/content/guides.json", "utf-8")
).guides;

const blogSlugs = fs
  .readdirSync("src/content/blog")
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(".mdx", ""));

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/guides/", priority: "0.7", changefreq: "weekly" },
  { loc: "/blog/", priority: "0.6", changefreq: "weekly" },
  { loc: "/about/", priority: "0.4", changefreq: "monthly" },
  { loc: "/contact/", priority: "0.3", changefreq: "monthly" },
  { loc: "/privacy-policy/", priority: "0.2", changefreq: "yearly" },
  { loc: "/affiliate-disclosure/", priority: "0.2", changefreq: "yearly" },
  { loc: "/terms/", priority: "0.2", changefreq: "yearly" },
  ...categories.map((c) => ({
    loc: `/reviews/${c.slug}/`,
    priority: "0.9",
    changefreq: "weekly",
  })),
  ...guides.map((g) => ({
    loc: `/guides/${g.slug}/`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...blogSlugs.map((slug) => ({
    loc: `/blog/${slug}/`,
    priority: "0.6",
    changefreq: "monthly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log(`Sitemap generated: ${urls.length} URLs`);
