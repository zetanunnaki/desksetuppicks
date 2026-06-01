"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Star, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/types";

type SortKey = "rank" | "rating" | "price";
type SortDir = "asc" | "desc";

export function ComparisonTable({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "rank" ? "asc" : "desc");
    }
  }

  const sorted = [...products].sort((a, b) => {
    const mult = sortDir === "asc" ? 1 : -1;
    if (sortKey === "rank") return mult * (a.rank - b.rank);
    if (sortKey === "rating") return mult * ((a.amazonRating || a.rating) - (b.amazonRating || b.rating));
    return mult * a.name.localeCompare(b.name);
  });

  return (
    <section id="benchmarks" className="mb-32 scroll-mt-32">
      <div className="section-label">
        At a Glance · Compare All Picks
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 italic">
        The shortlist
      </h2>
      <p className="text-slate-500 mb-10 max-w-xl">
        Sort and scan our top {products.length} picks. Tap a column header to sort. Tap a row to jump to the full review.
      </p>

      <div className="rounded-2xl border border-slate-800/50 bg-slate-900/30 overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/30">
                <th className="text-left pl-6 pr-2 py-5 w-16">
                  <button
                    onClick={() => toggleSort("rank")}
                    className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    Rank
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Product
                  </span>
                </th>
                <th className="text-left px-4 py-5">
                  <button
                    onClick={() => toggleSort("rating")}
                    className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    Rating
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Price
                  </span>
                </th>
                <th className="text-right px-6 py-5" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((product, idx) => {
                const isEditorChoice = product.badges.includes("Editor's Choice");
                const displayPrice = product.amazonPrice || product.priceRange;
                const displayRating = product.amazonRating || product.rating;
                const badgeLabel = product.badges[0] || "";
                return (
                  <tr
                    key={product.id}
                    className="border-b border-slate-800/20 last:border-b-0 hover:bg-slate-800/20 transition-colors cursor-pointer"
                    onClick={() => {
                      const el = document.getElementById(`review-${product.slug}`);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {/* Rank */}
                    <td className="pl-6 pr-2 py-5">
                      <span className="text-2xl font-black text-indigo-500/50">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </td>
                    {/* Product */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        {product.amazonImageUrl ? (
                          <img
                            src={product.amazonImageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-contain bg-white flex-none"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                        )}
                        <div>
                          <span className="text-sm font-bold text-white block">
                            {product.name}
                          </span>
                          {badgeLabel && (
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">
                              {badgeLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Rating */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-white w-7">
                          {displayRating}
                        </span>
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(displayRating / 5) * 100}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-5">
                      <span className="text-sm font-bold text-white">
                        {displayPrice}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors font-medium">
                        View
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden divide-y divide-slate-800/30">
          {sorted.map((product, idx) => {
            const displayPrice = product.amazonPrice || product.priceRange;
            const displayRating = product.amazonRating || product.rating;
            return (
              <div
                key={product.id}
                className="p-5 cursor-pointer hover:bg-slate-800/20 transition-colors"
                onClick={() => {
                  const el = document.getElementById(`review-${product.slug}`);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-black text-indigo-500/50">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {product.amazonImageUrl ? (
                    <img
                      src={product.amazonImageUrl}
                      alt={product.name}
                      className="w-9 h-9 rounded-lg object-contain bg-white flex-none"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                  )}
                  <span className="text-sm font-bold text-white flex-1 truncate">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-white">{displayRating}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{displayPrice}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-slate-800/30">
          <p className="text-[10px] text-slate-600 italic">
            Prices updated via Amazon Creators API. Availability may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
