"use client";

import { Download, Plus, SlidersHorizontal } from "lucide-react";

type BuyerPaymentsHeaderProps = {
  onAdvancedFilters: () => void;
  onExportPdf: () => void;
  onNewPayment: () => void;
};

export function BuyerPaymentsHeader({ onAdvancedFilters, onExportPdf, onNewPayment }: BuyerPaymentsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-[26px] font-black leading-tight tracking-tight text-slate-950 sm:text-[28px]">Contract Payments</h1>
        <p className="mt-1.5 text-sm font-medium text-slate-600 sm:text-[15px]">Manage institutional escrow liquidity and verified financial settlements.</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onExportPdf}
          type="button"
        >
          <Download className="size-4" />
          Export PDF
        </button>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onAdvancedFilters}
          type="button"
        >
          <SlidersHorizontal className="size-4" />
          Advanced Filters
        </button>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white shadow-sm transition hover:bg-emerald-900"
          onClick={onNewPayment}
          type="button"
        >
          <Plus className="size-4" />
          New Payment
        </button>
      </div>
    </header>
  );
}
