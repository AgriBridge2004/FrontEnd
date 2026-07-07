"use client";

import { MapPin, Plus, Search } from "lucide-react";

import type { CoverageAreaFilter } from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";

type AdminQualityOfficerFiltersProps = {
  coverageArea: CoverageAreaFilter;
  onAddOfficer: () => void;
  onCoverageAreaChange: (value: CoverageAreaFilter) => void;
  onSearchChange: (value: string) => void;
  searchQuery: string;
};

const coverageOptions: CoverageAreaFilter[] = ["all", "Al Ahsa", "Riyadh", "Jeddah", "Dammam", "Abha"];

export function AdminQualityOfficerFilters({
  coverageArea,
  onAddOfficer,
  onCoverageAreaChange,
  onSearchChange,
  searchQuery,
}: AdminQualityOfficerFiltersProps) {
  return (
    <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="grid gap-3 lg:grid-cols-[200px_minmax(240px,1fr)_auto]">
        <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-[13px] font-semibold text-slate-700">
          <MapPin className="size-4 shrink-0 text-slate-400" />
          <select
            className="min-w-0 flex-1 bg-transparent outline-none"
            onChange={(event) => onCoverageAreaChange(event.target.value as CoverageAreaFilter)}
            value={coverageArea}
          >
            {coverageOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All Coverage Areas" : option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-[13px] font-semibold text-slate-700">
          <Search className="size-4 shrink-0 text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or phone..."
            value={searchQuery}
          />
        </label>
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 text-[13px] font-black text-white shadow-sm transition hover:bg-emerald-900"
          onClick={onAddOfficer}
          type="button"
        >
          <Plus className="size-4" />
          Add Quality Officer
        </button>
      </div>
    </section>
  );
}
