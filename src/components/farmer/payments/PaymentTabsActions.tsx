"use client";

import { ArrowUpDown, Download, Filter } from "lucide-react";

import type { PaymentStatusFilter } from "@/components/farmer/payments/payments.mock";
import { paymentTabs } from "@/components/farmer/payments/payments.mock";
import { cn } from "@/lib/cn";

type PaymentTabsActionsProps = {
  selectedStatus: PaymentStatusFilter;
  sortMode: "date" | "amount";
  notice: string;
  onExport: () => void;
  onFilterClick: () => void;
  onSortToggle: () => void;
  onStatusChange: (status: PaymentStatusFilter) => void;
};

export function PaymentTabsActions({
  selectedStatus,
  sortMode,
  notice,
  onExport,
  onFilterClick,
  onSortToggle,
  onStatusChange,
}: PaymentTabsActionsProps) {
  return (
    <section className="mt-8 border-b border-emerald-100 pb-2">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {paymentTabs.map((tab) => (
            <button
              className={cn(
                "relative inline-flex items-center gap-2 pb-3 text-sm font-black transition",
                selectedStatus === tab.label ? "text-emerald-800" : "text-slate-600 hover:text-emerald-800",
              )}
              key={tab.label}
              onClick={() => onStatusChange(tab.label)}
              type="button"
            >
              {tab.label}
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-black text-slate-500">{tab.count}</span>
              {selectedStatus === tab.label ? <span className="absolute inset-x-0 bottom-[-9px] h-0.5 bg-emerald-800" /> : null}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50" onClick={onSortToggle} type="button">
            <ArrowUpDown className="size-4" />
            Sort: {sortMode === "date" ? "Date" : "Amount"}
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50" onClick={onFilterClick} type="button">
            <Filter className="size-4" />
            Filter
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50" onClick={onExport} type="button">
            <Download className="size-4" />
            Export
          </button>
        </div>
      </div>
      {notice ? <p className="mt-3 text-xs font-semibold text-emerald-700">{notice}</p> : null}
    </section>
  );
}
