"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { revenueSummary } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.mock";

const distribution = [
  { color: "#22c55e", name: "Commissions Collected", percent: "71.8%", value: revenueSummary.commissionsCollected },
  { color: "#8b5cf6", name: "Inspection Fees Collected", percent: "28.2%", value: revenueSummary.inspectionFeesCollected },
];

export function AdminRevenueSourceDistribution() {
  const total = revenueSummary.commissionsCollected + revenueSummary.inspectionFeesCollected;
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-base font-black text-slate-950">Revenue Source Distribution</h2>
      <div className="relative mx-auto mt-7 h-48 w-48">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie data={distribution} dataKey="value" innerRadius={68} outerRadius={92} paddingAngle={0}>
              {distribution.map((entry) => <Cell fill={entry.color} key={entry.name} />)}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Total Revenue</p>
            <p className="mt-1 text-base font-black text-slate-950">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {distribution.map((item) => (
          <div className="flex gap-3" key={item.name}>
            <span className="mt-1.5 size-3 rounded-full" style={{ backgroundColor: item.color }} />
            <div>
              <p className="font-black text-slate-700">{item.name}</p>
              <p className="mt-1 text-sm text-slate-400">{formatCurrency(item.value)} ({item.percent})</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(value);
}
