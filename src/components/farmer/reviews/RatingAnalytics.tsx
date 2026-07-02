import { RatingDistribution } from "@/components/farmer/reviews/RatingDistribution";
import { performanceAreas } from "@/components/farmer/reviews/reviews.mock";

export function RatingAnalytics() {
  return (
    <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-base font-medium text-slate-950">Rating Distribution</h2>
      <RatingDistribution />

      <div className="my-7 border-t border-slate-200" />

      <h2 className="text-sm font-medium uppercase tracking-[0.25em] text-slate-600">Key Performance Areas</h2>
      <div className="mt-5 space-y-3">
        {performanceAreas.map((area) => (
          <div className="flex items-center justify-between gap-4" key={area.label}>
            <span className="text-sm font-medium text-slate-800">{area.label}</span>
            <span className="text-sm font-black text-emerald-800">{area.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
