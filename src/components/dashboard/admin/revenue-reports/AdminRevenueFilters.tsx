"use client";

import { CalendarDays } from "lucide-react";

import type { RevenueCategoryFilter, RevenueDateRange } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.types";

type Props = {
  category: RevenueCategoryFilter;
  dateRange: RevenueDateRange;
  fromDate: string;
  onCategoryChange: (value: RevenueCategoryFilter) => void;
  onDateRangeChange: (value: RevenueDateRange) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  toDate: string;
};

export function AdminRevenueFilters({ category, dateRange, fromDate, onCategoryChange, onDateRangeChange, onFromDateChange, onToDateChange, toDate }: Props) {
  return (
    <section className="mt-7 grid gap-4 lg:grid-cols-4">
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">Date Range</span>
        <select className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none" onChange={(event) => onDateRangeChange(event.target.value as RevenueDateRange)} value={dateRange}>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
        </select>
      </label>
      <DateField label="From" onChange={onFromDateChange} value={fromDate} />
      <DateField label="To" onChange={onToDateChange} value={toDate} />
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">Product Category</span>
        <select className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none" onChange={(event) => onCategoryChange(event.target.value as RevenueCategoryFilter)} value={category}>
          <option value="all">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Herbs & Spices">Herbs & Spices</option>
          <option value="Dates">Dates</option>
          <option value="Oils">Oils</option>
        </select>
      </label>
    </section>
  );
}

function DateField({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
      <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
        <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onChange(event.target.value)} type="date" value={value} />
        <CalendarDays className="size-4 text-slate-400" />
      </span>
    </label>
  );
}
