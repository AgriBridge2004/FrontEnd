"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";

import { AdminDisputeStatusBadge } from "@/components/dashboard/admin/disputes/AdminDisputeStatusBadge";
import type {
  AdminDispute,
  AdminDisputeStatusFilter,
} from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { cn } from "@/lib/cn";

type AdminDisputesListProps = {
  disputes: AdminDispute[];
  onFilterChange: (value: AdminDisputeStatusFilter) => void;
  onSelectDispute: (dispute: AdminDispute) => void;
  selectedDisputeId: string;
  statusFilter: AdminDisputeStatusFilter;
};

export function AdminDisputesList({
  disputes,
  onFilterChange,
  onSelectDispute,
  selectedDisputeId,
  statusFilter,
}: AdminDisputesListProps) {
  return (
    <section className="min-w-0 rounded-lg border border-emerald-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <h2 className="flex items-center gap-2 text-[15px] font-black text-slate-950">
          Open Disputes
          <span className="grid size-5 place-items-center rounded-full bg-red-500 text-[11px] font-black text-white">6</span>
        </h2>
        <select
          className="h-8 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onFilterChange(event.target.value as AdminDisputeStatusFilter)}
          value={statusFilter}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="under-review">Under Review</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className="grid gap-4 p-4">
        {disputes.map((dispute) => {
          const isSelected = dispute.id === selectedDisputeId;

          return (
            <button
              className={cn(
                "rounded-lg border bg-white p-4 text-left transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md",
                isSelected ? "border-emerald-500 bg-emerald-50/30 shadow-sm" : "border-slate-200",
                dispute.status === "resolved" && !isSelected && "opacity-60",
              )}
              key={dispute.id}
              onClick={() => onSelectDispute(dispute)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-black text-slate-950">{dispute.disputeId}</p>
                <AdminDisputeStatusBadge status={dispute.status} />
              </div>
              <p className="mt-3 text-[11px] font-semibold text-slate-500">
                Opened by: {dispute.openedByRole} ({dispute.openedByName})
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="size-3.5" />
                  {dispute.openedDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  {dispute.openedAge}
                </span>
              </p>
              <p className="mt-3 text-[12px] font-black text-slate-800">
                Amount in Dispute: {dispute.amountInDispute.toLocaleString()} SAR
              </p>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4 text-[11px] font-medium text-slate-500">
        <span>Showing 1 to {disputes.length} of {disputes.length} disputes</span>
        <div className="flex items-center gap-1">
          <button className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400" type="button">
            <ChevronLeft className="size-4" />
          </button>
          <button className="grid size-8 place-items-center rounded-lg border border-emerald-200 bg-emerald-50 text-[12px] font-black text-emerald-800" type="button">
            1
          </button>
          <button className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400" type="button">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
