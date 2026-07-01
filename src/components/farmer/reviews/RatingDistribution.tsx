import { ratingDistribution } from "@/components/farmer/reviews/reviews.mock";

export function RatingDistribution() {
  const maxCount = Math.max(...ratingDistribution.map((item) => item.count));

  return (
    <div className="mt-5 space-y-4">
      {ratingDistribution.map((item) => {
        const width = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

        return (
          <div className="grid grid-cols-[64px_minmax(0,1fr)_40px] items-center gap-3" key={item.rating}>
            <span className="text-sm font-medium text-slate-600">{item.rating}</span>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${width}%` }} />
            </div>
            <span className="text-right text-sm font-semibold text-slate-700">{item.count}</span>
          </div>
        );
      })}
    </div>
  );
}
