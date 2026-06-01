"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const issueItems = [
  { num: "01", title: "Best standing desks under $500", tag: "GUIDE" },
  { num: "02", title: "Best ergonomic chairs compared", tag: "REVIEWED" },
  { num: "03", title: "Standing desk vs sitting desk", tag: "OPINION" },
  { num: "04", title: "A complete WFH lighting guide", tag: "GUIDE" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      </div>

      {/* Animated gradient orbs with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 max-w-full overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.2, 0.12],
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-indigo-600/15 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.08, 0.15, 0.08],
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Main content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Issue badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/60 border border-slate-800/50 mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300 font-medium">
                Issue 24 · May 2026
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                12 New Reviews
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-8 leading-[0.95] tracking-tight"
            >
              The science of a{" "}
              <span className="text-gradient-italic font-black not-italic block sm:inline"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundImage: "linear-gradient(135deg, #c7d2fe 0%, #6366f1 50%, #818cf8 100%)",
                  fontStyle: "italic",
                }}
              >
                perfect
              </span>{" "}
              workspace.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 max-w-xl leading-relaxed"
            >
              We review desks, chairs, monitors, and the small things that make a great workday feel inevitable. Every product is tested for at least{" "}
              <span className="text-white font-bold">30 days</span> — only the top{" "}
              <span className="text-white font-bold">4.5★</span> make this list.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/reviews/standing-desks"
                className="px-7 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 text-base"
              >
                Explore the latest picks
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-4 border border-slate-700 text-slate-300 font-medium rounded-2xl hover:bg-slate-900 hover:border-slate-600 transition-all duration-300 inline-flex items-center text-base active:scale-95"
              >
                Read our methodology
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: IN THIS ISSUE sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6 text-center">
              In This Issue
            </p>
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
              {issueItems.map((item, idx) => (
                <div
                  key={item.num}
                  className={`flex items-center gap-5 px-6 py-5 hover:bg-slate-800/30 transition-colors group cursor-pointer ${
                    idx < issueItems.length - 1 ? "border-b border-slate-800/30" : ""
                  }`}
                >
                  <span className="text-2xl font-black text-indigo-500/60">{item.num}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-0.5">
                      {item.tag}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors flex-none" />
                </div>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-400">
                <span className="text-white font-bold">4.9</span> trusted by 500k+ readers
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
