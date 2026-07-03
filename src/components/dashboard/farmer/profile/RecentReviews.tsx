import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProfileReviewCard } from "@/components/dashboard/farmer/profile/ProfileReviewCard";
import type { ProfileReview } from "@/components/dashboard/farmer/profile/profile.mock";

type RecentReviewsProps = {
  reviews: ProfileReview[];
};

export function RecentReviews({ reviews }: RecentReviewsProps) {
  return (
    <section className="mt-9">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-slate-950">Recent Reviews</h2>
        <Link className="inline-flex items-center gap-1 text-sm font-black text-emerald-800 transition hover:text-emerald-950" href="/farmer/reviews">
          View all reviews
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <ProfileReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
