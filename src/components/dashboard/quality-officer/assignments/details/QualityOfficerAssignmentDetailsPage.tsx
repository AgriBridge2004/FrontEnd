"use client";

import { useEffect, useRef, useState } from "react";

import { AssignmentAdminNotesCard } from "@/components/dashboard/quality-officer/assignments/details/AssignmentAdminNotesCard";
import { AssignmentAttachmentsCard } from "@/components/dashboard/quality-officer/assignments/details/AssignmentAttachmentsCard";
import { AssignmentDealDetailsCard } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDealDetailsCard";
import { AssignmentDecisionBar } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDecisionBar";
import { AssignmentDetailsHeader } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDetailsHeader";
import { assignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.mock";
import { AssignmentLocationCard } from "@/components/dashboard/quality-officer/assignments/details/AssignmentLocationCard";
import { AssignmentOverviewCards } from "@/components/dashboard/quality-officer/assignments/details/AssignmentOverviewCards";
import { AssignmentScheduleCard } from "@/components/dashboard/quality-officer/assignments/details/AssignmentScheduleCard";
import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerAssignmentDetailsPage() {
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

  // TODO: Connect assignment details to API.
  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search assignments, farms, or products..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-5 lg:px-6">
        <AssignmentDetailsHeader details={assignmentDetails} />
        <AssignmentOverviewCards details={assignmentDetails} />

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(310px,0.95fr)]">
          <div className="grid min-w-0 gap-5">
            <AssignmentDealDetailsCard details={assignmentDetails} />
            <AssignmentScheduleCard details={assignmentDetails} />
          </div>

          <div className="grid min-w-0 gap-5">
            <AssignmentLocationCard details={assignmentDetails} onOpenMaps={() => showToast("Maps integration will be connected later.")} />
            <AssignmentAdminNotesCard notes={assignmentDetails.adminNotes} />
          </div>
        </div>

        <AssignmentAttachmentsCard
          attachments={assignmentDetails.attachments}
          onDownloadAll={() => showToast("Download all attachments will be connected later.")}
          onDownloadAttachment={() => showToast("Attachment download will be connected later.")}
        />

        <AssignmentDecisionBar
          onAccept={() => showToast("Assignment accepted locally.")}
          onReject={() => showToast("Reject assignment flow will be connected later.")}
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
