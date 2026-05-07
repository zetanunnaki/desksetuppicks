import { NewsletterCTA } from "@/components/NewsletterCTA";
import type { Product } from "@/lib/types";

export function Sidebar({ products }: { products: Product[] }) {
  return (
    <aside className="lg:w-80 flex-none z-10">
      <div className="sticky top-32 space-y-8">
        {/* Navigation Directory */}
        <div className="glass-card p-8">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
            Navigation Directory
          </h3>
          <nav className="space-y-4 text-sm">
            <a
              href="#benchmarks"
              className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <span className="text-[10px] font-black text-slate-600">01</span>
              <span className="font-bold">Quick Benchmarks</span>
            </a>
            <div>
              <a
                href="#reviews"
                className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span className="text-[10px] font-black text-slate-600">
                  02
                </span>
                <span className="font-bold">Top Recommendations</span>
              </a>
              <div className="ml-9 mt-2 space-y-2">
                {products.map((product) => (
                  <a
                    key={product.id}
                    href={`#review-${product.slug}`}
                    className="block text-xs text-slate-500 hover:text-indigo-400 transition-colors truncate"
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#buying-guide"
              className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <span className="text-[10px] font-black text-slate-600">03</span>
              <span className="font-bold">Buying Guide</span>
            </a>
            <a
              href="#faq"
              className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <span className="text-[10px] font-black text-slate-600">04</span>
              <span className="font-bold">The Setup FAQ</span>
            </a>
          </nav>
        </div>

        {/* Newsletter CTA */}
        <NewsletterCTA variant="sidebar" />

        {/* Sponsorship Placeholder */}
        <div className="w-full h-64 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center">
          <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase italic">
            [ Sponsored ]
          </span>
        </div>
      </div>
    </aside>
  );
}
