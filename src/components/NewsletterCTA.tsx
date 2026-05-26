"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

interface NewsletterCTAProps {
  variant?: "sidebar" | "full-width";
}

function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return { email, setEmail, status, errorMsg, handleSubmit };
}

export function NewsletterCTA({ variant = "sidebar" }: NewsletterCTAProps) {
  const { email, setEmail, status, errorMsg, handleSubmit } = useNewsletterForm();

  if (variant === "sidebar") {
    return (
      <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group/cta">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full group-hover/cta:scale-150 transition-transform duration-700" />
        <div className="absolute right-4 top-4 opacity-10">
          <Mail className="w-20 h-20" />
        </div>
        <h4 className="relative text-xl font-black mb-4">
          Build Your <br />
          Dream Office.
        </h4>
        <p className="relative text-xs text-indigo-200 mb-6 leading-relaxed">
          Get the curated workspace gear list every week.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 py-4"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-bold text-white">You&apos;re in! Check your inbox.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="relative space-y-3"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl text-sm text-slate-950 bg-white border-2 border-transparent focus:ring-0 focus:border-indigo-300 transition-colors"
              />
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-indigo-200"
                >
                  {errorMsg}
                </motion.p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-slate-950 text-white text-xs font-black rounded-xl hover:bg-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Join The Lab"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 mb-6"
        >
          <Mail className="w-7 h-7 text-indigo-400" />
        </motion.div>

        <h2 className="relative text-4xl md:text-5xl font-black text-white mb-4">
          Get Weekly Setup Tips &amp; Deals
        </h2>
        <p className="relative text-slate-400 mb-10 max-w-lg mx-auto">
          Join 10,000+ remote workers who get our curated picks and exclusive desk setup inspiration every Thursday.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold text-white">Welcome aboard! Check your inbox.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-sm text-white bg-slate-800/80 border border-slate-700 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-rose-400 mt-2 text-left"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
