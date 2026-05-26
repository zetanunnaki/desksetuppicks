"use client";

import { useEffect, useState } from "react";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import type { Product } from "@/lib/types";

const sections = [
  { id: "benchmarks", label: "Quick Benchmarks", num: "01" },
  { id: "reviews", label: "Top Recommendations", num: "02" },
  { id: "buying-guide", label: "Buying Guide", num: "03" },
  { id: "faq", label: "The Setup FAQ", num: "04" },
];

export function Sidebar({ products }: { products: Product[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const ids = [...sections.map((s) => s.id), ...products.map((p) => `review-${p.slug}`)];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const isActive = (id: string) => activeId === id;
  const isInReviews = activeId.startsWith("review-");

  return (
    <aside className="lg:w-80 flex-none z-10">
      <div className="sticky top-32 space-y-8">
        <div className="glass-card p-8">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
            Navigation Directory
          </h3>
          <nav className="space-y-3 text-sm">
            {sections.map((section) => {
              const active = isActive(section.id) || (section.id === "reviews" && isInReviews);
              return (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex items-center space-x-3 py-1.5 transition-all duration-300 ${
                      active
                        ? "text-indigo-400"
                        : "text-slate-400 hover:text-indigo-400"
                    }`}
                  >
                    <span className={`text-[10px] font-black transition-colors duration-300 ${
                      active ? "text-indigo-400" : "text-slate-600"
                    }`}>
                      {section.num}
                    </span>
                    <span className="font-bold">{section.label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    )}
                  </a>
                  {section.id === "reviews" && (
                    <div className="ml-9 mt-1 space-y-1 border-l border-slate-800 pl-3">
                      {products.map((product) => {
                        const productActive = isActive(`review-${product.slug}`);
                        return (
                          <a
                            key={product.id}
                            href={`#review-${product.slug}`}
                            className={`block text-xs py-1 transition-all duration-300 truncate ${
                              productActive
                                ? "text-indigo-400 translate-x-1"
                                : "text-slate-500 hover:text-indigo-400"
                            }`}
                          >
                            {product.name}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <NewsletterCTA variant="sidebar" />

        <div className="w-full h-64 bg-slate-900/40 border border-slate-800/50 rounded-[2rem] flex items-center justify-center backdrop-blur-xl">
          <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase italic">
            [ Sponsored ]
          </span>
        </div>
      </div>
    </aside>
  );
}
