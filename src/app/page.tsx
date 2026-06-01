import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeaturedPicks } from "@/components/FeaturedPicks";
import { CategoryGrid } from "@/components/CategoryGrid";
import { TrustSection } from "@/components/TrustSection";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { categoryListSchema } from "@/lib/schema";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="pt-24 md:pt-12 overflow-x-hidden">
      <JsonLd data={categoryListSchema(getCategories())} />
      <Hero />
      <FeaturedPicks />
      <CategoryGrid />
      <AdSlot />
      <TrustSection />
    </div>
  );
}
