"use client";

import { Plus } from "lucide-react";

type BuyerDisputesHeaderProps = {
  onOpenNewDispute: () => void;
};

export function BuyerDisputesHeader({ onOpenNewDispute }: BuyerDisputesHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[26px] font-black leading-tight tracking-tight text-slate-950 sm:text-[28px]">Disputes Management</h1>
        <p className="mt-1.5 max-w-3xl text-sm font-medium leading-5 text-slate-600">
          Track and mediate institutional trade conflicts with enterprise-grade resolution tools.
        </p>
      </div>
      <button
        className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-emerald-900 px-5 text-sm font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-950 hover:shadow-md"
        onClick={onOpenNewDispute}
        type="button"
      >
        <Plus className="size-4" />
        Open New Dispute
      </button>
    </header>
  );
}
