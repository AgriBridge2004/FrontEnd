"use client";

import { SquarePen } from "lucide-react";

type BuyerReviewsHeaderProps = {
  onWriteReview: () => void;
};

export function BuyerReviewsHeader({ onWriteReview }: BuyerReviewsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[26px] font-black leading-tight tracking-tight text-slate-950 sm:text-[28px]">Reviews & Ratings</h1>
        <p className="mt-1.5 max-w-[600px] text-sm font-medium leading-5 text-slate-600">
          Monitor supplier performance metrics and manage your feedback portfolio to ensure ecosystem quality.
        </p>
      </div>
      <button
        className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:shadow-md"
        onClick={onWriteReview}
        type="button"
      >
        <SquarePen className="size-4" />
        Write a Review
      </button>
    </header>
  );
}
