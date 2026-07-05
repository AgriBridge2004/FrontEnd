"use client";

import { Download, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/cn";

type ReportsPeriod = "Last 30 Days" | "Q3 2024";

type QualityOfficerReportsHeaderProps = {
  activePeriod: ReportsPeriod;
  onExport: () => void;
  onFilter: () => void;
  onPeriodChange: (period: ReportsPeriod) => void;
};

const periods: ReportsPeriod[] = ["Last 30 Days", "Q3 2024"];

export function QualityOfficerReportsHeader({
  activePeriod,
  onExport,
  onFilter,
  onPeriodChange,
}: QualityOfficerReportsHeaderProps) {
  return (
    <header className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-950">
          Reports & Analytics
        </h1>
        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Real-time enterprise intelligence for quality and compliance.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="inline-flex h-9 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          {periods.map((period) => (
            <button
              className={cn(
                "rounded-md px-3.5 text-xs font-black transition",
                activePeriod === period
                  ? "bg-emerald-50 text-emerald-900 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900",
              )}
              key={period}
              onClick={() => onPeriodChange(period)}
              type="button"
            >
              {period}
            </button>
          ))}
        </div>

        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-black text-slate-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900"
          onClick={onFilter}
          type="button"
        >
          <SlidersHorizontal className="size-3.5" />
          More Filters
        </button>

        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-3.5 text-xs font-black text-white shadow-sm transition hover:bg-emerald-900"
          onClick={onExport}
          type="button"
        >
          <Download className="size-3.5" />
          Export Report
        </button>
      </div>
    </header>
  );
}
