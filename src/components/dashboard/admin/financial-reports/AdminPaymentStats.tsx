"use client";

import { CheckCircle2, Clock, Lock, Undo2 } from "lucide-react";

import { paymentStats } from "@/components/dashboard/admin/financial-reports/admin-payments.mock";

export function AdminPaymentStats() {
  const cards = [
    { icon: Clock, label: "Pending", tone: "text-orange-600 bg-orange-50", value: paymentStats.pending },
    { icon: CheckCircle2, label: "Released", tone: "text-emerald-700 bg-emerald-50", value: paymentStats.released },
    { icon: Undo2, label: "Refunded", tone: "text-blue-600 bg-blue-50", value: paymentStats.refunded },
    { icon: Lock, label: "Frozen", tone: "text-purple-700 bg-purple-50", value: paymentStats.frozen },
  ];

  return (
    <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm" key={card.label}>
            <span className={`grid size-10 place-items-center rounded-lg ${card.tone}`}>
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-1 text-xl font-black text-slate-950">{card.value}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
