"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { dashboardSelectClass } from "@/components/dashboard/shared/dashboard-ui";
import type { RevenueChartPeriod, RevenueTrendPoint } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.types";
import { cn } from "@/lib/cn";

type Props = {
  data: RevenueTrendPoint[];
  onPeriodChange: (value: RevenueChartPeriod) => void;
  period: RevenueChartPeriod;
};

export function AdminRevenueTrendChart({ data, onPeriodChange, period }: Props) {
  return (
    <DashboardCard className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-start gap-8">
          <h2 className="max-w-36 text-base font-black text-slate-950">Revenue Trend Over Time</h2>
          <Legend color="bg-emerald-500" label="Gross Transaction Volume" />
          <Legend color="bg-blue-500" label="Commissions Collected" />
          <Legend color="bg-purple-500" label="Inspection Fees Collected" />
        </div>
        <select className={cn(dashboardSelectClass, "h-9")} onChange={(event) => onPeriodChange(event.target.value as RevenueChartPeriod)} value={period}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer height="100%" width="100%">
          <ComposedChart data={data} margin={{ bottom: 0, left: -18, right: 8, top: 10 }}>
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <XAxis axisLine={false} dataKey="label" fontSize={11} tickLine={false} />
            <YAxis axisLine={false} fontSize={11} tickFormatter={(value) => `${Number(value) / 1000}K`} tickLine={false} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar barSize={18} dataKey="grossTransactionVolume" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Line dataKey="commissionsCollected" dot={false} stroke="#3b82f6" strokeWidth={2} type="monotone" />
            <Line dataKey="inspectionFeesCollected" dot={false} stroke="#a855f7" strokeWidth={2} type="monotone" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex max-w-28 items-start gap-2 text-sm font-medium leading-4 text-slate-500">
      <span className={`mt-1 size-2 shrink-0 rounded-sm ${color}`} />
      {label}
    </span>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", maximumFractionDigits: 0, style: "currency" }).format(value);
}
