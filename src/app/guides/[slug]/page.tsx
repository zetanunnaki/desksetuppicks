import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, User } from "lucide-react";
import { getGuideBySlug } from "@/lib/data";
import { getGuideContent, getAllGuideSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { BackToTop } from "@/components/BackToTop";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { content } = getGuideContent(slug);

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      {/* Hero */}
      <section className="section-container pb-0">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-8 font-black uppercase tracking-widest">
          <Link
            href="/"
            className="hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/guides"
            className="hover:text-indigo-400 transition-colors"
          >
            Guides
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300">{guide.title}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          {guide.title}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mb-8">
          {guide.description}
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-16">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {guide.author}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {guide.readTime}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {guide.dateUpdated}
          </span>
        </div>
      </section>

      <AffiliateDisclosure />

      <div className="section-container py-0 flex flex-col lg:flex-row gap-16">
        <article className="flex-1 min-w-0">
          <MdxContent source={content} />
        </article>
        <aside className="lg:w-80 flex-none">
          <div className="sticky top-32 space-y-8">
            <NewsletterCTA variant="sidebar" />
          </div>
        </aside>
      </div>

      <BackToTop />
    </div>
  );
}
