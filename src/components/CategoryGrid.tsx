"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import { getCategories } from "@/lib/data";

export function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className="section-container">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-black text-white mb-6">Browse The Lab</h2>
        <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
          Systematic testing and data analysis for every component of your workstation.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, idx) => {
          const Icon =
            (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              cat.icon
            ] || Icons.HelpCircle;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={`/reviews/${cat.slug}`}
                className="block p-8 bg-slate-900/40 border border-slate-900 rounded-[2.5rem] hover:bg-indigo-600/10 hover:border-indigo-500/50 hover:-translate-y-2 transition-all duration-500 text-center group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

                <div className="relative w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white mx-auto mb-6 transition-all duration-500 shadow-2xl group-hover:shadow-indigo-500/20 group-hover:rotate-6">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="relative font-black text-white text-xl mb-1 group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="relative text-xs text-slate-500 group-hover:text-indigo-400 font-black uppercase tracking-widest">
                  {cat.productCount} Items
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
