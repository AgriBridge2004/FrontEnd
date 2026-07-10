"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import type { BuyerDeal, BuyerDealStatusFilter } from "@/components/dashboard/buyer/deals/buyer-deals.types";
import { BuyerDealsFilters } from "@/components/dashboard/buyer/deals/BuyerDealsFilters";
import { BuyerDealsHeader } from "@/components/dashboard/buyer/deals/BuyerDealsHeader";
import { BuyerDealsPagination } from "@/components/dashboard/buyer/deals/BuyerDealsPagination";
import { BuyerDealsProtectionCard } from "@/components/dashboard/buyer/deals/BuyerDealsProtectionCard";
import { BuyerDealsStats } from "@/components/dashboard/buyer/deals/BuyerDealsStats";
import { BuyerDealsTable } from "@/components/dashboard/buyer/deals/BuyerDealsTable";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getBuyerDeals, type ApiRecord } from "@/lib/buyer-api";
import { getStoredUser } from "@/lib/auth-storage";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
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
  const [deals, setDeals] = useState<BuyerDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  useEffect(() => {
    void loadDeals();
  }, []);

  async function loadDeals() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const records = await getBuyerDeals();
      setDeals(records.map(mapBuyerDealFromApi));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load deals.");
      setDeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const filteredDeals = useMemo(() => {
    const localSearch = searchQuery.trim().toLowerCase();
    const topbarSearch = topbarSearchQuery.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesTab = selectedTab === "all" || deal.status === selectedTab;
      const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
      const matchesFarmer = farmerFilter === "All Farmers" || deal.farmerName === farmerFilter;
      const searchableText = `${deal.id} ${deal.productName} ${deal.farmerName} ${deal.status}`.toLowerCase();
      const matchesLocalSearch = !localSearch || searchableText.includes(localSearch);
      const matchesTopbarSearch = !topbarSearch || searchableText.includes(topbarSearch);

      return matchesTab && matchesStatus && matchesFarmer && matchesLocalSearch && matchesTopbarSearch;
    });
  }, [deals, farmerFilter, searchQuery, selectedTab, statusFilter, topbarSearchQuery]);

  const dealStats = useMemo(() => {
    return {
      activeDeals: deals.filter((deal) => deal.status === "active").length,
      awaitingConfirmation: deals.filter((deal) => deal.status === "awaiting").length,
      completed: deals.filter((deal) => deal.status === "completed").length,
      totalSpent: deals.reduce((total, deal) => total + deal.amount, 0),
    };
  }, [deals]);

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

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={(value) => {
        setTopbarSearchQuery(value);
        resetPage();
      }}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search by product, farmer, or deal ID..."
      searchValue={topbarSearchQuery}
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <BuyerDealsHeader onHelpClick={() => showToast("Buyer help will be connected later.")} />
        <BuyerDealsStats stats={dealStats} />
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
          {isLoading ? (
            <div className="p-6 text-sm font-black text-slate-600">Loading deals...</div>
          ) : errorMessage ? (
            <div className="p-6 text-center">
              <p className="text-sm font-black text-slate-900">{errorMessage}</p>
              <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={loadDeals} type="button">
                Retry
              </button>
            </div>
          ) : (
            <BuyerDealsTable deals={paginatedDeals} onViewDetails={handleViewDetails} />
          )}
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

function mapBuyerDealFromApi(record: ApiRecord): BuyerDeal {
  const listing = asRecord(record.listing);
  const rfq = asRecord(record.rfq);
  const farmer = asRecord(record.farmer ?? record.seller);
  const rawStatus = String(record.status ?? "pending");

  return {
    amount: getNumber(record.totalAmount ?? record.amount ?? record.price) ?? 0,
    deliveryDate: formatDate(record.deliveryDate ?? record.updatedAt ?? record.createdAt),
    farmerAvatar: getString(farmer.avatarUrl ?? farmer.profileImage ?? farmer.avatar),
    farmerName: getString(farmer.fullName ?? farmer.name ?? record.farmerName) ?? "Farmer",
    farmerRating: getNumber(farmer.rating ?? record.farmerRating) ?? 0,
    id: String(record.id ?? record._id ?? ""),
    productDetail: getString(listing.category ?? rfq.productType ?? record.source) ?? "Deal",
    productImage: getString(listing.imageUrl ?? listing.image ?? listing.images),
    productName: getString(record.productName ?? listing.name ?? listing.title ?? rfq.productType) ?? "Deal",
    quantity: String(record.quantity ?? rfq.quantity ?? "Not specified"),
    status: mapBuyerDealStatus(rawStatus),
  };
}

function mapBuyerDealStatus(status: string): BuyerDeal["status"] {
  if (status === "completed") return "completed";
  if (status === "cancelled") return "cancelled";
  if (status === "confirmed" || status === "active") return "active";
  return "awaiting";
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  if (Array.isArray(value)) return getString(value[0]);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function formatDate(value: unknown) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Not scheduled,";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
