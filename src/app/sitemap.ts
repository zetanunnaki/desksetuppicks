import type { MetadataRoute } from "next";
import { getCategories, getGuides } from "@/lib/data";
import { getAllBlogSlugs, getBlogContent } from "@/lib/mdx";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${SITE.url}${path}`;
  // Real dates beat a single build timestamp; Google ignores priority/changefreq
  // so we omit them entirely.
  const date = (s?: string) => (s ? new Date(s) : now);
  const legal = new Date("2026-05-01");

  const staticEntries: MetadataRoute.Sitemap = [
    { url: u("/"), lastModified: now },
    { url: u("/guides/"), lastModified: now },
    { url: u("/blog/"), lastModified: now },
    { url: u("/about/"), lastModified: legal },
    { url: u("/contact/"), lastModified: legal },
    { url: u("/affiliate-disclosure/"), lastModified: legal },
    { url: u("/privacy-policy/"), lastModified: legal },
    { url: u("/terms/"), lastModified: legal },
  ];

  // Review hubs update as the catalog changes, so the build date is honest here.
  const reviewEntries: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: u(`/reviews/${c.slug}/`),
    lastModified: now,
  }));

  const guideEntries: MetadataRoute.Sitemap = getGuides().map((g) => ({
    url: u(`/guides/${g.slug}/`),
    lastModified: date(g.dateUpdated),
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => {
    const { frontmatter } = getBlogContent(slug);
    return {
      url: u(`/blog/${slug}/`),
      lastModified: date(
        (frontmatter.updated as string) || (frontmatter.date as string)
      ),
    };
  });

  return [...staticEntries, ...reviewEntries, ...guideEntries, ...blogEntries];
}
