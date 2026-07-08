"use client";

import { useMemo, useState } from "react";

import { BuyerApiNotice } from "@/components/dashboard/buyer/BuyerApiNotice";
import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerFinanceSecurityCards } from "@/components/dashboard/buyer/payments/BuyerFinanceSecurityCards";
import { BuyerPaymentActionPanel } from "@/components/dashboard/buyer/payments/BuyerPaymentActionPanel";
import { BuyerPaymentLedger } from "@/components/dashboard/buyer/payments/BuyerPaymentLedger";
import type { BuyerPayment, BuyerPaymentFilter } from "@/components/dashboard/buyer/payments/buyer-payments.types";
import { BuyerPaymentsHeader } from "@/components/dashboard/buyer/payments/BuyerPaymentsHeader";
import { BuyerPaymentsStats } from "@/components/dashboard/buyer/payments/BuyerPaymentsStats";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getStoredUser } from "@/lib/auth-storage";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const pageSize = 10;
const buyerPayments: BuyerPayment[] = [];
const buyerPaymentStats = {
  escrowBalance: 0,
  totalSettledYtd: 0,
  upcomingPayouts: 0,
};

export function BuyerPaymentsPage() {
  const [selectedFilter, setSelectedFilter] = useState<BuyerPaymentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [topbarSearchQuery, setTopbarSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  function resetPage() {
    setCurrentPage(1);
  }

  const filteredPayments = useMemo(() => {
    const localSearch = searchQuery.trim().toLowerCase();
    const topbarSearch = topbarSearchQuery.trim().toLowerCase();

    return buyerPayments.filter((payment) => {
      const searchableText = `${payment.id} ${payment.contractId} ${payment.recipientName} ${payment.recipientSubtitle} ${payment.status}`.toLowerCase();
      const matchesFilter = selectedFilter === "all" || payment.status === selectedFilter;
      const matchesLocalSearch = !localSearch || searchableText.includes(localSearch);
      const matchesTopbarSearch = !topbarSearch || searchableText.includes(topbarSearch);

      return matchesFilter && matchesLocalSearch && matchesTopbarSearch;
    });
  }, [searchQuery, selectedFilter, topbarSearchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
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
      searchPlaceholder="Search transactions, Escrow IDs or Contracts..."
      searchValue={topbarSearchQuery}
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <BuyerApiNotice description="Buyer payment and escrow endpoints are not available in Swagger yet." />
        <BuyerPaymentsHeader
          onAdvancedFilters={() => showToast("Advanced filters will be connected later.")}
          onExportPdf={() => showToast("Export PDF will be connected later.")}
          onNewPayment={() => showToast("New payment flow will be connected later.")}
        />
        <BuyerPaymentsStats onViewAllPayouts={() => showToast("Upcoming payouts will be connected later.")} stats={buyerPaymentStats} />
        <BuyerPaymentLedger
          currentPage={currentPage}
          filter={selectedFilter}
          onFilterChange={(filter) => {
            setSelectedFilter(filter);
            resetPage();
          }}
          onPageChange={handlePageChange}
          onReleaseFunds={() => showToast("Release funds flow will be connected later.")}
          onSearchChange={(value) => {
            setSearchQuery(value);
            resetPage();
          }}
          payments={paginatedPayments}
          searchQuery={searchQuery}
          totalFilteredItems={filteredPayments.length}
          totalItems={buyerPayments.length}
          totalPages={totalPages}
        />

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <BuyerPaymentActionPanel
            onEscrowGovernance={() => showToast("Escrow governance will be connected later.")}
            onManageInspections={() => showToast("Inspection management will be connected later.")}
          />
          <BuyerFinanceSecurityCards />
        </section>

        <footer className="mt-8 flex flex-col gap-4 border-t border-slate-200 py-5 text-xs font-black uppercase tracking-wide text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 AgriBridge Pro Finance</p>
          <div className="flex flex-wrap gap-6">
            <button className="transition hover:text-emerald-800" type="button">Privacy Policy</button>
            <button className="transition hover:text-emerald-800" type="button">Terms of Escrow</button>
            <button className="transition hover:text-emerald-800" type="button">System Status</button>
          </div>
        </footer>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
