import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategories,
} from "@/lib/data";
import { getCategoryContent } from "@/content/category-content";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProductReviewCard } from "@/components/ProductReviewCard";
import { BuyingGuide } from "@/components/BuyingGuide";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Sidebar } from "@/components/Sidebar";
import { BackToTop } from "@/components/BackToTop";
import { Star, Clock, Calendar, FlaskConical } from "lucide-react";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.metaTitle,
    description: category.metaDescription,
  };
}

export default async function CategoryReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const categoryContent = getCategoryContent(slug);
  const avgRating =
    products.length > 0
      ? (
          products.reduce((sum, p) => sum + (p.amazonRating || p.rating), 0) /
          products.length
        ).toFixed(1)
      : "—";

  return (
    <div className="pt-24 md:pt-12 bg-slate-950 min-h-screen">
      <ScrollProgress />

      {/* Hero section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] -z-10" />
        <div className="section-container pb-0">
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
              href="/reviews/standing-desks"
              className="hover:text-white transition-colors"
            >
              Reviews
            </Link>
            <span className="text-slate-700">&gt;</span>
            <span className="text-slate-300">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
            {/* Left: heading + meta */}
            <div>
              {/* Section label */}
              <div className="section-label">
                Buyer&apos;s Review · Updated May 2026
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-6">
                <span className="text-white">
                  The {products.length} best
                </span>
                <br />
                <span
                  className="italic"
                  style={{
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(135deg, #c7d2fe 0%, #6366f1 50%, #818cf8 100%)",
                  }}
                >
                  {category.name.toLowerCase()}
                </span>
                <br />
                <span className="text-white">we&apos;d actually buy.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
                {category.metaDescription}
              </p>

              {/* Author meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">
                    DS
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block leading-tight">
                      The DeskSetupPicks Team
                    </span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em]">
                      Senior Editors
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline text-slate-700">·</span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  May 2026
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  14 min read
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                  <FlaskConical className="w-3.5 h-3.5" />
                  30+ days tested
                </span>
              </div>
            </div>

            {/* Right: AT A GLANCE card */}
            <div>
              <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                  At a Glance
                </p>
                <p className="text-3xl font-black text-white mb-1">
                  {products.length} picks
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  from {products.length * 6}+ {category.name.toLowerCase()} considered
                </p>

                <div className="space-y-4 border-t border-slate-800/50 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Average rating</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      {avgRating} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Price range</span>
                    <span className="text-sm font-bold text-white">{category.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Quality bar</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      4.5+ <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Testing period</span>
                    <span className="text-sm font-bold text-white">6 weeks</span>
                  </div>
                </div>

                <a
                  href="#benchmarks"
                  className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  Jump to comparison
                  <span className="text-slate-400">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure />

      <div className="section-container py-0 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="hidden lg:block">
          <Sidebar products={products} />
        </div>

        <main className="flex-1 min-w-0">
          <ComparisonTable products={products} />

          <section id="reviews" className="space-y-40 mb-32 scroll-mt-32">
            {products.map((product, idx) => (
              <ProductReviewCard
                key={product.id}
                product={product}
                index={idx}
              />
            ))}
          </section>

          <BuyingGuide categorySlug={slug} />
          <FaqAccordion faqs={categoryContent.faqs} />
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
