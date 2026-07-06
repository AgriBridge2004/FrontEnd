"use client";

import type { ReactNode } from "react";
import { Download, Search, SlidersHorizontal } from "lucide-react";

import type { AdminUserRoleFilter, AdminUserStatusFilter } from "@/components/dashboard/admin/users/admin-users.types";
import { cn } from "@/lib/cn";

type AdminUserFiltersProps = {
  hasSelectedUsers: boolean;
  onBulkVerification: () => void;
  onDisableSelected: () => void;
  onExport: () => void;
  onFilters: () => void;
  onRoleChange: (value: AdminUserRoleFilter) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdminUserStatusFilter) => void;
  role: AdminUserRoleFilter;
  searchQuery: string;
  status: AdminUserStatusFilter;
};

export function AdminUserFilters({
  hasSelectedUsers,
  onBulkVerification,
  onDisableSelected,
  onExport,
  onFilters,
  onRoleChange,
  onSearchChange,
  onStatusChange,
  role,
  searchQuery,
  status,
}: AdminUserFiltersProps) {
  return (
    <section className="mt-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(280px,1fr)_156px_156px_auto_auto]">
        <label className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 shadow-sm">
          <Search className="size-4 text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search users by name, verified ID, email or phone..."
            value={searchQuery}
          />
        </label>
        <Select value={role} onChange={(value) => onRoleChange(value as AdminUserRoleFilter)}>
          <option value="all">All Roles</option>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="quality-officer">Quality Officer</option>
          <option value="admin">Admin</option>
        </Select>
        <Select value={status} onChange={(value) => onStatusChange(value as AdminUserStatusFilter)}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending-verification">Pending Verification</option>
          <option value="suspended">Suspended</option>
          <option value="disabled">Disabled</option>
        </Select>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-600 shadow-sm hover:bg-emerald-50/30" onClick={onFilters} type="button">
          <SlidersHorizontal className="size-4" />
          Filters
        </button>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-600 shadow-sm hover:bg-emerald-50/30" onClick={onExport} type="button">
          <Download className="size-4" />
          Export
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-[12px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-black uppercase tracking-[0.18em] text-slate-400">Total Users (1,248)</span>
          <button
            className={cn(
              "rounded-lg px-3 py-1.5 text-[11px] font-black",
              hasSelectedUsers ? "bg-slate-100 text-slate-500 hover:bg-emerald-50/50" : "cursor-not-allowed bg-slate-50 text-slate-300",
            )}
            disabled={!hasSelectedUsers}
            onClick={onBulkVerification}
            type="button"
          >
            Bulk Verification
          </button>
          <button
            className={cn(
              "rounded-lg px-3 py-1.5 text-[11px] font-black",
              hasSelectedUsers ? "bg-red-50 text-red-600 hover:bg-red-100/70" : "cursor-not-allowed bg-slate-50 text-slate-300",
            )}
            disabled={!hasSelectedUsers}
            onClick={onDisableSelected}
            type="button"
          >
            Disable Selected
          </button>
        </div>
        <p className="font-medium text-slate-500">
          Sort by: <span className="font-black text-slate-900">Registration Date desc</span>
        </p>
      </div>
    </section>
  );
}

function Select({ children, onChange, value }: { children: ReactNode; onChange: (value: string) => void; value: string }) {
  return (
    <select
      className="h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-[13px] font-bold text-slate-600 shadow-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {children}
    </select>
  );
}
