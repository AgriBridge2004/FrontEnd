"use client";

import { ShieldCheck, TriangleAlert } from "lucide-react";

type BuyerReviewsInfoCardsProps = {
  onDisputeLearnMore: () => void;
};

export function BuyerReviewsInfoCards({ onDisputeLearnMore }: BuyerReviewsInfoCardsProps) {
  return (
    <section className="mt-6 grid gap-5 lg:grid-cols-2">
      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex gap-5">
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-950">Why Reviews Matter</h2>
            <p className="mt-1.5 max-w-[520px] text-sm font-medium leading-5 text-slate-600">
              High-quality reviews build the AgriBridge ecosystem. Suppliers with consistent 4.5+ ratings are eligible for the Market Elite
              program, which ensures better credit terms for buyers.
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex gap-5">
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-900">
            <TriangleAlert className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-950">Dispute Resolution</h2>
            <p className="mt-1.5 max-w-[520px] text-sm font-medium leading-5 text-slate-600">
              Had a negative experience? Instead of just a rating, you can open a formal dispute. Our mediators respond within 24 business
              hours to facilitate a fair outcome.
            </p>
            <button
              className="mt-3 text-sm font-black text-emerald-800 transition hover:text-emerald-950"
              onClick={onDisputeLearnMore}
              type="button"
            >
              Learn more about disputes →
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
