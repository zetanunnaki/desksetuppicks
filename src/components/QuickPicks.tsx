import { Star } from "lucide-react";
import { getQuickPicks } from "@/lib/recommendations";
import type { Product } from "@/lib/types";

// "Best for…" strip — fast, scannable picks that convert browsers to buyers.
export function QuickPicks({ products }: { products: Product[] }) {
  const picks = getQuickPicks(products);
  if (picks.length < 2) return null;

  return (
    <section className="mb-16">
      <div className="section-label">Quick Picks · At a Glance</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {picks.map((pick) => {
          const p = pick.product;
          return (
            <a
              key={p.id}
              href={`#review-${p.slug}`}
              className="block p-5 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800/30 transition-all group"
            >
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                {pick.label}
              </span>
              <h3 className="text-base font-black text-white mt-2 mb-1 group-hover:text-indigo-300 transition-colors">
                {p.name}
              </h3>
              <p className="text-xs text-slate-500 mb-3">{pick.blurb}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{p.amazonRating || p.rating}</span>
                </span>
                <span className="text-sm font-black text-white">
                  {p.amazonPrice || p.priceRange}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
