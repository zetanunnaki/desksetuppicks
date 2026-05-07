"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";

export function FeaturedPicks() {
  const products = getFeaturedProducts();

  return (
    <section className="py-32 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl font-black text-white mb-4">Master List 01</h2>
            <p className="text-slate-500 text-lg">
              The absolute essentials for peak productivity and longevity.
            </p>
          </div>
          <Link
            href="/reviews/standing-desks"
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center space-x-2 group"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card glass-card-hover group p-2 relative"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-6 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                {product.badges.includes("Editor's Choice") && (
                  <div className="absolute top-4 left-4">
                    <span className="badge-best">TOP RATED</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/50">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-white">{product.rating}</span>
                    </div>
                  </div>
                  <span className="text-xl font-black text-white">{product.priceRange}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="px-4 pb-4">
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {product.shortDescription}
                </p>
                <Link
                  href={`/reviews/${product.category}`}
                  className="inline-flex items-center space-x-2 text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors group/link"
                >
                  <span>Read Full Review</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
