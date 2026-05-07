"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="section-container relative min-h-[90vh] flex items-center">
      {/* Floating gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-full overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1], x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.12, 0.1], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-600/10 blur-[130px] rounded-full"
        />
      </div>

      {/* Content with stagger animations */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-5xl mx-auto"
      >
        <motion.span
          variants={itemVariants}
          className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-10 border border-indigo-500/20"
        >
          Trusted by 500k+ Remote Professionals
        </motion.span>
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1] tracking-tighter"
        >
          The Science of a <br />
          <span className="text-gradient">Perfect Workspace.</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Data-backed reviews, ergonomic benchmarks, and aesthetic deep-dives to help you build the ultimate setup.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/reviews/standing-desks" className="btn-primary group w-full sm:w-auto">
            <span>Explore The Gear</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/guides/how-to-build-the-perfect-home-office"
            className="btn-outline w-full sm:w-auto"
          >
            Start The Quiz
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
