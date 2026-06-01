"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

const sections = [
  { id: "benchmarks", label: "Introduction", num: "01" },
  { id: "benchmarks", label: "The shortlist", num: "02" },
];

export function Sidebar({ products }: { products: Product[] }) {
  const [activeId, setActiveId] = useState<string>("");

  const productSections = products.map((p, idx) => ({
    id: `review-${p.slug}`,
    label: `${String(idx + 1).padStart(2, "0")} · ${p.name}`,
    num: String(idx + 3).padStart(2, "0"),
  }));

  const allSections = [
    ...sections,
    ...productSections,
    { id: "buying-guide", label: "How we test", num: String(products.length + 3).padStart(2, "0") },
    { id: "faq", label: "FAQ", num: String(products.length + 4).padStart(2, "0") },
  ];

  useEffect(() => {
    const ids = allSections.map((s) => s.id);
    const unique = [...new Set(ids)];
    const elements = unique.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

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

  return (
    <aside className="lg:w-56 flex-none z-10">
      <div className="sticky top-32">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">
          On This Page
        </p>
        <nav className="space-y-0.5 text-sm">
          {allSections.map((section, idx) => {
            const active = activeId === section.id;
            return (
              <a
                key={`${section.id}-${idx}`}
                href={`#${section.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className={`text-[10px] font-bold ${active ? "text-indigo-400" : "text-slate-700"}`}>
                  {section.num}
                </span>
                <span className={`text-sm truncate ${active ? "font-bold" : "font-medium"}`}>
                  {section.label}
                </span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-none" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
