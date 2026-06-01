import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/data";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Expert buying guides for building your perfect desk setup. Standing desks, ergonomic chairs, monitors, and more.",
};

export default function GuidesPage() {
  const guides = getGuides();
  const [featured, ...rest] = guides;

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <div className="mb-16">
          <div className="section-label">Expert Analysis</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 leading-[1.05]">
            Buying guides.
            <br />
            <span className="italic text-slate-500">Written by testers.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Expert buying guides to help you make the right choice for every part of your desk setup.
          </p>
        </div>

        {/* Featured guide */}
        {featured && (
          <Link
            href={`/guides/${featured.slug}`}
            className="glass-card glass-card-hover p-2 group block mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-indigo-900/30 to-slate-900 rounded-[1.5rem] lg:rounded-r-none relative overflow-hidden flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-indigo-500/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="badge-best">Featured</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {featured.datePublished}
                  </span>
                </div>
                <span className="inline-flex items-center space-x-2 text-indigo-400 text-sm font-bold group-hover:text-indigo-300 transition-colors">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              className="glass-card glass-card-hover p-2 group block"
            >
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[1.5rem] mb-5 relative overflow-hidden flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-slate-800 group-hover:text-indigo-500/20 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="px-4 pb-4">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {guide.datePublished}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
