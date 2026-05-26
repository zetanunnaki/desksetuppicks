"use client";

import { motion } from "framer-motion";
import { Check, X, Package } from "lucide-react";
import { StarRating } from "./StarRating";
import { Badge } from "./Badge";
import { AffiliateButton } from "./AffiliateButton";
import type { Product } from "@/lib/types";

export function ProductReviewCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const isEditorChoice = product.badges.includes("Editor's Choice");
  const specs = Object.entries(product.specifications);
  const displayPrice = product.amazonPrice || product.priceRange;

  return (
    <motion.div
      id={`review-${product.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start space-x-6 mb-4">
          <span className="text-6xl md:text-8xl font-black text-indigo-600/20 leading-none select-none">
            {num}
          </span>
          <div className="pt-2 md:pt-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {product.name}
            </h2>
            <div className="mt-3">
              <StarRating
                rating={product.amazonRating || product.rating}
                reviewCount={product.reviewCount}
              />
            </div>
          </div>
        </div>
        {isEditorChoice && (
          <div className="flex flex-wrap gap-2 mt-4 ml-0 md:ml-20">
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>
        )}
      </div>

      {/* Product image */}
      <div className="aspect-[21/9] rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800/50 mb-12 flex items-center justify-center overflow-hidden relative group">
        {product.amazonImageUrl ? (
          <img
            src={product.amazonImageUrl}
            alt={product.name}
            loading="lazy"
            className="max-h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Package className="w-16 h-16 text-slate-800" />
            <span className="text-xs text-slate-700 font-bold uppercase tracking-widest">
              Photo coming soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-8 border-l-2 border-l-emerald-500/30 hover:border-l-emerald-500/60 transition-colors">
          <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">
            What We Love
          </h3>
          <ul className="space-y-4">
            {product.prosAndCons.pros.map((pro, i) => (
              <li key={i} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-none mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-8 border-l-2 border-l-rose-500/30 hover:border-l-rose-500/60 transition-colors">
          <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-6">
            What Could Improve
          </h3>
          <ul className="space-y-4">
            {product.prosAndCons.cons.map((con, i) => (
              <li key={i} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-none mt-0.5">
                  <X className="w-3 h-3 text-rose-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div className="mb-12 relative pl-6 border-l-2 border-indigo-500/30">
        <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed">
          &ldquo;{product.shortDescription}&rdquo;
        </p>
      </div>

      {/* Specs + CTA */}
      <div className="glass-card p-8 md:p-10">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">
          Key Specifications
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {specs.map(([key, value]) => (
            <div key={key} className="p-3 rounded-xl bg-slate-800/30">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">
                {key}
              </span>
              <span className="text-sm font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 pt-4 border-t border-slate-800/50">
          <AffiliateButton asin={product.asin} amazonUrl={product.amazonUrl} />
          <div className="flex flex-col">
            <span className="text-lg text-white font-black">{displayPrice}</span>
            {product.amazonListPrice && product.amazonPrice !== product.amazonListPrice && (
              <span className="text-xs text-slate-500 line-through">
                {product.amazonListPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
