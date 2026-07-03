import { Flag, MessageSquare, Star, TrendingUp } from "lucide-react";

import { StarRating } from "@/components/dashboard/farmer/reviews/StarRating";

export function ReviewStats() {
  return (
    <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">Overall Rating</p>
        <div className="mt-3 flex items-end justify-center gap-2">
          <span className="text-4xl font-black text-slate-950">4.8</span>
          <span className="pb-1 text-lg font-medium text-slate-700">/ 5</span>
        </div>
        <div className="mt-2 flex justify-center">
          <StarRating rating={4.8} size="md" />
        </div>
        <p className="mt-2 text-center text-xs font-medium text-slate-600">Top 5% of farmers this month</p>
      </article>

      <article className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">Total Reviews</p>
          <Star className="size-5 text-emerald-800" />
        </div>
        <p className="mt-6 text-2xl font-black text-slate-950">156</p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs font-black text-emerald-700">
          <TrendingUp className="size-3.5" />
          +12 new this week
        </p>
      </article>

      <article className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">Response Rate</p>
          <MessageSquare className="size-5 text-emerald-800" />
        </div>
        <p className="mt-6 text-lg font-black text-slate-950">92%</p>
        <div className="mt-5 h-1.5 rounded-full bg-slate-200">
          <div className="h-full w-[92%] rounded-full bg-emerald-800" />
        </div>
      </article>

      <article className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50/10 hover:shadow-md">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">Flagged Reviews</p>
          <Flag className="size-5 text-red-600" />
        </div>
        <p className="mt-6 text-lg font-black text-red-600">2</p>
        <p className="mt-2 text-xs font-medium underline decoration-slate-400 underline-offset-4">Action required immediately</p>
      </article>
    </section>
  );
}
