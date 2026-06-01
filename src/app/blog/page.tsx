import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
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

  const [featured, ...rest] = posts;

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <div className="mb-16">
          <div className="section-label">The Journal</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 leading-[1.05]">
            Workspace intel.
            <br />
            <span className="italic text-slate-500">No fluff.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Tips, insights, and deep-dives on building the perfect workspace.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="glass-card glass-card-hover p-2 group block mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-indigo-900/30 to-slate-900 rounded-[1.5rem] lg:rounded-r-none relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="badge-best">Latest</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {featured.frontmatter.title as string}
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                  {featured.frontmatter.description as string}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featured.frontmatter.readTime as string}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {featured.frontmatter.date as string}
                  </span>
                </div>
                <span className="inline-flex items-center space-x-2 text-indigo-400 text-sm font-bold group-hover:text-indigo-300 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card glass-card-hover p-2 group block"
            >
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[1.5rem] mb-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="px-4 pb-4">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {post.frontmatter.title as string}
                </h2>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {post.frontmatter.description as string}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.frontmatter.readTime as string}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.frontmatter.date as string}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
