"use client";

import type { ReviewFilter } from "@/components/dashboard/farmer/reviews/reviews.mock";
import { reviewFilters } from "@/components/dashboard/farmer/reviews/reviews.mock";
import { cn } from "@/lib/cn";

type ReviewFiltersProps = {
  selectedFilter: ReviewFilter;
  onFilterChange: (filter: ReviewFilter) => void;
};

export function ReviewFilters({ selectedFilter, onFilterChange }: ReviewFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {reviewFilters.map((filter) => (
        <button
          className={cn(
            "h-9 rounded-xl border px-4 text-sm font-semibold transition",
            selectedFilter === filter
              ? "border-emerald-800 bg-emerald-800 text-white"
              : filter === "Flagged"
                ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-800",
          )}
          key={filter}
          onClick={() => onFilterChange(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
