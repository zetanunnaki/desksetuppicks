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
import { Shield } from "lucide-react";

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
  const year = new Date().getFullYear();

  return (
    <div className="pt-24 md:pt-12 bg-slate-950 min-h-screen">
      <ScrollProgress />

      {/* Hero section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] -z-10" />
        <div className="section-container pb-0">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-8">
            <Link
              href="/"
              className="hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/reviews"
              className="hover:text-indigo-400 transition-colors"
            >
              Reviews
            </Link>
            <span>/</span>
            <span className="text-slate-300">{category.name}</span>
          </nav>

          {/* H1 */}
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
            <span className="text-gradient">
              The Best {category.name} of {year}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            {category.metaDescription}
          </p>

          {/* Author + meta info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-black">
                DS
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  The DeskSetupPicks Team
                </span>
                <span className="text-[10px] text-slate-500">
                  Updated May 2026
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-emerald-400 font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <Shield className="w-3 h-3" />
              <span>Independent Testing</span>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure />

      <div className="section-container py-0 flex flex-col lg:flex-row gap-16">
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

        <Sidebar products={products} />
      </div>

      <BackToTop />
    </div>
  );
}
