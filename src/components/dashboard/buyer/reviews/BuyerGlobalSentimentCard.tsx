import type { BuyerReviewsStats } from "@/components/dashboard/buyer/reviews/buyer-reviews.types";

type BuyerGlobalSentimentCardProps = {
  sentiment: BuyerReviewsStats["sentiment"];
};

const sentimentRows = [
  { key: "fiveStar", label: "5 Star", color: "bg-emerald-800" },
  { key: "fourStar", label: "4 Star", color: "bg-emerald-700/70" },
  { key: "threeStar", label: "3 Star", color: "bg-emerald-700/35" },
] as const;

export function BuyerGlobalSentimentCard({ sentiment }: BuyerGlobalSentimentCardProps) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-black text-slate-950">Global Sentiment</h2>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase text-slate-600">All Time</span>
      </div>

      <div className="mt-6 space-y-4">
        {sentimentRows.map((row) => (
          <div key={row.key}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-slate-700">{row.label}</span>
              <span className="text-xs font-black text-slate-950">{sentiment[row.key]}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: `${sentiment[row.key]}%` }} />
            </div>
          </div>
        ))}

        <div>
          <div className="h-1.5 rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-rose-300" style={{ width: `${sentiment.others}%` }} />
          </div>
          <p className="mt-2 text-[10px] font-black uppercase text-slate-600">Others ({sentiment.others}%)</p>
        </div>
      </div>
    </article>
  );
}
