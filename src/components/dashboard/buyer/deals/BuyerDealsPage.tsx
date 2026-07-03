"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { buyerDeals } from "@/components/dashboard/buyer/deals/buyer-deals.mock";
import type { BuyerDeal, BuyerDealStatusFilter } from "@/components/dashboard/buyer/deals/buyer-deals.types";
import { BuyerDealsFilters } from "@/components/dashboard/buyer/deals/BuyerDealsFilters";
import { BuyerDealsHeader } from "@/components/dashboard/buyer/deals/BuyerDealsHeader";
import { BuyerDealsPagination } from "@/components/dashboard/buyer/deals/BuyerDealsPagination";
import { BuyerDealsProtectionCard } from "@/components/dashboard/buyer/deals/BuyerDealsProtectionCard";
import { BuyerDealsStats } from "@/components/dashboard/buyer/deals/BuyerDealsStats";
import { BuyerDealsTable } from "@/components/dashboard/buyer/deals/BuyerDealsTable";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const defaultItemsPerPage = 10;

export function BuyerDealsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<BuyerDealStatusFilter>("all");
  const [statusFilter, setStatusFilter] = useState<BuyerDealStatusFilter>("all");
  const [farmerFilter, setFarmerFilter] = useState("All Farmers");
  const [searchQuery, setSearchQuery] = useState("");
  const [topbarSearchQuery, setTopbarSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const filteredDeals = useMemo(() => {
    const localSearch = searchQuery.trim().toLowerCase();
    const topbarSearch = topbarSearchQuery.trim().toLowerCase();

    return buyerDeals.filter((deal) => {
      const matchesTab = selectedTab === "all" || deal.status === selectedTab;
      const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
      const matchesFarmer = farmerFilter === "All Farmers" || deal.farmerName === farmerFilter;
      const searchableText = `${deal.id} ${deal.productName} ${deal.farmerName} ${deal.status}`.toLowerCase();
      const matchesLocalSearch = !localSearch || searchableText.includes(localSearch);
      const matchesTopbarSearch = !topbarSearch || searchableText.includes(topbarSearch);

      return matchesTab && matchesStatus && matchesFarmer && matchesLocalSearch && matchesTopbarSearch;
    });
  }, [farmerFilter, searchQuery, selectedTab, statusFilter, topbarSearchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredDeals.length / itemsPerPage));
  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDeals.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredDeals, itemsPerPage]);

  function resetPage() {
    setCurrentPage(1);
  }

  function handleReset() {
    setSelectedTab("all");
    setStatusFilter("all");
    setFarmerFilter("All Farmers");
    setSearchQuery("");
    setTopbarSearchQuery("");
    resetPage();
  }

  function handleItemsPerPageChange(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    resetPage();
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  function handleViewDetails(deal: BuyerDeal) {
    router.push(`/buyer/deals/${deal.id}`);
  }

  // TODO: Connect buyer deals data, filters, and detail actions to API when endpoints are ready.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      onSearchChange={(value) => {
        setTopbarSearchQuery(value);
        resetPage();
      }}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search by product, farmer, or deal ID..."
      searchValue={topbarSearchQuery}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <BuyerDealsHeader onHelpClick={() => showToast("Buyer help will be connected later.")} />
        <BuyerDealsStats />
        <BuyerDealsFilters
          farmerFilter={farmerFilter}
          onDateClick={() => showToast("Date filter will be connected later.")}
          onFarmerFilterChange={(value) => {
            setFarmerFilter(value);
            resetPage();
          }}
          onReset={handleReset}
          onSearchChange={(value) => {
            setSearchQuery(value);
            resetPage();
          }}
          onStatusFilterChange={(value) => {
            setStatusFilter(value);
            resetPage();
          }}
          onStatusTabChange={(value) => {
            setSelectedTab(value);
            resetPage();
          }}
          searchQuery={searchQuery}
          selectedTab={selectedTab}
          statusFilter={statusFilter}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <BuyerDealsTable deals={paginatedDeals} onViewDetails={handleViewDetails} />
          <BuyerDealsPagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onPageChange={handlePageChange}
            totalItems={filteredDeals.length}
            totalPages={totalPages}
          />
        </div>

        <BuyerDealsProtectionCard onLearnMore={() => showToast("Purchase protection details will be connected later.")} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
