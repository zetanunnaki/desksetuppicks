import { clsx } from "clsx";

const badgeVariants: Record<string, string> = {
  "Editor's Choice": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Budget Pick": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Premium Pick": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function Badge({ label }: { label: string }) {
  const variant =
    badgeVariants[label] || "bg-slate-500/10 text-slate-400 border-slate-500/20";
  return (
    <span
      className={clsx(
        "text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border shadow-lg",
        variant
      )}
    >
      {label}
    </span>
  );
}
