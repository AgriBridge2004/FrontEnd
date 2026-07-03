"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { InspectionTrendPoint } from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type InspectionVolumeChartProps = {
  data: InspectionTrendPoint[];
};

type InspectionTrendTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ dataKey?: string; value?: number }>;
};

function InspectionTrendTooltip({ active, label, payload }: InspectionTrendTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const inspections = payload.find((item) => item.dataKey === "inspections")?.value ?? 0;
  const quality = payload.find((item) => item.dataKey === "quality")?.value ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-black text-slate-900">{label}</p>
      <p className="mt-1 font-semibold text-slate-600">Inspections: {inspections}</p>
      <p className="font-semibold text-emerald-700">Quality: {quality}</p>
    </div>
  );
}

export function InspectionVolumeChart({ data }: InspectionVolumeChartProps) {
  return (
    <DashboardCard className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
          <TrendingUp className="size-5 text-emerald-700" />
          Inspection Volume vs. Quality Trends
        </h2>
        <button className="h-8 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 transition hover:bg-emerald-50" type="button">
          Last 30 Days
        </button>
      </div>

      <div className="mt-5 h-[260px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart barGap={8} data={data} margin={{ bottom: 0, left: 0, right: 8, top: 8 }}>
            <CartesianGrid stroke="#eef2f7" strokeDasharray="3 7" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="week"
              tick={{ fill: "#334155", fontSize: 10, fontWeight: 800 }}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<InspectionTrendTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.06)" }} />
            <Bar dataKey="inspections" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
            <Bar dataKey="quality" fill="#047821" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
