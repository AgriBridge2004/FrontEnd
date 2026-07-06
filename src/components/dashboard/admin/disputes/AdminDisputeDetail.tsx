"use client";

import { AdminDisputeCommunicationLog } from "@/components/dashboard/admin/disputes/AdminDisputeCommunicationLog";
import { AdminDisputeDealSummary } from "@/components/dashboard/admin/disputes/AdminDisputeDealSummary";
import { AdminDisputeEvidenceCarousel } from "@/components/dashboard/admin/disputes/AdminDisputeEvidenceCarousel";
import { AdminDisputeInspectionReportCard } from "@/components/dashboard/admin/disputes/AdminDisputeInspectionReportCard";
import { AdminDisputeStatusBadge } from "@/components/dashboard/admin/disputes/AdminDisputeStatusBadge";
import type { AdminDispute } from "@/components/dashboard/admin/disputes/admin-disputes.types";

type AdminDisputeDetailProps = {
  dispute: AdminDispute;
  isNewestFirst: boolean;
  onEvidenceClick: () => void;
  onToggleEvidenceOrder: () => void;
  onViewAllCommunication: () => void;
  onViewFullReport: () => void;
  onViewReport: () => void;
};

export function AdminDisputeDetail({
  dispute,
  isNewestFirst,
  onEvidenceClick,
  onToggleEvidenceOrder,
  onViewAllCommunication,
  onViewFullReport,
  onViewReport,
}: AdminDisputeDetailProps) {
  return (
    <section className="min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500">Dispute Detail</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h2 className="text-[24px] font-black leading-tight text-slate-950">Deal ID: {dispute.dealId}</h2>
            <AdminDisputeStatusBadge status={dispute.status} />
          </div>
        </div>
        <p className="text-left text-[11px] font-medium leading-4 text-slate-500 sm:text-right">
          Opened: {dispute.openedAt}
          <br />
          {dispute.openedAge}
        </p>
      </div>

      <div className="mt-5 space-y-6">
        <AdminDisputeDealSummary dispute={dispute} />
        <AdminDisputeEvidenceCarousel
          dispute={dispute}
          isNewestFirst={isNewestFirst}
          onEvidenceClick={onEvidenceClick}
          onToggleOrder={onToggleEvidenceOrder}
        />
        <div className="grid gap-6 xl:grid-cols-2">
          <AdminDisputeInspectionReportCard dispute={dispute} onViewFullReport={onViewFullReport} onViewReport={onViewReport} />
          <AdminDisputeCommunicationLog dispute={dispute} onViewAll={onViewAllCommunication} />
        </div>
      </div>
    </section>
  );
}
