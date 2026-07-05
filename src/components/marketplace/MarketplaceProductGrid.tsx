import type { MarketplaceProduct, MarketplaceViewMode } from "@/components/marketplace/marketplace.types";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { cn } from "@/lib/cn";

type MarketplaceProductGridProps = {
  products: MarketplaceProduct[];
  viewMode: MarketplaceViewMode;
};

export function MarketplaceProductGrid({ products, viewMode }: MarketplaceProductGridProps) {
  return (
    <div
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          : "grid grid-cols-1 gap-5",
      )}
    >
      {products.map((product) => (
        <MarketplaceProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
