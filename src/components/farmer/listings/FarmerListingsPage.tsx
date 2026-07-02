"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { ListingStats } from "@/components/farmer/listings/ListingStats";
import { ListingsFilters } from "@/components/farmer/listings/ListingsFilters";
import { ListingsGrid } from "@/components/farmer/listings/ListingsGrid";
import { ListingsHeader } from "@/components/farmer/listings/ListingsHeader";
import { ListingsPagination } from "@/components/farmer/listings/ListingsPagination";
import { ListingsTable } from "@/components/farmer/listings/ListingsTable";
import type { FarmerListing, FarmerListingStatus, ListingStatusFilter, ListingsViewMode } from "@/components/farmer/listings/listings-types";
import { getFarmerListings } from "@/lib/farmer-listings-api";
import type { FarmerListing as ApiFarmerListing } from "@/types/listing";

const defaultItemsPerPage = 6;
const fallbackListingImage = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

function mapApiStatusToUiStatus(status: ApiFarmerListing["status"]): FarmerListingStatus {
  if (status === "expired") {
    return "Expired";
  }

  if (status === "draft" || status === "pending" || status === "inactive") {
    return "Draft";
  }

  return "Active";
}

function mapApiListingToUiListing(listing: ApiFarmerListing): FarmerListing {
  return {
    id: listing.id,
    name: listing.productName || listing.title || "Untitled listing",
    status: mapApiStatusToUiStatus(listing.status),
    price: listing.price !== undefined ? listing.price.toLocaleString() : "0",
    currency: listing.currency ?? "USD",
    unit: listing.unit ?? "kg",
    quantity: listing.quantity !== undefined ? `${listing.quantity.toLocaleString()} ${listing.unit ?? "kg"}` : "Not specified",
    views: listing.views ?? 0,
    rfqsReceived: listing.rfqsReceived ?? 0,
    image: listing.images[0] || fallbackListingImage,
  };
}

export function FarmerListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ListingStatusFilter>("All");
  const [viewMode, setViewMode] = useState<ListingsViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [listings, setListings] = useState<FarmerListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiListings = await getFarmerListings();
      setListings(apiListings.map(mapApiListingToUiListing));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  const filteredListings = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesSearch = listing.name.toLowerCase().includes(normalizedSearch);
      const matchesStatus = selectedStatus === "All" || listing.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchQuery, selectedStatus]);

  const listingStats = useMemo(() => {
    const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);

    return [
      { label: "Total Listings", value: String(listings.length), icon: "total" },
      { label: "Active Listings", value: String(listings.filter((listing) => listing.status === "Active").length), icon: "active" },
      { label: "Expired Listings", value: String(listings.filter((listing) => listing.status === "Expired").length), icon: "expiring" },
      { label: "Total Views", value: totalViews.toLocaleString(), icon: "views" },
    ];
  }, [listings]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / itemsPerPage));
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredListings, itemsPerPage]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleStatusChange(status: ListingStatusFilter) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  function handleItemsPerPageChange(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <ListingsHeader />
        <ListingsFilters
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
          viewMode={viewMode}
        />
        <ListingStats stats={listingStats} />

        <div className="mt-7">
          {isLoading ? (
            <ListingsSkeleton viewMode={viewMode} />
          ) : errorMessage ? (
            <ListingsError message={errorMessage} onRetry={loadListings} />
          ) : viewMode === "grid" ? (
            <ListingsGrid
              emptyDescription={listings.length === 0 ? "Create your first listing to start receiving RFQs." : "No listings match your filters."}
              emptyTitle={listings.length === 0 ? "No listings found" : "No listings match your filters."}
              listings={paginatedListings}
            />
          ) : (
            <ListingsTable
              emptyDescription={listings.length === 0 ? "Create your first listing to start receiving RFQs." : "No listings match your filters."}
              emptyTitle={listings.length === 0 ? "No listings found" : "No listings match your filters."}
              listings={paginatedListings}
            />
          )}
        </div>

        {!isLoading && !errorMessage ? (
          <ListingsPagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onPageChange={handlePageChange}
            totalItems={filteredListings.length}
            totalPages={totalPages}
          />
        ) : null}
      </div>
    </FarmerDashboardLayout>
  );
}

type ListingsSkeletonProps = {
  viewMode: ListingsViewMode;
};

function ListingsSkeleton({ viewMode }: ListingsSkeletonProps) {
  if (viewMode === "table") {
    return (
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <div className="grid gap-3 p-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="h-80 animate-pulse rounded-2xl border border-emerald-100 bg-white shadow-sm" key={index}>
          <div className="h-40 rounded-t-2xl bg-slate-100" />
          <div className="grid gap-3 p-4">
            <div className="h-5 w-2/3 rounded bg-slate-100" />
            <div className="h-7 w-1/3 rounded bg-slate-100" />
            <div className="h-12 rounded bg-slate-100" />
            <div className="h-9 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

type ListingsErrorProps = {
  message: string;
  onRetry: () => void;
};

function ListingsError({ message, onRetry }: ListingsErrorProps) {
  return (
    <section className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
      <p className="text-base font-black text-slate-950">Unable to load listings</p>
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
