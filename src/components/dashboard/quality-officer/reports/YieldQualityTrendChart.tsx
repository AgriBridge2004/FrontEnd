"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { QualityTrendPoint } from "@/components/dashboard/quality-officer/reports/quality-officer-reports.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type YieldQualityTrendChartProps = {
  data: QualityTrendPoint[];
};

type TrendTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ dataKey?: string; value?: number }>;
};

function TrendTooltip({ active, label, payload }: TrendTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const yieldValue = payload.find((item) => item.dataKey === "yield")?.value ?? 0;
  const quality = payload.find((item) => item.dataKey === "quality")?.value ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-black text-slate-950">{label}</p>
      <p className="mt-1 font-semibold text-emerald-800">Yield: {yieldValue} MT</p>
      <p className="font-semibold text-amber-600">Quality: {quality}</p>
    </div>
  );
}

export function YieldQualityTrendChart({ data }: YieldQualityTrendChartProps) {
  // TODO: Connect yield/quality trend to API.
  return (
    <DashboardCard className="p-4">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-base font-black text-slate-950">Yield vs. Quality Trend</h2>
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-700">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-800" />
            Yield (MT)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-amber-400" />
            Quality Score
          </span>
        </div>
      </div>

      <div className="mt-4 h-[250px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={data} margin={{ bottom: 0, left: -20, right: 10, top: 10 }}>
            <CartesianGrid stroke="#edf2ee" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tick={{ fill: "#64706a", fontSize: 11, fontWeight: 700 }}
              tickLine={false}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip content={<TrendTooltip />} />
            <Line
              dataKey="yield"
              dot={false}
              stroke="#166534"
              strokeLinecap="round"
              strokeWidth={3}
              type="monotone"
            />
            <Line
              dataKey="quality"
              dot={false}
              stroke="#f59e0b"
              strokeDasharray="7 5"
              strokeLinecap="round"
              strokeWidth={3}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
