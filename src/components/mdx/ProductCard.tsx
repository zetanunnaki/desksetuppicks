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

  return (
    <div className="not-prose glass-card p-8 my-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-48 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>
          <StarRating rating={product.rating} />
          <p className="text-slate-400 mt-3 text-sm">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xl font-black text-white">
              {product.priceRange}
            </span>
            <AffiliateButton asin={product.asin} variant="table" />
          </div>
        </div>
      </div>
    </div>
  );
}
