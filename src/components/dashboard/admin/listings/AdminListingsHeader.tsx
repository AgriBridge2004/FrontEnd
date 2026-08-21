"use client";

import { AlertTriangle } from "lucide-react";

type AdminListingsHeaderProps = {
  flaggedCount: number;
};

export function AdminListingsHeader({ flaggedCount }: AdminListingsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-950">Listings Management</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Monitor, moderate, and manage all product listings on the marketplace.</p>
      </div>
      <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-red-700 sm:w-auto sm:min-w-52">
        <span className="grid size-10 place-items-center rounded-lg bg-white/70 text-red-500">
          <AlertTriangle className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-black">Flagged Listings</p>
          <p className="text-[11px] font-semibold">Needs your review</p>
        </div>
        <span className="text-2xl font-black">{flaggedCount}</span>
      </div>
    </header>
  );
}
