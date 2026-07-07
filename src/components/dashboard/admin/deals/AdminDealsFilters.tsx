"use client";

import { CalendarDays, Package } from "lucide-react";

import type { AdminDealProductFilter, AdminDealStatusFilter } from "@/components/dashboard/admin/deals/admin-deals.types";

const statusOptions: Array<{ label: string; value: AdminDealStatusFilter }> = [
  { label: "All Statuses", value: "all" },
  { label: "Negotiating", value: "negotiating" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Under Inspection", value: "under-inspection" },
  { label: "Completed", value: "completed" },
  { label: "Disputed", value: "disputed" },
];

const productOptions: Array<{ label: string; value: AdminDealProductFilter }> = [
  { label: "All Products", value: "all" },
  { label: "Tomatoes", value: "Tomatoes" },
  { label: "Olive Oil", value: "Olive Oil" },
  { label: "Potatoes", value: "Potatoes" },
  { label: "Wheat", value: "Wheat" },
  { label: "Dates", value: "Dates" },
];

type AdminDealsFiltersProps = {
  dateRange: string;
  onApply: () => void;
  onDateRangeChange: (value: string) => void;
  onProductChange: (value: AdminDealProductFilter) => void;
  onReset: () => void;
  onStatusChange: (value: AdminDealStatusFilter) => void;
  product: AdminDealProductFilter;
  status: AdminDealStatusFilter;
};

export function AdminDealsFilters({
  dateRange,
  onApply,
  onDateRangeChange,
  onProductChange,
  onReset,
  onStatusChange,
  product,
  status,
}: AdminDealsFiltersProps) {
  return (
    <section className="mt-5 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="grid gap-3 lg:grid-cols-[minmax(180px,1fr)_minmax(220px,1fr)_minmax(190px,1fr)_auto_auto] lg:items-end">
        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">Deal Status</span>
          <select
            className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
            onChange={(event) => onStatusChange(event.target.value as AdminDealStatusFilter)}
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
          <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">Date Range</span>
          <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-700/10">
            <CalendarDays className="size-4 shrink-0 text-slate-400" />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none"
              onChange={(event) => onDateRangeChange(event.target.value)}
              value={dateRange}
            />
          </span>
        </label>

        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-wide text-slate-500">Product / Category</span>
          <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-700 transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-700/10">
            <Package className="size-4 shrink-0 text-slate-400" />
            <select
              className="min-w-0 flex-1 bg-transparent text-[13px] font-semibold outline-none"
              onChange={(event) => onProductChange(event.target.value as AdminDealProductFilter)}
              value={product}
            >
              {productOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          className="h-10 rounded-lg border border-slate-200 bg-white px-5 text-[13px] font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 hover:shadow-md"
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
        <button
          className="h-10 rounded-lg bg-emerald-800 px-5 text-[13px] font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:shadow-md"
          onClick={onApply}
          type="button"
        >
          Apply Filters
        </button>
      </div>
    </section>
  );
}
