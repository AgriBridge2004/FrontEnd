"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { ReviewCard } from "@/components/dashboard/farmer/reviews/ReviewCard";
import type { FarmerReview } from "@/components/dashboard/farmer/reviews/reviews.mock";
import { cn } from "@/lib/cn";

type ReviewsListProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onRespond: (review: FarmerReview) => void;
  reviews: FarmerReview[];
  totalItems: number;
  totalPages: number;
};

export function ReviewsList({ currentPage, onPageChange, onRespond, reviews, totalItems, totalPages }: ReviewsListProps) {
  return (
    <section>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} onRespond={onRespond} review={review} />)
        ) : (
          <div className="rounded-lg border border-emerald-100 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
            No reviews found.
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-emerald-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-600">Showing 1-10 of {totalItems || 0} reviews</p>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous page"
            className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          {[1, 2, 3].filter((page) => page <= totalPages).map((page) => (
            <button
              className={cn(
                "grid size-10 place-items-center rounded-md border text-sm font-black",
                currentPage === page ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-200 text-slate-700",
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
            className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === totalPages}
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
