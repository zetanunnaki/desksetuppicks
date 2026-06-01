"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, ShieldCheck, Eye, Star } from "lucide-react";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
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
    icon: FlaskConical,
    num: "01",
    title: "30 days of testing.",
    description: "Every product lives on a real desk before it lives on this list. We measure noise, feel, build quality, and longevity in conditions you'd actually work in.",
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "No paid placement.",
    description: "We refuse review samples that come with strings attached. If a brand asks for editorial control, the product doesn't get reviewed. Period.",
  },
  {
    icon: Eye,
    num: "03",
    title: "Reasons to skip, always.",
    description: "Every review tells you who shouldn't buy the product. We'd rather lose a click than recommend the wrong chair for your back.",
  },
];

const stats = [
  { value: 137, suffix: "", label: "Products Reviewed" },
  { value: 21, suffix: "", label: "Categories Covered" },
  { value: 30, suffix: "", label: "Buying Guides" },
  { value: 4, suffix: ".5", icon: true, label: "Minimum Quality Bar" },
];

export function TrustSection() {
  return (
    <section className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="section-label">How We Earn Your Trust</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4">
          The editorial promise.
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          We exist because we got tired of fake review sites. Here&apos;s exactly how this one is different.
        </p>
      </motion.div>

      {/* 3 Promise cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl relative overflow-hidden group hover:border-slate-700/50 transition-all"
          >
            {/* Icon + ghost number */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
                <card.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-5xl font-black text-slate-800/30 leading-none select-none">
                {card.num}
              </span>
            </div>

            <h3 className="text-xl font-black text-white mb-3">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-8 md:p-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-slate-800/50">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                {stat.icon && <Star className="w-6 h-6 text-amber-400 fill-amber-400 inline" />}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
