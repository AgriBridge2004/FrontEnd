"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import type { BuyerReviewCategoryFilter, BuyerReviewRatingFilter } from "@/components/dashboard/buyer/reviews/buyer-reviews.types";

type BuyerReviewsFiltersProps = {
  categoryFilter: BuyerReviewCategoryFilter;
  currentPage: number;
  dateFilter: string;
  endItem: number;
  onCategoryFilterChange: (value: BuyerReviewCategoryFilter) => void;
  onDateFilterChange: (value: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onRatingFilterChange: (value: BuyerReviewRatingFilter) => void;
  ratingFilter: BuyerReviewRatingFilter;
  startItem: number;
  totalItems: number;
  totalPages: number;
};

const ratingOptions: BuyerReviewRatingFilter[] = ["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
const categoryOptions: BuyerReviewCategoryFilter[] = [
  "Category: All",
  "Organic Wheat",
  "Fertilizer",
  "Irrigation",
  "Packaging",
  "Logistics",
];

export function BuyerReviewsFilters({
  categoryFilter,
  currentPage,
  dateFilter,
  endItem,
  onCategoryFilterChange,
  onDateFilterChange,
  onNextPage,
  onPreviousPage,
  onRatingFilterChange,
  ratingFilter,
  startItem,
  totalItems,
  totalPages,
}: BuyerReviewsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-emerald-100 bg-slate-50/70 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <label className="relative">
          <span className="sr-only">Rating filter</span>
          <select
            className="h-10 min-w-[160px] appearance-none rounded-lg border border-slate-300 bg-white px-3.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-600"
            onChange={(event) => onRatingFilterChange(event.target.value as BuyerReviewRatingFilter)}
            value={ratingFilter}
          >
            {ratingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        </label>

        <label className="relative">
          <span className="sr-only">Category filter</span>
          <select
            className="h-10 min-w-[160px] appearance-none rounded-lg border border-slate-300 bg-white px-3.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-600"
            onChange={(event) => onCategoryFilterChange(event.target.value as BuyerReviewCategoryFilter)}
            value={categoryFilter}
          >
            {categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        </label>

        <label>
          <span className="sr-only">Review date</span>
          <input
            className="h-10 min-w-[170px] rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-500 focus:border-emerald-600"
            onChange={(event) => onDateFilterChange(event.target.value)}
            placeholder="mm/dd/yyyy"
            type="text"
            value={dateFilter}
          />
        </label>
      </div>

      <div className="flex items-center gap-2 self-end lg:self-auto">
        <p className="text-xs font-black uppercase text-slate-700 sm:text-sm">
          Viewing {startItem}-{endItem} of {totalItems}
        </p>
        <button
          aria-label="Previous reviews page"
          className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-emerald-200 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={currentPage <= 1}
          onClick={onPreviousPage}
          type="button"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          aria-label="Next reviews page"
          className="grid size-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={currentPage >= totalPages}
          onClick={onNextPage}
          type="button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
