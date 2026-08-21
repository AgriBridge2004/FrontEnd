"use client";

import { Clock } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminRFQDetailDrawer } from "@/components/dashboard/admin/rfqs/AdminRFQDetailDrawer";
import { AdminRFQsFilters } from "@/components/dashboard/admin/rfqs/AdminRFQsFilters";
import { AdminRFQsHeader } from "@/components/dashboard/admin/rfqs/AdminRFQsHeader";
import { AdminRFQsStats } from "@/components/dashboard/admin/rfqs/AdminRFQsStats";
import { AdminRFQsTable } from "@/components/dashboard/admin/rfqs/AdminRFQsTable";
import { adminRFQs, adminRFQsTotalCount } from "@/components/dashboard/admin/rfqs/admin-rfqs.mock";
import type {
  AdminRFQ,
  AdminRFQCategoryFilter,
  AdminRFQSortKey,
  AdminRFQStatusFilter,
} from "@/components/dashboard/admin/rfqs/admin-rfqs.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const defaultDateRange = "May 1, 2024 - May 21, 2024";

export function AdminRFQsManagementPage() {
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [statusFilter, setStatusFilter] = useState<AdminRFQStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<AdminRFQCategoryFilter>("all");
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSort, setSelectedSort] = useState<AdminRFQSortKey>("rfqId");
  const [selectedRFQ, setSelectedRFQ] = useState<AdminRFQ | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  const filteredRFQs = useMemo(() => {
    return adminRFQs.filter((rfq) => {
      const matchesStatus = statusFilter === "all" || rfq.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || rfq.product.category === categoryFilter;

      return matchesStatus && matchesCategory;
    });
  }, [categoryFilter, statusFilter]);

  const sortedRFQs = useMemo(() => {
    return [...filteredRFQs].sort((first, second) => getSortValue(first, selectedSort).localeCompare(getSortValue(second, selectedSort)));
  }, [filteredRFQs, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(adminRFQsTotalCount / pageSize));
  const visibleRFQs = sortedRFQs.slice(0, pageSize);

  function openDrawer(rfq: AdminRFQ) {
    // TODO: Connect RFQ detail drawer to RFQ detail API.
    setSelectedRFQ(rfq);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    setSelectedRFQ(null);
  }

  function resetFilters() {
    setStatusFilter("all");
    setCategoryFilter("all");
    setDateRange(defaultDateRange);
    setCurrentPage(1);
  }

  function handlePageChange(nextPage: number) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function handlePageSizeChange(nextPageSize: number) {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  }

  // TODO: Connect RFQs list to Admin API.
  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={3}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Admin"
      userSubLabel="Super Administrator"
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-5 sm:px-5 lg:px-6">
        <AdminRFQsHeader
          onExport={() => {
            // TODO: Connect export endpoint.
            showToast("RFQ export will be connected later.");
          }}
          onRefresh={() => showToast("RFQs refreshed locally.")}
        />

        <AdminRFQsFilters
          category={categoryFilter}
          dateRange={dateRange}
          onCategoryChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
          onDateRangeChange={setDateRange}
          onMoreFilters={() => showToast("More RFQ filters will be connected later.")}
          onReset={resetFilters}
          onStatusChange={(value) => {
            // TODO: Connect RFQ filters to API query params.
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          status={statusFilter}
        />

        <AdminRFQsTable
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onRFQSelect={openDrawer}
          onSortChange={setSelectedSort}
          pageSize={pageSize}
          rfqs={visibleRFQs}
          selectedRFQId={selectedRFQ?.id}
          selectedSort={selectedSort}
          totalCount={adminRFQsTotalCount}
          totalPages={totalPages}
        />

        <AdminRFQsStats />

        <p className="mt-5 flex items-center gap-2 text-[12px] font-medium text-slate-400">
          <Clock className="size-4 text-orange-400" />
          Clock icon indicates no activity for more than 72 hours.
        </p>
      </div>

      <AdminRFQDetailDrawer
        onClose={closeDrawer}
        onCloseRFQ={() => {
          // TODO: Connect close RFQ endpoint.
          showToast("Close RFQ flow will be connected later.");
        }}
        onFlagForReview={() => {
          // TODO: Connect flag for review endpoint.
          showToast("RFQ flagged for review locally.");
        }}
        open={isDrawerOpen}
        rfq={selectedRFQ}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[60] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function getSortValue(rfq: AdminRFQ, key: AdminRFQSortKey) {
  const values: Record<AdminRFQSortKey, string> = {
    buyer: rfq.buyer.company,
    dateSubmitted: `${rfq.dateSubmitted} ${rfq.dateSubmittedTime ?? ""}`,
    farmer: rfq.farmer.farmName,
    lastActivity: rfq.lastActivity,
    product: rfq.product.name,
    requestedQuantity: rfq.requestedQuantity,
    rfqId: rfq.rfqId,
    status: rfq.status,
  };

  return values[key];
}
