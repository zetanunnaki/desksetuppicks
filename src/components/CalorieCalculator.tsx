"use client";

import { useState } from "react";
import Link from "next/link";
import { Armchair, MoveVertical, Footprints } from "lucide-react";

// MET values from the Compendium of Physical Activities: sitting office work ~1.3,
// standing light work ~1.5, slow treadmill/walking-pad pace (~1.9 mph) ~2.5.
// Calories/hour ≈ MET × bodyweight(kg). Standing's edge over sitting is genuinely
// small in real studies (~10–15 kcal/hr); walking is where the number moves.
const MET = { sit: 1.3, stand: 1.5, walk: 2.5 };
const round = (n: number) => Math.round(n);

type Unit = "lb" | "kg";

export function CalorieCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [weight, setWeight] = useState("175");
  const [hours, setHours] = useState("8");

  const kg = unit === "kg" ? parseFloat(weight) || 0 : (parseFloat(weight) || 0) * 0.453592;
  const h = Math.min(Math.max(parseFloat(hours) || 0, 0), 16);
  const valid = kg >= 30 && kg <= 250 && h > 0;

  const perHour = (met: number) => met * kg;
  const sitDay = perHour(MET.sit) * h;
  const standExtraDay = (perHour(MET.stand) - perHour(MET.sit)) * h;
  const walkExtraHour = perHour(MET.walk) - perHour(MET.sit); // one desk-hour swapped to walking

  return (
    <div className="not-prose my-8 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-8">
      <h2 className="text-lg font-bold text-white mb-6 mt-0">Your numbers</h2>

      <div className="flex flex-wrap gap-6 mb-8">
        {/* Weight */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Bodyweight</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-24 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
            />
            <div className="inline-flex rounded-xl border border-slate-700/60 p-1">
              {(["lb", "kg"] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                    unit === u ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Hours */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Hours at your desk / day</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-24 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
          />
        </div>
      </div>

      {valid ? (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5">
            <Armchair className="w-5 h-5 text-slate-400 mb-3" />
            <div className="text-sm font-semibold text-slate-300 mb-1">Sitting all day</div>
            <div className="text-3xl font-black text-white">{round(sitDay)}<span className="text-base font-medium text-slate-500"> cal</span></div>
            <p className="text-xs text-slate-500 mt-2">Your baseline for {round(h)} desk hours.</p>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-5">
            <MoveVertical className="w-5 h-5 text-indigo-400 mb-3" />
            <div className="text-sm font-semibold text-slate-300 mb-1">Standing instead</div>
            <div className="text-3xl font-black text-white">+{round(standExtraDay)}<span className="text-base font-medium text-slate-500"> cal/day</span></div>
            <p className="text-xs text-slate-500 mt-2">≈ {round(standExtraDay * 5)} cal/week. Small — standing is about posture more than calories.</p>
            <Link href="/reviews/standing-desks/" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2 inline-block">Standing desks →</Link>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
            <Footprints className="w-5 h-5 text-emerald-400 mb-3" />
            <div className="text-sm font-semibold text-slate-300 mb-1">Add 1 hr on a walking pad</div>
            <div className="text-3xl font-black text-white">+{round(walkExtraHour)}<span className="text-base font-medium text-slate-500"> cal/day</span></div>
            <p className="text-xs text-slate-500 mt-2">≈ {round(walkExtraHour * 5)} cal/week from just one hour. This is where the number moves.</p>
            <Link href="/reviews/under-desk-treadmills/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-2 inline-block">Walking pads →</Link>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter your bodyweight and desk hours to see the numbers.</p>
      )}

      <p className="text-[11px] text-slate-600 leading-relaxed mt-6">
        Estimates based on standard MET values (calories ≈ MET × bodyweight in kg × hours); actual burn
        varies with metabolism, pace, and posture. Not medical or weight-loss advice. The honest takeaway:
        standing burns only slightly more than sitting, while a slow walking pad adds meaningfully more —
        and both beat sitting still all day.
      </p>
    </div>
  );
}
