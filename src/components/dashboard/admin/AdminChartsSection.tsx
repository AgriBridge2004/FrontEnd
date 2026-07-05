"use client";

import { CalendarDays, Info } from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { dealGrowthData, userRoleDistribution } from "@/components/dashboard/admin/admin-dashboard.mock";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

const roleColors = ["#4ade80", "#3b82f6", "#8b5cf6"];

function formatAxis(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value === 1200 || value === 1500 ? 1 : 0)}K`;
  }

  return String(value);
}

export function AdminChartsSection() {
  // TODO: Connect deal growth chart to API.
  // TODO: Connect user role distribution to API.
  return (
    <DashboardCard className="overflow-hidden p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-black text-slate-950">Charts</h2>
        <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:bg-emerald-50" type="button">
          <CalendarDays className="size-4 text-slate-500" />
          This Period
        </button>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <div className="min-w-0">
          <ChartTitle title="Deal Growth Over Time" />
          <div className="mt-4 h-[245px]">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={dealGrowthData} margin={{ bottom: 0, left: -18, right: 12, top: 8 }}>
                <CartesianGrid stroke="#edf2ee" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="date"
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, 1500]}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                  tickFormatter={formatAxis}
                  tickLine={false}
                  ticks={[0, 300, 600, 900, 1200, 1500]}
                />
                <Tooltip />
                <Line
                  activeDot={{ r: 5 }}
                  dataKey="activeDeals"
                  dot={{ fill: "#4ade80", r: 3 }}
                  stroke="#4ade80"
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span className="h-1 w-7 rounded-full bg-emerald-400" />
            <span className="font-black text-slate-700">Active Deals</span>
            <span className="font-black text-emerald-700">+8.7%</span>
            <span>vs last period</span>
          </div>
        </div>

        <div className="min-w-0">
          <ChartTitle title="User Distribution by Role" />
          <div className="mt-4 grid gap-4 md:grid-cols-[190px_minmax(0,1fr)]">
            <div className="h-[210px]">
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={userRoleDistribution}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={86}
                    paddingAngle={0}
                  >
                    {userRoleDistribution.map((entry, index) => (
                      <Cell fill={roleColors[index]} key={entry.role} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid content-center gap-4">
              {userRoleDistribution.map((item, index) => (
                <div className="flex items-start gap-3" key={item.role}>
                  <span className="mt-1.5 size-3 rounded-full" style={{ backgroundColor: roleColors[index] }} />
                  <div>
                    <p className="text-sm font-black text-slate-800">{item.role}</p>
                    <p className="text-xs font-medium text-slate-400">
                      {item.value.toLocaleString()} ({item.percentage}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm font-black text-slate-700">Total Users: 12,845</p>
        </div>
      </div>
    </DashboardCard>
  );
}

function ChartTitle({ title }: { title: string }) {
  return (
    <h3 className="inline-flex items-center gap-1.5 text-sm font-black text-slate-950">
      {title}
      <Info className="size-3.5 text-slate-400" />
    </h3>
  );
}
