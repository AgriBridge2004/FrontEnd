"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar";
import { MarketplaceProductGrid } from "@/components/marketplace/MarketplaceProductGrid";
import { MarketplaceProductsHeader } from "@/components/marketplace/MarketplaceProductsHeader";
import type { MarketplaceCategory, MarketplaceFiltersState, MarketplaceProduct, MarketplaceSortOption, MarketplaceViewMode } from "@/components/marketplace/marketplace.types";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { getPublicListings } from "@/lib/farmer-listings-api";
import type { Listing } from "@/types";

const itemsPerPage = 12;

const initialFilters: MarketplaceFiltersState = {
  categories: [],
  priceMax: 10,
  quantityMax: 100000,
  location: "All locations",
  listingType: "Spot",
  availableFrom: "",
  availableTo: "",
};

export function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFiltersState>(initialFilters);
  const [sort, setSort] = useState<MarketplaceSortOption>("Newest");
  const [viewMode, setViewMode] = useState<MarketplaceViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiListings = await getPublicListings({
        category: filters.categories[0],
        location: filters.location,
        price_max: filters.priceMax,
        qty_max: filters.quantityMax,
      });
      setListings(apiListings);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load marketplace listings.");
    } finally {
      setIsLoading(false);
    }
  }, [filters.categories, filters.location, filters.priceMax, filters.quantityMax]);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  function handleFiltersChange(nextFilters: MarketplaceFiltersState) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  const products = useMemo(() => {
    const mappedProducts = listings.map(mapListingToMarketplaceProduct);
    const filteredProducts = mappedProducts.filter((product) => {
      const matchesListingType = product.listingType === filters.listingType;
      const matchesAvailability = isAvailableDuringRange(product.availableFrom, product.availableTo, filters.availableFrom, filters.availableTo);

      return matchesListingType && matchesAvailability;
    });

    return [...filteredProducts].sort((a, b) => {
      if (sort === "Price: Low to High") {
        return (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY);
      }

      if (sort === "Price: High to Low") {
        return (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY);
      }

      if (sort === "Quantity") {
        return b.quantityValue - a.quantityValue;
      }

      if (sort === "Rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [filters.availableFrom, filters.availableTo, filters.listingType, listings, sort]);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, products]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" dir="ltr">
      <MarketplaceNavbar />
      <MarketplaceHero />

      <main className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <MarketplaceFilters filters={filters} onFiltersChange={handleFiltersChange} />

        <section className="min-w-0">
          <MarketplaceProductsHeader
            productCount={products.length}
            sort={sort}
            viewMode={viewMode}
            onSortChange={(nextSort) => {
              setSort(nextSort);
              setCurrentPage(1);
            }}
            onViewModeChange={setViewMode}
          />

          <div className="mt-6">
            {isLoading ? (
              <MarketplaceSkeleton />
            ) : errorMessage ? (
              <MarketplaceError message={errorMessage} onRetry={loadListings} />
            ) : products.length > 0 ? (
              <MarketplaceProductGrid products={paginatedProducts} viewMode={viewMode} />
            ) : (
              <EmptyState
                description="Try adjusting your filters or check back when farmers publish new listings."
                title="No listings found"
              />
            )}
          </div>

          {!isLoading && !errorMessage ? (
            <Pagination className="mt-10 pb-2" currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          ) : null}
        </section>
      </main>
    </div>
  );
}

function mapListingToMarketplaceProduct(listing: Listing): MarketplaceProduct {
  return {
    id: listing.id,
    title: listing.title,
    image: listing.imageUrl,
    price: listing.pricePerUnit,
    unit: listing.unit,
    quantity: listing.quantity !== undefined ? String(listing.quantity) : "Quantity not provided",
    quantityValue: listing.quantity ?? 0,
    location: listing.location,
    grade: listing.qualityGrade ?? "Ungraded",
    listingType: "Spot" as const,
    verifiedFarmer: Boolean(listing.farmerId),
    category: mapListingCategory(listing.category ?? listing.crop),
    rating: 0,
    availableFrom: listing.availableFrom,
    availableTo: listing.harvestDate,
  };
}

function mapListingCategory(value: string): MarketplaceCategory {
  const normalized = value.toLowerCase();

  if (normalized.includes("fruit")) return "Fruits";
  if (normalized.includes("nut")) return "Nuts";
  if (normalized.includes("herb")) return "Herbs";
  if (normalized.includes("grain") || normalized.includes("wheat")) return "Grains";
  if (normalized.includes("meat")) return "Meat";
  if (normalized.includes("dairy") || normalized.includes("milk")) return "Dairy";
  if (normalized.includes("egg")) return "Eggs";
  if (normalized.includes("honey")) return "Honey";

  return "Vegetables";
}

function MarketplaceSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="h-80 animate-pulse rounded-2xl border border-emerald-100 bg-emerald-50/35" key={index}>
          <div className="h-[185px] bg-slate-100" />
          <div className="grid gap-3 p-4">
            <div className="h-5 w-2/3 rounded bg-slate-100" />
            <div className="h-8 w-1/3 rounded bg-slate-100" />
            <div className="h-12 rounded bg-slate-100" />
            <div className="h-10 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketplaceError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
      <p className="text-base font-black text-slate-950">Unable to load marketplace listings</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{message}</p>
      <button className="mt-5 h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white" onClick={onRetry} type="button">
        Retry
      </button>
    </section>
  );
}

function isAvailableDuringRange(productFrom: string, productTo: string, filterFrom: string, filterTo: string) {
  if (!filterFrom && !filterTo) {
    return true;
  }

  const productStart = new Date(productFrom).getTime();
  const productEnd = new Date(productTo).getTime();
  const rangeStart = filterFrom ? new Date(filterFrom).getTime() : Number.NEGATIVE_INFINITY;
  const rangeEnd = filterTo ? new Date(filterTo).getTime() : Number.POSITIVE_INFINITY;

  return productStart <= rangeEnd && productEnd >= rangeStart;
}
