"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import { getCategories } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className="section-container">
      {/* Header: left heading + right description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">The Full Catalogue</div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05]">
            Twenty categories.
            <br />
            <span className="italic text-slate-500 font-black">Three hundred reviews.</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg leading-relaxed self-end"
        >
          Browse the desk we sit at, the chair we sit in, and every accessory we&apos;d put between us and a productive day. Click any category to read every review.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        {categories.map((cat, idx) => {
          const Icon =
            (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              cat.icon
            ] || Icons.HelpCircle;
          return (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link
                href={`/reviews/${cat.slug}`}
                className="flex flex-col justify-between h-full p-5 md:p-6 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:bg-slate-800/40 hover:border-slate-700/50 transition-all duration-400 group relative overflow-hidden min-h-[160px]"
              >
                {/* Top: number + icon */}
                <div className="flex justify-between items-start mb-auto">
                  <span className="text-xs font-bold text-slate-600">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom: name + count */}
                <div className="mt-8">
                  <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {cat.productCount > 0 ? `${cat.productCount} picks` : "Coming soon"}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
