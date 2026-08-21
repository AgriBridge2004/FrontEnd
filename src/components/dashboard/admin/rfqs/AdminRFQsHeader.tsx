"use client";

import { Download, RefreshCw } from "lucide-react";

type AdminRFQsHeaderProps = {
  onExport: () => void;
  onRefresh: () => void;
};

export function AdminRFQsHeader({ onExport, onRefresh }: AdminRFQsHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950">RFQs Management</h1>
        <p className="mt-1 max-w-xl text-[13px] font-medium leading-5 text-slate-500">
          Monitor and oversee all Request for Quotation (RFQ) activity on the platform.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-slate-400">
          <span className="size-2 rounded-full bg-emerald-500" />
          Last updated: 1 min ago
        </span>
        <button
          aria-label="Refresh RFQs"
          className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50/40 hover:text-emerald-800"
          onClick={onRefresh}
          type="button"
        >
          <RefreshCw className="size-4" />
        </button>
        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 hover:shadow-md"
          onClick={onExport}
          type="button"
        >
          Export
          <Download className="size-4" />
        </button>
      </div>
    </header>
  );
}
