"use client";

import { AlertCircle, BadgeCheck, MoreVertical, Reply } from "lucide-react";

import { StarRating } from "@/components/farmer/reviews/StarRating";
import type { FarmerReview } from "@/components/farmer/reviews/reviews.mock";
import { cn } from "@/lib/cn";

type ReviewCardProps = {
  review: FarmerReview;
  onRespond: (review: FarmerReview) => void;
};

export function ReviewCard({ review, onRespond }: ReviewCardProps) {
  if (review.status === "Under Investigation" || review.status === "Flagged") {
    return <FlaggedReviewCard review={review} />;
  }

  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <BuyerInfo review={review} />
        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
          <StarRating rating={review.rating} />
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">{review.contractId}</span>
        </div>
      </div>

      <p className="mt-5 text-[15px] font-medium leading-7 text-slate-800">&quot;{review.reviewText}&quot;</p>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-slate-600">
          {review.qualityScore ? <Score label="Quality" value={review.qualityScore} /> : null}
          {review.timelinessScore ? <Score label="Timeliness" value={review.timelinessScore} /> : null}
          {review.communicationScore ? <Score label="Communication" value={review.communicationScore} /> : null}
        </div>
      </div>

      {review.response ? (
        <div className="mt-5 border-l-4 border-emerald-800 bg-emerald-50/30 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-sm font-black text-emerald-900">Your Response</h3>
            <span className="text-[11px] font-medium text-slate-500">{review.response.respondedAt}</span>
          </div>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{review.response.text}</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
            onClick={() => onRespond(review)}
            type="button"
          >
            <Reply className="size-4" />
            Respond to Review
          </button>
          <button className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50" type="button">
            <MoreVertical className="size-5" />
          </button>
        </div>
      )}
    </article>
  );
}

function BuyerInfo({ review }: { review: FarmerReview }) {
  return (
    <div className="flex min-w-0 items-start gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded bg-emerald-700 text-xs font-black text-white">{review.buyerInitials}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <h2 className="font-black text-slate-950">{review.buyerName}</h2>
          {review.verified ? <BadgeCheck className="size-4 fill-emerald-800 text-white" /> : null}
        </div>
        <p className="text-xs font-medium text-slate-500">{review.purchasedAt}</p>
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <span>
      {label}: <strong className="font-black text-emerald-800">{value}/5</strong>
    </span>
  );
}

function FlaggedReviewCard({ review }: { review: FarmerReview }) {
  return (
    <article className="rounded-lg border border-red-200 bg-red-50/20 p-6 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50/30 hover:shadow-md">
      <div className="flex items-center gap-3 text-red-700">
        <AlertCircle className="size-5" />
        <h2 className="text-sm font-black uppercase tracking-[0.2em]">Under Investigation</h2>
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <BuyerInfo review={review} />
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-5 italic text-slate-500">&quot;{review.reviewText}&quot;</p>
      <div className="mt-5 flex justify-end">
        <button className="h-10 rounded-md border border-red-500 bg-white px-5 text-sm font-semibold text-red-700 transition hover:bg-red-50" type="button">
          View Appeal Status
        </button>
      </div>
    </article>
  );
}
