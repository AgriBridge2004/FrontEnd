import { Bell, Calendar, CalendarDays, CircleAlert } from "lucide-react";

import { cn } from "@/lib/cn";

type BuyerNotificationsStatsProps = {
  unreadCount: number;
};

const statCards = [
  { label: "Unread", icon: Bell, tone: "green" },
  { label: "Action Required", icon: CircleAlert, tone: "red", value: "03" },
  { label: "New Today", icon: CalendarDays, tone: "green", value: "04" },
  { label: "This Week", icon: Calendar, tone: "slate", value: "18" },
];

const toneStyles = {
  green: "bg-emerald-50 text-emerald-800",
  red: "bg-red-50 text-red-600",
  slate: "bg-slate-100 text-slate-600",
};

export function BuyerNotificationsStats({ unreadCount }: BuyerNotificationsStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const value = stat.value ?? String(unreadCount).padStart(2, "0");

        return (
          <article
            className="flex items-center justify-between rounded-lg border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.label}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">{stat.label}</p>
              <p className="mt-1 text-2xl font-black leading-none text-slate-950">{value}</p>
            </div>
            <span className={cn("grid size-10 place-items-center rounded-md", toneStyles[stat.tone as keyof typeof toneStyles])}>
              <Icon className="size-5" />
            </span>
          </article>
        );
      })}
    </section>
  );
}
