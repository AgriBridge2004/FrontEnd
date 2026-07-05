"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { CommonDisputeReasonsCard } from "@/components/dashboard/quality-officer/disputes/CommonDisputeReasonsCard";
import { MediationQueueCard } from "@/components/dashboard/quality-officer/disputes/MediationQueueCard";
import { PriorityAlertsCard } from "@/components/dashboard/quality-officer/disputes/PriorityAlertsCard";
import {
  commonDisputeReasons,
  disputeRecords,
  mediationQueue,
  priorityAlerts,
} from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.mock";
import type { DisputeTab } from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";
import { QualityOfficerDisputesHeader } from "@/components/dashboard/quality-officer/disputes/QualityOfficerDisputesHeader";
import { QualityOfficerDisputesStats } from "@/components/dashboard/quality-officer/disputes/QualityOfficerDisputesStats";
import { QualityOfficerDisputesTable } from "@/components/dashboard/quality-officer/disputes/QualityOfficerDisputesTable";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerDisputesPage() {
  const [activeTab, setActiveTab] = useState<DisputeTab>("all");
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

  const filteredDisputes = useMemo(() => {
    if (activeTab === "all") {
      return disputeRecords;
    }

    if (activeTab === "pending-investigation") {
      return disputeRecords.filter((dispute) => dispute.status === "in-investigation");
    }

    return disputeRecords.filter((dispute) => dispute.status === activeTab);
  }, [activeTab]);

  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search disputes, contracts, or parties..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Alex Thompson"
      userSubLabel="Dispute Manager"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-5 lg:px-6">
        <QualityOfficerDisputesHeader onExport={() => showToast("Export dispute data will be connected later.")} />
        <QualityOfficerDisputesStats />

        <div className="mt-5 grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_280px]">
          <QualityOfficerDisputesTable
            activeTab={activeTab}
            disputes={filteredDisputes}
            onActionClick={() => showToast("Dispute actions will be connected later.")}
            onTabChange={setActiveTab}
            onViewClick={() => showToast("Dispute details will be connected later.")}
          />

          <aside className="grid min-w-0 gap-5 md:grid-cols-3 2xl:grid-cols-1 2xl:content-start">
            <PriorityAlertsCard alerts={priorityAlerts} />
            <CommonDisputeReasonsCard reasons={commonDisputeReasons} />
            <MediationQueueCard items={mediationQueue} onViewSchedule={() => showToast("Full mediation schedule will be connected later.")} />
          </aside>
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
