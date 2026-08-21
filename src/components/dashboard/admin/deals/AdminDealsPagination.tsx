"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";

type AdminDealsPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export function AdminDealsPagination({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  totalItems,
  totalPages,
}: AdminDealsPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 text-[12px] font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-2">
        Rows per page:
        <select
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-[13px] font-bold text-slate-600 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          value={pageSize}
        >
          {[10, 25, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <span>
          {currentPage === 1 ? 1 : (currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </span>
        <nav aria-label="Deals pagination" className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
          <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            <ChevronLeft className="size-4" />
          </PageButton>
          {[1, 2, 3].map((page) => (
            <PageButton isActive={currentPage === page} key={page} onClick={() => onPageChange(page)}>
              {page}
            </PageButton>
          ))}
          <span className="grid h-8 min-w-8 place-items-center border-l border-slate-200 px-2 text-slate-400">...</span>
          <PageButton isActive={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PageButton>
          <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            <ChevronRight className="size-4" />
          </PageButton>
        </nav>
      </div>
    </div>
  );
}

function PageButton({
  children,
  disabled,
  isActive,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "grid h-8 min-w-8 place-items-center border-l border-slate-200 px-2 text-[12px] font-bold transition first:border-l-0",
        isActive ? "bg-emerald-50 text-emerald-900" : "bg-white text-slate-500 hover:bg-emerald-50/40 hover:text-emerald-800",
        disabled && "cursor-not-allowed text-slate-300 hover:bg-white hover:text-slate-300",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
