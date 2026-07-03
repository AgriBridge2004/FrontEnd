"use client";

import { Calendar, RotateCcw, Search } from "lucide-react";

import type { BuyerDealStatus, BuyerDealStatusFilter } from "@/components/dashboard/buyer/deals/buyer-deals.types";
import { cn } from "@/lib/cn";

const statusTabs: Array<{ label: string; status: BuyerDealStatusFilter; count: number }> = [
  { count: 10, label: "All", status: "all" },
  { count: 4, label: "Active", status: "active" },
  { count: 2, label: "Awaiting", status: "awaiting" },
  { count: 128, label: "Completed", status: "completed" },
  { count: 1, label: "Cancelled", status: "cancelled" },
  { count: 0, label: "Refunded", status: "refunded" },
];

const farmers = ["All Farmers", "Green Kitchen", "Food Factory", "Golden Fields", "Fresh Mart"];

const statusOptions: Array<{ label: string; value: "all" | BuyerDealStatus }> = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Awaiting", value: "awaiting" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refunded", value: "refunded" },
];

type BuyerDealsFiltersProps = {
  farmerFilter: string;
  onDateClick: () => void;
  onFarmerFilterChange: (value: string) => void;
  onReset: () => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: BuyerDealStatusFilter) => void;
  onStatusTabChange: (value: BuyerDealStatusFilter) => void;
  searchQuery: string;
  selectedTab: BuyerDealStatusFilter;
  statusFilter: BuyerDealStatusFilter;
};

export function BuyerDealsFilters({
  farmerFilter,
  onDateClick,
  onFarmerFilterChange,
  onReset,
  onSearchChange,
  onStatusFilterChange,
  onStatusTabChange,
  searchQuery,
  selectedTab,
  statusFilter,
}: BuyerDealsFiltersProps) {
  return (
    <section className="mt-7">
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            className={cn(
              "inline-flex h-10 items-center gap-1 rounded-full border px-4 text-sm font-semibold transition",
              selectedTab === tab.status
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-700",
            )}
            key={tab.status}
            onClick={() => onStatusTabChange(tab.status)}
            type="button"
          >
            {tab.label}
            <span className={selectedTab === tab.status ? "text-emerald-500" : "text-slate-400"}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-2 lg:grid-cols-[minmax(220px,1fr)_180px_180px_auto_auto]">
        <div className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 shadow-sm">
          <Search className="size-4 shrink-0 text-slate-400" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search deals..."
            type="search"
            value={searchQuery}
          />
        </div>

        <select
          className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onFarmerFilterChange(event.target.value)}
          value={farmerFilter}
        >
          {farmers.map((farmer) => (
            <option key={farmer} value={farmer}>
              {farmer}
            </option>
          ))}
        </select>

        <select
          className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onStatusFilterChange(event.target.value as BuyerDealStatusFilter)}
          value={statusFilter}
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <button
          aria-label="Date filter"
          className="grid h-10 min-w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onDateClick}
          type="button"
        >
          <Calendar className="size-4" />
        </button>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-500 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onReset}
          type="button"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>
    </section>
  );
}
