"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { QualityOfficerAssignmentsFilters } from "@/components/dashboard/quality-officer/assignments/QualityOfficerAssignmentsFilters";
import { QualityOfficerAssignmentsHeader } from "@/components/dashboard/quality-officer/assignments/QualityOfficerAssignmentsHeader";
import { QualityOfficerAssignmentsStats } from "@/components/dashboard/quality-officer/assignments/QualityOfficerAssignmentsStats";
import { QualityOfficerAssignmentsTable } from "@/components/dashboard/quality-officer/assignments/QualityOfficerAssignmentsTable";
import {
  assignmentStatusCounts,
  qualityOfficerAssignments,
} from "@/components/dashboard/quality-officer/assignments/quality-officer-assignments.mock";
import type {
  AssignmentStatus,
  AssignmentTab,
  AssignmentTimeFilter,
} from "@/components/dashboard/quality-officer/assignments/quality-officer-assignments.types";
import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<AssignmentTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AssignmentStatus>("all");
  const [timeFilter, setTimeFilter] = useState<AssignmentTimeFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

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

  const filteredAssignments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return qualityOfficerAssignments.filter((assignment) => {
      const matchesTab = activeTab === "all" || assignment.status === activeTab;
      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
      const matchesTime = timeFilter !== "overdue-only" || assignment.status === "overdue";
      const matchesSearch =
        !normalizedQuery ||
        [
          assignment.dealId,
          assignment.productName,
          assignment.category,
          assignment.farmName,
          assignment.location,
          assignment.buyer,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTab && matchesStatus && matchesTime && matchesSearch;
    });
  }, [activeTab, searchQuery, statusFilter, timeFilter]);

  // TODO: Connect assignments list, filters, export action, and assignment details route/API to backend endpoints.
  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={6}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search assignments, farms, or products..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-5 lg:px-6">
        <QualityOfficerAssignmentsHeader />
        <QualityOfficerAssignmentsStats />
        <QualityOfficerAssignmentsFilters
          onFilterClick={() => showToast("Advanced assignment filters will be connected later.")}
          onSearchChange={setSearchQuery}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onTimeChange={(value) => {
            setTimeFilter(value);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          timeFilter={timeFilter}
        />
        <QualityOfficerAssignmentsTable
          activeTab={activeTab}
          assignments={filteredAssignments}
          counts={assignmentStatusCounts}
          currentPage={currentPage}
          onExport={() => showToast("Assignments export will be connected later.")}
          onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, 3)))}
          onPageSizeChange={setPageSize}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
          onViewAssignment={(assignment) => router.push(`/quality-officer/assignments/${assignment.dealId.replace("#", "")}`)}
          pageSize={pageSize}
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
