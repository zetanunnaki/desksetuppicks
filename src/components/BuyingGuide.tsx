import { BookOpen } from "lucide-react";
import { getCategoryContent } from "@/content/category-content";
import { getCategoryBySlug } from "@/lib/data";

export function BuyingGuide({ categorySlug }: { categorySlug: string }) {
  const content = getCategoryContent(categorySlug);
  const category = getCategoryBySlug(categorySlug);
  const categoryName = category?.name ?? "Gear";

  if (content.buyingGuide.length === 0) return null;

  return (
    <section id="buying-guide" className="mb-32 scroll-mt-32">
      <div className="flex items-center space-x-4 mb-10">
        <BookOpen className="w-6 h-6 text-indigo-400" />
        <h2 className="text-3xl md:text-4xl font-black text-white">
          How We Judge {categoryName}
        </h2>
      </div>

      <div className="glass-card p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {content.buyingGuide.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-white mb-3">
                {section.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
