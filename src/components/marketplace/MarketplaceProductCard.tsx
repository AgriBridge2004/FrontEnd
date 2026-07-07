"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheck, ChevronRight, MapPin, Package } from "lucide-react";
import { useState } from "react";

import type { MarketplaceProduct, MarketplaceViewMode } from "@/components/marketplace/marketplace.types";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";

type MarketplaceProductCardProps = {
  product: MarketplaceProduct;
  viewMode: MarketplaceViewMode;
};

const defaultProductImage = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

export function MarketplaceProductCard({ product, viewMode }: MarketplaceProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.image || defaultProductImage);
  const isList = viewMode === "list";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/35 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md",
        isList ? "grid sm:grid-cols-[230px_1fr]" : "flex h-full flex-col",
      )}
    >
      <div className={cn("relative overflow-hidden bg-slate-100", isList ? "min-h-52 sm:min-h-full" : "h-[185px]")}>
        <Image
          alt={product.title}
          className="object-cover"
          fill
          onError={() => setImageSrc(defaultProductImage)}
          sizes={isList ? "(min-width: 1024px) 230px, 100vw" : "(min-width: 1280px) 275px, (min-width: 768px) 45vw, 100vw"}
          src={imageSrc}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="text-lg font-black tracking-normal text-slate-900">{product.title}</h3>
          {product.verifiedFarmer ? (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-black text-emerald-800">
              <BadgeCheck className="size-3.5" />
              <span>Verified Farmer</span>
            </div>
          ) : null}
        </div>

        <div className="flex items-end gap-1">
          <span className="text-2xl font-black text-emerald-800">{formatCurrency(product.price)}</span>
          <span className="pb-0.5 text-xs font-semibold text-slate-400">/ {product.unit}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-emerald-100 pt-3">
          <ProductMetric icon={<Package className="size-3.5" />} label="Quantity" value={`${product.quantity} ${product.unit}`} />
          <ProductMetric icon={<MapPin className="size-3.5" />} label="Location" value={product.location} />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
            {product.grade}
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
            {product.listingType}
          </span>
        </div>

        <Link
          className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          href={`/marketplace/${product.id}`}
        >
          View Details
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function ProductMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-slate-400 shadow-sm">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[10px] font-black uppercase text-slate-400">{label}</span>
        <span className="mt-0.5 block text-xs font-bold leading-4 text-slate-700">{value}</span>
      </span>
    </div>
  );
}
