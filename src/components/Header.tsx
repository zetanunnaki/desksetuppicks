"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/data";
import { Logo } from "./Logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const categories = getCategories();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="px-4 py-2 flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full -left-4 w-[calc(100vw-3rem)] sm:w-[400px] lg:w-[520px] bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-800 p-3 sm:p-4 mt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5">
                    {categories.map((cat, idx) => (
                      <Link
                        key={cat.id}
                        href={`/reviews/${cat.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-800/60 hover:text-white rounded-lg transition-all"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-slate-600 w-4">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium">{cat.name}</span>
                        </span>
                        {cat.productCount > 0 && (
                          <span className="text-xs text-slate-600">{cat.productCount}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/reviews/standing-desks"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="/guides"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="p-2.5 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50">
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/reviews/standing-desks"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors inline-flex items-center gap-1.5"
          >
            Top Picks
            <span className="text-indigo-200">→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-950 border-t border-slate-900 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/reviews/${cat.slug}`}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/reviews/standing-desks"
                className="block text-xl font-bold text-white"
              >
                Reviews
              </Link>
              <Link
                href="/guides"
                className="block text-xl font-bold text-white"
              >
                Guides
              </Link>
              <Link href="/blog" className="block text-xl font-bold text-white">
                Journal
              </Link>
              <Link
                href="/about"
                className="block text-xl font-bold text-white"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
