"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

const perPageOptions = [10, 20, 50];

type BuyerDealsPaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onPageChange: (page: number) => void;
  totalItems: number;
  totalPages: number;
};

export function BuyerDealsPagination({
  currentPage,
  itemsPerPage,
  onItemsPerPageChange,
  onPageChange,
  totalItems,
  totalPages,
}: BuyerDealsPaginationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const visiblePages = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="border-t border-slate-100 px-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label="Previous page"
            className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
            disabled={currentPage === 1 || totalItems === 0}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>

          {visiblePages.map((page) => (
            <button
              className={cn(
                "grid size-9 place-items-center rounded-lg border text-sm font-semibold transition",
                currentPage === page
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-white",
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
            className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
            disabled={currentPage === totalPages || totalItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="relative w-fit" ref={menuRef}>
          <button
            className="inline-flex h-10 items-center justify-center gap-8 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-emerald-50"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {itemsPerPage} per page
            <ChevronDown className={cn("size-4 transition", isMenuOpen && "rotate-180")} />
          </button>

          {isMenuOpen ? (
            <div className="absolute bottom-full right-0 z-10 mb-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {perPageOptions.map((option) => (
                <button
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm font-semibold transition hover:bg-emerald-50",
                    itemsPerPage === option ? "text-emerald-700" : "text-slate-600",
                  )}
                  key={option}
                  onClick={() => {
                    onItemsPerPageChange(option);
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  {option} per page
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
