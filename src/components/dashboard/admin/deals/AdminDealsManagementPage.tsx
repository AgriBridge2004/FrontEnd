"use client";

import { Info } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminDealsFilters } from "@/components/dashboard/admin/deals/AdminDealsFilters";
import { AdminDealsHeader } from "@/components/dashboard/admin/deals/AdminDealsHeader";
import { AdminDealsPagination } from "@/components/dashboard/admin/deals/AdminDealsPagination";
import { AdminDealsTable } from "@/components/dashboard/admin/deals/AdminDealsTable";
import { AdminDealDetailPanel } from "@/components/dashboard/admin/deals/AdminDealDetailPanel";
import { adminDeals, adminDealsTotalCount } from "@/components/dashboard/admin/deals/admin-deals.mock";
import type {
  AdminDeal,
  AdminDealProductFilter,
  AdminDealSortKey,
  AdminDealStatusFilter,
} from "@/components/dashboard/admin/deals/admin-deals.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const defaultDateRange = "01/05/2025 - 14/06/2025";

export function AdminDealsManagementPage() {
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [statusDraft, setStatusDraft] = useState<AdminDealStatusFilter>("all");
  const [productDraft, setProductDraft] = useState<AdminDealProductFilter>("all");
  const [dateRangeDraft, setDateRangeDraft] = useState(defaultDateRange);
  const [appliedStatus, setAppliedStatus] = useState<AdminDealStatusFilter>("all");
  const [appliedProduct, setAppliedProduct] = useState<AdminDealProductFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSort, setSelectedSort] = useState<AdminDealSortKey>("dealId");
  const [selectedDeal, setSelectedDeal] = useState<AdminDeal | null>(null);
  const [isDealPanelOpen, setIsDealPanelOpen] = useState(false);

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
        setIsDealPanelOpen(false);
        setSelectedDeal(null);
      }
    }

    if (isDealPanelOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDealPanelOpen]);

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

  const filteredDeals = useMemo(() => {
    return adminDeals.filter((deal) => {
      const matchesStatus = appliedStatus === "all" || deal.status === appliedStatus;
      const matchesProduct = appliedProduct === "all" || deal.product === appliedProduct;

      return matchesStatus && matchesProduct;
    });
  }, [appliedProduct, appliedStatus]);

  const sortedDeals = useMemo(() => {
    return [...filteredDeals].sort((first, second) => first[selectedSort].localeCompare(second[selectedSort]));
  }, [filteredDeals, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(adminDealsTotalCount / pageSize));
  const visibleDeals = sortedDeals.slice(0, pageSize);

  function handleApplyFilters() {
    // TODO: Connect filters to API query params.
    setAppliedStatus(statusDraft);
    setAppliedProduct(productDraft);
    setCurrentPage(1);
  }

  function handleReset() {
    setStatusDraft("all");
    setProductDraft("all");
    setDateRangeDraft(defaultDateRange);
    setAppliedStatus("all");
    setAppliedProduct("all");
    setCurrentPage(1);
  }

  function handlePageChange(nextPage: number) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function handlePageSizeChange(nextPageSize: number) {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  }

  function openDealPanel(deal: AdminDeal) {
    // TODO: Connect deal details panel to Admin deal detail API.
    setSelectedDeal(deal);
    setIsDealPanelOpen(true);
  }

  function closeDealPanel() {
    setIsDealPanelOpen(false);
    setSelectedDeal(null);
  }

  // TODO: Connect deals list to Admin API.
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
        <AdminDealsHeader
          onAuditTrail={() => {
            // TODO: Connect audit trail endpoint.
            showToast("Audit trail will be connected later.");
          }}
          onExport={() => {
            // TODO: Connect export endpoint.
            showToast("Deals export will be connected later.");
          }}
        />

        <div className="min-w-0">
          <div className="min-w-0">
            <AdminDealsFilters
              dateRange={dateRangeDraft}
              onApply={handleApplyFilters}
              onDateRangeChange={setDateRangeDraft}
              onProductChange={setProductDraft}
              onReset={handleReset}
              onStatusChange={setStatusDraft}
              product={productDraft}
              status={statusDraft}
            />

            <AdminDealsTable
              deals={visibleDeals}
              onActionClick={openDealPanel}
              onAlertClick={openDealPanel}
              onDealSelect={openDealPanel}
              onRefresh={() => showToast("Deals refreshed locally.")}
              onSortChange={setSelectedSort}
              selectedDealId={selectedDeal?.id}
              selectedSort={selectedSort}
              totalCount={adminDealsTotalCount}
            />

            <AdminDealsPagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
              totalItems={adminDealsTotalCount}
              totalPages={totalPages}
            />

            <p className="mt-6 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Info className="size-3.5" />
              All times are in your local timezone (UTC+03:00)
            </p>
          </div>

          {selectedDeal ? (
            <AdminDealDetailPanel
              deal={selectedDeal}
              isOpen={isDealPanelOpen}
              onAdvanceDeal={() => {
                // TODO: Connect manual advance action to API.
                // TODO: Connect audit log for admin actions.
                showToast("Manual advance action will be connected later.");
              }}
              onClose={closeDealPanel}
              onPauseDeal={() => {
                // TODO: Connect pause deal action to API.
                // TODO: Connect audit log for admin actions.
                showToast("Pause deal action will be connected later.");
              }}
            />
          ) : null}
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
