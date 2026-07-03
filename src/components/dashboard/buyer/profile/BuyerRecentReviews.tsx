import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BuyerProfileReview } from "@/components/dashboard/buyer/profile/buyer-profile.types";
import { StarRating } from "@/components/dashboard/shared/StarRating";

type BuyerRecentReviewsProps = {
  reviews: BuyerProfileReview[];
};

export function BuyerRecentReviews({ reviews }: BuyerRecentReviewsProps) {
  return (
    <section className="mt-9">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-slate-950">Recent Reviews</h2>
        <Link className="inline-flex items-center gap-1 text-sm font-black text-emerald-800 transition hover:text-emerald-950" href="/buyer/reviews">
          View all reviews
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={review.id}
          >
            <div className="flex items-start gap-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-emerald-900 text-xs font-black text-white">
                {review.avatarUrl ? (
                  <Image alt={`${review.reviewerName} avatar`} className="object-cover" fill sizes="40px" src={review.avatarUrl} />
                ) : (
                  <span className="grid size-full place-items-center">{review.initials}</span>
                )}
              </span>
              <div className="min-w-0">
                <h3 className="font-black text-slate-950">{review.reviewerName}</h3>
                <p className="text-xs font-medium text-slate-500">{review.reviewerRole}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <StarRating rating={review.rating} />
              <p className="text-[11px] font-medium text-slate-400">{review.date}</p>
            </div>
            <p className="mt-4 text-sm italic leading-6 text-slate-600">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
