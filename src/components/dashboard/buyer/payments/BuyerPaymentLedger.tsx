"use client";

import { ChevronLeft, ChevronRight, Leaf, Lock, MoreVertical, Search, Truck, Wrench } from "lucide-react";

import type { BuyerPayment, BuyerPaymentFilter, BuyerPaymentStatus } from "@/components/dashboard/buyer/payments/buyer-payments.types";
import { cn } from "@/lib/cn";

type BuyerPaymentLedgerProps = {
  currentPage: number;
  filter: BuyerPaymentFilter;
  onFilterChange: (filter: BuyerPaymentFilter) => void;
  onPageChange: (page: number) => void;
  onReleaseFunds: (payment: BuyerPayment) => void;
  onSearchChange: (value: string) => void;
  payments: BuyerPayment[];
  searchQuery: string;
  totalFilteredItems: number;
  totalItems: number;
  totalPages: number;
};

const pageSize = 10;
const tabs: Array<{ label: string; value: BuyerPaymentFilter }> = [
  { label: "All", value: "all" },
  { label: "Escrow", value: "escrow" },
  { label: "Released", value: "released" },
];

const statusStyles: Record<BuyerPaymentStatus, string> = {
  escrow: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  pending: "bg-slate-100 text-slate-600 ring-slate-200",
  released: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const statusLabels: Record<BuyerPaymentStatus, string> = {
  escrow: "In Escrow",
  pending: "Pending",
  released: "Released",
};

const recipientIcons = {
  equipment: Wrench,
  leaf: Leaf,
  logistics: Truck,
};

const recipientIconStyles = {
  equipment: "bg-rose-50 text-rose-800",
  leaf: "bg-emerald-50 text-emerald-800",
  logistics: "bg-slate-100 text-slate-600",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});

export function BuyerPaymentLedger({
  currentPage,
  filter,
  onFilterChange,
  onPageChange,
  onReleaseFunds,
  onSearchChange,
  payments,
  searchQuery,
  totalFilteredItems,
  totalItems,
  totalPages,
}: BuyerPaymentLedgerProps) {
  const startItem = totalFilteredItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalFilteredItems);
  const visiblePages = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">Payment Ledger</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">Audit trail for all contract-linked funds</p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="flex h-9 min-w-[250px] items-center gap-2 rounded-xl bg-slate-100 px-3">
            <Search className="size-4 shrink-0 text-slate-500" />
            <input
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Filter by ID or Supplier..."
              type="search"
              value={searchQuery}
            />
          </label>
          <div className="inline-flex w-fit rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                className={cn(
                  "h-7 rounded-lg px-3.5 text-sm font-black transition",
                  filter === tab.value ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600 hover:text-emerald-800",
                )}
                key={tab.value}
                onClick={() => onFilterChange(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-5 py-3.5">Payment ID</th>
              <th className="px-5 py-3.5">Contract</th>
              <th className="px-5 py-3.5">Recipient / Supplier</th>
              <th className="px-5 py-3.5 text-right">Settlement Amount</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Auth Date</th>
              <th className="px-5 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {payments.map((payment) => {
              const iconType = payment.recipientIconType ?? "leaf";
              const Icon = recipientIcons[iconType];

              return (
                <tr className="transition hover:bg-emerald-50/20" key={payment.id}>
                  <td className="px-5 py-4 font-mono text-xs font-black text-emerald-800">{payment.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{payment.contractId}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl ring-1 ring-emerald-100", recipientIconStyles[iconType])}>
                        <Icon className="size-4.5" />
                      </span>
                      <div>
                        <p className="font-black leading-5 text-slate-950">{payment.recipientName}</p>
                        <p className="text-xs font-medium text-slate-500">{payment.recipientSubtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-black text-slate-950">{currencyFormatter.format(payment.amount)}</td>
                  <td className="px-5 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-black uppercase ring-1", statusStyles[payment.status])}>
                      {payment.status === "escrow" ? <Lock className="size-3" /> : null}
                      {statusLabels[payment.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">{payment.authDate}</td>
                  <td className="px-5 py-4">
                    {payment.status === "escrow" ? (
                      <button
                        className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-800 px-4 text-sm font-black text-white transition hover:bg-emerald-900"
                        onClick={() => onReleaseFunds(payment)}
                        type="button"
                      >
                        Release Funds
                      </button>
                    ) : (
                      <button className="grid size-8 place-items-center rounded-full text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" type="button">
                        <MoreVertical className="size-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold tracking-wide text-slate-600">
          Showing {startItem}-{endItem} of {totalItems} transactions
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label="Previous page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === 1 || totalFilteredItems === 0}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          {visiblePages.map((page) => (
            <button
              className={cn(
                "grid size-8 place-items-center rounded-lg border text-sm font-black transition",
                currentPage === page ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-emerald-50",
              )}
              key={page}
              onClick={() => onPageChange(page)}
              type="button"
            >
              {page}
            </button>
          ))}
          <button
            aria-label="Next page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === totalPages || totalFilteredItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
