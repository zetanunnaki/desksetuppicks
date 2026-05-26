"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Package } from "lucide-react";
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

export function FeaturedPicks() {
  const products = getFeaturedProducts();

  return (
    <section className="py-32 bg-slate-900/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3 block">
              Editor&apos;s Picks
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Top Rated Gear
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              The absolute essentials rated 4.5+ stars with hundreds of verified reviews.
            </p>
          </motion.div>
          <Link
            href="/reviews/standing-desks"
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center space-x-2 group"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="glass-card group p-2 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-transparent group-hover:from-indigo-500/5 transition-all duration-700 rounded-[2rem]" />

              {/* Image area */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-5 bg-gradient-to-br from-slate-800 to-slate-900">
                {product.amazonImageUrl ? (
                  <img
                    src={product.amazonImageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-800" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {product.badges.includes("Editor's Choice") && (
                  <div className="absolute top-4 left-4">
                    <span className="badge-best">TOP RATED</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/50">
                    <div className="flex items-center space-x-1.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-white">
                        {product.amazonRating || product.rating}
                      </span>
                      {product.reviewCount && (
                        <span className="text-[10px] text-slate-400">
                          ({product.reviewCount.toLocaleString()})
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xl font-black text-white drop-shadow-lg">
                    {product.amazonPrice || product.priceRange}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="relative px-4 pb-4">
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {product.shortDescription}
                </p>
                <Link
                  href={`/reviews/${product.category}`}
                  className="inline-flex items-center space-x-2 text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors group/link"
                >
                  <span>Read Full Review</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
