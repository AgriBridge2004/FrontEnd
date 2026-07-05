"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, ChevronDown, Info } from "lucide-react";
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

import { adminChartDataByPeriod, adminChartPeriods } from "@/components/dashboard/admin/admin-dashboard.mock";
import type { AdminChartPeriod } from "@/components/dashboard/admin/admin-dashboard.types";
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
  const [selectedPeriod, setSelectedPeriod] = useState<AdminChartPeriod>("This Period");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectedChartData = adminChartDataByPeriod[selectedPeriod];
  const totalUsers = selectedChartData.userRoleDistribution.reduce((total, item) => total + item.value, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DashboardCard className="overflow-hidden p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-black text-slate-950">Charts</h2>
        <div className="relative w-fit" ref={menuRef}>
          <button
            aria-expanded={isMenuOpen}
            aria-haspopup="listbox"
            className="inline-flex h-8 min-w-36 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-3.5 text-slate-500" />
              {selectedPeriod}
            </span>
            <ChevronDown className={`size-3.5 text-slate-500 transition ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isMenuOpen ? (
            <div
              className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
              role="listbox"
            >
              {adminChartPeriods.map((period) => {
                const isSelected = selectedPeriod === period;

                return (
                  <button
                    aria-selected={isSelected}
                    className={`flex h-9 w-full items-center justify-between rounded-lg px-3 text-left text-[13px] font-semibold transition ${
                      isSelected ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-emerald-50/30 hover:text-slate-900"
                    }`}
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsMenuOpen(false);
                    }}
                    role="option"
                    type="button"
                  >
                    {period}
                    {isSelected ? <Check className="size-4 text-emerald-700" /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <ChartTitle title="Deal Growth Over Time" />
          <div className="mt-3 h-[210px]">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={selectedChartData.dealGrowth} margin={{ bottom: 0, left: -18, right: 12, top: 8 }}>
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
                  activeDot={{ r: 4 }}
                  dataKey="activeDeals"
                  dot={{ fill: "#4ade80", r: 2.5 }}
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-2.5 text-[11px] font-semibold text-slate-400">
            <span className="h-1 w-6 rounded-full bg-emerald-400" />
            <span className="font-black text-slate-700">Active Deals</span>
            <span className="font-black text-emerald-700">{selectedChartData.dealGrowthTrend}</span>
            <span>vs last period</span>
          </div>
        </div>

        <div className="min-w-0">
          <ChartTitle title="User Distribution by Role" />
          <div className="mt-3 grid gap-3 md:grid-cols-[170px_minmax(0,1fr)]">
            <div className="h-[185px]">
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={selectedChartData.userRoleDistribution}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={76}
                    paddingAngle={0}
                  >
                    {selectedChartData.userRoleDistribution.map((entry, index) => (
                      <Cell fill={roleColors[index]} key={entry.role} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid content-center gap-3">
              {selectedChartData.userRoleDistribution.map((item, index) => (
                <div className="flex items-start gap-3" key={item.role}>
                  <span className="mt-1.5 size-3 rounded-full" style={{ backgroundColor: roleColors[index] }} />
                  <div>
                    <p className="text-[13px] font-black text-slate-800">{item.role}</p>
                    <p className="text-xs font-medium text-slate-400">
                      {item.value.toLocaleString()} ({item.percentage}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2 text-[13px] font-black text-slate-700">Total Users: {totalUsers.toLocaleString()}</p>
        </div>
      </div>
    </DashboardCard>
  );
}

function ChartTitle({ title }: { title: string }) {
  return (
    <h3 className="inline-flex items-center gap-1.5 text-[13px] font-black text-slate-950">
      {title}
      <Info className="size-3.5 text-slate-400" />
    </h3>
  );
}
