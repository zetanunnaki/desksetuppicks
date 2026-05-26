import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, User } from "lucide-react";
import { getBlogContent, getAllBlogSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { BackToTop } from "@/components/BackToTop";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getBlogContent(slug);
    return {
      title: frontmatter.title as string,
      description: frontmatter.description as string,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let content: string;
  let frontmatter: Record<string, unknown>;
  try {
    const result = getBlogContent(slug);
    content = result.content;
    frontmatter = result.frontmatter;
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title as string,
    description: frontmatter.description as string,
    author: {
      "@type": "Organization",
      name: frontmatter.author as string,
    },
    datePublished: frontmatter.date as string,
    dateModified: (frontmatter.updated as string) ?? (frontmatter.date as string),
    image: frontmatter.image as string,
  };

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="section-container pb-0">
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-8 font-black uppercase tracking-widest">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/blog"
            className="hover:text-indigo-400 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300">{frontmatter.title as string}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          {frontmatter.title as string}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mb-8">
          {frontmatter.description as string}
        </p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-16">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {frontmatter.author as string}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {frontmatter.readTime as string}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {frontmatter.date as string}
          </span>
        </div>
      </section>

      <AffiliateDisclosure />

      <div className="section-container py-0">
        <article className="max-w-3xl">
          <MdxContent source={content} />
        </article>
      </div>

      <BackToTop />
    </div>
  );
}
