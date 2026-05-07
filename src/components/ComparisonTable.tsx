"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutList, ArrowUpDown } from "lucide-react";
import { AffiliateButton } from "./AffiliateButton";
import type { Product } from "@/lib/types";

type SortKey = "name" | "rating";
type SortDir = "asc" | "desc";

export function ComparisonTable({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "rating" ? "desc" : "asc");
    }
  }

  const sorted = [...products].sort((a, b) => {
    const mult = sortDir === "asc" ? 1 : -1;
    if (sortKey === "name") return mult * a.name.localeCompare(b.name);
    return mult * (a.rating - b.rating);
  });

  return (
    <section id="benchmarks" className="mb-32 scroll-mt-32">
      <div className="flex items-center space-x-4 mb-10">
        <LayoutList className="w-6 h-6 text-indigo-400" />
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Quick Benchmarks
        </h2>
      </div>

      <div className="rounded-[2.5rem] border border-slate-900 shadow-2xl bg-slate-900/20 backdrop-blur-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="text-left px-8 py-6">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    <span>Gear</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-8 py-6">
                  <button
                    onClick={() => toggleSort("rating")}
                    className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                  >
                    <span>Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-8 py-6">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Price
                  </span>
                </th>
                <th className="text-right px-8 py-6">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((product, idx) => {
                const isEditorChoice = product.badges.includes("Editor's Choice");
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-slate-800/30 last:border-b-0 ${
                      isEditorChoice ? "bg-indigo-600/5" : ""
                    }`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-5">
                        <span className="text-xs font-black text-slate-600 w-6">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                        <div>
                          <span className="text-sm font-bold text-white">
                            {product.name}
                          </span>
                          {isEditorChoice && (
                            <span className="ml-3 text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                              Top Pick
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(product.rating / 5) * 100}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-sm font-black text-white">
                          {product.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-300">
                        {product.priceRange}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <AffiliateButton asin={product.asin} variant="table" />
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
            const isEditorChoice = product.badges.includes("Editor's Choice");
            return (
              <div
                key={product.id}
                className={`p-6 ${isEditorChoice ? "bg-indigo-600/5" : ""}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xs font-black text-slate-600">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex-none" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {product.name}
                    </span>
                    {isEditorChoice && (
                      <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                        Top Pick
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(product.rating / 5) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm font-black text-white">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-300">
                    {product.priceRange}
                  </span>
                </div>
                <AffiliateButton asin={product.asin} variant="table" />
              </div>
            );
          })}
        </div>

        <div className="px-8 py-4 border-t border-slate-800/30">
          <p className="text-[10px] text-slate-600 italic">
            Prices are checked every 24 hours. Gear availability may fluctuate.
          </p>
        </div>
      </div>
    </section>
  );
}
