"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Ruler, Eye } from "lucide-react";

// Standard 16:9 resolutions. PPI = diagonal pixels / screen inches.
const RES: Record<string, { w: number; h: number; label: string }> = {
  fhd: { w: 1920, h: 1080, label: "1080p (Full HD)" },
  qhd: { w: 2560, h: 1440, label: "1440p (QHD)" },
  uhd: { w: 3840, h: 2160, label: "4K (UHD)" },
  fivek: { w: 5120, h: 2880, label: "5K" },
};

const round = (n: number) => Math.round(n * 10) / 10;

export function MonitorCalculator() {
  const [size, setSize] = useState("27");
  const [res, setRes] = useState("uhd");

  const diag = parseFloat(size) || 0;
  const r = RES[res];
  const valid = diag >= 15 && diag <= 60;

  // Pixel density + "retina" distance (where 1px subtends ~1 arcminute → pixels vanish).
  const diagPx = Math.sqrt(r.w ** 2 + r.h ** 2);
  const ppi = diagPx / diag;
  const retina = 3436 / ppi; // inches
  // Comfortable productivity distance from horizontal FOV 35°–50°.
  const width = diag * (16 / Math.sqrt(16 ** 2 + 9 ** 2)); // screen width in inches
  const distFor = (fovDeg: number) => (width / 2) / Math.tan((fovDeg * Math.PI) / 180 / 2);
  const near = distFor(50);
  const far = distFor(35);

  let verdict = "";
  if (valid) {
    if (retina <= near)
      verdict = `Sharp at any normal desk distance — you can sit as close as ${round(near)}″ and never see a pixel. A great, sharp productivity pick.`;
    else if (retina <= far)
      verdict = `Sharp once you sit about ${round(retina)}″ back or more, which is within a normal desk range. Comfortable for most setups.`;
    else
      verdict = `At a normal desk distance you'll be able to see individual pixels (they only disappear past ${round(retina)}″). Consider a higher resolution or a smaller screen for crisp text.`;
  }

  return (
    <div className="not-prose my-8 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:p-8">
      <h2 className="text-lg font-bold text-white mb-6 mt-0">Your monitor</h2>

      <div className="flex flex-wrap gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Screen size</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-24 px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60"
            />
            <span className="text-slate-400 font-medium">inches</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-2">Resolution</label>
          <select
            value={res}
            onChange={(e) => setRes(e.target.value)}
            className="px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500/60 cursor-pointer"
          >
            {Object.entries(RES).map(([k, v]) => (
              <option key={k} value={k} className="bg-slate-900">{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {valid ? (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5">
              <Monitor className="w-5 h-5 text-indigo-400 mb-3" />
              <div className="text-sm font-semibold text-slate-300 mb-1">Pixel density</div>
              <div className="text-3xl font-black text-white">{Math.round(ppi)}<span className="text-base font-medium text-slate-500"> PPI</span></div>
              <p className="text-xs text-slate-500 mt-2">Higher is sharper. ~110+ PPI looks crisp at a desk.</p>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5">
              <Ruler className="w-5 h-5 text-indigo-400 mb-3" />
              <div className="text-sm font-semibold text-slate-300 mb-1">Recommended distance</div>
              <div className="text-3xl font-black text-white">{round(near)}–{round(far)}<span className="text-base font-medium text-slate-500">″</span></div>
              <p className="text-xs text-slate-500 mt-2">Comfortable field of view for productivity.</p>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5">
              <Eye className="w-5 h-5 text-indigo-400 mb-3" />
              <div className="text-sm font-semibold text-slate-300 mb-1">Pixel-sharp from</div>
              <div className="text-3xl font-black text-white">{round(retina)}<span className="text-base font-medium text-slate-500">″</span></div>
              <p className="text-xs text-slate-500 mt-2">Sit at least this far and pixels disappear.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-5">
            <p className="text-sm text-slate-300 leading-relaxed">{verdict}</p>
            <div className="flex gap-4 mt-3">
              <Link href="/reviews/monitors/" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Monitor reviews →</Link>
              <Link href="/reviews/monitor-arms/" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Monitor arms →</Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500">Enter a screen size between 15 and 60 inches.</p>
      )}

      <p className="text-[11px] text-slate-600 leading-relaxed mt-6">
        Distances are guidance from pixel density and a comfortable field of view, not hard rules — sit
        where text is easy to read with the top of the screen at eye level. Ultrawide and curved panels
        follow the same math on their diagonal.
      </p>
    </div>
  );
}
