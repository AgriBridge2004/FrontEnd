import { Landmark, Shield, TrendingUp, Wallet } from "lucide-react";

import { paymentStats } from "@/components/dashboard/farmer/payments/payments.mock";
import { cn } from "@/lib/cn";

const statIcons = {
  wallet: Wallet,
  shield: Shield,
  trend: TrendingUp,
  bank: Landmark,
};

const toneStyles = {
  green: "bg-emerald-50 text-emerald-800",
  yellow: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
};

export function PaymentStats() {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {paymentStats.map((stat) => {
        const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? Wallet;
        const iconClassName = toneStyles[stat.tone as keyof typeof toneStyles] ?? toneStyles.green;

        return (
          <article
            className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition hover:bg-emerald-50/20 hover:shadow-md"
            key={stat.label}
          >
            <span className={cn("grid size-10 place-items-center rounded-md", iconClassName)}>
              <Icon className="size-5" strokeWidth={2.1} />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-600">{stat.label}</p>
            <p className="mt-1 text-[24px] font-black leading-none text-slate-950">{stat.value}</p>
            <p className={cn("mt-1 text-xs font-black", stat.tone === "green" ? "text-emerald-700" : "text-slate-600")}>
              {stat.note}
            </p>
          </article>
        );
      })}
    </section>
  );
}
