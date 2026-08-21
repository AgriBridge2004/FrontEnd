"use client";

import { Download } from "lucide-react";

type AdminPaymentsHeaderProps = {
  onExport: () => void;
};

export function AdminPaymentsHeader({ onExport }: AdminPaymentsHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-950">Payments</h1>
        <p className="mt-1 max-w-md text-sm font-medium text-slate-500">Monitor and manage all platform payment transactions.</p>
      </div>
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-emerald-50/30" onClick={onExport} type="button">
        <Download className="size-4" />
        Export
      </button>
    </header>
  );
}
