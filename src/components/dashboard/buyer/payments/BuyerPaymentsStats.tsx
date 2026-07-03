import { CalendarClock, CircleDollarSign, Landmark, ShieldCheck } from "lucide-react";

import type { BuyerPaymentStats } from "@/components/dashboard/buyer/payments/buyer-payments.types";

type BuyerPaymentsStatsProps = {
  stats: BuyerPaymentStats;
  onViewAllPayouts: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
  currency: "USD",
});

export function BuyerPaymentsStats({ onViewAllPayouts, stats }: BuyerPaymentsStatsProps) {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
            <Landmark className="size-5" />
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">Live Hold</span>
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Escrow Balance</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{currencyFormatter.format(stats.escrowBalance)}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-emerald-800">
          <ShieldCheck className="size-4" />
          Verified institutional custody
        </p>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
            <CircleDollarSign className="size-5" />
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">↗ +12.4%</span>
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Total Settled (YTD)</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{currencyFormatter.format(stats.totalSettledYtd)}</p>
        <p className="mt-3 text-xs font-medium text-slate-600">Across 14 active supply contracts</p>
      </article>

      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-800">
            <CalendarClock className="size-5" />
          </span>
          <span className="text-xs font-black text-slate-700">In 3 days</span>
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Upcoming Payouts</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{currencyFormatter.format(stats.upcomingPayouts)}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex -space-x-2">
            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-emerald-900 text-[9px] font-black text-white">GV</span>
            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-rose-900 text-[9px] font-black text-white">AT</span>
            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-black text-slate-700">+2</span>
          </div>
          <button className="text-xs font-black text-emerald-800 transition hover:text-emerald-950" onClick={onViewAllPayouts} type="button">
            View All
          </button>
        </div>
      </article>
    </section>
  );
}
