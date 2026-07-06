"use client";

import { DollarSign, Percent, ReceiptText } from "lucide-react";

import { revenueSummary } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.mock";

export function AdminRevenueStats() {
  const cards = [
    { growth: "18.7%", icon: DollarSign, iconTone: "bg-emerald-50 text-emerald-700", title: "Gross Transaction Volume", value: revenueSummary.grossTransactionVolume },
    { growth: "16.3%", icon: Percent, iconTone: "bg-blue-50 text-blue-700", title: "Commissions Collected", value: revenueSummary.commissionsCollected },
    { growth: "22.5%", icon: ReceiptText, iconTone: "bg-purple-50 text-purple-700", title: "Inspection Fees Collected", value: revenueSummary.inspectionFeesCollected },
  ];
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article className="flex items-center gap-5 rounded-xl border border-slate-100 bg-white p-6 shadow-sm" key={card.title}>
            <span className={`grid size-10 place-items-center rounded-full ${card.iconTone}`}><Icon className="size-5" /></span>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{formatCurrency(card.value)}</p>
              <p className="mt-4 text-sm font-black text-emerald-700">up {card.growth} <span className="ml-2 font-medium text-slate-400">vs Apr 1 - Apr 25, 2025</span></p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(value);
}
