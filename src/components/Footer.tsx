"use client";

import Link from "next/link";
import { Laptop } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                DeskSetup<span className="text-indigo-400">Picks</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Meticulously researched workspace gear for creators, engineers, and dreamers. Built for the modern hybrid world.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "Pinterest", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white transition-all"
                >
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Editorial column */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
              Editorial
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/reviews/standing-desks"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Our Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Buying Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
              Stay in the Loop
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Weekly picks and setup inspiration, straight to your inbox.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-500 transition-colors uppercase tracking-widest"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900">
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
