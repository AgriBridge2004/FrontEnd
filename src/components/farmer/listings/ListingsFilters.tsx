"use client";

import { Grid2X2, List, Search } from "lucide-react";

import { cn } from "@/lib/cn";
import type { ListingStatusFilter, ListingsViewMode } from "@/components/farmer/listings/listings-types";

const statusTabs: ListingStatusFilter[] = ["All", "Active", "Expired", "Draft"];

type ListingsFiltersProps = {
  searchQuery: string;
  selectedStatus: ListingStatusFilter;
  viewMode: ListingsViewMode;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: ListingStatusFilter) => void;
  onViewModeChange: (viewMode: ListingsViewMode) => void;
};

export function ListingsFilters({
  searchQuery,
  selectedStatus,
  viewMode,
  onSearchChange,
  onStatusChange,
  onViewModeChange,
}: ListingsFiltersProps) {
  return (
    <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(220px,384px)_1fr_auto] xl:items-center">
      <div className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 shadow-sm">
        <Search className="size-4 shrink-0 text-slate-400" />
        <input
          className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search listings..."
          type="search"
          value={searchQuery}
        />
      </div>

      <div className="grid grid-cols-4 rounded-lg bg-slate-100 p-1 text-sm font-semibold text-slate-600">
        {statusTabs.map((tab) => (
          <button
            className={cn(
              "h-9 rounded-md px-2 transition sm:px-3",
              selectedStatus === tab ? "bg-white text-slate-950 shadow-sm" : "hover:text-emerald-800",
            )}
            key={tab}
            onClick={() => onStatusChange(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-semibold text-slate-600">
        <button
          className={cn(
            "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 transition",
            viewMode === "grid" ? "bg-white text-slate-950 shadow-sm" : "hover:text-emerald-800",
          )}
          onClick={() => onViewModeChange("grid")}
          type="button"
        >
          <Grid2X2 className="size-4" />
          Grid
        </button>
        <button
          className={cn(
            "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 transition",
            viewMode === "table" ? "bg-white text-slate-950 shadow-sm" : "hover:text-emerald-800",
          )}
          onClick={() => onViewModeChange("table")}
          type="button"
        >
          <List className="size-4" />
          Table
        </button>
      </div>
    </section>
  );
}
