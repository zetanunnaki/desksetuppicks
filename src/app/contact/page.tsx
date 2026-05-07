"use client";

import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";

// Note: Metadata cannot be exported from a Client Component in Next.js.
// For contact page metadata, use a separate layout or wrap in a server parent.
// The page itself is client-side for the form onSubmit handler.

const subjects = [
  "General Inquiry",
  "Product Review Request",
  "Partnership / Sponsorship",
  "Correction / Feedback",
  "Press Inquiry",
  "Other",
];

export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      {/* Hero */}
      <section className="section-container pb-0">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Have a question, correction, or partnership inquiry? We&apos;d love
            to hear from you. We read every message and reply within 2 business
            days.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-2xl font-black text-white mb-8">
                Send Us a Message
              </h2>
              <form
                action="#"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s} className="bg-slate-800">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800 transition-all duration-300 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-black text-white">Email Us</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                For direct correspondence, you can reach us at:
              </p>
              <a
                href="mailto:hello@desksetuppicks.com"
                className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors text-sm"
              >
                hello@desksetuppicks.com
              </a>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Response Time
                </h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We aim to respond to all messages within{" "}
                <span className="text-white font-semibold">
                  2 business days
                </span>
                . Partnership inquiries may take a bit longer.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-black text-white mb-3">
                Not What You&apos;re Looking For?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                For affiliate program details, see our{" "}
                <a
                  href="/affiliate-disclosure"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  affiliate disclosure
                </a>
                . For data questions, see our{" "}
                <a
                  href="/privacy-policy"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
