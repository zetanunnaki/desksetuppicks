import { ExternalLink } from "lucide-react";
import { amazonLink } from "@/lib/affiliate";

interface AffiliateButtonProps {
  asin: string;
  amazonUrl?: string;
  label?: string;
  variant?: "primary" | "table";
}

export function AffiliateButton({
  asin,
  amazonUrl,
  label = "Check Retailer Price",
  variant = "primary",
}: AffiliateButtonProps) {
  const href = amazonLink(asin, amazonUrl);

  if (variant === "table") {
    return (
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="px-6 py-3 bg-white text-slate-950 text-xs font-black rounded-xl hover:bg-indigo-400 hover:text-white transition-all duration-300"
      >
        Check Amazon
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="w-full xl:w-auto px-10 py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center space-x-3 hover:bg-indigo-500 transition-all duration-300 shadow-2xl shadow-indigo-600/20 hover:scale-105 active:scale-95"
    >
      <span>{label}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}
