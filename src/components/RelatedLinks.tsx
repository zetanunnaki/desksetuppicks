import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface RelatedLink {
  name: string;
  href: string;
  note?: string;
}

// Reusable internal-linking block (related categories, guides, or reviews).
export function RelatedLinks({
  label,
  heading,
  links,
}: {
  label: string;
  heading: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;
  return (
    <section className="mb-24">
      <div className="section-label">{label}</div>
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between gap-4 p-5 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800/30 transition-all group"
          >
            <span>
              <span className="block text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {link.name}
              </span>
              {link.note && (
                <span className="block text-xs text-slate-500 mt-0.5">{link.note}</span>
              )}
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
