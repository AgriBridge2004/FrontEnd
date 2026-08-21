"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminRevenueFilters } from "@/components/dashboard/admin/revenue-reports/AdminRevenueFilters";
import { AdminRevenueReportsHeader } from "@/components/dashboard/admin/revenue-reports/AdminRevenueReportsHeader";
import { AdminRevenueSourceDistribution } from "@/components/dashboard/admin/revenue-reports/AdminRevenueSourceDistribution";
import { AdminRevenueStats } from "@/components/dashboard/admin/revenue-reports/AdminRevenueStats";
import { AdminRevenueTransactionsTable } from "@/components/dashboard/admin/revenue-reports/AdminRevenueTransactionsTable";
import { AdminRevenueTrendChart } from "@/components/dashboard/admin/revenue-reports/AdminRevenueTrendChart";
import { dailyRevenueTrend, revenueTransactions, weeklyRevenueTrend } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.mock";
import type { RevenueCategoryFilter, RevenueChartPeriod, RevenueDateRange } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const rangeDates: Record<RevenueDateRange, { from: string; to: string }> = {
  "last-month": { from: "2025-04-01", to: "2025-04-30" },
  "this-month": { from: "2025-05-01", to: "2025-05-25" },
  "this-quarter": { from: "2025-04-01", to: "2025-06-30" },
};

export function AdminRevenueReportsPage() {
  const [dateRange, setDateRange] = useState<RevenueDateRange>("this-month");
  const [fromDate, setFromDate] = useState(rangeDates["this-month"].from);
  const [toDate, setToDate] = useState(rangeDates["this-month"].to);
  const [category, setCategory] = useState<RevenueCategoryFilter>("all");
  const [chartPeriod, setChartPeriod] = useState<RevenueChartPeriod>("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const filteredTransactions = useMemo(() => {
    // TODO: Connect transactions table to revenue transactions API.
    // TODO: Connect date range/category filters to query params.
    if (fromDate && toDate && fromDate > toDate) return [];
    return revenueTransactions.filter((transaction) => {
      const matchesCategory = category === "all" || transaction.productCategory === category;
      const matchesFrom = !fromDate || transaction.dateISO >= fromDate;
      const matchesTo = !toDate || transaction.dateISO <= toDate;
      return matchesCategory && matchesFrom && matchesTo;
    });
  }, [category, fromDate, toDate]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(start, start + rowsPerPage);
  }, [currentPage, filteredTransactions, rowsPerPage]);

  function showToast(message: string) {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  function handleDateRangeChange(value: RevenueDateRange) {
    const nextRange = rangeDates[value];
    setDateRange(value);
    setFromDate(nextRange.from);
    setToDate(nextRange.to);
    setCurrentPage(1);
  }

  function handleManualDateChange(kind: "from" | "to", value: string) {
    if (kind === "from") {
      setFromDate(value);
    } else {
      setToDate(value);
    }
    setCurrentPage(1);
    const nextFrom = kind === "from" ? value : fromDate;
    const nextTo = kind === "to" ? value : toDate;
    if (nextFrom && nextTo && nextFrom > nextTo) {
      showToast("Start date cannot be after end date.");
    }
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
        <AdminRevenueReportsHeader
          onExportExcel={() => {
            // TODO: Connect export as Excel endpoint.
            showToast("Excel export will be connected later.");
          }}
          onExportPdf={() => {
            // TODO: Connect export as PDF endpoint.
            showToast("PDF export will be connected later.");
          }}
        />
        <AdminRevenueFilters
          category={category}
          dateRange={dateRange}
          fromDate={fromDate}
          onCategoryChange={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
          onDateRangeChange={handleDateRangeChange}
          onFromDateChange={(value) => handleManualDateChange("from", value)}
          onToDateChange={(value) => handleManualDateChange("to", value)}
          toDate={toDate}
        />
        <AdminRevenueStats />
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* TODO: Connect revenue trend chart to analytics API. */}
          <AdminRevenueTrendChart data={chartPeriod === "daily" ? dailyRevenueTrend : weeklyRevenueTrend} onPeriodChange={setChartPeriod} period={chartPeriod} />
          {/* TODO: Connect source distribution to analytics API. */}
          <AdminRevenueSourceDistribution />
        </div>
        <AdminRevenueTransactionsTable
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onRowClick={() => showToast("Revenue transaction details will be connected later.")}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          rowsPerPage={rowsPerPage}
          totalCount={filteredTransactions.length}
          transactions={paginatedTransactions}
        />
      </div>
      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
