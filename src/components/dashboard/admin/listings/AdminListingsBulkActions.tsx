"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Trash2 } from "lucide-react";

import { cn } from "@/lib/cn";

type AdminListingsBulkActionsProps = {
  allSelected: boolean;
  currentPage: number;
  onApprove: () => void;
  onMoreActions: () => void;
  onPageChange: (page: number) => void;
  onRemove: () => void;
  onToggleAll: () => void;
  pageNumbers: number[];
  selectedCount: number;
  someSelected: boolean;
  totalCount: number;
};

export function AdminListingsBulkActions({
  allSelected,
  currentPage,
  onApprove,
  onMoreActions,
  onPageChange,
  onRemove,
  onToggleAll,
  pageNumbers,
  selectedCount,
  someSelected,
  totalCount,
}: AdminListingsBulkActionsProps) {
  return (
    <section className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <button
          aria-label={allSelected ? "Clear selected listings" : "Select all visible listings"}
          className={cn(
            "grid size-5 place-items-center rounded border transition hover:bg-emerald-50",
            allSelected || someSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white text-slate-400",
          )}
          onClick={onToggleAll}
          type="button"
        >
          {allSelected ? <Check className="size-3.5" /> : null}
          {someSelected ? <Minus className="size-3.5" /> : null}
        </button>
        <span className="text-sm font-black text-slate-800">{selectedCount} selected</span>
        <span className="hidden h-6 w-px bg-slate-100 sm:block" />
        <ToolbarButton disabled={selectedCount === 0} onClick={onApprove} tone="green">
          <Check className="size-4" />
          Approve
        </ToolbarButton>
        <ToolbarButton disabled={selectedCount === 0} onClick={onRemove} tone="red">
          <Trash2 className="size-4" />
          Remove
        </ToolbarButton>
        <ToolbarButton onClick={onMoreActions}>
          More actions
          <ChevronDown className="size-4" />
        </ToolbarButton>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-500">Total Listings: {totalCount.toLocaleString()}</span>
        <div className="flex items-center gap-1">
          <PageButton disabled={currentPage === 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
            <ChevronLeft className="size-4" />
          </PageButton>
          {pageNumbers.slice(0, 3).map((pageNumber) => (
            <PageButton isActive={currentPage === pageNumber} key={pageNumber} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </PageButton>
          ))}
          <span className="px-2 text-sm font-bold text-slate-400">...</span>
          <PageButton isActive={currentPage === 42} onClick={() => onPageChange(42)}>
            42
          </PageButton>
          <PageButton disabled={currentPage === 42} onClick={() => onPageChange(Math.min(42, currentPage + 1))}>
            <ChevronRight className="size-4" />
          </PageButton>
        </div>
      </div>
    </section>
  );
}

function ToolbarButton({ children, disabled = false, onClick, tone = "slate" }: { children: ReactNode; disabled?: boolean; onClick: () => void; tone?: "green" | "red" | "slate" }) {
  const toneClass = {
    green: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
    red: "border-red-200 text-red-600 hover:bg-red-50",
    slate: "border-slate-200 text-slate-700 hover:bg-emerald-50/30",
  };

  return (
    <button
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-lg border bg-white px-3 text-sm font-black transition",
        disabled ? "cursor-not-allowed border-slate-100 text-slate-300" : toneClass[tone],
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function PageButton({ children, disabled = false, isActive = false, onClick }: { children: ReactNode; disabled?: boolean; isActive?: boolean; onClick: () => void }) {
  return (
    <button
      className={cn(
        "grid size-8 place-items-center rounded text-sm font-black transition",
        disabled && "cursor-not-allowed opacity-40",
        isActive ? "bg-emerald-700 text-white" : "border border-slate-200 text-slate-500 hover:bg-emerald-50/30",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
