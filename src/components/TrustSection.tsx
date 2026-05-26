"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Microscope, Award, ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const cards = [
  {
    icon: Microscope,
    iconColor: "text-indigo-400",
    bgGlow: "bg-indigo-500/10",
    title: "Metric Based",
    description: "We benchmark stability, motor speed, fabric breathability, and lumbar pressure points using standardized tools.",
  },
  {
    icon: Award,
    iconColor: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    title: "Expert Vetted",
    description: "Our writers have decades of experience in hybrid workspace design, ergonomics, and hardware engineering.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    title: "Fully Independent",
    description: "No sponsored placements. Every product earns its spot through real-world testing against our quality bar.",
  },
];

const stats = [
  { value: 500, suffix: "k+", label: "Readers Monthly" },
  { value: 200, suffix: "+", label: "Products Tested" },
  { value: 4, suffix: ".5★", label: "Min Rating Bar" },
];

export function TrustSection() {
  return (
    <section className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Our Editorial <br />
              <span className="text-indigo-400">Pact.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We don&apos;t take free gear, we don&apos;t take bribes, and we don&apos;t cut corners. Every review is independent.
            </p>
            <Link href="/about" className="inline-flex items-center space-x-2 text-white font-bold group">
              <span className="link-underline pb-1">Read Methodology</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 glass-card group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 ${card.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`relative w-12 h-12 rounded-2xl ${card.bgGlow} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-3">{card.title}</h3>
              <p className="relative text-slate-500 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 md:p-10"
      >
        <div className="grid grid-cols-3 divide-x divide-slate-800">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
