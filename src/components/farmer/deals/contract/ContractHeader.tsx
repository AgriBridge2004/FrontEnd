"use client";

import Link from "next/link";
import { BadgeCheck, ChevronRight, Download, Printer } from "lucide-react";

import type { DigitalContract } from "@/components/farmer/deals/contract/contract.types";

type ContractHeaderProps = {
  contract: DigitalContract;
  isDownloadingPdf: boolean;
  onDownloadPdf: () => void;
  onPrint: () => void;
};

export function ContractHeader({ contract, isDownloadingPdf, onDownloadPdf, onPrint }: ContractHeaderProps) {
  const compactQuantity = contract.quantity?.replace(/\s+/g, "");
  const contextualTitle =
    contract.product && compactQuantity
      ? `${contract.dealId} ${contract.product} ${compactQuantity} Contract`
      : `Digital Contract ${contract.dealId}`;

  return (
    <header className="print:hidden">
      <div className="flex items-center gap-1 text-xs font-black text-slate-500">
        <Link className="transition hover:text-emerald-800" href="/farmer/deals">
          Deals
        </Link>
        <ChevronRight className="size-3" />
        <Link className="transition hover:text-emerald-800" href={`/farmer/deals/${contract.dealId}`}>
          {contract.dealId}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-emerald-800">Contract</span>
      </div>
      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{contextualTitle}</h1>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
            <BadgeCheck className="size-3.5" />
            {contract.status}
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-100 px-6 text-sm font-semibold text-slate-700 transition hover:bg-emerald-200"
            onClick={onPrint}
            type="button"
          >
            <Printer className="size-5" />
            Print
          </button>
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-7 text-sm font-black text-white transition hover:bg-emerald-900"
            disabled={isDownloadingPdf}
            onClick={onDownloadPdf}
            type="button"
          >
            <Download className="size-5" />
            {isDownloadingPdf ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </header>
  );
}
