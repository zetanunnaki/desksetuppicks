"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Star, Package } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const badgeLabels = ["EDITOR'S CHOICE", "BEST PREMIUM", "BEST VALUE"];
const badgeColors = [
  "bg-emerald-500 text-white",
  "bg-violet-500 text-white",
  "bg-blue-500 text-white",
];

export function FeaturedPicks() {
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label">
              Featured Picks · This Month
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05]">
              Three products we&apos;d buy
              <br />
              <span className="italic text-slate-500 font-black">with our own money.</span>
            </h2>
          </motion.div>
          <Link
            href="/reviews/standing-desks"
            className="text-slate-400 font-medium hover:text-white transition-colors flex items-center gap-2 group flex-none"
          >
            <span>See all reviews</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden group"
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                {product.amazonImageUrl ? (
                  <img
                    src={product.amazonImageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-800" />
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider ${badgeColors[idx] || badgeColors[0]}`}>
                    {badgeLabels[idx] || "TOP PICK"}
                  </span>
                </div>

                {/* Ghost number */}
                {idx > 0 && (
                  <div className="absolute top-2 right-4 text-[6rem] font-black text-white/[0.04] leading-none select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                )}

                {/* Category + rating bar */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex justify-between items-center bg-gradient-to-t from-slate-950/90 to-transparent">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {product.category.replace(/-/g, " ")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">
                      {product.amazonRating || product.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="border-t border-slate-800/50 pt-5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-1">
                      Starting at
                    </span>
                    <span className="text-2xl font-black text-white">
                      {product.amazonPrice || product.priceRange}
                    </span>
                  </div>
                  <Link
                    href={`/reviews/${product.category}`}
                    className="px-5 py-2.5 border border-slate-700 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all inline-flex items-center gap-1.5"
                  >
                    Read review
                    <span className="text-slate-500">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
