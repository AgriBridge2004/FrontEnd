"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonClasses } from "@/components/ui/Button";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { Listing } from "@/types";
import { Heart } from "lucide-react";
import useFavorites from "@/lib/useFavorites";
import { useState } from "react";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [popped, setPopped] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 33vw, 100vw" src={listing.imageUrl} />
        <button
          aria-pressed={isFavorite(listing.id)}
          aria-label={isFavorite(listing.id) ? "Remove from favorites" : "Add to favorites"}
          onClick={() => {
            toggleFavorite(listing.id);
            setPopped(true);
            window.setTimeout(() => setPopped(false), 260);
          }}
          className={`absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-200 ${
            popped ? "scale-110" : "scale-100"
          }`}
        >
          {isFavorite(listing.id) ? (
            <span className="text-rose-500 text-lg leading-none">❤</span>
          ) : (
            <Heart className="text-slate-400" />
          )}
        </button>
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <QualityGradeBadge grade={listing.qualityGrade} />
          <StatusBadge label={listing.status} tone={listing.status === "active" ? "emerald" : "slate"} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{listing.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{listing.description}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-slate-500">Quantity</dt>
            <dd className="font-semibold text-slate-900">
              {formatNumber(listing.quantity)} {listing.unit}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Price</dt>
            <dd className="font-semibold text-slate-900">
              {formatCurrency(listing.pricePerUnit)} / {listing.unit}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Location</dt>
            <dd className="font-semibold text-slate-900">{listing.location}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Available</dt>
            <dd className="font-semibold text-slate-900">{formatDate(listing.availableFrom)}</dd>
          </div>
        </dl>
        <Link className={buttonClasses("secondary")} href={`/marketplace/${listing.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
