import { Package } from "lucide-react";
import { getProductBySlug } from "@/lib/data";
import { StarRating } from "@/components/StarRating";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Badge } from "@/components/Badge";

interface ProductCardProps {
  productId: string;
}

export function ProductCard({ productId }: ProductCardProps) {
  const product = getProductBySlug(productId);
  if (!product) return null;

  const displayPrice = product.amazonPrice || product.priceRange;

  return (
    <div className="not-prose glass-card glass-card-hover p-6 sm:p-7 my-10">
      <div className="flex flex-col sm:flex-row gap-6 items-stretch">
        {/* Product image */}
        <div className="relative w-full sm:w-44 flex-shrink-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden min-h-[160px]">
          {product.amazonImageUrl ? (
            <img
              src={product.amazonImageUrl}
              alt={product.name}
              loading="lazy"
              className="max-h-[150px] object-contain p-4"
            />
          ) : (
            <Package className="w-12 h-12 text-slate-700" />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <h3 className="text-lg sm:text-xl font-black text-white">
              {product.name}
            </h3>
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>

          <StarRating rating={product.amazonRating || product.rating} />

          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between gap-4 mt-auto pt-5">
            <span className="text-2xl font-black text-white">
              {displayPrice}
            </span>
            <AffiliateButton asin={product.asin} variant="table" />
          </div>
        </div>
      </div>
    </div>
  );
}
