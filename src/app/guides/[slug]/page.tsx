import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, User } from "lucide-react";
import { getGuideBySlug, getCategories } from "@/lib/data";
import { getGuideContent, getAllGuideSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import { getReviewSlugsForGuide } from "@/lib/recommendations";

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
    alternates: { canonical: `/guides/${slug}/` },
    openGraph: {
      type: "article",
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/guides/${slug}/`,
      images: [{ url: guide.imageUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [guide.imageUrl] },
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

  const catBySlug = new Map(getCategories().map((c) => [c.slug, c]));
  const relatedReviews = getReviewSlugsForGuide(guide)
    .map((s) => catBySlug.get(s))
    .filter((c): c is NonNullable<typeof c> => !!c && c.productCount > 0)
    .slice(0, 4);

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <ScrollProgress />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${slug}` },
          ]),
          articleSchema({
            title: guide.title,
            description: guide.description,
            author: guide.author,
            datePublished: guide.datePublished,
            dateModified: guide.dateUpdated,
            image: guide.imageUrl,
            path: `/guides/${slug}`,
          }),
        ]}
      />
      {/* Hero */}
      <section className="section-container pb-0">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-8">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-700">&gt;</span>
          <Link
            href="/guides"
            className="hover:text-white transition-colors"
          >
            Guides
          </Link>
          <span className="text-slate-700">&gt;</span>
          <span className="text-slate-300">{guide.title}</span>
        </nav>

        <div className="section-label">Buying Guide</div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-[1.05]">
          {guide.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mb-8">
          {guide.description}
        </p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-16">
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

      <div className="section-container py-0">
        <article className="max-w-[44rem] mx-auto">
          <MdxContent source={content} />
        </article>
      </div>

      {relatedReviews.length > 0 && (
        <div className="section-container py-0">
          <RelatedLinks
            label="Shop the Picks"
            heading="Reviews from this guide"
            links={relatedReviews.map((c) => ({
              name: `Best ${c.name}`,
              href: `/reviews/${c.slug}/`,
              note: `${c.productCount} reviewed`,
            }))}
          />
        </div>
      )}

      <BackToTop />
    </div>
  );
}
