"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = buildPages(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-2", className)}>
      <PaginationButton
        ariaLabel="Previous page"
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </PaginationButton>

      {pages.map((page, index) =>
        page === "dots" ? (
          <span className="px-2 text-sm font-semibold text-slate-400" key={`dots-${index}`}>
            ...
          </span>
        ) : (
          <PaginationButton
            ariaLabel={`Page ${page}`}
            isActive={currentPage === page}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationButton>
        ),
      )}

      <PaginationButton ariaLabel="Next page" disabled={isLast} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight className="size-4" />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  ariaLabel,
  children,
  disabled = false,
  isActive = false,
  onClick,
}: {
  ariaLabel: string;
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "grid size-10 place-items-center rounded-lg border text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-emerald-700/20",
        isActive
          ? "border-emerald-800 bg-emerald-800 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900",
        disabled && "cursor-not-allowed bg-slate-50 text-slate-300 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-300",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function buildPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "dots", totalPages] as Array<number | "dots">;
  }

  if (currentPage >= totalPages - 3) {
    return [1, "dots", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as Array<number | "dots">;
  }

  return [1, "dots", currentPage - 1, currentPage, currentPage + 1, "dots", totalPages] as Array<number | "dots">;
}
