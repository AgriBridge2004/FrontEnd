"use client";

import { Download } from "lucide-react";

type QualityOfficerDisputesHeaderProps = {
  onExport: () => void;
};

export function QualityOfficerDisputesHeader({ onExport }: QualityOfficerDisputesHeaderProps) {
  return (
    <header className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-950">Disputes Management</h1>
        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Monitor and resolve trade, quality, and payment disputes across the platform.
        </p>
      </div>

      <button
        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-black text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
        onClick={onExport}
        type="button"
      >
        <Download className="size-3.5" />
        Export Dispute Data
      </button>
    </header>
  );
}
