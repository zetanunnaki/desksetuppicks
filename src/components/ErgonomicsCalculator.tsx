"use client";

import { useState } from "react";
import Link from "next/link";
import { Ruler, Armchair, Monitor, MoveVertical, ArrowUpDown } from "lucide-react";

// Ergonomic starting points from standard anthropometric ratios (seat ≈ popliteal
// height, desk ≈ elbow height, standing desk ≈ standing elbow height, monitor top
// ≈ seated eye level). These are calibrated starting points to fine-tune by feel —
// the real test is elbows ~90°, feet flat, eyes level with the top of the screen.
const RATIOS = { seat: 0.25, seatedDesk: 0.4, standingDesk: 0.62, eye: 0.66 };

const cmToIn = (cm: number) => cm / 2.54;
const fmt = (cm: number) => {
  const inches = cmToIn(cm);
  return { cm: Math.round(cm), in: Math.round(inches * 10) / 10 };
};

type Unit = "cm" | "ft";

export function ErgonomicsCalculator() {
  const [unit, setUnit] = useState<Unit>("ft");
  const [cm, setCm] = useState("173");
  const [feet, setFeet] = useState("5");
  const [inch, setInch] = useState("8");

  const heightCm =
    unit === "cm"
      ? parseFloat(cm) || 0
      : ((parseFloat(feet) || 0) * 12 + (parseFloat(inch) || 0)) * 2.54;

  const valid = heightCm >= 120 && heightCm <= 220;

  const results = valid
    ? [
        { icon: Armchair, label: "Chair seat height", value: fmt(heightCm * RATIOS.seat), hint: "Feet flat on the floor, knees ~90°.", href: "/reviews/ergonomic-chairs", cta: "Ergonomic chairs" },
        { icon: MoveVertical, label: "Seated desk / keyboard height", value: fmt(heightCm * RATIOS.seatedDesk), hint: "Elbows bent ~90–100°, shoulders relaxed.", href: "/reviews/standing-desks", cta: "Height-adjustable desks" },
        { icon: ArrowUpDown, label: "Standing desk height", value: fmt(heightCm * RATIOS.standingDesk), hint: "Same relaxed-elbow rule, standing tall.", href: "/reviews/standing-desks", cta: "Standing desks" },
        { icon: Monitor, label: "Monitor top edge (from floor)", value: fmt(heightCm * RATIOS.eye), hint: "Top of screen at eye level, ~20–28″ away, tilted back 10–20°.", href: "/reviews/monitor-arms", cta: "Monitor arms" },
      ]
    : [];

  return (
    <div className="not-prose my-8 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Ruler className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-white m-0">Your measurements</h2>
      </div>

      {/* Unit toggle */}
      <div className="inline-flex rounded-xl border border-slate-700/60 p-1 mb-5">
        {(["ft", "cm"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${
              unit === u ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {u === "ft" ? "Feet / inches" : "Centimeters"}
          </button>
        ))}
      </div>

      {/* Height input */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">
          Your height
        </label>
        {unit === "cm" ? (
          <div className="flex items-center gap-2 max-w-[220px]">
            <input
              type="number"
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
            />
            <span className="text-slate-400 font-medium">cm</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="w-20 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
              />
              <span className="text-slate-400 font-medium">ft</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inch}
                onChange={(e) => setInch(e.target.value)}
                className="w-20 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
              />
              <span className="text-slate-400 font-medium">in</span>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {valid ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {results.map((r) => (
            <div key={r.label} className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <r.icon className="w-4 h-4 text-indigo-400 flex-none" />
                <span className="text-sm font-semibold text-slate-300">{r.label}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black text-white">{r.value.in}″</span>
                <span className="text-sm text-slate-500">/ {r.value.cm} cm</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{r.hint}</p>
              <Link href={r.href} className="text-xs font-bold text-indigo-400 hover:text-indigo-300">
                {r.cta} →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a height between about 4′0″ and 7′2″ (120–220 cm) to see your setup.</p>
      )}

      <p className="text-[11px] text-slate-600 leading-relaxed mt-6">
        These are calibrated starting points from standard ergonomic ratios, not medical advice.
        Fine-tune to comfort: your elbows should sit at about 90–100°, feet flat on the floor, and
        your eyes level with the top of the screen. Adjust your chair first, then the desk, then the monitor.
      </p>
    </div>
  );
}
