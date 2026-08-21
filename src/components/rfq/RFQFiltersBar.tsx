"use client";

import { SlidersHorizontal } from "lucide-react";

import { RFQ_COMMODITY_OPTIONS, RFQ_REGION_OPTIONS, RFQ_STATUS_OPTIONS } from "@/components/rfq/rfq.mock";
import type { RFQFilters } from "@/components/rfq/rfq.types";
import { Select } from "@/components/ui/Select";

type RFQFiltersBarProps = {
  filters: RFQFilters;
  visibleCount: number;
  onFiltersChange: (filters: RFQFilters) => void;
};

export function RFQFiltersBar({ filters, visibleCount, onFiltersChange }: RFQFiltersBarProps) {
  function updateFilters(nextFilters: Partial<RFQFilters>) {
    onFiltersChange({ ...filters, ...nextFilters });
  }

  return (
    <section className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-3.5 shadow-sm">
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 text-[13px] font-black text-slate-700">
          <SlidersHorizontal className="size-3.5" />
          Filters:
        </div>

        <div className="grid flex-1 gap-2.5 sm:grid-cols-3">
          <Select
            aria-label="Commodity Type"
            className="h-9 rounded-lg bg-white text-[13px] text-emerald-900"
            onChange={(event) => updateFilters({ commodityType: event.target.value })}
            value={filters.commodityType}
          >
            {RFQ_COMMODITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "All Commodities" ? "Commodity Type" : option}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Status"
            className="h-9 rounded-lg bg-white text-[13px] text-emerald-900"
            onChange={(event) => updateFilters({ status: event.target.value })}
            value={filters.status}
          >
            {RFQ_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "All Statuses" ? "Status" : option}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Region"
            className="h-9 rounded-lg bg-white text-[13px] text-emerald-900"
            onChange={(event) => updateFilters({ region: event.target.value })}
            value={filters.region}
          >
            {RFQ_REGION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "All Regions" ? "Region" : option}
              </option>
            ))}
          </Select>
        </div>

        <p className="text-right text-[11px] font-black text-slate-600 lg:min-w-40">
          Showing {visibleCount} active requests
        </p>
      </div>
    </section>
  );
}
