"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site-config";

const editorialLinks = [
  { href: "/reviews/standing-desks", label: "Latest Reviews" },
  { href: "/guides", label: "Buying Guides" },
  { href: "/blog", label: "The Journal" },
  { href: "/about", label: "Methodology" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socials = [
  { name: "X (Twitter)", letter: "𝕏", href: SITE.social.twitter },
  { name: "Instagram", letter: "◎", href: SITE.social.instagram },
  { name: "Pinterest", letter: "P", href: SITE.social.pinterest },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Brand */}
          <div>
            <div className="mb-8">
              <Logo size="lg" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              An independent editorial publication reviewing the gear that shapes how we work. We test every product for at least 30 days before recommending it.
            </p>
            <div className="flex space-x-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="w-10 h-10 rounded-xl bg-slate-900/60 flex items-center justify-center hover:bg-indigo-600 border border-slate-800/50 hover:border-indigo-500 text-slate-500 hover:text-white transition-all duration-300 text-sm"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Editorial */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Editorial
            </h3>
            <ul className="space-y-3">
              {editorialLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors duration-300 link-underline inline-block pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors duration-300 link-underline inline-block pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-2xl">
              &copy; {new Date().getFullYear()} DeskSetupPicks. Independent editorial. <strong className="text-slate-500 font-semibold">As an Amazon Associate we earn from qualifying purchases.</strong> Prices and availability shown are accurate as of the date of our last update and are subject to change; star ratings reflect our editorial assessment, not Amazon&apos;s customer ratings. See our{" "}
              <a href="/affiliate-disclosure" className="underline hover:text-slate-400">affiliate disclosure</a>.
            </p>
            <p className="text-[10px] text-slate-700 uppercase tracking-[0.25em] font-bold whitespace-nowrap">
              The Science of a Perfect Workspace
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
