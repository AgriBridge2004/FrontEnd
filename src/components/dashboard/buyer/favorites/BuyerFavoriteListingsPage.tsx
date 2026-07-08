"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";

import { BuyerApiNotice } from "@/components/dashboard/buyer/BuyerApiNotice";
import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import type { BuyerFavoriteListing, FavoriteSortOption } from "@/components/dashboard/buyer/favorites/buyer-favorites.types";
import { FavoriteListingsGrid } from "@/components/dashboard/buyer/favorites/FavoriteListingsGrid";
import { FavoriteListingsHeader } from "@/components/dashboard/buyer/favorites/FavoriteListingsHeader";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { EmptyState } from "@/components/dashboard/shared/EmptyState";
import { getStoredUser } from "@/lib/auth-storage";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const visibleStep = 6;
const availabilityRank = {
  available: 0,
  "low-stock": 1,
  "expiring-soon": 2,
};

export function BuyerFavoriteListingsPage() {
  const [favoriteListings, setFavoriteListings] = useState<BuyerFavoriteListing[]>([]);
  const [category, setCategory] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState<FavoriteSortOption>("recent");
  const [visibleCount, setVisibleCount] = useState(visibleStep);
  const [toast, setToast] = useState<string | null>(null);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const filteredListings = useMemo(() => {
    const search = searchValue.trim().toLowerCase();
    const filtered = favoriteListings.filter((listing) => {
      const matchesCategory = category === "All Categories" || listing.category === category;
      const matchesSearch = !search || listing.name.toLowerCase().includes(search) || listing.supplier.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      }

      if (sort === "price-desc") {
        return b.price - a.price;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      if (sort === "availability") {
        return availabilityRank[a.status] - availabilityRank[b.status];
      }

      return favoriteListings.findIndex((listing) => listing.id === a.id) - favoriteListings.findIndex((listing) => listing.id === b.id);
    });
  }, [category, favoriteListings, searchValue, sort]);

  const visibleListings = filteredListings.slice(0, visibleCount);
  const showingCount = Math.min(visibleCount, filteredListings.length);

  function handleRemove(listingId: string) {
    setFavoriteListings((current) => current.filter((listing) => listing.id !== listingId));
    setVisibleCount((current) => Math.max(visibleStep, Math.min(current, favoriteListings.length - 1)));
    showToast("Listing removed from favorites.");
  }

  function handleCategoryChange(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(visibleStep);
  }

  function handleSortChange(nextSort: FavoriteSortOption) {
    setSort(nextSort);
    setVisibleCount(visibleStep);
  }

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={(value) => {
        setSearchValue(value);
        setVisibleCount(visibleStep);
      }}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search within favorites..."
      searchValue={searchValue}
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-9 sm:px-5 lg:px-8">
        <BuyerApiNotice description="Favorite listings endpoints are not available in Swagger yet." />
        <FavoriteListingsHeader
          category={category}
          count={favoriteListings.length}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          sort={sort}
        />

        <div className="mt-7">
          {favoriteListings.length === 0 ? (
            <div className="rounded-2xl bg-white">
              <EmptyState
                description="Save marketplace listings to build your procurement shortlist."
                icon={Heart}
                title="No favorite listings yet"
              />
              <div className="flex justify-center pb-6">
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
                  href="/marketplace"
                >
                  Browse Marketplace
                </Link>
              </div>
            </div>
          ) : visibleListings.length > 0 ? (
            <>
              <FavoriteListingsGrid
                listings={visibleListings}
                onAddToRequest={() => showToast("Listing added to request draft.")}
                onRemove={handleRemove}
                onViewDetails={() => showToast("Listing details will be connected later.")}
              />

              <div className="mt-8 flex flex-col items-center gap-4">
                {showingCount < filteredListings.length ? (
                  <button
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-emerald-100 bg-white px-8 text-sm font-black text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800"
                    onClick={() => setVisibleCount(filteredListings.length)}
                    type="button"
                  >
                    Load More Listings
                  </button>
                ) : null}
                <p className="text-sm font-medium text-slate-600">
                  Showing {showingCount} of {filteredListings.length} saved items
                </p>
              </div>
            </>
          ) : (
            <EmptyState
              description="Try another search term or category to find saved listings."
              icon={Heart}
              title="No matching favorite listings"
            />
          )}
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
