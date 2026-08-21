"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminPaymentDetailDrawer } from "@/components/dashboard/admin/financial-reports/AdminPaymentDetailDrawer";
import { AdminPaymentStats } from "@/components/dashboard/admin/financial-reports/AdminPaymentStats";
import { AdminPaymentStatusGuide } from "@/components/dashboard/admin/financial-reports/AdminPaymentStatusGuide";
import { AdminPaymentsFilters } from "@/components/dashboard/admin/financial-reports/AdminPaymentsFilters";
import { AdminPaymentsHeader } from "@/components/dashboard/admin/financial-reports/AdminPaymentsHeader";
import { AdminPaymentsTable } from "@/components/dashboard/admin/financial-reports/AdminPaymentsTable";
import { AdminRetryFailedPaymentCard } from "@/components/dashboard/admin/financial-reports/AdminRetryFailedPaymentCard";
import { adminPayments } from "@/components/dashboard/admin/financial-reports/admin-payments.mock";
import type { AdminPayment, AdminPaymentStatusFilter } from "@/components/dashboard/admin/financial-reports/admin-payments.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const defaultStartDate = "2024-06-01";
const defaultEndDate = "2024-06-30";

export function AdminPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<AdminPaymentStatusFilter>("all");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<AdminPayment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showRetryCard, setShowRetryCard] = useState(true);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    }

    if (isDrawerOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const filteredPayments = useMemo(() => {
    // TODO: Connect payments table to Admin Payments API.
    // TODO: Connect filters to API query params.
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (startDate && endDate && startDate > endDate) return [];

    return adminPayments.filter((payment) => {
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
      const matchesStart = !startDate || payment.transactionDateISO >= startDate;
      const matchesEnd = !endDate || payment.transactionDateISO <= endDate;
      const matchesSearch =
        !normalizedSearch ||
        `${payment.transactionId} ${payment.dealId} ${payment.payer} ${payment.payee}`.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesStart && matchesEnd && matchesSearch;
    });
  }, [endDate, searchQuery, startDate, statusFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredPayments.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, filteredPayments, rowsPerPage]);

  const failedPayment = adminPayments.find((payment) => payment.status === "failed");

  function showToast(message: string) {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  function applyFilters() {
    if (startDate && endDate && startDate > endDate) {
      showToast("Start date cannot be after end date.");
      return;
    }
    setCurrentPage(1);
    showToast("Filters applied.");
  }

  function resetFilters() {
    setStatusFilter("all");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedPaymentIds([]);
    showToast("Filters reset.");
  }

  function openPayment(payment: AdminPayment) {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  }

  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={6}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Admin"
      userSubLabel=""
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-6 sm:px-5 lg:px-6">
        <AdminPaymentsHeader
          onExport={() => {
            // TODO: Connect export endpoint.
            showToast("Payments export will be connected later.");
          }}
        />
        <AdminPaymentsFilters
          endDate={endDate}
          onApply={applyFilters}
          onEndDateChange={(value) => {
            setEndDate(value);
            setCurrentPage(1);
          }}
          onReset={resetFilters}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          onStartDateChange={(value) => {
            setStartDate(value);
            setCurrentPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          startDate={startDate}
          status={statusFilter}
        />
        <AdminPaymentStats />
        <AdminPaymentsTable
          currentPage={currentPage}
          onOpenDetail={openPayment}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          onSelectedPaymentIdsChange={setSelectedPaymentIds}
          payments={paginatedPayments}
          rowsPerPage={rowsPerPage}
          selectedDetailPaymentId={isDrawerOpen ? selectedPayment?.id : undefined}
          selectedPaymentIds={selectedPaymentIds}
          totalCount={filteredPayments.length}
        />

        <p className="mt-5 text-[12px] font-medium text-slate-400">All amounts are shown in USD. Platform commission rate: 5% unless otherwise configured per category.</p>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          {showRetryCard ? (
            <AdminRetryFailedPaymentCard
              onCancel={() => setShowRetryCard(false)}
              onRetry={() => {
                // TODO: Connect retry failed payment endpoint.
                showToast("Payment retry flow will be connected later.");
              }}
              payment={failedPayment}
            />
          ) : null}
          <AdminPaymentStatusGuide />
        </div>
      </div>

      <AdminPaymentDetailDrawer
        onAddNote={() => {
          // TODO: Connect admin notes.
          showToast("Admin notes will be connected later.");
        }}
        onClose={() => setIsDrawerOpen(false)}
        onViewDeal={() => {
          // TODO: Connect linked deal details.
          showToast("Deal details will be connected later.");
        }}
        open={isDrawerOpen}
        payment={selectedPayment}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
