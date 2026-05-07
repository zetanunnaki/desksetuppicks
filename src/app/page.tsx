import { Hero } from "@/components/Hero";
import { FeaturedPicks } from "@/components/FeaturedPicks";
import { CategoryGrid } from "@/components/CategoryGrid";
import { TrustSection } from "@/components/TrustSection";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterCTA } from "@/components/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="pt-24 md:pt-12 overflow-x-hidden">
      <Hero />
      <FeaturedPicks />
      <CategoryGrid />
      <AdSlot />
      <TrustSection />
      <NewsletterCTA variant="full-width" />
    </div>
  );
}
