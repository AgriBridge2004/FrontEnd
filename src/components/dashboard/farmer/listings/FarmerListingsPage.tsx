"use client";

import { useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { ListingStats } from "@/components/dashboard/farmer/listings/ListingStats";
import { ListingsFilters } from "@/components/dashboard/farmer/listings/ListingsFilters";
import { ListingsGrid } from "@/components/dashboard/farmer/listings/ListingsGrid";
import { ListingsHeader } from "@/components/dashboard/farmer/listings/ListingsHeader";
import { ListingsPagination } from "@/components/dashboard/farmer/listings/ListingsPagination";
import { ListingsTable } from "@/components/dashboard/farmer/listings/ListingsTable";
import type { ListingStatusFilter, ListingsViewMode } from "@/components/dashboard/farmer/listings/listings-types";
import { farmerListingItems } from "@/lib/mock-data";

const defaultItemsPerPage = 6;

export function FarmerListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ListingStatusFilter>("All");
  const [viewMode, setViewMode] = useState<ListingsViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const filteredListings = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return farmerListingItems.filter((listing) => {
      const matchesSearch = listing.name.toLowerCase().includes(normalizedSearch);
      const matchesStatus = selectedStatus === "All" || listing.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

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
        <ListingStats />

        <div className="mt-7">
          {viewMode === "grid" ? <ListingsGrid listings={paginatedListings} /> : <ListingsTable listings={paginatedListings} />}
        </div>

        <ListingsPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          onPageChange={handlePageChange}
          totalItems={filteredListings.length}
          totalPages={totalPages}
        />
      </div>
    </FarmerDashboardLayout>
  );
}
