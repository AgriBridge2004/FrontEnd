"use client";

import { ChevronDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { ResolutionEfficiencyPoint } from "@/components/dashboard/buyer/disputes/buyer-disputes.types";

type BuyerResolutionEfficiencyChartProps = {
  data: ResolutionEfficiencyPoint[];
  onRangeChange: (range: string) => void;
  selectedRange: string;
};

const rangeOptions = ["Last 7 Days", "Last 30 Days", "This Month", "This Year"];

type ResolutionTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ dataKey?: string; value?: number }>;
};

function ResolutionTooltip({ active, label, payload }: ResolutionTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const activity = payload.find((item) => item.dataKey === "activity")?.value ?? 0;
  const closed = payload.find((item) => item.dataKey === "closed")?.value ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-black text-slate-900">{label}</p>
      <p className="mt-1 font-semibold text-slate-600">Activity: {activity}</p>
      <p className="mt-0.5 font-semibold text-emerald-700">Closed: {closed}</p>
    </div>
  );
}

export function BuyerResolutionEfficiencyChart({ data, onRangeChange, selectedRange }: BuyerResolutionEfficiencyChartProps) {
  return (
    <article className="min-h-[400px] rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-base font-black text-slate-950">Resolution Efficiency</h2>
          <p className="mt-1 max-w-[340px] text-sm font-medium leading-5 text-slate-600">Daily mediation activity and case closure velocity</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700">
            <span className="size-2 rounded-full bg-emerald-200" />
            Activity
          </span>
          <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700">
            <span className="size-2 rounded-full bg-emerald-900" />
            Closed
          </span>
          <label className="relative">
            <span className="sr-only">Chart date range</span>
            <select
              className="h-8 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs font-black text-slate-700 outline-none transition hover:bg-emerald-50 focus:border-emerald-600"
              onChange={(event) => onRangeChange(event.target.value)}
              value={selectedRange}
            >
              {rangeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
          </label>
        </div>
      </div>

      <div className="mt-7 h-[240px]">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart barCategoryGap="28%" barGap={6} data={data} margin={{ bottom: 0, left: -30, right: 8, top: 4 }}>
            <CartesianGrid stroke="#ecfdf5" strokeDasharray="3 7" vertical={false} />
            <XAxis axisLine={false} dataKey="day" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 800 }} tickLine={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip content={<ResolutionTooltip />} cursor={{ fill: "rgba(47, 138, 62, 0.06)" }} />
            <Bar dataKey="activity" fill="#dfe9e5" name="Activity" radius={[8, 8, 0, 0]} />
            <Bar dataKey="closed" fill="#075943" name="Closed" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
