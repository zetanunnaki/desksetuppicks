import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { getAllBlogSlugs, getBlogContent } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, insights, and deep-dives on building the perfect workspace.",
};

export default function BlogPage() {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => {
      const { frontmatter } = getBlogContent(slug);
      return { slug, frontmatter };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date as string).getTime() -
        new Date(a.frontmatter.date as string).getTime()
    );

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          The <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-16">
          Tips, insights, and deep-dives on building the perfect workspace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card glass-card-hover p-8 group block"
            >
              <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6" />
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {post.frontmatter.title as string}
              </h2>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {post.frontmatter.description as string}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.frontmatter.readTime as string}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.frontmatter.date as string}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
