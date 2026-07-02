"use client";

import { useCallback, useEffect, useState } from "react";

import { ListingCard } from "@/components/shared/ListingCard";
import { getPublicListings } from "@/lib/farmer-listings-api";
import type { Listing } from "@/types";

export function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const nextListings = await getPublicListings();
      setListings(nextListings);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load marketplace listings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 lg:px-8" dir="ltr">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">AgriBridge</p>
          <h1 className="mt-4 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">Marketplace</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Browse trusted agricultural products and offers.
          </p>
        </div>

        {isLoading ? (
          <MarketplaceSkeleton />
        ) : errorMessage ? (
          <MarketplaceError message={errorMessage} onRetry={loadListings} />
        ) : listings.length === 0 ? (
          <MarketplaceEmpty />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function MarketplaceSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="h-[430px] animate-pulse rounded-lg border border-slate-200 bg-white shadow-sm" key={index}>
          <div className="aspect-[4/3] bg-slate-100" />
          <div className="grid gap-3 p-5">
            <div className="h-5 w-1/2 rounded bg-slate-100" />
            <div className="h-7 w-3/4 rounded bg-slate-100" />
            <div className="h-16 rounded bg-slate-100" />
            <div className="h-11 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketplaceError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
      <p className="text-base font-black text-slate-950">Unable to load marketplace</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{message}</p>
      <button
        className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </section>
  );
}

function MarketplaceEmpty() {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
      <p className="text-base font-black text-slate-950">No listings found</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">Marketplace listings will appear here when farmers publish products.</p>
    </section>
  );
}
