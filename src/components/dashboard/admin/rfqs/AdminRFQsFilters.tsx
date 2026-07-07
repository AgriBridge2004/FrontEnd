"use client";

import { CalendarDays, SlidersHorizontal } from "lucide-react";

import type { AdminRFQCategoryFilter, AdminRFQStatusFilter } from "@/components/dashboard/admin/rfqs/admin-rfqs.types";

const statusOptions: Array<{ label: string; value: AdminRFQStatusFilter }> = [
  { label: "All Statuses", value: "all" },
  { label: "Pending Farmer Response", value: "pending-farmer-response" },
  { label: "Quoted", value: "quoted" },
  { label: "Accepted", value: "accepted" },
  { label: "Expired", value: "expired" },
  { label: "Rejected", value: "rejected" },
  { label: "Flagged for Review", value: "flagged-for-review" },
];

const categoryOptions: Array<{ label: string; value: AdminRFQCategoryFilter }> = [
  { label: "All Categories", value: "all" },
  { label: "Vegetables", value: "Vegetables" },
  { label: "Fruits", value: "Fruits" },
  { label: "Grains", value: "Grains" },
  { label: "Oils", value: "Oils" },
  { label: "Dates", value: "Dates" },
];

type AdminRFQsFiltersProps = {
  category: AdminRFQCategoryFilter;
  dateRange: string;
  onCategoryChange: (value: AdminRFQCategoryFilter) => void;
  onDateRangeChange: (value: string) => void;
  onMoreFilters: () => void;
  onReset: () => void;
  onStatusChange: (value: AdminRFQStatusFilter) => void;
  status: AdminRFQStatusFilter;
};

export function AdminRFQsFilters({
  category,
  dateRange,
  onCategoryChange,
  onDateRangeChange,
  onMoreFilters,
  onReset,
  onStatusChange,
  status,
}: AdminRFQsFiltersProps) {
  return (
    <section className="mt-5 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="grid gap-3 lg:grid-cols-[minmax(190px,1fr)_minmax(230px,1.15fr)_minmax(190px,1fr)_auto_auto] lg:items-end">
        <label className="block">
          <span className="text-[12px] font-semibold text-slate-500">RFQ Status</span>
          <select
            className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
            onChange={(event) => onStatusChange(event.target.value as AdminRFQStatusFilter)}
            value={status}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[12px] font-semibold text-slate-500">Date Range</span>
          <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-700/10">
            <CalendarDays className="size-4 shrink-0 text-slate-400" />
            <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onDateRangeChange(event.target.value)} value={dateRange} />
          </span>
        </label>

        <label className="block">
          <span className="text-[12px] font-semibold text-slate-500">Product Category</span>
          <select
            className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
            onChange={(event) => onCategoryChange(event.target.value as AdminRFQCategoryFilter)}
            value={category}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 hover:shadow-md"
          onClick={onMoreFilters}
          type="button"
        >
          More Filters
          <SlidersHorizontal className="size-4" />
        </button>
        <button
          className="h-10 px-3 text-[13px] font-bold text-slate-400 transition hover:text-emerald-800"
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
