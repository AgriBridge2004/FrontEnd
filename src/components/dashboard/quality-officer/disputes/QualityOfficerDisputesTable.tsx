"use client";

import { AlertTriangle, Clock3, Eye, MoreVertical } from "lucide-react";

import type {
  DisputeRecord,
  DisputeStatus,
  DisputeTab,
} from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type QualityOfficerDisputesTableProps = {
  activeTab: DisputeTab;
  disputes: DisputeRecord[];
  onActionClick: () => void;
  onTabChange: (tab: DisputeTab) => void;
  onViewClick: () => void;
};

const tabs: Array<{ label: string; value: DisputeTab }> = [
  { label: "All Disputes", value: "all" },
  { label: "Pending Investigation", value: "pending-investigation" },
  { label: "Mediation", value: "mediation" },
  { label: "Resolved", value: "resolved" },
  { label: "Appealed", value: "appealed" },
];

const statusLabels: Record<DisputeStatus, string> = {
  appealed: "Appealed",
  escalated: "Escalated",
  "in-investigation": "In Investigation",
  mediation: "Mediation",
  resolved: "Resolved",
};

const statusClasses: Record<DisputeStatus, string> = {
  appealed: "bg-blue-50 text-blue-700",
  escalated: "bg-red-50 text-red-600",
  "in-investigation": "bg-orange-100 text-orange-700",
  mediation: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
};

export function QualityOfficerDisputesTable({
  activeTab,
  disputes,
  onActionClick,
  onTabChange,
  onViewClick,
}: QualityOfficerDisputesTableProps) {
  return (
    <DashboardCard className="min-w-0 overflow-hidden">
      <div className="border-b border-emerald-100 px-5">
        <div className="flex gap-7 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              className={cn(
                "relative h-11 shrink-0 whitespace-nowrap px-1 text-sm font-semibold transition",
                activeTab === tab.value ? "text-emerald-900" : "text-slate-600 hover:text-emerald-800",
              )}
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              type="button"
            >
              {tab.label}
              {activeTab === tab.value ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-800" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] table-fixed text-left 2xl:min-w-0">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[13%]" />
            <col className="w-[22%]" />
            <col className="w-[12%]" />
            <col className="w-[13%]" />
            <col className="w-[14%]" />
            <col className="w-[6%]" />
          </colgroup>
          <thead className="bg-stone-50 text-[10px] font-black uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-3 py-2.5">Dispute ID & Reason</th>
              <th className="px-3 py-2.5">Contract Ref</th>
              <th className="px-3 py-2.5">Parties Involved</th>
              <th className="px-3 py-2.5">Last Updated</th>
              <th className="px-3 py-2.5">Deadline</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100 text-xs text-slate-800">
            {disputes.map((dispute) => (
              <tr className="transition hover:bg-emerald-50/30" key={dispute.id}>
                <td className="px-3 py-4 align-middle">
                  <p className="break-words text-[15px] font-black leading-snug text-emerald-900">{dispute.id}</p>
                  <p className="mt-1 break-words font-medium leading-snug text-slate-800">{dispute.reason}</p>
                </td>
                <td className="px-3 py-4 align-middle">
                  <span className="inline-flex max-w-full break-words rounded bg-slate-100 px-2 py-1.5 font-medium leading-snug text-slate-700">
                    {dispute.contractRef}
                  </span>
                </td>
                <td className="px-3 py-4 align-middle">
                  <div className="space-y-1 leading-snug">
                    <p className="break-words">
                      <span className="font-black text-slate-950">Buyer:</span> {dispute.buyer}
                    </p>
                    <p className="break-words">
                      <span className="font-black text-slate-950">Farmer:</span> {dispute.farmer}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-4 align-middle font-medium leading-snug">{dispute.lastUpdated}</td>
                <td className="px-3 py-4 align-middle">
                  <DeadlineBadge deadline={dispute.deadline} state={dispute.deadlineState} />
                </td>
                <td className="px-3 py-4 align-middle">
                  <span className={cn("inline-flex whitespace-normal rounded-full px-2.5 py-1 text-[11px] font-black leading-tight", statusClasses[dispute.status])}>
                    {statusLabels[dispute.status]}
                  </span>
                </td>
                <td className="px-3 py-4 align-middle">
                  <div className="flex justify-center gap-1">
                    <button
                      aria-label={`View ${dispute.id}`}
                      className="grid size-7 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-900"
                      onClick={onViewClick}
                      type="button"
                    >
                      <Eye className="size-3.5" />
                    </button>
                    <button
                      aria-label={`More actions for ${dispute.id}`}
                      className="grid size-7 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-900"
                      onClick={onActionClick}
                      type="button"
                    >
                      <MoreVertical className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

function DeadlineBadge({ deadline, state }: { deadline: string; state: DisputeRecord["deadlineState"] }) {
  if (state === "none") {
    return <span className="text-base font-semibold text-slate-500">-</span>;
  }

  const Icon = state === "expired" ? AlertTriangle : Clock3;

  return (
    <span className={cn("inline-flex items-center gap-1 break-words font-black leading-snug", state === "expired" ? "text-red-600" : "text-orange-600")}>
      <Icon className="size-3.5 shrink-0" />
      {deadline}
    </span>
  );
}
