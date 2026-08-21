"use client";

import { useEffect, useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { DealsFilters } from "@/components/dashboard/farmer/deals/DealsFilters";
import { DealsHeader } from "@/components/dashboard/farmer/deals/DealsHeader";
import { DealsPagination } from "@/components/dashboard/farmer/deals/DealsPagination";
import { DealsTable } from "@/components/dashboard/farmer/deals/DealsTable";
import { DealStats } from "@/components/dashboard/farmer/deals/DealStats";
import type { DealStatusFilter, FarmerDeal } from "@/components/dashboard/farmer/deals/deals-types";
import { getMyDeals, type ApiRecord } from "@/lib/workflow-api";

const defaultItemsPerPage = 10;

export function FarmerDealsPage() {
  const [selectedStatus, setSelectedStatus] = useState<DealStatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [deals, setDeals] = useState<FarmerDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadDeals();
  }, []);

  async function loadDeals() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const records = await getMyDeals();
      setDeals(records.map(mapFarmerDealFromApi));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load deals.");
      setDeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredDeals = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesStatus = selectedStatus === "All" || deal.status === selectedStatus;
      const matchesSearch =
        deal.id.toLowerCase().includes(normalizedSearch) ||
        deal.product.toLowerCase().includes(normalizedSearch) ||
        deal.buyer.toLowerCase().includes(normalizedSearch) ||
        deal.status.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [deals, searchQuery, selectedStatus]);

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

  return (
    <FarmerDashboardLayout searchPlaceholder="Search by contract ID, product, or buyer name">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <DealsHeader />
        <DealStats deals={deals} />
        <DealsFilters
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
        />
        {isLoading ? (
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 text-sm font-black text-slate-600 shadow-sm">Loading deals...</div>
        ) : errorMessage ? (
          <div className="mt-6 rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-black text-slate-900">{errorMessage}</p>
            <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={loadDeals} type="button">
              Retry
            </button>
          </div>
        ) : (
          <>
            <DealsTable deals={paginatedDeals} />
            <DealsPagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              onPageChange={handlePageChange}
              totalItems={filteredDeals.length}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </FarmerDashboardLayout>
  );
}

function mapFarmerDealFromApi(record: ApiRecord): FarmerDeal {
  const buyer = asRecord(record.buyer);
  const listing = asRecord(record.listing);
  const rfq = asRecord(record.rfq);
  const status = String(record.status ?? "pending");
  const amount = getNumber(record.totalAmount ?? record.amount ?? record.price);

  return {
    amount: amount === undefined ? "Not specified" : amount.toLocaleString("en"),
    buyer: getString(buyer.fullName ?? buyer.name ?? record.buyerName) ?? "Buyer",
    currency: getString(record.currency) ?? "$",
    date: formatDate(record.createdAt ?? record.updatedAt ?? record.deliveryDate),
    id: String(record.id ?? record._id ?? ""),
    image: getString(listing.imageUrl ?? listing.image ?? getFirst(listing.images)) ?? "/assets/products/product-organic-tomatoes.jpg",
    product: getString(record.productName ?? listing.name ?? listing.title ?? rfq.productType) ?? "Deal",
    quantity: String(record.quantity ?? rfq.quantity ?? ""),
    status: mapFarmerDealStatus(status),
  };
}

function mapFarmerDealStatus(status: string): FarmerDeal["status"] {
  if (status === "completed") return "Completed";
  if (status === "cancelled") return "Cancelled";
  if (status === "active") return "Active";
  if (status === "confirmed") return "Active";
  return "Pending";
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getFirst(value: unknown) {
  return Array.isArray(value) ? value[0] : value;
}

function getString(value: unknown) {
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
  if (!date || Number.isNaN(date.getTime())) return "Not scheduled";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
