"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { farmerRevenuePeriods } from "@/lib/mock-data";

type RevenueDataPoint = {
  label: string;
  revenue: number;
};

type RevenueChartProps = {
  data: RevenueDataPoint[];
};

type RevenuePeriod = keyof typeof farmerRevenuePeriods;

type RevenueTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ value?: number }>;
};

const periodLabels: Record<RevenuePeriod, string> = {
  "This Week": "This Week Revenue (SAR)",
  "This Month": "This Month Revenue (SAR)",
  "Last 3 Months": "Last 3 Months Revenue (SAR)",
  "This Year": "This Year Revenue (SAR)",
};

const periodComparisons: Record<RevenuePeriod, { change: string; rest: string }> = {
  "This Week": { change: "↑ 12%", rest: "compared to previous week" },
  "This Month": { change: "↑ 8%", rest: "compared to previous month" },
  "Last 3 Months": { change: "↑ 15%", rest: "compared to previous period" },
  "This Year": { change: "↑ 22%", rest: "compared to last year" },
};

function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const revenue = payload[0]?.value ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-black text-slate-900">{label}</p>
      <p className="mt-1 font-semibold text-emerald-700">
        {Number(revenue).toLocaleString()} SAR
      </p>
    </div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<RevenuePeriod>("This Month");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectedData = farmerRevenuePeriods[selectedPeriod] ?? data;
  const totalRevenue = selectedData[selectedData.length - 1]?.revenue ?? 0;
  const periods = Object.keys(farmerRevenuePeriods) as RevenuePeriod[];
  const comparison = periodComparisons[selectedPeriod];

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
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:bg-emerald-50/20 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-black text-slate-900">Revenue Overview</h2>
          <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-slate-400">{periodLabels[selectedPeriod]}</p>
          <p className="text-xl font-black text-emerald-700">{totalRevenue.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            <span className="font-black text-emerald-700">{comparison.change}</span> {comparison.rest}
          </p>
        </div>
        <div className="relative w-fit" ref={menuRef}>
          <button
            aria-expanded={isMenuOpen}
            className="inline-flex h-8 min-w-36 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[13px] font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {selectedPeriod}
            <ChevronDown className={`size-4 transition ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              {periods.map((period) => {
                const isSelected = selectedPeriod === period;

                return (
                  <button
                    className={`flex h-9 w-full items-center justify-between rounded-lg px-3 text-left text-[13px] font-semibold transition ${
                      isSelected ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsMenuOpen(false);
                    }}
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

      <div className="mt-3 h-[220px] w-full overflow-hidden">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={selectedData} margin={{ bottom: 0, left: 0, right: 8, top: 4 }}>
            <defs>
              <linearGradient id="farmerRevenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2f8a3e" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#2f8a3e" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ecfdf5" strokeDasharray="3 7" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="label"
              interval="preserveStartEnd"
              minTickGap={20}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              tickLine={false}
            />
            <YAxis domain={["dataMin - 1000", "dataMax + 1000"]} hide />
            <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "#2f8a3e", strokeDasharray: "4 4", strokeWidth: 1 }} />
            <Area
              activeDot={{ fill: "#ffffff", r: 5, stroke: "#2f8a3e", strokeWidth: 2 }}
              dataKey="revenue"
              dot={{ fill: "#ffffff", r: 4, stroke: "#2f8a3e", strokeWidth: 2 }}
              fill="url(#farmerRevenueGradient)"
              fillOpacity={1}
              stroke="#2f8a3e"
              strokeWidth={3}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
