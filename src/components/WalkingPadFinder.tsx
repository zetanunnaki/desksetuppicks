"use client";

import { useState } from "react";
import Link from "next/link";
import { Footprints, RotateCcw } from "lucide-react";

// Maps answers to the picks from our under-desk-treadmill guide. Update these if
// the guide's picks change; the result links out to the full, live review.
const PICKS: Record<string, { name: string; why: string }> = {
  sunny: { name: "Sunny Treadpad 100", why: "The most-proven, quiet, walk-only pad — the safe default for most desk workers." },
  buztrio: { name: "Buztrio X22D", why: "The highest-rated budget pad: grab-and-go, no assembly, lowest price." },
  superun: { name: "Superun BA10-B", why: "Adds a manual incline for extra calorie burn without stepping up to a 2-in-1." },
  urevo: { name: "UREVO Strol 2E", why: "A 2-in-1: walks flat at the desk, then runs up to 6.2 mph with the rail up." },
  acezoe: { name: "Acezoe P20-2", why: "An all-in-one with a height-adjustable desk built in — no separate standing desk needed." },
};

type Ans = { run?: "walk" | "run"; desk?: "yes" | "no"; priority?: "price" | "quiet" | "incline" };

function decide(a: Ans): keyof typeof PICKS | null {
  if (!a.run) return null;
  if (a.run === "run") return "urevo";
  if (!a.desk) return null;
  if (a.desk === "no") return "acezoe";
  if (!a.priority) return null;
  if (a.priority === "price") return "buztrio";
  if (a.priority === "incline") return "superun";
  return "sunny"; // quiet / most-proven default
}

const Btn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-bold rounded-xl border transition-all ${
      active ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white"
    }`}
  >
    {children}
  </button>
);

export function WalkingPadFinder() {
  const [a, setA] = useState<Ans>({});
  const key = decide(a);
  const pick = key ? PICKS[key] : null;
  const showDesk = a.run === "walk";
  const showPriority = a.run === "walk" && a.desk === "yes";

  return (
    <div className="not-prose my-8 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Footprints className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-bold text-white m-0">Answer 1–3 quick questions</h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-slate-300 mb-3">1. Do you want to walk while you work, or also run?</p>
          <div className="flex flex-wrap gap-2">
            <Btn active={a.run === "walk"} onClick={() => setA({ run: "walk" })}>Just walk at my desk</Btn>
            <Btn active={a.run === "run"} onClick={() => setA({ run: "run" })}>Walk and sometimes run</Btn>
          </div>
        </div>

        {showDesk && (
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3">2. Do you already have a standing desk to put it under?</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={a.desk === "yes"} onClick={() => setA({ ...a, desk: "yes", priority: undefined })}>Yes, I have one</Btn>
              <Btn active={a.desk === "no"} onClick={() => setA({ ...a, desk: "no" })}>No, I need a desk too</Btn>
            </div>
          </div>
        )}

        {showPriority && (
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3">3. What matters most to you?</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={a.priority === "quiet"} onClick={() => setA({ ...a, priority: "quiet" })}>Quiet &amp; most-proven</Btn>
              <Btn active={a.priority === "price"} onClick={() => setA({ ...a, priority: "price" })}>Lowest price</Btn>
              <Btn active={a.priority === "incline"} onClick={() => setA({ ...a, priority: "incline" })}>Incline for more burn</Btn>
            </div>
          </div>
        )}
      </div>

      {pick && (
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Your match</p>
          <p className="text-2xl font-black text-white mb-2">{pick.name}</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{pick.why}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/reviews/under-desk-treadmills/" className="px-5 py-2.5 rounded-xl bg-[#FFD814] text-[#0F1111] text-sm font-black hover:bg-[#F7CA00] transition-colors">
              See it in our treadmill reviews →
            </Link>
            <Link href="/guides/best-under-desk-treadmills/" className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-bold hover:text-white hover:border-slate-600 transition-colors">
              Full buying guide
            </Link>
          </div>
          <button onClick={() => setA({})} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">
            <RotateCcw className="w-3 h-3" /> Start over
          </button>
        </div>
      )}

      <p className="text-[11px] text-slate-600 leading-relaxed mt-6">
        Recommendations come from our hands-reviewed picks and are matched to your answers — not paid
        placement. Prices and stock change, so the buttons take you to the live review for current details.
      </p>
    </div>
  );
}
