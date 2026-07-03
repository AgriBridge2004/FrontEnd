"use client";

import { ChevronLeft, ChevronRight, Download, Eye, Filter } from "lucide-react";

import type {
  BuyerDisputeCase,
  BuyerDisputePriority,
  BuyerDisputeStatus,
  BuyerDisputeTab,
} from "@/components/dashboard/buyer/disputes/buyer-disputes.types";
import { cn } from "@/lib/cn";

type BuyerDisputesCasesTableProps = {
  cases: BuyerDisputeCase[];
  currentPage: number;
  onExport: () => void;
  onFilter: () => void;
  onPageChange: (page: number) => void;
  onTabChange: (tab: BuyerDisputeTab) => void;
  onViewCase: (disputeCase: BuyerDisputeCase) => void;
  selectedTab: BuyerDisputeTab;
  totalFilteredItems: number;
  totalItems: number;
  totalPages: number;
};

const tabs: Array<{ label: string; value: BuyerDisputeTab }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Resolved", value: "resolved" },
];

const statusStyles: Record<BuyerDisputeStatus, string> = {
  "under-review": "bg-red-50 text-red-700 ring-red-100",
  mediation: "bg-slate-100 text-slate-700 ring-slate-200",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const statusDots: Record<BuyerDisputeStatus, string> = {
  "under-review": "bg-red-600",
  mediation: "bg-slate-500",
  resolved: "bg-emerald-600",
};

const priorityStyles: Record<BuyerDisputePriority, string> = {
  urgent: "text-red-700 underline decoration-red-300 underline-offset-4",
  high: "text-red-700",
  medium: "text-slate-700",
  low: "text-emerald-700",
};

function formatStatus(status: BuyerDisputeStatus) {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPriority(priority: BuyerDisputePriority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function BuyerDisputesCasesTable({
  cases,
  currentPage,
  onExport,
  onFilter,
  onPageChange,
  onTabChange,
  onViewCase,
  selectedTab,
  totalFilteredItems,
  totalItems,
  totalPages,
}: BuyerDisputesCasesTableProps) {
  const startItem = totalFilteredItems === 0 ? 0 : (currentPage - 1) * 4 + 1;
  const endItem = Math.min(currentPage * 4, totalFilteredItems);
  const visiblePages = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex flex-col gap-3 border-b border-emerald-100 px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <h2 className="text-lg font-black text-slate-950">Recent Cases</h2>
          <div className="inline-flex w-fit rounded-lg border border-slate-200 bg-slate-50 p-1">
            {tabs.map((tab) => (
              <button
                className={cn(
                  "h-6 rounded-md px-3 text-xs font-black transition",
                  selectedTab === tab.value ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600 hover:text-emerald-800",
                )}
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            onClick={onFilter}
            type="button"
          >
            <Filter className="size-4" />
            Filter
          </button>
          <button
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            onClick={onExport}
            type="button"
          >
            <Download className="size-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-5 py-3.5">Case ID</th>
              <th className="px-5 py-3.5">Contract & Merchant</th>
              <th className="px-5 py-3.5">Dispute Reason</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {cases.map((disputeCase) => (
              <tr className="transition hover:bg-emerald-50/20" key={disputeCase.id}>
                <td className="px-5 py-4 font-mono text-xs font-black text-emerald-800">{disputeCase.id}</td>
                <td className="px-5 py-4">
                  <p className="font-black leading-5 text-slate-950">{disputeCase.contractTitle}</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    ID: {disputeCase.contractId} • {disputeCase.merchant}
                  </p>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700">{disputeCase.reason}</td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ring-1", statusStyles[disputeCase.status])}>
                    <span className={cn("size-1.5 rounded-full", statusDots[disputeCase.status])} />
                    {formatStatus(disputeCase.status)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={cn("text-xs font-black uppercase", priorityStyles[disputeCase.priority])}>
                    {formatPriority(disputeCase.priority)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    aria-label={`View ${disputeCase.id}`}
                    className="grid size-8 place-items-center rounded-full text-emerald-800 transition hover:bg-emerald-50 hover:text-emerald-950"
                    onClick={() => onViewCase(disputeCase)}
                    type="button"
                  >
                    <Eye className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-emerald-100 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-700">
          Showing {startItem}-{endItem} of {totalItems} cases
        </p>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Previous disputes page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={currentPage === 1 || totalFilteredItems === 0}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          {visiblePages.map((page) => (
            <button
              className={cn(
                "grid size-8 place-items-center rounded-lg border text-sm font-black transition",
                page === currentPage
                  ? "border-emerald-900 bg-emerald-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-emerald-50",
              )}
              key={page}
              onClick={() => onPageChange(page)}
              type="button"
            >
              {page}
            </button>
          ))}
          <button
            aria-label="Next disputes page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={currentPage === totalPages || totalFilteredItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
