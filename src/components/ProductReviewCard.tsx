"use client";

import { motion } from "framer-motion";
import { Check, X, Package } from "lucide-react";
import { StarRating } from "./StarRating";
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
  const badgeLabel = product.badges[0] || "";
  const specs = Object.entries(product.specifications);
  const displayPrice = product.amazonPrice || product.priceRange;

  const badgeColor =
    badgeLabel === "Editor's Choice"
      ? "bg-emerald-500"
      : badgeLabel === "Best Value"
        ? "bg-blue-500"
        : "bg-violet-500";

  return (
    <motion.div
      id={`review-${product.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hero card: image + details */}
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center min-h-[280px] overflow-hidden group">
            {product.amazonImageUrl ? (
              <img
                src={product.amazonImageUrl}
                alt={product.name}
                loading="lazy"
                className="max-h-[240px] sm:max-h-[280px] lg:max-h-[320px] object-contain p-6 sm:p-8 lg:p-10 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Package className="w-16 h-16 text-slate-800" />
                <span className="text-xs text-slate-700 font-bold uppercase tracking-widest">
                  Photo coming soon
                </span>
              </div>
            )}
            {badgeLabel && (
              <div className="absolute top-5 left-5">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider text-white ${badgeColor}`}>
                  {badgeLabel}
                </span>
              </div>
            )}
            {product.useCases && product.useCases.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-slate-950/80 backdrop-blur-sm">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Best for: {product.useCases.slice(0, 3).join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Details side */}
          <div className="p-6 md:p-8 lg:p-10 relative overflow-hidden">
            {/* Ghost number */}
            <div className="absolute -right-4 -top-2 text-[8rem] font-black text-slate-800/20 leading-none select-none pointer-events-none">
              {num}
            </div>

            <div className="relative">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3">
                Review · {num}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                {product.name}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <StarRating
                  rating={product.amazonRating || product.rating}
                />
                <span className="text-2xl font-black text-white ml-auto">
                  {displayPrice}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pros and Cons - side by side with divider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-10">
        <div className="p-8 md:border-r border-slate-800/30">
          <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6">
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
        <div className="p-8">
          <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-6">
            Reasons to Skip
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

      {/* Specs row */}
      <div className="mb-10">
        <p className="section-label text-xs">The Numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {specs.map(([key, value]) => (
            <div
              key={key}
              className="p-4 bg-slate-900/40 border border-slate-800/40 rounded-xl"
            >
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em] block mb-1.5">
                {key}
              </span>
              <span className="text-sm font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict quote + CTA */}
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-start gap-6 md:gap-8">
        <div className="flex-1">
          <span className="text-3xl text-indigo-500/40 font-serif leading-none block mb-3">&ldquo;&rdquo;</span>
          <p className="text-xl md:text-2xl text-white italic leading-relaxed mb-4">
            &ldquo;{product.shortDescription}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black">
              DS
            </div>
            <div>
              <span className="text-sm font-bold text-white block leading-tight">
                DeskSetupPicks Team
              </span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em]">
                Senior Editor
              </span>
            </div>
          </div>
        </div>
        <div className="flex-none">
          <AffiliateButton asin={product.asin} amazonUrl={product.amazonUrl} />
        </div>
      </div>
    </motion.div>
  );
}
