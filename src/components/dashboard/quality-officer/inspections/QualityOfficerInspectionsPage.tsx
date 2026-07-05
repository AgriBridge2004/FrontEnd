"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { CriticalFlagHistoryCard } from "@/components/dashboard/quality-officer/inspections/CriticalFlagHistoryCard";
import { InspectionVolumeChart } from "@/components/dashboard/quality-officer/inspections/InspectionVolumeChart";
import { QualityOfficerInspectionStats } from "@/components/dashboard/quality-officer/inspections/QualityOfficerInspectionStats";
import { QualityOfficerInspectionsHeader } from "@/components/dashboard/quality-officer/inspections/QualityOfficerInspectionsHeader";
import { QualityOfficerInspectionsTable } from "@/components/dashboard/quality-officer/inspections/QualityOfficerInspectionsTable";
import {
  criticalFlags,
  inspectionTrendData,
  qualityOfficerInspections,
} from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.mock";
import type { InspectionTab } from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerInspectionsPage() {
  const [activeTab, setActiveTab] = useState<InspectionTab>("all");
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

  const filteredInspections = useMemo(() => {
    if (activeTab === "all") {
      return qualityOfficerInspections;
    }

    return qualityOfficerInspections.filter((inspection) => inspection.status === activeTab);
  }, [activeTab]);

  // TODO: Connect inspections list, filters, create inspection, and export actions to API when endpoints are ready.
  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search inspections, IDs, or products..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <QualityOfficerInspectionsHeader
          onCreateInspection={() => showToast("Create inspection flow will be connected later.")}
          onExportData={() => showToast("Export data will be connected later.")}
        />
        <QualityOfficerInspectionStats />
        <QualityOfficerInspectionsTable
          activeTab={activeTab}
          inspections={filteredInspections}
          onFilterClick={() => showToast("Inspection filters will be connected later.")}
          onTabChange={setActiveTab}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <CriticalFlagHistoryCard flags={criticalFlags} onViewAll={() => showToast("Incident history will be connected later.")} />
          <InspectionVolumeChart data={inspectionTrendData} />
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
