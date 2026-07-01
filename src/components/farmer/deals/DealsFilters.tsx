"use client";

import { Search } from "lucide-react";

import type { DealStatusFilter } from "@/components/farmer/deals/deals-types";
import { cn } from "@/lib/cn";

const statusTabs: Array<{ label: DealStatusFilter; count: number }> = [
  { label: "All", count: 12 },
  { label: "Active", count: 5 },
  { label: "Pending", count: 2 },
  { label: "Completed", count: 156 },
  { label: "Disputed", count: 1 },
  { label: "Cancelled", count: 1 },
];

type DealsFiltersProps = {
  searchQuery: string;
  selectedStatus: DealStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: DealStatusFilter) => void;
};

export function DealsFilters({ searchQuery, selectedStatus, onSearchChange, onStatusChange }: DealsFiltersProps) {
  return (
    <section className="mt-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap gap-2 xl:flex-1">
        {statusTabs.map((tab) => (
            <button
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-full border px-4 text-sm font-semibold transition",
                selectedStatus === tab.label
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-700",
              )}
              key={tab.label}
              onClick={() => onStatusChange(tab.label)}
              type="button"
            >
              {tab.label}
              <span className={selectedStatus === tab.label ? "text-emerald-500" : "text-slate-400"}>{tab.count}</span>
            </button>
          ))}
        </div>

      <div className="flex h-10 w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 shadow-sm sm:max-w-[340px] xl:ml-4">
        <Search className="size-4 shrink-0 text-slate-400" />
        <input
          className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search deals..."
          type="search"
          value={searchQuery}
        />
      </div>
    </section>
  );
}
