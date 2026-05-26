import { Star, StarHalf } from "lucide-react";

export function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              className="w-3 h-3 text-indigo-400 fill-indigo-400"
            />
          );
        }
        if (i === full && hasHalf) {
          return (
            <span key={i} className="relative w-3 h-3">
              <Star className="absolute inset-0 w-3 h-3 text-slate-800" />
              <span className="absolute inset-0 overflow-hidden w-[50%]">
                <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
              </span>
            </span>
          );
        }
        return (
          <Star key={i} className="w-3 h-3 text-slate-800" />
        );
      })}
      <span className="ml-2 text-sm font-bold text-white">{rating}</span>
      {reviewCount != null && (
        <span className="ml-1 text-xs text-slate-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
