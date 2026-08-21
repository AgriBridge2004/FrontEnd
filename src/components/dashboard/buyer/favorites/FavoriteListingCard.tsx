"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

import type { BuyerFavoriteListing, FavoriteListingStatus } from "@/components/dashboard/buyer/favorites/buyer-favorites.types";
import { cn } from "@/lib/cn";

type FavoriteListingCardProps = {
  listing: BuyerFavoriteListing;
  onAddToRequest: (listing: BuyerFavoriteListing) => void;
  onRemove: (listingId: string) => void;
  onViewDetails: (listing: BuyerFavoriteListing) => void;
};

const statusLabels: Record<FavoriteListingStatus, string> = {
  available: "Available",
  "expiring-soon": "Expiring Soon",
  "low-stock": "Low Stock",
};

const statusClasses: Record<FavoriteListingStatus, string> = {
  available: "bg-emerald-200 text-emerald-800",
  "expiring-soon": "border border-red-200 bg-red-50 text-red-700",
  "low-stock": "bg-pink-100 text-rose-700",
};

function formatPrice(price: number) {
  return Number.isInteger(price) ? price.toLocaleString() : price.toFixed(2);
}

export function FavoriteListingCard({ listing, onAddToRequest, onRemove, onViewDetails }: FavoriteListingCardProps) {
  return (
    <article className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-emerald-50">
        <Image
          alt={listing.name}
          className="object-cover transition duration-300 hover:scale-[1.03]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={listing.image ?? "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg"}
        />
        <span className={cn("absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide", statusClasses[listing.status])}>
          {statusLabels[listing.status]}
        </span>
        <button
          aria-label={`Remove ${listing.name} from favorites`}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-red-600 shadow-sm transition hover:bg-red-50"
          onClick={() => onRemove(listing.id)}
          type="button"
        >
          <Heart className="size-[18px] fill-current" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-h-[50px] text-lg font-black leading-6 text-slate-950">{listing.name}</h2>
          <div className="shrink-0 text-right">
            <p className="whitespace-nowrap text-lg font-black text-emerald-900">
              {listing.currency}
              {formatPrice(listing.price)}
              <span className="ml-1 text-xs font-medium text-slate-600">/</span>
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">{listing.unit}</p>
          </div>
        </div>

        <p className="mt-2.5 flex min-h-[36px] items-start gap-1.5 text-[13px] font-medium leading-5 text-slate-600">
          <Star className="mt-0.5 size-3 shrink-0 fill-rose-800 text-rose-800" />
          <span>
            {listing.supplier} • {listing.rating.toFixed(1)} ({listing.reviews} reviews)
          </span>
        </p>

        <div className="mt-4 grid gap-2">
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-black text-white transition hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            onClick={() => onAddToRequest(listing)}
            type="button"
          >
            <ShoppingCart className="size-4" />
            Add to Request
          </button>
          <button
            className="inline-flex h-11 items-center justify-center rounded-lg border border-emerald-800 bg-white px-4 text-sm font-black text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            onClick={() => onViewDetails(listing)}
            type="button"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
