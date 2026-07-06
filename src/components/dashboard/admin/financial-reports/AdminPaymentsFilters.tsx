"use client";

import { CalendarDays, RefreshCw, Search, SlidersHorizontal } from "lucide-react";

import type { AdminPaymentStatusFilter } from "@/components/dashboard/admin/financial-reports/admin-payments.types";

type AdminPaymentsFiltersProps = {
  endDate: string;
  onApply: () => void;
  onEndDateChange: (value: string) => void;
  onReset: () => void;
  onSearchChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onStatusChange: (value: AdminPaymentStatusFilter) => void;
  searchQuery: string;
  startDate: string;
  status: AdminPaymentStatusFilter;
};

export function AdminPaymentsFilters({ endDate, onApply, onEndDateChange, onReset, onSearchChange, onStartDateChange, onStatusChange, searchQuery, startDate, status }: AdminPaymentsFiltersProps) {
  return (
    <section className="mt-5 grid gap-3 lg:grid-cols-[150px_150px_150px_minmax(240px,1fr)_auto_auto]">
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Status</span>
        <select className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none" onChange={(event) => onStatusChange(event.target.value as AdminPaymentStatusFilter)} value={status}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="released">Released</option>
          <option value="refunded">Refunded</option>
          <option value="frozen">Frozen</option>
          <option value="failed">Failed</option>
        </select>
      </label>
      <DateInput label="Start Date" onChange={onStartDateChange} value={startDate} />
      <DateInput label="End Date" onChange={onEndDateChange} value={endDate} />
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Search</span>
        <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
          <Search className="size-4 text-slate-400" />
          <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" onChange={(event) => onSearchChange(event.target.value)} placeholder="Search by Deal ID or User Name..." value={searchQuery} />
        </span>
      </label>
      <button className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:bg-emerald-50/30" onClick={onApply} type="button">
        <SlidersHorizontal className="size-4" />
        Filters
      </button>
      <button className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:bg-emerald-50/30" onClick={onReset} type="button">
        <RefreshCw className="size-4" />
        Reset
      </button>
    </section>
  );
}

function DateInput({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</span>
      <span className="mt-1 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
        <CalendarDays className="size-4 text-slate-400" />
        <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onChange(event.target.value)} type="date" value={value} />
      </span>
    </label>
  );
}
