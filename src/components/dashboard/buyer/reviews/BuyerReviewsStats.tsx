import { BarChart3, Clock, Send, TrendingUp } from "lucide-react";

import { BuyerGlobalSentimentCard } from "@/components/dashboard/buyer/reviews/BuyerGlobalSentimentCard";
import type { BuyerReviewsStats as BuyerReviewsStatsType } from "@/components/dashboard/buyer/reviews/buyer-reviews.types";
import { StarRating } from "@/components/dashboard/shared/StarRating";

type BuyerReviewsStatsProps = {
  stats: BuyerReviewsStatsType;
};

export function BuyerReviewsStats({ stats }: BuyerReviewsStatsProps) {
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
            <BarChart3 className="size-4" />
          </div>
          <span className="text-slate-100">☆</span>
        </div>
        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">Avg. Rating Given</p>
        <div className="mt-6 flex items-end gap-1">
          <span className="text-4xl font-black tracking-tight text-slate-950">{stats.averageRatingGiven.toFixed(1)}</span>
          <span className="pb-1 text-base font-black text-slate-700">/ 5.0</span>
        </div>
        <div className="mt-3">
          <StarRating rating={stats.averageRatingGiven} size="sm" />
        </div>
        <div className="mt-6 border-t border-slate-100 pt-4 text-sm font-medium text-slate-600">Top 5% among buyers</div>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
          <Send className="size-4" />
        </div>
        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">Total Submitted</p>
        <p className="mt-7 text-4xl font-black tracking-tight text-slate-950">{stats.totalSubmitted}</p>
        <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800">
          <TrendingUp className="size-3.5" />
          +12% vs last month
        </p>
        <div className="mt-5 border-t border-slate-100 pt-4 text-sm font-medium text-slate-600">Across 4 continents</div>
      </article>

      <article className="rounded-2xl border-2 border-emerald-800 bg-white p-5 shadow-sm transition-all duration-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="grid size-9 place-items-center rounded-xl bg-emerald-800 text-white">
          <Clock className="size-4" />
        </div>
        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-800">Awaiting Feedback</p>
        <p className="mt-7 text-4xl font-black tracking-tight text-emerald-800">{String(stats.awaitingFeedback).padStart(2, "0")}</p>
        <p className="mt-2 max-w-[170px] text-sm font-semibold leading-5 text-slate-700">Requiring immediate action</p>
        <div className="mt-5 border-t border-slate-100 pt-4 text-sm font-black text-emerald-800">From completed deals →</div>
      </article>

      <BuyerGlobalSentimentCard sentiment={stats.sentiment} />
    </section>
  );
}
