"use client";

import { useEffect, useRef, useState } from "react";

import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { CommodityRejectionRates } from "@/components/dashboard/quality-officer/reports/CommodityRejectionRates";
import {
  commodityQualityMetrics,
  qualityTrendData,
  recentQualityReports,
} from "@/components/dashboard/quality-officer/reports/quality-officer-reports.mock";
import { QualityOfficerReportsHeader } from "@/components/dashboard/quality-officer/reports/QualityOfficerReportsHeader";
import { QualityOfficerReportsStats } from "@/components/dashboard/quality-officer/reports/QualityOfficerReportsStats";
import { RecentQualityReportsTable } from "@/components/dashboard/quality-officer/reports/RecentQualityReportsTable";
import { RegionalQualityMapCard } from "@/components/dashboard/quality-officer/reports/RegionalQualityMapCard";
import { YieldQualityTrendChart } from "@/components/dashboard/quality-officer/reports/YieldQualityTrendChart";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

type ReportsPeriod = "Last 30 Days" | "Q3 2024";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerReportsPage() {
  const [activePeriod, setActivePeriod] = useState<ReportsPeriod>("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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

  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search analytics, suppliers, or products..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-5 lg:px-6">
        <QualityOfficerReportsHeader
          activePeriod={activePeriod}
          onExport={() => showToast("Export report will be connected later.")}
          onFilter={() => showToast("More filters will be connected later.")}
          onPeriodChange={setActivePeriod}
        />

        <QualityOfficerReportsStats />

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <YieldQualityTrendChart data={qualityTrendData} />
          <RegionalQualityMapCard />
        </div>

        <CommodityRejectionRates metrics={commodityQualityMetrics} />

        <RecentQualityReportsTable
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, 3)))}
          onViewAll={() => showToast("Records list will be connected later.")}
          onViewAnalysis={() => showToast("Full analysis will be connected later.")}
          reports={recentQualityReports}
        />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
