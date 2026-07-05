import { CircleDot, Leaf, Wheat } from "lucide-react";

import type { CommodityQualityMetric } from "@/components/dashboard/quality-officer/reports/quality-officer-reports.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type CommodityRejectionRatesProps = {
  metrics: CommodityQualityMetric[];
};

const icons = {
  tomatoes: CircleDot,
  wheat: Wheat,
  olives: Leaf,
};

const rejectionColorClasses = {
  green: "bg-emerald-800 text-emerald-800",
  red: "bg-red-600 text-red-600",
  gray: "bg-slate-700 text-slate-700",
};

export function CommodityRejectionRates({ metrics }: CommodityRejectionRatesProps) {
  // TODO: Connect commodity rejection metrics to API.
  return (
    <DashboardCard className="mt-5 p-4">
      <h2 className="text-base font-black text-slate-950">Commodity Rejection Rates & Price Stability</h2>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = icons[metric.id as keyof typeof icons] ?? Leaf;
          const rejectionClasses = rejectionColorClasses[metric.rejectionColor];

          return (
            <article
              className="rounded-xl border border-emerald-100 bg-stone-50 p-3.5 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
              key={metric.id}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg border border-emerald-100 bg-white text-emerald-800">
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="text-[13px] font-black text-slate-950">{metric.name}</h3>
                  <p className="text-[11px] font-semibold text-slate-600">{metric.subtitle}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold text-slate-700">Rejection Rate</span>
                  <span className={cn("text-[11px] font-black", rejectionClasses.split(" ")[1])}>
                    {metric.rejectionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-slate-100">
                  <div className={cn("h-full rounded-full", rejectionClasses.split(" ")[0])} style={{ width: `${Math.max(metric.rejectionRate * 8, 8)}%` }} />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold text-slate-700">Price Stability</span>
                  <span className="text-[11px] font-black text-emerald-800">{metric.priceStability}</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-slate-100">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      metric.priceStability === "Med" ? "bg-amber-400" : "bg-emerald-800",
                    )}
                    style={{ width: `${metric.priceStabilityProgress}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </DashboardCard>
  );
}
