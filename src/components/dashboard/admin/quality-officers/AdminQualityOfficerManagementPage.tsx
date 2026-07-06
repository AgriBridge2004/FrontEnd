"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminAssignQualityOfficerModal } from "@/components/dashboard/admin/quality-officers/AdminAssignQualityOfficerModal";
import { AdminDealsNeedingAssignment } from "@/components/dashboard/admin/quality-officers/AdminDealsNeedingAssignment";
import { AdminQualityOfficerFilters } from "@/components/dashboard/admin/quality-officers/AdminQualityOfficerFilters";
import { AdminQualityOfficerHeader } from "@/components/dashboard/admin/quality-officers/AdminQualityOfficerHeader";
import { AdminQualityOfficerTable } from "@/components/dashboard/admin/quality-officers/AdminQualityOfficerTable";
import { AdminQualityOfficerTabs } from "@/components/dashboard/admin/quality-officers/AdminQualityOfficerTabs";
import {
  adminQualityOfficers,
  dealsNeedingAssignment as initialDealsNeedingAssignment,
} from "@/components/dashboard/admin/quality-officers/admin-quality-officers.mock";
import type {
  AdminQualityOfficer,
  AdminQualityOfficerTab,
  CoverageAreaFilter,
  DealNeedingAssignment,
} from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

export function AdminQualityOfficerManagementPage() {
  const [activeTab, setActiveTab] = useState<AdminQualityOfficerTab>("officers");
  const [coverageArea, setCoverageArea] = useState<CoverageAreaFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dealsNeedingAssignment, setDealsNeedingAssignment] = useState(initialDealsNeedingAssignment);
  const [selectedDeal, setSelectedDeal] = useState<DealNeedingAssignment | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; title?: string } | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string, title?: string, duration = 2400) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({ message, title });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, duration);
  }

  const filteredOfficers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return adminQualityOfficers.filter((officer) => {
      const matchesCoverage = coverageArea === "all" || officer.coverageAreas.includes(coverageArea);
      const matchesSearch = !normalizedSearch || `${officer.name} ${officer.phone}`.toLowerCase().includes(normalizedSearch);

      return matchesCoverage && matchesSearch;
    });
  }, [coverageArea, searchQuery]);

  function openAssignModal(deal: DealNeedingAssignment) {
    setSelectedDeal(deal);
    setIsAssignModalOpen(true);
  }

  function closeAssignModal() {
    setIsAssignModalOpen(false);
    setSelectedDeal(null);
  }

  function confirmAssignment(officer: AdminQualityOfficer, deal: DealNeedingAssignment) {
    // TODO: Connect assign quality officer endpoint.
    // TODO: Connect notification dispatch to assigned officer.
    setDealsNeedingAssignment((current) => current.filter((item) => item.id !== deal.id));
    closeAssignModal();
    showToast(
      `${officer.name} has been assigned to Deal ${deal.dealId} and will be automatically notified with full assignment details.`,
      "Assignment Successful",
      4000,
    );
  }

  const assignmentsPanel = (
    <AdminDealsNeedingAssignment
      deals={dealsNeedingAssignment}
      onAssignDeal={openAssignModal}
      onRefresh={() => {
        // TODO: Connect deals needing assignment list to API.
        showToast("Deals needing assignment refreshed locally.");
      }}
      onSelectDeal={setSelectedDeal}
      selectedDealId={selectedDeal?.id}
    />
  );

  // TODO: Connect quality officer list to Admin API.
  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={8}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Ahmed Mohamed"
      userSubLabel="Admin"
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-5 sm:px-5 lg:px-6">
        <AdminQualityOfficerHeader />
        <AdminQualityOfficerTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "officers" ? (
          <div className="min-w-0">
            <AdminQualityOfficerFilters
              coverageArea={coverageArea}
              onAddOfficer={() => {
                // TODO: Connect add quality officer flow.
                showToast("Add quality officer flow will be connected later.");
              }}
              onCoverageAreaChange={(value) => {
                // TODO: Connect coverage area filter to API query params.
                setCoverageArea(value);
              }}
              onSearchChange={setSearchQuery}
              searchQuery={searchQuery}
            />
            <AdminQualityOfficerTable officers={filteredOfficers} />
          </div>
        ) : (
          <div className="mt-6">{assignmentsPanel}</div>
        )}
      </div>

      <AdminAssignQualityOfficerModal
        deal={selectedDeal}
        officers={adminQualityOfficers}
        onAssignmentHistory={() => {
          // TODO: Connect assignment history.
          showToast("Assignment history will be connected later.");
        }}
        onClose={closeAssignModal}
        onConfirm={confirmAssignment}
        onWidenSearchArea={() => showToast("Search area widened locally.")}
        open={isAssignModalOpen}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] max-w-sm rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-800 shadow-xl">
          {toast.title ? <p className="font-black text-slate-900">{toast.title}</p> : null}
          <p className={toast.title ? "mt-1 font-semibold leading-5 text-slate-600" : "font-black"}>{toast.message}</p>
        </div>
      ) : null}
    </DashboardLayout>
  );
}
