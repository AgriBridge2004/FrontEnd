"use client";

import { useMemo, useState } from "react";

import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar";
import { MarketplaceProductGrid } from "@/components/marketplace/MarketplaceProductGrid";
import { MarketplaceProductsHeader } from "@/components/marketplace/MarketplaceProductsHeader";
import { MARKETPLACE_PRODUCTS } from "@/components/marketplace/marketplace.mock";
import type { MarketplaceFiltersState, MarketplaceSortOption, MarketplaceViewMode } from "@/components/marketplace/marketplace.types";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";

const TOTAL_PRODUCTS_COUNT = 248;
const TOTAL_PAGES = 25;

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

  function handleFiltersChange(nextFilters: MarketplaceFiltersState) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  const products = useMemo(() => {
    const filteredProducts = MARKETPLACE_PRODUCTS.filter((product) => {
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesPrice = product.price <= filters.priceMax;
      const matchesQuantity = product.quantityValue <= filters.quantityMax;
      const matchesLocation = filters.location === "All locations" || product.location === filters.location;
      const matchesListingType = product.listingType === filters.listingType;
      const matchesAvailability = isAvailableDuringRange(product.availableFrom, product.availableTo, filters.availableFrom, filters.availableTo);

      return matchesCategory && matchesPrice && matchesQuantity && matchesLocation && matchesListingType && matchesAvailability;
    });

    return [...filteredProducts].sort((a, b) => {
      if (sort === "Price: Low to High") {
        return a.price - b.price;
      }

      if (sort === "Price: High to Low") {
        return b.price - a.price;
      }

      if (sort === "Quantity") {
        return b.quantityValue - a.quantityValue;
      }

      if (sort === "Rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [filters, sort]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" dir="ltr">
      <MarketplaceNavbar />
      <MarketplaceHero />

      <main className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <MarketplaceFilters filters={filters} onFiltersChange={handleFiltersChange} />

        <section className="min-w-0">
          <MarketplaceProductsHeader
            productCount={TOTAL_PRODUCTS_COUNT}
            sort={sort}
            viewMode={viewMode}
            onSortChange={(nextSort) => {
              setSort(nextSort);
              setCurrentPage(1);
            }}
            onViewModeChange={setViewMode}
          />

          <div className="mt-6">
            {products.length > 0 ? (
              <MarketplaceProductGrid products={products} viewMode={viewMode} />
            ) : (
              <EmptyState
                description="Try adjusting your filters to see more verified products."
                title="No products match these filters"
              />
            )}
          </div>

          <Pagination
            className="mt-10 pb-2"
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </div>
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
