"use client";

import { CalendarDays, ChevronDown, Download } from "lucide-react";

type Props = {
  onExportExcel: () => void;
  onExportPdf: () => void;
};

export function AdminRevenueReportsHeader({ onExportExcel, onExportPdf }: Props) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-950">Revenue & Reports</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Track platform financial performance and revenue insights.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="group relative">
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-emerald-50/30" type="button">
            <Download className="size-4 text-emerald-700" />
            Export Report
            <ChevronDown className="size-4" />
          </button>
          <div className="invisible absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-slate-700 hover:bg-emerald-50/30" onClick={onExportPdf} type="button">Export as PDF</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-slate-700 hover:bg-emerald-50/30" onClick={onExportExcel} type="button">Export as Excel</button>
          </div>
        </div>
        <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
          <CalendarDays className="size-4" />
          Last updated: May 25, 2025 10:30 AM
        </p>
      </div>
    </header>
  );
}
