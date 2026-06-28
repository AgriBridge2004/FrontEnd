import { CheckCircle, Handshake, ShoppingBag } from "lucide-react";

import type { FarmerProfile } from "@/components/farmer/profile/profile.mock";

type ProfileStatsProps = {
  stats: FarmerProfile["stats"];
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { label: "Completed Deals", value: stats.completedDeals, icon: Handshake },
    { label: "Success Rate", value: stats.successRate, icon: CheckCircle },
    { label: "Active Listings", value: stats.activeListings, icon: ShoppingBag },
  ];

  return (
    <section className="mt-8 grid gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={item.label}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="text-3xl font-black leading-none text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{item.label}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
