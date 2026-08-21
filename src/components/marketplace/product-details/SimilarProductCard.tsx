"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, Star } from "lucide-react";
import { useState } from "react";

import { PRODUCT_IMAGE_FALLBACK } from "@/components/marketplace/product-details/marketplace-product-details.mock";
import type { SimilarMarketplaceProduct } from "@/components/marketplace/product-details/marketplace-product-details.types";
import { cn } from "@/lib/cn";

type SimilarProductCardProps = {
  product: SimilarMarketplaceProduct;
};

export function SimilarProductCard({ product }: SimilarProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image || PRODUCT_IMAGE_FALLBACK);

  return (
    <article className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="relative h-44 overflow-hidden rounded-xl bg-slate-100">
        <Link aria-label={`View ${product.title}`} href={`/marketplace/${product.id}`}>
          <Image
            alt={product.title}
            className="object-cover"
            fill
            onError={() => setImageSrc(PRODUCT_IMAGE_FALLBACK)}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            src={imageSrc}
          />
        </Link>
        <button
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-slate-500 shadow-md transition hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30",
            isFavorite && "text-rose-500",
          )}
          onClick={() => setIsFavorite((value) => !value)}
          type="button"
        >
          <Heart className={cn("size-4", isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="p-1.5 pt-4">
        <Link className="text-lg font-black text-slate-900 transition hover:text-emerald-900" href={`/marketplace/${product.id}`}>
          {product.title}
        </Link>
        <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>{product.farmerName}</span>
          {product.verifiedFarmer ? <BadgeCheck className="size-3.5 text-emerald-800" /> : null}
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold">
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
          <span className="text-amber-600">{product.rating.toFixed(1)}</span>
          <span className="font-semibold text-slate-500">({product.reviewsCount})</span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <p>
            <span className="text-xl font-black text-emerald-800">{product.price}</span>
            <span className="ml-1 text-xs font-semibold text-slate-500">
              {product.currency} / {product.unit}
            </span>
          </p>
          <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-600">
            {product.availableQuantity}
          </span>
        </div>
      </div>
    </article>
  );
}
