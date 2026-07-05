"use client";

import { CalendarDays, Search, SlidersHorizontal } from "lucide-react";

import type {
  AssignmentStatus,
  AssignmentTimeFilter,
} from "@/components/dashboard/quality-officer/assignments/quality-officer-assignments.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type QualityOfficerAssignmentsFiltersProps = {
  searchQuery: string;
  statusFilter: "all" | AssignmentStatus;
  timeFilter: AssignmentTimeFilter;
  onFilterClick: () => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "all" | AssignmentStatus) => void;
  onTimeChange: (value: AssignmentTimeFilter) => void;
};

export function QualityOfficerAssignmentsFilters({
  onFilterClick,
  onSearchChange,
  onStatusChange,
  onTimeChange,
  searchQuery,
  statusFilter,
  timeFilter,
}: QualityOfficerAssignmentsFiltersProps) {
  // TODO: Connect assignment filters to API.
  return (
    <DashboardCard className="mt-6 p-3.5">
      <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_180px_180px_108px]">
        <label className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500">
          <input
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-500"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by Deal ID, Farm, Product, Buyer..."
            type="search"
            value={searchQuery}
          />
          <Search className="size-3.5 shrink-0" />
        </label>

        <select
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-700 outline-none"
          onChange={(event) => onStatusChange(event.target.value as "all" | AssignmentStatus)}
          value={statusFilter}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>

        <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
          <select
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none"
            onChange={(event) => onTimeChange(event.target.value as AssignmentTimeFilter)}
            value={timeFilter}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="overdue-only">Overdue Only</option>
          </select>
          <CalendarDays className="size-3.5 shrink-0 text-slate-500" />
        </label>

        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onFilterClick}
          type="button"
        >
          <SlidersHorizontal className="size-3.5" />
          Filters
        </button>
      </div>
    </DashboardCard>
  );
}
