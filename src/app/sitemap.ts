import type { MetadataRoute } from "next";
import { getCategories, getGuides } from "@/lib/data";
import { getAllBlogSlugs } from "@/lib/mdx";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${SITE.url}${path}`;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: u("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: u("/guides/"), changeFrequency: "weekly", priority: 0.7 },
    { url: u("/blog/"), changeFrequency: "weekly", priority: 0.6 },
    { url: u("/about/"), changeFrequency: "monthly", priority: 0.4 },
    { url: u("/contact/"), changeFrequency: "monthly", priority: 0.3 },
    { url: u("/affiliate-disclosure/"), changeFrequency: "yearly", priority: 0.2 },
    { url: u("/privacy-policy/"), changeFrequency: "yearly", priority: 0.2 },
    { url: u("/terms/"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const reviewEntries: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: u(`/reviews/${c.slug}/`),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const guideEntries: MetadataRoute.Sitemap = getGuides().map((g) => ({
    url: u(`/guides/${g.slug}/`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: u(`/blog/${slug}/`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...reviewEntries, ...guideEntries, ...blogEntries].map(
    (entry) => ({ ...entry, lastModified: now })
  );
}
