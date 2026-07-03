"use client";

import { useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { buyerDisputeCases, buyerDisputeStats, resolutionEfficiencyData } from "@/components/dashboard/buyer/disputes/buyer-disputes.mock";
import type { BuyerDisputeCase, BuyerDisputeTab } from "@/components/dashboard/buyer/disputes/buyer-disputes.types";
import { BuyerDisputesCasesTable } from "@/components/dashboard/buyer/disputes/BuyerDisputesCasesTable";
import { BuyerDisputesHeader } from "@/components/dashboard/buyer/disputes/BuyerDisputesHeader";
import { BuyerDisputesStats } from "@/components/dashboard/buyer/disputes/BuyerDisputesStats";
import { BuyerMediationSupportCard } from "@/components/dashboard/buyer/disputes/BuyerMediationSupportCard";
import { BuyerResolutionEfficiencyChart } from "@/components/dashboard/buyer/disputes/BuyerResolutionEfficiencyChart";
import { BuyerTrustScoreCard } from "@/components/dashboard/buyer/disputes/BuyerTrustScoreCard";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const casesPerPage = 4;

function matchesTab(disputeCase: BuyerDisputeCase, selectedTab: BuyerDisputeTab) {
  if (selectedTab === "all") {
    return true;
  }

  if (selectedTab === "active") {
    return disputeCase.status === "under-review" || disputeCase.status === "mediation";
  }

  return disputeCase.status === "resolved";
}

export function BuyerDisputesPage() {
  const [selectedTab, setSelectedTab] = useState<BuyerDisputeTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  function resetPage() {
    setCurrentPage(1);
  }

  const filteredCases = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return buyerDisputeCases.filter((disputeCase) => {
      const searchableText = `${disputeCase.id} ${disputeCase.contractTitle} ${disputeCase.contractId} ${disputeCase.merchant} ${disputeCase.reason} ${disputeCase.status} ${disputeCase.priority}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesSearch && matchesTab(disputeCase, selectedTab);
    });
  }, [searchQuery, selectedTab]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / casesPerPage));
  const paginatedCases = filteredCases.slice((currentPage - 1) * casesPerPage, currentPage * casesPerPage);

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  // TODO: Connect buyer dispute cases, mediation actions, exports, and charts to backend APIs.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      onSearchChange={(value) => {
        setSearchQuery(value);
        resetPage();
      }}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search disputes, contracts, or merchants..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-5 lg:px-7">
        <BuyerDisputesHeader onOpenNewDispute={() => showToast("New dispute flow will be connected later.")} />
        <BuyerDisputesStats stats={buyerDisputeStats} />
        <BuyerDisputesCasesTable
          cases={paginatedCases}
          currentPage={currentPage}
          onExport={() => showToast("Export will be connected later.")}
          onFilter={() => showToast("Dispute filters will be connected later.")}
          onPageChange={handlePageChange}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            resetPage();
          }}
          onViewCase={() => showToast("Dispute case details will be connected later.")}
          selectedTab={selectedTab}
          totalFilteredItems={filteredCases.length}
          totalItems={buyerDisputeCases.length}
          totalPages={totalPages}
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <BuyerResolutionEfficiencyChart data={resolutionEfficiencyData} onRangeChange={setSelectedRange} selectedRange={selectedRange} />
          <div className="space-y-5">
            <BuyerTrustScoreCard />
            <BuyerMediationSupportCard />
          </div>
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
