"use client";

import type { ReactNode } from "react";
import { CalendarDays, RefreshCw, SlidersHorizontal } from "lucide-react";

import type {
  AdminListingCategoryFilter,
  AdminListingFarmerFilter,
  AdminListingStatusFilter,
} from "@/components/dashboard/admin/listings/admin-listings.types";

type AdminListingsFiltersProps = {
  category: AdminListingCategoryFilter;
  endDate: string;
  farmer: AdminListingFarmerFilter;
  onApplyFilters: () => void;
  onCategoryChange: (value: AdminListingCategoryFilter) => void;
  onEndDateChange: (value: string) => void;
  onFarmerChange: (value: AdminListingFarmerFilter) => void;
  onReset: () => void;
  onStartDateChange: (value: string) => void;
  onStatusChange: (value: AdminListingStatusFilter) => void;
  startDate: string;
  status: AdminListingStatusFilter;
};

export function AdminListingsFilters({
  category,
  endDate,
  farmer,
  onApplyFilters,
  onCategoryChange,
  onEndDateChange,
  onFarmerChange,
  onReset,
  onStartDateChange,
  onStatusChange,
  startDate,
  status,
}: AdminListingsFiltersProps) {
  return (
    <section className="mt-6 grid gap-3 lg:grid-cols-[145px_160px_160px_150px_150px_auto_auto]">
      <FilterSelect label="Status" onChange={(value) => onStatusChange(value as AdminListingStatusFilter)} value={status}>
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="pending-review">Pending Review</option>
        <option value="flagged">Flagged</option>
        <option value="removed">Removed</option>
      </FilterSelect>
      <FilterSelect label="Category" onChange={(value) => onCategoryChange(value as AdminListingCategoryFilter)} value={category}>
        <option value="all">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Grains">Grains</option>
        <option value="Dates">Dates</option>
        <option value="Oils">Oils</option>
      </FilterSelect>
      <FilterSelect label="Farmer" onChange={(value) => onFarmerChange(value as AdminListingFarmerFilter)} value={farmer}>
        <option value="all">All Farmers</option>
        <option value="Omar Hassan">Omar Hassan</option>
        <option value="Ahmed Darwish">Ahmed Darwish</option>
        <option value="Sami Abdullah">Sami Abdullah</option>
        <option value="Khaled Nasser">Khaled Nasser</option>
      </FilterSelect>
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Start Date</span>
        <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
          <CalendarDays className="size-4 text-slate-500" />
          <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onStartDateChange(event.target.value)} type="date" value={startDate} />
        </span>
      </label>
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">End Date</span>
        <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
          <CalendarDays className="size-4 text-slate-500" />
          <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onEndDateChange(event.target.value)} type="date" value={endDate} />
        </span>
      </label>
      <button className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:bg-emerald-50/30" onClick={onApplyFilters} type="button">
        <SlidersHorizontal className="size-4" />
        Filters
      </button>
      <button className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-black text-slate-500 transition hover:bg-emerald-50/30" onClick={onReset} type="button">
        <RefreshCw className="size-4" />
        Reset
      </button>
    </section>
  );
}

function FilterSelect({ children, label, onChange, value }: { children: ReactNode; label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</span>
      <select className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-800/10" onChange={(event) => onChange(event.target.value)} value={value}>
        {children}
      </select>
    </label>
  );
}
