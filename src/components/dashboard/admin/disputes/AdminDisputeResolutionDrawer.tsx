"use client";

import { useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

import { AdminDisputeResolutionPanel } from "@/components/dashboard/admin/disputes/AdminDisputeResolutionPanel";
import type {
  AdminDispute,
  AdminDisputeResolutionType,
} from "@/components/dashboard/admin/disputes/admin-disputes.types";
import {
  dashboardDrawerOverlayClass,
  dashboardDrawerPanelClass,
  dashboardIconButtonClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type AdminDisputeResolutionDrawerProps = {
  buyerPercent: number;
  dispute: AdminDispute | null;
  farmerPercent: number;
  justification: string;
  onBuyerPercentChange: (value: number) => void;
  onClose: () => void;
  onConfirm: () => void;
  onFarmerPercentChange: (value: number) => void;
  onJustificationChange: (value: string) => void;
  onResolutionTypeChange: (value: AdminDisputeResolutionType) => void;
  open: boolean;
  resolutionType: AdminDisputeResolutionType;
  validationMessage: string;
};

export function AdminDisputeResolutionDrawer({
  buyerPercent,
  dispute,
  farmerPercent,
  justification,
  onBuyerPercentChange,
  onClose,
  onConfirm,
  onFarmerPercentChange,
  onJustificationChange,
  onResolutionTypeChange,
  open,
  resolutionType,
  validationMessage,
}: AdminDisputeResolutionDrawerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open || !dispute) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close resolution drawer overlay"
        className={dashboardDrawerOverlayClass}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-labelledby="resolution-drawer-title"
        aria-modal="true"
        className={cn(
          dashboardDrawerPanelClass,
          "sm:w-[560px] xl:w-[600px] 2xl:w-[640px]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-[16px] font-black text-slate-950" id="resolution-drawer-title">
              <ShieldCheck className="size-5" />
              Issue Resolution (Final Decision)
            </h2>
            <p className="mt-2 text-[12px] font-medium text-slate-500">Select Resolution Type</p>
          </div>
          <button
            aria-label="Close resolution panel"
            className={dashboardIconButtonClass}
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <AdminDisputeResolutionPanel
            buyerPercent={buyerPercent}
            dispute={dispute}
            farmerPercent={farmerPercent}
            hideHeader
            justification={justification}
            onBuyerPercentChange={onBuyerPercentChange}
            onConfirm={onConfirm}
            onFarmerPercentChange={onFarmerPercentChange}
            onJustificationChange={onJustificationChange}
            onResolutionTypeChange={onResolutionTypeChange}
            resolutionType={resolutionType}
            validationMessage={validationMessage}
          />
        </div>
      </aside>
    </>
  );
}
