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
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4"
        >
          20 Categories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-white mb-6"
        >
          Browse The Lab
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed"
        >
          Systematic testing and data analysis for every component of your workstation.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {categories.map((cat) => {
          const Icon =
            (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              cat.icon
            ] || Icons.HelpCircle;
          return (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link
                href={`/reviews/${cat.slug}`}
                className="block p-6 md:p-8 bg-slate-900/40 border border-slate-800/50 rounded-[2rem] hover:bg-indigo-600/10 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-500 text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-transparent transition-all duration-500" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/0 blur-3xl group-hover:bg-indigo-500/15 transition-all duration-700" />

                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-800/80 rounded-2xl md:rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white mx-auto mb-5 transition-all duration-500 shadow-xl group-hover:shadow-indigo-500/20 group-hover:rotate-3 group-hover:scale-105">
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="relative font-black text-white text-base md:text-lg mb-1 group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="relative text-[10px] text-slate-600 group-hover:text-indigo-400 font-black uppercase tracking-widest transition-colors">
                  {cat.productCount > 0 ? `${cat.productCount} Items` : "Coming Soon"}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
