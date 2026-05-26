import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? "text-indigo-400 fill-indigo-400"
              : "text-slate-800"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-white">{rating}</span>
      {reviewCount != null && (
        <span className="ml-1 text-xs text-slate-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
