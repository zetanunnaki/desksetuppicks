import { Check, X } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div className="bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-500/20">
        <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Pros</span>
        </h4>
        <ul className="space-y-3">
          {pros.map((pro) => (
            <li
              key={pro}
              className="text-slate-300 text-sm flex items-start space-x-2"
            >
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-500/5 p-8 rounded-[2rem] border border-rose-500/20">
        <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
          <X className="w-4 h-4" />
          <span>Cons</span>
        </h4>
        <ul className="space-y-3">
          {cons.map((con) => (
            <li
              key={con}
              className="text-slate-300 text-sm flex items-start space-x-2"
            >
              <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
