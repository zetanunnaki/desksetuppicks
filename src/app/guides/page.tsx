import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/data";
import { Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Expert buying guides for building your perfect desk setup. Standing desks, ergonomic chairs, monitors, and more.",
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          Buying <span className="text-gradient">Guides</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-16">
          Expert buying guides to help you make the right choice for every part
          of your desk setup. Tested, reviewed, and updated regularly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              className="glass-card glass-card-hover p-8 group block"
            >
              <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6" />
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {guide.title}
              </h2>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {guide.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {guide.datePublished}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
