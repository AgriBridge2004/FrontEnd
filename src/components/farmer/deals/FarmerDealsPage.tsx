"use client";

import { useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { DealsFilters } from "@/components/farmer/deals/DealsFilters";
import { DealsHeader } from "@/components/farmer/deals/DealsHeader";
import { DealsPagination } from "@/components/farmer/deals/DealsPagination";
import { DealsTable } from "@/components/farmer/deals/DealsTable";
import { DealStats } from "@/components/farmer/deals/DealStats";
import type { DealStatusFilter } from "@/components/farmer/deals/deals-types";
import { farmerDeals } from "@/lib/mock-data";

const defaultItemsPerPage = 10;

export function FarmerDealsPage() {
  const [selectedStatus, setSelectedStatus] = useState<DealStatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const filteredDeals = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return farmerDeals.filter((deal) => {
      const matchesStatus = selectedStatus === "All" || deal.status === selectedStatus;
      const matchesSearch =
        deal.id.toLowerCase().includes(normalizedSearch) ||
        deal.product.toLowerCase().includes(normalizedSearch) ||
        deal.buyer.toLowerCase().includes(normalizedSearch) ||
        deal.status.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredDeals.length / itemsPerPage));
  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDeals.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredDeals, itemsPerPage]);

  function handleStatusChange(status: DealStatusFilter) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleItemsPerPageChange(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  // TODO: Connect deals filters, pagination, and detail actions to backend deal APIs.
  return (
    <FarmerDashboardLayout searchPlaceholder="Search by contract ID, product, or buyer name">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <DealsHeader />
        <DealStats />
        <DealsFilters
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
        />
        <DealsTable deals={paginatedDeals} />
        <DealsPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          onPageChange={handlePageChange}
          totalItems={filteredDeals.length}
          totalPages={totalPages}
        />
      </div>
    </FarmerDashboardLayout>
  );
}
