import { StarRating } from "@/components/farmer/reviews/StarRating";
import type { ProfileReview } from "@/components/farmer/profile/profile.mock";

type ProfileReviewCardProps = {
  review: ProfileReview;
};

export function ProfileReviewCard({ review }: ProfileReviewCardProps) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-900 text-xs font-black text-white">{review.initials}</span>
        <div className="min-w-0">
          <h3 className="font-black text-slate-950">{review.name}</h3>
          <p className="text-xs font-medium text-slate-500">{review.role}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <StarRating rating={review.rating} />
        <p className="text-[11px] font-medium text-slate-400">{review.date}</p>
      </div>
      <p className="mt-4 text-sm italic leading-6 text-slate-600">{review.text}</p>
    </article>
  );
}
