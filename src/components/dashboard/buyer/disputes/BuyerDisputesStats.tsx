import { BadgeCheck, TimerReset, TriangleAlert } from "lucide-react";

import type { BuyerDisputeStats } from "@/components/dashboard/buyer/disputes/buyer-disputes.types";
import { cn } from "@/lib/cn";

type BuyerDisputesStatsProps = {
  stats: BuyerDisputeStats;
};

type MiniBarsProps = {
  bars: number[];
  color: string;
};

function MiniBars({ bars, color }: MiniBarsProps) {
  return (
    <div className="flex h-7 items-end gap-1">
      {bars.map((height, index) => (
        <span className={cn("w-3.5 rounded-t-sm opacity-60", color)} key={`${height}-${index}`} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

export function BuyerDisputesStats({ stats }: BuyerDisputesStatsProps) {
  return (
    <section className="mt-5 grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid size-8 place-items-center rounded-lg bg-red-50 text-red-600">
            <TriangleAlert className="size-4" />
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase text-red-600">+2 New</span>
            <MiniBars bars={[34, 58, 42, 68, 88]} color="bg-red-300" />
          </div>
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">Open Disputes</p>
        <p className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">{stats.openDisputes}</p>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <BadgeCheck className="size-4" />
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700">92% Rate</span>
            <MiniBars bars={[52, 63, 62, 72, 84]} color="bg-emerald-300" />
          </div>
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">Resolved Cases</p>
        <p className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">{stats.resolvedCases}</p>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
            <TimerReset className="size-4" />
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700">-12h Trend</span>
            <MiniBars bars={[76, 70, 58, 46, 38]} color="bg-slate-300" />
          </div>
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600">Avg. Resolution</p>
        <p className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
          {stats.averageResolutionDays.toFixed(1)}
          <span className="ml-1 text-base font-medium text-slate-700">days</span>
        </p>
      </article>
    </section>
  );
}
