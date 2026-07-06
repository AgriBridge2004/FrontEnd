"use client";

import { Download, History } from "lucide-react";

type AdminDealsHeaderProps = {
  onAuditTrail: () => void;
  onExport: () => void;
};

export function AdminDealsHeader({ onAuditTrail, onExport }: AdminDealsHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950">Deals Management</h1>
        <p className="mt-1 max-w-2xl text-[13px] font-medium leading-5 text-slate-500">
          Monitor all deals across the platform and take action when needed.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 hover:shadow-md"
          onClick={onExport}
          type="button"
        >
          <Download className="size-4" />
          Export
        </button>
        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 hover:shadow-md"
          onClick={onAuditTrail}
          type="button"
        >
          <History className="size-4" />
          Audit Trail
        </button>
      </div>
    </header>
  );
}
