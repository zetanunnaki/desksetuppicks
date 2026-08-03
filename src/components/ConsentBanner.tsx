"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie/ads consent banner wired to Google Consent Mode v2. Consent defaults
// to "denied" (set in the layout <head> before GA/AdSense load); this banner
// records the visitor's choice and updates the consent signal accordingly.
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const KEY = "dsp-consent";
const SIGNALS = ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"] as const;

function apply(state: "granted" | "denied") {
  const update = SIGNALS.reduce((o, k) => ({ ...o, [k]: state }), {});
  if (typeof window.gtag === "function") window.gtag("consent", "update", update);
  else (window.dataLayer = window.dataLayer || []).push(["consent", "update", update]);
}

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "granted" || saved === "denied") apply(saved);
    else setShow(true);
  }, []);

  const choose = (state: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, state);
    } catch {}
    apply(state);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-slate-300">
          We use cookies for analytics and to show ads. Choose whether to allow
          non-essential cookies. See our{" "}
          <Link href="/privacy-policy" className="text-indigo-400 underline hover:text-indigo-300">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("denied")}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-800"
          >
            Reject
          </button>
          <button
            onClick={() => choose("granted")}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
