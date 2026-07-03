import { BarChart3, XCircle } from "lucide-react";

type ListingHealthCardProps = {
  completeness: number;
  logisticsComplete?: boolean;
  pricingComplete?: boolean;
};

export function ListingHealthCard({
  completeness,
  logisticsComplete = false,
  pricingComplete = false,
}: ListingHealthCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <h2 className="inline-flex items-center gap-2 text-base font-black text-slate-950">
        <BarChart3 className="size-5 text-emerald-800" />
        Listing Health
      </h2>
      <div className="mt-5 flex items-center justify-between text-sm font-medium text-slate-600">
        <span>Completeness</span>
        <span className="font-black text-emerald-800">{completeness}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-800 transition-all" style={{ width: `${completeness}%` }} />
      </div>
      <div className="mt-5 grid gap-2 text-sm font-semibold text-red-600">
        {!pricingComplete ? (
          <span className="inline-flex items-center gap-2">
            <XCircle className="size-4" />
            Pricing info missing
          </span>
        ) : null}
        {!logisticsComplete ? (
          <span className="inline-flex items-center gap-2">
            <XCircle className="size-4" />
            Logistics not defined
          </span>
        ) : null}
      </div>
    </section>
  );
}
