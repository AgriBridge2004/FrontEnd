"use client";

import { Download, Plus } from "lucide-react";

type QualityOfficerInspectionsHeaderProps = {
  onCreateInspection: () => void;
  onExportData: () => void;
};

export function QualityOfficerInspectionsHeader({ onCreateInspection, onExportData }: QualityOfficerInspectionsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-wide text-slate-700">
          Quality Management <span className="text-slate-300">›</span>{" "}
          <span className="font-black text-emerald-800">Inspections</span>
        </p>
        <h1 className="mt-3 text-[26px] font-black leading-tight tracking-tight text-emerald-950 sm:text-[30px]">
          Inspections Management
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
          onClick={onExportData}
          type="button"
        >
          <Download className="size-4" />
          Export Data
        </button>
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-900"
          onClick={onCreateInspection}
          type="button"
        >
          <Plus className="size-4" />
          Create Inspection
        </button>
      </div>
    </header>
  );
}
