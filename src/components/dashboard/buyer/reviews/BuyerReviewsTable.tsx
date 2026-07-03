"use client";

import { Building2, Eye, Pencil } from "lucide-react";

import type { BuyerReview } from "@/components/dashboard/buyer/reviews/buyer-reviews.types";
import { StarRating } from "@/components/dashboard/shared/StarRating";
import { cn } from "@/lib/cn";

type BuyerReviewsTableProps = {
  onCompleteReview: (review: BuyerReview) => void;
  onViewReview: (review: BuyerReview) => void;
  reviews: BuyerReview[];
};

const statusStyles = {
  draft: "bg-slate-100 text-slate-700 ring-slate-300",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

function statusLabel(status: BuyerReview["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function BuyerReviewsTable({ onCompleteReview, onViewReview, reviews }: BuyerReviewsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[920px] w-full text-left">
        <thead className="bg-slate-100/80">
          <tr className="border-b border-emerald-100 text-xs font-black uppercase tracking-[0.08em] text-slate-600">
            <th className="px-5 py-4">Supplier</th>
            <th className="px-5 py-4">Product Category</th>
            <th className="px-5 py-4">Rating</th>
            <th className="px-5 py-4">Review Date</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr className="border-b border-emerald-100 last:border-b-0" key={review.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-emerald-100 bg-emerald-900 text-[10px] font-black text-white">
                      {review.supplierInitials ? review.supplierInitials : <Building2 className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-black leading-5 text-slate-950">{review.supplierName}</p>
                      <p className="mt-1 text-sm font-medium text-slate-600">{review.supplierSubtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">{review.productCategory}</p>
                  {review.productSubcategory ? <p className="mt-1 text-sm font-medium text-slate-600">{review.productSubcategory}</p> : null}
                </td>
                <td className="px-5 py-4">
                  <StarRating rating={review.rating ?? 0} size="sm" />
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">{review.reviewDate ?? "Pending"}</p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-black ring-1",
                      statusStyles[review.status],
                    )}
                  >
                    {statusLabel(review.status)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {review.status === "draft" || review.status === "pending" ? (
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-black text-emerald-800 transition hover:text-emerald-950"
                      onClick={() => onCompleteReview(review)}
                      type="button"
                    >
                      <Pencil className="size-4" />
                      Complete
                    </button>
                  ) : (
                    <button
                      aria-label={`View review for ${review.supplierName}`}
                      className="grid size-8 place-items-center rounded-full text-emerald-800 transition hover:bg-emerald-50 hover:text-emerald-950"
                      onClick={() => onViewReview(review)}
                      type="button"
                    >
                      <Eye className="size-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-10 text-center text-sm font-semibold text-slate-500" colSpan={6}>
                No reviews match the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
