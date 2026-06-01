import Link from "next/link";

// Brand logo: a monitor glyph with a checkmark inside (a "reviewed pick")
// on a gradient tile, plus the wordmark. Shared by the header and footer.
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const tile = size === "lg" ? "w-11 h-11" : "w-10 h-10";
  const word = size === "lg" ? "text-xl" : "text-lg";
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span
        className={`relative grid place-items-center ${tile} rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[22px] h-[22px] text-white"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="12" rx="2.5" />
          <path d="M8.5 10.2l2.4 2.4 4.6-5" />
          <path d="M9 20h6M12 16v4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`${word} font-extrabold tracking-tight text-white`}>
          DeskSetupPicks
        </span>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
          Workspace · Reviewed
        </span>
      </span>
    </Link>
  );
}
