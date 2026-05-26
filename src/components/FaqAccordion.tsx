"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestion, ChevronRight } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="mb-32 scroll-mt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center space-x-4 mb-10">
        <MessageCircleQuestion className="w-6 h-6 text-indigo-400" />
        <h2 className="text-3xl md:text-4xl font-black text-white">
          The Setup FAQ
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-card rounded-[2rem] overflow-hidden transition-colors duration-300 ${
                isOpen ? "border-indigo-500/30" : ""
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center gap-5 p-6 md:p-8 text-left group"
              >
                <span className={`text-[10px] font-black tracking-widest transition-colors duration-300 ${
                  isOpen ? "text-indigo-400" : "text-slate-700"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className={`flex-1 text-base md:text-lg font-bold transition-colors duration-300 ${
                  isOpen ? "text-indigo-300" : "text-white group-hover:text-indigo-300"
                }`}>
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-none"
                >
                  <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                    isOpen ? "text-indigo-400" : "text-slate-600"
                  }`} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[3.75rem] md:pl-[4.75rem]">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
