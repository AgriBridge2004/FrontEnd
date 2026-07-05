import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { SimilarMarketplaceProduct } from "@/components/marketplace/product-details/marketplace-product-details.types";
import { SimilarProductCard } from "@/components/marketplace/product-details/SimilarProductCard";

type SimilarProductsSectionProps = {
  products: SimilarMarketplaceProduct[];
};

export function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-normal text-slate-950">Similar Products</h2>
        <Link className="inline-flex items-center gap-2 text-sm font-black text-emerald-800 transition hover:text-emerald-950" href="/marketplace">
          View All
          <span className="grid size-8 place-items-center rounded-full bg-emerald-50">
            <ArrowRight className="size-3.5" />
          </span>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <SimilarProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
