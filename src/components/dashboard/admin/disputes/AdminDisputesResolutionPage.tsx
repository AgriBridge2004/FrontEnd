"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminDisputeDetail } from "@/components/dashboard/admin/disputes/AdminDisputeDetail";
import { AdminDisputeFinalDecisionModal } from "@/components/dashboard/admin/disputes/AdminDisputeFinalDecisionModal";
import { AdminDisputeResolutionDrawer } from "@/components/dashboard/admin/disputes/AdminDisputeResolutionDrawer";
import { AdminDisputesHeader } from "@/components/dashboard/admin/disputes/AdminDisputesHeader";
import { AdminDisputesList } from "@/components/dashboard/admin/disputes/AdminDisputesList";
import { adminDisputes } from "@/components/dashboard/admin/disputes/admin-disputes.mock";
import type {
  AdminDispute,
  AdminDisputeResolutionType,
  AdminDisputeStatusFilter,
} from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

export function AdminDisputesResolutionPage() {
  const [disputes, setDisputes] = useState(adminDisputes);
  const [selectedDisputeId, setSelectedDisputeId] = useState(adminDisputes[0].id);
  const [statusFilter, setStatusFilter] = useState<AdminDisputeStatusFilter>("all");
  const [isNewestFirst, setIsNewestFirst] = useState(false);
  const [resolutionType, setResolutionType] = useState<AdminDisputeResolutionType>("full-release-to-farmer");
  const [farmerPercent, setFarmerPercent] = useState(100);
  const [buyerPercent, setBuyerPercent] = useState(0);
  const [justification, setJustification] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResolutionDrawerOpen, setIsResolutionDrawerOpen] = useState(false);
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
    return disputes.filter((dispute) => statusFilter === "all" || dispute.status === statusFilter);
  }, [disputes, statusFilter]);

  const selectedDispute = useMemo(() => {
    return disputes.find((dispute) => dispute.id === selectedDisputeId) ?? disputes[0];
  }, [disputes, selectedDisputeId]);

  function handleResolutionTypeChange(value: AdminDisputeResolutionType) {
    setResolutionType(value);
    setValidationMessage("");

    if (value === "full-release-to-farmer") {
      setFarmerPercent(100);
      setBuyerPercent(0);
    } else if (value === "full-refund-to-buyer") {
      setFarmerPercent(0);
      setBuyerPercent(100);
    } else {
      setFarmerPercent(50);
      setBuyerPercent(50);
    }
  }

  function handleSelectDispute(dispute: AdminDispute) {
    // TODO: Connect selected dispute detail to Admin dispute detail API.
    setSelectedDisputeId(dispute.id);
    setJustification("");
    setValidationMessage("");
    handleResolutionTypeChange("full-release-to-farmer");
  }

  function clampPercent(value: number) {
    if (Number.isNaN(value)) {
      return 0;
    }

    return Math.min(100, Math.max(0, value));
  }

  function handleFarmerPercentChange(value: number) {
    const next = clampPercent(value);
    setResolutionType("partial-split");
    setFarmerPercent(next);
    setBuyerPercent(100 - next);
  }

  function handleBuyerPercentChange(value: number) {
    const next = clampPercent(value);
    setResolutionType("partial-split");
    setBuyerPercent(next);
    setFarmerPercent(100 - next);
  }

  function handleConfirmClick() {
    if (justification.trim().length < 20) {
      setValidationMessage("Please provide at least 20 characters for the resolution justification.");
      return;
    }

    setValidationMessage("");
    setIsConfirmModalOpen(true);
  }

  const closeConfirmModal = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  function confirmDecision() {
    // TODO: Connect final resolution endpoint.
    // TODO: Connect payment release/refund/split logic to backend.
    // TODO: Connect notification to both parties.
    setDisputes((current) =>
      current.map((dispute) => (dispute.id === selectedDispute.id ? { ...dispute, status: "resolved" } : dispute)),
    );
    setIsConfirmModalOpen(false);
    setIsResolutionDrawerOpen(false);
    showToast("Final dispute decision recorded locally.");
  }

  // TODO: Connect disputes list to Admin API.
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
      <div className="mx-auto w-full max-w-[1360px] overflow-x-hidden px-4 py-5 sm:px-5 lg:px-6">
        <AdminDisputesHeader />

        <div className="mt-5 grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
          <AdminDisputesList
            disputes={filteredDisputes}
            onFilterChange={(value) => {
              setStatusFilter(value);
              const nextDispute = disputes.find((dispute) => value === "all" || dispute.status === value);
              if (nextDispute) {
                setSelectedDisputeId(nextDispute.id);
              }
            }}
            onSelectDispute={handleSelectDispute}
            selectedDisputeId={selectedDispute.id}
            statusFilter={statusFilter}
          />

          <AdminDisputeDetail
            dispute={selectedDispute}
            isNewestFirst={isNewestFirst}
            onEvidenceClick={() => {
              // TODO: Connect evidence files to API.
              showToast("Evidence preview will be connected later.");
            }}
            onToggleEvidenceOrder={() => setIsNewestFirst((current) => !current)}
            onViewAllCommunication={() => {
              // TODO: Connect communication log to API.
              showToast("Full communication log will be connected later.");
            }}
            onViewFullReport={() => {
              // TODO: Connect inspection report to API.
              showToast("Inspection report details will be connected later.");
            }}
            onViewReport={() => {
              // TODO: Connect View Report / resolution drawer data to Admin dispute detail API.
              setIsResolutionDrawerOpen(true);
            }}
          />
        </div>
      </div>

      <AdminDisputeResolutionDrawer
        buyerPercent={buyerPercent}
        dispute={selectedDispute}
        farmerPercent={farmerPercent}
        justification={justification}
        onBuyerPercentChange={handleBuyerPercentChange}
        onClose={() => setIsResolutionDrawerOpen(false)}
        onConfirm={handleConfirmClick}
        onFarmerPercentChange={handleFarmerPercentChange}
        onJustificationChange={(value) => {
          setJustification(value);
          if (validationMessage) {
            setValidationMessage("");
          }
        }}
        onResolutionTypeChange={handleResolutionTypeChange}
        open={isResolutionDrawerOpen}
        resolutionType={resolutionType}
        validationMessage={validationMessage}
      />

      <AdminDisputeFinalDecisionModal isOpen={isConfirmModalOpen} onCancel={closeConfirmModal} onConfirm={confirmDecision} />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
