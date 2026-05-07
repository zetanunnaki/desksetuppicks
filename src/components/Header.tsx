"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Laptop, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
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
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20"
          >
            <Laptop className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            DeskSetup<span className="text-indigo-400">Picks</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setShowReviews(true)}
            onMouseLeave={() => setShowReviews(false)}
          >
            <button className="px-4 py-2 flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              <span>Reviews</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showReviews ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showReviews && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 w-64 bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-800 p-2 mt-2"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/reviews/${cat.slug}`}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-indigo-400" />
                      </span>
                      <span className="-ml-6 group-hover:ml-0 transition-all">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            Blog
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/guides/how-to-build-the-perfect-home-office"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors"
          >
            Setup Guide
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-950 border-t border-slate-900 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <Link href="/" className="block text-xl font-bold text-white">
                Home
              </Link>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Product Categories
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
                href="/guides"
                className="block text-xl font-bold text-white"
              >
                Guides
              </Link>
              <Link href="/blog" className="block text-xl font-bold text-white">
                Blog
              </Link>
              <Link
                href="/about"
                className="block text-xl font-bold text-white"
              >
                About Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
