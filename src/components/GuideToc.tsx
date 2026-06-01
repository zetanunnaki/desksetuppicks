"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

// Sticky "On this page" table of contents with scroll-spy: the section
// currently in the reading zone is highlighted as you scroll.
export function GuideToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (inView[0]) setActiveId(inView[0].target.id);
      },
      // Trip the active state when a heading enters the top reading band.
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
        On this page
      </p>
      <ul className="border-l border-slate-800">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block -ml-px border-l-2 py-1.5 leading-snug transition-colors ${
                  item.level === 3 ? "pl-8 text-[13px]" : "pl-4"
                } ${
                  isActive
                    ? "border-indigo-500 text-white font-semibold"
                    : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-600"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
