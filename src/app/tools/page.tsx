import type { Metadata } from "next";
import Link from "next/link";
import { Ruler, Flame } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Free Desk Setup Tools & Calculators",
  alternates: { canonical: "/tools/" },
  description:
    "Free interactive tools for a healthier desk setup: an ergonomics calculator for your ideal chair, desk, and monitor height, and a calorie calculator for sitting vs standing vs walking.",
};

const tools = [
  {
    href: "/tools/desk-ergonomics-calculator",
    icon: Ruler,
    title: "Desk Ergonomics Calculator",
    desc: "Enter your height to get your ideal chair, desk (seated and standing), and monitor height — with the science to fine-tune it.",
  },
  {
    href: "/tools/standing-desk-calorie-calculator",
    icon: Flame,
    title: "Standing Desk Calorie Calculator",
    desc: "Compare how many calories you burn sitting, standing, and walking at your desk, based on your bodyweight.",
  },
];

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">Free Tools</p>
      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">Desk Setup Tools</h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl">
        Free, no-signup calculators to dial in a healthier, more comfortable workspace — built on the same
        ergonomic data we use in our reviews.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-3xl border border-slate-800/60 bg-slate-900/40 p-7 hover:border-indigo-500/40 hover:bg-slate-900/70 transition-all"
          >
            <t.icon className="w-7 h-7 text-indigo-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{t.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>

      <BackToTop />
    </main>
  );
}
