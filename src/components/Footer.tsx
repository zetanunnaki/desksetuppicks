"use client";

import Link from "next/link";
import { Laptop } from "lucide-react";

const editorialLinks = [
  { href: "/reviews/standing-desks", label: "Our Reviews" },
  { href: "/guides", label: "Buying Guides" },
  { href: "/blog", label: "Blog" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/3 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="p-2 bg-indigo-600 rounded-xl group-hover:bg-indigo-500 transition-colors">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                DeskSetup<span className="text-indigo-400">Picks</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Meticulously researched workspace gear for creators, engineers, and dreamers. Built for the modern hybrid world.
            </p>
            <div className="flex space-x-3">
              {[
                { name: "Twitter", letter: "X" },
                { name: "Pinterest", letter: "P" },
                { name: "Instagram", letter: "I" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-900/60 flex items-center justify-center hover:bg-indigo-600 border border-slate-800/50 hover:border-indigo-500 text-slate-500 hover:text-white transition-all duration-300 text-xs font-black"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Editorial */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
              Editorial
            </h3>
            <ul className="space-y-3">
              {editorialLinks.map((link) => (
                <li key={link.href}>
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
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
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
            <p className="text-[10px] text-slate-600 leading-relaxed italic max-w-2xl">
              DeskSetupPicks.com is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases.
            </p>
            <p className="text-xs text-slate-600 whitespace-nowrap">
              &copy; {new Date().getFullYear()} DeskSetupPicks
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
